import AdminBookings from "~/pages/admin/admin-bookings/admin-bookings";
import type { Route } from "./+types/admin-bookings";

export type Bookings = Booking[];
export type Booking = {
  bookingNumber: string;
  flightNumber: string;
  passenger: {
    firstName: string;
    lastName: string;
  };
  checkedIn: boolean;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Bookings" },
    { name: "description", content: "Moon Flight Bookings management!" },
  ];
}

// provides `loaderData` to the component
export async function clientLoader() {
  let bookings = await fetch("/bookings.json");

  return (await bookings.json()) as Bookings;
}

export default function AdminDestinationsRoute({
  loaderData,
}: Route.ComponentProps) {
  return <AdminBookings bookings={loaderData} />;
}
