const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken')
const expressJwt= require('express-jwt')


exports.signup = (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'      
            }); 
        }
        
        const { name, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({ name, email, password, profile, username });
        newUser.save((err, success) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: err
                });
            }
             
            // res.json({
            //     user: success
            // });
            res.json({
                message: 'Signup success! Please signin.'
            });
        });
    });
};
exports.signin =(req,res)=>{
    const {email,password} = req.body
    //if user exist
    User.findOne({ email: req.body.email }).exec((err, user) => {
   /*  User.findOne({email}).exec((err,user)=>{ */
        if(err || !user){
            return res.status(400).json({
                error:"user email is not exist ! pls try again"
            })     
        }
            // then authenticate
            if(!user.authenticate(password)){
                return res.status(400).json({
                    error:'email or password does not match'
                })
            }
              // then generate a json web token and send to client

              const token =jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:'1d'})
              res.cookie('token',token,{expiresIn:'1d'})
              const { _id,name,username,email,role}= user
              return res.json({
                  token,
                  user: { _id, username, name, email, role }
              })
    })
   


  

    }
    exports.signout=(req,res)=>{
       res.clearCookie('token')
       res.json({
           message:'signout success'
       })
    }
    // exports.requireSignout= expressJwt({
    //     secret: process.env.JWT_SECRET,
    //     algorithms: ["HS256"],
    // })
    exports.requireSignin = expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"], // added later
        // userProperty: "auth",
      });

   /*    exports.authMiddleware = (req, res, next) => {
        const authUserId = req.auth._id;
        User.findById({ _id: authUserId }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }
            req.profile = user;
            next();
        });
    }; */
     
    exports.authMiddleware = (req,res,next) => {
        const authUserId = req.user._id
        User.findById({ _id: authUserId}).exec( (err, user) => {
            if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
            }
            req.profile = user
            next()
        
        } )
        
}
    
    
    
   exports.adminMiddleweare =(req,res)=>{
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });
   }