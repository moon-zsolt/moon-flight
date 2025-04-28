import AdminFlights from "~/pages/admin/admin-flights/admin-flights";
import type { Route } from "./+types/admin-flights";
import type { UUID } from "crypto";

export type Flights = Flight[];
export type Flight = {
  id: UUID;
  code: string;
  craft: {
    id: UUID;
    name: string;
    capacity: number;
  };
  start: Location;
  destination: Location;
  date: string;
  flightTimeInMinutes: number;
  distanceInKm: number;
};

export type Location = {
  id: UUID;
  name: string;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Flights" },
    { name: "description", content: "Moon Flight Flight management!" },
  ];
}

// provides `loaderData` to the component
export async function clientLoader() {
  let flights = await fetch("/flight");

  return (await flights.json()) as Flights;
}

export default function AdminDestinationsRoute({
  loaderData,
}: Route.ComponentProps) {
  return <AdminFlights flights={loaderData} />;
}
