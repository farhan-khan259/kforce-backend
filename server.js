// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');


// const app = express();

// // Middleware
// app.use(cors({
//     origin: [
//         'https://k-forcemethod.com',
//         'https://www.k-forcemethod.com',
//         'https://kforce-frontend.onrender.com',
//         'https://kforce-backend.onrender.com',
//         'https://www.kforce-backend.onrender.com',
//         'http://localhost:5500',
//         'http://127.0.0.1:5500'
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Handle preflight requests
// app.options('*', cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Create transporter using environment variables
// const createTransporter = () => {
//     return nodemailer.createTransport({
//         host: process.env.SMTP_HOST || 'smtp.gmail.com',
//         port: parseInt(process.env.SMTP_PORT) || 587,
//         secure: process.env.SMTP_SECURE === 'true',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });
// };

// // Health check endpoint
// app.get('/health', (req, res) => {
//     res.json({
//         status: 'OK',
//         service: 'Functional Athletic Email API',
//         timestamp: new Date().toISOString(),
//         environment: process.env.NODE_ENV || 'development',
//         version: '1.0.0'
//     });
// });

// // Send exercises email endpoint
// app.post('/send-exercises', async (req, res) => {
//     console.log('📨 Received email request:', {
//         name: req.body.name,
//         email: req.body.email,
//         timestamp: new Date().toISOString()
//     });

//     try {
//         const { name, email } = req.body;

//         // Input validation
//         if (!name || !email) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Name and email are required'
//             });
//         }

//         // Email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid email format'
//             });
//         }

//         // Create transporter
//         const transporter = createTransporter();

//         // Email content
//         const mailOptions = {
//             from: `"Functional Athletic" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: '🎯 Your Free Functional Training Program - K-Force Method',
//             html: `
//                 <!DOCTYPE html>
//                 <html>
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Your Training Program</title>
//                 </head>
//                 <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
//                     <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
//                         <div style="background: linear-gradient(135deg, #1c1917 0%, #2d1e10 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
//                             <h1 style="margin: 0; font-size: 24px;">FUNCTIONAL <span style="color: #ea580c;">ATHLETIC</span></h1>
//                             <h2 style="margin: 10px 0 0 0;">Your Training Program is Ready!</h2>
//                         </div>

//                         <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px;">
//                             <h2>Hi ${name},</h2>

//                             <p>Thank you for requesting the <strong>Free Functional Training Program</strong>! Your 1-Day Full Body Program is ready.</p>

//                             <div style="text-align: center; margin: 30px 0;">
//                                 <a href="https://k-forcemethod.com/exercises.html" 
//                                    style="background: linear-gradient(180deg, #ff6a00 0%, #ea580c 100%); 
//                                           color: white; 
//                                           padding: 16px 32px; 
//                                           text-decoration: none; 
//                                           border-radius: 8px; 
//                                           font-weight: bold;
//                                           display: inline-block;
//                                           box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3);">
//                                     🎯 ACCESS YOUR EXERCISES NOW
//                                 </a>
//                             </div>

//                             <p><strong>Program includes:</strong></p>
//                             <ul>
//                                 <li>9 powerful exercises with video demonstrations</li>
//                                 <li>Complete 1-day full body workout</li>
//                                 <li>Proper breathing techniques</li>
//                                 <li>Sets and reps guidance</li>
//                             </ul>

//                             <p>If the button doesn't work, copy and paste this link:</p>
//                             <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all; font-family: monospace;">
//                                 https://k-forcemethod.com/exercises.html
//                             </div>

//                             <p style="margin-top: 30px;">Best regards,<br>
//                             <strong>The Functional Athletic Team</strong></p>
//                         </div>
//                     </div>
//                 </body>
//                 </html>
//             `,
//             text: `Hi ${name},\n\nThank you for requesting the Free Functional Training Program!\n\nYour 1-Day Full Body Program is ready. Click the link below to access it:\n\nhttps://k-forcemethod.com/exercises.html\n\nProgram includes:\n- 9 powerful exercises\n- Complete workout plan\n- Video demonstrations\n- Breathing techniques\n\nBest regards,\nFunctional Athletic Team`
//         };

//         // Send email
//         const info = await transporter.sendMail(mailOptions);
//         console.log('✅ Email sent successfully:', info.messageId);

