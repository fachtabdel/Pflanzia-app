"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const sessionId = formData.get("session_id") as string | null;

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    const base = sessionId ? `/sign-in?session_id=${sessionId}&error=` : "/sign-in?error=";
    redirect(`${base}${encodeURIComponent(error.message)}`);
  }

  if (sessionId) {
    redirect(`/checkout/success?session_id=${sessionId}`);
  }

  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const sessionId = formData.get("session_id") as string | null;

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    const base = sessionId ? `/sign-up?session_id=${sessionId}&error=` : "/sign-up?error=";
    redirect(`${base}${encodeURIComponent(error.message)}`);
  }

  if (sessionId) {
    redirect(`/checkout/success?session_id=${sessionId}`);
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
}
