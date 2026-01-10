import React from 'react';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  ad: string;
  time: string;
  checked?: boolean;
  badge?: string;
  active?: boolean;
}

interface MessagesProps {
  messages?: Message[];
}

export const Messages = ({ messages = [] }: MessagesProps) => {
  const defaultMessages: Message[] = [
    { id: 1, user: "Игорь Игорьевич", ad: "SCHWARZMUELLER 3Achs Stahl...", time: "19:56", checked: true },
    { id: 2, user: "Darrell Steward", ad: "Opel Movano B Pritsche L3H1 3...", time: "ПД, 19:05", badge: "4 новых" },
    { id: 3, user: "Albert Flores", ad: "SCHWARZMUELLER 3Achs Stahl...", time: "СБ, 16:45" },
    { id: 4, user: "Arlene McCoy", ad: "SCHWARZMUELLER 3Achs Stahl...", time: "ПН, 20:30", badge: "2 новых" },
    { id: 5, user: "Cody Fisher", ad: "SCHWARZMUELLER 3Achs Stahl...", time: "19:56", badge: "3 новых", active: true },
  ];

  const displayMessages = messages.length > 0 ? messages : defaultMessages;

  return (
    <>
      <div className="bg-[#01bda7] rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[14px] uppercase tracking-wider text-gray-400 border-b border-gray-50">
              <tr>
                <th className="p-4 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="p-4">Пользователь</th>
                <th className="p-4">Объявления</th>
                <th className="p-4">Сообщения</th>
                <th className="p-4">Отправлено</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {displayMessages.map((msg) => (
                <tr key={msg.id} className={`border-b border-gray-50 hover:bg-gray-50 transition ${msg.active ? 'bg-emerald-50/40' : ''}`}>
                  <td className="p-4"><input type="checkbox" checked={msg.checked} className="rounded border-gray-300 text-emerald-500" /></td>
                  <td className={`p-4 font-medium ${msg.badge ? 'text-emerald-600' : 'text-gray-900'}`}>{msg.user}</td>
                  <td className="p-4 text-gray-500 truncate max-w-75">{msg.ad}</td>
                  <td className="p-4">
                    {msg.badge && (
                      <span className="bg-emerald-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                        {msg.badge}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-400">{msg.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <button className="flex items-center bg-[#EB5757] text-[#EB5757] rounded-lg transition text-[30px] font-medium">
          <Trash2 size={20} />
          <span>Удалить</span>
        </button>

        <div className="flex items-center space-x-2">
          <button className="p-3 border rounded-lg bg-[#01bda7] text-[#01bda7]"><ChevronLeft size={20}/></button>
          <span className="px-4 py-2 bg-white rounded-lg text-sm">1 страница</span>
          <button className="p-2 border rounded-lg bg-emerald-50 text-[#01bda7]"><ChevronRight size={20}/></button>
        </div>
      </div>
    </>
  );
};  