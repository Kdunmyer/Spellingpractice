import { useState } from "react";

export default function SpellingPractice() {
  // 20 i-Ready 1st grade spelling words
  const words = [
    "tulip",
    "apple",
    "banana",
    "grape",
    "orange",
    "pencil",
    "table",
    "school",
    "book",
    "house",
    "happy",
    "rabbit",
    "family",
    "circle",
    "sun",
    "tree",
    "chair",
    "friend",
    "ball",
    "butterfly",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Track which word we're on
  const [spelling, setSpelling] = useState(""); // Input for spelling
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if answer is submitted
  const [feedback, setFeedback] = useState(""); // Feedback message

  const correctAnswer = words[currentWordIndex]; // The current word to spell

  // Function to play the current word
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(correctAnswer);
    speechSynthesis.speak(utterance);
  };

  // Function to handle the submission
  const handleSubmit = () => {
    setIsSubmitted(true);
    if (spelling.toLowerCase() === correctAnswer) {
      setFeedback("Correct! Well done!");
    } else {
      setFeedback(`Oops! The correct spelling is: ${correctAnswer}`);
    }
  };

  // Function to move to the next word
  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setSpelling(""); // Reset input
      setIsSubmitted(false); // Allow for new submission
      setFeedback(""); // Clear feedback
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Spelling Practice</h1>

      <div style={{ marginBottom: "20px" }}>
        <p>Listen to the word and spell it:</p>
        <button onClick={playAudio}>🔊</button>
      </div>

      <div>
        <p>Now, type the word you heard:</p>
        <input
          type="text"
          value={spelling}
          onChange={(e) => setSpelling(e.target.value)}
          disabled={isSubmitted}
          placeholder="Type the word"
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSubmit} disabled={!spelling || isSubmitted}>
          Submit
        </button>
      </div>

      {isSubmitted && (
        <p
          style={{
            color: spelling.toLowerCase() === correctAnswer ? "green" : "red",
          }}
        >
          {feedback}
        </p>
      )}

      {isSubmitted && currentWordIndex < words.length - 1 && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={nextWord}>Next Word</button>
        </div>
      )}

      {isSubmitted && currentWordIndex === words.length - 1 && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          You have completed all the words!
        </p>
      )}
    </div>
  );
}
