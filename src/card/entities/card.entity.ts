import { Member } from 'src/member/entities/member.entity';
import { Packages } from 'src/packages/entities/packages.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id_card: number;

  @Column({ type: "date" })
  ngay_start: Date;

  @Column({ type: "date" })
  ngay_end: Date;

  @Column({ type:"int", default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToOne(() => Member)
  @JoinColumn({ name: "id_hv" }) 
  id_hv: number;

  @OneToOne(() => Staff, { nullable: true }) 
  @JoinColumn({ name: "id_nv", referencedColumnName: "id_nv" })
  id_nv: number | null;

  @OneToOne(() => Packages)
  @JoinColumn({ name: "id_packages" }) 
  id_packages: number;
}