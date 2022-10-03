const Product = require('../models/product')
const slugify = require('slugify');


exports.create = async(req,res) =>{
    try{
        console.log(req.body)
        req.body.slug = slugify(req.body.title)
        const newProduct = await new Product(req.body).save();
        res.send(newProduct)
    }
    catch (err){
        console.log(err);
        res.status(400).send('Product category Failed')
    }
}

exports.listall = async(req,res) =>{
   let products = await Product.find({})
   .limit(parseInt(req.params.count))
   .populate('category')
   .populate("subs")
   .sort([["createdAt","desc"]])
   .exec()
   res.json(products);
}
exports.remove = async(req,res) => {
    console.log("eggsdgsdgsdgdsgds");
    try{
        const deleted = await Product.findOneAndRemove({slug:req.params.slug}).exec();
        console.log(deleted,"aaaaaaaaaaaaaaa")
        res.json(deleted)
    }
    catch(err){
        console.log(err)
        return res.status(400).send("product delete failed")
    }
}

exports.read = async (req,res) => {
    const data = await Product.findOne({slug:req.params.slug})
    .populate('category')
    .populate('subs')
    .exec();
    res.json(data);
}
exports.update = async (req,res)=>{
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)

        }
        const update = await Product.findOneAndUpdate({slug:req.params.slug},
            req.body,
            {new:true})
            .exec();

        res.send(update)
    }
    catch(err){
        console.log("Product Update failed ---->",err)
        return res.status(400).send("Product update failed")
    }
}
//without pagination
// exports.list = async (req,res) => {
//     try{
//         const {sort,limit,order} = req.body;
//         const data = await Product.find({})
//         .populate('category')
//         .populate('subs')
//         .sort([[sort,order]])
//         .limit(limit)
//         .exec()
//         res.json(data);
//     }catch(err){
//         console.log(err)
//     }
// }
//with pagination
exports.list = async (req,res) => {
    console.table(req.body)
    try{
        const {sort,order,page} = req.body;
        const perpage = 3;
        const currentpage = page||1
        const data = await Product.find({})
        .skip((currentpage-1)*perpage)
        .populate('category')
        .populate('subs')
        .sort([[sort,order]])
        .limit(perpage)
        .exec()
        res.json(data);
    }catch(err){
        console.log(err)
    }
}

exports.productscount = async (req, res) => {
    try{
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        const count = await Product.find({}).count();
        console.log(res.json(count),"sdafasdadadadadddasda")
        res.json(count);
    }
    catch(err){
            console.log(err)
        }
   
}