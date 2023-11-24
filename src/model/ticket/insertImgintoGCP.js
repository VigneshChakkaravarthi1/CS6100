const multer =require( 'multer');
const path =require( 'path');
const fs =require( 'fs');
const { Storage } =require( '@google-cloud/storage');
const storage = new Storage({
    projectId: 'ultra-guard-406016',
    keyFilename:'C:\\Users\\Windows\\Desktop\\server-backend\\CS6100\\gcp_credentials.json' ,
    });
const bucket = storage.bucket('pic__bucket');

const upload = multer({
        storage: multer.memoryStorage(),
        });


module.exports={upload,bucket,fs,path}
