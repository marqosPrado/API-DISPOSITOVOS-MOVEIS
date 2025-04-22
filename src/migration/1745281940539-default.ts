import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1745281940539 implements MigrationInterface {
    name = 'Default1745281940539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SALES" ("SALE_ID" character varying NOT NULL, "SALE_DATE" TIMESTAMP NOT NULL, "SALE_DESCRIPTION" character varying NOT NULL, "SALE_QUANTITY" integer NOT NULL, "SALE_TOTAL" integer NOT NULL, CONSTRAINT "PK_c51fa9eade81b2f6876aabd3cd9" PRIMARY KEY ("SALE_ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "SALES"`);
    }

}
