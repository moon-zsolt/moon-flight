import AdminFlights from "~/pages/admin/admin-flights/admin-flights";
import type { Route } from "./+types/admin-flights";

export type Flights = Flight[];
export type Flight = {
  from: string;
  to: string;
  number: string;
  when: string;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Flights" },
    { name: "description", content: "Moon Flight Flight management!" },
  ];
}

// provides `loaderData` to the component
export async function clientLoader() {
  let flights = await fetch("/flights.json");

  return (await flights.json()) as Flights;
}

export default function AdminDestinationsRoute({
  loaderData,
}: Route.ComponentProps) {
  return <AdminFlights flights={loaderData} />;
}
