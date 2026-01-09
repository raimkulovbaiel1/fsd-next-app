import React from 'react'
import Link from 'next/link'
import carbon from "@/shared/assets/img/carbon.svg"

export const SearchResult = () => {
  return (
    <div className="max-w-7xl mx-auto px-2">
      <nav className="text-[14px] text-[#8B959E] py-4">
        <Link href="/" className="hover:text-green-500">
          Главная
        </Link>
        <span className="mx-2">{'>'}</span>
        <span className="text-[#252525]">Транспортные средства</span>
      </nav>


      <div className="flex flex-col lg:flex-row gap-6 px-2 py-4 lg:py-8 max-w-7xl mx-auto">
        <button className="block lg:hidden w-full bg-[#0096611A] text-[#009661] py-2 rounded font-semibold">
          Открыть фильтр
        </button>
        <aside className="hidden lg:block w-full lg:w-80 bg-white rounded-xl shadow p-4 h-fit mb-4 lg:mb-0">
          <form>
            <div className="mb-5">
              <label htmlFor="price-range" className="block font-semibold mb-1" > ___ Цена, €</label>
              <button className="flex items-center gap-3 border  px-15 py-1 mb-6">
                <span>от 1 200</span>
                <span className="h-10 border-l border-gray-400" />
                <span>до 152 444</span>
              </button>
              <input type="range" id="price-range" min="1200" max="152444" className="w-full  accent-green-400" />
            </div>

            <div className="mb-5  ">
              <label className="block font-[16px] text-[#252525] mb-5"> -Тип транспорта</label>
              <select className="w-full border text-[#8B959E] text-[14px]  rounded px-2 py-1">
                <option>Грузовики</option>
                <option>Автобусы</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="block font-[16px] text-[#252525] mb-5"> - Производитель</label>
              <div className="space-y-1 text-[14px]  max-h-40  overflow-y-auto  pr-1 text-[#8B959E]">
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Volkswagen</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Mercedes Benz</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Volvo</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Iveco</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Van Hool</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Volkswagen</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Mercedes Benz</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Volvo</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Iveco</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Van Hool</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Volkswagen</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Mercedes Benz</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Volvo</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Iveco</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Van Hool</label>
              </div>
            </div>
            <div className="mb-5">
              <label className="block font-[16px] text-[#252525] mb-5"> - Страна<br />местонахождения</label>
              <select className="w-full border text-[14px] rounded px-2 py-1">
                <option>Франция, Италия</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="block font-[16px] text-[#252525] mb-5"> - Коробка передач</label>
              <div className="space-y-1 text-[14px] text-[#8B959E] ">
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Автомат</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Механика</label>
              </div>
            </div>
            <div className="mb-5">
              <label className="block font-[16px] text-[#252525] mb-5"> - Тип объявления</label>
              <div className="space-y-1 text-[14px] text-[#8B959E]">
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Аукцион</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> По запросу</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Лизинг</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-green-400" /> Сдать в аренду</label>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-400 hover:bg-green-500 text-white rounded py-2 font-semibold transition">Применить</button>
          </form>
        </aside>



        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
          {[1, 2, 3, 4, 5, 6,].map((item) => (
            <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition" key={item}>
              <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
                <img src="https://via.placeholder.com/300x180" alt="vehicle" className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className=" text-[20px] mb-1">Opel COMBO Airco Elct Ramen</div>
                <div className="text-gray-600 text-sm mb-2">2015 • 2 000 кг • 490 574 км</div>
                <div className="text-[#252525] font-bold text-lg mb-2">1 500€</div>
                <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                  <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />
                  Garage van Nierop, <br />Netherlands
                </div>
              </div>
              <button className="absolute  left-1/2  bottom-5 px-1 py-1 bg-[#4689661A] text-[#009661] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">Больше информации</button>
            </div>
          ))}
        </main>

      </div>
    </div>
  )
}

