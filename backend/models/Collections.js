const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const collectionsSchema = new Schema({
   cat_id:{
    type:Number,
    required:true

},
min_price:{
    type:Number,
    required:true
},
name:{
    type:String,
    required:true
    
},

ProId:{
    type:String,
    required:true
    
},
brand_id:{
    type:Number,
    required:true
},

select_id:{
    type:Number,
    required:true
}
})

module.exports=mongoose.model('NewCollections',collectionsSchema,'NewCollections');