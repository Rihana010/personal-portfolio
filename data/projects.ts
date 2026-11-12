// Single source of truth for the Work section. Edit here, nothing else.
// Only facts from the resume / repos are included. Fill the TODOs with real outcomes
// (users, latency, accuracy) — numbers are what make a case study credible.

export type Project = {
  n: string;
  name: string;
  kicker: string;
  problem: string;
  role: string;
  stack: string[];
  points: { label: string; text: string }[];
  live?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    n: "01",
    name: "Atlas",
    kicker: "Automated ML baseline engine",
    problem:
      "Picking a baseline model for a new dataset is repetitive work. Atlas does it from a raw CSV.",
    role: "Solo build",
    stack: ["Python", "PyTorch", "scikit-learn", "XGBoost"],
    points: [
      {
        label: "Problem",
        text: "Comparing baselines by hand across datasets is slow and inconsistent.",
      },
      {
        label: "Decision",
        text: "Auto-detect problem type, then train Logistic/Ridge, Random Forest and XGBoost asynchronously.",
      },
      {
        label: "Outcome",
        text: "Ranked leaderboard dashboard. Pipeline validated end-to-end on 20 datasets. SHAP + Optuna next.",
      },
    ],
    github: "https://github.com/Rihana010/Atlas",
  },
  {
    n: "02",
    name: "Tutor.",
    kicker: "RAG-based study companion",
    problem: "Ask questions over your own notes and get answers grounded in them.",
    role: "Solo build",
    stack: ["Flask", "ChromaDB", "sentence-transformers", "Groq · Llama-3.3-70B"],
    points: [
      {
        label: "Problem",
        text: "Generic chatbots don't know your syllabus or lecture material.",
      },
      {
        label: "Decision",
        text: "PyMuPDF parsing into ChromaDB vector storage, Llama-3.3-70B for grounded generation.",
      },
      {
        label: "Outcome",
        text: "Retrieval and answer quality tested across ~10 documents in Phase 1 of a 5-phase build.",
      },
    ],
  },
  {
    n: "03",
    name: "CampusX",
    kicker: "Skill swap & marketplace platform",
    problem: "A campus marketplace where students trade skills, designed and shipped solo.",
    role: "Solo · IPBL course",
    stack: ["Flask", "Supabase", "Vercel"],
    points: [
      {
        label: "Problem",
        text: "Students have skills to offer and no structured place to swap them.",
      },
      {
        label: "Decision",
        text: "Owned the full lifecycle: architecture, UI, PRD, report and presentations.",
      },
      {
        label: "Outcome",
        text: "Deployed live on Vercel.",
      },
    ],
    live: "https://campus-x-six.vercel.app",
  },
  {
    n: "04",
    name: "Cheat-Sheet Generator",
    kicker: "Syllabus to printable cheat-sheet",
    problem: "An open alternative to a paid syllabus-to-cheatsheet tool.",
    role: "Solo build",
    stack: ["Google Gemini API", "PDF / DOCX export"],
    points: [
      {
        label: "Problem",
        text: "Turning a long syllabus into a compact study sheet is manual and tedious.",
      },
      {
        label: "Decision",
        text: "AI topic extraction with three print layouts and PDF/DOCX export.",
      },
      {
        label: "Outcome",
        text: "Correctly extracted 19 distinct topics from a real Cell Biology syllabus.",
      },
    ],
  },
  {
    n: "05",
    name: "Research-Pilot",
    kicker: "AI literature review app",
    problem: "Speeding up the literature review step of research.",
    role: "Solo build",
    stack: ["AI", "Python"], // TODO: real stack
    points: [
      // TODO: add problem / decision / outcome with one real metric
      {
        label: "What",
        text: "AI-assisted literature review. Latest repo on GitHub.",
      },
    ],
    github: "https://github.com/Rihana010/Research-Pilot",
  },
  {
    n: "06",
    name: "ScamShield",
    kicker: "Phishing & scam risk checker",
    problem: "A web app that scores how risky a message or link looks.",
    role: "Community project · 1BCP308",
    stack: ["Web app"], // TODO: real stack
    points: [
      // TODO: add detection approach and one real outcome
      {
        label: "What",
        text: "Phishing and scam risk checker built for the community project course.",
      },
    ],
  },
];

export const stats = [
  { value: 9.1, decimals: 1, suffix: "", label: "CGPA · Sem 2" },
  { value: 5, decimals: 0, suffix: "+", label: "Hackathons" },
  { value: 20, decimals: 0, suffix: "", label: "Datasets · Atlas" },
  { value: 2, decimals: 0, suffix: "nd", label: "Place · Tech quiz" },
];

export const stack = [
  "Python",
  "PyTorch",
  "scikit-learn",
  "XGBoost",
  "Flask",
  "Supabase",
  "ChromaDB",
  "Groq",
  "Gemini API",
  "JavaScript",
  "SQL",
  "C++",
  "Vercel",
  "Git",
];
