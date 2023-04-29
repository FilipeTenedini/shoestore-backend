import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';

const cartRouter = Router();

cartRouter.put('/cart', cartController.editCart)
cartRouter.get('/cart', validateToken, cartController.showCart);

export default cartRouter;