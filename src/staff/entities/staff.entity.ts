import { Card } from "src/card/entities/card.entity";
import { Classroom } from "src/classroom/entities/classroom.entity";
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id_nv: number;

    @Column()
    name_nv: string;

    @Column()
    gioi_tinh_nv: string;

    @Column()
    ngay_sinh_nv: Date;

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
    email_nv: string;

    @CreateDateColumn()
    ngay_tao_nv: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_nv: Date;

    @OneToMany(() => Card, card => card.staff)
    card: Card;

    @OneToMany(() => Classroom, classroom => classroom.staff)
    classroom: Classroom[];
}
