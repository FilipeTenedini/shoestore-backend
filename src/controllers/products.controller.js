import { db } from "../config/database.js";
import { ObjectId } from 'mongodb';

export async function home(req,res){
    const {type} = req.params;

    if(type !== 'all' && type !== 'male' && type !== 'female') return res.sendStatus(400)

    try{
        if(type === 'all'){
            const products = await db.collection('products').find().toArray();
            products.forEach(pr => {delete pr.stock,delete pr.desc});
            res.send(products)
        }
        else{
            const products = await db.collection('products').find({gender: type}).toArray();
            products.forEach(pr => {delete pr.stock,delete pr.desc});
            res.send(products)
        }
    }catch (err){
        return res.status(500).send(err.message)
    }
}

export async function productsDetail(req,res){
    const { id } = req.params;

    try{
        const product = await db.collection('products').findOne({_id: new ObjectId(id)});

        if(!product){
            res.status(404).send("Product not find")
        }
        res.send(product)
    }catch (err){
        return res.status(500).send(err.message)
    }
}