import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: 'varchar', length: 255})
    brand!: string;
    @Column({type: 'varchar', length: 255})
    model!: string;
    @Column({type: 'int'})
    year!: number;
    @Column({type: 'varchar', length: 255})
    licensePlate!: string;
    @Column({
        default: true,
    })
    available!: boolean;
}