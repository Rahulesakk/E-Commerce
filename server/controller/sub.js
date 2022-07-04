const Sub = require("../models/sub")
const slugify = require("slugify")

exports.create = async(req, res, next) =>{
    //
    try{
        const {name ,parent} = req.body
        const sub = await new Sub({name,parent,slug:slugify(name)}).save();
        res.json(sub)
    }catch (err){
        // console.log(err);
        res.status(400).send('Create sub failed')
    }
}
exports.list = async(req, res, next) => {
  //r
  res.json(await Sub.find({}).sort({createdAt:-1}).exec())
};
exports.read = async(req, res, next) => {
  let sub = await Sub.findOne({slug:slugify(req.params.slug)})
  console.log(sub)
  res.json(sub)
};
exports.update = async(req, res, next) => {
    const {name} = req.body
    try{
        const updated = await Sub.findOneAndUpdate({slug:req.params.slug},{name:name,slug:slugify(name)},{new:true})
        res.json(updated)
    }catch(err){
        res.status(400).send("Sub update failed");
    }
};
exports.remove = async(req, res, next) => {
    console.log(req.params.slug);
  try{
    const deleted = await Sub.findOneAndDelete({slug:req.params.slug})
    res.json(deleted)
  }catch(err){
    res.status(400).send('Delete Sub failed')
  }
};
