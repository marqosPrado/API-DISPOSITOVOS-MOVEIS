// @ts-nocheck
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {UserRepository} from "../repositories/UserRepository";
import {UserService} from "../services/user/user.service";

const router: Router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/register", userController.registerUser.bind(userController));
router.get("/all", userController.findAll.bind(userController));
router.get("/find", userController.findByEmail.bind(userController));
router.delete("/disable", userController.disable.bind(userController));

export default router;