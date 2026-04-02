import { create } from 'zustand';

export type FieldName =
  | 'category'
  | 'yearFrom'
  | 'brand'
  | 'mileage'
  | 'model'
  | 'country'
  | 'price'
  | 'weight';

export interface FieldConfig {
  name: FieldName;
  label: string;
  type?: string;
  placeholder?: string;
}

interface SellerNewItemPageState {
  fields: FieldConfig[];
  loading: boolean;
  error: string | null;
  fetchFields: () => Promise<void>;
}

export const useSellerNewItemPageStore = create<SellerNewItemPageState>()(
  (set) => ({
    fields: [],
    loading: false,
    error: null,

    fetchFields: async () => {
      try {
        set({ loading: true, error: null });

        const res = await fetch('http://localhost:5000/SellerNewitemPage');

        if (!res.ok) {
          throw new Error('Ошибка при загрузке полей');
        }

        const data: FieldConfig[] = await res.json();

        set({
          fields: Array.isArray(data) ? data : [],
          loading: false,
        });
      } catch (error) {
        set({
          error: 'Не удалось загрузить поля формы',
          loading: false,
        });

        console.error('Ошибка при загрузке полей:', error);
      }
    },
  })
);