//         res.json({
//             success: true,
//             message: 'Email sent successfully! Check your inbox.',
//             messageId: info.messageId
//         });

//     } catch (error) {
//         console.error('❌ Error sending email:', error.message);

//         let errorMessage = 'Failed to send email. Please try again.';
//         if (error.code === 'EAUTH') {
//             errorMessage = 'Email authentication failed. Please contact support.';
//         } else if (error.code === 'ECONNECTION') {
//             errorMessage = 'Cannot connect to email server. Please try again later.';
//         }

//         res.status(500).json({
//             success: false,
//             message: errorMessage,
//             error: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// });

// // Welcome page
// app.get('/', (req, res) => {
//     res.send(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <title>Functional Athletic Email API</title>
//             <style>
//                 body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
//                 .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//                 h1 { color: #ea580c; }
//                 .endpoint { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
//                 code { background: #e9ecef; padding: 2px 5px; border-radius: 3px; }
//                 .btn { background: #ea580c; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <h1>📧 Functional Athletic Email API</h1>
//                 <p>Server is running successfully!</p>

//                 <h2>📋 Endpoints</h2>
//                 <div class="endpoint">
//                     <strong>GET /health</strong> - Health check<br>
//                     <a href="/health" target="_blank">Test Now</a>
//                 </div>

//                 <div class="endpoint">
//                     <strong>POST /send-exercises</strong> - Send training program email<br>
//                     <small>Body: { "name": "John", "email": "user@example.com" }</small>
//                 </div>

//                 <h2>🧪 Test Email Sending</h2>
//                 <form id="testForm">
//                     <input type="text" id="name" placeholder="Your Name" required style="padding: 10px; margin: 5px; width: 200px;"><br>
//                     <input type="email" id="email" placeholder="Your Email" required style="padding: 10px; margin: 5px; width: 200px;"><br>
//                     <button type="submit" class="btn">Send Test Email</button>
//                 </form>
//                 <div id="result" style="margin-top: 20px;"></div>

//                 <script>
//                     document.getElementById('testForm').addEventListener('submit', async (e) => {
//                         e.preventDefault();

//                         const data = {
//                             name: document.getElementById('name').value,
//                             email: document.getElementById('email').value
//                         };

//                         const resultDiv = document.getElementById('result');
//                         resultDiv.innerHTML = '<p>Sending...</p>';

//                         try {
//                             const response = await fetch('/send-exercises', {
//                                 method: 'POST',
//                                 headers: { 'Content-Type': 'application/json' },
//                                 body: JSON.stringify(data)
//                             });

//                             const result = await response.json();
//                             if (result.success) {
//                                 resultDiv.innerHTML = '<p style="color: green;">✅ ' + result.message + '</p>';
//                             } else {
//                                 resultDiv.innerHTML = '<p style="color: red;">❌ ' + result.message + '</p>';
//                             }
//                         } catch (error) {
//                             resultDiv.innerHTML = '<p style="color: red;">❌ Network Error: ' + error.message + '</p>';
//                         }
//                     });
//                 </script>
//             </div>
//         </body>
//         </html>
//     `);
// });

// // Error handling
// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Endpoint not found'
//     });
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`
//     🚀 Functional Athletic Email Server
//     ------------------------------------
//     📍 Port: ${PORT}
//     🌐 Environment: ${process.env.NODE_ENV || 'development'}
//     📧 Ready to send exercise program emails
//     🔗 Health check: /health
//     📨 Send email: POST /send-exercises
//     ------------------------------------
//     `);
// });




// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors({
//     origin: [
//         'https://k-forcemethod.com',
//         'https://www.k-forcemethod.com',
//         'http://localhost:5500',
//         'http://127.0.0.1:5500'
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Enhanced transporter with multiple fallbacks
// const createTransporter = () => {
//     // Try multiple configurations
//     const configs = [
//         // Configuration 1: Gmail with OAuth2-like settings
//         {
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false, // false for port 587
//             auth: {
//                 user: process.env.EMAIL_USER || 'kforcemethod@gmail.com',
//                 pass: process.env.EMAIL_PASS // Make sure NO spaces in app password
//             },
//             tls: {
//                 ciphers: 'SSLv3',
//                 rejectUnauthorized: false
//             },
//             connectionTimeout: 10000,
//             greetingTimeout: 10000,
//             socketTimeout: 10000
//         },
//         // Configuration 2: Gmail with SSL
//         {
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL_USER || 'kforcemethod@gmail.com',
//                 pass: process.env.EMAIL_PASS
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         }
//     ];

