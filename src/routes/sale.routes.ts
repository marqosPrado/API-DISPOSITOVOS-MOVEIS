// @ts-nocheck
import { Router, Request, Response } from "express";
import { SaleRepository } from "../repositories/SaleRepository";
import { SaleService } from "../services/sale/SaleService";
import { SaleController } from "../controllers/SaleController";

const router: Router = Router();

const repository = new SaleRepository();
const service = new SaleService(repository);
const controller = new SaleController(service);

router.post("/register", (req: Request, res: Response) => controller.save(req, res));
router.get("/find/:id", (req: Request, res: Response) => controller.findOneById(req, res));
router.put("/update/:id", (req: Request, res: Response) => controller.update(req, res));
router.delete("/delete/:id", (req: Request, res: Response) => controller.delete(req, res));

export default router;
