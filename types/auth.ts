import type { User } from "@supabase/supabase-js";

export type AuthUser = Pick<User, "id" | "email" | "created_at">;

export type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: AuthUser }
  | { status: "unauthenticated" };
