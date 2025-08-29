import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
    try {
        // Create a Transporter to send emails
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: `"Study AI" <${process.env.EMAIL_USER}>`, // sender address
            to: email,
            subject: title,
            html: body,
        });
        console.log("Email info: ", info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};

export default mailSender;
