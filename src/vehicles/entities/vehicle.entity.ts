import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;
    @Column()
    model: string;
    @Column()
    year: number;
    @Column()   
    licensePlate: string;
    @Column({
        default: true,
    })
    available: boolean;
}