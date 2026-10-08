// Initial Projects Data for My Tech Tracker

export const initialProjects = [
  {
    id: 'proj-1',
    title: 'Investment & Trading Platform',
    category: 'Full Stack',
    description: 'Zerodha-inspired investment platform featuring live order placement, market analytics, and an integrated Investment Tracker with beautiful graphs and portfolio insights.',
    status: 'In Progress',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'WebSockets'],
    githubUrl: 'https://github.com/user/investment-trading-platform',
    liveUrl: 'https://trade-analytics-demo.vercel.app',
    startDate: '2026-02-01',
    completionDate: '2026-04-15',
    notes: 'Integrating real-time market data feed using Socket.io and building interactive portfolio analytics dashboards.',
    checklist: [
      { id: 'c-1', title: 'Authentication & JWT', completed: true },
      { id: 'c-2', title: 'User Dashboard & Watchlist', completed: true },
      { id: 'c-3', title: 'Portfolio Management Engine', completed: false },
      { id: 'c-4', title: 'Real-time Market Data Simulation', completed: false },
      { id: 'c-5', title: 'Trading Simulation & Order Book', completed: false },
      { id: 'c-6', title: 'Investment Tracker Integration', completed: false },
      { id: 'c-7', title: 'Analytics & Interactive Graphs', completed: false },
      { id: 'c-8', title: 'AI Insights & Recommendations', completed: false },
      { id: 'c-9', title: 'Testing & Code Audit', completed: false },
      { id: 'c-10', title: 'Deployment on Render/Vercel', completed: false }
    ]
  },
  {
    id: 'proj-2',
    title: 'Video Conferencing Platform',
    category: 'Full Stack',
    description: 'Zoom-inspired web application supporting multi-party video/audio calls, screen sharing, real-time chat, and room breakout features using WebRTC.',
    status: 'Planned',
    techStack: ['Next.js', 'WebRTC', 'Socket.io', 'Tailwind CSS', 'Node.js'],
    githubUrl: '',
    liveUrl: '',
    startDate: '2026-05-01',
    completionDate: '2026-06-30',
    notes: 'Investigating SFU (Selective Forwarding Unit) vs Mesh WebRTC topology for handling 10+ active video feeds.',
    checklist: [
      { id: 'c-11', title: 'WebRTC Peer Connections Setup', completed: false },
      { id: 'c-12', title: 'Signaling Server (Socket.io)', completed: false },
      { id: 'c-13', title: 'Screen Sharing & Audio Controls', completed: false },
      { id: 'c-14', title: 'In-Call Chat & Reactions', completed: false },
      { id: 'c-15', title: 'Meeting Room Access Control & Recording', completed: false }
    ]
  },
  {
    id: 'proj-3',
    title: 'Professional Network Platform',
    category: 'Full Stack',
    description: 'LinkedIn-inspired professional networking platform with user profiles, posts feed, connection requests, messaging, and job posting modules.',
    status: 'Idea',
    techStack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma'],
    githubUrl: '',
    liveUrl: '',
    startDate: '',
    completionDate: '',
    notes: 'Drafting database ERD for mutual connections and newsfeed ranking algorithm.',
    checklist: [
      { id: 'c-16', title: 'Database Schema & Prisma ORM', completed: false },
      { id: 'c-17', title: 'Feed & Media Upload Engine', completed: false },
      { id: 'c-18', title: 'Connections & Follow System', completed: false },
      { id: 'c-19', title: 'Real-time Messaging', completed: false }
    ]
  },
  {
    id: 'proj-4',
    title: 'Property Rental Marketplace',
    category: 'Full Stack',
    description: 'Airbnb-inspired full-stack marketplace featuring dynamic map listings, property booking system, review ratings, and Stripe payment integration.',
    status: 'Planned',
    techStack: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Mapbox', 'Stripe'],
    githubUrl: '',
    liveUrl: '',
    startDate: '',
    completionDate: '',
    notes: 'Using Mapbox for geo-based map search and Cloudinary for photo galleries.',
    checklist: [
      { id: 'c-20', title: 'Property Listing Creation & Photo Upload', completed: false },
      { id: 'c-21', title: 'Interactive Mapbox Search', completed: false },
      { id: 'c-22', title: 'Booking Calendar & Date Availability', completed: false },
      { id: 'c-23', title: 'Stripe Checkout Integration', completed: false }
    ]
  },
  {
    id: 'proj-5',
    title: 'Developer Collaboration Ecosystem',
    category: 'Full Stack',
    description: 'Comprehensive engineering suite combining Git code hosting, AI code review, DevOps dashboard, Agile Board, Jira clone, Slack/Trello bot, and real-time team collaboration tools.',
    status: 'In Progress',
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'WebSockets', 'OpenAI'],
    githubUrl: 'https://github.com/user/dev-collaboration-suite',
    liveUrl: '',
    startDate: '2026-03-10',
    completionDate: '2026-08-30',
    notes: 'High-priority enterprise capstone suite.',
    checklist: [
      { id: 'c-24', title: 'GitHub-like Code Hosting Platform', completed: true },
      { id: 'c-25', title: 'Code Collaboration with AI Assistance', completed: true },
      { id: 'c-26', title: 'DevOps & CI/CD Monitor Dashboard', completed: false },
      { id: 'c-27', title: 'Team Collaboration & Doc Editor', completed: false },
      { id: 'c-28', title: 'Time & Productivity Tracker with Reports', completed: false },
      { id: 'c-29', title: 'Mini-Jira Clone & Agile Board', completed: false },
      { id: 'c-30', title: 'Slack + Trello Bot & API Notifications', completed: false },
      { id: 'c-31', title: 'Agile Retrospective Board & Anonymous Feedback', completed: false }
    ]
  },
  {
    id: 'proj-6',
    title: 'AI Assistant Platform',
    category: 'AI Full-Stack',
    description: 'ChatGPT-inspired conversational AI portal with custom prompt templates, multi-modal file analysis, workspace memory, and streaming responses.',
    status: 'Completed',
    techStack: ['Next.js', 'OpenAI API', 'LangChain', 'Pinecone', 'Tailwind CSS'],
    githubUrl: 'https://github.com/user/ai-assistant-platform',
    liveUrl: 'https://ai-assistant-demo.vercel.app',
    startDate: '2026-01-05',
    completionDate: '2026-02-20',
    notes: 'Successfully deployed streaming text completions with Markdown & LaTeX support.',
    checklist: [
      { id: 'c-32', title: 'Streaming SSE API Handler', completed: true },
      { id: 'c-33', title: 'Conversation Persistence', completed: true },
      { id: 'c-34', title: 'RAG Knowledgebase Vector Index', completed: true },
      { id: 'c-35', title: 'Dark / Light UI Theme Support', completed: true }
    ]
  },
  {
    id: 'proj-7',
    title: 'Infinity Ultron',
    category: 'AI Full-Stack',
    description: 'Personal productivity & growth tracker inspired by a JARVIS-style autonomous assistant with voice command triggers and daily automated reporting.',
    status: 'In Progress',
    techStack: ['Python', 'FastAPI', 'React', 'Ollama', 'SpeechRecognition'],
    githubUrl: 'https://github.com/user/infinity-ultron',
    liveUrl: '',
    startDate: '2026-03-01',
    completionDate: '2026-05-30',
    notes: 'Local LLM integration via Ollama running Llama-3 model.',
    checklist: [
      { id: 'c-36', title: 'Ollama Local LLM Endpoint Setup', completed: true },
      { id: 'c-37', title: 'Voice Recognition & Synthesis Engine', completed: false },
      { id: 'c-38', title: 'Personal Routine & Goal Manager', completed: false },
      { id: 'c-39', title: 'Automated Daily Summary Reports', completed: false }
    ]
  },

  // AI / ML / DATA SCIENCE PROJECTS
  {
    id: 'proj-8',
    title: 'AI Powered Attendance System',
    category: 'AI/ML',
    description: 'Automated attendance logging system using OpenCV face recognition and real-time webcam feed logging into a SQLite database.',
    status: 'Completed',
    techStack: ['Python', 'OpenCV', 'Face_Recognition', 'SQLite', 'Tkinter'],
    githubUrl: 'https://github.com/user/ai-face-attendance',
    liveUrl: '',
    startDate: '2025-11-01',
    completionDate: '2025-12-15',
    notes: 'Achieved 98.4% detection accuracy under standard lighting conditions.',
    checklist: [
      { id: 'c-40', title: 'Face Encoding Pipeline', completed: true },
      { id: 'c-41', title: 'Webcam Stream Capture', completed: true },
      { id: 'c-42', title: 'Database Logging & Anti-Spoofing', completed: true }
    ]
  },
  {
    id: 'proj-9',
    title: 'AI ATS Resume Analyzer',
    category: 'AI/ML',
    description: 'Applicant Tracking System (ATS) that parses PDF resumes, compares against job descriptions using spaCy NLP & embeddings, and outputs match scores.',
    status: 'In Progress',
    techStack: ['Python', 'Streamlit', 'spaCy', 'PyPDF2', 'Scikit-Learn'],
    githubUrl: 'https://github.com/user/ats-resume-analyzer',
    liveUrl: '',
    startDate: '2026-02-15',
    completionDate: '2026-04-01',
    notes: 'Extracting keywords, skills matrix, and missing candidate qualifications.',
    checklist: [
      { id: 'c-43', title: 'PDF Text Extraction Engine', completed: true },
      { id: 'c-44', title: 'NLP Skill Extraction & Named Entity Recognition', completed: true },
      { id: 'c-45', title: 'TF-IDF & Cosine Similarity Scorer', completed: false },
      { id: 'c-46', title: 'Streamlit UI Dashboard', completed: false }
    ]
  },
  {
    id: 'proj-10',
    title: 'AI Gym Coach',
    category: 'AI/ML',
    description: 'Computer vision workout tracking app utilizing MediaPipe pose estimation to count exercise reps (pushups, squats, bicep curls) and correct posture in real-time.',
    status: 'Planned',
    techStack: ['Python', 'MediaPipe', 'OpenCV', 'Flask', 'React'],
    githubUrl: '',
    liveUrl: '',
    startDate: '',
    completionDate: '',
    notes: 'Calculating joint angles (elbow, knee, hip) for posture feedback.',
    checklist: [
      { id: 'c-47', title: 'MediaPipe Keypoint Extraction', completed: false },
      { id: 'c-48', title: 'Joint Angle Math & Rep Counting Logic', completed: false },
      { id: 'c-49', title: 'Audio Posture Feedback Integration', completed: false }
    ]
  },
  {
    id: 'proj-11',
    title: 'Neural Style Transfer',
    category: 'AI/ML',
    description: 'Deep Learning neural artistic style transfer applying classic painter styles (e.g. Van Gogh) onto target content images using VGG19 CNN features.',
    status: 'Completed',
    techStack: ['Python', 'PyTorch', 'Torchvision', 'VGG19', 'Matplotlib'],
    githubUrl: 'https://github.com/user/neural-style-transfer',
    liveUrl: '',
    startDate: '2025-10-10',
    completionDate: '2025-11-05',
    notes: 'Loss function balancing content loss and gram matrix style loss.',
    checklist: [
      { id: 'c-50', title: 'VGG19 Feature Extractor Setup', completed: true },
      { id: 'c-51', title: 'Gram Matrix Computation', completed: true },
      { id: 'c-52', title: 'Optimization Loop & Visual Outputs', completed: true }
    ]
  },

  // APP DEVELOPMENT PROJECTS (REACT NATIVE)
  {
    id: 'proj-12',
    title: 'Theme Switcher App',
    category: 'App Development',
    description: 'React Native starter app demonstrating dynamic light/dark theming and context state updates across screens.',
    status: 'Completed',
    techStack: ['React Native', 'Expo', 'Context API'],
    githubUrl: 'https://github.com/user/rn-theme-switcher',
    liveUrl: '',
    startDate: '2026-01-10',
    completionDate: '2026-01-12',
    notes: 'Simple foundational project from React Native syllabus.',
    checklist: [
      { id: 'c-53', title: 'Context Theme Provider', completed: true },
      { id: 'c-54', title: 'Toggle UI & Persistent Storage', completed: true }
    ]
  },
  {
    id: 'proj-13',
    title: 'Password Generator',
    category: 'App Development',
    description: 'Mobile password generator with customizable length, symbols, numbers, uppercase controls, and Formik + Yup validation.',
    status: 'Completed',
    techStack: ['React Native', 'Formik', 'Yup'],
    githubUrl: 'https://github.com/user/rn-password-generator',
    liveUrl: '',
    startDate: '2026-01-15',
    completionDate: '2026-01-18',
    notes: 'Form validation and random string generator logic.',
    checklist: [
      { id: 'c-55', title: 'Formik State Setup', completed: true },
      { id: 'c-56', title: 'Yup Schema Validation', completed: true },
      { id: 'c-57', title: 'Password Generator Engine', completed: true }
    ]
  },
  {
    id: 'proj-14',
    title: 'Background Changer',
    category: 'App Development',
    description: 'Interactive React Native app that generates random hex color codes and updates screen background dynamically on tap.',
    status: 'Completed',
    techStack: ['React Native', 'StyleSheet'],
    githubUrl: 'https://github.com/user/rn-bg-changer',
    liveUrl: '',
    startDate: '2026-01-20',
    completionDate: '2026-01-21',
    notes: 'Learned TouchableOpacity and state mutations.',
    checklist: [
      { id: 'c-58', title: 'Random Hex Generator', completed: true },
      { id: 'c-59', title: 'TouchableOpacity Action Button', completed: true }
    ]
  },
  {
    id: 'proj-15',
    title: 'Dice Roller',
    category: 'App Development',
    description: 'Dice rolling mobile game with haptic feedback vibrations and random dice image rendering.',
    status: 'Completed',
    techStack: ['React Native', 'Expo Haptics'],
    githubUrl: 'https://github.com/user/rn-dice-roller',
    liveUrl: '',
    startDate: '2026-01-22',
    completionDate: '2026-01-23',
    notes: 'Integrated Haptic feedback for tactile feel.',
    checklist: [
      { id: 'c-60', title: 'Haptic Trigger Integration', completed: true },
      { id: 'c-61', title: 'Dice Face Images Mapping', completed: true }
    ]
  },
  {
    id: 'proj-16',
    title: 'Currency Converter',
    category: 'App Development',
    description: 'Multi-currency mobile conversion tool with exchange rate calculations and clean grid layout.',
    status: 'Completed',
    techStack: ['React Native', 'FlatList'],
    githubUrl: 'https://github.com/user/rn-currency-converter',
    liveUrl: '',
    startDate: '2026-01-25',
    completionDate: '2026-01-27',
    notes: 'Grid styling using FlatList numColumns.',
    checklist: [
      { id: 'c-62', title: 'Currency Data Mapping', completed: true },
      { id: 'c-63', title: 'Conversion Calculation Logic', completed: true }
    ]
  },
  {
    id: 'proj-17',
    title: 'Tic Tac Toe Game',
    category: 'App Development',
    description: '2-player mobile Tic Tac Toe app with FontAwesome icons, win state detection, and game reset functionality.',
    status: 'Completed',
    techStack: ['React Native', 'Vector Icons'],
    githubUrl: 'https://github.com/user/rn-tictactoe',
    liveUrl: '',
    startDate: '2026-02-01',
    completionDate: '2026-02-03',
    notes: 'Matrix winning combination checks.',
    checklist: [
      { id: 'c-64', title: 'Grid UI Component', completed: true },
      { id: 'c-65', title: 'Winner Detection Algorithm', completed: true }
    ]
  },
  {
    id: 'proj-18',
    title: 'Spotify UI Clone',
    category: 'App Development',
    description: 'Full audio player mobile application featuring react-native-track-player, music controls, seek bar, and album art.',
    status: 'In Progress',
    techStack: ['React Native', 'Track Player', 'Slider'],
    githubUrl: 'https://github.com/user/rn-spotify-clone',
    liveUrl: '',
    startDate: '2026-02-10',
    completionDate: '2026-03-30',
    notes: 'Configuring background audio service listeners.',
    checklist: [
      { id: 'c-66', title: 'Track Player Service Setup', completed: true },
      { id: 'c-67', title: 'Control Center & Playback Buttons', completed: true },
      { id: 'c-68', title: 'Seekbar Slider & Position Tracker', completed: false }
    ]
  },
  {
    id: 'proj-19',
    title: 'Authentication App',
    category: 'App Development',
    description: 'Full mobile user authentication app connecting React Native with Appwrite backend (Sign up, Login, Logout, Session check).',
    status: 'Planned',
    techStack: ['React Native', 'Appwrite SDK', 'React Navigation'],
    githubUrl: '',
    liveUrl: '',
    startDate: '',
    completionDate: '',
    notes: 'Appwrite cloud project backend endpoint integration.',
    checklist: [
      { id: 'c-69', title: 'Appwrite SDK Connection', completed: false },
      { id: 'c-70', title: 'Auth Context Provider', completed: false }
    ]
  },
  {
    id: 'proj-20',
    title: 'Navigation Demo App',
    category: 'App Development',
    description: 'React Navigation stack demo passing route parameters between home and detail screens.',
    status: 'Completed',
    techStack: ['React Native', 'React Navigation'],
    githubUrl: 'https://github.com/user/rn-navigation-demo',
    liveUrl: '',
    startDate: '2026-02-05',
    completionDate: '2026-02-07',
    notes: 'Demonstrated stack navigator prop passing.',
    checklist: [
      { id: 'c-71', title: 'Native Stack Navigator Setup', completed: true },
      { id: 'c-72', title: 'Param Passing & Header Customization', completed: true }
    ]
  },

  // DATA SCIENCE PROJECT
  {
    id: 'proj-21',
    title: 'AI-Powered Stock Market Analytics & Portfolio Intelligence Platform',
    category: 'Data Science',
    description: 'Advanced data science intelligence platform fetching financial stock data, computing technical indicators (RSI, MACD, Bollinger Bands), ARIMA/Prophet time-series forecasting, and automated portfolio rebalancing advice.',
    status: 'In Progress',
    techStack: ['Python', 'Pandas', 'NumPy', 'yfinance', 'Statsmodels', 'Plotly', 'Streamlit'],
    githubUrl: 'https://github.com/user/stock-intelligence-analytics',
    liveUrl: '',
    startDate: '2026-03-01',
    completionDate: '2026-05-15',
    notes: 'Building technical indicator feature engineering pipeline.',
    checklist: [
      { id: 'c-73', title: 'yFinance Data Ingestion Pipeline', completed: true },
      { id: 'c-74', title: 'Feature Engineering (RSI, MACD, SMA)', completed: true },
      { id: 'c-75', title: 'ARIMA & Prophet Time Series Forecast', completed: false },
      { id: 'c-76', title: 'Monte Carlo Portfolio Simulation', completed: false },
      { id: 'c-77', title: 'Interactive Plotly Analytics Dashboard', completed: false }
    ]
  },

  // AI FULL-STACK PROJECTS
  {
    id: 'proj-22',
    title: 'AI Full Stack Project 1',
    category: 'AI Full-Stack',
    description: 'Multimodal AI Content Generator combining text generation (GPT-4) with image generation (DALL-E 3) into an all-in-one media studio.',
    status: 'Planned',
    techStack: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'PostgreSQL'],
    githubUrl: '',
    liveUrl: '',
    startDate: '',
    completionDate: '',
    notes: 'Drafting UI wireframes for multi-tab prompt generator.',
    checklist: [
      { id: 'c-78', title: 'Next.js App Router Shell', completed: false },
      { id: 'c-79', title: 'OpenAI Multimodal API Route', completed: false }
    ]
  },
  {
    id: 'proj-23',
    title: 'AI Full Stack Project 2',
    category: 'AI Full-Stack',
    description: 'Autonomous AI Research Agent that accepts target search topics, queries web APIs, synthesizes findings using RAG, and produces formatted PDF reports.',
    status: 'Planned',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Tavily Search', 'React'],
    githubUrl: '',
    liveUrl: '',
    startDate: '',
    completionDate: '',
    notes: 'Designing multi-agent loop with LangGraph.',
    checklist: [
      { id: 'c-80', title: 'LangGraph Agent Executor', completed: false },
      { id: 'c-81', title: 'PDF Generator Backend', completed: false }
    ]
  },
  {
    id: 'proj-24',
    title: 'AI Full Stack Project 3',
    category: 'AI Full-Stack',
    description: 'AI Code Base Refactoring & Security Audit Companion that scans GitHub repositories for security vulnerabilities and generates inline fix PRs.',
    status: 'Planned',
    techStack: ['TypeScript', 'Node.js', 'GitHub API', 'Claude API', 'React'],
    githubUrl: '',
    liveUrl: '',
    startDate: '',
    completionDate: '',
    notes: 'Integrating GitHub Webhooks for automated PR scanning.',
    checklist: [
      { id: 'c-82', title: 'GitHub Webhook Handler', completed: false },
      { id: 'c-83', title: 'Claude API AST Vulnerability Scanner', completed: false }
    ]
  }
];
