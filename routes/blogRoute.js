
const express = require('express');
const router = express.Router();
const { create,list,
    listAllBlogCatTags,
    read,
    remove,
    updata,
    photo,
    listRelatedBlog,
    listSearch,
    listBlogByUser } = require('../controllers/blogController');

// validators

const { requireSignin, adminMiddleware,authMiddleware,canUpdateAndDelete } = require('../controllers/authController');

router.get('/blogs/search', listSearch )
router.post('/blog', requireSignin, adminMiddleware, create);
router.get('/blogs', list);
router.post('/blogCatTag',listAllBlogCatTags);
router.get('/blog/:slug',read);
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove);
router.put('/blog/:slug', requireSignin, adminMiddleware, updata); 
router.get('/blog/photo/:slug',photo)
router.post('/blog/relatedBlog',listRelatedBlog)

// routes for auth user 
router.post('/user/blog', requireSignin, authMiddleware, create);
router.delete('/user/blog/:slug', requireSignin, authMiddleware ,canUpdateAndDelete, remove);
router.put('/user/blog/:slug', requireSignin, authMiddleware ,canUpdateAndDelete, updata); 

// router for auth user created listblog
router.get('/:username/blogs', listBlogByUser);



module.exports = router;