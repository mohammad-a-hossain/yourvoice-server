
const Module = require('module')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookyParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
 require('dotenv').config()
//importing routes
//const entryRoutes=require('./routes/entry')
const authRoute  = require('./routes/authRoute')
const userRoute  = require('./routes/user')
const categoryRoute= require('./routes/categoryRoute')
const tagsRoute = require('./routes/tagsRoute')
const blogRoute = require('./routes/blogRoute')
const formRoute = require('./routes/Form')

// scaffolding app application
 const app = express()


 mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('db connected'))


 //middlewears
 app.use(express.json())
 app.use(cors());
 app.use(morgan('dev'))
 app.use(bodyParser.json())
 app.use(cookyParser())
 

 // cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//  if(process.env.NODE_ENV==='development'){
//       app.use(cors({origin:`${process.env.CLIENT_URL}`}))
//  }

 // routes middleweare implement
 //app.use('/api',entryRoutes)
 app.use('/api',authRoute)
 app.use('/api',userRoute)
 app.use('/api',categoryRoute)
 app.use('/api',tagsRoute)
 app.use('/api',blogRoute)
 app.use('/api',formRoute)
 // port
 const PORT= process.env.PORT || 8080
 
 app.listen(PORT,()=>{
     console.log(`server is running on ${PORT}`)
 })

//  "mongodb+srv://abusen:abusen123@cluster0.95z2h.mongodb.net/mernblog?retryWrites=true&w=majority";