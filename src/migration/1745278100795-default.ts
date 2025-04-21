import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1745278100795 implements MigrationInterface {
    name = 'Default1745278100795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CATEGORIES" ADD "CAT_UPDATED_AT" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CATEGORIES" DROP COLUMN "CAT_UPDATED_AT"`);
    }

}
