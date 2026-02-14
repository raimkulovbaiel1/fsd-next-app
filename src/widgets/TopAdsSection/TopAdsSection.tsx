'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import carbon from '@/shared/assets/img/carbon.svg'
import img2 from '@/shared/assets/img/addSections/img2.png'
import img3 from '@/shared/assets/img/addSections/img3.png'
import img4 from '@/shared/assets/img/addSections/img4.png'
import img5 from '@/shared/assets/img/addSections/img5.png'
import img6 from '@/shared/assets/img/addSections/img6.png'
import img7 from '@/shared/assets/img/addSections/img7.png'
import img8 from '@/shared/assets/img/addSections/img8.png'
interface Ad {
  id: number
  title: string
  price: string
  location: string
  image: string
}

export const TopAdsSection = () => {
  const [ads, setAds] = useState<Ad[]>([])
  const [, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/topAds')
      .then(res => res.json())
      .then(data => setAds(data))
      .catch(err => console.error('Ошибка при загрузке topAds:', err))
      .finally(() => setLoading(false))
  }, [])

  const imageMap: Record<string, string> = {
    img2: img2.src,
    img3: img3.src,
    img4: img4.src,
    img5: img5.src,
    img6: img6.src,
    img7: img7.src,
    img8: img8.src,
  }


  return (
    <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-auto ">
      {ads.map((ad) => (
        <Link
          key={ad.id}
          href={`/Cart/${ad.id}`}
          className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition"
        >
          <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
            <img
              src={imageMap[ad.image] || ad.image}
              alt={ad.title}
              className=" w-full h-full"
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="text-[16px] font-medium text-[#252525] mb-1">{ad.title}</div>
            <div className="text-[#009661] text-[20px] font-bold mb-2">{ad.price}</div>
            <div className="text-[12px] text-gray-500 mt-auto flex items-center gap-2">
              <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />
              {ad.location.split(', ').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 ? ', ' : ''}
                  {i === 0 && arr.length > 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
