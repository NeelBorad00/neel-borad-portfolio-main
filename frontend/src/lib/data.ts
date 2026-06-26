export const personal = {
  name: 'Neel Borad',
  role: 'Product Manager & AI Solutions Builder',
  tagline: 'Building intelligent products at the intersection of AI and strategy.',
  email: 'neelborad00@gmail.com',
  phone: '+91 9586151481',
  linkedinUrl: 'https://linkedin.com/in/neelborad',
  githubUrl: 'https://github.com/neelborad00',
  location: 'Surat, India',
  currentCompany: 'Mirai Minds LLP',
  currentRole: 'Product Manager',
};

export const aboutParagraphs = [
  'Product Manager and AI Solutions Builder working at the intersection of strategy and execution. I design, deploy, and optimize AI-powered products — from voice agents to conversational pipelines — that solve real business problems.',
  'At Mirai Minds, I translate complex requirements into scalable AI products, engineer prompts for high-performance systems, and own the full customer delivery lifecycle from kickoff to production.',
];

export const coreAreas = [
  'Product Management',
  'AI Voice Agents',
  'Prompt Engineering',
  'Conversational AI',
  'Agent Design',
  'Product Strategy',
  'Customer Delivery',
  'Workflow Automation',
  'Generative AI',
  'Solution Architecture',
];

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  tags: string[];
  bullets: string[];
}

export const experience: WorkExperience[] = [
  {
    company: 'Mirai Minds LLP',
    role: 'Product Manager',
    period: 'Aug 2025 — Present',
    location: 'India',
    tags: ['Prompt Engineer', 'Customer Delivery Partner'],
    bullets: [
      'Design and deploy AI-powered voice agent workflows, translating business requirements into production-ready conversational products',
      'Engineer prompts for conversational AI pipelines, optimising for response quality, latency, and operational cost across client deployments',
      'Own end-to-end customer delivery for AI solution implementations — from requirements discovery through to live handoff',
      'Shape product roadmaps that align AI capabilities with measurable business outcomes',
      'Build efficient conversational pipelines balancing performance, user experience, and infrastructure cost',
    ],
  },
  {
    company: 'AICTE TechSaksham',
    role: 'Machine Learning Intern',
    period: 'Jan 2025 — Feb 2025',
    location: 'Remote, India',
    tags: [],
    bullets: [
      'Built a Resume Ranking System using NLP and classical ML models to match resumes against job descriptions at scale',
      'Applied TF-IDF vectorisation and Logistic Regression to automate candidate screening, reducing manual review time significantly',
      'Improved recruiter efficiency through automatic relevance scoring and candidate filtering',
    ],
  },
  {
    company: 'Accenture',
    role: 'Data Analytics Intern',
    period: 'May 2024 — Jul 2024',
    location: 'Bangalore, India',
    tags: [],
    bullets: [
      'Developed ML models to detect anomalies in transactional data using Python, enabling proactive fraud identification',
      'Performed data preprocessing, feature engineering, and automated metric evaluations across large datasets',
      'Designed interactive Power BI dashboards to surface trends and support executive decision-making',
    ],
  },
];

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  color: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  githubUrl: string;
}

