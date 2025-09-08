import { StateCreator } from "zustand";
import { PFResult } from '@shared/components/game-base/type";
export interface PFVerificationSlice {
    pfVerifyModalData: PFResult | null;
    updatePFVerify: (data: PFResult) => void;
}
export declare const createPFVerificationSlice: StateCreator<PFVerificationSlice>;
