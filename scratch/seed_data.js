const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnv = (key) => {
  const match = envContent.match(new RegExp(`${key}=(.*)`));
  return match ? match[1].trim() : null;
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseServiceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const staticPersonalInfo = {
  id: 1,
  name: "Timon Biswas",
  tagline: "CSE Student · AI & ML Enthusiast · Competitive Programmer · Vocalist",
  bio: "I am a student of the Computer Science and Engineering (CSE) department at Shanto-Mariam University of Creative Technology. I'm passionate about coding and software development. My goal is to specialize in Artificial Intelligence (AI) and create intelligent systems that can enhance human capabilities and solve real-world problems.",
  bio_extended: "I have a strong foundation in programming languages such as C, C++, and Java, and I am currently learning Android development and exploring AI and machine learning technologies. I believe in continuous learning and always aim to improve my skills. In addition to my academic pursuits, I am also involved in competitive programming on platforms like Codeforces.",
  location: "Dhaka, Bangladesh",
  email: "timonbiswas33@gmail.com",
  phone: "+8801779976858",
  profile_image: "/images/profile.jpg",
  logo_image: "/images/logo.png",
  university: "Shanto-Mariam University of Creative Technology",
  student_id: "241071015",
  batch: "34th",
  stats: {
    certificates: "4+",
    icpc_rank: "Honorable Mention",
    languages: "Java/C++/PHP",
    projects: "14+",
    siteCopy: {
      heroEyebrow: "Clean 3D portfolio refresh",
      heroSummary: "A clean, professional portfolio built with stronger depth, sharper hierarchy, and a more polished 3D presence.",
      heroPanelTitle: "Designing with depth",
      heroPanelSubtitle: "Profile Focus",
      aboutLabel: "01 // The Journey",
      aboutTitle: "Engineering with Purpose & Precision.",
      skillsLabel: "02 // The Stack",
      skillsTitle: "Technical Expertise",
      projectsLabel: "03 // The Forge",
      projectsTitle: "Selected Creations",
      experienceLabel: "04 // The Tenure",
      experienceTitle: "Professional Path",
      educationLabel: "05 // The Foundation",
      educationTitle: "Academic Background",
      achievementsLabel: "06 // The Recognition",
      achievementsTitle: "Awards & Certificates",
      contactLabel: "09 // The Connection",
      contactTitle: "Let's build the exceptional together.",
      contactSummary: "Currently seeking new opportunities and architectural challenges. If you have a project in mind, let's start the conversation.",
    },
  },
  announcement: {
    text: "Open to opportunities!",
    link: "",
    active: true
  }
};

const staticSocialLinks = [
  { label: "GitHub", url: "https://github.com/Ti838", icon: "FiGithub", sort_order: 1 },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/timon-biswas-83493a328/", icon: "FiLinkedin", sort_order: 2 },
  { label: "Codeforces", url: "https://codeforces.com/profile/Timon15", icon: "FiCode", sort_order: 3 },
  { label: "WhatsApp", url: "https://wa.me/+8801779976858", icon: "FiMessageCircle", sort_order: 4 },
];

const staticProjects = [
  {
    title: "Philomedis Mobile App",
    description: "A comprehensive medical management mobile application developed natively. Built to handle complex healthcare operations and patient records.",
    tags: ["Java", "Android SDK", "Firebase"],
    featured: true,
    github_url: "https://github.com/Ti838/philomedisMobile-app",
    status: "in-progress",
    sort_order: 1,
    slug: "philomedis-mobile",
    image_url: "/images/projects/philomedis-mobile.png"
  },
  {
    title: "Speed Guard",
    description: "A mobile application focused on tracking and safety, built entirely with Dart and Flutter for a seamless cross-platform experience.",
    tags: ["Dart", "Flutter"],
    featured: true,
    github_url: "https://github.com/Ti838/Speed-Guard",
    status: "completed",
    sort_order: 2,
    slug: "speed-guard",
    image_url: "/images/projects/speed-guard.png"
  },
  {
    title: "Hostel Management System",
    description: "A robust system for managing hostel operations, including resident tracking, allocations, and administrative tasks.",
    tags: ["JavaScript", "Full-Stack"],
    featured: true,
    github_url: "https://github.com/Ti838/Hostel-Management",
    status: "completed",
    sort_order: 3,
    slug: "hostel-management",
    image_url: "/images/projects/hostel-management.png"
  },
  {
    title: "Bank Transaction System",
    description: "A secure financial transaction simulation system with object-oriented architectures implemented in both PHP and Python.",
    tags: ["Python", "PHP"],
    featured: true,
    github_url: "https://github.com/Ti838/Bank-Transaction-system---python-version",
    status: "completed",
    sort_order: 4,
    slug: "bank-transaction",
    image_url: "/images/projects/bank-transaction.png"
  },
  {
    title: "Subscribly App",
    description: "A seamless subscription tracking and management platform offering deep insights into recurring costs and usage.",
    tags: ["JavaScript", "HTML", "CSS"],
    featured: true,
    github_url: "https://github.com/Ti838/Subscribly",
    status: "completed",
    sort_order: 5,
    slug: "subscribly",
    image_url: "/images/projects/subscribly.png"
  },
  {
    title: "Jerry AI Integration",
    description: "An interactive AI companion featuring real-time conversational intelligence with a clean web interface.",
    tags: ["JavaScript", "Artificial Intelligence", "CSS"],
    featured: true,
    github_url: "https://github.com/Ti838/jerry",
    status: "completed",
    sort_order: 6,
    slug: "jerry-ai",
    image_url: "/images/projects/jerry-ai.png"
  }
];

const staticSkillCategories = [
  { name: "Languages", sort_order: 1 },
  { name: "Frameworks & Tools", sort_order: 2 },
  { name: "Competitive Programming", sort_order: 3 },
  { name: "Creative Skills", sort_order: 4 },
];

const staticSkills = [
  { name: "Java", proficiency: 85, category: "Languages", sort_order: 1 },
  { name: "C/C++", proficiency: 90, category: "Languages", sort_order: 2 },
  { name: "JavaScript/TS", proficiency: 75, category: "Languages", sort_order: 3 },
  { name: "PHP", proficiency: 70, category: "Languages", sort_order: 4 },
  { name: "Python", proficiency: 60, category: "Languages", sort_order: 5 },
  { name: "Dart", proficiency: 55, category: "Languages", sort_order: 6 },
  
  { name: "Android SDK", proficiency: 70, category: "Frameworks & Tools", sort_order: 1 },
  { name: "Next.js", proficiency: 65, category: "Frameworks & Tools", sort_order: 2 },
  { name: "Flutter", proficiency: 50, category: "Frameworks & Tools", sort_order: 3 },
  { name: "Git & GitHub", proficiency: 85, category: "Frameworks & Tools", sort_order: 4 },
  
  { name: "Data Structures", proficiency: 80, category: "Competitive Programming", sort_order: 1 },
  { name: "Algorithms", proficiency: 78, category: "Competitive Programming", sort_order: 2 },
  { name: "Problem Solving", proficiency: 82, category: "Competitive Programming", sort_order: 3 },
  { name: "ICPC", proficiency: 70, category: "Competitive Programming", sort_order: 4 },
  
  { name: "Vocal Performance", proficiency: 75, category: "Creative Skills", sort_order: 1 },
  { name: "Stage Presence", proficiency: 70, category: "Creative Skills", sort_order: 2 },
];

const staticExperiences = [
  {
    title: "AI Developer — Jerry AI Voice Assistant",
    type: "work",
    duration: "2026 – Present",
    description: "Built an advanced voice assistant equipped with Hugging Face free AI models and PC/Android automation capabilities. Key features include background listening with a wake word and a unified server process.",
    tags: ["Python", "Hugging Face API", "AI Agent"],
    sort_order: 1
  },
  {
    title: "Full Stack Developer — Philomedis Web App",
    type: "work",
    duration: "2025 – Present",
    description: "Developed the core web infrastructure for Philomedis, a hospital management ecosystem. Implemented secure database schemas and responsive dashboard interfaces.",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
    sort_order: 2
  },
  {
    title: "Solo Developer — Philomedis Mobile App",
    type: "work",
    duration: "2026 – Present",
    description: "Developing a comprehensive medical management application designed to streamline hospital operations, including patient record management and appointment scheduling.",
    tags: ["Java", "Firebase", "Android Studio"],
    sort_order: 3
  },
  {
    title: "Full Stack Developer — Task Management System",
    type: "work",
    duration: "2026",
    description: "Developed a modern task management application featuring a Next.js drag-and-drop board, secure user authentication, and real-time database updates.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    sort_order: 4
  },
  {
    title: "Competitive Programmer (ICPC)",
    type: "competition",
    duration: "2023 – Present",
    description: "Actively participating in competitive programming on platforms like Codeforces and LeetCode. Earned an Honorable Mention at the ICPC Asia Dhaka Preliminary 2024.",
    tags: ["Codeforces", "LeetCode", "ICPC", "C++"],
    sort_order: 5
  },
];

const staticEducation = [
  {
    institution: "Shanto-Mariam University of Creative Technology",
    degree: "Bachelor of Science in Computer Science and Engineering (CSE)",
    field: "Science",
    duration: "2024 – Present",
    logo_url: "/images/university-logo.png",
    url: "https://smuct.ac.bd/",
    details: "Batch: 34th | Student ID: 241071015",
    sort_order: 1
  },
  {
    institution: "Notre Dame College, Mymensingh",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    duration: "Passed 2023",
    logo_url: "/images/college-logo.png",
    url: "https://ndcm.edu.bd/",
    details: "",
    sort_order: 2
  },
  {
    institution: "Osmanpur High School",
    degree: "Secondary School Certificate (SSC)",
    field: "Science",
    duration: "Passed 2021",
    logo_url: "/images/school-logo.jpg",
    details: "",
    sort_order: 3
  },
];

const staticAchievements = [
  {
    title: "ICPC Asia Dhaka Preliminary 2024",
    description: "Honorable Mention in the Online Preliminary Contest, 03 October – 09 November 2024, awarded by ICPC Executive Director William B. Poucher, Ph.D.",
    image_url: "/images/cert-icpc.png",
    category: "competitive-programming",
    date: "2024-11-09",
    issuer: "ICPC Foundation",
    sort_order: 1
  },
  {
    title: "Green Skills for Future Employability",
    description: "Successfully completed on 6th March 2025, instructed by Joya Chowdhury, Education Specialist, The World Bank.",
    image_url: "/images/cert-green-skills.png",
    category: "academic",
    date: "2025-03-06",
    issuer: "FutureNation / UNDP",
    sort_order: 2
  },
  {
    title: "The SDG Primer",
    description: "Completed on 14th October 2024, instructed by A. Z. M. Saleh, Monitoring & Evaluation Analyst, UNDP Bangladesh.",
    image_url: "/images/cert-sdg.png",
    category: "academic",
    date: "2024-10-14",
    issuer: "FutureNation / UNDP Bangladesh",
    sort_order: 3
  },
  {
    title: "English Online Self-Study: Daily Life (Level A2)",
    description: "Completed a 36-hour course on 24th February 2025, offered by the British Council.",
    image_url: "/images/cert-british-council.png",
    category: "academic",
    date: "2025-02-24",
    issuer: "British Council",
    sort_order: 4
  },
];

async function seed() {
  try {
    console.log('--- START SEEDING ---');

    // 1. Update personal_info (Row 1)
    console.log('Updating personal_info...');
    const { error: piError } = await supabase.from('personal_info').upsert(staticPersonalInfo);
    if (piError) throw new Error(`personal_info: ${piError.message}`);
    console.log('✅ personal_info seeded.');

    // Delete existing records to avoid duplicate keys or confusion
    console.log('Cleaning existing tables...');
    await supabase.from('social_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('skill_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('experiences').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('education').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('achievements').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('✅ Tables cleaned.');

    // 2. Seed social_links
    console.log('Seeding social_links...');
    const { error: slError } = await supabase.from('social_links').insert(staticSocialLinks);
    if (slError) throw new Error(`social_links: ${slError.message}`);
    console.log('✅ social_links seeded.');

    // 3. Seed skill_categories
    console.log('Seeding skill_categories...');
    const { data: categoriesData, error: catError } = await supabase.from('skill_categories').insert(staticSkillCategories).select();
    if (catError) throw new Error(`skill_categories: ${catError.message}`);
    console.log('✅ skill_categories seeded.');

    // Create a map of category name -> UUID
    const categoryMap = {};
    categoriesData.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    // 4. Seed skills
    console.log('Seeding skills...');
    const skillsToInsert = staticSkills.map(s => ({
      name: s.name,
      proficiency: s.proficiency,
      sort_order: s.sort_order,
      category_id: categoryMap[s.category]
    }));
    const { error: skillError } = await supabase.from('skills').insert(skillsToInsert);
    if (skillError) throw new Error(`skills: ${skillError.message}`);
    console.log('✅ skills seeded.');

    // 5. Seed projects (assign to Language or Framework category if needed, or leave category_id empty)
    console.log('Seeding projects...');
    const { error: projError } = await supabase.from('projects').insert(staticProjects);
    if (projError) throw new Error(`projects: ${projError.message}`);
    console.log('✅ projects seeded.');

    // 6. Seed experiences
    console.log('Seeding experiences...');
    const { error: expError } = await supabase.from('experiences').insert(staticExperiences);
    if (expError) throw new Error(`experiences: ${expError.message}`);
    console.log('✅ experiences seeded.');

    // 7. Seed education
    console.log('Seeding education...');
    const { error: eduError } = await supabase.from('education').insert(staticEducation);
    if (eduError) throw new Error(`education: ${eduError.message}`);
    console.log('✅ education seeded.');

    // 8. Seed achievements
    console.log('Seeding achievements...');
    const { error: achError } = await supabase.from('achievements').insert(staticAchievements);
    if (achError) throw new Error(`achievements: ${achError.message}`);
    console.log('✅ achievements seeded.');

    console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
  } catch (error) {
    console.error('❌ SEEDING FAILED:', error.message);
    process.exit(1);
  }
}

seed();
