import {VehicleRequestDto} from "../../dto/vehicle-request.dto";
import {Vehicle} from "../../domain/Vehicle/Vehicle";
import {UserRepository} from "../../repositories/UserRepository";
import {VehicleRepository} from "../../repositories/VehicleRepository";
import {VehicleMapper} from "../../util/mapper/VehicleMapper";
import {UserMapper} from "../../util/mapper/UserMapper";

export class VehicleService {
    constructor(
        private vehicleRepository: VehicleRepository,
        private userRepository: UserRepository,
    ) {
    }

    async registerVehicle(dto: VehicleRequestDto, ownerId: string): Promise<Vehicle> {
        const vehicle = dto.toDomain();
        const owner = await this.userRepository.findById(ownerId);
        if (!owner) {
            throw new Error("User not found");
        }
        const userAggregate = UserMapper.fromDomainToAggregate(owner);
        const vehicleAggregate = VehicleMapper.fromDomainToAggregate(vehicle);
        vehicleAggregate.owner = userAggregate;

        return await this.vehicleRepository.register(vehicleAggregate);
    }
}