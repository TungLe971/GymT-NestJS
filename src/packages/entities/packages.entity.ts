import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Packages{

    @PrimaryGeneratedColumn()
    id_packages: number;
    
    @Column()
    name_packages: string;

    @Column()
	gia_packages: number;

    @Column({ nullable: true, default: '...' })
	note_packages: string;

    @CreateDateColumn()
    ngay_tao_packages: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_packages: Date;
}