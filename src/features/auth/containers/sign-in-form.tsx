"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";

import { right } from "@/shared/lib/either";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Sign up successful:", { email, password });
      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      onSubmit={handleSubmit}
      fields={
        <AuthFields
          login={email}
          onChangeLogin={setEmail}
          onChangePassword={setPassword}
          password={password}
        />
      }
      actions={<SubmitButton>Sign Up</SubmitButton>}
      error={<ErrorMessage error={right(null)} />}
      link={
        <BottomLink
          linkText="Sign up"
          text="Don`t have an account? "
          url="/sign-up"
        />
      }
    />
  );
}
