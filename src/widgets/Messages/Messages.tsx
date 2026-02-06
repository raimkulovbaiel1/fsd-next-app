import React from 'react';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  ad?: string;
  time: string;
  checked?: boolean;
  badge?: string;
  active?: boolean;
}

export const Messages = () => {
  const messages: Message[] = [
    { id: 1, user: "Annette Black", time: "19:56", checked: true, badge: "4" },
    { id: 2, user: "Kathryn Murphy", time: "19:56" },
    { id: 3, user: "Bessie Cooper", time: "19:56" },
    { id: 4, user: "Jane Cooper", time: "19:56", checked: true, badge: "4" },
    { id: 5, user: "Floyd Miles", time: "19:56", badge: "4" },
    { id: 6, user: "Arlene McCoy", time: "19:56" },
  ];

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="md:hidden bg-white rounded-xl shadow border border-gray-100">
        <div className="divide-y">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-center justify-between px-4 py-3 ${
                msg.checked ? 'bg-emerald-50/40' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={msg.checked}
                  className="w-5 h-5 rounded border-gray-300 accent-emerald-500"
                />
                <span className="font-medium text-gray-900">
                  {msg.user}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {msg.badge && (
                  <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded font-bold">
                    {msg.badge}
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-400 border-b">
            <tr>
              <th className="p-4 w-12">
                <input type="checkbox" />
              </th>
              <th className="p-4">Пользователь</th>
              <th className="p-4">Сообщения</th>
              <th className="p-4">Время</th>
            </tr>
          </thead>

          <tbody>
            {messages.map(msg => (
              <tr
                key={msg.id}
                className={`border-b hover:bg-gray-50 ${
                  msg.checked ? 'bg-emerald-50/40' : ''
                }`}
              >
                <td className="p-4">
                  <input type="checkbox" checked={msg.checked} />
                </td>
                <td className="p-4 font-medium">{msg.user}</td>
                <td className="p-4">
                  {msg.badge && (
                    <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
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

      {/* ================= FOOTER ================= */}
      <div className="flex justify-between items-center mt-5">
        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-lg">
          <Trash2 size={18} />
          Удалить
        </button>

        <div className="flex items-center gap-2">
          <button className="p-2 bg-emerald-50 cursor-pointer rounded-lg text-emerald-600">
            <ChevronLeft size={18} />
          </button>
          <span className="px-3 text-sm">1</span>
          <button className="p-2 bg-emerald-50 cursor-pointer rounded-lg text-emerald-600">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
};
