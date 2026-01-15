"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface FavoriteItem {
    id: number;
    name: string;
    year: number;
    weight: string;
    mileage: string;
    price: string;
    location: string;
    image: string;
}

export default function ProductPage() {
    const { id } = useParams();
    const [item, setItem] = useState<FavoriteItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(process.env.NEXT_PUBLIC_WISHLIST_API!)
            .then((res) => res.json())
            .then((data: FavoriteItem[]) => {
                setItem(data.find((el) => String(el.id) === id) || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (!item) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-semibold mb-4">Товар не найден</h2>
                <Link href="/" className="text-[#009661] underline">
                    Вернуться назад
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Link href="/Wishlist" className="text-sm text-[#009661] hover:underline">
                ← Назад к списку
            </Link>

            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 md:p-10
                flex flex-col-3 md:grid  md:grid-cols-1 gap-8">

                <div className="w-50 h-50 overflow-hidden bg-gray-100">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-40 h-50 "
                    />
                </div>

                <main className="flex flex-col">
                    <h1 className="text-3xl font-bold text-[#252525] mb-2">
                        {item.name}
                    </h1>

                    <div className="text-gray-500 mb-4">
                        {item.year} • {item.mileage}
                    </div>

                    <div className="text-3xl font-bold text-[#009661] mb-6">
                        {item.price}
                    </div>

                    <div className="border-t pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Вес"</span>
                            <span className="font-medium">{item.weight}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Локация</span>
                            <span className="font-medium">{item.location}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 flex gap-3">
                        <button className="flex-1 bg-[#009661] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                            Связаться с продавцом
                        </button>
                        <button className="px-4 py-2 bg-amber-600 border rounded-xl hover:bg-gray-50 transition">
                            ❤
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
