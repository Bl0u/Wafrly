const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { ocrSpace } = require('ocr-space-api-wrapper');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_super_secret_key_wafrly'; // In production, use environment variables

app.use(cors({
    origin: '*', // Allow all for debugging, or specify ['http://localhost:5173', 'http://localhost:5174']
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize Multer for file uploads (storing in memory for simplicity)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("AIzaSyBJuySm_kHGM6ympYq8dN1_gLyYmxqG6GQ");
const OCR_API_KEY = "K89305957388957";

// In-memory array for minimal backend setup
// In a real app, use a database like PostgreSQL or MongoDB
const users = [];

// Sign Up Endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword
        };

        users.push(newUser);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Log In Endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Unified Receipt Processing Endpoint (OCR + AI)
app.post('/api/upload-receipt', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        // 1. Process with OCR Space
        // Convert buffer to base64 for ocr-space-api-wrapper
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        
        console.log('Sending to OCR Space...');
        const ocrResponse = await ocrSpace(base64Image, { 
            apiKey: OCR_API_KEY,
            isTable: true,
            scale: true
        });

        if (ocrResponse.IsErroredOnProcessing) {
            return res.status(500).json({ 
                success: false, 
                message: 'OCR Processing Error', 
                details: ocrResponse.ErrorMessage 
            });
        }

        const rawText = ocrResponse.ParsedResults?.[0]?.ParsedText;
        if (!rawText) {
            return res.status(200).json({ 
                success: true, 
                rawText: "No text detected.", 
                aiResponse: "No data to process." 
            });
        }

        console.log('Raw text detected. Sending to Gemini AI (using gemini-1.5-pro)...');

        // 2. Process with Gemini AI
        // Using the exact model alias that works in your other project
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        
        const prompt = `
You are an expert receipt parser. Your goal is to take raw, messy OCR text from a store receipt and convert it into a clean, structured list of items.

**Raw OCR Text:**
"${rawText}"

**Task:**
1. Correct any OCR spelling errors (e.g., "S1arbucks" -> "Starbucks").
2. Extract the product name, quantity, and unit price.
3. Categorize each item into one of three categories:
   - **Essential**: Basic needs (bread, milk, rent, medicine).
   - **Necessary**: Required for work or lifestyle but not basic survival (internet, professional tools, basic clothing).
   - **Discretionary**: Non-essential/Luxury (coffee, electronics, dining out, entertainment).

**Output Format:**
Return ONLY a markdown table with the following columns:
| Product | Count | Price for each (EGP) | Category |

If a value is missing or unclear, make your best guess based on the context of the receipt. If there are no clear products in the text, respond with "No products could be extracted from the provided text."
`;

        const aiResult = await model.generateContent(prompt);
        const aiResponse = await aiResult.response;
        const enhancedTable = aiResponse.text();

        console.log('AI Enhancement complete.');

        res.status(200).json({
            success: true,
            rawText: rawText,
            aiResponse: enhancedTable
        });

    } catch (error) {
        console.error('Receipt processing error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error during receipt processing.',
            error: error.message 
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running smoothly on http://127.0.0.1:${PORT}`);
});
