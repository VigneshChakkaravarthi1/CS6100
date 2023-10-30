
const pgp = require('pg-promise')

const express = require("express")
const router = express.Router()
const {getUserByEmail, insertCredentials} = require("../model/user/user.model")
const  {insertUserintoDB}  = require('../model/user/user.model')
router.get("/login",async(req,res)=>{
    console.log("In router.post("/login`" API `)
    const {email,password}= req.body
    if(!email || !password){
        return res.json({status:"error",message:"Incomplete form submission"})
    }
    const user_data = await getUserByEmail(email);
    const password_from_db = user_data.password
    const login_result = comparePassword(password,password_from_db)
    if(login_result)
    {
        res.json({status:"success"})
    }
    else{
        res.json({status:"failure",message:"Invalid user id or password"})
    }

})

router.post("/add_user",async(req,res)=>{
const user_data=req.body
try{
    await insertUserintoDB(user_data)
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
            const result = await insertCredentials(user_id,email,password)
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

router.all("/",(req,res,next)=>{
    // res.json({message:"Return from user router "})
    next()
})
module.exports = router