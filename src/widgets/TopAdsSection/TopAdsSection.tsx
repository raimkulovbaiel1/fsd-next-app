"use client";

import carbon from "@/shared/assets/img/carbon.svg";

interface TopAdsSectionProps {
  ads?: Array<{
    id: number;
    title: string;
    year: number;
    weight: string;
    mileage: string;
    price: string;
    location: string;
    image: string;
  }>;
}

export const TopAdsSection = ({ ads }: TopAdsSectionProps) => {
  const defaultAds = [
    { id: 1, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
    { id: 2, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
    { id: 3, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
    { id: 4, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
    { id: 5, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
    { id: 6, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
    { id: 7, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
    { id: 8, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
    { id: 9, title: "Opel COMBO Airco Elct Ramen", year: 2015, weight: "2 000 кг", mileage: "490 574 км", price: "1 500€", location: "Garage van Nierop, Netherlands", image: "https://via.placeholder.com/300x180" },
  ];

  const displayAds = ads || defaultAds;

  return (
    <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {displayAds.map((ad) => (
        <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition" key={ad.id}>
          <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
            <img src={ad.image} alt={ad.title} className="object-cover w-full h-full" />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="text-[20px] mb-1">{ad.title}</div>
            <div className="text-gray-600 text-sm mb-2">{ad.year} • {ad.weight} • {ad.mileage}</div>
            <div className="text-[#252525] font-bold text-lg mb-2">{ad.price}</div>
            <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
              <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />
              {ad.location.split(', ').map((part, i, arr) => (
                <span key={i}>
                  {part}{i < arr.length - 1 ? ', ' : ''}
                  {i === 0 && arr.length > 1 && <br />}
                </span>
              ))}
            </div>
          </div>
          <button className="absolute left-1/2 bottom-5 px-4 py-1 bg-[#4689661A] text-[#009661] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
            Больше
          </button>
        </div>
      ))}
    </div>
  );
};


