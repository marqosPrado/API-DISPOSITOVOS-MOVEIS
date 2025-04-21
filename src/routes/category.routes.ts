import {Router, Response, Request} from "express";
import {CategoryRepository} from "../repositories/CategoryRepository";
import {CategoryService} from "../services/category/CategoryService";
import {CategoryController} from "../controllers/CategoryController";

const repository = new CategoryRepository();
const service = new CategoryService(repository);
const controller = new CategoryController(service);

const router: Router = Router();
router.post("/register", (req: Request, res: Response) => controller.save(req, res));
router.get("/find/:id", (req: Request, res: Response) => controller.findOneById(req, res));
router.delete("/delete/:id", (req: Request, res: Response) => controller.delete(req, res));
router.put("/update/:id", (req: Request, res: Response) => controller.update(req, res));

export default router;