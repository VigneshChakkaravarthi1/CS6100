const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const port = process.env.PORT || 3001
const morgan = require("morgan")



app.use(helmet())


app.use(cors())

app.use(morgan("tiny"))
const ticketRouter = require("./src/routers/ticket.router")


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.listen(port,()=>{
    console.log("API is running on http://localhost:"+port)
})


const userRouter = require("./src/routers/user.router")
app.use("/user",userRouter)
app.use("/tickets",ticketRouter)

const handleError = require("./src/utils/errorHandler")
app.use("*",(req,res,next)=>{
    const error = new Error("Resources not found!")
    error.status = 404
    next(error)
})

app.use((req,res,next)=>{
handleError(error,res)
})