import { Repository } from "typeorm";
import { AppDataSource } from "../config/database/data-source";
import { ProductAggregate } from "../aggregates/ProductAggregate";
import { Product } from "../domain/Product/Product";

export class ProductRepository {
    private repository: Repository<ProductAggregate> = AppDataSource.getRepository(ProductAggregate);

    async save(product: ProductAggregate): Promise<Product> {
        const saved = await this.repository.save(product);
        return saved.toDomain();
    }

    async findOneById(id: string): Promise<Product | null> {
        const result = await this.repository.findOneBy({ id });
        return result?.toDomain() || null;
    }

    async findOneByName(name: string): Promise<Product | null> {
        const result = await this.repository.findOneBy({ name });
        return result?.toDomain() || null;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

    async update(product: ProductAggregate): Promise<Product | null> {
        await this.repository.update({ id: product.id }, {
            name: product.name,
            description: product.description,
            price: product.price,
        });

        const result = await this.repository.findOneBy({ id: product.id });
        return result?.toDomain() || null;
    }
}
