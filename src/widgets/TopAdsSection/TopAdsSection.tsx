 "use client";
 import Link from "next/link";
import carbon from "@/shared/assets/img/carbon.svg"


export const TopAdsSection = () => {
    return (
        <div>  
            <div className="" > 
                <h2 className="text-2xl font-bold  my-6">Топ объявления</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 px-2 py-4 lg:py-8 max-w-7xl mx-auto"> 
                <main className=" flex-1
                     grid
                     grid-cols-2  
                     sm:grid-cols-2
                     md:grid-cols-3
                     lg:grid-cols-4
                     gap-5">
                    {[1, 2, 3, 4, 5, 6, 7, 8,9].map((item) => (
                        <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden group  relative transition" key={item}>
                            <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
                                <img src="https://via.placeholder.com/300x180" alt="vehicle" className="object-cover w-full h-full" />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <div className="text-[20px] mb-1">Opel COMBO Airco Elct Ramen</div>
                                <div className="text-gray-600 text-sm mb-2">2015 • 2 000 кг • 490 574 км</div>
                                <div className="text-[#252525] font-bold text-lg mb-2">1 500€</div>
                                <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                                    <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />
                                    Garage van Nierop, <br />Netherlands
                                </div>
                            </div>
                            <button className="absolute left-1/2 bottom-5 px-4 py-1 bg-[#4689661A] text-[#009661] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">Больше</button>
                        </div>
                    ))}
                </main>
            </div> 
            <Link href="/" className=" flex justify-center mt-6 px-1 py-2 bg-[#009661] text-white rounded-lg shadow-lg hover:bg-[#007a4d] transition">Показать все объявления</Link>
        </div>
    );
};


