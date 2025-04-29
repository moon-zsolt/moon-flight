import { UserBookingDetails } from "~/pages/user/user-booking-details/user-booking-details";
import type { Route } from "./+types/user-book";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight - Find Your Booking" },
    {
      name: "description",
      content: "Welcome to Finding Your Moon Flight Booking!",
    },
  ];
}

export default function UserBookingDetailsRoute() {
  return <UserBookingDetails />;
}
