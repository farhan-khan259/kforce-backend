// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors({
//     origin: ['https://k-forcemethod.com', 'http://localhost:5500', 'http://127.0.0.1:5500'], // Your frontend URLs
//     credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Create reusable transporter object using SMTP
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     },
//     tls: {
//         rejectUnauthorized: false // For self-signed certificates
//     }
// });

// // Verify connection configuration
// transporter.verify(function (error, success) {
//     if (error) {
//         console.log('SMTP Connection Error:', error);
//     } else {
//         console.log('SMTP Server is ready to send messages');
//     }
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//     res.json({ status: 'OK', message: 'Email server is running' });
// });

// // Send exercises email endpoint
// app.post('/send-exercises', async (req, res) => {
//     try {
//         const { name, email } = req.body;

//         // Input validation
//         if (!name || !email) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Name and email are required'
//             });
//         }

//         // Email validation regex
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid email format'
//             });
//         }

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
//                     <style>
//                         body {
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
//                             line-height: 1.6;
//                             color: #333;
//                             margin: 0;
//                             padding: 0;
//                             background-color: #f9f9f9;
//                         }
//                         .container {
//                             max-width: 600px;
//                             margin: 0 auto;
//                             padding: 20px;
//                             background: white;
//                             border-radius: 10px;
//                             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//                         }
//                         .header {
//                             background: linear-gradient(135deg, #1c1917 0%, #2d1e10 100%);
//                             color: white;
//                             padding: 30px;
//                             text-align: center;
//                             border-radius: 10px 10px 0 0;
//                         }
//                         .logo {
//                             font-size: 24px;
//                             font-weight: bold;
//                             margin-bottom: 10px;
//                         }
//                         .orange {
//                             color: #ea580c;
//                         }
//                         .content {
//                             padding: 30px;
//                         }
//                         .button {
//                             display: inline-block;
//                             background: linear-gradient(180deg, #ff6a00 0%, #ea580c 100%);
//                             color: white;
//                             padding: 16px 32px;
//                             text-decoration: none;
//                             border-radius: 8px;
//                             font-weight: bold;
//                             font-size: 18px;
//                             margin: 20px 0;
//                             text-align: center;
//                             box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3);
//                         }
//                         .features {
//                             background: #f8f9fa;
//                             padding: 20px;
//                             border-radius: 8px;
//                             margin: 20px 0;
//                         }
//                         .feature-item {
//                             display: flex;
//                             align-items: center;
//                             margin: 10px 0;
//                         }
//                         .feature-icon {
//                             color: #ea580c;
//                             margin-right: 10px;
//                             font-size: 18px;
//                         }
//                         .footer {
//                             text-align: center;
//                             padding: 20px;
//                             color: #666;
//                             font-size: 14px;
//                             border-top: 1px solid #eee;
//                             margin-top: 30px;
//                         }
//                         .exercise-list {
//                             margin: 20px 0;
//                         }
//                         .exercise-item {
//                             background: #f8f9fa;
//                             padding: 10px;
//                             margin: 5px 0;
//                             border-left: 4px solid #ea580c;
//                         }
//                     </style>
//                 </head>
//                 <body>
//                     <div class="container">
//                         <div class="header">
//                             <div class="logo">FUNCTIONAL <span class="orange">ATHLETIC</span></div>
//                             <h1>Your Training Program is Ready!</h1>
//                         </div>

//                         <div class="content">
//                             <h2>Hi ${name},</h2>

//                             <p>Thank you for requesting the <strong>Free Functional Training Program</strong>! Your 1-Day Full Body Program is ready to transform your training.</p>

//                             <div style="text-align: center;">
//                                 <a href="https://k-forcemethod.com/exercises.html" class="button">
//                                     🎯 ACCESS YOUR EXERCISES NOW
//                                 </a>
//                             </div>

//                             <p><strong>Program Details:</strong></p>
//                             <div class="exercise-list">
//                                 <div class="exercise-item">• 360 Lunges - 3 sets × 8-16 reps</div>
//                                 <div class="exercise-item">• KB Curl Squat - 3 sets × 5-8 reps</div>
//                                 <div class="exercise-item">• Banded RDL Curls - 2 sets × 8-12 reps</div>
//                                 <div class="exercise-item">• Military Snatch - 3 sets × 8-10 reps</div>
//                                 <div class="exercise-item">• Gymnastic Pull Press - 2 sets × 6-12 reps</div>
//                                 <div class="exercise-item">• One Arm Pulled Shoulder Press - 2 sets × 8-12 reps</div>
//                                 <div class="exercise-item">• Superman Pushup - 2 sets × 8-12 reps</div>
//                                 <div class="exercise-item">• Chin Snatch - 3 sets × 6-10 reps</div>
//                                 <div class="exercise-item">• Ball Swing - 3 sets × 15-20 reps</div>
//                             </div>

