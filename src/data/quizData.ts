export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty?: string;
}

export type QuizLevel = 'easy' | 'medium' | 'hard' | 'mixed';

// Basic questions (easy level)
export const easyQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    difficulty: 'easy'
  },
  {
    id: 4,
    question: "Which country is home to the Great Barrier Reef?",
    options: ["Brazil", "Australia", "Indonesia", "Thailand"],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 13,
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Gorilla"],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 14,
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 15,
    question: "What is the primary color of a school bus?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctAnswer: 3,
    difficulty: 'easy'
  },
  {
    id: 16,
    question: "Which fruit is associated with Isaac Newton's discovery of gravity?",
    options: ["Orange", "Apple", "Pear", "Banana"],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 17,
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: 2,
    difficulty: 'easy'
  }
];

// Medium difficulty questions
export const mediumQuestions: Question[] = [
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 6,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 7,
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 8,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 18,
    question: "What is the largest species of shark?",
    options: ["Great White Shark", "Whale Shark", "Hammerhead Shark", "Tiger Shark"],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 19,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 20,
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 21,
    question: "What is the largest internal organ in the human body?",
    options: ["Brain", "Liver", "Lungs", "Heart"],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 22,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    difficulty: 'medium'
  }
];

// Hard difficulty questions
export const hardQuestions: Question[] = [
  {
    id: 9,
    question: "Which famous scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 10,
    question: "What is the largest organ of the human body?",
    options: ["Brain", "Liver", "Skin", "Heart"],
    correctAnswer: 2,
    difficulty: 'hard'
  },
  {
    id: 11,
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
    difficulty: 'hard'
  },
  {
    id: 12,
    question: "What is the square root of 144?",
    options: ["11", "12", "14", "16"],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 23,
    question: "Which of these elements has the highest atomic number?",
    options: ["Uranium", "Plutonium", "Berkelium", "Californium"],
    correctAnswer: 3,
    difficulty: 'hard'
  },
  {
    id: 24,
    question: "Who was the first woman to win a Nobel Prize?",
    options: ["Marie Curie", "Rosalind Franklin", "Dorothy Hodgkin", "Irène Joliot-Curie"],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 25,
    question: "What is the rarest blood type in humans?",
    options: ["O negative", "AB negative", "B negative", "A negative"],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 26,
    question: "What is the formula for calculating the area of a circle?",
    options: ["πr²", "2πr", "πd", "πr³"],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 27,
    question: "Which of these programming languages was developed first?",
    options: ["Python", "Java", "C++", "FORTRAN"],
    correctAnswer: 3,
    difficulty: 'hard'
  },
  {
    id: 28,
    question: "What is the Fibonacci sequence?",
    options: [
      "A sequence where each number is the product of the two preceding ones", 
      "A sequence where each number is the sum of the two preceding ones", 
      "A sequence of prime numbers", 
      "A sequence of perfect squares"
    ],
    correctAnswer: 1,
    difficulty: 'hard'
  }
];

// Function to get questions based on difficulty level
export const getQuestionsByLevel = (level: QuizLevel): Question[] => {
  switch (level) {
    case 'easy':
      return easyQuestions;
    case 'medium':
      return mediumQuestions;
    case 'hard':
      return hardQuestions;
    case 'mixed':
      // Combine all questions and shuffle them
      return shuffleArray([...easyQuestions, ...mediumQuestions, ...hardQuestions]);
    default:
      return easyQuestions;
  }
};

// Helper function to shuffle array (for mixed mode)
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}; 