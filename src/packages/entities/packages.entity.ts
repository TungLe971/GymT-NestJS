import { Column, Entity } from "typeorm";

@Entity()
export class Packages{
    @Column()
    packages_day: number;

    @Column()
	packages_basic: number;

    @Column()
	packages_premium: number;

    @Column()
	packages_pro: number;

}