//     // Try each configuration
//     for (const config of configs) {
//         try {
//             const transporter = nodemailer.createTransport(config);
//             transporter.verify((error, success) => {
//                 if (error) {
//                     console.log(`Config ${config.port} failed:`, error.message);
//                 } else {
//                     console.log(`✅ Using SMTP config: port ${config.port}, secure: ${config.secure}`);
//                 }
//             });
//             return transporter;
//         } catch (error) {
//             console.log(`Config ${config.port} error:`, error.message);
//         }
//     }

//     throw new Error('All SMTP configurations failed');
// };

// // Health check
// app.get('/health', (req, res) => {
//     res.json({
//         status: 'OK',
//         timestamp: new Date().toISOString(),
//         service: 'K-Force Email API'
//     });
// });

// // Send email endpoint
// app.post('/send-exercises', async (req, res) => {
//     console.log('📧 Email request received:', {
//         name: req.body.name,
//         email: req.body.email,
//         ip: req.ip,
//         time: new Date().toISOString()
//     });

//     try {
//         const { name, email } = req.body;

//         // Validation
//         if (!name || !email) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Name and email are required'
//             });
//         }

//         // Email regex validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please enter a valid email address'
//             });
//         }

//         // Create transporter
//         const transporter = createTransporter();

//         // Simple email template (reduced complexity for reliability)
//         const mailOptions = {
//             from: `"K-Force Method" <${process.env.EMAIL_USER || 'kforcemethod@gmail.com'}>`,
//             to: email,
//             subject: `Your Free Training Program - ${name}`,
//             text: `
// Hi ${name},

// Thank you for requesting the K-Force Method Training Program!

// Here's your direct access link:
// https://k-forcemethod.com/exercises.html

// The program includes:
// • 9 powerful full-body exercises
// • Video demonstrations for each exercise
// • Complete sets and reps guidance
// • Proper breathing techniques

// Start transforming your strength today!

// Best regards,
// The K-Force Team
//             `,
//             html: `
// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; }
//         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//         .header { background: #1c1917; color: white; padding: 20px; text-align: center; }
//         .content { padding: 20px; background: #f9f9f9; }
//         .button { display: inline-block; background: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
//         .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="header">
//             <h1>K-FORCE METHOD</h1>
//             <h2>Your Training Program is Ready!</h2>
//         </div>
//         <div class="content">
//             <p>Hi ${name},</p>
//             <p>Thank you for requesting the <strong>K-Force Method Training Program</strong>!</p>
//             <p>Your 1-Day Full Body Program with 9 powerful exercises is ready for you.</p>

//             <div style="text-align: center; margin: 30px 0;">
//                 <a href="https://k-forcemethod.com/exercises.html" class="button">
//                     🔥 ACCESS YOUR EXERCISES NOW
//                 </a>
//             </div>

//             <p><strong>Program includes:</strong></p>
//             <ul>
//                 <li>9 powerful full-body exercises</li>
//                 <li>Video demonstrations for each exercise</li>
//                 <li>Complete sets and reps guidance</li>
//                 <li>Proper breathing techniques</li>
//             </ul>

//             <p>If the button doesn't work, copy and paste this URL:</p>
//             <p style="background: #eee; padding: 10px; border-radius: 5px;">
//                 https://k-forcemethod.com/exercises.html
//             </p>

//             <p>Start your transformation today!</p>
//             <p>Best regards,<br><strong>The K-Force Team</strong></p>
//         </div>
//         <div class="footer">
//             <p>© ${new Date().getFullYear()} K-Force Method. All rights reserved.</p>
//         </div>
//     </div>
// </body>
// </html>
//             `
//         };

//         // Send email
//         const info = await transporter.sendMail(mailOptions);
//         console.log('✅ Email sent successfully:', {
//             messageId: info.messageId,
//             to: email
//         });

