const express = require("express")
const router = express.Router()
const {attachmentSchema}=require("./../schemas/attachment.schema")
const mongoose = require("mongoose")
const { get_ticket_by_ticket_id,insertTicket ,getTickets,insertFileNameMongo,insertComments ,close_ticket} =require( "../model/ticket/ticket.model")
const {upload,bucket,fs,path} = require("../model/ticket/insertImgintoGCP")
router.all("/",(req,res,next)=>{})






router.post("/update-comments",async(request,respnse)=>{
try{

    mongoose.connect('mongodb://localhost:27017/ITSM', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    const {ticket_id,comment,admin_id}=request.body 
    const result = await insertComments(ticket_id,comment)
    if(result)
    {
        respnse.json({status:"success",message:"Comments added successfully"})
    }

}
catch(error)
{
    respnse.json({status:"failure",message:error})
}
})
router.post("/create-ticket",upload.single('file'),async(request,response)=>{
    const {user_id,subject,description}=request.body
    try{
        const result = await insertTicket(subject,description,user_id)
       ticket_id = result.ticket_id
       console.log("The ticekt id is",ticket_id)
        if(request.file)
        {

            mongoose.connect('mongodb://localhost:27017/ITSM', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

            const file = request.file;
            const fileName = ticket_id+String(Date.now());
            
            console.log(fileName)
            const fileBuffer = file.buffer;
            const gcsFile = bucket.file(fileName);
            const stream = gcsFile.createWriteStream({ metadata: {contentType: file.mimetype,},resumable: false,});
            stream.end(fileBuffer);
            const gcsFileURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            console.log("File stored at:", gcsFileURL);
            

            const result = insertFileNameMongo(fileName,ticket_id)

        }
        
        
        
            response.send({status:"success",message:"ticket inserted successfully",ticket_id:result})
        
       


        


    }
    catch(error)
    {
        console.error('Error uploading image to GCS:', error);
        response.json({status:"error"})

    }

    
    
})
router.get("/get-tickets",async(request,response)=>{
    try{
        const result = await getTickets()
            response.json({status:"success",result:result.rows})
        
       

    }
    catch(error){
        response.json({status:"error",message:error})
    }
})


router.post("/close-ticket",async(request,response)=>{

    try
    {
        const {ticket_id}=( request.body)
        console.log("Ticket id passed",ticket_id)
        const result = await close_ticket(ticket_id)
        if(result)
        {
            response.json({status:"success",message:"ticket closed successful"})
        }
    }
    catch(error)
    {response.json({status:"failure",message:error})

    }
    
    
})

router.get("/:ticket_id",async (request,response)=>{
    try {
        mongoose.connect('mongodb://localhost:27017/ITSM', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

        ticket_id = request.params.ticket_id
        console.log("Ticket id is",ticket_id)
        const result =await get_ticket_by_ticket_id(ticket_id)
        response.json({status:"success",message:result})

    } catch ({error}) {
        response.json({status:"failure",message:error.message})
    }
})


router.get("/change-team",async(request,response)=>{
    const {ticket_id,team_id}= request.body.team_id
    const result = await change_team_owner(ticket_id,team_id)
    
})


module.exports = router