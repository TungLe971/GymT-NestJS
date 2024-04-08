import { MigrationInterface, QueryRunner } from "typeorm";

export class NewCard1712425639185 implements MigrationInterface {
    name = 'NewCard1712425639185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card\` (\`id_card\` int NOT NULL AUTO_INCREMENT, \`ngay_start\` date NOT NULL, \`ngay_end\` date NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_hv\` int NULL, \`id_nv\` int NULL, \`id_packages\` int NULL, UNIQUE INDEX \`REL_dea3fff55fb84dbbe4ef2414c8\` (\`id_hv\`), UNIQUE INDEX \`REL_d65a41fae2a8074056acee0bb4\` (\`id_nv\`), UNIQUE INDEX \`REL_fc7ddc310c4314ed5664f67e79\` (\`id_packages\`), PRIMARY KEY (\`id_card\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_dea3fff55fb84dbbe4ef2414c87\` FOREIGN KEY (\`id_hv\`) REFERENCES \`member\`(\`id_hv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_d65a41fae2a8074056acee0bb46\` FOREIGN KEY (\`id_nv\`) REFERENCES \`staff\`(\`id_nv\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_fc7ddc310c4314ed5664f67e794\` FOREIGN KEY (\`id_packages\`) REFERENCES \`packages\`(\`id_packages\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_fc7ddc310c4314ed5664f67e794\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_d65a41fae2a8074056acee0bb46\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_dea3fff55fb84dbbe4ef2414c87\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP INDEX \`REL_fc7ddc310c4314ed5664f67e79\` ON \`card\``);
        await queryRunner.query(`DROP INDEX \`REL_d65a41fae2a8074056acee0bb4\` ON \`card\``);
        await queryRunner.query(`DROP INDEX \`REL_dea3fff55fb84dbbe4ef2414c8\` ON \`card\``);
        await queryRunner.query(`DROP TABLE \`card\``);
    }

}
