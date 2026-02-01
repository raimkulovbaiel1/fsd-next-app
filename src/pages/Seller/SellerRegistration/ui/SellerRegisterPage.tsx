import React from 'react'

const SellerRegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg p-7">

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Регистрация продавца
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Создайте аккаунт и начните размещать объявления
        </p>


        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              className="h-13 px-4 pt-2 text-sm  border border-gray-300
      focus:outline-none focus:border-green-500 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Пароль</label>
            <input
              type="password"
              placeholder="Пароль"
              className="h-13 px-4 pt-2 text-sm  border border-gray-300
      focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="col-span-1 md:col-span-2 text-[17px] font-medium mt-2">
            Про компанию
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Название компании</label>
            <input
              type="text"
              placeholder="Название компании"
              className="h-13 px-4 pt-2 text-sm  border border-gray-300
      focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Страна</label>
            <input
              type="text"
              placeholder="Страна"
              className="h-13 px-4 pt-2 text-sm  border border-gray-300
      focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Город</label>
            <input
              type="text"
              placeholder="Город"
              className="h-13 px-4 pt-2 text-sm border border-gray-300
      focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Адрес</label>
            <input
              type="text"
              placeholder="Адрес"
              className="h-13 px-4 pt-2 text-sm  border border-gray-300
      focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Номер телефона</label>
            <input
              type="text"
              placeholder="Номер телефона"
              className="h-13 px-4 pt-2 text-sm border border-gray-300
      focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">ИНН / БИН</label>
            <input
              type="text"
              placeholder="ИНН / БИН"
              className="h-13 px-4 pt-2 text-sm  border border-gray-300
      focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 h-12 mt-2 bg-green-600 text-white
    rounded-lg font-medium hover:bg-green-700 transition"
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
