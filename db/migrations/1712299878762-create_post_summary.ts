import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostSummary1712299878762 implements MigrationInterface {
    name = 'CreatePostSummary1712299878762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
    }

}
