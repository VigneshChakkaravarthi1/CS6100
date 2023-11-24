const express = require("express") 
const multer=require('multer');
const path =require( 'path')
const fs=require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
destination: function (req, file, cb) {
const uploadDir = 'C:\\Users\\Windows\\Desktop\\Selenium Notes';
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir);
}
cb(null, uploadDir);
},
filename: function (req, file, cb) {
const ext = path.extname(file.originalname);
cb(null, Date.now() + ext);
},
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
res.send('Image uploaded successfully!');
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});