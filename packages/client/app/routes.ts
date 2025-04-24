import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("admin", [
    index("routes/admin-home.tsx"),
    route("destinations", "routes/admin-destinations.tsx"),
    route("flights", "routes/admin-flights.tsx"),
  ]),
  ...prefix("user", [index("routes/user-home.tsx")]),
] satisfies RouteConfig;
