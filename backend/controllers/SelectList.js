
const express = require ('express');

const SelectList =require('../models/selectList');

exports.getSelectList = ( req , res) => {
  SelectList.find().then(
    response=>{
      res.status(200).json({message:"list fetch sucsessfully",SelectList:response}) 
     })
     .catch( error=>{ res.status(500).json({message:"error list not found",err:error})}
  )
}









 




  