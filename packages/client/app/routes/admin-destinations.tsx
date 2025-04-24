import AdminDestinations from "~/pages/admin/admin-destinations/admin-destinations";
import type { Route } from "./+types/admin-destinations";

export type Destinations = Destination[];
export type Destination = {
  name: string;
  country: string;
  planet: string;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Destinations" },
    { name: "description", content: "Moon Flight Destination management!" },
  ];
}

// provides `loaderData` to the component
export async function clientLoader() {
  let destinations = await fetch("/destinations.json");

  return (await destinations.json()) as Destinations;
}

export default function AdminDestinationsRoute({
  loaderData,
}: Route.ComponentProps) {
  return <AdminDestinations destinations={loaderData} />;
}
