const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require("dotenv").config();

const GEMINI_API_KEYS = process.env.GEMINI_API_KEYS.split(" ");

// use a random index to start with the first key
var keyIndex = Math.floor(Math.random() * GEMINI_API_KEYS.length);
const initialKeyIndex = keyIndex;

const model_name = "gemini-2.0-flash-exp-image-generation";

// EDIT THIS - enter your prompt here
const prompt =
  "Hi, can you create a 3d rendered image of a pig with wings and a top hat flying over a happy futuristic scifi city with lots of greenery?";

// function to generate a random string of 5 characters
function generateRandomString() {
  return Math.random().toString(36).substring(2, 7);
}

async function generate(prompt) {
  const randomKey = GEMINI_API_KEYS[keyIndex];
  console.log("Using API key:", keyIndex);

  const genAI = new GoogleGenerativeAI(randomKey);
  const model = genAI.getGenerativeModel({
    model: model_name,
    generationConfig: {
      responseModalities: ["Text", "Image"],
    },
  });

  try {
    const response = await model.generateContent(prompt);
    for (const part of response.response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");

        const outputFileName = `images/generated-image-${generateRandomString()}.png`;

        fs.writeFileSync(outputFileName, buffer);
        console.log(`Image saved as ${outputFileName}`);
      }
    }
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

async function main() {
  const result = await generate(prompt);
  console.log(result);
}

main();

module.exports = generate;
