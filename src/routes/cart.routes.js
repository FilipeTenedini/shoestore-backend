import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.get('/', cartController.showCart);

export default cartRouter;