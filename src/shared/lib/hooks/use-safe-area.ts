import type { SafeAreaInsets } from "capacitor-plugin-safe-area";
import { Capacitor } from "@capacitor/core";
import { SafeArea } from "capacitor-plugin-safe-area";
import { useEffect } from "react";

export type TSafeAreaInsets = SafeAreaInsets["insets"];

export const applySafeAreaInsets = (insets: TSafeAreaInsets) => {
    for (const [key, value] of Object.entries(insets)) {
        document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
    }
};

export const useSafeArea = () => {
    useEffect(() => {
        if (!Capacitor.isNativePlatform()) {
            return;
        }

        let isDisposed = false;
        let listenerHandle: { remove: () => Promise<void> } | null = null;

        void SafeArea.getSafeAreaInsets().then(({ insets }) => {
            if (!isDisposed) {
                applySafeAreaInsets(insets);
            }
        });

        void SafeArea.addListener("safeAreaChanged", ({ insets }) => {
            if (!isDisposed) {
                applySafeAreaInsets(insets);
            }
        }).then(handle => {
            if (isDisposed) {
                void handle.remove();
            } else {
                listenerHandle = handle;
            }
        });

        return () => {
            isDisposed = true;

            if (listenerHandle) {
                void listenerHandle.remove();
            }
        };
    }, []);
};
