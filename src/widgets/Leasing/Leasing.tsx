"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import carbon from "@/shared/assets/img/carbon.svg";

interface LeasingItem {
   id: number;
   title: string;
   year: number;
   weight: string;
   mileage: string;
   price: string;
   location: string;
   image: string;
}

interface Filters {
   price: { min: number; max: number };
   transportTypes: string[];
   manufacturers: string[];
   adTypes: string[];
   countries: string[];
}

const Leasing: FC = () => {
   const [items, setItems] = useState<LeasingItem[]>([]);
   const [, setLoading] = useState(true);
   const [filters, setFilters] = useState<Filters | null>(null);

   useEffect(() => {
      const apiUrl = process.env.NEXT_PUBLIC_LEASING_API;
      fetch(apiUrl!)
         .then(res => res.json())
         .then(data => {
            setItems(data[0].Leasing);
            setLoading(false);
         })
         .catch((err) => {
            console.error(err);
            setLoading(false);
         });
      fetch("http://localhost:4091/filters")
         .then((res) => res.json())
         .then((data) => setFilters(data))
         .catch((err) => console.error(err));
   }, []);

   return (
      <div className="max-w-7xl mx-auto px-2">
         <nav className="text-[14px] text-[#8B959E] py-4">
            <Link href="/" className="hover:text-green-500">Главная</Link>
            <span className="mx-2">{'>'}</span>
            <span className="text-[#252525]">Продавцы</span>
            <span className="mx-2">{'>'}</span>
            <span className="text-[#252525]">Лизинг</span>
         </nav>
         <h2 className="text-3xl font-bold text-[#252525] py-4">
            Продавец OTP Leasing
         </h2>
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
               {!filters ? (
                  <div className="text-sm text-gray-400">Загрузка фильтров...</div>
               ) : (
                  <form className="space-y-4">

                     <div>
                        <div className="font-medium border-b py-2">
                           Цена, €
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                           {filters.price.min} – {filters.price.max}
                        </div>
                     </div>
                     <div>
                        <div className="font-medium border-b py-2">Тип транспорта</div>
                        {filters.transportTypes.map(t => (
                           <label key={t} className="block text-sm mt-1">
                              <input type="checkbox" className="mr-2" />
                              {t}
                           </label>
                        ))}
                     </div>
                     <div>
                        <div className="font-medium border-b py-2">Производитель</div>
                        {filters.manufacturers.map(m => (
                           <label key={m} className="block text-sm mt-1">
                              <input type="checkbox" className="mr-2" />
                              {m}
                           </label>
                        ))}
                     </div>
                     <div>
                        <div className="font-medium border-b py-2">Тип объявления</div>
                        {filters.adTypes.map(a => (
                           <label key={a} className="block text-sm mt-1">
                              <input type="checkbox" className="mr-2" />
                              {a}
                           </label>
                        ))}
                     </div>
                     <div>
                        <div className="font-medium border-b py-2">Страна</div>
                        {filters.countries.map(c => (
                           <label key={c} className="block text-sm mt-1">
                              <input type="checkbox" className="mr-2" />
                              {c}
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

            <main className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
               {items.map((item) => (
                  <div
                     key={item.id}
                     className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition"
                  >
                     <div className="w-full h-44 bg-gray-100">
                        <img
                           src={item.image}
                           alt={item.title}
                           className="object-cover w-full h-full"
                        />
                     </div>

                     <div className="p-4 flex flex-col flex-1">
                        <div className="text-[20px] mb-1">{item.title}</div>

                        <div className="text-gray-600 text-sm mb-2">
                           {item.year} • {item.weight} • {item.mileage}
                        </div>

                        <div className="text-[#252525] font-bold text-lg mb-2">
                           {item.price}
                        </div>

                        <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                           <img src={carbon.src} alt="carbon" className="w-5 h-5" />
                           {item.location}
                        </div>
                     </div>

                     <button className="absolute left-1/2 -translate-x-1/2 bottom-5 px-7 py-1 bg-[#4689661A] text-[#009661] rounded-lg shadow opacity-0 group-hover:opacity-100 transition">
                        Больше
                     </button>
                  </div>
               ))}
            </main>
         </div>
      </div>
   );
};

export { Leasing };

