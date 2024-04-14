import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCard21713089881887 implements MigrationInterface {
    name = 'UpdateCard21713089881887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`classroom\` DROP COLUMN \`day_classroom\``);
        await queryRunner.query(`ALTER TABLE \`classroom\` ADD \`day_classroom\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`classroom\` DROP COLUMN \`day_classroom\``);
        await queryRunner.query(`ALTER TABLE \`classroom\` ADD \`day_classroom\` int NOT NULL`);
    }

}
