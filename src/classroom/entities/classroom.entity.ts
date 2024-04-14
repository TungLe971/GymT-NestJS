
import { Card } from "src/card/entities/card.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Classroom{

    @PrimaryGeneratedColumn()
    id_classroom: number;
    
    @Column()
    name_classroom: string;

    @Column({ nullable: true, default: 0 })
	so_luong_classroom: number;

    @Column("simple-array")
	day_classroom: number[];

    @Column()
	thoi_luong_classroom: number;

    @Column({ type: "date" })
    ngay_start: Date;

    @Column({ type: "date" })
    ngay_end: Date;

    @Column({ type:"int", default: 1 })
    status: number;

    @CreateDateColumn()
    ngay_tao_classroom: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_classroom: Date;

    @ManyToOne(() => Staff, staff => staff.classroom)
    @JoinColumn({ name: "staff_id" })
    staff: Staff;

    @OneToMany(() => Card, card => card.classroom)
    card: Card;
  
}