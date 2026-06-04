import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return NextResponse.json(
      { error: "Missing Cloudflare credentials" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const context = formData.get("context") as string | null;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const arrayBuffer = await image.arrayBuffer();
    const imageArray = [...new Uint8Array(arrayBuffer)];

    const contextLine = context?.trim()
      ? ` The user provides this additional context: "${context.trim()}".`
      : "";

    const prompt =
      `You are an expert botanist and plant care specialist.${contextLine} ` +
      `Analyze this plant image and return ONLY a raw JSON object with NO markdown, NO extra text, NO explanation. ` +
      `Use exactly this structure: ` +
      `{"commonName":"string","scientificName":"string","family":"string","confidence":"high"|"medium"|"low",` +
      `"careInstructions":{"watering":"string","sunlight":"string","soil":"string","humidity":"string","temperature":"string","fertilizing":"string"},` +
      `"commonProblems":["string"],"toxicity":"string","nativeRegion":"string","summary":"string"}`;

    // Try llama-3.2-11b-vision first (better structured output), fall back to llava
    const models = [
      "@cf/meta/llama-3.2-11b-vision-instruct",
      "@cf/llava-hf/llava-1.5-7b-hf",
    ];

    let lastError = "";
    for (const model of models) {
      try {
        const cfResponse = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageArray, prompt, max_tokens: 1024 }),
          }
        );

        const cfData = await cfResponse.json();

        if (!cfData.success) {
          lastError = cfData.errors?.[0]?.message ?? "Cloudflare request failed";
          continue; // try next model
        }

        // Different models return the text in different fields
        const rawText: string =
          cfData.result?.response ??       // llama-3.2 field
          cfData.result?.description ??    // llava field
          "";

        if (!rawText) {
          lastError = "Empty response from model";
          continue;
        }

        const plantData = extractJSON(rawText);
        if (!plantData) {
          lastError = "Model returned non-JSON response";
          continue;
        }

        return NextResponse.json({ plant: plantData });
      } catch (err) {
        lastError = err instanceof Error ? err.message : "Unknown error";
        continue;
      }
    }

    return NextResponse.json({ error: lastError || "All models failed" }, { status: 502 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function extractJSON(text: string): unknown | null {
  // 1. Direct parse
  try { return JSON.parse(text.trim()); } catch { /* continue */ }

  // 2. Strip markdown fences
  const stripped = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  try { return JSON.parse(stripped); } catch { /* continue */ }

  // 3. Find first { ... } block in the response
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch { /* continue */ }
  }

  return null;
}
