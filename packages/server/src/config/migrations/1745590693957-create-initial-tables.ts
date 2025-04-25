import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1745590693957 implements MigrationInterface {
  name = "CreateInitialTables1745590693957";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "location" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "craft" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "capacity" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "flight" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "date" datetime NOT NULL, "flight_time_in_minutes" integer NOT NULL, "distance_in_km" integer NOT NULL, "craft_id" varchar NOT NULL, "start_id" varchar NOT NULL, "destination_id" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "flight_id" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_flight" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "date" datetime NOT NULL, "flight_time_in_minutes" integer NOT NULL, "distance_in_km" integer NOT NULL, "craft_id" varchar NOT NULL, "start_id" varchar NOT NULL, "destination_id" varchar NOT NULL, CONSTRAINT "FK_46789c6c691652980ff014c623d" FOREIGN KEY ("craft_id") REFERENCES "craft" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6e3cf0bb9b6729108a3b1dc2564" FOREIGN KEY ("start_id") REFERENCES "location" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8a9babb4911e00ec7c5348ee880" FOREIGN KEY ("destination_id") REFERENCES "location" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_flight"("id", "code", "date", "flight_time_in_minutes", "distance_in_km", "craft_id", "start_id", "destination_id") SELECT "id", "code", "date", "flight_time_in_minutes", "distance_in_km", "craft_id", "start_id", "destination_id" FROM "flight"`,
    );
    await queryRunner.query(`DROP TABLE "flight"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_flight" RENAME TO "flight"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_booking" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "flight_id" varchar NOT NULL, CONSTRAINT "FK_14bfd26e52688e6165903dda0a6" FOREIGN KEY ("flight_id") REFERENCES "flight" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_booking"("id", "code", "first_name", "last_name", "flight_id") SELECT "id", "code", "first_name", "last_name", "flight_id" FROM "booking"`,
    );
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_booking" RENAME TO "booking"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" RENAME TO "temporary_booking"`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "flight_id" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "booking"("id", "code", "first_name", "last_name", "flight_id") SELECT "id", "code", "first_name", "last_name", "flight_id" FROM "temporary_booking"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_booking"`);
    await queryRunner.query(
      `ALTER TABLE "flight" RENAME TO "temporary_flight"`,
    );
    await queryRunner.query(
      `CREATE TABLE "flight" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "date" datetime NOT NULL, "flight_time_in_minutes" integer NOT NULL, "distance_in_km" integer NOT NULL, "craft_id" varchar NOT NULL, "start_id" varchar NOT NULL, "destination_id" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "flight"("id", "code", "date", "flight_time_in_minutes", "distance_in_km", "craft_id", "start_id", "destination_id") SELECT "id", "code", "date", "flight_time_in_minutes", "distance_in_km", "craft_id", "start_id", "destination_id" FROM "temporary_flight"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_flight"`);
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TABLE "flight"`);
    await queryRunner.query(`DROP TABLE "craft"`);
    await queryRunner.query(`DROP TABLE "location"`);
  }
}
