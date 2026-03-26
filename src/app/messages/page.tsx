import { Messages } from '@/widgets/Messages';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ProfileTabs } from '@/shared/components/ProfileTabs';

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

      <div className="mt-[30px] mb-8">
        <ProfileTabs />
      </div>

      <Messages />
    </div>
  );
};

export default MessagesPage;