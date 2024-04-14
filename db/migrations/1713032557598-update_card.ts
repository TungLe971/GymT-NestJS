import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCard1713032557598 implements MigrationInterface {
    name = 'UpdateCard1713032557598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`created_at\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

}
