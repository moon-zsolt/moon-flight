import logoDark from "./logo-dark.png";
import logoLight from "./logo-light.png";

export function MoonFlightLogo() {
  return (
    <header className="flex flex-col items-center gap-9">
      <div className="w-[500px] max-w-[100vw] p-4">
        <img
          src={logoLight}
          alt="Moon Flight Logo Light"
          className="block w-full dark:hidden"
        />
        <img
          src={logoDark}
          alt="Moon Flight Logo Dark"
          className="hidden w-full dark:block"
        />
      </div>
    </header>
  );
}
