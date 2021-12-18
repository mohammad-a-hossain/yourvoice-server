
const sgMail = require('@sendgrid/mail')
const SENDGRID_API_KEY='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'

sgMail.setApiKey(SENDGRID_API_KEY)

const EMAIL_TO= 'abusen50@gmail.com'

exports.contactForm = (req,res)=>{
        //const data= req.body 
        const { email, name, message } = req.body;
        //console.log(data)
const emailData = {
          to:EMAIL_TO,
        from: email,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://yourvoice.com</p>`
    }

        sgMail.send(emailData).then(()=>{
            return res.json({
                success: true
            })
        })
        .catch((error) => {
            console.error(error)
        })
}

exports.contactBlogAuthorForm = (req, res) => {
    const { authorEmail, email, name, message } = req.body;
    // console.log(req.body);

    let maillist = [authorEmail, process.env.EMAIL_TO];

    const emailData = {
        to: maillist,
        from: email,
        subject: `Someone messaged you from ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Message received from:</h4>
            <p>name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `
    };

    sgMail.send(emailData).then(sent => {
        return res.json({
            success: true
        });
    });
};










// sgMail.setApiKey(process.env.SENDGRID_API_KEY )


// exports.contactForm = (req,res)=>{
//     //const data= req.body 
//     const { email, name, message } = req.body;
//     //console.log(data)

//    const emailData = {
//     to: 'abusen50@gmail.com',
//     from: req.body.email,
//     subject: `Contact form - ${process.env.APP_NAME}`,
//     text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
//     html: `
//         <h4>Email received from contact form:</h4>
//         <p>Sender name: ${name}</p>
//         <p>Sender email: ${email}</p>
//         <p>Sender message: ${message}</p>
//         <hr />
//         <p>This email may contain sensetive information</p>
//         <p>https://yourvoice.com</p>`
// }
    

//     sgMail.send(emailData).then(sent => {
//         return res.json({
//             success: true
//         })
//         .catch((error) => {
//             console.log(error.response.body)
//          })
//     });


// }