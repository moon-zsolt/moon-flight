import { MapPinHouse, Plane, Tickets } from "lucide-react";
import { NavLink } from "react-router";

export function AdminHome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Select Function
            </p>
            <ul>
              {functions.map(({ href, text, icon }) => (
                <NavLink
                  key={href}
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  to={href}
                >
                  {icon}
                  {text}
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

const functions = [
  {
    href: "./destinations",
    text: "Destinations",
    icon: <MapPinHouse />,
  },
  {
    href: "./flights",
    text: "Flights",
    icon: <Plane />,
  },
  {
    href: "./bookings",
    text: "Bookings",
    icon: <Tickets />,
  },
];
