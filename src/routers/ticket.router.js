const express = require("express")
const router = express.Router()
const { getUserByEmail }=require("../model/user/user.model")
const { insertTicket } =require( "../model/ticket/ticket.model")
router.all("/",(req,res,next)=>{
    res.json({message:"Return from ticket router "})
})
router.post("/create-ticket",async(request,response)=>{
    

    const {user_id,subject,description,files}=request.body
    
    if(user_id){
const ticket_id = await insertTicket(user_id,subject, description)
    }
    
})

module.exports = router