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