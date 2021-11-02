const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SelectlistSchema = new Schema({
    id:{
    type:Number,
    required:true

},
name:{
    type:String,
    required:true
    
},

select_id:{
    type:String,
    required:true
}
})

module.exports=mongoose.model('SelectList',SelectlistSchema,'SelectList');