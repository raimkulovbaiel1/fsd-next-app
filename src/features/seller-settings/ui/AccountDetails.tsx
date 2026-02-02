import React, { useState } from 'react';

interface AccountDetailsProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({ email, onEmailChange }) => {
  const [password, setPassword] = useState('');

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Настройки акаунта</h2>

      <div className="text-sm text-gray-600 mb-1">Ваш E-mail адрес:</div>
      <div className="mb-6 text-green-700">{email}</div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Изменить E-mail */}
        <div>
          <div className="font-medium mb-2">Изменить E-mail адрес</div>
          <div className="text-sm text-gray-600 mb-2">Введите новый E-mail адрес</div>
          <input
            type="email"
            className="w-full border rounded-lg px-4 py-2 mb-4"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="google@gmail.com"
          />
          <button className="px-8 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
            СОХРАНИТЬ
          </button>
        </div>

        {/* Изменить пароль */}
        <div>
          <div className="font-medium mb-2">Изменить пароль</div>
          <div className="text-sm text-gray-600 mb-2">Введите новый пароль</div>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <button className="px-8 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
              СОХРАНИТЬ
            </button>
            <button className="text-green-700 text-sm hover:underline">
              Забыли пароль?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
