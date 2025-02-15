const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const GEMINI_API_KEYS = process.env.GEMINI_API_KEYS.split(" ");

// use a random index to start with the first key
var keyIndex = Math.floor(Math.random() * GEMINI_API_KEYS.length);
const initialKeyIndex = keyIndex;

// const model_name = "gemini-1.5-flash";
const model_name = "gemini-2.0-flash";

async function generate(prompt) {
  const randomKey = GEMINI_API_KEYS[keyIndex];
  console.log("Using API key:", keyIndex);

  const genAI = new GoogleGenerativeAI(randomKey);
  const model = genAI.getGenerativeModel({ model: model_name });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.error(e);
    console.log("ERROR!, trying again with a new key...");
    keyIndex = (keyIndex + 1) % GEMINI_API_KEYS.length;
    if (keyIndex === initialKeyIndex) {
      console.log("All API keys used, exiting...");
      return "No more API keys available";
    }
    return generate(prompt);
  }
}

// // uncomment below code for testing ----------------------
// async function main() {
//   const prompt = "Introduce yourself in 20 words at maximum.";
//   const result = await generate(prompt);
//   console.log(result);
// }

// main();
// // ----------------------------------

module.exports = generate;
