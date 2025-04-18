import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744591920305 implements MigrationInterface {
    name = 'Default1744591920305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" ALTER COLUMN "USE_UPDATE_AT" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USERS" ALTER COLUMN "USE_UPDATE_AT" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" ALTER COLUMN "USE_UPDATE_AT" SET DEFAULT '2025-04-14 00:51:38.726'`);
        await queryRunner.query(`ALTER TABLE "USERS" ALTER COLUMN "USE_UPDATE_AT" DROP NOT NULL`);
    }

}
