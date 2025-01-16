const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const GEMINI_API_KEYS = process.env.GEMINI_API_KEYS.split(" ");

// use a random index to start with
var keyIndex = Math.floor(Math.random() * GEMINI_API_KEYS.length);
const initialKeyIndex = keyIndex;

async function generate(prompt) {
  const randomKey = GEMINI_API_KEYS[keyIndex];
  console.log("Using API key:", keyIndex);

  const genAI = new GoogleGenerativeAI(randomKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.error(e);
    console.log("Error occured, trying again with a new key...");
    keyIndex = (keyIndex + 1) % GEMINI_API_KEYS.length;
    if (keyIndex === initialKeyIndex) {
      console.log("All API keys used, exiting...");
      return "No more API keys available";
    }
    return generate(prompt);
  }
}

// uncomment for testing
// async function main() {
//   const prompt = "Introduce yourself in 20 words or less.";
//   const result = await generate(prompt);
//   console.log(result);
// }

// main();

module.exports = generate;
