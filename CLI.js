import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "your_gemini_api_key_here"; // Get from environment variable
const genAI = new GoogleGenerativeAI({
  apiKey: API_KEY,
  baseUrl: 'https://generativelanguage.googleapis.com/v1'
});

const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const systemPrompt = "You are Keza, an expert AI coding assistant. Provide clear, concise code solutions with explanations.";

async function ask() {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    try {
      const result = await model.generateContent(systemPrompt + "\n\nUser: " + input);
      const response = result.response.text();
      console.log("AI:", response);
    } catch (error) {
      console.error("Error:", error.message);
    }

    ask();
  });
}

console.log("Gemini CLI - Type 'exit' to quit");
ask();