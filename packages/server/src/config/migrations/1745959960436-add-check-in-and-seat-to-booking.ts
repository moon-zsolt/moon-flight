import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCheckInAndSeatToBooking1745959960436
  implements MigrationInterface
{
  name = "AddCheckInAndSeatToBooking1745959960436";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_booking" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "flight_id" varchar NOT NULL, "checked_in" integer, "seat" integer, CONSTRAINT "FK_14bfd26e52688e6165903dda0a6" FOREIGN KEY ("flight_id") REFERENCES "flight" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
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
      `CREATE TABLE "booking" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "flight_id" varchar NOT NULL, CONSTRAINT "FK_14bfd26e52688e6165903dda0a6" FOREIGN KEY ("flight_id") REFERENCES "flight" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "booking"("id", "code", "first_name", "last_name", "flight_id") SELECT "id", "code", "first_name", "last_name", "flight_id" FROM "temporary_booking"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_booking"`);
  }
}
