'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import carbon from "@/shared/assets/img/carbon.svg";
import img from "@/shared/assets/img/searchResult/img1.png";
import img2 from "@/shared/assets/img/searchResult/img2.png";
import img3 from "@/shared/assets/img/searchResult/img3.png";
import img4 from "@/shared/assets/img/searchResult/img4.png";
import img5 from "@/shared/assets/img/searchResult/img5.png";
import img6 from "@/shared/assets/img/searchResult/img6.png";

interface Vehicle {
  id: string;
  name: string;
  year: string;
  weight: string;
  mileage: string;
  price: string;
  location: string;
  image: string;
  transportType?: string;
  brand?: string;
  gearbox?: string;
  adType?: string;
}

export const SearchResult = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const searchParams = useSearchParams();
  const search = (searchParams?.get("search") ?? "").toLowerCase().trim();




  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [selectedFilters, setSelectedFilters] = useState({
    transportType: "",
    brands: [] as string[],
    country: "",
    gearbox: "",
    adTypes: [] as string[],
  });

  const [appliedFilters, setAppliedFilters] = useState(selectedFilters);

  const imageMap: { [key: string]: string } = {
    img1: img.src,
    img2: img2.src,
    img3: img3.src,
    img4: img4.src,
    img5: img5.src,
    img6: img6.src,
  };

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/SearchResult").then(res => res.json()),
      fetch("http://localhost:5000/SearchResultFilters").then(res => res.json())
    ])
      .then(([vehiclesData, filtersData]) => {
        setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
        setFilters(filtersData || null);

        if (filtersData?.price) {
          setMinPrice(filtersData.price.min);
          setMaxPrice(filtersData.price.max);
        }
      })
      .catch(err => console.error("Ошибка при загрузке данных:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Загрузка...</div>;

  const filteredVehicles = vehicles.filter(vehicle => {
    const price = Number(vehicle.price);
    if (price < minPrice || price > maxPrice) return false;
    if (appliedFilters.transportType && vehicle.transportType !== appliedFilters.transportType) return false;
    if (appliedFilters.brands.length > 0 && !appliedFilters.brands.includes(vehicle.brand || "")) return false;
    if (appliedFilters.country && vehicle.location !== appliedFilters.country) return false;
    if (appliedFilters.gearbox && vehicle.gearbox !== appliedFilters.gearbox) return false;
    if (appliedFilters.adTypes.length > 0 && !appliedFilters.adTypes.includes(vehicle.adType || "")) return false;

    if (search) {
      const matchesSearch =
        vehicle.name?.toLowerCase().includes(search) ||
        vehicle.brand?.toLowerCase().includes(search) ||
        vehicle.transportType?.toLowerCase().includes(search) ||
        vehicle.location?.toLowerCase().includes(search);

      if (!matchesSearch) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-2 py-4 lg:py-8 max-w-7xl mx-auto">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="block lg:hidden w-full bg-[#0096611A] text-[#009661] py-2 rounded font-semibold"
      >
        Открыть фильтр
      </button>

      <aside className={`fixed inset-y-0 left-0 z-50 w-full bg-white p-4 overflow-y-auto
        transition-transform duration-300
        ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0 lg:w-80 lg:rounded-xl lg:shadow lg:h-fit`}>

        <div className="flex justify-between items-center mb-4 lg:hidden">
          <span className="font-semibold text-lg">Фильтры</span>
          <button onClick={() => setIsFilterOpen(false)} className="text-[#009661] text-xl font-bold">✕</button>
        </div>

        {filters ? (
          <form>
            <label className="block font-semibold mb-2">Цена, €</label>
            <div className="flex justify-between gap-2 mb-4">
              <div className="flex items-center w-1/2 border rounded px-2 py-1 border-[#009661]">
                <span className="mr-1">от</span>
                <input
                  type="number"
                  min={filters.price.min}
                  max={filters.price.max}
                  value={minPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMinPrice(val > maxPrice ? maxPrice : val);
                  }}
                  className="w-full outline-none text-[#009661]"
                  placeholder="Минимум"
                />
              </div>

              <div className="flex items-center w-1/2 border rounded px-2 py-1 border-[#009661]">
                <span className="mr-1">до</span>
                <input
                  type="number"
                  min={filters.price.min}
                  max={filters.price.max}
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMaxPrice(val < minPrice ? minPrice : val);
                  }}
                  className="w-full outline-none text-[#009661]"
                  placeholder="Максимум"
                />
              </div>
            </div>

            <select
              value={selectedFilters.transportType}
              className="w-full border mt-2 text-[14px] rounded px-2 py-1 mb-4"
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, transportType: e.target.value }))}
            >
              <option value="">Тип транспорта</option>
              {filters.types?.map((type: string) => <option key={type} value={type}>{type}</option>)}
            </select>

            <div className="space-y-2 text-[14px] max-h-40 overflow-y-auto pr-2 mb-4">
              {filters.brands?.map((brand: string) => (
                <label key={brand} className="block">
                  <input
                    type="checkbox"
                    value={brand}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedFilters(prev => ({ ...prev, brands: [...prev.brands, brand] }));
                      else setSelectedFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }));
                    }}
                  />{" "}{brand}
                </label>
              ))}
            </div>

            <select
              className="w-full border text-[14px] rounded px-2 py-2 mb-4"
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, country: e.target.value }))}
            >
              <option value="">Страна местонахождения</option>
              {filters.countries?.map((country: string) => <option key={country} value={country}>{country}</option>)}
            </select>

            <select
              className="w-full border text-[14px] rounded px-2 py-2 mb-4"
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, gearbox: e.target.value }))}
            >
              <option value="">Коробка передач</option>
              {filters.gearboxes?.map((gearbox: string) => <option key={gearbox} value={gearbox}>{gearbox}</option>)}
            </select>

            <div className="mb-6">
              {filters.adTypes?.map((adType: string) => (
                <label key={adType} className="block">
                  <input
                    type="checkbox"
                    value={adType}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedFilters(prev => ({ ...prev, adTypes: [...prev.adTypes, adType] }));
                      else setSelectedFilters(prev => ({ ...prev, adTypes: prev.adTypes.filter(t => t !== adType) }));
                    }}
                  />{" "}{adType}
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setAppliedFilters(selectedFilters);
                setVisibleCount(5);
                setIsFilterOpen(false);
              }}
              className="w-full bg-[#009661] text-white py-2 rounded font-semibold"
            >
              Применить
            </button>
          </form>
        ) : <div>Фильтры недоступны</div>}
      </aside>

      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
        {filteredVehicles.slice(0, visibleCount).map(vehicle => (
          <Link
            key={vehicle.id}
            href={`/Cart/${vehicle.id}`}
            className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition hover:shadow-lg"
          >
            <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
              <img src={imageMap[vehicle.image] || vehicle.image} alt={vehicle.name} className="object-cover w-full h-full" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-[20px] mb-1 border-b">{vehicle.name}</div>
              <div className="text-gray-600 text-sm mb-2 border-b">{vehicle.year} | {vehicle.weight} кг | {vehicle.mileage} | км</div>
              <div className="text-[#252525] font-bold text-lg mb-2">{vehicle.price}€</div>
              <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />{vehicle.location}
              </div>
            </div>
            <div className="absolute left-1/2 text-[13px] bottom-5 px-3 py-1 bg-[#4689661A] text-[#009661] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Больше информации
            </div>
          </Link>
        ))}

        {visibleCount < filteredVehicles.length && (
          <div className="flex justify-center mt-6 col-span-full">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="bg-[#009661] text-white px-6 py-2 rounded-lg transition hover:bg-[#007f52]"
            >
              Загрузить ещё
            </button>
          </div>
        )}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Ничего не найдено по запросу: <span className="font-semibold">{search}</span>
          </div>
        )}
      </main>
    </div>
  );
};
