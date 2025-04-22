import { IsNotEmpty, IsOptional, IsNumber, Min } from "class-validator";

export class SaleUpdateDto {
    @IsNotEmpty()
    id!: string;

    @IsOptional()
    date?: Date;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    total?: number;
}
