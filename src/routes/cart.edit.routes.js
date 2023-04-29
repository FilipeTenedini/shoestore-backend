import { editCart } from "../controllers/cart.edit.controller.js";
import { Router } from "express";

const cartEditRouter = Router()

cartEditRouter.put('/cart', editCart)

export default cartEditRouter