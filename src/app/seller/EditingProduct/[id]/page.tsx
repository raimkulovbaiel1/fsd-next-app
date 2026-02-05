'use client';

import { useParams } from 'next/navigation';
import EditingProduct from '@/pages/Seller/EditingProduct/ui/EditingProduct';

export default function EditingProductPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || '';

  return <EditingProduct vehicleId={id} />;
}
