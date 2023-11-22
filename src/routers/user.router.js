
const pgp = require('pg-promise')
const { comparePassword } =require( '../helpers/bcrypt.helper')
const express = require("express")
const router = express.Router()
const {getUserByEmail, insertCredentials} = require("../model/user/user.model")
const  {insertUserIntoDB}  = require('../model/user/user.model')
const {getPasswordFromDb} = require('../model/user/user.model')
router.post("/login",async(req,res)=>{
    console.log("In router.post")
    const {email,password}= req.body
    if(!email || !password){
        return res.json({status:"error",message:"Incomplete form submission"})
    }
    const user_data = await getUserByEmail(email);
    console.log(user_data)
    const password_from_db = await getPasswordFromDb(email)
    console.log(password_from_db)
    // const password_from_db = user_data.password
    const login_result =await  comparePassword(password,password_from_db)
    console.log(login_result)
    if(login_result)
    {
        res.json({status:"success",user_data:user_data})
    }
    else{
        res.json({status:"failure",message:"Invalid user id or password"})
    }

})

router.post("/add-user",async(req,res)=>{
const user_data=req.body

try{
    result = await insertUserIntoDB(user_data)
    res.json({status:"success",message:"Insertion of user masster data success"})

}
catch{
res.json({status:"error",message:"error"})
}


})

router.post("/signup",async(req,res)=>{

    const { email,password}= req.body
    const result = await getUserByEmail(email)
    user_id = result[0].user_id
    if(user_id)
    {
        try{
            const result = await insertCredentials(email,password)
            if(result)
            {
                return res.json({status:"sucess",message:"User credentials inserted successfully"})
            }
        }
        catch(error)
        {
            return res.json({status:"failure",message:"Either email id is incorrect or something went wrong"})
        }
    
    }
    

})



// router.all("/",(req,res,next)=>{
//     res.json({message:"Return from user router "})
//     next()
// })
module.exports = router