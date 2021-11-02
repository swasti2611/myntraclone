const  Products = require('../models/Productitem');

exports.getProductDetailsByCollections=(req,res)=>{
    const{itemId}=req.params;
    Products.find({ProId:itemId})
    .then(response => {
        res.status(200).json({ message: "collection Fetched Succesfully", Products:response })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
 }