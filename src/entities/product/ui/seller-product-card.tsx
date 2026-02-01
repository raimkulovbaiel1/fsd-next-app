import Link from 'next/link';
import { Product } from '../types/product';

type SellerProductCardProps = {
  product: Product;
  onEdit?: (productId: string) => void;
  onDelete?: (productId: string) => void;
};

export const SellerProductCard = ({ product, onEdit, onDelete }: SellerProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden relative transition hover:shadow-lg">
      <Link href={`/product/${product.id}`}>
        <div className="w-full h-44 bg-gray-100">
          <img src={product.image} alt={product.title} className="object-cover w-full h-full" />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-[20px] mb-1">{product.title}</div>
        <div className="text-gray-600 text-sm mb-2">
          {product.year} • {product.weight} • {product.mileage}
        </div>
        <div className="text-[#252525] font-bold text-lg mb-3">
          {product.price} {product.currency}
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
            onClick={() => onEdit?.(product.id)}
          >
            Редактировать
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-md bg-red-50 hover:bg-red-100 text-red-700 text-sm"
            onClick={() => onDelete?.(product.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

