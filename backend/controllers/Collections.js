

const  NewCollections = require('../models/Collections');


exports.filterCollections= (req, res) => {
   let { category ,color, lcost, hcost,brand } = req.body;
   const reqBody= req.body;

       const sort = reqBody.sort? reqBody.sort :1;

       const page= reqBody.page ? reqBody.page :1;

   let filterpayload={};
   const itemperpage=11;

   let startindex=itemperpage * page - itemperpage ;
   let endindex= itemperpage * page;


   if(category){
       filterpayload={
           cat_id :category 
       }
   }

   if(category  && brand ){
       filterpayload={
           cat_id:category,
           
           brand_id: brand


       }
   }
   

    if(category && lcost && hcost){
        filterpayload={
           cat_id:category,
           min_price:{$lte:hcost , $gte:lcost}
        }
    }
    if(category&& color && lcost && hcost){
        filterpayload={
           cat_id:category,
           color_id:color,  
           min_price :{$lte:hcost , $gte:lcost}
        }
    }
    
    
    
   NewCollections.find(filterpayload).sort({min_price:sort})
.then( response =>{

   //pagination logic
   const filterdResponse= response.slice(startindex,endindex);
   res.status(200).json({message:"Collection Fetched Succesfully",NewCollections:filterdResponse})
})
.catch( error=>{
   res.status(500).json({message:"not found",err:error})
});
}




exports.getCollectionsDetailsById= (req, res) => {

   const {resId} = req.params;
   NewCollections.findById(resId)
             .then(response => {
           res.status(200).json({ message: "collection Fetched Succesfully",Newcollection: response })
       }).catch(err => {
           res.status(500).json({ error: err })
       })
}



