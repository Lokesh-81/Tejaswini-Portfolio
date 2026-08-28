import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = doc.internal.pageSize.getWidth(); // 210
const margin = 15;
const contentWidth = pageWidth - margin * 2;
let y = 18;

function checkPageBreak(neededHeight = 10) {
  if (y + neededHeight > 280) {
    doc.addPage();
    y = 18;
  }
}

// Title
doc.setFont('helvetica', 'bold');
doc.setFontSize(20);
doc.text('TEJASWINI PAMULA', pageWidth / 2, y, { align: 'center' });
y += 7;

// Contact info
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(50, 50, 50);
doc.text('Email: tejaswinitejp@gmail.com | tejaswiniteja793@gmail.com', pageWidth / 2, y, { align: 'center' });
y += 5;
doc.text('Mobile: +91 6309852003  |  Location: Rajahmundry, India (533101)', pageWidth / 2, y, { align: 'center' });
y += 5;
doc.setTextColor(0, 80, 180);
doc.text('LinkedIn: linkedin.com/in/pamula-tejaswini', pageWidth / 2, y, { align: 'center' });
doc.setTextColor(0, 0, 0);
y += 8;

// Helper section header
function addSectionHeader(title) {
  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(title.toUpperCase(), margin, y);
  y += 2;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;
}

// EDUCATION
addSectionHeader('Education');
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.text('B.Tech in Computer Science & Engineering', margin, y);
doc.setFont('helvetica', 'normal');
doc.text('2021 – 2025', pageWidth - margin, y, { align: 'right' });
y += 4.5;
doc.setFontSize(9);
doc.text('Shri Vishnu Engineering College for Women, Bhimavaram', margin, y);
y += 4;
doc.setFont('helvetica', 'bold');
doc.text('CGPA: 7.43', margin, y);
y += 7;

// INTERNSHIPS AND WORK EXPERIENCE
addSectionHeader('Internships and Work Experience');

const exps = [
  {
    role: 'Data Science Intern, RP2 (Bangalore)',
    period: 'Aug 2025 – Present',
    bullets: [
      'Developed and deployed Machine Learning and Deep Learning models.',
      'Solved real-world business problems using analytical thinking.',
      'Worked on Generative AI and NLP.',
      'Collaborated with cross-functional teams for data-driven decisions.'
    ]
  },
  {
    role: 'Data Science Intern, 1 Stop',
    period: 'Jul 2024 – Sep 2024',
    bullets: [
      'Performed data cleaning, analysis, and visualization using Python.',
      'Applied ML and DL techniques on real datasets.',
      'Explored emerging AI tools and algorithms.'
    ]
  },
  {
    role: 'Data Science Intern, SkillHacc',
    period: 'Jun 2023 – Aug 2023',
    bullets: [
      'Built ML/DL models for predictive analysis.',
      'Applied data preprocessing and statistical modeling.',
      'Delivered insights through team projects.'
    ]
  }
];

exps.forEach((exp) => {
  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(exp.role, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
  y += 4.5;

  exp.bullets.forEach((bullet) => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('•  ' + bullet, margin + 3, y);
    y += 4;
  });
  y += 2;
});

// PROJECTS
addSectionHeader('Projects');

const projects = [
  {
    title: 'Netflix Data Analysis (Data Science)',
    year: '2025',
    bullets: [
      'Analyzed Netflix dataset to identify trends in content type, genre, and release patterns.',
      'Performed data cleaning, preprocessing, and exploratory data analysis (EDA) using Python.',
      'Visualized insights using Matplotlib and Seaborn dashboards.',
      'Extracted business insights to understand user preferences and platform growth.'
    ]
  },
  {
    title: 'Uber Data Analysis (Data Science)',
    year: '2025',
    bullets: [
      'Analyzed Uber trip data to study ride patterns, peak hours, and demand trends.',
      'Performed data cleaning, preprocessing, and exploratory data analysis (EDA) using Python.',
      'Visualized trip distribution and customer behavior using Matplotlib and Seaborn.',
      'Generated actionable insights to improve operational efficiency and service planning.'
    ]
  },
  {
    title: 'YouTube Summarizer (NLP)',
    year: '2024',
    bullets: [
      'Built an NLP system to summarize YouTube transcripts.',
      'Integrated YouTube API with Python.',
      'Improved content consumption efficiency.'
    ]
  },
  {
    title: 'Smart Traffic Signaling System (IoT + AI)',
    year: '2023',
    bullets: [
      'Designed smart traffic optimization system.',
      'Used IoT sensors for vehicle density detection.',
      'Implemented dynamic traffic algorithms.'
    ]
  }
];

projects.forEach((p) => {
  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(p.title, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(p.year, pageWidth - margin, y, { align: 'right' });
  y += 4.5;

  p.bullets.forEach((bullet) => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('•  ' + bullet, margin + 3, y);
    y += 4;
  });
  y += 2;
});

// PAGE 2
checkPageBreak(30);

// COURSES AND CERTIFICATIONS
addSectionHeader('Courses and Certifications');
const certs = [
  'Data Science Internship — RP2',
  'Machine Learning & Deep Learning Internship — 1 Stop',
  'Cybersecurity & Data Science Internship — SkillHacc'
];
certs.forEach((c) => {
  checkPageBreak(5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('•  ' + c, margin + 3, y);
  y += 4.5;
});
y += 3;

// TECHNICAL SKILLS
addSectionHeader('Technical Skills');
const skills = [
  ['Programming:', 'Python, SQL'],
  ['ML/DL Frameworks:', 'TensorFlow, PyTorch, Scikit-learn'],
  ['Generative AI & NLP:', 'LLMs (GPT), NLP Pipelines'],
  ['Data Technologies:', 'Data Warehouses, Data Lakes'],
  ['Other Tools:', 'DevOps, Data Visualization, Statistical Modeling']
];

skills.forEach(([label, val]) => {
  checkPageBreak(5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(label, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(val, margin + 40, y);
  y += 4.5;
});
y += 3;

// EXTRA CURRICULAR
addSectionHeader('Extra Curricular Activities and Achievements');
const extras = [
  'Exploring advanced AI techniques such as RAG and fine-tuning.',
  'Participated in research-oriented and team-based internships.',
  'Served as Coordinator of an Eco-Friendly Association, organizing environmental awareness programs and sustainability initiatives.',
  'Led campaigns on waste management, plastic reduction, and green practices within the community.',
  'Attended workshops and training programs on Artificial Intelligence and Data Analysis to enhance practical and technical skills.'
];

extras.forEach((ext) => {
  checkPageBreak(6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const splitText = doc.splitTextToSize('•  ' + ext, contentWidth - 3);
  doc.text(splitText, margin + 3, y);
  y += splitText.length * 4 + 1;
});

// Save to public directory
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(path.join(publicDir, 'Tejaswini_Pamula_Resume.pdf'), pdfBuffer);
console.log('Successfully generated public/Tejaswini_Pamula_Resume.pdf');
