

const mongoose = require('mongoose')
const slug = require('slugify')
const Schema = mongoose.Schema()

const tagsSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength:12
    },
    slug:{
        type:String,
        index:true,
        unique:true
    }
},{timestamps:true})

module.exports = mongoose.model('Tag',tagsSchema)