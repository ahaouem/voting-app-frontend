import scaffoldConfig from "@/scaffold.config";
import { ChainWithAttributes } from "@/utils/scaffol-eth";
import { create } from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
    nativeCurrencyPrice: number;
    setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
    targetNetwork: ChainWithAttributes;
    setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
};

export const useGlobalState = create<GlobalState>((set: any) => ({
    nativeCurrencyPrice: 0,
    setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
    targetNetwork: scaffoldConfig.targetNetworks[0],
    setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
}));