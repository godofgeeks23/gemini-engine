# Gemini 1.5 Flash Key-Rotation Example

This project demonstrates how to interact with the [Google Generative AI Node.js library](https://www.npmjs.com/package/@google/generative-ai) while automatically rotating through multiple Gemini API keys (for example, in case of usage limits or other errors). If a key fails, the script will try the next key, and so on, until it either succeeds or exhausts all keys.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [How It Works](#how-it-works)

---

## Overview

- **Language**: JavaScript / Node.js
- **Purpose**: Demonstrate how to:
  1. Load Gemini API keys from environment variables.
  2. Randomly select a starting key.
  3. Interact with the `@google/generative-ai` package to generate content.
  4. Rotate keys on errors.
  5. Return final content or report if all keys have been used.

## Features

- **Random Key Selection**: The script starts with a random API key from your list of keys.
- **Auto-Rotation**: If the current key fails (e.g., due to quota limits or invalid key), the script tries the next key in the list.
- **Loop Prevention**: If we circle back to our initial key, the script stops and logs that no more keys are available.
- **Simple Prompt Interface**: Modify the `prompt` variable in `main()` to generate a different type of content.

## Prerequisites

1. **Node.js** version 18 or higher.
2. **NPM** or **Yarn** package manager.
3. **One or more** valid Gemini API keys.

## Installation

1. **Clone or Download** this repository.
2. In the project folder, run:
   ```bash
   npm install
   ```
   This installs the @google/generative-ai and dotenv packages.

## Configuration

1.  Create a .env file in the project root (or use any environment variable injection method you prefer).

2.  Add the following line to your .env file, including all your API keys separated by spaces:

    ```bash
    GEMINI_API_KEYS="YOUR_GEMINI_KEY_1 YOUR_GEMINI_KEY_2 YOUR_GEMINI_KEY_3"
    ```

3.  (Optional) If you have additional environment variables or configurations, set them here as well.

Example `.env` file:

```bash
GEMINI_API_KEYS="key1 key2 key3"
```

## Usage

### Using Docker

   ```bash
   docker compose up
   ```

1. Run the script with:
   ```bash
   npm index.js
   ```
2. Check the console for logs indicating:
   - Which key is being used.
   - If an error occurred and the script is trying the next key.
   - The final generated text from the model.

## How It Works

1. Loading Keys
   We read the environment variable GEMINI_API_KEYS and split it by spaces to get an array of keys.

2. Random Key Index

```javascript
var keyIndex = Math.floor(Math.random() * GEMINI_API_KEYS.length);
```

This ensures we pick a different key each time the script runs.

3. Generating Content

<!-- code -->

```javascript
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent(prompt);
return result.response.text();
```

We create a “Generative Model” for gemini-1.5-flash and call generateContent(prompt) to get our AI-generated text.

4. Catching Errors and Rotating Keys
   If an error occurs, the script increments the key index (mod the length of the array) and tries again. Once we circle back to our initial key, we exit.

5. Output
   The final AI-generated response is logged to the console.
