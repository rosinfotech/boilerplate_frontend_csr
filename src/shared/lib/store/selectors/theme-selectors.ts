import type { IThemeSlice } from "../slices/theme-slice";

export const selectHydrated = (state: IThemeSlice) => state.hydrated;

export const selectSetHydrated = (state: IThemeSlice) => state.setHydrated;

export const selectSetTheme = (state: IThemeSlice) => state.setTheme;

export const selectTheme = (state: IThemeSlice) => state.theme;

export const selectToggleTheme = (state: IThemeSlice) => state.toggleTheme;
