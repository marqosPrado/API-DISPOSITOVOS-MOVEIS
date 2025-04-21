import {AppDataSource} from "../config/database/data-source";
import {VehicleAggregate} from "../aggregates/VehicleAggregate";
import {Repository} from "typeorm";
import {Vehicle} from "../domain/Vehicle/Vehicle";
import {UserAggregate} from "../aggregates/UserAggregate";

export class VehicleRepository {
    private repository: Repository<VehicleAggregate> = AppDataSource.getRepository(VehicleAggregate);

    async register(vehicle: VehicleAggregate): Promise<Vehicle> {
        const savedAggregate: VehicleAggregate = await this.repository.save(vehicle);
        return savedAggregate.toDomain();
    }

    async findAllByOwnerId(owner: UserAggregate) {
        return await this.repository.findBy({owner: owner});
    }

    async findOneById(vehicleId: string): Promise<Vehicle | null> {
        const savedVehicleAggregate: VehicleAggregate | null = await this.repository.findOneBy({ id: vehicleId });
        if (!savedVehicleAggregate) {
            return null;
        }
        return savedVehicleAggregate.toDomain();
    }
}