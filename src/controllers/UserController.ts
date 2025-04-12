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
            return res.status(400).json({errors});
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

    public getUsers(_: Request, res: Response): Response {
        return res.status(200).json({
            status: 'success',
            message: 'Users fetched successfully',
        });
    }
}