import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight Admin" },
    { name: "description", content: "Welcome to Admin Site of Moon Flight!" },
  ];
}

export default function AdminHome() {
  return "Admin";
}
