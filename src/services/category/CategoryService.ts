import {CategoryRepository} from "../../repositories/CategoryRepository";
import {Category} from "../../domain/Category/Category";
import {CategoryRequestDto} from "../../dto/category-request.dto";
import {CategoryMapper} from "../../util/mapper/CategoryMapper";
import {CategoryUpdateDto} from "../../dto/category-update.dto";
import {CategoryAggregate} from "../../aggregates/CategoryAggregate";

export class CategoryService {
    constructor(
        private repository: CategoryRepository,
    ) {
    }

    async save(input: CategoryRequestDto): Promise<Category> {
        input.name = input.name.toUpperCase();
        const alreadyExists = await this.repository.findOneByName(input.name);
        if (alreadyExists) {
            throw new Error(`Cannot saved new category: Category ${input.name} already exists`);
        }
        const category: Category = input.toDomain();
        const categoryAggregate = CategoryMapper.fromDomainToAggregate(category);
        return this.repository.save(categoryAggregate)
    }

    async findOneById(id: string) {
        const category = await this.repository.findOneById(id);
        if (!category) {
            throw new Error(`Cannot find category with id ${id}`);
        }
        return category;
    }

    async delete(id: string): Promise<void> {
        const categoryExists = await this.repository.findOneById(id);
        if (!categoryExists) {
            throw new Error(`Cannot find category with id: ${id}`);
        }
        await this.repository.delete(id);
    }

    async update(input: CategoryUpdateDto) {
        const category = await this.repository.findOneById(input.id);
        if (!category) {
            throw new Error(`Cannot find category with id: ${input.id}`);
        }

        category.update({
            name: input.name,
            description: input.description,
        });
        const aggregate: CategoryAggregate = CategoryMapper.fromDomainToAggregate(category);
        return await this.repository.update(aggregate);
    }
}