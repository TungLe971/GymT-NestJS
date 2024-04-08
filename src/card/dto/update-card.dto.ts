import { Member } from "src/member/entities/member.entity";
import { Packages } from "src/packages/entities/packages.entity";
import { Staff } from "src/staff/entities/staff.entity";

export class UpdateCardDto {

  ngay_start: Date;

  ngay_end: Date;

  status: number;

  member: Member;

  packages: Packages;  
  
  staff: Staff;

}
