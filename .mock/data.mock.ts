import { defineMock } from "vite-plugin-mock-dev-server";
import data from "./data/data.json";


export default defineMock({
    body: data,
    method: "GET",
    url: "/proxy-me/url",
});
