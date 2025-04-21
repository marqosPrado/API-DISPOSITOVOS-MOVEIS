import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1745271739205 implements MigrationInterface {
    name = 'Default1745271739205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CATEGORIES" ("CAT_ID" character varying NOT NULL, "CAT_NAME" character varying NOT NULL, "CAT_DESCRIPTION" character varying NOT NULL, CONSTRAINT "PK_b4a100197fe1b3873edab662332" PRIMARY KEY ("CAT_ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "CATEGORIES"`);
    }

}
