import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSellerNewItemPageStore } from "@/shared/store/pages/SellerNewItemPage";

describe("useSellerNewItemPageStore", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();

        useSellerNewItemPageStore.setState({
            fields: [],
            loading: false,
            error: null,
        });
    });

    it("fetchFields - успешный запрос", async () => {
        const mockFields = [
            {
                name: "category",
                label: "Категория",
                type: "text",
                placeholder: "Введите категорию",
            },
            {
                name: "brand",
                label: "Бренд",
                type: "text",
                placeholder: "Введите бренд",
            },
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve(
                new Response(JSON.stringify(mockFields), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                })
            )
        ) as any;

        const { result } = renderHook(() => useSellerNewItemPageStore());

        await act(async () => {
            await result.current.fetchFields();
        });

        expect(result.current.fields).toEqual(mockFields);
    });
    it("fetchFields - неуспешный запрос", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve(
                new Response(null, {
                    status: 500,
                })
            )
        ) as any;

        const { result } = renderHook(() => useSellerNewItemPageStore());

        await act(async () => {
            await result.current.fetchFields();
        });

        expect(result.current.fields).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("Не удалось загрузить поля формы");
    });

    it("fetchFields - если пришел не массив, должен записать пустой массив", async () => {
        const wrongData = {
            name: "category",
            label: "Категория",
        };

        global.fetch = vi.fn(() =>
            Promise.resolve(
                new Response(JSON.stringify(wrongData), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                })
            )
        ) as any;

        const { result } = renderHook(() => useSellerNewItemPageStore());

        await act(async () => {
            await result.current.fetchFields();
        });

        expect(result.current.fields).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

});
