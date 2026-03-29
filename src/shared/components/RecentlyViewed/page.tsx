'use client';

import { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const Image1 = '/shared/assets/img/CartDetail/img.webp';

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
    title: 'Lider 2020 MODEL NEW',
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
    <section className="w-full  py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          <div className="flex flex-col justify-between lg:min-h-[338px]">
            <h2 className="text-[36px] sm:text-[42px] leading-[1.15] font-medium text-[#2b2b2b]">
              Недавно
              <br />
              просмотренные
            </h2>

            <div className="flex gap-3 mt-8">
              <button
                ref={prevRef}
                aria-label="Предыдущий слайд"
                className="w-10 h-10 rounded-lg bg-[#dff1e8] text-[#0a9b61] flex items-center justify-center hover:bg-[#d2eadf] transition"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                ref={nextRef}
                aria-label="Следующий слайд"
                className="w-10 h-10 rounded-lg bg-[#dff1e8] text-white flex items-center justify-center hover:bg-[#d2eadf] transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="w-full min-w-0">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              onBeforeInit={(swiper) => {
                if (typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation!.prevEl = prevRef.current;
                  swiper.params.navigation!.nextEl = nextRef.current;
                }
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                0: { slidesPerView: 1.15 },
                480: { slidesPerView: 1.4 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {vehi.map((item, index) => (
                <SwiperSlide key={index}>
                  <article className="bg-white rounded-[10px] overflow-hidden h-[338px] flex flex-col">
                    <div className="relative w-full h-[220px] bg-gray-200 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-1 px-4 py-4">
                      <h3 className="text-[15px] leading-[1.3] font-normal text-[#2d2d2d] line-clamp-2 min-h-[40px]">
                        {item.title}
                      </h3>

                      <div className="flex items-end justify-between gap-3 mt-4">
                        <div className="flex items-center gap-2 text-[14px] text-[#9b9b9b]">
                          <MapPin size={16} className="text-[#0a9b61] shrink-0" />
                          <span>{item.location}</span>
                        </div>

                        <p className="text-[18px] font-medium text-[#0a9b61] whitespace-nowrap">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}