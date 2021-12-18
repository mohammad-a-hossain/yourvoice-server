const {check} = require('express-validator')

exports.categoryValidator =[
    
        check('name')
        .not()
        .isEmpty()
        .withMessage('category name is required')
        .isLength({max:20})
        .withMessage('category name length is max 20 char')
    
]
