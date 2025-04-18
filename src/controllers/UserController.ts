import {Request, Response} from 'express';
import {UserService} from "../services/user/user.service";
import {plainToInstance} from "class-transformer";
import {UserRequestDto} from "../dto/user-request.dto";
import {validate} from "class-validator";
import {UserUpdateDto} from "../dto/user-update.dto";

export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    async registerUser(req: Request, res: Response) {
        const dto = plainToInstance(UserRequestDto, req.body) as unknown as UserRequestDto;

        const errors = await validate(dto);

        if (errors.length > 0) {
            res.status(400).json({errors});
        }

        try {
            res.status(201).json(await this.userService.registerUser(dto));
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }

    async findAll(_: Request, res: Response) {
        const users = await this.userService.findAll();
        res.status(200).json(users);
    }

    async findByEmail(req: Request, res: Response) {
        const userEmail: string = req.query.email as string;
        if (!userEmail) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            res.status(200).json(
                await this.userService.findByEmail(userEmail)
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }

    async disable(req: Request, res: Response) {
        const userId: string = req.params.id as string;
        if (!userId) {
            return res.status(400).json({ message: 'User id is required' });
        }

        try {
            const user = await this.userService.disable(userId)
            return res.status(200).json({message: `User: ${user.name} is disabled`});
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }

    async edit(req: Request, res: Response) {
        const dto = plainToInstance(UserUpdateDto, req.body) as unknown as UserUpdateDto;
        const errors = await validate(dto); // Validação adicionada

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        if (!dto.id) {
            return res.status(400).json({ message: 'User id is required' });
        }

        try {
            const editedUser = await this.userService.edit(dto);
            return res.status(200).json(editedUser);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }
}