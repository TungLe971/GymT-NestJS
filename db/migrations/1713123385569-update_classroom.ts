import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClassroom1713123385569 implements MigrationInterface {
    name = 'UpdateClassroom1713123385569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`classroom\` CHANGE \`so_luong_classroom\` \`so_luong_classroom\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`classroom\` CHANGE \`so_luong_classroom\` \`so_luong_classroom\` int NOT NULL`);
    }

}
