import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id_n: number;
    
    @Column()
    title_n: string;

    @Column()
    noi_dung_n: string;

    @Column({type:"int", default:1})
    status_n: number;

    @CreateDateColumn()
    ngay_tao_n: Date;
    
    @UpdateDateColumn()
    ngay_cap_nhap_n: Date;
}