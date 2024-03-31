import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn()
    id_equipment: number;

    @Column()
    name_equipment: string;

    @Column()
    so_luong_equipment: number;
    
    @Column()
    loai_equipment: string;

    @Column()
    gia_equipment: number;

    @Column()
    status_equipment: string;

    @Column({ nullable: true, default: '...'})
    note_equipment: string;   

    @CreateDateColumn()
    ngay_tao_equipment: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_equipment: Date;
}