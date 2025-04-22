import { Request, Response } from "express";
import { ProductService } from "../services/product/ProductService";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ProductRequestDto } from "../dto/product-request.dto";
import { ProductUpdateDto } from "../dto/product-update.dto";
import {Product} from "../domain/Product/Product";

export class ProductController {
    constructor(private service: ProductService) {}

    async save(req: Request, res: Response) {
        const dto = plainToInstance(ProductRequestDto, req.body) as unknown as ProductRequestDto;
        try {
            const product = await this.service.save(dto);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async findOneById(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: 'Id is required' });

        try {
            const product: Product = await this.service.findOneById(id);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: 'Id is required' });

        try {
            await this.service.delete(id);
            res.status(200).json({ message: `Product ${id} deleted successfully` });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const dto = plainToInstance(ProductUpdateDto, req.body);
        dto.id = id;

        const errors = await validate(dto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const product = await this.service.update(dto);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
