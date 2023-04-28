import { Router } from 'express';
import cartRouter from './cart.routes.js';
import authRouter from './auth.routes.js';

const router = Router();

router.use('/cart', cartRouter);
router.use(authRouter);

export default router;