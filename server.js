// for a wrapper api for gemini client

const express = require("express");
const generate = require("./gemini_client");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Gemini-client webserver is running!");
});

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  const result = await generate(prompt);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Webserver listening on port ${PORT}`);
});
