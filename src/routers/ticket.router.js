const express = require("express")
const router = express.Router()
const { getUserByEmail }=require("../model/user/user.model")
const { insertTicket } =require( "../model/ticket/ticket.model")
const {upload,bucket,fs,path} = require("../model/ticket/insertImgintoGCP")

router.all("/",(req,res,next)=>{
    
})
router.post("/create-ticket",upload.single('file'),async(request,response)=>{
    const {user_id,subject,description}=request.body
    try{

        const file = request.file;
        const fileName = Date.now() + path.extname(file.originalname);
        const fileBuffer = file.buffer;
        const gcsFile = bucket.file(fileName);
        const stream = gcsFile.createWriteStream({ metadata: {contentType: file.mimetype,},resumable: false,});
        stream.end(fileBuffer);
        response.send('Image uploaded successfully!');


    }
    catch(error)
    {
        console.error('Error uploading image to GCS:', error);
        response.json({status:"error"})

    }

    
    
})

module.exports = router