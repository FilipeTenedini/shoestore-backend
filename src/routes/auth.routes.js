import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signUpSchema } from "../schemas/signUp.schema.js";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { signInSchema } from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin",validateSchema(signInSchema), signIn);

export default authRouter;