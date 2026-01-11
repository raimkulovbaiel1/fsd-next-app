import React from 'react'

const SellerRegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Регистрация продавца
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Создайте аккаунт и начните размещать объявления
        </p>

        {/* Форма */}
        <form className="grid grid-cols-2 gap-4">

          {/* Input */}
          <input
            type="text"
            placeholder="Название магазина"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500 placeholder:text-gray-400"
          />

          <input
            type="text"
            placeholder="Имя продавца"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500"
          />

          {/* Заголовок секции */}
          <div className="col-span-2 text-[17px] font-medium mt-2">
            Про компанию
          </div>

          <input
            type="email"
            placeholder="Email"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500"
          />

          <input
            type="password"
            placeholder="Пароль"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500"
          />

          <input
            type="password"
            placeholder="Повторите пароль"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500"
          />

          <input
            type="text"
            placeholder="Город"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500"
          />

          <input
            type="text"
            placeholder="Телефон"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500"
          />

          <input
            type="text"
            placeholder="Сайт компании"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500"
          />

          <input
            type="text"
            placeholder="ИНН / БИН"
            className="h-16 px-4 pt-2 text-sm rounded-lg border border-gray-300 
            focus:outline-none focus:border-green-500"
          />

          {/* Кнопка */}
          <button
            type="submit"
            className="col-span-2 h-12 mt-2 bg-green-600 text-white rounded-lg 
            font-medium hover:bg-green-700 transition"
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Уже есть аккаунт?{" "}
          <span className="text-green-600 cursor-pointer hover:underline">
            Войти
          </span>
        </p>

      </div>
    </div>
  )
}

export default SellerRegisterPage