//         res.json({
//             success: true,
//             message: 'Email sent successfully! Check your inbox.',
//             messageId: info.messageId
//         });

//     } catch (error) {
//         console.error('❌ Email error:', error);

//         // Detailed error logging
//         let errorMessage = 'Failed to send email. Please try again.';
//         if (error.code === 'EAUTH') {
//             errorMessage = 'Email authentication failed. Please check your credentials.';
//         } else if (error.code === 'ECONNECTION') {
//             errorMessage = 'Cannot connect to email server. Please check your internet connection.';
//         } else if (error.message.includes('timeout')) {
//             errorMessage = 'Connection timeout. Please try again in a few moments.';
//         }

//         res.status(500).json({
//             success: false,
//             message: errorMessage,
//             error: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// });

// // Test endpoint
// app.get('/test-email', async (req, res) => {
//     try {
//         const transporter = createTransporter();
//         const testMail = {
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             subject: 'Test Email from K-Force Backend',
//             text: 'This is a test email from your Render backend.'
//         };

//         const info = await transporter.sendMail(testMail);
//         res.json({
//             success: true,
//             message: 'Test email sent successfully!',
//             messageId: info.messageId
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Test failed',
//             error: error.message
//         });
//     }
// });

// // Root endpoint
// app.get('/', (req, res) => {
//     res.json({
//         service: 'K-Force Email API',
//         status: 'Running',
//         endpoints: {
//             health: '/health',
//             sendEmail: 'POST /send-exercises',
//             testEmail: 'GET /test-email'
//         }
//     });
// });

// const PORT = process.env.PORT || 10000;
// app.listen(PORT, () => {
//     console.log(`
// 🚀 K-Force Email Server Started
// 📍 Port: ${PORT}
// 📧 Email User: ${process.env.EMAIL_USER || 'Not configured'}
// 🔗 Health: http://localhost:${PORT}/health
//     `);
// });






const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors({
    origin: [
        "https://k-forcemethod.com",
        "https://www.k-forcemethod.com",
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== RESEND SETUP ====================
const resend = new Resend(process.env.RESEND_API_KEY);

// ==================== HEALTH CHECK ====================
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "K-Force Email API",
        time: new Date().toISOString()
    });
});

// ==================== SEND EXERCISES EMAIL ====================
app.post("/send-exercises", async (req, res) => {
    const { name, email } = req.body;

    console.log("📧 Email request:", { name, email });

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    try {
        await resend.emails.send({
            from: "K-Force Method <onboarding@resend.dev>", // works instantly
            to: email,
            subject: `Your Free Training Program – ${name}`,
            html: `
        <div style="font-family:Arial;max-width:600px;margin:auto">
          <h2>Hi ${name},</h2>
          <p>Your <strong>K-Force Method Training Program</strong> is ready.</p>

          <div style="text-align:center;margin:30px 0">
            <a href="https://k-forcemethod.com/exercises.html"
               style="background:#ea580c;color:#fff;padding:14px 22px;
                      text-decoration:none;border-radius:6px;font-weight:bold">
              🔥 ACCESS YOUR EXERCISES
            </a>
          </div>

          <p>Includes:</p>
          <ul>
            <li>9 full-body exercises</li>
            <li>Video demonstrations</li>
            <li>Sets & reps guidance</li>
            <li>Breathing techniques</li>
          </ul>

          <p>– K-Force Team</p>
        </div>
      `
        });

        console.log("✅ Email sent to", email);

        res.json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.error("❌ Resend error:", error);

        res.status(500).json({
            success: false,
            message: "Email service failed. Please try again."
        });
    }
});

// ==================== TEST EMAIL ====================
app.get("/test-email", async (req, res) => {
    try {
        const result = await resend.emails.send({
            from: "K-Force Method <onboarding@resend.dev>",
            to: "itsfarhan259@gmail.com",
            subject: "Resend Test – Render Working",
            html: "<strong>Resend email is working perfectly 🚀</strong>"
        });

        res.json({ success: true, result });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ==================== ROOT ====================
app.get("/", (req, res) => {
    res.json({
        service: "K-Force Email API",
        status: "Running",
        endpoints: {
            health: "/health",
            sendExercises: "POST /send-exercises",
            test: "/test-email"
        }
    });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
