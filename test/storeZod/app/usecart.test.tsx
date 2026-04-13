import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; 
import { useVehicleStore } from "@/shared/store/app/usecart" 
 
describe("useVehicleStore", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn(); 
    }); 
     
    it("fetchVehicleById - успешный запрос", async () => { 
        const mockVehicle = {
            id: "1",
            name: "BMW X5",
            year: "2020",
            weight: "2000",
            mileage: "100000",
            price: "1500", 
            location: "Bishkek",
            image: "/test.jpg",
        }; 
        global.fetch = vi.fn(() =>
            Promise.resolve(new Response(JSON.stringify(mockVehicle), {
                headers: { "Content-Type": "application/json" },
            }))
        ) as any; 
        const { result } = renderHook(() => useVehicleStore()); 
        await act(async () => { 
            await result.current.fetchVehicleById("1"); 
        }); 
        expect(result.current.vehicle).toEqual(mockVehicle);
    }); 

    it('fetchTopAdById - успешный запрос на выборку тавара ', async () => {
        const mockTopAd = {
            id: "2",
            name: "Top Ad 2",
            description: "Description for Top Ad 2",
        };
        global.fetch = vi.fn(() =>
            Promise.resolve(new Response(JSON.stringify(mockTopAd), {
                headers: { "Content-Type": "application/json" },
            }))
        ) as any;
        const { result } = renderHook(() => useVehicleStore());
        await act(async () => {
            await result.current.fetchTopAdById("2");
        });
        expect(result.current.topAd).toEqual(mockTopAd);  
    }); 

    it(' clearVehicle - очищает данные автомобиля ', async () => { 
        const { result } = renderHook(() => useVehicleStore());
        await act(async () => {
            result.current.clearVehicle();
        });
        expect(result.current.vehicle).toBeNull(); 
    });
    });  