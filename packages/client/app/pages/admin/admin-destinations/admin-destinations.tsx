import type { Destination, Destinations } from "~/routes/admin-destinations";

export type AdminDestinationsProps = {
  destinations: Destinations;
};

export default function AdminDestinations({
  destinations,
}: AdminDestinationsProps) {
  return (
    <main className="m-24">
      <header className="my-16">
        <h1 className="text-2xl">Destinations</h1>
      </header>

      <DestinationsTable destinations={destinations} />
    </main>
  );
}

function DestinationsTable({ destinations }: { destinations: Destination[] }) {
  return (
    <table>
      <thead className="bg-gray-200">
        <th className="pe-4 text-left">Name</th>
        <th className="px-4 text-left">Country</th>
        <th className="ps-4 text-left">Planet</th>
      </thead>
      <tbody>
        {destinations.map((destination, index) => (
          <tr className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
            <td className="pe-4">{destination.name}</td>
            <td className="px-4">{destination.country}</td>
            <td className="ps-4">{destination.planet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
