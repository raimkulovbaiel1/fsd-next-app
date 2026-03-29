import { FC } from "react";
import { RegisterForm } from "@/features/auth/ui/RegisterForm";

export const RegisterPage: FC = () => {
  return (
    <main className="min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-[430px]">
        <div className="bg-[#f8f8f8] rounded-md px-5 py-8 sm:px-8 sm:py-10 shadow-sm">
          <h1 className="text-center text-[#252525] text-[30px] sm:text-[40px] font-semibold leading-tight mb-3">
            Регистрация
          </h1>

          <p className="text-center text-[13px] sm:text-[14px] text-[#a0a0a0] leading-relaxed mb-8">
            Заполните указанные поля,
            <br />
            чтобы создать аккаунт
          </p>

          <RegisterForm />
        </div>
      </section>
    </main>
  );
};