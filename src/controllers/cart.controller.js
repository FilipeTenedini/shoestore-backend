import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import joi from "joi";

export async function editCart(req, res){
    const { idProduct, sizeProduct } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const purchaseSchema = joi.object({
        idProduct: joi.string().required(),
        sizeProduct: joi.string().required()
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
                { $set: { products: [...productsList, { idProduct, sizeProduct, qtProduct: 1 }] } }
            );

        res.sendStatus(200)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}



async function showCart(req, res) {
    const [tokenType, token] = req.headers.authorization?.split(' ');

    if (!token || tokenType !== 'Bearer') return res.status(401).send('Invalid Token');
    
    try {
        const user = await db.collection('sessions').findOne({ token });
        if (!user) return res.status(404).send('User not found');

        const cart = await db.collection('carts').findOne({ idUser: new ObjectId(user.idUser) });
        res.status(200).send(cart);
    } catch (err) {
        console.log(err.message);
    }
} 

export default { showCart, editCart };