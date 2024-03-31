import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Food {
    @PrimaryGeneratedColumn()
    id_food: number;

    @Column()
    name_food: string;

    @Column()
    so_luong_nhap_food: number;

    @Column({ nullable: true})
    so_luong_con_food: number;
    
    @Column()
    loai_food: string;

    @Column()
    gia_nhap_food: number;

    @Column({ nullable: true, default: 0 })
    gia_ban_food: number;

    @Column({ nullable: true, default: '...'})
    note_food: string;   

    @CreateDateColumn()
    ngay_tao_food: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_food: Date;
}