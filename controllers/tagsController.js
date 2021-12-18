const Tag = require('../models/tags');
const Blog =require('../models/blog')
const slugify = require('slugify');
const { errorHandler } = require('../helper/db_error_helper');

exports.create = (req, res) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    let tag = new Tag({ name, slug });

    tag.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.list = (req, res) => {
    Tag.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    
    Tag.findOne({ slug }).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'Tag not found'
            });
        }
       // res.json(tag);

       Blog.find({tags:tag})
       .populate('tags','_id name slug')
       .populate('categories','_id name slug')
       .populate('postedBy','_id name')
       .select('_id title slug excerpt categories tags postedBy updatedAt createdAt ')
       .exec((err, data)=>{
          if (err) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }
          res.json({tag:tag, blogs:data})
       })
      });

     
}

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Tag.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'tag deleted successfully'
        });
    });
};