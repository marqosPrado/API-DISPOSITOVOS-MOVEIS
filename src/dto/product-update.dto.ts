import { IsNotEmpty, IsOptional, MinLength, MaxLength, IsNumber, Min } from "class-validator";

export class ProductUpdateDto {
    @IsNotEmpty()
    id!: string;

    @IsOptional()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @MinLength(10)
    @MaxLength(255)
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
}
