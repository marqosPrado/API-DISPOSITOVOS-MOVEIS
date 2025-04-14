import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744585854800 implements MigrationInterface {
    name = 'Default1744585854800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" ADD "USE_IS_ACTIVE" boolean DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" DROP COLUMN "USE_IS_ACTIVE"`);
    }

}
