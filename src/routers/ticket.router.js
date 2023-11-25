const express = require("express")
const router = express.Router()
const {attachmentSchema}=require("./../schemas/attachment.schema")
const mongoose = require("mongoose")
const { insertTicket ,getTickets,insertFileNameMongo} =require( "../model/ticket/ticket.model")
const {upload,bucket,fs,path} = require("../model/ticket/insertImgintoGCP")
router.all("/",(req,res,next)=>{})
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

        const existingTicket = await Ticket.findOne({ ticket_id });
             
            const Attachment = mongoose.model('tickets', attachmentSchema)
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



module.exports = router