//                             <div class="features">
//                                 <div class="feature-item">
//                                     <span class="feature-icon">✅</span>
//                                     <span><strong>No equipment needed</strong> - Can be done anywhere</span>
//                                 </div>
//                                 <div class="feature-item">
//                                     <span class="feature-icon">✅</span>
//                                     <span><strong>Video demonstrations</strong> included for each exercise</span>
//                                 </div>
//                                 <div class="feature-item">
//                                     <span class="feature-icon">✅</span>
//                                     <span><strong>Complete instructions</strong> with breathing techniques</span>
//                                 </div>
//                                 <div class="feature-item">
//                                     <span class="feature-icon">✅</span>
//                                     <span><strong>100% free</strong> - No hidden costs</span>
//                                 </div>
//                             </div>

//                             <p><strong>Quick Start Tips:</strong></p>
//                             <ul>
//                                 <li>Warm up for 5-10 minutes before starting</li>
//                                 <li>Focus on proper form over heavy weights</li>
//                                 <li>Rest 60-90 seconds between sets</li>
//                                 <li>Stay hydrated throughout your workout</li>
//                                 <li>Track your progress each week</li>
//                             </ul>

//                             <p>If the button above doesn't work, copy and paste this link in your browser:</p>
//                             <p style="background: #f1f1f1; padding: 10px; border-radius: 5px; word-break: break-all;">
//                                 https://k-forcemethod.com/exercises.html
//                             </p>

//                             <p><strong>Need help?</strong> Reply to this email with any questions about the program.</p>

//                             <p>Train smart. Move better. Get results.</p>

//                             <p>Best regards,<br>
//                             <strong>The Functional Athletic Team</strong></p>
//                         </div>

//                         <div class="footer">
//                             <p>© ${new Date().getFullYear()} Functional Athletic. All rights reserved.</p>
//                             <p>This is an automated email. Please do not reply to this address.</p>
//                         </div>
//                     </div>
//                 </body>
//                 </html>
//             `,
//             text: `Hi ${name},\n\nThank you for requesting the Free Functional Training Program!\n\nYour 1-Day Full Body Program is ready. Click the link below to access it:\n\nhttps://k-forcemethod.com/exercises.html\n\nProgram includes:\n- 9 powerful exercises\n- Complete workout plan\n- Video demonstrations\n- Breathing techniques\n\nTrain smart. Move better. Get results.\n\nBest regards,\nFunctional Athletic Team\n\nThis is an automated email. Please do not reply to this address.`
//         };

//         // Send email
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info.messageId);

//         res.json({
//             success: true,
//             message: 'Email sent successfully! Check your inbox.',
//             messageId: info.messageId
//         });

//     } catch (error) {
//         console.error('Error sending email:', error);

//         // More specific error messages
//         let errorMessage = 'Failed to send email';
//         if (error.code === 'EAUTH') {
//             errorMessage = 'Email authentication failed. Please check your credentials.';
//         } else if (error.code === 'ECONNECTION') {
//             errorMessage = 'Cannot connect to email server. Please try again later.';
//         } else if (error.code === 'ESOCKET') {
//             errorMessage = 'Network error. Please check your connection.';
//         }

//         res.status(500).json({
//             success: false,
//             message: errorMessage,
//             error: error.message
//         });
//     }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         success: false,
//         message: 'Something went wrong!',
//         error: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
// });

// // 404 handler
// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Endpoint not found'
//     });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`✅ Email server running on port ${PORT}`);
//     console.log(`📧 Ready to send exercise program emails`);
// });



const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();

