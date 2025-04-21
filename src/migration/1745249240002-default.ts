import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1745249240002 implements MigrationInterface {
    name = 'Default1745249240002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VEHICLES" ALTER COLUMN "VEH_IS_ACTIVE" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ALTER COLUMN "VEH_IS_ACTIVE" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VEHICLES" ALTER COLUMN "VEH_IS_ACTIVE" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "VEHICLES" ALTER COLUMN "VEH_IS_ACTIVE" DROP NOT NULL`);
    }

}
