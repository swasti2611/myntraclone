const express = require('express');

const route = express.Router();

const SelectListController = require('../controllers/SelectList');
const Categoriescontroller =require('../controllers/Categories');
const Collectioncontroller = require('../controllers/Collections');
const Productitemcontroller =require('../controllers/Productitem')
const Paymentcontroller = require('../controllers/Payment');
const Userscontroller =require ('../controllers/Users');





route.get('/selectitems',SelectListController.getSelectList); 
route.get('/categories', Categoriescontroller.getCategories);
route.post('/filter',Collectioncontroller.filterCollections);
route.get('/collections/:resId',Collectioncontroller.getCollectionsDetailsById);
route.get('/productitem/:itemId',Productitemcontroller.getProductDetailsByCollections);
route.post('/payment',Paymentcontroller.payment);
route.post('/callback',Paymentcontroller.callback);
route.post ('/User',Userscontroller.checkuserdetails);



module.exports=route; 