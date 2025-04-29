import { UserHome } from "~/pages/user/user-home/user-home";
import type { Route } from "./+types/user-home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moon Flight User" },
    { name: "description", content: "Welcome to User Site of Moon Flight!" },
  ];
}

export default function UserHomeRoute() {
  return <UserHome />;
}
