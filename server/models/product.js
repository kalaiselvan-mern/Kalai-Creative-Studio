import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     price:{
        type:Number,
        required:true,
        default:0

     },
      imageUrl:{
        type:String,
        required:true
     },
      downloadUrl:{
        type:String,
        required:true
     },
     category:{
        type:String,
        enum:["Ffx", "4K CC", "Preset","Anime CC" ,"Text","Assets"],
        default:"4K CC"
     },
     isPremium:{
        type:Boolean,
        default:false
     },
}, {timestamps:true})


export default mongoose.model('Product' , productSchema)