import { Member } from 'src/member/entities/member.entity';
import { Packages } from 'src/packages/entities/packages.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToMany} from 'typeorm';

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
  member: Member;

  @ManyToMany(() => Staff, staff => staff.card, { nullable: true }) 
  staff: Staff;

  @ManyToMany(() => Packages, packages => packages.card)
  packages: Packages;
}