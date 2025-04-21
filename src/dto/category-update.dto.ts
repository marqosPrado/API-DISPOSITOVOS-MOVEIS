import {IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";

export class CategoryUpdateDto {
    @IsNotEmpty()
    id!: string;

    @IsOptional()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    name?: string;

    @IsOptional()
    @MinLength(50, { message: 'Name must be at least 50 characters' })
    @MaxLength(255)
    description?: string;
}