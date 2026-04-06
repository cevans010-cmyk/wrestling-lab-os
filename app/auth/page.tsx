"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail || !password) {
        setError("Please enter your email and password.");
        return;
      }

      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        if (data.session) {
          router.replace("/diagnosis");
          return;
        }

        setMessage("Account created. Now log in.");
        setMode("login");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (!data.session) {
        setError("Login failed. No session was created.");
        return;
      }

      router.replace("/diagnosis");
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          border: "1px solid #333",
          padding: "24px",
          borderRadius: "16px",
          background: "#111",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px" }}>
          {mode === "signup" ? "Sign Up" : "Log In"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "12px",
            borderRadius: "12px",
            border: "1px solid #555",
            fontSize: "18px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "12px",
            borderRadius: "12px",
            border: "1px solid #555",
            fontSize: "18px",
          }}
        />

        {error && <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>}
        {message && (
          <p style={{ color: "lightgreen", marginBottom: "12px" }}>{message}</p>
        )}

        <button
          type="button"
          onClick={handleAuth}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "999px",
            border: "none",
            background: "#14d8c4",
            color: "black",
            fontWeight: 800,
            fontSize: "20px",
            marginTop: "8px",
          }}
        >
          {isLoading
            ? "Processing..."
            : mode === "signup"
            ? "Sign Up"
            : "Log In"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setMessage("");
          }}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "999px",
            border: "1px solid #666",
            background: "transparent",
            color: "white",
            fontWeight: 700,
            fontSize: "16px",
            marginTop: "12px",
          }}
        >
          {mode === "login" ? "Switch to Sign Up" : "Switch to Log In"}
        </button>
      </div>
    </main>
  );
}