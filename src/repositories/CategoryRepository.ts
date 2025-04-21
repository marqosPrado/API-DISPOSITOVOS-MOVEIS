import {Repository} from "typeorm";
import {CategoryAggregate} from "../aggregates/CategoryAggregate";
import {AppDataSource} from "../config/database/data-source";
import {Category} from "../domain/Category/Category";

export class CategoryRepository {
    private repository: Repository<CategoryAggregate> = AppDataSource.getRepository(CategoryAggregate);

    async save(category: CategoryAggregate): Promise<Category> {
        const savedAggregate: CategoryAggregate = await this.repository.save(category);
        return savedAggregate.toDomain();
    }

    async findOneByName(name: string): Promise<Category | null> {
        const categoryAggregate: CategoryAggregate | null = await this.repository.findOneBy({ name: name })
        if (!categoryAggregate) {
            return null;
        }
        return categoryAggregate.toDomain();
    }

    async findOneById(id: string): Promise<Category | null> {
        const categoryAggregate: CategoryAggregate | null = await this.repository.findOneById(id);
        if (!categoryAggregate) {
            return null;
        }
        return categoryAggregate.toDomain();
    }
}