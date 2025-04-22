import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1745279953549 implements MigrationInterface {
    name = 'Default1745279953549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PRODUCTS" ("PROD_ID" character varying NOT NULL, "PROD_NAME" character varying NOT NULL, "PROD_DESCRIPTION" character varying NOT NULL, "PROD_PRICE" numeric(10,2) NOT NULL, CONSTRAINT "PK_1b43274d0877e02e0c4e1dc4ac4" PRIMARY KEY ("PROD_ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PRODUCTS"`);
    }

}
