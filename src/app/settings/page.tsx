import { Settings } from '@/widgets/Settings';
import Link from 'next/link';

const SettingsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <nav className="text-sm text-gray-400 mb-4">
        <ol className="flex flex-wrap items-center gap-15">
          <li>
            <Link href="/" className="hover:text-black">
              Главная
            </Link>
          </li>
          <span>›</span>
          <li>
            <Link href="/cabinet" className="hover:text-black">
              Мой кабинет
            </Link>
          </li>
          <span>›</span>
          <li className="text-black font-medium text-[24px]">
            Настройки профиля
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl sm:text-3xl font-bold mb-6">
        Настройки профиля
      </h1>

      <div className="flex gap-6 border-b mb-8 text-sm">
        <Link href="/Wishlist" className="pb-3 text-gray-500 hover:text-black">
          Избранное
        </Link>

        <Link href="/messages" className="pb-3 text-gray-500 hover:text-black">
          Сообщения <span className="text-[#009661]">(4 новых)</span>
        </Link>

        <button className="pb-3 border-b-2 border-green-600 text-black font-medium flex items-center gap-2">
          ⚙ Настройки профиля
        </button>
      </div>

      <Settings />
    </div>
  );
};

export default SettingsPage;