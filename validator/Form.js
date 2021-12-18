const {check} = require('express-validator')

exports.contactFormValidator =[
    
        check('name')
        .not()
        .isEmpty()
        .withMessage('name is required'),
        check('email')
        .isEmail()
        .withMessage('email must be a valid address'),
        check('message')
        .not()
        .isEmpty()
        .isLength({min:20})
        .withMessage('message must be 20 char')
    
]
