const generate = require("../gemini_client");

const githubUsername1 = "godofgeeks23";
const githubUsername2 = "kartikmehta8";

async function getGithubData(username) {
  const githubUrl = "https://api.github.com/users/" + username;
  const response = await fetch(githubUrl);
  const data = await response.json();
  return data;
}

async function main() {
  const githubData1 = await getGithubData(githubUsername1);
  const githubData2 = await getGithubData(githubUsername2);

  const prompt = `I am providing you with github data and stats of 2 users. Compare and roast them as brutally as you can. 
  
  Here is the data of user 1 ${githubUsername1}:
    ${JSON.stringify(githubData1)}

  and here is the data of user 2 ${githubUsername2}:
    ${JSON.stringify(githubData2)}    `;

  const result = await generate(prompt);
  console.log(result);
}

main();
