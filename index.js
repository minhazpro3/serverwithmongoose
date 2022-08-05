const express = require('express')
const mongoose = require("mongoose")
require("dotenv").config()
const todoHandler = require("./routeHandler/todoHandler")


// express app initialize
const app = express()
app.use(express.json());
const port =  process.env.PORT || 6000


// database connecting with mongodb
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z45ex.mongodb.net/todos?retryWrites=true&w=majority`,{ 
  useNewUrlParser: true,
useUnifiedTopology: true
} )
.then(()=>console.log("connection success"))
.catch(err =>console.log(err))

// application routes
app.use("/todo", todoHandler)

app.get("/", (req,res)=>{
  res.send("done")
})



app.use((req,res,next)=>{
  res.status(404).send("Url Not Found")
})

app.use((err,req,res,next)=>{
  if(err.message){
    res.status(500).json(err.message)
  }
  else{
    res.status(500).json("there was an error")
  }
})




//   Error handling synchronous
//   app.use((req,res,next)=>{
//    next("Requested Url Not Found")
//   })
//   app.use((err,req,res,next)=>{
//     if(res.headersSent){
//         next("there was aaaaaaaaaaaaaaaaaaaaaa problem ")
//     }
//     else{
//         if(err.message){
//             res.status(500).send(err.message)
//         }

    
//     else{
//         res.status(500).send("There was an error")
//     }
// }
//   })



//   Error handling asynchronous
// app.get("/", (req,res,next)=>{
//   fs.readFile("/file-read-no-do", (err,data)=>{
//     if(err){
//       next(err)
//     }
//     else {
//       res.send(data)
//     }
//   })
// })



// default error handling
// function errorHandler(err, req, res, next){
//   if(res.headersSent){
//     return next(err)
//   }
//     res.status(500).send({error:err})
  
// }





  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
