import { UserBook } from "~/pages/user/user-book/user-book";
import type { Route } from "./+types/user-book";

import type { Location } from "~/types/location";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight - Book a Flight" },
    {
      name: "description",
      content: "Welcome to Booking a Flight of Moon Flight!",
    },
  ];
}

// provides `loaderData` to the component
export async function clientLoader() {
  let locations = await fetch("/location");

  return (await locations.json()) as Location[];
}

export default function UserBookRoute({ loaderData }: Route.ComponentProps) {
  return <UserBook locations={loaderData} />;
}
