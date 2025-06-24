const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mohit11772004@gmail.com",
        pass:"urcj tagt pbxg tmit"
    }
})

async function mailSend(to,subject,html) {
    const options = {
        from: 'mohit11772004@gmail.com',
        to: to,
        subject: subject,
        html:html
    }
    await transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

module.exports = mailSend;