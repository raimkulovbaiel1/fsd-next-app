import React from 'react';

export const ContactDetails = () => {
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Изменить контактную информацию</h2>
      <p className="text-sm text-gray-600 mb-6 max-w-xl">
        Тут вы можете поменять информацию про компанию, которую видят ваши клиенты
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-sm text-gray-600 mb-1">Название компании</div>
          <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Тарас" />
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Страна</div>
          <input type="text" className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Город</div>
          <input type="text" className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Адрес</div>
          <input type="text" className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Почтовый индекс</div>
          <input type="text" className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Мобильный телефон</div>
          <input type="tel" className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Веб-сайт</div>
          <input type="text" className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Время работы</div>
          <input type="text" className="w-full border rounded-lg px-4 py-2" />
        </div>
      </div>

      <div className="mb-4 font-medium">Контактное лицо</div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-sm text-gray-600 mb-1">ФИО</div>
          <input type="text" className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Мобильный телефон</div>
          <input type="tel" className="w-full border rounded-lg px-4 py-2" />
        </div>
      </div>

      <button className="px-8 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
        СОХРАНИТЬ ИЗМЕНЕНИЯ
      </button>
    </div>
  );
};
