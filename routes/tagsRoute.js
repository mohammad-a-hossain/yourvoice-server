
const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controllers/tagsController');

// validators
const { runValidation } = require('../validator');
const { tagsValidator } = require('../validator/tagsValidator');
const { requireSignin, adminMiddleware } = require('../controllers/authController');

router.post('/tag', tagsValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
