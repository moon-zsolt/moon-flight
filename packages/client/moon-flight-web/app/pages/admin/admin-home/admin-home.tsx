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
    href: "/destination",
    text: "Destinations",
    icon: (
      // https://lucide.dev/icons/map-pin-house
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-map-pin-house-icon lucide-map-pin-house"
      >
        <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
        <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
        <path d="M18 22v-3" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    ),
  },
  {
    href: "/flights",
    text: "Flights",
    icon: (
      // https://lucide.dev/icons/plane
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-plane-icon lucide-plane"
      >
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
    ),
  },
  {
    href: "/bookings",
    text: "Bookings",
    icon: (
      // https://lucide.dev/icons/tickets
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-tickets-icon lucide-tickets"
      >
        <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
        <path d="M6 10V8" />
        <path d="M6 14v1" />
        <path d="M6 19v2" />
        <rect x="2" y="8" width="20" height="13" rx="2" />
      </svg>
    ),
  },
];
