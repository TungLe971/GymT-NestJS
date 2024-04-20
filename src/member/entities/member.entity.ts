import { Card } from "src/card/entities/card.entity";
import { User } from "src/user/entities/user.entity";
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, OneToOne, OneToMany  } from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id_hv: number;

    @Column()
    name_hv: string;

    @Column()
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

    @CreateDateColumn()
    ngay_tao_hv: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_hv: Date;

    @OneToMany(() => Card, card => card.member)
    card: Card;

    @OneToOne(() => User)
    user: User;
}