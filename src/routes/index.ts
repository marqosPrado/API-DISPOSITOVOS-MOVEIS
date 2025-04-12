import { Router } from 'express';
import usersRoutes from "./users.routes";

export const router: Router = Router()
    .use("/users", usersRoutes);