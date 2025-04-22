import { ProductRepository } from "../../repositories/ProductRepository";
import { Product } from "../../domain/Product/Product";
import { ProductRequestDto } from "../../dto/product-request.dto";
import { ProductUpdateDto } from "../../dto/product-update.dto";
import { ProductAggregate } from "../../aggregates/ProductAggregate";
import { ProductMapper } from "../../util/mapper/ProductMapper";

export class ProductService {
    constructor(private repository: ProductRepository) {}

    async save(input: ProductRequestDto): Promise<Product> {
        input.name = input.name.toUpperCase();
        const exists: Product | null = await this.repository.findOneByName(input.name);
        if (exists) {
            throw new Error(`Product ${input.name} already exists`);
        }

        const product = input.toDomain();
        const aggregate: ProductAggregate = ProductMapper.fromDomainToAggregate(product);
        return this.repository.save(aggregate);
    }

    async findOneById(id: string): Promise<Product> {
        const product: Product | null = await this.repository.findOneById(id);
        if (!product) {
            throw new Error(`Cannot find product with id ${id}`);
        }
        return product;
    }

    async delete(id: string): Promise<void> {
        const exists = await this.repository.findOneById(id);
        if (!exists) {
            throw new Error(`Cannot find product with id: ${id}`);
        }
        await this.repository.delete(id);
    }

    async update(input: ProductUpdateDto): Promise<Product | null> {
        const product: Product | null = await this.repository.findOneById(input.id);
        if (!product) {
            throw new Error(`Cannot find product with id: ${input.id}`);
        }

        product.update({
            name: input.name,
            description: input.description,
            price: input.price,
        });

        const aggregate: ProductAggregate = ProductMapper.fromDomainToAggregate(product);
        return this.repository.update(aggregate);
    }
}
