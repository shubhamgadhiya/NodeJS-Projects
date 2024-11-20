const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
});

const loginSendMail = async (email) => {
        
    console.log('email',email )
    try{
     
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Login Sucessfull`,
            html: ` <div style="margin-top: 50px;">
            <tr>
               <td color: #161c2d; font-size: 18px; font-weight: 600;">
                  User login successful with email: ${email},
               </td>
           </tr> 
</div>`,
        }
                
        console.log('mailOptions',mailOptions )
       await transporter.sendMail(mailOptions);
       return "Mail sent successfully";
    }catch(error){
        console.error("Mail sending error:", error);
        throw new Error("Failed to send mail. Please try again later.");
        }
}

module.exports = {loginSendMail};