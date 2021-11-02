
const Categories=require('../models/Categories');

exports.getCategories = ( req , res) => {


Categories.find().then(
            response=>{
              res.status(200).json({message:"categories fetch sucsessfully",Categories:response}) 
             }
          )
          .catch( error=>{ res.status(500).json({message:"error categories not found",err:error})
      }
          )
}
