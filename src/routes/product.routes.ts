// @ts-nocheck
import { Router, Request, Response } from "express";
import { ProductRepository } from "../repositories/ProductRepository";
import { ProductService } from "../services/product/ProductService";
import { ProductController } from "../controllers/ProductController";

const repository = new ProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

const router: Router = Router();
router.post("/register", (req: Request, res: Response) => controller.save(req, res));
router.get("/find/:id", (req: Request, res: Response) => controller.findOneById(req, res));
router.delete("/delete/:id", (req: Request, res: Response) => controller.delete(req, res));
router.put("/update/:id", (req: Request, res: Response) => controller.update(req, res));

export default router;
