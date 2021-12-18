const {check} =require('express-validator')

exports.tagsValidator=[
    check('name')
    .not()
    .isEmpty()
    .withMessage('tags name is required')
    .isLength({max:10}).withMessage('name max 10 chars')

]