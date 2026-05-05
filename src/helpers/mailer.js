import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: { verifyToken: hashedToken, verifyTokenExpiry: new Date(Date.now() + 3600000) }
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: new Date(Date.now() + 3600000) }
            })
        }

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your Email" : "Reset your Email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailresponse = await transport.sendMail(mailOptions)
        return mailresponse

    } catch (error) {
        throw new Error(error.message)
    }
}