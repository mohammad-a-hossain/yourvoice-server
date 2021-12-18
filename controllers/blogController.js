//import { stripHtml } from "string-strip-html";
const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tags');
const User = require('../models/user')
const formidable = require('formidable');
const slugify = require('slugify');
//const stripHtml = require('string-strip-html');
const {smartTrim} = require('../helper/blog-helpers')
const _ = require('lodash');
const { errorHandler } = require('../helper/db_error_helper');
const fs = require('fs');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }

        const { title, body, categories, tags } = fields;
        console.log(title,categories)

        if (!title || !title.length) {
            return res.status(400).json({
                error: 'title is required'
            });
        }

        if (!body || body.length < 200) {
            return res.status(400).json({
                error: 'Content is too short'
            });
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            });
        }

        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            });
        }

        let blog = new Blog();
        blog.title = title;
        blog.body = body;
        blog.excerpt = smartTrim(body, 220, '','....')
        blog.slug = slugify(title).toLowerCase();
        blog.mtitle = `${title}`;
        blog.mdescription = body.substring(0, 160);
        blog.postedBy = req.user._id;
        // categories and tags
        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }

        blog.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            // res.json(result);
            Blog.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    } else {
                        Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
                            (err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: errorHandler(err)
                                    });
                                } else {
                                    res.json(result);
                                }
                            }
                        );
                    }
                }
           );
        });
    });
};
   
exports.list=(req,res)=>{

  Blog.find({})
 .populate('categories','_id name slug')
 .populate('tags','_id name slug')
 .populate('postedBy','_id name username')
 .select('_id title slug tags categories excerpt createdAt updatedAt')
 .exec((err, data)=>{
     if(err){
         return res.json({
             error:errorHandler(err)
         })
     }else{
         res.json({
             blogs:data
         })
     }
 })
}
exports.listAllBlogCatTags =(req,res)=>{
    let limit = req.body.limit ? parseInt(req.body.limit) : 3;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let blogs;
    let categories;
    let tags;

    Blog.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
  

    .exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        blogs = data;

        Category.find({}).exec((err, c) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
        categories = c 

        Tag.find({}).exec((err, t) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            tags = t;
            res.json({blogs,
                    categories,
                    tags,
                    size:blogs.length
                })
        })
    })
})
}

exports.read =(req,res)=>{
    const slug = req.params.slug.toLowerCase()

    Blog.findOne({slug})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select('_id title body mtitle mdescription slug categories tags postedBy createdAt updatedAt')
    .exec((err,data)=>{
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json(data)
    })



}
exports.remove=(req,res)=>{
    const slug = req.params.slug.toLowerCase()
    Blog.findOneAndRemove({slug}).exec((err,data)=>{
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json({
            message:'a blog has been deleted success'
        })
    })

}
exports.updata=(req,res)=>{
    const slug = req.params.slug.toLowerCase()
     //finding blog and get new var oldblog
     Blog.findOne({slug}).exec((err,oldBlog)=>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        let form = new formidable.IncomingForm(); 
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }
    

             //get previouseblog its slug before merging 
            let oldBlogbeforMerge = oldBlog.slug
             // _.merge( object, sources ) it take two parameter
             // then get the oldblog by merging the existing blog and new fileds
            oldBlog = _.merge(oldBlog,fields) 
            // now switching the oldblog its slug to before merging data
            oldBlog.slug = oldBlogbeforMerge

            const { title, body, categories, tags } = fields;

    
            if (body) {
                oldBlog.excerpt =smartTrim(body, 320,'','....')
                oldBlog.mdescription = body.substring(0,120)
            }
    
            if (categories) {
                oldBlog.categories= categories.split(',')
            }
    
          
            if (tags) {
                oldBlog.tags = tags.split(',')
            }
    
            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    });
                }
                oldBlog.photo.data = fs.readFileSync(files.photo.path);
                oldBlog.photo.contentType = files.photo.type;
            }
    
            oldBlog.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                 res.json(result);
                
            });
        });
     })

}

exports.photo=(req,res)=>{
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug})
    .select('photo')
    .exec((err,blog)=>{
        if(err || !blog){
            return res.status(400).json({
                error: errorHandler(err)

            })
        }
        res.set('Content-Type', blog.photo.contentType);
        return res.send(blog.photo.data);
    })
}
exports.listRelatedBlog=(req,res)=>{
    //console.log(req.body.blog)
    let limit = req.body.limit ? parseInt(req.body.limit):3
    const { _id,categories }= req.body.blog 

    Blog.find({ _id: { $ne:_id },categories:{ $in:categories } })
    .limit(limit)
    .populate('postedBy',' _id name username profile')
    .select('title slug excerpt postedBy createdAt updatedAt')
    .exec((err,blogs)=>{
        if(err){
            return res.status(400).json({
                error:'blog not found'
            })
        }
        res.json(blogs)
    })
}
exports.searchBlog= (req,res)=>{
    try{
        const { search } = req.query;
        if (search) {
             Blog.find(
                {$or: [{ title: { $regex: search, $options: 'i' } }, { body: { $regex: search, $options: 'i' } }]},
                (error, blogs) => {
                    if (error) {
                        return res.status(400).json({
                            error: errorHandler(error)
                        });
                    }
                    res.json(blogs);
                }
            ).select('-photo -body');
        }
    }catch(error){
        console.error(error.message);
        res.status(500).send("Sever Error");
    }
}
exports.listSearch = (req, res) => {
    console.log(req.query);
    const { search } = req.query;
    if (search) {
        Blog.find(
            {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                 { body: { $regex: search, $options: 'i' } }]
            },
          
            (err, blogs) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(blogs);
            }
        ).select('-photo -body');
    }
};

exports.listBlogByUser=(req,res)=>{
    User.findOne({username:req.params.username}).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        let userId= user._id 
        Blog.find({postedBy:userId})
        .populate('categories','_id name slug')
        .populate('tags','_id name slug')
        .populate('postedBy','_id name username')
        .select('_id title slug createdAt postedBy updatedAt')
        .exec((err,data)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(data)
        })
    })
}