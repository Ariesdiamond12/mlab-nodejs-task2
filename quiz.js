//
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Timer function that resolves after a specific time
const setTimer = (time) => new Promise((resolve) => setTimeout(() => resolve("TIME_UP"), time * 1000));

// Function to ask a question
const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => resolve(answer.trim()));
  });
};

// Function to ask a question with a time limit
async function askQuestionWithTimeLimit(questionText, timeLimit) {
  console.log(`${questionText} (You have ${timeLimit} seconds)`);
  const timer = setTimer(timeLimit);
  const questionPromise = question("Your answer: ");
  const answer = await Promise.race([questionPromise, timer]);

  if (answer === "TIME_UP") {
    console.log("\nTime's up! Moving to the next question.");
    return null; 
  }

  return answer;
}

// Quiz Questions
const questions = [
  {
    question: "What is the closest galaxy to the Milky Way?",
    answer: "Andromeda Galaxy",
    timeLimit: 10,
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
    timeLimit: 10,
  },
  {
    question: "Which team does Lewis Hamilton drive for in Formula 1?",
    answer: "Mercedes",
    timeLimit: 10,
  },
  {
    question: "Which celebrity has a song named Single Ladies?",
    answer: "Beyoncé",
    timeLimit: 10,
  },
];

// Main quiz function
async function startQuiz() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const { question, answer, timeLimit } = questions[i];

    console.log(`\nQuestion ${i + 1}:`);
    const userAnswer = await askQuestionWithTimeLimit(question, timeLimit);

    if (userAnswer) {
      if (userAnswer.toLowerCase() === answer.toLowerCase()) {
        console.log("Correct!");
        score += 1;
      } else {
        console.log(`Wrong! The correct answer was: ${answer}`);
      }
    } else {
      console.log(`Skipped! The correct answer was: ${answer}`);
    }
  }

  console.log(`\nQuiz completed! Your score: ${score}/${questions.length}`);
  rl.close();
}

startQuiz();
