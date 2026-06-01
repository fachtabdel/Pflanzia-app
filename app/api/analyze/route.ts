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

    const prompt = context
      ? `You are an expert botanist and plant care specialist. The user provides this additional context: "${context}". Analyze this plant image and return a JSON object with the following fields: { "commonName": string, "scientificName": string, "family": string, "confidence": "high" | "medium" | "low", "careInstructions": { "watering": string, "sunlight": string, "soil": string, "humidity": string, "temperature": string, "fertilizing": string }, "commonProblems": string[], "toxicity": string, "nativeRegion": string, "summary": string }. Return ONLY the raw JSON object, no markdown, no explanation, no intro.`
      : `You are an expert botanist and plant care specialist. Analyze this plant image and return a JSON object with the following fields: { "commonName": string, "scientificName": string, "family": string, "confidence": "high" | "medium" | "low", "careInstructions": { "watering": string, "sunlight": string, "soil": string, "humidity": string, "temperature": string, "fertilizing": string }, "commonProblems": string[], "toxicity": string, "nativeRegion": string, "summary": string }. Return ONLY the raw JSON object, no markdown, no explanation, no intro.`;

    const cfResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/llava-hf/llava-1.5-7b-hf`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageArray,
          prompt,
          max_tokens: 1024,
        }),
      }
    );

    const cfData = await cfResponse.json();

    if (!cfData.success) {
      const errorMsg =
        cfData.errors?.[0]?.message ?? "Cloudflare request failed";
      return NextResponse.json({ error: errorMsg }, { status: 502 });
    }

    const description: string = cfData.result?.description ?? "";

    let parsedPlantData: unknown;
    try {
      parsedPlantData = JSON.parse(description);
    } catch {
      return NextResponse.json(
        { error: "Model returned non-JSON response" },
        { status: 422 }
      );
    }

    return NextResponse.json({ plant: parsedPlantData });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
