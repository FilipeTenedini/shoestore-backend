import { Router } from 'express';
import orderController from '../controllers/order.controller.js';
import validateToken from '../middlewares/validateToken.middleware.js';
import orderSchema from '../schemas/order.schema.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';

const orderRouter = Router();

orderRouter.post('/order', validateToken, validateSchema(orderSchema), orderController.sendOrder);

export default orderRouter;