import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) return res.status(404).send("E-mail not resgistered");
        
        const passwordIsCorrect = bcrypt.compareSync(password, user.password);
        if (!passwordIsCorrect) return res.status(401).send("Email or password is wrong");

        const token = uuid();

        await db.collection("sessions").insertOne({idUser:user._id, token:token});

        res.send(token);
    } catch (error) {
        res.status(500).send(error.message);
    }
}