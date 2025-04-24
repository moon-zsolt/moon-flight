import { type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("admin", [index("routes/admin-home.tsx")]),
  ...prefix("user", [index("routes/user-home.tsx")]),
] satisfies RouteConfig;
