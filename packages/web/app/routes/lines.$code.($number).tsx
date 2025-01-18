import fetch from "utils/fetch";
import type { Route } from "./+types/lines.$code.($number)";
import { Link } from "react-router";
import { useEffect, useLayoutEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Simple Transit App" },
    { name: "description", content: "Transit Stuff!" },
  ];
}

export async function loader({ params: { code, number } }: Route.LoaderArgs) {
  const { data: line } = await fetch(`/go/lines/:code`, {
    params: {
      code,
    },
  });

  if (!line) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const { data: tripDetails } = await fetch(`/go/trips/:id`, {
    params: {
      id: number ? +number : +line.trips[0].number,
    },
  });

  return { line, tripDetails };
}

export async function clientLoader({
  params: { number },
  serverLoader,
}: Route.ClientLoaderArgs) {
  const data = await serverLoader();

  if (number) {
    const { data: tripDetails } = await fetch(`/go/trips/:id`, {
      params: {
        id: +number,
      },
    });

    return { ...data, tripDetails };
  }

  return data;
}

export default function Home({
  loaderData: { line, tripDetails },
}: Route.ComponentProps) {
  useEffect(() => {
    document.getElementById(tripDetails?.tripNumber!)?.scrollIntoView();
  }, [tripDetails]);

  return (
    <div className="flex gap-4 sm:gap-6 flex-col">
      <h1 className="text-xl  sm:text-2xl font-semibold -my-1">
        {line.code} - {line.name}
      </h1>

      <div className="flex flex-col gap-3 sm:gap-4">
        {line.trips.map((trip) =>
          trip.number === tripDetails?.tripNumber ? (
            <div
              id={trip.number}
              className="border scroll-m-10 px-4 pb-4 pt-2.5 flex flex-col gap-4 shadow"
            >
              <h2 className="text-lg font-medium">{tripDetails.tripName} </h2>
              <div className="flex flex-col gap-3">
                {tripDetails.stop.map((stop, i) => (
                  <div className=" px-4 py-2 border flex justify-between">
                    <span>
                      {i + 1}. {stop.name}
                    </span>
                    <span>
                      <span className="text-slate-500 mr-2">
                        {stop.schDeparture}
                      </span>{" "}
                      <span>{stop.actualTime}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Link
              id={trip.number}
              to={`/lines/${line.code}/${trip.number}`}
              className="border px-4 py-2.5 text-lg hover:bg-slate-50 hover:shadow-slate-100 hover:shadow"
            >
              {trip.name}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
