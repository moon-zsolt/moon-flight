import AdminBookings from "~/pages/admin/admin-bookings/admin-bookings";
import type { Route } from "./+types/admin-bookings";
import type { Booking } from "~/types/booking";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Bookings" },
    { name: "description", content: "Moon Flight Bookings management!" },
  ];
}

// provides `loaderData` to the component
export async function clientLoader() {
  let bookings = await fetch("/booking");

  return (await bookings.json()) as Booking[];
}

export default function AdminDestinationsRoute({
  loaderData,
}: Route.ComponentProps) {
  return <AdminBookings bookings={loaderData} />;
}
