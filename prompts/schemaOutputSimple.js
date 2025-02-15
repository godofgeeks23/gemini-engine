const generate = require("../gemini_client");

async function main() {
  const prompt = `
    List few popular cookie recipes using this JSON schema:

Recipe = {'recipeName': string}
Return: Array<Recipe>
    `;

  const result = await generate(prompt);
  console.log(result);
}

main();
