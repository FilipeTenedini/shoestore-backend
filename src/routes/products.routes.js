import { Router } from "express";
import { home, productsDetail } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get('/products/:type', home)
productsRouter.get('/products/details/:id', productsDetail)

export default productsRouter