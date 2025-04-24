import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Home" },
    { name: "description", content: "Welcome to Moon Flight!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
