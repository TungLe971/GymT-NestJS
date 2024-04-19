import { Classroom } from 'src/classroom/entities/classroom.entity';
import { Member } from 'src/member/entities/member.entity';
import { Packages } from 'src/packages/entities/packages.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id_card: number;

  @Column()
  ngay_start: Date;

  @Column()
  ngay_end: Date;

  @Column({ type:"int", default: 1 })
  status: number;

  @Column()
  total_money_card: number;

  @ManyToOne(() => Member, member => member.card)
  @JoinColumn({ name: "member_id" })
  member: Member;

  @ManyToOne(() => Staff, staff => staff.card, { nullable: true })
  @JoinColumn({ name: "staff_id" })
  staff: Staff;

  @ManyToOne(() => Packages, packages => packages.card, { nullable: true })
  @JoinColumn({ name: "packages_id" })
  packages: Packages;

  @ManyToOne(() => Classroom, classroom => classroom.card, { nullable: true })
  @JoinColumn({ name: "classroom_id" })
  classroom: Classroom;
}