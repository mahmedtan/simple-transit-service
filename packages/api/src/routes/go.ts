import Elysia, { error, t } from "elysia";
import {
  GoApiCorridor,
  GoApiTrip,
  GoLine,
  GoLineDetails,
  GoStop,
  GoStopDetails,
  GoTripDetails,
} from "../../types/go.types";
import { db, bookmarkedLines, eq } from "db";

const go = new Elysia({ prefix: "go" })
  .get("/lines", async () => {
    const corridors: GoApiCorridor[] = await (
      await fetch(process.env.GO_TRANSIT_CORRIDORS_API)
    ).json();

    const lines: GoLine[] = [];

    for (const corridor of corridors) {
      const line: GoLine = {
        name: corridor.name,
        code: corridor.code,
        id: corridor.corridorId,
        isBookmarked: !!(await db.query.bookmarkedLines.findFirst({
          where: eq(bookmarkedLines.lineCode, corridor.code),
        })),
      };

      lines.push(line);
    }

    return lines;
  })

  .get("/lines/:code", async ({ params: { code } }) => {
    const corridors: GoApiCorridor[] = await (
      await fetch(process.env.GO_TRANSIT_CORRIDORS_API)
    ).json();

    const corridor = corridors.find(
      (corridor) => corridor.code.toLowerCase() === code.toLowerCase()
    );

    if (!corridor) return error("Not Found");

    const line: GoLineDetails = {
      name: corridor.name,
      code: corridor.code,
      id: corridor.corridorId,
      trips: corridor.trips,
      stops: corridor.stops,
      isBookmarked: !!(await db.query.bookmarkedLines.findFirst({
        where: eq(bookmarkedLines.lineCode, corridor.code),
      })),
    };

    return line;
  })

  .put("/lines/bookmark/:code", async ({ params: { code } }) => {
    await db.insert(bookmarkedLines).values({ lineCode: code });

    return { ok: true };
  })
  .delete("/lines/bookmark/:code", async ({ params: { code } }) => {
    await db.delete(bookmarkedLines).where(eq(bookmarkedLines.lineCode, code));

    return { ok: true };
  })

  .get(
    "/trips/:id",
    async ({ params: { id } }) => {
      const { date, commitmentTrip }: GoApiTrip = await (
        await fetch(`${process.env.GO_TRANSIT_TRIP_API}/${id}`)
      ).json();

      if (!commitmentTrip.length) return error("Not Found");

      const trip = {
        updatedAt: date,
        ...commitmentTrip[0]!,
      } as GoTripDetails;

      return trip;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .get("/stops", async () => {
    const corridors: GoApiCorridor[] = await (
      await fetch(process.env.GO_TRANSIT_CORRIDORS_API)
    ).json();

    const map = new Map<string, any>();

    corridors
      .reduce((prev: any[], curr) => [...prev, ...curr.stops], [])
      .forEach((item) => map.set(item.code, item));

    const stops: GoStop[] = [...map.values()];

    return stops;
  })
  .get("/stops/:id", async ({ params: { id } }) => {
    const corridors: GoApiCorridor[] = await (
      await fetch(process.env.GO_TRANSIT_CORRIDORS_API)
    ).json();

    const stop: GoStopDetails = corridors
      .reduce((prev: any[], curr) => [...prev, ...curr.stops], [])
      .find((stop) => stop.atlsId === +id);

    if (!stop) {
      return error("Not Found");
    }

    stop.trips = corridors
      .filter((corridoor) =>
        corridoor.stops.find(
          (corridoorStop) => corridoorStop.code === stop.code
        )
      )
      .reduce((prev: any[], curr) => [...prev, ...curr.trips], []);

    return stop;
  });

export default go;
