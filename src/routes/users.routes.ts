import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router: Router = Router();
const userController = new UserController();

// @ts-ignore
router.get("/all", userController.getUsers.bind(userController));

export default router;