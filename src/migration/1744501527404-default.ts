import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744501527404 implements MigrationInterface {
    name = 'Default1744501527404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP CONSTRAINT "FK_6221ebc585811326167bed4e460"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP CONSTRAINT "PK_30f8505bdf76c18403775aa16dc"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "licensePlate"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "registrationDate"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "VEH_ID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD CONSTRAINT "PK_83b26956a7d9241ebff295cceb8" PRIMARY KEY ("VEH_ID")`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "VEH_BRAND" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "VEH_MODEL" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "VEH_YEAR" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "VEH_COLOR" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "VEH_LICENSE_PLATE" character(7) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "VEH_REGISTRATION_DATE" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "VEH_USE_ID" character varying`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD CONSTRAINT "FK_0494ee4db8de34de18b8268c8a9" FOREIGN KEY ("VEH_USE_ID") REFERENCES "USERS"("USE_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP CONSTRAINT "FK_0494ee4db8de34de18b8268c8a9"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "VEH_USE_ID"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "VEH_REGISTRATION_DATE"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "VEH_LICENSE_PLATE"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "VEH_COLOR"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "VEH_YEAR"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "VEH_MODEL"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "VEH_BRAND"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP CONSTRAINT "PK_83b26956a7d9241ebff295cceb8"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP COLUMN "VEH_ID"`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "owner_id" character varying`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "registrationDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "licensePlate" character(7) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "color" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "model" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "brand" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD CONSTRAINT "PK_30f8505bdf76c18403775aa16dc" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD CONSTRAINT "FK_6221ebc585811326167bed4e460" FOREIGN KEY ("owner_id") REFERENCES "USERS"("USE_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
