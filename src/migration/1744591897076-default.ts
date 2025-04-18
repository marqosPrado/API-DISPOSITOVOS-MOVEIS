import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744591897076 implements MigrationInterface {
    name = 'Default1744591897076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" ADD "USE_UPDATE_AT" TIMESTAMP DEFAULT '"2025-04-14T00:51:38.726Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" DROP COLUMN "USE_UPDATE_AT"`);
    }

}
