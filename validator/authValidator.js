
const { check } = require('express-validator');

exports.userSignupValidator=[
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('password must be 6 char')


]
exports.userSigninValidator=[
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('password must be 6 char')


]

exports.forgetPasswordValidator=[
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('valid email is required'),
   

]

exports.reserPasswordValidator =[
    check('newPassword')
    .not()
    .isEmpty()
    .isLength({min:6})
    .withMessage('password must be 6 char')


]