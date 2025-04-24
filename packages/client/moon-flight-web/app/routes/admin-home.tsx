import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Admin" },
    { name: "description", content: "Welcome to Admin Site of Moon Flight!" },
  ];
}

export default function Home() {
  return "Admin";
}
