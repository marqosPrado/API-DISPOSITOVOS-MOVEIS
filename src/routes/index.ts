import { Router } from 'express';
import usersRoutes from "./users.routes";
import vehicleRoutes from "./vehicles.routes";

export const router: Router = Router()
    .use("/users", usersRoutes)
    .use("/vehicles", vehicleRoutes);