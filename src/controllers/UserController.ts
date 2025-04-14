import {Request, Response} from 'express';
import {UserService} from "../services/user/user.service";
import {plainToInstance} from "class-transformer";
import {UserRequestDto} from "../dto/user-request.dto";
import {validate} from "class-validator";

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
        const userId: string = req.query.userId as string;
        if (!userId) {
            return res.status(400).json({ message: 'User id is required' });
        }

        try {
            await this.userService.disable(userId)
            return res.status(200).json({message: `User ${userId} is disabled`});
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unexpected error' });
            }
        }
    }
}