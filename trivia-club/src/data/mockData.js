// ─── Trivia Questions ───────────────────────────────────────────────
export const triviaQuestions = [
  {
    question: "What is the smallest country in the world by area?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctIndex: 1,
  },
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctIndex: 1,
  },
  {
    question: "What element does 'Fe' represent on the periodic table?",
    options: ["Fluorine", "Iron", "Fermium", "Francium"],
    correctIndex: 1,
  },
  {
    question: "In what year did the Berlin Wall fall?",
    options: ["1987", "1988", "1989", "1990"],
    correctIndex: 2,
  },
  {
    question: "Which Shakespeare play features the character Puck?",
    options: [
      "The Tempest",
      "A Midsummer Night's Dream",
      "Twelfth Night",
      "Much Ado About Nothing",
    ],
    correctIndex: 1,
  },
  {
    question: "What is the powerhouse of the cell?",
    options: [
      "Nucleus",
      "Ribosome",
      "Mitochondria",
      "Endoplasmic Reticulum",
    ],
    correctIndex: 2,
  },
  {
    question: "Which ancient wonder was located in Alexandria?",
    options: [
      "Colossus of Rhodes",
      "Hanging Gardens",
      "Lighthouse of Alexandria",
      "Temple of Artemis",
    ],
    correctIndex: 2,
  },
  {
    question: "What gas makes up roughly 78% of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctIndex: 2,
  },
  {
    question: "Who painted 'Starry Night'?",
    options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Edvard Munch"],
    correctIndex: 1,
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctIndex: 1,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Won", "Yuan", "Yen", "Peso"],
    correctIndex: 2,
  },
  {
    question: "Which gas is used in birth control?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Methane"],
    correctIndex: 1,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
    correctIndex: 0,
  },
  {
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctIndex: 1,
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctIndex: 2,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Pb"],
    correctIndex: 1,
  },
  {
    question: "Which city is known as the 'City of Canals'?",
    options: ["Venice", "Amsterdam", "Rome", "Paris"],
    correctIndex: 0,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctIndex: 3,
  },
];

// ─── Announcements ──────────────────────────────────────────────────
export const announcements = [
  {
    id: 1,
    author: "Micheal Mbsgwejkwe",
    date: "2026-08-14",
    badge: "Important",
    title: "Jump on a House Cat!",
    body: "This is a test of our website! We're going to see if we can make this thing work.",
    attachmentUrl: null,
  },
  {
    id: 2,
    author: "Ashkit",
    date: "2026-08-12",
    badge: "Meeting",
    title: "House Cat the Jump!!",
    body: "This is a test of our website! We're going to see if we can make this thing work.",
    attachmentUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 3,
    author: "Deez",
    date: "2026-08-10",
    badge: "Event",
    title: "Deez",
    body: "This is a test.",
    attachmentUrl: null,
  },
];

// ─── Resources / Study Guides ───────────────────────────────────────
export const resources = [
  {
    id: 1,
    title: "US History Quick Review",
    description: "Key events, dates, and figures from the Revolutionary War through the Cold War.",
    tags: ["history", "us history"],
    pdfUrl: "/guides/us-history.pdf",
  },
  {
    id: 2,
    title: "Biology Essentials",
    description: "Cell biology, genetics, ecology, and human body systems in one guide.",
    tags: ["science", "biology"],
    pdfUrl: "/guides/biology.pdf",
  },
  {
    id: 3,
    title: "World Geography",
    description: "Countries, capitals, physical features, and map skills.",
    tags: ["geography"],
    pdfUrl: "/guides/world-geography.pdf",
  },
  {
    id: 4,
    title: "Math & Logic Puzzles",
    description: "Number theory, combinatorics, and logic problems commonly seen in quiz bowl.",
    tags: ["math", "logic"],
    pdfUrl: "/guides/math-logic.pdf",
  },
  {
    id: 5,
    title: "World Literature Highlights",
    description: "Major authors and works from classical antiquity through modern literature.",
    tags: ["literature", "arts"],
    pdfUrl: "/guides/world-literature.pdf",
  },
  {
    id: 6,
    title: "Fine Arts & Music",
    description: "Composers, art movements, famous paintings, and musical terms.",
    tags: ["arts", "music"],
    pdfUrl: "/guides/fine-arts.pdf",
  },
];

// ─── Flashcards ─────────────────────────────────────────────────────
export const flashcards = [
  { id: 1, front: "Mitochondria", back: "The organelle responsible for producing ATP — the energy currency of the cell." },
  { id: 2, front: "Pythagorean Theorem", back: "a² + b² = c², relating the sides of a right triangle." },
  { id: 3, front: "Magna Carta (1215)", back: "English charter limiting the power of the king, foundational to constitutional law." },
  { id: 4, front: "Photosynthesis Equation", back: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂" },
  { id: 5, front: "Hamlet's Author", back: "William Shakespeare, written around 1600–1601." },
  { id: 6, front: "Speed of Light", back: "Approximately 3 × 10⁸ meters per second in a vacuum." },
  { id: 7, front: "Treaty of Versailles", back: "1919 peace treaty ending World War I, imposed heavy reparations on Germany." },
  { id: 8, front: "Newton's Second Law", back: "F = ma — Force equals mass times acceleration." },
];

// ─── External Links ─────────────────────────────────────────────────
export const externalLinks = [
  { title: "MultiBuzz", url: "https://multibuzz.app/", description: "W Online Buzzer" },
  { title: "Quizlet", url: "https://quizlet.com/", description: "Quizlet is a free online learning tool that uses flashcards to help you study." },
];

// ─── Execs ───────────────────────────────────────────────────────
export const execs = [
  { name: "Mr. Suteir", role: "President" },
  { name: "Alex", role: "Co-President" },
  { name: "Kevin", role: "Co-President" },
  { name: "Daniel", role: "Vice President" },
  { name: "Toby", role: "Senior Trainer" },
  { name: "Keira", role: "Junior Trainer" },
  { name: "Akshit", role: "Media Master" },
  { name: "Sunwoo", role: "Event Coordinator" },
];

// ─── Socials & Contact Info ─────────────────────────────────────────
export const socials = {
  instagram: "https://instagram.com/triviaclub",
  email: "triviaclub@school.edu",
  meetingLocation: "Room ###",
  meetingSchedule: "Every ____day, During Lunch",
};
