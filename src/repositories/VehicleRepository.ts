import {AppDataSource} from "../config/database/data-source";
import {VehicleAggregate} from "../aggregates/VehicleAggregate";
import {Repository} from "typeorm";
import {Vehicle} from "../domain/Vehicle/Vehicle";

export class VehicleRepository {
    private repository: Repository<VehicleAggregate> = AppDataSource.getRepository(VehicleAggregate);

    async register(vehicle: VehicleAggregate): Promise<Vehicle> {
        const savedAggregate: VehicleAggregate = await this.repository.save(vehicle);
        return savedAggregate.toDomain();
    }
}