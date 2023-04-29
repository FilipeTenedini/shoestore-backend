import { Router } from 'express';
import cartRouter from './cart.routes.js';
import authRouter from './auth.routes.js';
import productsRouter from './products.routes.js';
import cartEditRouter from './cart.edit.routes.js';

const router = Router();

router.use('/cart', cartRouter);
router.use(authRouter);
router.use(productsRouter);
router.use(cartEditRouter)

export default router;