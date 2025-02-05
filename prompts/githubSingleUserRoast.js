const generate = require("../gemini_client");

const githubUsername = "godofgeeks23";

async function getGithubData() {
  const githubUrl = "https://api.github.com/users/" + githubUsername;
  const response = await fetch(githubUrl);
  const data = await response.json();
  return data;
}

async function main() {
  const githubData = await getGithubData();

  const prompt = `I am providing you with github data and stats of user ${githubUsername}. Roast this user as brutally as you possibly can. Here is the data - 
    ${JSON.stringify(githubData)}    `;

  const result = await generate(prompt);
  console.log(result);
}

main();
