'use client';

import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface Message {
  id: number;
  vehicleId: string;
  vehicleName: string;
  text: string;
  time: string;
  user: string;
  unreadCount: number;
  checked: boolean;
}

export const Messages = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);

  // 🔄 INIT
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(stored);
  }, []);

  // 🔔 WebSocket (пример)
  useEffect(() => {
    const ws = new WebSocket('wss://echo.websocket.events');

    ws.onmessage = () => {
      const newMsg: Message = {
        id: Date.now(),
        vehicleId: '1',
        vehicleName: 'Opel Movano B Pritsche L3H1',
        text: 'Новое сообщение',
        time: new Date().toLocaleTimeString().slice(0, 5),
        user: 'Darrell Steward',
        unreadCount: 1,
        checked: false,
      };

      setMessages(prev => {
        const updated = [newMsg, ...prev];
        localStorage.setItem('messages', JSON.stringify(updated));
        return updated;
      });
    };

    return () => ws.close();
  }, []);

  // ☑ чекбокс
  const toggleCheck = (id: number) => {
    const updated = messages.map(m =>
      m.id === id ? { ...m, checked: !m.checked } : m
    );
    setMessages(updated);
    localStorage.setItem('messages', JSON.stringify(updated));
  };

  // ✅ открыть сообщение + переход
  const openMessage = (vehicleId: string, messageId: number) => {
    const updated = messages.map(m =>
      m.id === messageId ? { ...m, unreadCount: 0 } : m
    );

    setMessages(updated);
    localStorage.setItem('messages', JSON.stringify(updated));

    // 🚀 переход в диалог
    router.push(`/dialogue/${vehicleId}`);
  };

  // 🗑 удалить выбранные
  const deleteSelected = () => {
    const filtered = messages.filter(m => !m.checked);
    setMessages(filtered);
    localStorage.setItem('messages', JSON.stringify(filtered));
  };

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">
      <table className="w-full text-left">
        <thead className="text-sm text-gray-400 border-b">
          <tr>
            <th className="p-4 w-12"></th>
            <th className="p-4">Пользователь</th>
            <th className="p-4">Объявление</th>
            <th className="p-4">Сообщение</th>
            <th className="p-4 text-right">Время</th>
          </tr>
        </thead>

        <tbody>
          {messages.map(msg => (
            <tr
              key={msg.id}
              onClick={() => openMessage(msg.vehicleId, msg.id)}
              className={`border-b cursor-pointer transition
                ${msg.unreadCount > 0 
                  ? 'bg-green-50 hover:bg-green-100' 
                  : 'hover:bg-gray-50'}
              `}
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={msg.checked}
                  onClick={e => e.stopPropagation()}
                  onChange={() => toggleCheck(msg.id)}
                  className="accent-green-600"
                />
              </td>

              <td className="p-4 font-medium text-gray-800">
                {msg.user}
              </td>

              <td className="p-4 text-green-600 truncate max-w-xs">
                {msg.vehicleName}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-3">
                  <span className="truncate max-w-sm">{msg.text}</span>

                  {msg.unreadCount > 0 && (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      {msg.unreadCount}
                    </span>
                  )}
                </div>
              </td>

              <td className="p-4 text-right text-sm text-gray-400">
                {msg.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FOOTER */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={deleteSelected}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
        >
          <Trash2 size={18} />
          Удалить выбранные
        </button>

        <span className="text-sm text-gray-500">
          {messages.length} сообщений
        </span>
      </div>
    </div>
  );
};
