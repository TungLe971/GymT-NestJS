import { IsNotEmpty } from "class-validator";

export class CreateCardDto {
    
    ngay_start: Date;

    ngay_end: Date;
  
    status: number;

    total_money_card: number;
    
    @IsNotEmpty()
    member: number;
  
    staff: number;

    classroom: number;
    
    packages: number;  
}