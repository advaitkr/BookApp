const Book = require("../Model/Book");
const express = require('express')
const router = express.Router()
router.get('/',async(req,res)=>{
    try{
        const book= await Book.find()
        res.json(book)
    }
    catch(err){
        console.log("error")
        res.send('Error' + err)
    }
})
router.post('/',async(req,res)=>{
    const book = new Book({
        name:req.body.name,
        author:req.body.author,
        description:req.body.description,
        price:req.body.price,
        available:req.body.available
    })

    try{
        const a1 = await book.save();
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const book = await Book.findById(req.params.id)
        res.json(book)
    }
    catch(err){
        res.send('Error' + err)
    }
})
router.get("/author/:author",async(req,res)=>{
    try{
        //res.json(req.params.author)
        const book = await Book.findOne({author:req.params.author})
         res.json(book)
    }
    catch(error){
         res.status(404).json(error)
    }
})
router.get("/name/:name",async(req,res)=>{
    try{
        //res.json(req.params.author)
        const book = await Book.findOne({name:req.params.name})
         res.json(book)
    }
    catch(error){
         res.status(404).json(error)
    }
})
router.get("/search/:prop",async(req,res)=>{
    
    try{
       const book = await Book.find(
           {

               "$or":[
                   {
                       "name":{$regex:req.params.prop}
                   },
                   {
                       "author":{$regex:req.params.prop}
                   }
               ]
                
           }
       )
       res.json(book)
    }catch(error){
        res.status(404).json(error)
    }
})
router.patch('/',async(req,res)=>{
    const book = new Book({
        name:req.body.name,
        author:req.body.author,
        description:req.body.description,
        price:req.body.price,
        available:req.body.available
    })

    try{
        const a1 = await book.save();
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})
router.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    let book;
      try{
        book = await Book.findByIdAndRemove(id);
        res.json(book)
      }
      catch(error){
           res.status(404).json(error)
      }
})
module.exports = router