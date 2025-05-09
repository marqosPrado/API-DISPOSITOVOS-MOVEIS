// @ts-nocheck
import {Router, Request, Response} from "express";
import {VehicleRepository} from "../repositories/VehicleRepository";
import {VehicleService} from "../services/vehicle/VehicleService";
import {UserRepository} from "../repositories/UserRepository";
import {VehicleController} from "../controllers/VehicleController";
import {Vehicle} from "../domain/Vehicle/Vehicle";

const routes: Router = Router();

const userRepository = new UserRepository();
const repository = new VehicleRepository();
const service = new VehicleService(repository, userRepository);
const controller = new VehicleController(service);

routes.post("/register",
    (req: Request, res: Response): Promise<Vehicle> => controller.registerVehicle(req, res));
routes.get("/list", (req: Request, res: Response) => controller.listAllByOwner(req, res));
routes.delete("/disable/:id", (req: Resquest, res: Response) => controller.disableById(req, res));

export default routes;