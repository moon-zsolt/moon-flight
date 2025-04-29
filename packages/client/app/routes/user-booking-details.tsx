import { UserBookingDetails } from "~/pages/user/user-booking-details/user-booking-details";
import type { Route } from "./+types/user-booking-details";
import type { Booking } from "~/types/booking";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight - Find Your Booking" },
    {
      name: "description",
      content: "Welcome to Finding Your Moon Flight Booking!",
    },
  ];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const bookingId = formData.get("bookingId");

  const checkInResponse = await fetch(`/booking/${bookingId}/check-in`, {
    method: "POST",
  });

  if (!checkInResponse.ok) {
    throw new Error("Failed to check in");
  }

  const booking = (await checkInResponse.json()) as Booking;

  return booking;
}

export default function UserBookingDetailsRoute({
  actionData,
}: Route.ComponentProps) {
  return <UserBookingDetails checkedInBooking={actionData ?? null} />;
}
