'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image1 from '@/shared/assets/img/CartDetail/img.png'
import { StaticImageData } from 'next/image';

type Vehi = {
  title: string;
  price: string;
  location: string;
  image: string | StaticImageData;
};

const vehi: Vehi[] = [
  {
    title: 'Opel COMBO Airco Elct Ramen',
    price: '1 500€',
    location: 'Netherlands',
    image: Image1,
  },
  {
    title: 'Lider 2020 MODEL NEW FLATBED',
    price: '11 000€',
    location: 'Turkey',
    image: Image1,
  },
  {
    title: 'Lowbed semi trailers 2020',
    price: '58 000€',
    location: 'Turkey',
    image: Image1,
  },
  {
    title: 'Mercedes-Benz 313 CDI',
    price: '39 900€',
    location: 'Turkey',
    image: Image1,
  },
  {
    title: 'Mercedes-Benz 313 CDI',
    price: '39 900€',
    location: 'Turkey',
    image: Image1,
  },
  {
    title: 'Mercedes-Benz 313 CDI',
    price: '39 900€',
    location: 'Turkey',
    image: Image1,
  },
];

export default function RecentlyViewed() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-5 py-1">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_fr] gap-6 items-start">
        <div className="flex flex-col ml-20 justify-between">
          <h2 className="text-[30px] font-medium leading-tight text-gray-900">
            Недавно<br />просмотренные
          </h2>
          <div className="flex gap-1 mt-6">
            <button
              ref={prevRef}
              className="w-12 h-12 rounded-lg bg-emerald-600 text-white text-3xl flex items-center justify-center hover:bg-emerald-700 transition"
            >
              ‹
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 rounded-lg bg-emerald-600 text-white text-3xl flex items-center justify-center hover:bg-emerald-700 transition"
            >
              ›
            </button>
          </div>
        </div>
        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            pagination={{ clickable: true }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              0: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {vehi.map((vehi, index) => (
              <SwiperSlide>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

                  <div className="w-44  bg-gray-200 overflow-hidden">
                    <img
                      src={vehi.image.src}
                      alt={vehi.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {vehi.title}
                    </h3>

                    <p className="text-emerald-600 font-bold mt-2">
                      {vehi.price}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {vehi.location}
                    </p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
