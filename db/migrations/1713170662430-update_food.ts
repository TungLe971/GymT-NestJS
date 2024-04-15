import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFood1713170662430 implements MigrationInterface {
    name = 'UpdateFood1713170662430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` ADD \`total_money_food\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` DROP COLUMN \`total_money_food\``);
    }

}
