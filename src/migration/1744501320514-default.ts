import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744501320514 implements MigrationInterface {
    name = 'Default1744501320514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "USERS" ("id" character varying NOT NULL, "USE_NAME" character varying(50) NOT NULL, "USE_EMAIL" character varying(50) NOT NULL, "USE_PASSWORD" character varying NOT NULL, "USE_BIRTH_DATE" TIMESTAMP NOT NULL, "USE_CREATED_AT" TIMESTAMP NOT NULL, CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "VEHICLES" ("id" character varying NOT NULL, "brand" character varying(20) NOT NULL, "model" character varying(20) NOT NULL, "year" integer NOT NULL, "color" character varying(15) NOT NULL, "licensePlate" character(7) NOT NULL, "registrationDate" TIMESTAMP NOT NULL, "owner_id" character varying, CONSTRAINT "PK_30f8505bdf76c18403775aa16dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ADD CONSTRAINT "FK_6221ebc585811326167bed4e460" FOREIGN KEY ("owner_id") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VEHICLES" DROP CONSTRAINT "FK_6221ebc585811326167bed4e460"`);
        await queryRunner.query(`DROP TABLE "VEHICLES"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
    }

}
