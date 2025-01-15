import { randomUUIDv7 } from "bun";

const server = Bun.serve({
  port: 3000,
  fetch(_req) {
    return new Response(
      JSON.stringify({
        requestId: randomUUIDv7(),
        message: "Traffic Service is Up!",
      })
    );
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
