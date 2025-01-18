import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import go from "./routes/go";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .onError(({ error }) => {
    console.log("ERrros,", error);
  })
  .use(
    swagger({
      scalarConfig: {
        metaData: {
          title: "Simple Transit Service",
        },
      },
    })
  )
  .use(go)
  .get("/", () => ({}))
  .listen(process.env.PORT);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
