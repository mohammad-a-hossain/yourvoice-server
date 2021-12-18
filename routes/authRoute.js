

const express = require('express')
const router = express.Router()
const {signup,
       signin,
       signout,
      requireSignin,
      forgetPassword,
      resetPassword,
      preSignin,
      googleLogin
    } =require('../controllers/authController')


const {runValidation}= require('../validator')
//const {userSignupValidator}= require('../validator/authValidator')

const {userSigninValidator,
    userSignupValidator,
    forgetPasswordValidator,
    reserPasswordValidator
}= require('../validator/authValidator')

router.post('/signup',signup)
router.post('/pre-signin',userSignupValidator,runValidation,preSignin)
router.post('/signin',userSigninValidator,runValidation,signin)
router.get('/signout',signout)

// for forget password
router.put('/forget-password',forgetPasswordValidator, runValidation,forgetPassword)
router.put('/reset-password',reserPasswordValidator, runValidation,resetPassword)

router.post('/google-login',googleLogin)
//test
/* router.get('/secret',requireSignout,(req,res)=>{
    res.json({
        message:'you have access to secret page'
    })
}) */
router.get('/profile',requireSignin,(req,res)=>{
    res.json({
        user:req.user
    })
})


module.exports = router