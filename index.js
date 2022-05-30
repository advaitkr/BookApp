const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/Book'
const app = express()
app.use(express.json())
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection
con.on('open',function(){
    console.log('connected');
})
const bookRouter = require('./Routes/book_routes')
app.use("/books",bookRouter)
app.listen(9000,()=>{
    console.log('Server started')
})