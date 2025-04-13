import {Vehicle} from "../../domain/Vehicle/Vehicle";
import {VehicleAggregate} from "../../aggregates/VehicleAggregate";

export class VehicleMapper {
    static fromDomainToAggregate(vehicle: Vehicle): VehicleAggregate{
        return new VehicleAggregate(
            vehicle.id,
            vehicle.brand,
            vehicle.model,
            vehicle.year,
            vehicle.color,
            vehicle.licensePlate.content,
            vehicle.registrationDate,
        );
    }
}