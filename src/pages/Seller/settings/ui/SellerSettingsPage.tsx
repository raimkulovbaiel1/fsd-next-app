'use client';
import { useState } from 'react';
import iconsc from '@/shared/assets/icons/search.svg';
import { AccountDetails } from '@/features/seller-settings/ui/AccountDetails';
import { ContactDetails } from '@/features/seller-settings/ui/ContactDetails';
import { CompanyDetails } from '@/features/seller-settings/ui/CompanyDetails';

const SellerSettingsPage = () => {
  const [openedBlock, setOpenedBlock] = useState<'account' | 'contact' | 'company' | null>(null);
  const [email, setEmail] = useState('email@gmail.com');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Профиль OTP Leasing</h1>

      <section className="bg-white rounded-xl p-5 shadow">
        <div className="space-y-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setOpenedBlock(openedBlock === 'account' ? null : 'account')}
          >
            <input
              type="text"
              placeholder="Настройки акаунта"
              className="w-full border rounded-lg px-4 py-2 pr-10"
              readOnly
            />
            <img
              src={iconsc.src}
              alt="icon"
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${
                openedBlock === 'account' ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => setOpenedBlock(openedBlock === 'contact' ? null : 'contact')}
          >
            <input
              type="email"
              placeholder="Изменить контактную информацию"
              className="w-full border rounded-lg px-4 py-2 pr-10"
              readOnly
            />
            <img
              src={iconsc.src}
              alt="icon"
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${
                openedBlock === 'contact' ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => setOpenedBlock(openedBlock === 'company' ? null : 'company')}
          >
            <input
              type="password"
              placeholder="Изменить информацию о компании"
              className="w-full border rounded-lg px-4 py-2 pr-10"
              readOnly
            />
            <img
              src={iconsc.src}
              alt="icon"
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${
                openedBlock === 'company' ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        </div>

        {openedBlock === 'account' && <AccountDetails email={email} onEmailChange={setEmail} />}
        {openedBlock === 'contact' && <ContactDetails />}
        {openedBlock === 'company' && <CompanyDetails />}
      </section>

      <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition mt-4">
        Сохранить изменения
      </button>
    </div>
  );
};

export default SellerSettingsPage;
