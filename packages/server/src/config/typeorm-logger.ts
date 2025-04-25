import { Logger as NestLogger } from "@nestjs/common";
import { Logger } from "typeorm";

export default class TypeOrmLogger implements Logger {
  private readonly logger = new NestLogger("TypeORM");

  logQuery(query: string, parameters?: any[]) {
    this.logger.log({ parameters, query }, "Query");
  }
  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    this.logger.error({ error, parameters, query }, "Query Error");
  }
  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn({ time, query, parameters }, "Query Slow");
  }
  logSchemaBuild(message: string) {
    this.logger.log(message);
  }
  logMigration(message: string) {
    this.logger.log(message);
  }
  log(level: "log" | "info" | "warn", message: any) {
    switch (level) {
      case "info":
        return this.logger.debug(message);
      case "log":
        return this.logger.log(message);
      case "warn":
        return this.logger.warn(message);
    }
  }
}
