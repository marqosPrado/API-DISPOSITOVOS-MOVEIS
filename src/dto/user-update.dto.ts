import {IsDateString, IsEmail, IsOptional, MinLength} from "class-validator";

export class UserUpdateDto {
    @IsOptional()
    id?: string;

    @IsOptional()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;

    @IsOptional()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Invalid birthdate format' })
    birthdate?: Date;
}
