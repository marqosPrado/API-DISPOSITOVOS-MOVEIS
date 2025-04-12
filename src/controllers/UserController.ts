import { Request, Response } from 'express';

export class UserController {
    public getUsers(_: Request, res: Response): Response {
        return res.status(200).json({
            status: 'success',
            message: 'Users fetched successfully',
        });
    }
}