import type { IThemeSlice } from "./slices/theme-slice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createThemeSlice } from "./slices/theme-slice";


type TStoreState = IThemeSlice;

const isDevelopment = import.meta.env.DEV;

export const useStore = create<TStoreState>()(
    isDevelopment
        ? devtools(
              (...a) => ({
                  ...createThemeSlice(...a),
              }),
              {
                  name: "AppStore",
              }
          )
        : (...a) => ({
              ...createThemeSlice(...a),
          })
);

export type { Theme } from "@/shared/types/theme";
