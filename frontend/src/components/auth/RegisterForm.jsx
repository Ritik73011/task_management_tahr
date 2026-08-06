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

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters.")
      .max(100, "Name cannot exceed 100 characters."),

    email: z.email("Please enter a valid email address.").trim(),

    password: z.string().min(6, "Password must be at least 6 characters."),

    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const RegisterForm = () => {
  const { register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ confirmPassword, ...data }) => {
    await registerUser(data);
  };

  return (
    <div className="w-full max-w-md rounded-[var(--radius-lg)] bg-[var(--color-white)] p-8 shadow-[var(--shadow-md)]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-dark)]">
          Create Account
        </h1>

        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Create your account to start managing projects and tasks.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

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
          autoComplete="new-password"
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

        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="text-[var(--color-muted)] transition hover:text-[var(--color-dark)]"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          {...register("confirmPassword")}
        />

        <Button type="submit" loading={isSubmitting} className="w-full">
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[var(--color-muted)]">
          Already have an account?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="font-semibold text-[var(--color-primary)] transition hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
