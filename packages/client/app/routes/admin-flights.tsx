import AdminFlights from "~/pages/admin/admin-flights/admin-flights";
import type { Route } from "./+types/admin-flights";
import type { Flight } from "~/types/flight";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Flights" },
    { name: "description", content: "Moon Flight Flight management!" },
  ];
}

// provides `loaderData` to the component
export async function clientLoader() {
  let flights = await fetch("/flight");

  return (await flights.json()) as Flight[];
}

export default function AdminDestinationsRoute({
  loaderData,
}: Route.ComponentProps) {
  return <AdminFlights flights={loaderData} />;
}
