

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema 

const blogSchema = new mongoose.Schema({
     title:{
         type:String,
         trim:true,
         index:true,
         required:true
     },
     slug:{
       type:String,
       unique:true,
       index:true
     },
     body:{
       type:{},
       required:true,
       min: 200,
      max: 2000000
     
     },
     excerpt:{
       type:String,
       max:200 
     },
     mtitle:{
       type:String
     },
     mdescription:{
       type:String
     },
     photo:{
      data:Buffer,
      contentType:String
     },
     categories:[{type:ObjectId,ref:'Category',required:true}],
     tags:[{type:ObjectId,ref:'Tag',required:true}],
     postedBy:{
       type:ObjectId,
       ref:'User'
     },


},{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)