import { Request, Response } from 'express';
import {Vehicle} from "../domain/Vehicle/Vehicle";
import {plainToInstance} from "class-transformer";
import {VehicleRequestDto} from "../dto/vehicle-request.dto";
import {validate} from "class-validator";
import {VehicleService} from "../services/vehicle/VehicleService";

export class VehicleController {
    constructor(
        private vehicleService: VehicleService
    ) {
    }

    async registerVehicle(req: Request, res: Response) {
        const dto = plainToInstance(VehicleRequestDto, req.body) as unknown as VehicleRequestDto;
        const ownerId = req.query.ownerId as string;

        const errors = await validate(dto);
        if (errors.length > 0) {
            res.status(400).json({ errors });
        }

        try {
            const vehicle = await this.vehicleService.registerVehicle(dto, ownerId);
            res.status(201).json(vehicle);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }

    async listAllByOwner(req: Request, res: Response): Promise<void> {
        const ownerId = req.query.ownerId as string;
        if (!ownerId) {
            res.status(400).json({ message: 'Owner Id is required' });
        }
        res.status(200).json(await this.vehicleService.getAllByOwner(ownerId))
    }
}