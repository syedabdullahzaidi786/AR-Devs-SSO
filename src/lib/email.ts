import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendWelcomeEmail = async ({
    email,
    name,
    appName = "AR Developers Auth",
}: {
    email: string;
    name?: string | null;
    appName?: string;
}) => {
    const timestamp = new Date().toLocaleString();
    const subject = `Welcome to ${appName} – Login Successful`;
    const text = `Hi ${name || "there"},\n\nWelcome to ${appName}! You have successfully logged in at ${timestamp}.\n\nBest regards,\nThe ${appName} Team`;
    const html = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Welcome to ${appName}!</h2>
            <p>Hi <strong>${name || "there"}</strong>,</p>
            <p>You have successfully logged in at <code>${timestamp}</code>.</p>
            <p>Best regards,<br/>The ${appName} Team</p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject,
            text,
            html,
        });
        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
};
