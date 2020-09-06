const express = require('express');
const router = express.Router();
const Todo = require("../models/Todos")

//Getting all Todos

router.get('/', async (req,res) =>{
    // Todo.find()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     message: err
    // })
    try{
       const todos = await Todo.find()
       .sort({ date: -1 })
       res.status(200).json(todos)
    }
    catch(err){
      res.status(400).json({message: err})
    }
})

// Posting a todo

router.post('/',async (req,res) =>{
    const todo = new Todo({
        name: req.body.name
    })
    // todo.save()
    // .then(data => {
    //     res.status(200).json(todo)
    // })
    // .catch(err => {
    //     message: err
    // })
    try{
        const savedTodo = await todo.save()
        res.status(200).json(savedTodo)
    }
    catch(err){
        res.status(400).json({ message: err })
    }
})

//Specific Todo

// router.get('/:id', async (req,res) =>{
//     try{
//     const todo = await Todo.findById(req.params.id)
//     res.status(200).json(todo)
//     }
//     catch(err){
//       res.status(400).json({
//           message: err
//       })
//     }
// })

//Delete Todo

router.delete("/:id",async (req,res) => {
    try{
    const removedTodo = await Todo.deleteOne({_id: req.params.id})
    res.status(200).json(removedTodo)
    }
    catch(err){
        res.status(400).json({
            message: err
        })
      }
})

// Update Todo

router.patch('/:id', async (req,res) => {
    try{
        const updatedTodo = await Todo.updateOne(
            { _id: req.params.id},
            { $set : {isCompleted : req.body.isCompleted}
        })
        res.status(200).json(updatedTodo)
    }
    catch(err){
        res.status(400).json({
            message: err
        })
    }
})

module.exports = router;