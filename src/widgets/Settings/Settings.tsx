'use client';

import { useState } from 'react';
import { AccountDetails } from '@/features/settings/ui/AccountDetails';

type OpenType = 'account' | 'contact' | null;

function Accordion({
  title,
  isOpen,
  onClick,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* HEADER */}
      <div
        onClick={onClick}
        className="bg-white rounded-xl border px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
      >
        <span className="text-sm font-medium">{title}</span>
        <span
          className={`text-green-600 text-xl transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ⌄
        </span>
      </div>

      {/* CONTENT */}
      {isOpen && (
        <div className="bg-white rounded-xl mt-4 px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

export const Settings = () => {
  const [open, setOpen] = useState<OpenType>('account');
  const [email, setEmail] = useState('mail@gmail.com');

  return (
    <>
      <div className="mb-6 mt-[20px]">
        <p className="text-base font-medium">
          Профиль <span className="text-gray-500">{email}</span>
        </p>

        <button className="text-sm text-[#009661] hover:underline mt-1">
          Выйти из аккаунта
        </button>
      </div>

      <div className="space-y-4">

        {/* ===== ACCOUNT ===== */}
        <Accordion
          title="Настройки аккаунта"
          isOpen={open === 'account'}
          onClick={() => setOpen(open === 'account' ? null : 'account')}
        >
          <AccountDetails
            email={email}
            onEmailChange={setEmail}
          />
        </Accordion>

        {/* ===== CONTACT ===== */}
        <Accordion
          title="Изменить контактную информацию"
          isOpen={open === 'contact'}
          onClick={() => setOpen(open === 'contact' ? null : 'contact')}
        >
          <div className="mt-6 text-sm text-gray-500">
            Контактные данные (в разработке)
          </div>
        </Accordion>

      </div>
    </>
  );
};
