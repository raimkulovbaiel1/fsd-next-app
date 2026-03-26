"use client";

import { FC, useEffect } from "react";
import carbon from "@/shared/assets/img/carbon.svg";
import Link from "next/link";
import { useLeasingStore } from "@/shared/store/widgets/FavoritesPage";

const Leasing: FC = () => {
   const {
      items,
      filters,
      loading,
      isFilterOpen,
      fetchLeasing,
      fetchFilters,
      setFilterOpen,
   } = useLeasingStore();

   useEffect(() => {
      fetchLeasing();
      fetchFilters();
   }, [fetchLeasing, fetchFilters]);

   return (
      <>
         <button
            onClick={() => setFilterOpen(true)}
            className="block lg:hidden w-full bg-[#0096611A] text-[#009661] py-2 rounded font-semibold"
         >
            Открыть фильтр
         </button>

         <div className="flex flex-col lg:flex-row gap-6">
            <aside
               className={`
            fixed inset-0 z-50 bg-white p-4 overflow-y-auto
            transition-transform duration-300
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0 lg:block
            lg:w-80 lg:rounded-xl lg:shadow lg:h-fit
          `}
            >
               <div className="flex justify-between items-center mb-4 lg:hidden">
                  <span className="font-semibold text-lg">Фильтры</span>
                  <button
                     onClick={() => setFilterOpen(false)}
                     className="text-[#009661] font-semibold"
                  >
                     ✕
                  </button>
               </div>

               {!filters ? (
                  <div className="text-sm text-gray-400">Загрузка фильтров...</div>
               ) : (
                  <form className="space-y-4">
                     <div>
                        <div className="font-medium border-b py-2">Цена, €</div>
                        <div className="text-sm text-gray-500 mt-2">
                           {filters.price.min} – {filters.price.max}
                        </div>
                     </div>

                     <div>
                        <div className="font-medium border-b py-2">Тип транспорта</div>
                        {filters.transportTypes.map((type) => (
                           <label key={type} className="block text-sm mt-1">
                              <input type="checkbox" className="mr-2" />
                              {type}
                           </label>
                        ))}
                     </div>

                     <div>
                        <div className="font-medium border-b py-2">Производитель</div>
                        {filters.manufacturers.map((manufacturer) => (
                           <label key={manufacturer} className="block text-sm mt-1">
                              <input type="checkbox" className="mr-2" />
                              {manufacturer}
                           </label>
                        ))}
                     </div>

                     <div>
                        <div className="font-medium border-b py-2">Тип объявления</div>
                        {filters.adTypes.map((adType) => (
                           <label key={adType} className="block text-sm mt-1">
                              <input type="checkbox" className="mr-2" />
                              {adType}
                           </label>
                        ))}
                     </div>

                     <div>
                        <div className="font-medium border-b py-2">Страна</div>
                        {filters.countries.map((country) => (
                           <label key={country} className="block text-sm mt-1">
                              <input type="checkbox" className="mr-2" />
                              {country}
                           </label>
                        ))}
                     </div>

                     <button
                        type="submit"
                        className="w-full bg-green-400 hover:bg-green-500 text-white rounded py-2 font-semibold transition mt-4"
                     >
                        Применить
                     </button>
                  </form>
               )}
            </aside>

            <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
               {loading && <div>Загрузка...</div>}

               {items.map((item) => (
                  <Link key={item.id} href={`/product/${item.id}`}>
                     <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition">
                        <div className="w-full h-44 bg-gray-100">
                           <img
                              src={item.image}
                              alt={item.title}
                              className="object-cover w-full h-full"
                           />
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                           <div className="text-[20px] border-b mb-1">
                              {item.title}
                           </div>

                           <div className="text-gray-600 border-b text-sm mb-2">
                              {item.year} | {item.weight} | {item.mileage}
                           </div>

                           <div className="text-[#252525] font-bold text-lg mb-2">
                              {item.price}
                           </div>

                           <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                              <img src={carbon.src} className="w-5 h-5" />
                              {item.location}
                           </div>
                        </div>
                     </div>
                     <div className="absolute left-[32vh] text-[13px]  bottom-5 px-3 py-2 bg-[#4689661A] text-[#009661] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        Больше информации
                     </div>
                  </Link>
               ))}
            </main>
         </div>
      </>
   );
};

export { Leasing };