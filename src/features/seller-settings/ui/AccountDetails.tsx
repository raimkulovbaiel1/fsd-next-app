import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountDetailsschema, type FormData } from "@/features/model/AccountDetailsProps";

interface AccountDetailsProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({
  email,
  onEmailChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(AccountDetailsschema),
    defaultValues: {},
  });

  const onSubmit = (data: FormData) => {
    console.log("Форма:", data);
    onEmailChange(data.email);
    reset({
      email: data.email,
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Настройки акаунта</h2>

      <div className="text-sm text-gray-600 mb-1">Ваш E-mail адрес:</div>
      <div className="mb-6 text-green-700">{email}</div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="font-medium mb-2">Изменить E-mail адрес</div>
          <div className="text-sm text-gray-600 mb-2">
            Введите новый E-mail адрес
          </div>

          <input
            {...register("email")}
            type="email"
            className="w-full border rounded-lg px-4 py-2 mb-2"
            placeholder="google@gmail.com"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mb-2">
              {errors.email.message}
            </p>
          )}

          <button
            type="submit"
            className="px-8 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            СОХРАНИТЬ
          </button>
        </div>

        <div>
          <div className="font-medium mb-2">Изменить пароль</div>
          <div className="text-sm text-gray-600 mb-2">
            Введите новый пароль
          </div>

          <input
            {...register("password")}
            type="password"
            className="w-full border rounded-lg px-4 py-2 mb-2"
            placeholder="******"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              СОХРАНИТЬ
            </button>

            <button
              type="button"
              className="text-green-700 text-sm hover:underline"
            >
              Забыли пароль?
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
