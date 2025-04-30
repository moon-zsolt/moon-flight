import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { MoonFlightLogo } from "~/components/custom/moon-flight-logo/moon-flight-logo";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { Flight } from "~/types/flight";

export type AdminFlightsProps = {
  flights: Flight[];
};

export default function AdminFlights({ flights }: AdminFlightsProps) {
  return (
    <main className="m-24">
        <MoonFlightLogo />
        <header className="my-16">
        <h1 className="text-2xl">Flights</h1>
      </header>

      <FlightsTable flights={flights} />
    </main>
  );
}

const columns: ColumnDef<Flight>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "craft.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aircraft
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "start",
    accessorKey: "start.name",
    header: "Start",
  },
  {
    id: "destination",
    accessorKey: "destination.name",
    header: "Destination",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleString();
    },
  },
  {
    accessorKey: "flightTimeInMinutes",
    header: "Flight Time",
    cell: ({ row }) => {
      return `${row.getValue("flightTimeInMinutes")} mins`;
    },
  },
  {
    accessorKey: "distanceInKm",
    header: "Distance",
    cell: ({ row }) => {
      return `${row.getValue("distanceInKm")} km`;
    },
  },
  {
    accessorKey: "emptySeats",
    header: "Empty Seats",
  },
];

function FlightsTable({ flights }: { flights: Flight[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: flights,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center pt-4 pb-2">
        <Input
          placeholder="Filter by start..."
          value={(table.getColumn("start")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("start")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="flex items-center pt-2 pb-4">
        <Input
          placeholder="Filter by destination..."
          value={
            (table.getColumn("destination")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("destination")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
