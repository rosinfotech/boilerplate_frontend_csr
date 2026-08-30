import type { EventEmitter } from "node:events";
import type { ClientRequest, IncomingMessage } from "node:http";
import { default as path } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";
import circleDependencyPlugin from "vite-plugin-circular-dependency";
import magicalSvgPlugin from "vite-plugin-magical-svg";
import { mockDevServerPlugin } from "vite-plugin-mock-dev-server";
import defaultMockDevServerConfig from "./.mock/config";
import { getGitDescribe } from "./.scripts/get-git-describe";

const PORT = 33333;

const BUILD_DIR = path.resolve(__dirname, "./.build/");

export default defineConfig(async ({ mode }) => {
    const envDir = path.resolve(__dirname, "./envs/");
    const envVariables = loadEnv(mode, envDir);
    const gitDescribe = await getGitDescribe();

    const platform = process.env.VITE_PLATFORM === "mobile" ? "mobile" : "web";
    const isMobile = platform === "mobile";

    const shouldUseMock =
        (process.env.VITE_DEV_SERVER_USE_MOCK ?? envVariables.VITE_DEV_SERVER_USE_MOCK) === "true";
    const shouldLogProxy =
        (process.env.VITE_DEV_SERVER_LOG_PROXY ?? envVariables.VITE_DEV_SERVER_LOG_PROXY) ===
        "true";

    console.log(mode);
    console.log(`Platform: ${platform}`);
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

    const srcDir = path.resolve(__dirname, "./src/");
    const platformBuildDir = path.resolve(BUILD_DIR, `./${platform}/`);

    return {
        build: {
            emptyOutDir: true,
            minify: true,
            outDir: platformBuildDir,
            target: "ES2022",
        },
        css: {
            devSourcemap: true,
        },
        define: {
            ...gitDescribe,
            "import.meta.env.VITE_PLATFORM": JSON.stringify(platform),
        },
        envDir,
        plugins: [
            tailwindcss(),
            magicalSvgPlugin({
                svgo: false,
                target: "react19",
            }),
            circleDependencyPlugin(),
            shouldUseMock ? mockDevServerPlugin(defaultMockDevServerConfig) : undefined,
            tanstackStart({
                router: {
                    generatedRouteTree: isMobile ? "routeTree.mobile.gen.ts" : "routeTree.gen.ts",
                    routeFileIgnorePattern: isMobile ? "^_web\\." : "^_mobile\\.",
                    tmpDir: path.resolve(BUILD_DIR, "./tmp/"),
                },
                srcDirectory: "src",
                ...(isMobile
                    ? {
                          spa: {
                              enabled: true,
                          },
                      }
                    : {}),
            }),
            react(),
            ...(isMobile
                ? []
                : [
                      nitro({
                          output: {
                              dir: platformBuildDir,
                              publicDir: path.resolve(platformBuildDir, "./public/"),
                              serverDir: path.resolve(platformBuildDir, "./server/"),
                          },
                      }),
                  ]),
        ],
        publicDir: path.resolve(__dirname, "./public/"),
        resolve: {
            alias: [
                {
                    find: /^@\/route-tree$/,
                    replacement: path.resolve(
                        srcDir,
                        isMobile ? "routeTree.mobile.gen.ts" : "routeTree.gen.ts"
                    ),
                },
                {
                    find: /^@\/layout$/,
                    replacement: path.resolve(
                        srcDir,
                        isMobile ? "layouts/LayoutContentMobile" : "layouts/LayoutContent"
                    ),
                },
                {
                    find: /^@\/page-index$/,
                    replacement: path.resolve(
                        srcDir,
                        isMobile
                            ? "pages/IndexPage/IndexPage.mobile.tsx"
                            : "pages/IndexPage/IndexPage.tsx"
                    ),
                },
                {
                    find: "@",
                    replacement: srcDir,
                },
            ],
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
                    rewrite: (pathValue: string) => pathValue.replace(/\/proxy-me/, ""),
                    secure: false,
                    target:
                        process.env.VITE_API_BASE_URL_ORIGINAL ??
                        envVariables.VITE_API_BASE_URL_ORIGINAL,
                    ws: true,
                },
            },
        },
    };
});
