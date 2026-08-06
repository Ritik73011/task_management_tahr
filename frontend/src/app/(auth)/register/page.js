import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | Task Management",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-8">
      <RegisterForm />
    </main>
  );
}
