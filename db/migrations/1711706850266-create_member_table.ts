import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMemberTable1711706850266 implements MigrationInterface {
    name = 'CreateMemberTable1711706850266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`member\` (\`id_hv\` int NOT NULL AUTO_INCREMENT, \`name_hv\` varchar(255) NOT NULL, \`ngay_sinh_hv\` datetime NOT NULL, \`gioi_tinh_hv\` varchar(255) NOT NULL, \`tuoi_hv\` int NOT NULL, \`sdt_hv\` varchar(255) NOT NULL, \`tcccd_hv\` varchar(255) NOT NULL, \`bien_xe_hv\` varchar(255) NOT NULL, \`diem_tich_luy\` int NULL DEFAULT '0', \`email_hv\` varchar(255) NOT NULL, \`chieu_cao\` int NULL DEFAULT '0', \`can_nang\` int NULL DEFAULT '0', \`phan_tram_mo\` int NULL DEFAULT '0', \`ngay_tao_hv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ngay_cap_nhap_hv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_hv\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`member\``);
    }

}
