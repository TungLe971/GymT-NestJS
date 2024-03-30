import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id_hv: number;

    @Column()
    name_hv: string;

    @Column({ type: "date" })
    ngay_sinh_hv: Date;

    @Column()
    gioi_tinh_hv: string;

    @Column()
    tuoi_hv: number;

    @Column()
    sdt_hv: string;
    
    @Column()
    tcccd_hv: string;

    @Column()
    bien_xe_hv: string;

    @Column({ nullable: true, default: 0 })
    diem_tich_luy: number;

    @Column()
    email_hv: string;

    @Column({ nullable: true, default: 0 })
    chieu_cao: number;

    @Column({ nullable: true, default: 0 })
    can_nang: number;

    @Column({ nullable: true, default: 0 })
    phan_tram_mo: number;

    @CreateDateColumn({ type: "date" })
    ngay_tao_hv: Date;
    
    @UpdateDateColumn({ type: "date" })
    ngay_cap_nhap_hv: Date;
}