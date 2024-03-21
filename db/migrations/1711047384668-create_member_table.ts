import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMemberTable1711047384668 implements MigrationInterface {
    name = 'CreateMemberTable1711047384668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`member\` (\`id_hv\` int NOT NULL AUTO_INCREMENT, \`name_hv\` varchar(255) NOT NULL, \`ngay_sinh_hv\` datetime NOT NULL, \`gioi_tinh_hv\` int NOT NULL DEFAULT '1', \`tuoi_hv\` int NOT NULL, \`sdt_hv\` varchar(255) NOT NULL, \`tcccd_hv\` varchar(255) NOT NULL, \`bien_xe_hv\` varchar(255) NOT NULL, \`diem_tich_luy\` int NOT NULL, \`email_hv\` varchar(255) NOT NULL, \`chieu_cao\` int NOT NULL, \`can_nang\` int NOT NULL, \`phan_tram_mo\` int NOT NULL, \`ngay_tao_hv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ngay_cap_nhap_hv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_hv\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`member\``);
    }

}
