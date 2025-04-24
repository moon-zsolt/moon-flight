import { DataSource } from "typeorm";

const DATA_SOURCE = new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [],
  synchronize: false,
});

export default DATA_SOURCE;
