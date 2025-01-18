import { edenFetch, edenTreaty } from "@elysiajs/eden";
import type { App } from "api";

const fetch = edenFetch<App>("http://localhost:3000");

export default fetch;
