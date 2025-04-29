import AdminDestinations from "~/pages/admin/admin-destinations/admin-destinations";
import type { Route } from "./+types/admin-destinations";

import type { Location } from "~/types/location";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Destinations" },
    { name: "description", content: "Moon Flight Destination management!" },
  ];
}

// provides `loaderData` to the component
export async function clientLoader() {
  let destinations = await fetch("/location");

  return (await destinations.json()) as Location[];
}

export default function AdminDestinationsRoute({
  loaderData,
}: Route.ComponentProps) {
  return <AdminDestinations destinations={loaderData} />;
}
