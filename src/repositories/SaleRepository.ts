import { Repository } from "typeorm";
import { AppDataSource } from "../config/database/data-source";
import { SaleAggregate } from "../aggregates/SaleAggregate";
import { Sale } from "../domain/Sale/Sale";

export class SaleRepository {
    private repository: Repository<SaleAggregate> = AppDataSource.getRepository(SaleAggregate);

    async save(aggregate: SaleAggregate): Promise<Sale> {
        const saved = await this.repository.save(aggregate);
        return saved.toDomain();
    }

    async findOneById(id: string): Promise<Sale | null> {
        const sale = await this.repository.findOneBy({ id });
        return sale ? sale.toDomain() : null;
    }

    async update(aggregate: SaleAggregate): Promise<Sale | null> {
        await this.repository.update({ id: aggregate.id }, {
            date: aggregate.date,
            description: aggregate.description,
            quantity: aggregate.quantity,
            total: aggregate.total
        });

        const updated = await this.repository.findOneBy({ id: aggregate.id });
        return updated ? updated.toDomain() : null;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }
}
