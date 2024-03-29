import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePackagesTable1711731285559 implements MigrationInterface {
    name = 'CreatePackagesTable1711731285559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`packages\` (\`id_packages\` int NOT NULL AUTO_INCREMENT, \`name_packages\` varchar(255) NOT NULL, \`gia_packages\` int NOT NULL, \`note_packages\` varchar(255) NULL DEFAULT '...', \`ngay_tao_packages\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ngay_cap_nhap_packages\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_packages\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`packages\``);
    }

}