export const projects: Project[] = [
  {
    slug: 'stream-suggestor',
    title: 'Stream Suggestor',
    subtitle: 'AI-Powered Career Guidance',
    year: '2025',
    tags: ['Python', 'Flask', 'Gemini API', 'GenAI'],
    color: '#1B1B1E',
    problem:
      'Career guidance tools surface generic paths regardless of individual interests — leaving users with advice that fits everyone and helps no one.',
    approach:
      'Built a Flask application powered by Google Gemini API that generates personalised career stream recommendations from user inputs. Integrated interactive charts, career timelines, and downloadable PDF roadmaps to make guidance actionable.',
    outcome:
      'A fully interactive guidance tool that adapts to each user, producing personalised roadmaps in seconds instead of hours of generic browsing.',
    metrics: [
      { label: 'Approach', value: 'Generative AI' },
      { label: 'Output', value: 'PDF + Charts' },
      { label: 'Stack', value: 'Flask · Gemini' },
    ],
    githubUrl: '#',
  },
  {
    slug: 'entity-extraction-model',
    title: 'Entity Extraction Model',
    subtitle: 'Document Intelligence at Hackathon Speed',
    year: '2025',
    tags: ['Python', 'OCR', 'ML', 'Computer Vision'],
    color: '#1B1B1E',
    problem:
      'Manually extracting structured data from document images is slow, error-prone, and fundamentally does not scale.',
    approach:
      'Built an ML pipeline combining OCR with rule-based extraction techniques. Iteratively refined accuracy through preprocessing improvements and feature engineering during the Amazon ML Challenge 2024.',
    outcome:
      'Accuracy improved from 20% to 70% — a 3.5× gain — through systematic experimentation within tight hackathon constraints.',
    metrics: [
      { label: 'Accuracy', value: '20% → 70%' },
      { label: 'Context', value: 'Amazon ML Challenge' },
      { label: 'Stack', value: 'Python · OCR · CV' },
    ],
    githubUrl: '#',
  },
  {
    slug: 'resume-screening-system',
    title: 'AI Resume Screening',
    subtitle: 'Automated Candidate Ranking',
    year: '2024',
    tags: ['Python', 'Streamlit', 'NLP', 'TF-IDF'],
    color: '#1B1B1E',
    problem:
      'Manual resume screening is time-consuming, introduces bias, and forces recruiters to spend hours on tasks that should take minutes.',
    approach:
      'Built a Streamlit web app that extracts resume content, compares it against job descriptions using TF-IDF and cosine similarity, then ranks candidates automatically with filtering by relevance score.',
    outcome:
      'Automated shortlisting pipeline that surfaces the most relevant candidates first — compressing screening from hours to seconds.',
    metrics: [
      { label: 'Method', value: 'TF-IDF + Cosine Sim' },
      { label: 'Interface', value: 'Streamlit' },
      { label: 'Stack', value: 'Python · NLP · ML' },
    ],
    githubUrl: '#',
  },
];

export const skillGroups = [
  {
    category: 'AI & Product',
    skills: [
      'Conversational AI',
      'Voice AI Agents',
      'Prompt Engineering',
      'Generative AI',
      'Agent Design',
      'Product Strategy',
      'Solution Architecture',
      'Workflow Automation',
      'Customer Delivery',
    ],
  },
  {
    category: 'Machine Learning',
    skills: [
      'Supervised Learning',
      'Unsupervised Learning',
      'Model Evaluation',
      'Feature Engineering',
      'Exploratory Data Analysis',
      'NLP',
      'TF-IDF',
      'Computer Vision',
    ],
  },
  {
    category: 'Engineering',
    skills: [
      'Python',
      'Java',
      'SQL',
      'Flask',
      'Streamlit',
      'Git',
      'REST APIs',
      'CI/CD',
      'Agile',
    ],
  },
  {
    category: 'Data & Tools',
    skills: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Power BI',
      'OpenCV',
    ],
  },
];

export const education = {
  institution: 'Jain University, Bangalore',
  degree: 'Bachelor of Technology',
  field: 'Information Science & Engineering',
  period: 'June 2025',
  gpa: '8.44 / 10',
  coursework: [
    'Data Structures & Algorithms',
    'Agile Development',
    'Object Oriented System Design',
    'Artificial Intelligence',
    'Operating Systems',
  ],
};

export const achievements = [
  {
    title: 'Amazon ML Challenge 2024',
    description: 'Entity recognition model improved from 20% to 70% accuracy',
    type: 'Hackathon',
  },
  {
    title: 'LeetCode — 200+ Problems',
    description: 'Solved 200+ Java problems, sharpening algorithmic thinking',
    type: 'DSA',
  },
  {
    title: 'GeeksforGeeks — 80+ Day Streak',
    description: '100+ problems with consistent daily practice',
    type: 'DSA',
  },
  {
    title: 'Accenture Data Analytics',
    description: 'Virtual experience — analytics case studies using SQL & Python',
    type: 'Certification',
  },
];
