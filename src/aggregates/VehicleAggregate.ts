import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("VEHICLES")
export class VehicleAggregate {
    @PrimaryColumn()
    id: string;

    @Column("varchar", {length: 20, nullable: false})
    brand: string;

    @Column("varchar", {length: 20, nullable: false})
    model: string;

    @Column("int", {nullable: false})
    year: number;

    @Column("varchar", {length: 15, nullable: false})
    color: string;

    @Column("character", {length: 7, nullable: false})
    licensePlate: string;

    @Column({nullable: false})
    registrationDate: Date;

    constructor(
        id: string,
        brand: string,
        model: string,
        year: number,
        color: string,
        licensePlate: string,
        registrationDate: Date
    ) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.licensePlate = licensePlate;
        this.registrationDate = registrationDate;
    }

}