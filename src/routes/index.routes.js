import { Router } from 'express';
import cartRouter from './cart.routes.js';
import authRouter from './auth.routes.js';
import productsRouter from './products.routes.js';
import orderRouter from './order.routes.js';

const router = Router();

router.use(cartRouter);
router.use(authRouter);
router.use(productsRouter);
router.use(orderRouter);
// router.use(cartEditRouter);
export default router;