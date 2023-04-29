import { db } from "../config/database.js";

async function validateToken(req, res, next) {
    const [tokenType, token] = req.headers.authorization?.split(' ');

    if (!token || tokenType !== 'Bearer') return res.status(401).send('Invalid Token');

    try {
        const user = await db.collection('sessions').findOne({ token });
        if (!user) return res.status(404).send('user not found');
        req.user = user;
    } catch (err) {
        console.log(err.message);
    }

    next();
}

export default validateToken;