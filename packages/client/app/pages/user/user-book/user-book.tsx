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

export type UserBookProps = {
  locations: Location[];
};

export function UserBook({ locations }: UserBookProps) {
  const [startId, setStart] = useState<UUID>();
  const [destinationId, setDestination] = useState<UUID>();

  const [flights, setFlights] = useState<Flight[]>();
  const [flightId, setFlightId] = useState<UUID>();

  useEffect(() => {
    const params = new URLSearchParams();

    if (startId) params.append("startId", startId);
    if (destinationId) params.append("destinationId", destinationId);

    fetch(`/flight?${params}`)
      .then((response) => response.json())
      .then((flights) => setFlights(flights));
  }, [startId, destinationId]);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
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
                className="min-w-[200px]"
                role="start"
                options={locations}
                labelSelector={(location) => location.name}
                selectedId={startId}
                onSelect={setStart}
              />
            </div>

            <div>
              <Combo
                className="min-w-[200px]"
                role="destination"
                options={locations}
                labelSelector={(location) => location.name}
                selectedId={destinationId}
                onSelect={setDestination}
              />
            </div>

            <div>
              <Combo
                className="min-w-[400px]"
                role="flight"
                options={flights ?? []}
                labelSelector={(flight) => {
                  const date = new Date(flight.date);

                  return `${flight.code} on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
                }}
                selectedId={flightId}
                onSelect={setFlightId}
              />
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
  selectedId: UUID | undefined;
  onSelect: (id: UUID | undefined) => void;
};

export function Combo<T extends { id: UUID }>({
  className,
  role,
  options,
  labelSelector,
  selectedId,
  onSelect,
}: ComboProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${className} justify-between`}
        >
          {selectedId
            ? labelSelector(
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
