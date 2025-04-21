import { Request, Response } from "express";
import {CategoryService} from "../services/category/CategoryService";
import {plainToInstance} from "class-transformer";
import {CategoryRequestDto} from "../dto/category-request.dto";
import {Category} from "../domain/Category/Category";

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
    ) {
    }

    async save(req: Request, res: Response) {
        const dto = plainToInstance(CategoryRequestDto, req.body) as unknown as CategoryRequestDto;

        try {
            const category: Category = await this.categoryService.save(dto);
            res.status(201).json(category);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }

    async findOneById(req: Request, res: Response) {
        const id: string = req.params.id;
        if (!id) res.status(400).json({ message: 'Id is required' });

        try {
            res.status(200).json(await this.categoryService.findOneById(id));
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }

    async delete(req: Request, res: Response) {
        const id: string = req.params.id;
        if (!id) res.status(400).json({ message: 'Id is required' });

        try {
            await this.categoryService.delete(id)
            res.status(200).json({ message: `Category ${id}: deleted successfully` });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }
}