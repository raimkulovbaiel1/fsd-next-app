import { FC } from 'react'
import Link from 'next/link'
import carbon from "@/shared/assents/img/carbon.svg"
const Leasing : FC = () => {
   return (
      <div className="max-w-7xl mx-auto px-2">
         <nav className="text-[14px] text-[#8B959E] py-4">
            <Link href="/" className="hover:text-green-500">
               Главная
            </Link>
            <span className="mx-2">{'>'}</span>
            <span className="text-[#252525]">Продавацы</span>
            <span className="mx-2">{'>'}</span>
            <span className="text-[#252525]">Лизинг</span>
         </nav>

         <div className="text-3xl font-bold text-[#252525] py-4">
            <h2>Продавец OTP Leasing</h2>
         </div>

         <div className="text-[14px] pb-4 flex gap-4">
            <Link
               href="/write-to-seller"
               className="bg-[#009661] text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
               написать продавцу
            </Link>

            <Link
               href="/company"
               className="text-[#009661] hover:underline self-center"
            >
               Про компанию
            </Link>
         </div>


         <div className="flex flex-col lg:flex-row gap-6 px-2 py-4 lg:py-8 max-w-7xl mx-auto">
            <button className="block lg:hidden w-full bg-[#0096611A] text-[#009661] py-2 rounded font-semibold">
               Открыть фильтр
            </button>

            <aside className="hidden lg:block w-full lg:w-80 bg-white rounded-xl shadow p-4 h-fit mb-4 lg:mb-0">
               <form>
                  <div className="space-y-4">
                     <div>
                        <button
                           type="button"
                           className="flex items-center gap-3 w-full text-left text-[#252525] font-medium text-[16px] py-2 border-b border-gray-200"
                        >
                           <span className="text-[#8B959E] text-[18px]">+</span>
                           <span>Цена, €</span>
                        </button>

                     </div>
                     <div>
                        <button
                           type="button"
                           className="flex items-center gap-3 w-full text-left text-[#252525] font-medium text-[16px] py-2 border-b border-gray-200"
                        >
                           <span className="text-[#8B959E] text-[18px]">+</span>
                           <span>Тип транспорта</span>
                        </button>

                     </div>
                     <div>
                        <button
                           type="button"
                           className="flex items-center gap-3 w-full text-left text-[#252525] font-medium text-[16px] py-2 border-b border-gray-200"
                        >
                           <span className="text-[#8B959E] text-[18px]">+</span>
                           <span>Производитель</span>
                        </button>

                     </div>
                     <div>
                        <button
                           type="button"
                           className="flex items-center gap-3 w-full text-left text-[#252525] font-medium text-[16px] py-2 border-b border-gray-200"
                        >
                           <span className="text-[#8B959E] text-[18px]">+</span>
                           <span>Тип объявления</span>
                        </button>

                     </div>
                     <div>
                        <button
                           type="button"
                           className="flex items-center gap-3 w-full text-left text-[#252525] font-medium text-[16px] py-2 border-b border-gray-200"
                        >
                           <span className="text-[#8B959E] text-[18px]">+</span>
                           <span>Страна
                              местонахождения</span>
                        </button>

                     </div>
                     <div>
                        <button
                           type="button"
                           className="flex items-center gap-3 w-full text-left text-[#252525] font-medium text-[16px] py-2 border-b border-gray-200"
                        >
                           <span className="text-[#8B959E] text-[18px]">+</span>
                           <span>Тип объявления</span>
                        </button>

                     </div>
                  </div>
                  <button
                     type="submit"
                     className="w-full bg-green-400 hover:bg-green-500 text-white rounded py-2 font-semibold transition mt-4"
                  >
                     Применить
                  </button>
               </form>
            </aside>



            <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
               {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
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
         <div className='flex justify-center cursor-pointer' >
            <button className="mt-6 mb-6 px-7 py-2  text-[#FFFFFF] bg-[#009661]  rounded font-semibold">Загрузить больше</button>
         </div>
      </div>
   )
}
export default Leasing; 
