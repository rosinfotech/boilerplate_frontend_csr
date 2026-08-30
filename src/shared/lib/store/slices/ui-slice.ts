import type { StateCreator } from "zustand";

export interface IUiSlice {
    closeMobileMenu: () => void;
    isMobileMenuOpen: boolean;
    openMobileMenu: () => void;
    toggleMobileMenu: () => void;
}

export const createUiSlice: StateCreator<IUiSlice> = (set, get) => {
    return {
        closeMobileMenu() {
            set({ isMobileMenuOpen: false });
        },

        isMobileMenuOpen: false,

        openMobileMenu() {
            set({ isMobileMenuOpen: true });
        },

        toggleMobileMenu() {
            const params = get();
            const { isMobileMenuOpen } = params;
            set({ isMobileMenuOpen: !isMobileMenuOpen });
        },
    };
};
