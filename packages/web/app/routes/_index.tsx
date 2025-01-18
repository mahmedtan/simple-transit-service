import fetch from "utils/fetch";
import type { Route } from "./+types/_index";
import {
  Form,
  Link,
  redirect,
  useFetcher,
  type ActionFunctionArgs,
  type ClientActionFunctionArgs,
} from "react-router";
import { StarIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Simple Transit App" },
    { name: "description", content: "Transit Stuff!" },
  ];
}

export async function loader() {
  const { data } = await fetch("/go/lines", {});

  if (!data) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { lines: data };
}

export default function Home({
  loaderData: { lines },
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="flex gap-4 sm:gap-6 flex-col">
      <h1 className="text-xl sm:text-2xl font-semibold -my-1">
        Transit System Tracker For Greater Toronto Area {actionData}
      </h1>

      <div className="flex flex-col gap-4 border border-dotted p-3 sm:p-4  border-emerald-600/20">
        <h2 className=" text-xl sm:text-2xl -my-1 mx-auto text-emerald-600 dark:text-emerald-200 font-bold">
          Go Transit
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {lines.map((line) => (
            <Link
              key={line.id}
              to={`/lines/${line.code}`}
              className="border  flex justify-center items-center px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700  dark:border-slate-700 transition-colors shadow dark:shadow-slate-950 shadow-slate-100 font-medium"
            >
              <div className="flex flex-col flex-1">
                <span className="text-sm font-light">{line.code}</span>
                {line.name}
              </div>

              <button
                onClick={async (e) => {
                  e.preventDefault();
                  {
                    await fetch("/go/lines/bookmark/:code", {
                      params: { code: line.code },
                      method: line.isBookmarked ? "DELETE" : "PUT",
                    });
                  }

                  location.reload();
                }}
              >
                {line.isBookmarked ? (
                  <StarIcon
                    size={20}
                    className="fill-orange-400 text-orange-400"
                  />
                ) : (
                  <StarIcon size={20} />
                )}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
