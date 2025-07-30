const questionPools = {
  easy: [
    {
      id: 1,
      question: "What is the main topic discussed in the content?",
      options: ["Technology", "Science", "History", "Literature"],
      correct: 0,
      difficulty: "easy"
    },
    {
      id: 2,
      question: "Which field is primarily covered?",
      options: ["Medicine", "Engineering", "Arts", "Business"],
      correct: 1,
      difficulty: "easy"
    },
    {
      id: 3,
      question: "What type of content is this?",
      options: ["Educational", "Entertainment", "News", "Fiction"],
      correct: 0,
      difficulty: "easy"
    },
    {
      id: 4,
      question: "Is this content factual or opinion-based?",
      options: ["Factual", "Opinion", "Mixed", "Unclear"],
      correct: 0,
      difficulty: "easy"
    },
    {
      id: 5,
      question: "What is the primary format of the content?",
      options: ["Text", "Video", "Audio", "Interactive"],
      correct: 0,
      difficulty: "easy"
    }
  ],
  medium: [
    {
      id: 6,
      question: "Which concept is most emphasized in the content?",
      options: ["Innovation", "Tradition", "Analysis", "Implementation"],
      correct: 2,
      difficulty: "medium"
    },
    {
      id: 7,
      question: "What methodology is primarily discussed?",
      options: ["Qualitative research", "Quantitative analysis", "Mixed methods", "Theoretical framework"],
      correct: 1,
      difficulty: "medium"
    },
    {
      id: 8,
      question: "How does the content approach problem-solving?",
      options: ["Systematic", "Creative", "Traditional", "Experimental"],
      correct: 0,
      difficulty: "medium"
    },
    {
      id: 9,
      question: "What is the scope of the discussion?",
      options: ["Local", "Regional", "National", "Global"],
      correct: 3,
      difficulty: "medium"
    },
    {
      id: 10,
      question: "Which stakeholders are primarily addressed?",
      options: ["Students", "Professionals", "Researchers", "General public"],
      correct: 2,
      difficulty: "medium"
    }
  ],
  hard: [
    {
      id: 11,
      question: "What are the underlying theoretical implications of the presented framework?",
      options: ["Paradigm shift in methodology", "Incremental improvement", "Validation of existing theories", "Complete theoretical overhaul"],
      correct: 0,
      difficulty: "hard"
    },
    {
      id: 12,
      question: "How do the presented findings challenge conventional wisdom?",
      options: ["They don't challenge it", "Partial contradiction", "Complete refutation", "Contextual disagreement"],
      correct: 2,
      difficulty: "hard"
    },
    {
      id: 13,
      question: "What are the epistemological foundations of the arguments presented?",
      options: ["Empiricism", "Rationalism", "Constructivism", "Pragmatism"],
      correct: 2,
      difficulty: "hard"
    },
    {
      id: 14,
      question: "Which critical analysis framework best applies to this content?",
      options: ["Deconstructive", "Comparative", "Systematic", "Meta-analytical"],
      correct: 3,
      difficulty: "hard"
    },
    {
      id: 15,
      question: "What are the long-term implications for the field discussed?",
      options: ["Minimal impact", "Moderate evolution", "Significant transformation", "Revolutionary change"],
      correct: 2,
      difficulty: "hard"
    }
  ]
};

export const generateSampleQuiz = (numQuestions, difficulty) => {
  const pool = questionPools[difficulty];
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(numQuestions, pool.length));
};
    