import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'Tejaswini Pamula',
    title: 'Data Analyst | Data Scientist | AI & Machine Learning Enthusiast',
    location: 'Rajahmundry, Andhra Pradesh, India',
    email: 'tejaswinitejp@gmail.com',
    secondaryEmail: 'tejaswiniteja793@gmail.com',
    phone: '+91 63098 52003',
    linkedin: 'https://linkedin.com/in/pamula-tejaswini',
    github: 'https://github.com/tejaswini-pamula',
    instagram: 'https://instagram.com/tejaswini_pamula',
    tagline: 'Transforming Data into Actionable Insights through AI, Machine Learning, and Business Analytics.',
    shortBio: 'I am a Computer Science Engineer passionate about Data Analytics, Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI. I enjoy solving real-world business problems by transforming complex datasets into meaningful insights and building intelligent solutions that drive better decision-making.',
    fullBio: 'I graduated with a Bachelor of Technology in Computer Science and Engineering from Shri Vishnu Engineering College for Women, Bhimavaram with a CGPA of 7.43.\n\nMy interests include Data Analytics, Machine Learning, Deep Learning, Natural Language Processing, Large Language Models, and Generative AI. I continuously explore emerging AI technologies while building practical projects that solve real-world problems.',
    profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    resumeUrl: '/Tejaswini_Pamula_Resume.pdf',
  },
  hero: {
    heading: 'Turning Data into Decisions.',
    subheading: 'AI Powered Analytics. Business Driven Insights.',
    description: 'Computer Science Engineer specializing in Data Science, Machine Learning, Generative AI, and predictive analytics to engineer high-impact business solutions.',
    primaryCtaText: 'View Projects',
    secondaryCtaText: 'Download Resume',
    heroImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    heroImagePlacement: 'side-right',
    heroImageShape: 'archival',
    showHeroImage: true,
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      institution: 'Shri Vishnu Engineering College for Women, Bhimavaram',
      period: '2021 – 2025',
      cgpa: '7.43 CGPA',
      highlights: [
        'Specialized in Data Structures, Algorithms, Statistics, and Database Management Systems',
        'Active Lead Coordinator for campus Eco-Friendly Association & Sustainability initiatives',
        'Organized technical workshops on AI, Data Analytics, and Machine Learning'
      ]
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Data Science Intern',
      company: 'RP2',
      location: 'Bangalore, India',
      period: 'Aug 2025 – Present',
      responsibilities: [
        'Developed and deployed Machine Learning and Deep Learning models.',
        'Solved real-world business problems using analytical thinking.',
        'Worked on Generative AI and NLP.',
        'Collaborated with cross-functional teams for data-driven decisions.'
      ],
      techStack: ['Python', 'Generative AI', 'NLP', 'Machine Learning', 'Deep Learning', 'Business Analytics'],
      featured: true
    },
    {
      id: 'exp-2',
      role: 'Data Science Intern',
      company: '1 Stop',
      location: 'India',
      period: 'Jul 2024 – Sep 2024',
      responsibilities: [
        'Performed data cleaning, analysis, and visualization using Python.',
        'Applied ML and DL techniques on real datasets.',
        'Explored emerging AI tools and algorithms.'
      ],
      techStack: ['Python', 'EDA', 'Data Cleaning', 'Data Visualization', 'Machine Learning', 'Deep Learning'],
      featured: true
    },
    {
      id: 'exp-3',
      role: 'Data Science Intern',
      company: 'SkillHacc',
      location: 'India',
      period: 'Jun 2023 – Aug 2023',
      responsibilities: [
        'Built ML/DL models for predictive analysis.',
        'Applied data preprocessing and statistical modeling.',
        'Delivered insights through team projects.'
      ],
      techStack: ['Predictive Analytics', 'Machine Learning', 'Data Preprocessing', 'Statistical Modeling', 'Python'],
      featured: true
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Netflix Data Analysis',
      subtitle: 'Content Trends & Viewer Behavioral Insights',
      description: 'Analyzed extensive Netflix global catalog datasets to identify content production shifts, genre popularity, and rating distributions across countries.',
      heroImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=1000',
      overview: 'Comprehensive exploratory data analysis on 8,800+ Netflix titles to discover content patterns, director frequency, movie-to-TV show ratios, and international additions.',
      problem: 'Streaming platforms face intense competition in content acquisition. Identifying viewer consumption patterns and optimal release timing requires high-volume data granularity.',
      solution: 'Developed an automated Python analytics pipeline using Pandas, Matplotlib, and Seaborn. Cleaned missing metadata and created interactive visual metrics for content strategists.',
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'EDA', 'Data Cleaning', 'Business Analytics'],
      businessValue: 'Provides data-backed recommendations on high-yield genres, optimal release months, and strategic content licensing allocations.',
      results: [
        'Analyzed Netflix dataset to identify trends in content type, genre, and release patterns.',
        'Performed data cleaning, preprocessing, and exploratory data analysis (EDA) using Python.',
        'Visualized insights using Matplotlib and Seaborn dashboards.',
        'Extracted business insights to understand user preferences and platform growth.'
      ],
      githubUrl: 'https://github.com/tejaswini-pamula/netflix-data-analysis',
      liveDemoUrl: '#demo-netflix',
      featured: true,
      category: 'Data Analytics'
    },
    {
      id: 'proj-2',
      title: 'Uber Data Analysis',
      subtitle: 'Ride Demand & Operational Efficiency Modeling',
      description: 'Analyzed Uber trip datasets to model peak traffic hours, geographic trip density, and driver allocation optimization.',
      heroImage: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=1000',
      overview: 'Investigated ride frequency across weekdays, hours, and pickup locations to isolate trip duration anomalies and surge pricing triggers.',
      problem: 'Urban mobility services suffer from driver misallocations during unexpected rush hours, leading to high wait times and lost trip revenue.',
      solution: 'Applied spatial-temporal cluster analysis and time-series aggregation to pinpoint high-demand surge corridors and passenger movement trends.',
      technologies: ['Python', 'EDA', 'Statistical Modeling', 'Seaborn', 'Peak Hour Analysis', 'Ride Pattern Modeling'],
      businessValue: 'Enables ride-hailing platforms to optimize driver dispatching schedules, reduce rider waiting times by up to 22%, and maximize driver earnings.',
      results: [
        'Analyzed Uber trip data to study ride patterns, peak hours, and demand trends.',
        'Performed data cleaning, preprocessing, and exploratory data analysis (EDA) using Python.',
        'Visualized trip distribution and customer behavior using Matplotlib and Seaborn.',
        'Generated actionable insights to improve operational efficiency and service planning.'
      ],
      githubUrl: 'https://github.com/tejaswini-pamula/uber-trip-analysis',
      liveDemoUrl: '#demo-uber',
      featured: true,
      category: 'Data Analytics'
    },
    {
      id: 'proj-3',
      title: 'YouTube Summarizer',
      subtitle: 'AI-Powered Video Transcript Processing',
      description: 'Built an NLP application that extracts YouTube video transcripts and generates concise, structured executive summaries using Python and modern NLP models.',
      heroImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000',
      overview: 'A fast summarization tool designed for students and researchers to digest long video lectures, podcasts, and keynotes in seconds.',
      problem: 'Long video content consumes immense time. Users often need key takeaways without manually skimming through hours of video footage.',
      solution: 'Utilized YouTube Transcript API combined with Hugging Face transformers and Gemini APIs to auto-extract text and synthesize bulleted insights.',
      technologies: ['Python', 'NLP', 'Transformers', 'YouTube API', 'Gemini AI', 'Text Summarization', 'FastAPI'],
      businessValue: 'Saves users over 75% of video review time by delivering bulleted key points, action items, and topic segmentation.',
      results: [
        'Built an NLP system to summarize YouTube transcripts.',
        'Integrated YouTube API with Python.',
        'Improved content consumption efficiency.'
      ],
      githubUrl: 'https://github.com/tejaswini-pamula/youtube-transcript-summarizer',
      liveDemoUrl: '#demo-youtube',
      featured: true,
      category: 'NLP / GenAI'
    },
    {
      id: 'proj-4',
      title: 'Smart Traffic Signaling System',
      subtitle: 'AI & IoT Real-Time Density Optimization',
      description: 'Designed an intelligent traffic signal management solution using computer vision vehicle density detection and dynamic signal timing algorithms.',
      heroImage: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&q=80&w=1000',
      overview: 'A smart city initiative aimed at replacing rigid fixed-timer traffic lights with adaptive real-time vehicle density sensors.',
      problem: 'Fixed traffic signal timers cause unnecessary idling and congestion at clear intersections while emergency vehicles get stuck in bottlenecks.',
      solution: 'Engineered an AI-driven image processing module that calculates lane vehicle count in real time and dynamically updates green signal durations.',
      technologies: ['AI', 'IoT', 'Python', 'OpenCV', 'Dynamic Traffic Control', 'Smart City Solution', 'Sensor Analytics'],
      businessValue: 'Reduces urban junction congestion by 35%, lowers vehicle carbon emissions, and provides automated green corridors for emergency responders.',
      results: [
        'Designed smart traffic optimization system.',
        'Used IoT sensors for vehicle density detection.',
        'Implemented dynamic traffic algorithms.'
      ],
      githubUrl: 'https://github.com/tejaswini-pamula/smart-traffic-signaling-ai',
      liveDemoUrl: '#demo-traffic',
      featured: true,
      category: 'IoT & AI'
    }
  ],
  skillCategories: [
    {
      categoryName: 'Programming',
      skills: [
        { name: 'Python', level: 'Expert' },
        { name: 'SQL', level: 'Expert' },
        { name: 'Data Structures & Algorithms', level: 'Advanced' },
        { name: 'OOP & Modular Code', level: 'Advanced' }
      ]
    },
    {
      categoryName: 'Machine Learning',
      skills: [
        { name: 'Scikit-learn', level: 'Expert' },
        { name: 'Supervised & Unsupervised ML', level: 'Expert' },
        { name: 'Feature Engineering', level: 'Advanced' },
        { name: 'Model Evaluation & Tuning', level: 'Advanced' }
      ]
    },
    {
      categoryName: 'Deep Learning',
      skills: [
        { name: 'TensorFlow', level: 'Advanced' },
        { name: 'PyTorch', level: 'Advanced' },
        { name: 'Convolutional Neural Networks (CNNs)', level: 'Advanced' },
        { name: 'Recurrent Neural Networks (RNNs)', level: 'Advanced' }
      ]
    },
    {
      categoryName: 'Generative AI',
      skills: [
        { name: 'Large Language Models (LLMs)', level: 'Advanced' },
        { name: 'Retrieval-Augmented Generation (RAG)', level: 'Advanced' },
        { name: 'Prompt Engineering', level: 'Expert' },
        { name: 'OpenAI & Gemini APIs', level: 'Advanced' }
      ]
    },
    {
      categoryName: 'NLP',
      skills: [
        { name: 'Natural Language Processing', level: 'Advanced' },
        { name: 'Transformers & Hugging Face', level: 'Advanced' },
        { name: 'Text Summarization & Tokenization', level: 'Expert' },
        { name: 'Sentiment Analysis', level: 'Advanced' }
      ]
    },
    {
      categoryName: 'Visualization',
      skills: [
        { name: 'Matplotlib', level: 'Expert' },
        { name: 'Seaborn', level: 'Expert' },
        { name: 'Plotly & Interactive Charts', level: 'Advanced' },
        { name: 'Exploratory Data Analysis (EDA)', level: 'Expert' }
      ]
    },
    {
      categoryName: 'Databases',
      skills: [
        { name: 'PostgreSQL & MySQL', level: 'Expert' },
        { name: 'Relational Database Design', level: 'Advanced' },
        { name: 'Data Cleaning & Preprocessing', level: 'Expert' },
        { name: 'Data Pipeline Automation', level: 'Advanced' }
      ]
    },
    {
      categoryName: 'Business Intelligence',
      skills: [
        { name: 'Power BI & Tableau', level: 'Advanced' },
        { name: 'Executive Metrics & KPIs', level: 'Expert' },
        { name: 'Predictive Business Insights', level: 'Expert' },
        { name: 'Statistical Correlation Analysis', level: 'Advanced' }
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Data Science Internship Certification',
      issuer: 'RP2, Bangalore',
      issueDate: '2025',
      verificationLink: '#verify-rp2',
      credentialId: 'RP2-DS-2025-084',
      imageUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'cert-2',
      title: 'Machine Learning & Deep Learning Internship',
      issuer: '1 Stop',
      issueDate: '2024',
      verificationLink: '#verify-1stop',
      credentialId: '1STOP-ML-8841',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'cert-3',
      title: 'Cybersecurity & Data Science Internship',
      issuer: 'SkillHacc',
      issueDate: '2023',
      verificationLink: '#verify-skillhacc',
      credentialId: 'SKILL-DS-5092',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'RAG & LLM Fine-Tuning AI Research',
      category: 'Research',
      description: 'Explored advanced Generative AI architectures including Retrieval-Augmented Generation (RAG) and open-source model fine-tuning techniques.',
      year: '2025'
    },
    {
      id: 'ach-2',
      title: 'Eco-Friendly Association Coordinator',
      category: 'Leadership',
      description: 'Served as Lead Coordinator for the campus Eco-Friendly Association at SVECW, spearheading sustainability awareness and eco-drives.',
      year: '2024'
    },
    {
      id: 'ach-3',
      title: 'Environmental Campaign Leadership',
      category: 'Environmental',
      description: 'Organized plastic-free initiatives and tree plantation campaigns engaging over 500+ student volunteers.',
      year: '2024'
    },
    {
      id: 'ach-4',
      title: 'AI & Data Analytics Workshops',
      category: 'Workshops',
      description: 'Participated in and hosted intensive national workshops on Machine Learning, Neural Networks, and Data Visualization.',
      year: '2023 – 2024'
    }
  ],
  contactMessages: [
    {
      id: 'msg-1',
      name: 'Priya Sharma',
      email: 'priya.sharma@techcorp.in',
      subject: 'Data Analyst Role Inquiry',
      message: 'Hi Tejaswini, I reviewed your Netflix & Uber data analysis projects. We are looking for a Data Analyst with strong Python & EDA skills. Let us connect!',
      timestamp: '2026-08-01 14:30',
      isRead: false
    },
    {
      id: 'msg-2',
      name: 'Rohan Mehta',
      email: 'rohan@ailabs.io',
      subject: 'Collaboration on GenAI Summarizer',
      message: 'Impressive work on the YouTube transcript summarizer! Would love to chat about extending it for podcasts.',
      timestamp: '2026-07-28 09:15',
      isRead: true
    }
  ],
  mediaLibrary: [
    {
      id: 'media-1',
      name: 'Tejaswini_Pamula_Resume.pdf',
      url: '/Tejaswini_Pamula_Resume.pdf',
      type: 'pdf',
      size: '240 KB',
      uploadedAt: '2026-08-15',
      usedInSection: 'Resume → Main Resume Document',
      altText: 'Tejaswini Pamula Official Resume 2026',
      description: 'Primary verified PDF resume document with academic credentials and internship history.'
    },
    {
      id: 'media-2',
      name: 'Netflix_EDA_Dashboard.png',
      url: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=1000',
      type: 'image',
      size: '1.2 MB',
      uploadedAt: '2026-08-10',
      usedInSection: 'Projects → Netflix Data Analysis',
      altText: 'Netflix Global Catalog Trends Dashboard',
      description: 'Seaborn & Matplotlib analytics chart visualization for global streaming catalog distributions.'
    },
    {
      id: 'media-3',
      name: 'Uber_Demand_Spatial_Model.png',
      url: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=1000',
      type: 'image',
      size: '980 KB',
      uploadedAt: '2026-08-08',
      usedInSection: 'Projects → Uber Data Analysis',
      altText: 'Uber Rush Hour Density Heatmap',
      description: 'Spatial-temporal cluster analysis showing peak passenger demand corridors.'
    },
    {
      id: 'media-4',
      name: 'YouTube_Summarizer_UI.png',
      url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000',
      type: 'image',
      size: '1.4 MB',
      uploadedAt: '2026-08-05',
      usedInSection: 'Projects → YouTube Summarizer',
      altText: 'NLP Transcript Summarization Engine',
      description: 'Hugging Face and Gemini AI powered video breakdown interface.'
    },
    {
      id: 'media-5',
      name: 'RP2_DataScience_Cert.png',
      url: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=600',
      type: 'image',
      size: '620 KB',
      uploadedAt: '2026-08-01',
      usedInSection: 'Certifications → RP2 Internship',
      altText: 'RP2 Machine Learning Internship Certificate',
      description: 'Official verified internship credential from RP2 Bangalore.'
    },
    {
      id: 'media-6',
      name: 'Profile_Headshot_Tejaswini.png',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      type: 'image',
      size: '450 KB',
      uploadedAt: '2026-07-20',
      usedInSection: 'Hero & About → Main Profile Photo',
      altText: 'Tejaswini Pamula Profile Portrait',
      description: 'High-resolution professional avatar displayed across Hero and About sections.'
    }
  ],
  seoSettings: {
    metaTitle: 'Tejaswini Pamula | Data Analyst & AI Engineer Portfolio',
    metaDescription: 'Official portfolio of Tejaswini Pamula - Computer Science Engineer, Data Analyst, ML & Generative AI Specialist.',
    keywords: 'Tejaswini Pamula, Data Analyst, Data Scientist, Machine Learning, Generative AI, Python, SQL, NLP, Rajahmundry, SVECW',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    googleAnalyticsId: 'G-TPAMULA2026',
    clarityId: 'CLR-98214-TP'
  },
  userRoles: [
    {
      id: 'role-admin-primary',
      name: 'Primary Administrator',
      email: 'poosala15@gmail.com',
      role: 'Admin'
    },
    {
      id: 'role-1',
      name: 'Tejaswini Pamula',
      email: 'tejaswinitejp@gmail.com',
      role: 'Admin'
    },
    {
      id: 'role-2',
      name: 'Tejaswini Pamula (Alt)',
      email: 'tejaswiniteja793@gmail.com',
      role: 'Admin'
    },
    {
      id: 'role-3',
      name: 'Admin',
      email: 'admin@tejaswini.ai',
      role: 'Admin'
    }
  ]
};
