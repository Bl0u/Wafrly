import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Enhances raw OCR receipt text using Gemini AI.
 * @param {string} ocrText - The raw text from the OCR process.
 * @returns {Promise<string>} - The enhanced markdown table response.
 */
export const enhanceReceiptWithAI = async (ocrText) => {
    try {
        // We use gemini-1.5-flash as it's the most common.
        // If v1 (GA) fails, the SDK usually handles fallbacks, but we'll stick to a clean v1 call.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });
        
        console.log("Starting Gemini AI enhancement...");
        const prompt = `
You are an expert receipt parser. Your goal is to take raw, messy OCR text from a store receipt and convert it into a clean, structured list of items.

**Raw OCR Text:**
"${ocrText}"

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

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("Failed to process receipt with AI.");
    }
};
