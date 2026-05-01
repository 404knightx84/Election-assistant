import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are the India Election Assistant, an expert on the Indian electoral process. 
Your goal is to educate users about how elections work in India.
Follow these rules:
1. Answer ONLY questions related to Indian elections, the Election Commission of India, electoral history, voting rights, and processes.
2. If asked about off-topic subjects (like programming, general knowledge outside politics, or non-Indian elections), politely decline and steer the conversation back to Indian elections.
3. Be strictly non-partisan. Do not express opinions on political parties, candidates, or current political controversies. Provide factual, objective information.
4. Use simple, plain English that is easy for a beginner to understand. Explain jargon like 'EVM', 'NOTA', or 'Delimitation' if you use them.
5. Keep your responses concise (under 200 words if possible) unless a detailed explanation is requested.`;

let genAI = null;
let model = null;

/**
 * Initializes the Gemini API with the provided key.
 * @param {string} apiKey 
 */
export const initGemini = (apiKey) => {
  if (!apiKey) return;
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash", // Using 2.0 flash as it's reliable
    systemInstruction: SYSTEM_PROMPT 
  });
};

/**
 * Sends a message to the Gemini AI and returns the response.
 * @param {string} text 
 * @param {Array} history 
 * @returns {Promise<string>}
 */
export const sendMessage = async (text, history = []) => {
  if (!model) {
    throw new Error("Gemini API not initialized. Please provide an API key.");
  }

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    })),
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  const result = await chat.sendMessage(text);
  const response = await result.response;
  return response.text();
};

/**
 * Simple input sanitization to prevent basic script injection.
 * @param {string} input 
 * @returns {string}
 */
export const sanitizeInput = (input) => {
  return input.replace(/<[^>]*>?/gm, '').trim();
};
