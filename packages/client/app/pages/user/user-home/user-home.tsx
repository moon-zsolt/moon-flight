import { Search, TicketPlus, Tickets } from "lucide-react";
import { NavLink } from "react-router";
import { Becker } from "~/components/custom/becker/becker";
import { MoonFlightLogo } from "~/components/custom/moon-flight-logo/moon-flight-logo";

export function UserHome() {
  return (
    <main className="flex items-center justify-center pt-4 lg:pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 lg:gap-16 min-h-0">
        <MoonFlightLogo />
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <Becker />
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
    href: "./book",
    text: "Book a Flight",
    icon: <TicketPlus />,
  },
  {
    href: "./booking",
    text: "Find Your Booking",
    icon: <Search />,
  },
];
