import { Product } from '../types/product';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  showSeller?: boolean;
}

export const ProductCard = ({ product, showSeller = false }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition hover:shadow-lg">
        <div className="w-full h-44 bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="text-[20px] mb-1">{product.title}</div>

          <div className="text-gray-600 text-sm mb-2">
            {product.year} • {product.weight} • {product.mileage}
          </div>

          <div className="text-[#252525] font-bold text-lg mb-2">
            {product.price} {product.currency}
          </div>

          {showSeller && (
            <div className="text-[14px] text-gray-500 mb-2">
              Продавец: {product.sellerId}
            </div>
          )}

          <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
            📍 {product.location}
          </div>
        </div>

        <button className="absolute left-1/2 -translate-x-1/2 bottom-5 px-7 py-1 bg-[#4689661A] text-[#009661] rounded-lg shadow opacity-0 group-hover:opacity-100 transition">
          Подробнее
        </button>
      </div>
    </Link>
  );
};


