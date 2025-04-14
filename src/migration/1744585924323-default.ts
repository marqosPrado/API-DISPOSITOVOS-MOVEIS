import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744585924323 implements MigrationInterface {
    name = 'Default1744585924323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" ALTER COLUMN "USE_IS_ACTIVE" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" ALTER COLUMN "USE_IS_ACTIVE" DROP NOT NULL`);
    }

}
