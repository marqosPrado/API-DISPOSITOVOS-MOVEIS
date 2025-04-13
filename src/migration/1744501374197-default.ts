import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744501374197 implements MigrationInterface {
    name = 'Default1744501374197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" RENAME COLUMN "id" TO "USE_ID"`);
        await queryRunner.query(`ALTER TABLE "USERS" RENAME CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" TO "PK_a67dd6646e1234cfe41afdf0e59"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" RENAME CONSTRAINT "PK_a67dd6646e1234cfe41afdf0e59" TO "PK_b16c39a00c89083529c6166fa5b"`);
        await queryRunner.query(`ALTER TABLE "USERS" RENAME COLUMN "USE_ID" TO "id"`);
    }

}
