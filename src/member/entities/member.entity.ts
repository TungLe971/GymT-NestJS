import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id_hv: number;

    @Column()
    name_hv: string;

    @Column()
    ngay_sinh_hv: Date;

    @Column({ type: "enum", enum: Gender, default: Gender.Other })
    gioi_tinh_hv: Gender;

    @Column()
    tuoi_hv: number;

    @Column()
    sdt_hv: string;
    
    @Column()
    tcccd_hv: string;

    @Column()
    bien_xe_hv: string;

    @Column()
    diem_tich_luy: number;

    @Column()
    email_hv: string;

    @Column()
    chieu_cao: number;

    @Column()
    can_nang: number;

    @Column()
    phan_tram_mo: number;

    @CreateDateColumn()
    ngay_tao_hv: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_hv: Date;
}