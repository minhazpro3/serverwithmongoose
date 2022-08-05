const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const todoSchema = require("../schemas/todoSchemas")
const Todo = new mongoose.model("Todo", todoSchema)


// GET ALL THE TODO
router.get("/", async (req,res)=>{
      const result =  await Todo.find({})
        res.status(200).json(result)
})

// GET A TODO BY ID
router.get("/:id", async (req,res)=>{

})

// POST TODO
router.post("/", async (req,res)=>{
    const newTodo = new Todo(req.body)
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server Error"})
        }
        else{
            res.status(200).json({
                message:"Todo was success"})
        }
    })
})

// POST MULTIPLE TODO
router.post("/all", async (req,res)=>{
    const manyTodo = req.body;
        await Todo.insertMany(manyTodo, (err)=>{
            if(err){
                res.status(500).json({
                    error:"There was a server Error"})
            }
            else{
                res.status(200).json({
                    message:"Todos ware success"})
            }
        })
})

// PUT TODO
router.put('/:id', async (req,res)=>{
    await Todo.updateOne(
        {_id:req.params.id},
        {
        $set:{
            title:"Minhaz Via  tumi koi"
        }
    },
    )
    res.status(200).json({
        message:"Todos ware updated success"})

})

// DELETE TODO
router.delete("/:id", async (req,res)=>{
    await Todo.deleteOne(
        {_id:req.params.id} )
    res.status(200).json({
        message:"Todos ware deleted success"})
})

module.exports = router