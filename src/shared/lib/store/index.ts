import type { IThemeSlice } from "./slices/theme-slice";
import type { IUiSlice } from "./slices/ui-slice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createThemeSlice } from "./slices/theme-slice";
import { createUiSlice } from "./slices/ui-slice";

type TStoreState = IThemeSlice & IUiSlice;

const isDevelopment = import.meta.env.DEV;

export const useStore = create<TStoreState>()(
    isDevelopment
        ? devtools(
              (...a) => ({
                  ...createThemeSlice(...a),
                  ...createUiSlice(...a),
              }),
              {
                  name: "AppStore",
              }
          )
        : (...a) => ({
              ...createThemeSlice(...a),
              ...createUiSlice(...a),
          })
);

export type { Theme } from "@/shared/types/theme";

export {
    selectCloseMobileMenu,
    selectHydrated,
    selectIsMobileMenuOpen,
    selectOpenMobileMenu,
    selectSetHydrated,
    selectSetTheme,
    selectTheme,
    selectToggleMobileMenu,
    selectToggleTheme,
} from "./selectors";
