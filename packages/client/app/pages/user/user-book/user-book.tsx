import { MoonFlightLogo } from "~/components/custom/moon-flight-logo/moon-flight-logo";
import type { Location } from "~/types/location";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useEffect, useState } from "react";
import type { UUID } from "crypto";
import type { Flight } from "~/types/flight";
import { Input } from "~/components/ui/input";
import type { CreateBookingDto } from "~/types/create-booking";
import type { Booking } from "~/types/booking";

export type UserBookProps = {
  locations: Location[];
};

type State =
  | {
      state: "initial";
    }
  | {
      state: "booking";
    }
  | {
      state: "booked";
      booking: Booking;
    }
  | {
      state: "error";
      message: string;
    };

export function UserBook({ locations }: UserBookProps) {
  const [startId, setStart] = useState<UUID>();
  const [destinationId, setDestination] = useState<UUID>();

  const [flights, setFlights] = useState<Flight[]>();

  useEffect(() => {
    if (!startId || !destinationId) {
      setFlightId(undefined);
      return;
    }

    const params = new URLSearchParams();

    params.append("startId", startId);
    params.append("destinationId", destinationId);

    fetch(`/flight?${params}`)
      .then((response) => response.json())
      .then((flights: Flight[]) => {
        setFlights(flights);

        if (!flights.some((flight) => flight.id === flightId)) {
          setFlightId(undefined);
        }
      });
  }, [startId, destinationId]);

  const [flightId, setFlightId] = useState<UUID>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [state, setState] = useState<State>({ state: "initial" });

  const book = () => {
    setState({ state: "booking" });

    // Button is disabled, should never happen but TS doesn't know.
    if (!flightId) {
      setState({ state: "error", message: "Please select a flight!" });
      return;
    }

    const body: CreateBookingDto = {
      flightId,
      firstName,
      lastName,
    };

    fetch("/booking", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (response.ok) {
          const booking = (await response.json()) as Booking;

          setState({ state: "booked", booking });
        } else {
          setState({
            state: "error",
            message: "Booking failed! Please try again.",
          });
        }
      })
      .catch(() => {
        setState({
          state: "error",
          message: "Booking failed! Please try again.",
        });
      });
  };

  return (
    <main className="flex items-center justify-center pt-4 lg:pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 lg:gap-16 min-h-0">
        <MoonFlightLogo />
        <div className="max-w-[600px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <h2 className="leading-6 text-2xl text-gray-700 dark:text-gray-200 font-bold">
              Find your flight!
            </h2>
            <p className="leading-6 text-gray-700 dark:text-gray-200">
              Set start or destination to search for flights!
            </p>

            <div>
              <Combo
                className="w-[200px] lg:min-w-[300px]"
                role="start"
                options={locations}
                labelSelector={(location) => location.name}
                selectedId={startId}
                onSelect={setStart}
              />
            </div>

            <div>
              <Combo
                className="w-[200px] lg:min-w-[300px]"
                role="destination"
                options={locations}
                labelSelector={(location) => location.name}
                selectedId={destinationId}
                onSelect={setDestination}
              />
            </div>

            <div>
              <Combo
                className="w-[300px] lg:min-w-[500px]"
                role="flight"
                options={flights ?? []}
                labelSelector={(flight) => {
                  const date = new Date(flight.date);

                  return `${flight.code} on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}, ${flight.emptySeats} seats left`;
                }}
                shortLabelSelector={(flight) => {
                  const date = new Date(flight.date);

                  return `${flight.code} on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
                }}
                selectedId={flightId}
                onSelect={setFlightId}
                disabled={!startId || !destinationId}
              />
            </div>

            <div>
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                  !flightId ||
                  !firstName ||
                  !lastName ||
                  state.state === "booking" ||
                  state.state === "booked"
                }
                onClick={book}
              >
                Book
              </Button>
            </div>

            <div>
              {state.state === "booking" && (
                <p className="text-gray-700 dark:text-gray-200">
                  Booking your flight...
                </p>
              )}
              {state.state === "error" && (
                <p className="text-red-500">{state.message}</p>
              )}
              {state.state === "booked" && (
                <>
                  <p>
                    Your flight has been booked. Take note of Your booking code{" "}
                    <span className="font-bold">{state.booking.code}!</span>
                  </p>
                  <p className="pt-2">
                    In case You loose your booking code, contact our Customer
                    Support Team to retrieve it.
                  </p>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}

type ComboProps<T extends { id: UUID }> = {
  className?: string;
  role: string;
  options: T[];
  labelSelector: (item: T) => string;
  shortLabelSelector?: (item: T) => string;
  selectedId: UUID | undefined;
  onSelect: (id: UUID | undefined) => void;
  disabled?: boolean;
};

export function Combo<T extends { id: UUID }>({
  className,
  role,
  options,
  labelSelector,
  shortLabelSelector,
  selectedId,
  onSelect,
  disabled,
}: ComboProps<T>) {
  const [open, setOpen] = useState(false);

  const buttonLabelSelector = shortLabelSelector ?? labelSelector;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={`${className} justify-between`}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
        >
          {selectedId
            ? buttonLabelSelector(
                options.find((location) => location.id === selectedId)!
              )
            : `Select ${role}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${className} p-0`}>
        <Command>
          <CommandInput placeholder={`Search ${role}...`} />
          <CommandList>
            <CommandEmpty>No {role} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id}
                  onSelect={(currentValue) => {
                    onSelect(
                      currentValue === selectedId
                        ? undefined
                        : (currentValue as UUID)
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedId === option.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {labelSelector(option)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
