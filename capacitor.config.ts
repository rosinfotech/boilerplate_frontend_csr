import type { CapacitorConfig } from "@capacitor/cli";

const isDevelopment = process.env.NODE_ENV === "development";
const port = process.env.PORT || "33333";

const config: CapacitorConfig = {
    appId: "tech.rosinfo.demo.boilerplate_frontend_tanstack_router",
    appName: "Rosinfotech Boilerplate Frontend TanStack Router/Mobile",
    plugins: {
        CapacitorAssets: {
            iconPath: "src/capacitor/assets/icon.svg",
            splashPath: "src/capacitor/assets/splash.svg",
        },
    },
    server: {
        androidScheme: "https",
        ...(isDevelopment && {
            cleartext: true,
            url: `http://localhost:${port}`,
        }),
    },
    webDir: "dist-mobile/client",
};

export default config;
