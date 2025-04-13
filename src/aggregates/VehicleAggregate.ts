import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {UserAggregate} from "./UserAggregate";
import {Vehicle} from "../domain/Vehicle/Vehicle";
import {LicensePlate} from "../domain/Vehicle/LicensePlate";

@Entity("VEHICLES")
export class VehicleAggregate {
    @PrimaryColumn({name: "VEH_ID"})
    id: string;

    @Column("varchar", {length: 20, nullable: false, name: "VEH_BRAND"})
    brand: string;

    @Column("varchar", {length: 20, nullable: false, name: "VEH_MODEL"})
    model: string;

    @Column("int", {nullable: false, name: "VEH_YEAR"})
    year: number;

    @Column("varchar", {length: 15, nullable: false, name: "VEH_COLOR"})
    color: string;

    @Column("character", {length: 7, nullable: false, name: "VEH_LICENSE_PLATE"})
    licensePlate: string;

    @Column({nullable: false, name: "VEH_REGISTRATION_DATE"})
    registrationDate: Date;

    @ManyToOne(() => UserAggregate, (user: UserAggregate): VehicleAggregate[] => user.vehicles)
    @JoinColumn({name: "VEH_USE_ID"})
    owner!: UserAggregate;

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

    toDomain(): Vehicle {
        return Vehicle.create(
            this.brand,
            this.model,
            this.year,
            this.color,
            new LicensePlate(this.licensePlate),
            this.registrationDate,
            this.id
        )
    }

}