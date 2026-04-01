import { FC } from "react";
import { LoginForm } from "@/features/auth/ui/LoginForm";

export const LoginPage: FC = () => {
  return (
    <main className="min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4 py-14">
      <section className="w-full max-w-107.5">
        <div className="bg-[#f8f8f8] rounded-md px-5 py-8 sm:px-8 sm:py-10 shadow-sm">
          <h1 className="text-center text-[#252525] text-[30px] sm:text-[40px] font-semibold leading-tight mb-8 sm:mb-10">
            Вход в аккаунт
          </h1>

          <LoginForm />
        </div>
      </section>
    </main>
  );
};