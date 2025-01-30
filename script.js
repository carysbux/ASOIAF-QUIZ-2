// Questions array (can be loaded from a server or written directly)

const quizQuestions = [
    {
      question: "What was Sansa's direwolf's name?",
      options: ["Lady", "Nymeria", "Bran"],
      answer: "Lady"
    },
    {
      question: "Which religion do most people from Westeros follow?",
      options: [" Old Gods ", "Drowned God", "Faith of the Seven"],
      answer: "Faith of the Seven"
    },
    {
      question: "Where was Daenerys Targaryen born?",
      options: [" King's Landing ", "Dragonstone", "Pentos"],
      answer: "Dragonstone"
    },
    {
      question: "The dragon Silverwing belonged to whom?",
      options: ["Alysanne", "Aegon the Uncrowned", "Rhaena"],
      answer: "Alysanne"
    },
    {
      question: "What is the name Ned short for?",
      options: ["Neddard", "Eddard", "Edric"],
      answer: "Eddard"
    },
    {
      question: "Brienne was betrothed to which lordling?",
      options: ["Renly ", "Loras", "Ronnet"],
      answer: "Ronnet"
    },
    {
      question: "Where is Tumbleton?",
      options: ["The Crownlands ", "The Reach", "The Riverlands"],
      answer: "The Reach"
    },
    {
      question: "Where is the Starry Sept located?",
      options: [" Oldtown ", "Lannisport", "King's Landing"],
      answer: " Oldtown "
    },
    {
      question: "What illness did Shireen Baratheon suffer from as a babe?",
      options: [" The Pale Mare ", "Winter Fever", "Greyscale"],
      answer: "Greyscale"
    },
    {
      question: "Which dragons survived the Dance?",
      options: [" Silverwing, Nettles, and Morning ", "Stormcloud and Morghul", "Greyghost, Vhagar, and Morning"],
      answer: " Silverwing, Nettles, and Morning "
    },
    {
      question: "What is the name of Arya Stark's sword?",
      options: [" Pointy ", "Needle", "Longclaw"],
      answer: "Needle"
    }
  
];

const homeScreen = document.getElementById('home-screen');
const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const nextButton = document.getElementById('next-button');

let score = 0;
let currentQuestionIndex = 0;

function displayQuestion(index) {
    quizContainer.innerHTML = ''; // Clear previous question
    const quiz = quizQuestions[index];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<h3>Question ${index + 1}: ${quiz.question}</h3>`;

    const optionsContainer = document.createElement('div');
    let answered = false; // Flag to track if the question has been answered

    quiz.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option-button');
        optionsContainer.appendChild(optionButton);
        optionButton.addEventListener('click', () => {
            if (!answered) {
                if (option === quiz.answer) {
                    score++;
                    // Update score text
                    scoreContainer.textContent = `Score: ${score}`;

                    // Disable all buttons if the correct answer is clicked
                    const buttons = optionsContainer.querySelectorAll('button');
                    buttons.forEach(button => {
                        if (button.textContent !== quiz.answer) {
                            button.disabled = true;
                        }
                    });
                } else {
                    // Disable all buttons if one clicked is incorrect
                    const buttons = optionsContainer.querySelectorAll('button');
                    buttons.forEach(button => {
                        button.disabled = true;
                    });
                }
                answered = true; // Mark the question as answered
                nextButton.style.display = 'block'; // Show the Next button
            }
        });
        optionsContainer.appendChild(optionButton);
    });

    questionElement.appendChild(optionsContainer);
    quizContainer.appendChild(questionElement);
}

// Initialize score text
scoreContainer.textContent = `Score: ${score}`;

// Display the first question
startButton.addEventListener('click', () => {
    homeScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    scoreContainer.style.display = 'block';
    document.body.className = 'quiz-screen'; // Apply quiz screen styles
    displayQuestion(currentQuestionIndex);
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(currentQuestionIndex);
        nextButton.style.display = 'none'; // Hide the Next button until the next question is answered
    } else {
        quizContainer.innerHTML = `<h1>Quiz Completed!</h1><p>your score is: ${score} out of ${quizQuestions.length}</p>`;
        scoreContainer.style.display = 'none'; // Hide the score container
        nextButton.style.display = 'none'; // Hide the Next button
        document.body.className = 'completed-screen'; // Apply completed screen styles
    }
});