import { Messages } from '@/widgets/Messages';
import { ChevronRight, Settings } from 'lucide-react';
import Link from 'next/link';

const MessagesPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-[#f9fafb] min-h-screen">
      <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
        <Link href="/">Главная</Link>
        <ChevronRight size={12} />
        <Link href="/">Мой кабинет</Link>
        <ChevronRight size={12} />
        <span className="text-gray-600">Сообщения</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">Сообщения</h1>

      <div className="flex space-x-8 border-b text-[19px] mt-[30px] border-gray-200 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/Wishlist" className="pb-4 text-gray-500 font-medium">Избранное</Link>
        <button className="pb-4 border-b-2 border-emerald-500 text-gray-900 font-medium">
          Сообщения <span className="text-emerald-500">(4 новых)</span>
        </button>
        <Link href="/settings" className="pb-4 text-gray-500 font-medium flex items-center">
          <Settings size={18} className="mr-2" /> Настройки профиля
        </Link>
      </div>

      <Messages />
    </div>
  );
};

export default MessagesPage;