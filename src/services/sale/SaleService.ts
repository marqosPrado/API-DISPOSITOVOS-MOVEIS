import { SaleRepository } from "../../repositories/SaleRepository";
import { SaleRequestDto } from "../../dto/sale-request.dto";
import { SaleUpdateDto } from "../../dto/sale-update.dto";
import { SaleMapper } from "../../util/mapper/SaleMapper";

export class SaleService {
    constructor(private repository: SaleRepository) {}

    async save(input: SaleRequestDto) {
        const domain = input.toDomain();
        const aggregate = SaleMapper.fromDomainToAggregate(domain);
        return this.repository.save(aggregate);
    }

    async findOneById(id: string) {
        const sale = await this.repository.findOneById(id);
        if (!sale) throw new Error(`Sale ${id} not found`);
        return sale;
    }

    async update(input: SaleUpdateDto) {
        const sale = await this.repository.findOneById(input.id);
        if (!sale) throw new Error(`Sale ${input.id} not found`);

        sale.update(input);
        const aggregate = SaleMapper.fromDomainToAggregate(sale);
        return this.repository.update(aggregate);
    }

    async delete(id: string) {
        const sale = await this.repository.findOneById(id);
        if (!sale) throw new Error(`Sale ${id} not found`);
        await this.repository.delete(id);
    }
}
