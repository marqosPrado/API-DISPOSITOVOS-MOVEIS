import { Request, Response } from "express";
import { SaleService } from "../services/sale/SaleService";
import { plainToInstance } from "class-transformer";
import { SaleRequestDto } from "../dto/sale-request.dto";
import { SaleUpdateDto } from "../dto/sale-update.dto";
import { validate } from "class-validator";

export class SaleController {
    constructor(private service: SaleService) {}

    async save(req: Request, res: Response) {
        const dto = plainToInstance(SaleRequestDto, req.body);
        try {
            const result = await this.service.save(dto);
            res.status(201).json(result);
        } catch (e: any) {
            res.status(400).json({ message: e.message });
        }
    }

    async findOneById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const sale = await this.service.findOneById(id);
            res.status(200).json(sale);
        } catch (e: any) {
            res.status(404).json({ message: e.message });
        }
    }

    async update(req: Request, res: Response) {
        const dto = plainToInstance(SaleUpdateDto, req.body);
        dto.id = req.params.id;
        const errors = await validate(dto);
        if (errors.length > 0) return res.status(400).json({ errors });

        try {
            const updated = await this.service.update(dto);
            res.status(200).json(updated);
        } catch (e: any) {
            res.status(400).json({ message: e.message });
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.service.delete(id);
            res.status(200).json({ message: `Sale ${id} deleted successfully` });
        } catch (e: any) {
            res.status(400).json({ message: e.message });
        }
    }
}
