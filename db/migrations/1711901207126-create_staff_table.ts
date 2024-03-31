import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStaffTable1711901207126 implements MigrationInterface {
    name = 'CreateStaffTable1711901207126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`staff\` (\`id_nv\` int NOT NULL AUTO_INCREMENT, \`name_nv\` varchar(255) NOT NULL, \`gioi_tinh_nv\` varchar(255) NOT NULL, \`ngay_sinh_nv\` date NOT NULL, \`tuoi_nv\` int NOT NULL, \`sdt_nv\` varchar(255) NOT NULL, \`tcccd_nv\` varchar(255) NOT NULL, \`bien_xe_nv\` varchar(255) NOT NULL, \`dia_chi_nv\` varchar(255) NOT NULL, \`chuc_vu\` varchar(255) NOT NULL, \`email_nv\` varchar(255) NOT NULL, \`ngay_tao_nv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ngay_cap_nhap_nv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_nv\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`ngay_tao_packages\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`ngay_tao_packages\``);
        await queryRunner.query(`DROP TABLE \`staff\``);
    }

}
