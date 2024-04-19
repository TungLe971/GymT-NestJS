import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1713454928879 implements MigrationInterface {
    name = 'Create1713454928879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`classroom\` (\`id_classroom\` int NOT NULL AUTO_INCREMENT, \`name_classroom\` varchar(255) NOT NULL, \`so_luong_classroom\` int NULL DEFAULT '0', \`day_classroom\` text NOT NULL, \`thoi_luong_classroom\` int NOT NULL, \`ngay_start\` datetime NOT NULL, \`ngay_end\` datetime NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`ngay_tao_classroom\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ngay_cap_nhap_classroom\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`staff_id\` int NULL, PRIMARY KEY (\`id_classroom\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`member\` (\`id_hv\` int NOT NULL AUTO_INCREMENT, \`name_hv\` varchar(255) NOT NULL, \`ngay_sinh_hv\` datetime NOT NULL, \`gioi_tinh_hv\` varchar(255) NOT NULL, \`tuoi_hv\` int NOT NULL, \`sdt_hv\` varchar(255) NOT NULL, \`tcccd_hv\` varchar(255) NOT NULL, \`bien_xe_hv\` varchar(255) NOT NULL, \`diem_tich_luy\` int NULL DEFAULT '0', \`email_hv\` varchar(255) NOT NULL, \`chieu_cao\` int NULL DEFAULT '0', \`can_nang\` int NULL DEFAULT '0', \`phan_tram_mo\` int NULL DEFAULT '0', \`ngay_tao_hv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ngay_cap_nhap_hv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_hv\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`card\` (\`id_card\` int NOT NULL AUTO_INCREMENT, \`ngay_start\` datetime NOT NULL, \`ngay_end\` datetime NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`total_money_card\` int NOT NULL, \`member_id\` int NULL, \`staff_id\` int NULL, \`packages_id\` int NULL, \`classroom_id\` int NULL, PRIMARY KEY (\`id_card\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`staff\` (\`id_nv\` int NOT NULL AUTO_INCREMENT, \`name_nv\` varchar(255) NOT NULL, \`gioi_tinh_nv\` varchar(255) NOT NULL, \`ngay_sinh_nv\` datetime NOT NULL, \`tuoi_nv\` int NOT NULL, \`sdt_nv\` varchar(255) NOT NULL, \`tcccd_nv\` varchar(255) NOT NULL, \`bien_xe_nv\` varchar(255) NOT NULL, \`dia_chi_nv\` varchar(255) NOT NULL, \`chuc_vu\` varchar(255) NOT NULL, \`email_nv\` varchar(255) NOT NULL, \`ngay_tao_nv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ngay_cap_nhap_nv\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_nv\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`classroom\` ADD CONSTRAINT \`FK_012ddbb44caf6081d6ef9c99aac\` FOREIGN KEY (\`staff_id\`) REFERENCES \`staff\`(\`id_nv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_7aa48e3182f530f73e9b8ad87af\` FOREIGN KEY (\`member_id\`) REFERENCES \`member\`(\`id_hv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_4c46abcbc71cee800801fb46dce\` FOREIGN KEY (\`staff_id\`) REFERENCES \`staff\`(\`id_nv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_c2e4f12fa6811d77309c0e5dbfc\` FOREIGN KEY (\`packages_id\`) REFERENCES \`packages\`(\`id_packages\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_32f9320125a91b1abcd1137e37c\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id_classroom\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_32f9320125a91b1abcd1137e37c\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_c2e4f12fa6811d77309c0e5dbfc\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_4c46abcbc71cee800801fb46dce\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_7aa48e3182f530f73e9b8ad87af\``);
        await queryRunner.query(`ALTER TABLE \`classroom\` DROP FOREIGN KEY \`FK_012ddbb44caf6081d6ef9c99aac\``);
        await queryRunner.query(`DROP TABLE \`staff\``);
        await queryRunner.query(`DROP TABLE \`card\``);
        await queryRunner.query(`DROP TABLE \`member\``);
        await queryRunner.query(`DROP TABLE \`classroom\``);
    }

}
