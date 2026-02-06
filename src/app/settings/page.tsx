'use client';

import { Settings } from '@/widgets/Settings';
import { useRouter } from 'next/navigation';

const tabBase =
  'pb-3 text-sm font-medium leading-5 border-b-2 transition cursor-pointer';

const tabInactive =
  'border-transparent text-gray-500 hover:text-black';

const tabActive =
  'border-emerald-600 text-black';

const SettingsPage = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    setTimeout(() => {
      router.push(path);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      <h1 className="text-3xl font-bold mb-6">
        Настройки профиля
      </h1>

      <div className="flex gap-6 border-b mb-8">

        <span
          onClick={() => handleNavigate('/Wishlist')}
          className={`${tabBase} ${tabInactive}`}
        >
          Избранное
        </span>

        <span
          onClick={() => handleNavigate('/messages')}
          className={`${tabBase} ${tabInactive}`}
        >
          Сообщения
          <span className="ml-1 text-emerald-600">(4 новых)</span>
        </span>

        <span className={`${tabBase} ${tabActive}`}>
          ⚙ Настройки профиля
        </span>

      </div>

      <Settings />
    </div>
  );
};

export default SettingsPage;
