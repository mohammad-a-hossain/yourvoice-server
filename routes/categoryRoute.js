
const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controllers/categoryController');

// validators
const { runValidation } = require('../validator');
const { categoryValidator } = require('../validator/categoryValidator');
const { requireSignin, adminMiddleware } = require('../controllers/authController');

router.post('/category', categoryValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;


/* const express = require('express')
const router =  express.Router()

const {create,list,read,remove} = require('../controllers/categoryController')

const {runValidation}= require('../validator')
const {categoryValidator} = require('../validator/categoryValidator')

const {requireSignin, adminMiddleware } =require('../controllers/authController')



router.post('/category',categoryValidator, runValidation,requireSignin,adminMiddleware ,create)
router.get('/categories',list)
router.get('/category/:slug',read)
router.delete('/category/:slug',categoryValidator, runValidation,requireSignin,adminMiddleware ,remove)

module.exports = router 
 */