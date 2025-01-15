import { Link, NavLink } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Simple Transit App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const response: {
    requestId: string;
    message: string;
  } = await (await fetch("http://localhost:3000")).json();
  return response;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { message, requestId } = loaderData;
  return (
    <div className=" max-w-screen-md border flex flex-col gap-4 mx-auto p-8 mt-16">
      <h1 className="font-semibold text-2xl">
        Welcome To The Simple Transit Service
      </h1>
      <h2 className="text-lg">
        Request ID: <code className="text-red-800">{requestId}</code>
      </h2>
      <p>{message}</p>

      <NavLink to="/stop" className="text-blue-600 font-medium">
        Go To A Stop
      </NavLink>
    </div>
  );
}
