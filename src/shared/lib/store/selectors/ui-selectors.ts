import type { IUiSlice } from "../slices/ui-slice";

export const selectCloseMobileMenu = (state: IUiSlice) => state.closeMobileMenu;

export const selectIsMobileMenuOpen = (state: IUiSlice) => state.isMobileMenuOpen;

export const selectOpenMobileMenu = (state: IUiSlice) => state.openMobileMenu;

export const selectToggleMobileMenu = (state: IUiSlice) => state.toggleMobileMenu;
