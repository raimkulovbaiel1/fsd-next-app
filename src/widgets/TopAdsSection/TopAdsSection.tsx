'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import carbon from '@/shared/assets/img/carbon.svg'
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

  return (
    <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-auto max-h-[calc(100vh-150px)]">
      {ads.map((ad) => (
        <Link 
          key={ad.id}
          href={`/ads/${ad.id}`}
          className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition"
        >
          <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
            <img
              src={ad.image}
              alt={ad.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="text-[15px] font-medium text-[#252525] mb-1">{ad.title}</div>
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
