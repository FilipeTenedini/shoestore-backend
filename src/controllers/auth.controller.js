import { db } from "../config/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const userExists = await db.collection("users").findOne({ email });
        if (userExists) return res.status(409).send("Email has already been registered");

        const hash = bcrypt.hashSync(password, 10);

        const user = await db.collection("users").insertOne({ name, email, password: hash });
        await db.collection("carts").insertOne({ idUser: user.insertedId, products: [] });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
