import type { MockServerPluginOptions } from "vite-plugin-mock-dev-server";


export default {
    include: ["mock/**/*.mock.{js,ts,cjs,mjs,json,json5}"],
    prefix: ["^/proxy-me/url"],
} as MockServerPluginOptions;
