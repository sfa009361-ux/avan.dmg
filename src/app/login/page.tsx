"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8f6]">

      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-2xl">

        <h1 className="mb-10 text-center text-4xl font-black">
          ورود مدیریت
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border p-4"
          />

          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border p-4"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-black py-4 font-bold text-white"
          >
            {loading ? "درحال ورود..." : "ورود"}
          </button>

        </div>

      </div>

    </main>
  );
}