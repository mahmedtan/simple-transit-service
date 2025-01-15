import { NavLink } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Stop Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({}: Route.ComponentProps) {
  return (
    <div className=" max-w-screen-md border flex flex-col gap-4 mx-auto p-8 mt-16">
      <NavLink to="/" className="text-blue-600 font-medium">
        Go To Home Page
      </NavLink>
      <h1 className="font-semibold text-2xl">This is a stop.</h1>
    </div>
  );
}
