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
import { useState } from "react";
import type { UUID } from "crypto";

export type UserBookProps = {
  locations: Location[];
};

export function UserBook({ locations }: UserBookProps) {
  const [start, setStart] = useState<UUID>();
  const [destination, setDestination] = useState<UUID>();

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <MoonFlightLogo />
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Select Function
            </p>
            <LocationCombo
              role="start"
              locations={locations}
              selectedLocationId={start}
              onLocationSelected={setStart}
            />
            <LocationCombo
              role="destination"
              locations={locations}
              selectedLocationId={destination}
              onLocationSelected={setDestination}
            />
          </nav>
        </div>
      </div>
    </main>
  );
}

type LocationComboProps = {
  role: "start" | "destination";
  locations: Location[];
  selectedLocationId: UUID | undefined;
  onLocationSelected: (locationId: UUID | undefined) => void;
};

export function LocationCombo({
  role,
  locations,
  selectedLocationId,
  onLocationSelected,
}: LocationComboProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedLocationId
            ? locations.find(
                (destination) => destination.id === selectedLocationId
              )?.name
            : `Select ${role}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${role}...`} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {locations.map((destination) => (
                <CommandItem
                  key={destination.id}
                  value={destination.id}
                  onSelect={(currentValue) => {
                    onLocationSelected(
                      currentValue === selectedLocationId
                        ? undefined
                        : (currentValue as UUID)
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocationId === destination.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {destination.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
