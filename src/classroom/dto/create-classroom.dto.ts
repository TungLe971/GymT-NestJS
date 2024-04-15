import { IsNotEmpty } from "class-validator";
import { Card } from "src/card/entities/card.entity";
import { Staff } from "src/staff/entities/staff.entity";

export class CreateClassroomDto {
    
    name_classroom: string;

	so_luong_classroom: number;

	thoi_luong_classroom: number;

	day_classroom: number[];

	ngay_start: Date;

    ngay_end: Date;

    status: number;

	@IsNotEmpty()
	staff: Staff;
}