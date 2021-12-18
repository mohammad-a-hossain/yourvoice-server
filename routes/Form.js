
const express = require('express');
const router = express.Router();
const { contactForm,contactBlogAuthorForm } = require('../controllers/contactForm');

// validators
const { runValidation } = require('../validator');
const { contactFormValidator} = require('../validator/Form');

router.post('/contact',  contactFormValidator, runValidation,contactForm);
router.post('/blog-authors',contactFormValidator, runValidation,contactBlogAuthorForm)

module.exports = router;