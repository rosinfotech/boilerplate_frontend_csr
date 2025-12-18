import type { EventEmitter } from "node:events";
import type { ClientRequest, IncomingMessage } from "node:http";
import { default as path } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import circleDependencyPlugin from "vite-plugin-circular-dependency";
import magicalSvgPlugin from "vite-plugin-magical-svg";
import { mockDevServerPlugin } from "vite-plugin-mock-dev-server";
import defaultMockDevServerConfig from "./.mock/config";
import { getGitDescribe } from "./.scripts/get-git-describe";


export default defineConfig(async ({ mode }) => {
    const PORT = 33333;
    const envDir = path.resolve(__dirname, "./envs/");
    const envVariables = loadEnv(mode, envDir);
    const gitDescribe = await getGitDescribe();
    const shouldUseMock = envVariables.VITE_DEV_SERVER_USE_MOCK === "true";
    const shouldLogProxy = envVariables.VITE_DEV_SERVER_LOG_PROXY === "true";

    console.log(mode);
    console.log(
        JSON.stringify(
            {
                envVariables,
                gitDescribeInfo: gitDescribe,
            },
            undefined,
            4
        )
    );

    return {
        build: {
            assetsDir: "assets",
            cssCodeSplit: false,
            emptyOutDir: true,
            inlineDynamicImports: true,
            minify: true,
            outDir: path.resolve(__dirname, "build"),
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, "index.html"),
                },
            },
            target: "ES2020",
        },
        css: {
            devSourcemap: true,
        },
        define: gitDescribe,
        envDir,
        plugins: [
            react(),
            tailwindcss(),
            magicalSvgPlugin({
                svgo: false,
                target: "react19",
            }),
            circleDependencyPlugin(),
            shouldUseMock ? mockDevServerPlugin(defaultMockDevServerConfig) : undefined,
        ],
        publicDir: path.resolve(__dirname, "public"),
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        server: {
            host: true,
            port: PORT,
            proxy: {
                "/proxy-me": {
                    changeOrigin: true,
                    configure(proxy: EventEmitter) {
                        if (!shouldLogProxy) return;
                        proxy.on("error", err => {
                            console.log("Proxy. Error", err);
                        });
                        proxy.on("proxyReq", (_proxyReq: ClientRequest, req: IncomingMessage) => {
                            console.log(
                                "Proxy. Sending Request to the Target:",
                                req.method,
                                req.url
                            );
                        });
                        proxy.on("proxyRes", (proxyRes: IncomingMessage, req: IncomingMessage) => {
                            console.log(
                                "Proxy. Received Response from the Target:",
                                proxyRes.statusCode,
                                req.url
                            );
                        });
                    },
                    rewrite: (path: string) => path.replace(/\/proxy-me/, ""),
                    secure: false,
                    target: envVariables.VITE_API_BASE_URL_ORIGINAL,
                    ws: true,
                },
            },
        },
    };
});
