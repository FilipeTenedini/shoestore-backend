import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

async function showCart(req, res) {
    const [tokenType, token] = req.headers.authorization?.split(' ');

    if (!token || tokenType !== 'Bearer') return res.status(401).send({message: 'Invalid Token'});
    
    try {
        const user = await db.collection('sessions').findOne({ tokens: { $in: [token] } });
        const cart = await db.collection('carts').findOne({ userId: new ObjectId(user.userId) });
        res.status(200).send(cart);
    } catch (err) {
        console.log(err.message);
    }
} 

export default { showCart };