import { MigrationInterface, QueryRunner } from "typeorm";

export class Card1712601470188 implements MigrationInterface {
    name = 'Card1712601470188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_d65a41fae2a8074056acee0bb46\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_dea3fff55fb84dbbe4ef2414c87\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_fc7ddc310c4314ed5664f67e794\``);
        await queryRunner.query(`DROP INDEX \`REL_d65a41fae2a8074056acee0bb4\` ON \`card\``);
        await queryRunner.query(`DROP INDEX \`REL_dea3fff55fb84dbbe4ef2414c8\` ON \`card\``);
        await queryRunner.query(`DROP INDEX \`REL_fc7ddc310c4314ed5664f67e79\` ON \`card\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`id_hv\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`id_nv\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`id_packages\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`id_packages\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`id_nv\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`id_hv\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_fc7ddc310c4314ed5664f67e79\` ON \`card\` (\`id_packages\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_dea3fff55fb84dbbe4ef2414c8\` ON \`card\` (\`id_hv\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d65a41fae2a8074056acee0bb4\` ON \`card\` (\`id_nv\`)`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_fc7ddc310c4314ed5664f67e794\` FOREIGN KEY (\`id_packages\`) REFERENCES \`packages\`(\`id_packages\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_dea3fff55fb84dbbe4ef2414c87\` FOREIGN KEY (\`id_hv\`) REFERENCES \`member\`(\`id_hv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_d65a41fae2a8074056acee0bb46\` FOREIGN KEY (\`id_nv\`) REFERENCES \`staff\`(\`id_nv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
