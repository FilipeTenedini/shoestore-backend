import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.put('/cart', cartController.editCart)
cartRouter.get('/cart', cartController.showCart);

export default cartRouter;