import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStaffTable1711793614529 implements MigrationInterface {
    name = 'CreateStaffTable1711793614529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`staff\` (\`id_nv\` int NOT NULL AUTO_INCREMENT, \`name_nv\` varchar(255) NOT NULL, \`gioi_tinh_nv\` varchar(255) NOT NULL, \`ngay_sinh_nv\` datetime NOT NULL, \`tuoi_nv\` int NOT NULL, \`sdt_nv\` varchar(255) NOT NULL, \`tcccd_nv\` varchar(255) NOT NULL, \`bien_xe_nv\` varchar(255) NOT NULL, \`dia_chi_nv\` varchar(255) NOT NULL, \`chuc_vu\` varchar(255) NOT NULL, \`email_nv\` varchar(255) NOT NULL, \`ngay_tao_nv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ngay_cap_nhap_nv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_nv\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`staff\``);
    }

}
