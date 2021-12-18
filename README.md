# server side of yourvoice
## installing  process
*** after frontend work ***
### rules
1. setting profile route and authentication
2. one is authenticated user and one is for admin
3. we will protect all rout for admin and users 
- set requiresignin middleweare in route and controller
- creatig middleware in controller AUTHMIDDLE WEAR and ADMINMIDDLE WEAR
- create READ FILE in constroller for taking user profile
- create a user route in route and implement profile route
- create a user controller and set in server.js as route name as userRoute
- set admin and user controller route and role to access
*** after backend work ***
- create a folder user and admin in pages
- set authpage to signup and set redirect admin and user page
*** creating category ***
- first make categoryScheme in models
- then make the validator of category
- then make route category and create controller
- then set server.js categoryRoute and use
- now make crud category and set route and controller 
*** tags ***
- make tags models router controller and validator and set for implemented
*** npprogess set to frontend ***
- install yarn add npprogess
*** ->afet displaying tags and category in frontend ***
*** blog schema and model ***
- make a file in model folder name blog.js using objectId excerpt
- then make blog route and controller --> here use the formData ->  install formidable 
- install npm i  for  Used mainly in automated setups. It ensures non-spaces are not trimmed from the outer edges of a string.
- escaped string-strip-html for getting error and decided to use in frontend
- test in postman to send formData blog data with photo 
- this is end of blog module backend 
- now doing frontend blog create 
*** after frontend creating a blog insert to db ***
- now go to blog route set all getting single blog and all blog  with categories and tags
- get all blog list and test in POSTMAN
- get all blogtagcat and test postman
- reade and delete blog controller and route
- then get the blog update controller and route and test by   POSTMAN
- then make a photo router and controller and test in Postman
--- now display the blogs in frontend---
*** after make display of single blog page now make router and controller for related blog ***
- make blogRelated route and make it post request
- then goto frontend action page and make logic for related page

*** before search implement frontend ***
- create a search router and a searchBlog controller 
- make implement in component blog to frontend
*** now implement user backend ***
- first go to user router and set user and username params 
- then goto controller for user controller logic 
1. now worked for user profile
- make route user and user/username user/update 
- then make controller of update and photo content for update
- then goto frontend for make action page a responseHandler then use it in create blog,removeblog,update blog before get response json
also use in category tags user when authenticate by token
- then goto pages-> singin page and bring the router and show the flash message for redirect message
--- end of JwT ---
## discus section implement
- make a file name DisqusThread.js
- install prop-types in frontend 
- 
*** after front end work for email sender sendgrid***
- goto router make two route 1 for contact form and 2 for blog-author
- along with controller ( contactForm,contactBlogAuthorForm )
- then goto front end for make contact form
*** forgot password and reset password ***
- go to validator create a forgetPasswordValidator 
also reset passwordValidator in authValidator folder
- to handle the end point make two router in authrouter folder
- then make forgetPassword and resetPassword controller logic and implement it and test by post man
- then goto frontend and make form for reset password and forget 
*** reset password ***
- goto pages folder to auth/password make a folder reset 
- then install in backend npm/ yarn  i google-auth-library
- then import it in controller as OAuth2Client as in backend 
- then set all logic for googlesignin
- then goto actin in frontend in auth.js
- then make a endpoint to loginWithGoogle
- then make a googlelogin.js page in component authpage folder
- then get render code from (https://www.npmjs.com/package/react-google-login)
- then insatall react-google-login in frontend and import it in googleLogin.js page 
  - then make a page googleLogin in component authPage 
 - implement the googlelogin page in  signup page 
 - now grab the jwt object credintials from google credintial and merge with user 
--- end of project-----

