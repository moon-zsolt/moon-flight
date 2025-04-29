import { NavLink } from "react-router";
import { ShieldUser, User } from "lucide-react";
import { MoonFlightLogo } from "~/components/custom/moon-flight-logo/moon-flight-logo";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <MoonFlightLogo />
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              Select Site
            </p>
            <ul>
              {sites.map(({ href, text, icon }) => (
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

const sites = [
  {
    href: "/admin",
    text: "Admin Site",
    icon: <ShieldUser />,
  },
  {
    href: "/user",
    text: "User Site",
    icon: <User />,
  },
];
