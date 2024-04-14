import { MigrationInterface, QueryRunner } from "typeorm";

export class NewCard1713030302342 implements MigrationInterface {
    name = 'NewCard1713030302342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card\` (\`id_card\` int NOT NULL AUTO_INCREMENT, \`ngay_start\` date NOT NULL, \`ngay_end\` date NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`total_money_card\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`member_id\` int NULL, \`classroom_id\` int NULL, PRIMARY KEY (\`id_card\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`staff_id\` (\`cardIdCard\` int NOT NULL, \`staffIdNv\` int NOT NULL, INDEX \`IDX_1c0ccd026ded530d3ea6ddcd38\` (\`cardIdCard\`), INDEX \`IDX_db58e4a2c37dba9b3cf36f7ced\` (\`staffIdNv\`), PRIMARY KEY (\`cardIdCard\`, \`staffIdNv\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`packages_id\` (\`cardIdCard\` int NOT NULL, \`packagesIdPackages\` int NOT NULL, INDEX \`IDX_18467d1fcbe14a8d56f8487f08\` (\`cardIdCard\`), INDEX \`IDX_b75ea6fdebd88960286d391fb9\` (\`packagesIdPackages\`), PRIMARY KEY (\`cardIdCard\`, \`packagesIdPackages\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_7aa48e3182f530f73e9b8ad87af\` FOREIGN KEY (\`member_id\`) REFERENCES \`member\`(\`id_hv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_32f9320125a91b1abcd1137e37c\` FOREIGN KEY (\`classroom_id\`) REFERENCES \`classroom\`(\`id_classroom\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_id\` ADD CONSTRAINT \`FK_1c0ccd026ded530d3ea6ddcd383\` FOREIGN KEY (\`cardIdCard\`) REFERENCES \`card\`(\`id_card\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`staff_id\` ADD CONSTRAINT \`FK_db58e4a2c37dba9b3cf36f7cede\` FOREIGN KEY (\`staffIdNv\`) REFERENCES \`staff\`(\`id_nv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`packages_id\` ADD CONSTRAINT \`FK_18467d1fcbe14a8d56f8487f089\` FOREIGN KEY (\`cardIdCard\`) REFERENCES \`card\`(\`id_card\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`packages_id\` ADD CONSTRAINT \`FK_b75ea6fdebd88960286d391fb9a\` FOREIGN KEY (\`packagesIdPackages\`) REFERENCES \`packages\`(\`id_packages\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages_id\` DROP FOREIGN KEY \`FK_b75ea6fdebd88960286d391fb9a\``);
        await queryRunner.query(`ALTER TABLE \`packages_id\` DROP FOREIGN KEY \`FK_18467d1fcbe14a8d56f8487f089\``);
        await queryRunner.query(`ALTER TABLE \`staff_id\` DROP FOREIGN KEY \`FK_db58e4a2c37dba9b3cf36f7cede\``);
        await queryRunner.query(`ALTER TABLE \`staff_id\` DROP FOREIGN KEY \`FK_1c0ccd026ded530d3ea6ddcd383\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_32f9320125a91b1abcd1137e37c\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_7aa48e3182f530f73e9b8ad87af\``);
        await queryRunner.query(`DROP INDEX \`IDX_b75ea6fdebd88960286d391fb9\` ON \`packages_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_18467d1fcbe14a8d56f8487f08\` ON \`packages_id\``);
        await queryRunner.query(`DROP TABLE \`packages_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_db58e4a2c37dba9b3cf36f7ced\` ON \`staff_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_1c0ccd026ded530d3ea6ddcd38\` ON \`staff_id\``);
        await queryRunner.query(`DROP TABLE \`staff_id\``);
        await queryRunner.query(`DROP TABLE \`card\``);
    }

}
