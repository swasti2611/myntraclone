const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    name:{
    type:String,
    required:true
},
piece:{
    type:Number,
    required:true
},



price:{
    type:String,
    required:true
},
proId:{
    type:String,
    required:true
},

description:{
    type:String,
    required:true
}
})
module.exports=mongoose.model('Products', productSchema,'Products');