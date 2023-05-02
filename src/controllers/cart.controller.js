import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import joi from "joi";

export async function editCart(req, res){
    const { idProduct, sizeProduct, qtProduct, priceProduct, photoProduct } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const purchaseSchema = joi.object({
        idProduct: joi.string().required(),
        sizeProduct: joi.number().integer().required(),
        qtProduct: joi.number().integer().required(),
        priceProduct: joi.number().precision(2).required(),
        photoProduct: joi.string().required(),
    })
    const validation = purchaseSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    if (!token) return res.sendStatus(401);

    try {
        const sessao = await db.collection('sessions').findOne({ token });
        if (!sessao) return res.sendStatus(401);

        const cart = await db.collection('carts').findOne({ idUser: sessao.idUser });
        const productsList = cart.products;

        const listedProducts = productsList.find(pr => pr.idProduct === idProduct);

        if(listedProducts) return res.status(409).send("This product is already in your cart");

        const result = await db.collection('carts')
            .updateOne(
                { idUser: sessao.idUser },
                { $set: { products: [...productsList, { idProduct, sizeProduct, qtProduct, priceProduct, photoProduct  }] } }
            );

        res.sendStatus(200)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}



async function showCart(req, res) {
    const { user } = req;
    try {
        const cart = await db.collection('carts').findOne({ idUser: new ObjectId(user.idUser) });
        res.status(200).send(cart);
    } catch (err) {
        console.log(err.message);
    }
} 

export default { showCart, editCart };