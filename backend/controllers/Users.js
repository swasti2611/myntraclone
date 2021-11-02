const Users = require('../Models/Users');

exports.checkuserdetails = (req, res) => {
    const{ email, password }=req.body;
    Users.find({email: email , password: password})
    .then(response=>{
        if(response.length > 0){
            res.status(200).json({ message: "User login successfully", isAuthenticatedUser :true, user:response })
    }
else{
     res.status(200).json({ message: "User login unsuccessfully",isAuthenticatedUser :false, user:response })
    }
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
        
}
    
