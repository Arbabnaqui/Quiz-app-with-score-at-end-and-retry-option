# 3D Quiz App

A modern interactive quiz application featuring 3D animations, high-definition graphics, and smooth transitions.

## Features

- Interactive 3D background with animated elements
- Smooth transitions and animations using Framer Motion
- Responsive design that works on all screen sizes
- Score tracking and final results page
- Option to retry the quiz
- Modern UI with gradient effects and glassmorphism

## Tech Stack

- **React** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Helper components for React Three Fiber
- **Framer Motion** - Animation library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/3d-quiz-app.git
cd 3d-quiz-app
```

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm run dev
```

This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

Build the app for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## How to Play

1. Start the quiz by clicking the "Start Quiz" button on the home page
2. Answer each question by selecting one of the options
3. After selecting an answer, click "Check Answer" to see if you were correct
4. Continue through all questions
5. View your final score on the results page
6. Choose to retry the quiz or return to the home page

## Customizing the Quiz

You can modify the quiz questions by editing the `src/data/quizData.ts` file. Each question should have the following format:

```typescript
{
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-based)
}
```

## License

This project is licensed under the MIT License.

## Acknowledgments

- Font: Inter (Google Fonts)
- 3D graphics powered by Three.js
- Animations powered by Framer Motion 