import { ObjectId } from 'mongodb';
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

async function getOrders(req, res) {
    const { user } = req;
    
    try {
        const orders = await db.collection('orders').find({ idUser: user.idUser }).toArray();
        res.send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getOrderById(req, res) {
    const { id } = req.params;

    try {
        const order = await db.collection('orders').findOne({_id: new ObjectId(id)});
        if(!order) res.status(404).send("Order not found.");
        res.send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default { sendOrder, getOrderById, getOrders };
