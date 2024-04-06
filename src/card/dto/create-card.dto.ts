import { IsNotEmpty } from "class-validator";
import { Member } from "src/member/entities/member.entity";
import { Packages } from "src/packages/entities/packages.entity";
import { Staff } from "src/staff/entities/staff.entity";

export class CreateCardDto {
    
    ngay_start: Date;

    ngay_end: Date;
  
    status: number;
    
    @IsNotEmpty()
    members: Member;
  
    staffs: Staff;
    
    @IsNotEmpty()
    packages: Packages;  
}