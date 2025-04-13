import {Vehicle} from "../domain/Vehicle/Vehicle";
import {LicensePlate} from "../domain/Vehicle/LicensePlate";

export class VehicleRequestDto {
    brand!: string;
    model!: string;
    year!: number;
    color!: string;
    licensePlate!: string;

    constructor(
        brand: string,
        model: string,
        year: number,
        color: string,
        licensePlate: string
    ) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.licensePlate = licensePlate;
    }

    toDomain(): Vehicle {
        return Vehicle.create(
            this.brand,
            this.model,
            this.year,
            this.color,
            new LicensePlate(this.licensePlate),
            new Date()
        )
    }
}