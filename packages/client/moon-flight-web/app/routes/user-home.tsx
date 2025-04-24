import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight User" },
    { name: "description", content: "Welcome to User Site of Moon Flight!" },
  ];
}

export default function UserHome() {
  return "User";
}
