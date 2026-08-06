import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | Task Management",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-8">
      <LoginForm />
    </main>
  );
}
