import { Gender } from "src/member/entities/member.entity";
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id_nv: number;

    @Column()
    name_nv: string;

    @Column({ type: "enum", enum: Gender, default: Gender.Other })
    gioi_tinh_nv: Gender;

    @Column()
    tuoi_nv: number;

    @Column()
    sdt_nv: string;
    
    @Column()
    tcccd_nv: string;

    @Column()
    bien_xe_nv: string;

    @Column()
    dia_chi_nv: string;

    @Column()
    chuc_vu: string;

    @Column()
    email: string;

    @CreateDateColumn()
    ngay_tao_nv: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_nv: Date;
}
