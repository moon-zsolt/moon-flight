import { MoonFlightLogo } from "~/components/custom/moon-flight-logo/moon-flight-logo";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { Booking } from "~/types/booking";
import type { FindBookingDto } from "~/types/find-booking";

type State =
  | {
      state: "initial" | "finding" | "found" | "not-found" | "error";
    }
  | {
      state: "found";
      booking: Booking;
    };

export function UserBookingDetails() {
  const [bookingCode, setBookingCode] = useState("");
  const [lastName, setLastName] = useState("");

  const [state, setState] = useState<State>({ state: "initial" });

  const findBooking = () => {
    setState({ state: "finding" });

    const body: FindBookingDto = {
      bookingCode,
      lastName,
    };

    fetch("/booking/find", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (response.ok) {
          const booking = (await response.json()) as Booking;

          setState({ state: "found", booking });
        } else {
          setState({ state: "error" });
        }
      })
      .catch(() => {
        setState({ state: "error" });
      });
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <MoonFlightLogo />
        <div className="max-w-[600px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <h2 className="leading-6 text-2xl text-gray-700 dark:text-gray-200 font-bold">
              Find Your Booking!
            </h2>
            <p className="leading-6 text-gray-700 dark:text-gray-200">
              Set start or destination to search for flights!
            </p>

            <div>
              <Input
                placeholder="Booking Code"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
              />
            </div>

            <div>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <Button
                disabled={
                  !bookingCode || !lastName || state.state === "finding"
                }
                onClick={findBooking}
              >
                Find Booking
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
