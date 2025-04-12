import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744474011801 implements MigrationInterface {
    name = 'Default1744474011801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "USERS" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USERS" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "USERS" ADD "email" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "USERS" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "USERS" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "USERS" ADD "name" character varying NOT NULL`);
    }

}