// Middleware
app.use(cors({
    origin: [
        'https://k-forcemethod.com',
        'https://www.k-forcemethod.com',
        'https://kforce-backend.onrender.com',
        'https://www.kforce-backend.onrender.com',
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create transporter using environment variables
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Functional Athletic Email API',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

// Send exercises email endpoint
app.post('/send-exercises', async (req, res) => {
    console.log('📨 Received email request:', {
        name: req.body.name,
        email: req.body.email,
        timestamp: new Date().toISOString()
    });

    try {
        const { name, email } = req.body;

        // Input validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Create transporter
        const transporter = createTransporter();

        // Email content
        const mailOptions = {
            from: `"Functional Athletic" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🎯 Your Free Functional Training Program - K-Force Method',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Your Training Program</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #1c1917 0%, #2d1e10 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                            <h1 style="margin: 0; font-size: 24px;">FUNCTIONAL <span style="color: #ea580c;">ATHLETIC</span></h1>
                            <h2 style="margin: 10px 0 0 0;">Your Training Program is Ready!</h2>
                        </div>
                        
                        <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px;">
                            <h2>Hi ${name},</h2>
                            
                            <p>Thank you for requesting the <strong>Free Functional Training Program</strong>! Your 1-Day Full Body Program is ready.</p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://k-forcemethod.com/exercises.html" 
                                   style="background: linear-gradient(180deg, #ff6a00 0%, #ea580c 100%); 
                                          color: white; 
                                          padding: 16px 32px; 
                                          text-decoration: none; 
                                          border-radius: 8px; 
                                          font-weight: bold;
                                          display: inline-block;
                                          box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3);">
                                    🎯 ACCESS YOUR EXERCISES NOW
                                </a>
                            </div>
                            
                            <p><strong>Program includes:</strong></p>
                            <ul>
                                <li>9 powerful exercises with video demonstrations</li>
                                <li>Complete 1-day full body workout</li>
                                <li>Proper breathing techniques</li>
                                <li>Sets and reps guidance</li>
                            </ul>
                            
                            <p>If the button doesn't work, copy and paste this link:</p>
                            <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all; font-family: monospace;">
                                https://k-forcemethod.com/exercises.html
                            </div>
                            
                            <p style="margin-top: 30px;">Best regards,<br>
                            <strong>The Functional Athletic Team</strong></p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `Hi ${name},\n\nThank you for requesting the Free Functional Training Program!\n\nYour 1-Day Full Body Program is ready. Click the link below to access it:\n\nhttps://k-forcemethod.com/exercises.html\n\nProgram includes:\n- 9 powerful exercises\n- Complete workout plan\n- Video demonstrations\n- Breathing techniques\n\nBest regards,\nFunctional Athletic Team`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);

        res.json({
            success: true,
            message: 'Email sent successfully! Check your inbox.',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('❌ Error sending email:', error.message);

        let errorMessage = 'Failed to send email. Please try again.';
        if (error.code === 'EAUTH') {
            errorMessage = 'Email authentication failed. Please contact support.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Cannot connect to email server. Please try again later.';
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Welcome page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Functional Athletic Email API</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
                .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #ea580c; }
                .endpoint { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
                code { background: #e9ecef; padding: 2px 5px; border-radius: 3px; }
                .btn { background: #ea580c; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📧 Functional Athletic Email API</h1>
                <p>Server is running successfully!</p>
                
                <h2>📋 Endpoints</h2>
                <div class="endpoint">
                    <strong>GET /health</strong> - Health check<br>
                    <a href="/health" target="_blank">Test Now</a>
                </div>
                
                <div class="endpoint">
                    <strong>POST /send-exercises</strong> - Send training program email<br>
                    <small>Body: { "name": "John", "email": "user@example.com" }</small>
                </div>
                
                <h2>🧪 Test Email Sending</h2>
                <form id="testForm">
                    <input type="text" id="name" placeholder="Your Name" required style="padding: 10px; margin: 5px; width: 200px;"><br>
                    <input type="email" id="email" placeholder="Your Email" required style="padding: 10px; margin: 5px; width: 200px;"><br>
                    <button type="submit" class="btn">Send Test Email</button>
                </form>
                <div id="result" style="margin-top: 20px;"></div>
                
                <script>
                    document.getElementById('testForm').addEventListener('submit', async (e) => {
                        e.preventDefault();
                        
                        const data = {
                            name: document.getElementById('name').value,
                            email: document.getElementById('email').value
                        };
                        
                        const resultDiv = document.getElementById('result');
                        resultDiv.innerHTML = '<p>Sending...</p>';
                        
                        try {
                            const response = await fetch('/send-exercises', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data)
                            });
                            
                            const result = await response.json();
                            if (result.success) {
                                resultDiv.innerHTML = '<p style="color: green;">✅ ' + result.message + '</p>';
                            } else {
                                resultDiv.innerHTML = '<p style="color: red;">❌ ' + result.message + '</p>';
                            }
                        } catch (error) {
                            resultDiv.innerHTML = '<p style="color: red;">❌ Network Error: ' + error.message + '</p>';
                        }
                    });
                </script>
            </div>
        </body>
        </html>
    `);
});

// Error handling
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    🚀 Functional Athletic Email Server
    ------------------------------------
    📍 Port: ${PORT}
    🌐 Environment: ${process.env.NODE_ENV || 'development'}
    📧 Ready to send exercise program emails
    🔗 Health check: /health
    📨 Send email: POST /send-exercises
    ------------------------------------
    `);
});