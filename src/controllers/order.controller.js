import { db } from '../config/database.js';

async function sendOrder(req, res) {
    const { user } = req;
    const { data, address } = req.locals;

    try {
        const cart = await db.collection('carts').findOne({ idUser: user.idUser });
        if (!cart) return res.status(404).send('Cart not found!');
        const { idUser, products } = cart;

        const order = { idUser, data, address, products };
        await db.collection('orders').insertOne(order);
            await db.collection('carts').updateOne(
                { idUser: user.idUser }, { $set: { products: [] } }
            );

        res.send(order);
    } catch (err) {
        console.log(err.message);
    }
}

export default { sendOrder };
