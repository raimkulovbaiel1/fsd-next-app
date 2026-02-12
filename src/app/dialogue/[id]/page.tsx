'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Message {
  id: number;
  vehicleId: string;
  vehicleName: string;
  text: string;
  time: string;
  user?: string;
}

export default function DialoguePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('messages') || '[]');
    const filtered = stored.filter((m: Message) => m.vehicleId === id);
    setMessages(filtered);
  }, [id]);

  const sendMessage = () => {
    if (!newText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      vehicleId: id as string,
      vehicleName: messages[0]?.vehicleName || '',
      text: newText,
      time: new Date().toLocaleTimeString().slice(0, 5),
      user: 'Вы',
    };

    const stored = JSON.parse(localStorage.getItem('messages') || '[]');
    const updated = [...stored, newMessage];

    localStorage.setItem('messages', JSON.stringify(updated));

    setMessages(prev => [...prev, newMessage]);
    setNewText('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/messages')}
          className="text-[#00a372] font-medium"
        >
          ← Все сообщения
        </button>

        <h2 className="text-xl font-semibold">
          Диалог #{id}
        </h2>
      </div>

      {/* CHAT */}
      <div className="bg-white rounded-xl shadow p-6 h-125 overflow-y-auto space-y-4 border">

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.user === 'Вы' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                px-4 py-2 rounded-xl text-sm max-w-[60%]
                ${msg.user === 'Вы'
                  ? 'bg-[#00a372] text-white'
                  : 'bg-gray-200 text-gray-800'}
              `}
            >
              {msg.text}
              <div className="text-xs opacity-70 mt-1 text-right">
                {msg.time}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* INPUT */}
      <div className="flex gap-3 mt-4">
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Напишите сообщение..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00a372]"
        />
        <button
          onClick={sendMessage}
          className="bg-[#00a372] text-white px-6 py-2 rounded-lg"
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
