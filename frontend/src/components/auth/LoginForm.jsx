"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ROUTES from "@/config/routes";
import { useAuth } from "@/context/AuthProvider";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address.").trim(),

  password: z.string().min(6, "Password must be at least 6 characters."),
});

const LoginForm = () => {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div className="w-full max-w-md rounded-[var(--radius-lg)] bg-[var(--color-white)] p-8 shadow-[var(--shadow-md)]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-dark)]">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Sign in to continue managing your projects and tasks.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-[var(--color-muted)] transition hover:text-[var(--color-dark)]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          {...register("password")}
        />

        <Button type="submit" loading={isSubmitting} className="w-full">
          Login
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[var(--color-muted)]">
          Don't have an account?{" "}
          <Link
            href={ROUTES.REGISTER}
            className="font-semibold text-[var(--color-primary)] transition hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
