import { Router } from 'express';
import usersRoutes from "./users.routes";
import vehicleRoutes from "./vehicles.routes";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import saleRoutes from "./sale.routes";

export const router: Router = Router()
    .use("/users", usersRoutes)
    .use("/vehicles", vehicleRoutes)
    .use("/category", categoryRoutes)
    .use("/product", productRoutes)
    .use("/sales", saleRoutes)