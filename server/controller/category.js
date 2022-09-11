const Category = require("../models/category")
const Sub = require("../models/sub")
const slugify = require("slugify")

exports.create = async(req, res, next) =>{
    //
    try{
        const {name} = req.body
        const category = await new Category({name,slug:slugify(name)}).save();
        res.json(category)
    }catch (err){
        // console.log(err);
        res.status(400).send('Create category failed')
    }
}
exports.list = async(req, res, next) => {
  //r
  res.json(await Category.find({}).sort({createdAt:-1}).exec())
};
exports.read = async(req, res, next) => {
  let category = await Category.findOne({slug:slugify(req.params.slug)})
  console.log(category)
  res.json(category)
};
exports.update = async(req, res, next) => {
    const {name} = req.body
    try{
        const updated = await Category.findOneAndUpdate({slug:req.params.slug},{name:name,slug:slugify(name)},{new:true})
        res.json(updated)
    }catch(err){
        res.status(400).send("Delete update failed");
    }
};
exports.remove = async(req, res, next) => {
    console.log(req.params.slug);
  try{
    const deleted = await Category.findOneAndDelete({slug:req.params.slug})
    res.json(deleted)
  }catch(err){
    res.status(400).send('Delete category failed')
  }
};

exports.getSubs = async(req,res) => {
  Sub.find({parent:req.params._id}).exec((err,subs)=>{
    if(err)console.log(err)
    res.json(subs)
  })
  
}
