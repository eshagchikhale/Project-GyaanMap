# career_data.py
CAREER_ALIASES = {
    "cricketer": "sportsperson",
    "footballer": "sportsperson",
    "athlete": "sportsperson",
    "ui designer": "ui ux designer",
    "ux designer": "ui ux designer",
    "app designer": "ui ux designer",
    "apps designing": "ui ux designer"
}

CAREER_INFO= {

# ======================= STAGE 1 : COMPUTER SCIENCE & IT =======================

# -------- Software Development --------

"software engineer": {
    "domain": "Software Development",
    "tags": ["coding", "programming", "development", "software"],
    "description": [
        "Design, develop, and maintain software applications",
        "Collaborate with cross-functional teams to deliver solutions"
    ],
    "skills": ["Programming", "Problem-solving", "Data structures", "Algorithms", "Debugging"],
    "education": ["B.Tech/B.E in CS/IT", "M.Tech optional", "Certifications in programming languages"],
    "growth": "Junior Developer → Software Engineer → Senior Engineer → Tech Lead → Engineering Manager",
    "estimated_budget": "₹0–2 lakhs (degree + optional certifications)",
    "estimated_salary": "₹25k–50k/month (entry) → ₹2–4 LPM (senior)",
    "entrance_exams_required": ["University admission exams like JEE, GATE (optional for higher studies)"],
    "link": "https://www.computerscience.org/careers/software-engineer/",
    "related_careers": ["frontend developer", "backend developer", "full stack developer", "devops engineer"]
},

"frontend developer": {
    "domain": "Software Development",
    "tags": ["UI", "UX", "web", "javascript", "design"],
    "description": [
        "Develop and maintain website interfaces",
        "Ensure responsive and user-friendly designs"
    ],
    "skills": ["HTML", "CSS", "JavaScript", "React/Angular/Vue", "UI/UX design"],
    "education": ["B.Tech/B.E in CS/IT or Diploma in Web Development", "Frontend frameworks certifications"],
    "growth": "Junior Frontend Developer → Frontend Developer → Senior → Lead UI Engineer",
    "estimated_budget": "₹50k–1 lakh (courses + certifications)",
    "estimated_salary": "₹20k–40k/month → ₹1.5–3 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/frontend-developer",
    "related_careers": ["UI/UX designer", "software engineer", "full stack developer"]
},

"backend developer": {
    "domain": "Software Development",
    "tags": ["server", "database", "API", "programming"],
    "description": [
        "Develop server-side logic and APIs",
        "Maintain databases and ensure performance & scalability"
    ],
    "skills": ["Node.js", "Python/Java", "SQL/NoSQL", "APIs", "Security"],
    "education": ["B.Tech/B.E in CS/IT", "Backend development certifications optional"],
    "growth": "Junior Backend Developer → Backend Developer → Senior → Lead Engineer",
    "estimated_budget": "₹50k–1 lakh (courses + certifications)",
    "estimated_salary": "₹25k–45k/month → ₹2–4 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/backend-developer",
    "related_careers": ["database administrator", "software engineer", "devops engineer"]
},

"full stack developer": {
    "domain": "Software Development",
    "tags": ["frontend", "backend", "web", "database"],
    "description": [
        "Handle both frontend and backend of web applications",
        "Ensure seamless integration between UI and server"
    ],
    "skills": ["HTML/CSS/JS", "Node.js/Python/Java", "Databases", "REST APIs", "Version control"],
    "education": ["B.Tech/B.E in CS/IT", "Full Stack development bootcamps or certifications"],
    "growth": "Junior Full Stack Developer → Full Stack Developer → Senior → Lead Full Stack Engineer",
    "estimated_budget": "₹50k–2 lakhs (certifications + online courses)",
    "estimated_salary": "₹25k–50k/month → ₹2–4.5 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/full-stack-developer",
    "related_careers": ["frontend developer", "backend developer", "software engineer"]
},

# -------- Data & AI --------

"data scientist": {
    "domain": "Data Science & AI",
    "tags": ["data", "machine learning", "AI", "analytics"],
    "description": [
        "Analyze complex datasets to derive insights",
        "Build predictive models using machine learning"
    ],
    "skills": ["Python/R", "Machine Learning", "Statistics", "Data Visualization", "SQL"],
    "education": ["B.Tech/B.E in CS/IT or related field", "M.Tech/Data Science preferred", "ML certifications"],
    "growth": "Data Analyst → Data Scientist → Senior Data Scientist → AI/ML Lead → Chief Data Officer",
    "estimated_budget": "₹50k–2 lakhs (certifications + courses)",
    "estimated_salary": "₹30k–60k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": ["GATE CS (for higher studies)"],
    "link": "https://www.coursera.org/articles/data-scientist",
    "related_careers": ["machine learning engineer", "business analyst", "data engineer"]
},

"machine learning engineer": {
    "domain": "Data Science & AI",
    "tags": ["ML", "AI", "algorithms", "models"],
    "description": [
        "Design and deploy ML models for real-world applications",
        "Optimize algorithms for performance"
    ],
    "skills": ["Python", "TensorFlow/PyTorch", "Statistics", "Algorithms", "Data preprocessing"],
    "education": ["B.Tech/B.E in CS/IT", "ML certifications or M.Tech AI/ML"],
    "growth": "Junior ML Engineer → ML Engineer → Senior → ML Lead → AI Architect",
    "estimated_budget": "₹50k–2.5 lakhs (certifications + courses)",
    "estimated_salary": "₹35k–60k/month → ₹3–7 LPM (senior)",
    "entrance_exams_required": ["GATE CS for higher studies optional"],
    "link": "https://www.coursera.org/articles/machine-learning-engineer",
    "related_careers": ["data scientist", "AI researcher", "data engineer"]
},

"data engineer": {
    "domain": "Data Science & Big Data",
    "tags": ["database", "ETL", "data pipelines", "SQL"],
    "description": [
        "Build and maintain data pipelines",
        "Ensure data is structured, clean, and accessible for analytics"
    ],
    "skills": ["SQL/NoSQL", "Python/Java", "ETL tools", "Big Data frameworks like Hadoop/Spark"],
    "education": ["B.Tech/B.E in CS/IT", "Big Data certifications"],
    "growth": "Junior Data Engineer → Data Engineer → Senior → Lead Data Engineer",
    "estimated_budget": "₹50k–2 lakhs (certifications + courses)",
    "estimated_salary": "₹30k–55k/month → ₹3–5 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/data-engineer",
    "related_careers": ["data scientist", "machine learning engineer", "database administrator"]
},

# -------- Cybersecurity --------

"cybersecurity analyst": {
    "domain": "Cybersecurity",
    "tags": ["security", "network", "ethical hacking", "IT"],
    "description": [
        "Monitor and protect networks from cyber threats",
        "Analyze vulnerabilities and implement security measures"
    ],
    "skills": ["Network security", "Ethical hacking", "Python/PowerShell", "Firewall & IDS", "Incident response"],
    "education": ["B.Tech/B.E in CS/IT", "Certifications like CEH, CISSP, CompTIA Security+"],
    "growth": "Security Analyst → Senior Analyst → Security Engineer → Security Manager → CISO",
    "estimated_budget": "₹50k–3 lakhs (certifications + courses)",
    "estimated_salary": "₹25k–50k/month → ₹4–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/cybersecurity-analyst",
    "related_careers": ["penetration tester", "network security engineer", "security consultant"]
},

"penetration tester": {
    "domain": "Cybersecurity",
    "tags": ["ethical hacking", "security testing", "vulnerability assessment"],
    "description": [
        "Simulate cyber-attacks to find security weaknesses",
        "Report vulnerabilities and suggest mitigation strategies"
    ],
    "skills": ["Ethical hacking", "Python/JavaScript", "Network security", "Exploitation tools", "Reporting"],
    "education": ["B.Tech/B.E in CS/IT", "CEH or OSCP certifications"],
    "growth": "Junior Pen Tester → Penetration Tester → Senior → Lead Security Consultant",
    "estimated_budget": "₹50k–2.5 lakhs (certifications + courses)",
    "estimated_salary": "₹25k–45k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/penetration-tester",
    "related_careers": ["cybersecurity analyst", "ethical hacker", "security consultant"]
},

# -------- IT Infrastructure & Cloud --------

"cloud engineer": {
    "domain": "Cloud & IT Infrastructure",
    "tags": ["cloud", "AWS", "Azure", "DevOps"],
    "description": [
        "Design, deploy, and manage cloud infrastructure",
        "Optimize cloud performance and cost"
    ],
    "skills": ["AWS/Azure/GCP", "Linux", "Networking", "Scripting", "DevOps tools like Jenkins, Docker"],
    "education": ["B.Tech/B.E in CS/IT", "Cloud certifications (AWS, Azure, GCP)"],
    "growth": "Cloud Engineer → Senior Cloud Engineer → Cloud Architect → Cloud Manager",
    "estimated_budget": "₹50k–2 lakhs (certifications + courses)",
    "estimated_salary": "₹30k–60k/month → ₹4–7 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/cloud-engineer",
    "related_careers": ["DevOps engineer", "system administrator", "network engineer"]
},

"devops engineer": {
    "domain": "Cloud & IT Infrastructure",
    "tags": ["devops", "automation", "CI/CD", "cloud"],
    "description": [
        "Automate deployment and monitoring pipelines",
        "Collaborate between development and operations teams"
    ],
    "skills": ["CI/CD tools", "Docker/Kubernetes", "Scripting", "Cloud platforms", "Monitoring tools"],
    "education": ["B.Tech/B.E in CS/IT", "DevOps certifications optional"],
    "growth": "DevOps Engineer → Senior DevOps Engineer → Lead → DevOps Manager",
    "estimated_budget": "₹50k–2 lakhs (certifications + courses)",
    "estimated_salary": "₹30k–60k/month → ₹4–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/devops-engineer",
    "related_careers": ["cloud engineer", "system administrator", "software engineer"]
},

"network engineer": {
    "domain": "Networking & IT Infrastructure",
    "tags": ["network", "servers", "security", "IT"],
    "description": [
        "Design and maintain computer networks",
        "Monitor performance and troubleshoot network issues"
    ],
    "skills": ["Networking protocols", "Firewall configuration", "Router/Switch setup", "Troubleshooting", "Security"],
    "education": ["B.Tech/B.E in CS/IT", "CCNA/CCNP certifications"],
    "growth": "Junior Network Engineer → Network Engineer → Senior → Network Manager",
    "estimated_budget": "₹50k–1.5 lakhs (certifications + courses)",
    "estimated_salary": "₹25k–45k/month → ₹3–5 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/network-engineer",
    "related_careers": ["system administrator", "network security engineer", "cloud engineer"]
},

# -------- Emerging Roles --------

"ai researcher": {
    "domain": "Artificial Intelligence & Research",
    "tags": ["AI", "ML", "research", "deep learning"],
    "description": [
        "Conduct research in AI and machine learning algorithms",
        "Publish papers and contribute to AI innovations"
    ],
    "skills": ["Deep learning", "Python", "TensorFlow/PyTorch", "Mathematics", "Research methodology"],
    "education": ["B.Tech/B.E + M.Tech/PhD in AI/ML or CS"],
    "growth": "Research Assistant → AI Researcher → Senior Researcher → AI Scientist",
    "estimated_budget": "₹0.5–5 lakhs (higher studies + courses)",
    "estimated_salary": "₹40k–80k/month → ₹5–10 LPM (senior/PhD roles)",
    "entrance_exams_required": ["GATE CS", "IISc/IIIT admissions for higher studies"],
    "link": "https://www.coursera.org/articles/ai-researcher",
    "related_careers": ["machine learning engineer", "data scientist", "AI architect"]
},

"blockchain developer": {
    "domain": "Emerging Technologies",
    "tags": ["blockchain", "crypto", "smart contracts", "distributed ledger"],
    "description": [
        "Develop decentralized applications and smart contracts",
        "Work with blockchain protocols for business solutions"
    ],
    "skills": ["Solidity", "Ethereum", "Hyperledger", "Cryptography", "Web3.js"],
    "education": ["B.Tech/B.E in CS/IT", "Blockchain development courses/certifications"],
    "growth": "Junior Blockchain Developer → Blockchain Developer → Senior → Blockchain Architect",
    "estimated_budget": "₹50k–2 lakhs (courses + certifications)",
    "estimated_salary": "₹30k–60k/month → ₹4–8 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/blockchain-developer",
    "related_careers": ["crypto developer", "smart contract developer", "software engineer"]
},

"iot engineer": {
    "domain": "Emerging Technologies",
    "tags": ["IoT", "embedded systems", "sensors", "networking"],
    "description": [
        "Design and maintain Internet of Things systems",
        "Integrate sensors, devices, and cloud for smart solutions"
    ],
    "skills": ["Embedded C", "Python", "IoT platforms", "Networking", "Sensor integration"],
    "education": ["B.Tech/B.E in CS/IT/ECE", "IoT certifications"],
    "growth": "IoT Engineer → Senior IoT Engineer → Lead → IoT Architect",
    "estimated_budget": "₹50k–2 lakhs (courses + certifications)",
    "estimated_salary": "₹25k–50k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/iot-engineer",
    "related_careers": ["embedded systems engineer", "cloud engineer", "AI/ML engineer"]
},
# ======================= STAGE 2 : SPECIALIZED IT & EMERGING TECHNOLOGIES =======================

# -------- Game Development --------

"game developer": {
    "domain": "Game Development",
    "tags": ["game", "programming", "unity", "unreal", "graphics"],
    "description": [
        "Design and develop video games for various platforms",
        "Collaborate with artists, designers, and testers to create interactive experiences"
    ],
    "skills": ["C++/C#/Python", "Unity/Unreal Engine", "Game physics", "AI in games", "Graphics programming"],
    "education": ["B.Tech/B.E in CS/IT", "Game development certifications or diploma"],
    "growth": "Junior Game Developer → Game Developer → Senior Developer → Lead Designer → Game Director",
    "estimated_budget": "₹50k–2 lakhs (courses + certifications)",
    "estimated_salary": "₹20k–40k/month → ₹3–5 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/game-developer",
    "related_careers": ["game designer", "3D artist", "VR developer", "AI programmer"]
},

"game designer": {
    "domain": "Game Development",
    "tags": ["game", "design", "storytelling", "mechanics"],
    "description": [
        "Create game concepts, levels, and mechanics",
        "Focus on player experience and storytelling"
    ],
    "skills": ["Level design", "Storyboarding", "UI/UX", "Game mechanics", "Creativity"],
    "education": ["B.Tech/B.E in CS/IT or Design", "Game design courses"],
    "growth": "Junior Designer → Game Designer → Senior Designer → Lead Designer",
    "estimated_budget": "₹50k–1.5 lakhs (certifications + courses)",
    "estimated_salary": "₹20k–35k/month → ₹2.5–4.5 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/game-designer",
    "related_careers": ["game developer", "level designer", "narrative designer"]
},

# -------- AR/VR --------

"vr/ar developer": {
    "domain": "AR/VR Development",
    "tags": ["virtual reality", "augmented reality", "unity", "3D"],
    "description": [
        "Develop immersive AR/VR experiences for education, gaming, and enterprise",
        "Integrate 3D graphics and interactive elements"
    ],
    "skills": ["Unity/Unreal", "C#/C++", "3D modeling", "ARKit/ARCore", "UX design"],
    "education": ["B.Tech/B.E in CS/IT", "AR/VR specialization courses"],
    "growth": "Junior AR/VR Developer → AR/VR Developer → Senior → Lead → AR/VR Architect",
    "estimated_budget": "₹50k–2 lakhs (courses + certifications)",
    "estimated_salary": "₹25k–45k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/ar-vr-developer",
    "related_careers": ["game developer", "3D artist", "UX designer"]
},

# -------- Natural Language Processing --------

"nlp engineer": {
    "domain": "Artificial Intelligence & NLP",
    "tags": ["nlp", "ai", "python", "machine learning", "chatbots"],
    "description": [
        "Build models that understand and generate human language",
        "Develop chatbots, sentiment analysis, and language translation systems"
    ],
    "skills": ["Python", "NLP libraries (NLTK, SpaCy, Transformers)", "Machine Learning", "Deep Learning", "Text preprocessing"],
    "education": ["B.Tech/B.E in CS/IT", "M.Tech/Certifications in AI/NLP"],
    "growth": "Junior NLP Engineer → NLP Engineer → Senior → Lead NLP Scientist → AI Architect",
    "estimated_budget": "₹50k–2.5 lakhs (courses + certifications)",
    "estimated_salary": "₹30k–55k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": ["GATE CS (optional for higher studies)"],
    "link": "https://www.coursera.org/articles/nlp-engineer",
    "related_careers": ["machine learning engineer", "data scientist", "AI researcher"]
},

# -------- Quantum Computing --------

"quantum computing researcher": {
    "domain": "Quantum Computing",
    "tags": ["quantum", "research", "physics", "algorithms", "programming"],
    "description": [
        "Research and develop algorithms for quantum computers",
        "Work on quantum simulations and optimization problems"
    ],
    "skills": ["Quantum mechanics", "Qiskit/IBM Quantum", "Python", "Linear Algebra", "Problem-solving"],
    "education": ["B.Tech/B.E in CS/IT/Physics", "M.Tech/PhD in Quantum Computing or CS"],
    "growth": "Research Assistant → Quantum Computing Researcher → Senior Researcher → Quantum Scientist",
    "estimated_budget": "₹0.5–5 lakhs (higher studies + courses)",
    "estimated_salary": "₹40k–80k/month → ₹5–10 LPM (senior/PhD roles)",
    "entrance_exams_required": ["GATE CS/Physics", "IISc/IIIT PhD entrance exams"],
    "link": "https://www.coursera.org/articles/quantum-computing-researcher",
    "related_careers": ["AI researcher", "ML engineer", "Quantum algorithm developer"]
},

# -------- Robotics --------

"robotics engineer": {
    "domain": "Robotics & Automation",
    "tags": ["robotics", "automation", "AI", "mechanical", "embedded systems"],
    "description": [
        "Design and build robots for industrial, healthcare, and consumer applications",
        "Integrate sensors, actuators, and AI algorithms"
    ],
    "skills": ["C/C++", "Python", "ROS", "Embedded Systems", "Mechanical Design", "AI/ML for Robotics"],
    "education": ["B.Tech/B.E in CS/IT/Mechatronics/ECE", "Robotics certifications or M.Tech"],
    "growth": "Junior Robotics Engineer → Robotics Engineer → Senior → Lead Engineer → Robotics Architect",
    "estimated_budget": "₹50k–3 lakhs (certifications + courses)",
    "estimated_salary": "₹25k–50k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/robotics-engineer",
    "related_careers": ["automation engineer", "embedded systems engineer", "AI engineer"]
},

"automation engineer": {
    "domain": "Robotics & Automation",
    "tags": ["automation", "industrial robots", "PLC", "AI"],
    "description": [
        "Develop automated systems for manufacturing and services",
        "Program robots and industrial controllers"
    ],
    "skills": ["PLC programming", "Python/C++", "Industrial Robotics", "Sensors & Actuators", "AI/ML basics"],
    "education": ["B.Tech/B.E in CS/IT/Mechatronics/ECE", "Automation certifications"],
    "growth": "Junior Automation Engineer → Automation Engineer → Senior → Lead → Automation Architect",
    "estimated_budget": "₹50k–2 lakhs (courses + certifications)",
    "estimated_salary": "₹25k–45k/month → ₹3–5 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/automation-engineer",
    "related_careers": ["robotics engineer", "IoT engineer", "embedded systems engineer"]
},

# -------- Edge Computing & IoT --------

"edge computing engineer": {
    "domain": "IoT & Edge Computing",
    "tags": ["edge computing", "IoT", "cloud", "AI"],
    "description": [
        "Develop systems that process data at the network edge",
        "Reduce latency and improve real-time decision-making"
    ],
    "skills": ["Python", "IoT platforms", "Cloud services", "Networking", "Embedded Systems"],
    "education": ["B.Tech/B.E in CS/IT/ECE", "Edge/IoT certifications"],
    "growth": "Junior Edge Engineer → Edge Engineer → Senior → Lead → IoT/Edge Architect",
    "estimated_budget": "₹50k–2 lakhs (courses + certifications)",
    "estimated_salary": "₹25k–45k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/edge-computing-engineer",
    "related_careers": ["IoT engineer", "cloud engineer", "robotics engineer"]
},
# ======================= STAGE 3 : INTERDISCIPLINARY & FUTURE-FACING IT ROLES =======================

# -------- FinTech & Blockchain --------

"crypto analyst": {
    "domain": "FinTech & Blockchain",
    "tags": ["crypto", "blockchain", "finance", "analysis"],
    "description": [
        "Analyze cryptocurrency trends, market movements, and blockchain projects",
        "Provide insights for investment and risk management"
    ],
    "skills": ["Blockchain fundamentals", "Python/SQL", "Crypto analytics tools", "Finance basics"],
    "education": ["B.Tech/B.E in CS/IT", "Certifications in Blockchain/Finance"],
    "growth": "Junior Analyst → Crypto Analyst → Senior Analyst → Blockchain Strategy Lead",
    "estimated_budget": "₹50k–1.5 lakhs (certifications + courses)",
    "estimated_salary": "₹30k–50k/month → ₹4–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/crypto-analyst",
    "related_careers": ["blockchain developer", "financial analyst", "smart contract developer"]
},

"quantitative analyst (quant)": {
    "domain": "FinTech & Data Analytics",
    "tags": ["quant", "finance", "algorithms", "data analysis"],
    "description": [
        "Develop algorithms for financial trading and risk management",
        "Analyze large financial datasets to make predictions"
    ],
    "skills": ["Python/R", "Machine Learning", "Statistics", "Finance", "Algorithmic trading"],
    "education": ["B.Tech/B.E in CS/IT/Maths/Finance", "M.Tech/Masters in Quantitative Finance optional"],
    "growth": "Junior Quant → Quant Analyst → Senior → Quant Lead → Chief Quantitative Strategist",
    "estimated_budget": "₹0.5–3 lakhs (courses + certifications)",
    "estimated_salary": "₹50k–1 LPM → ₹5–10 LPM (senior roles in top firms)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/quantitative-analyst",
    "related_careers": ["data scientist", "financial analyst", "ML engineer"]
},

# -------- Bioinformatics & HealthTech --------

"bioinformatics engineer": {
    "domain": "Healthcare & AI",
    "tags": ["bioinformatics", "genomics", "data science", "healthcare"],
    "description": [
        "Analyze biological data using computational tools",
        "Develop software for genomics, proteomics, and drug discovery"
    ],
    "skills": ["Python/R", "Machine Learning", "Genomics/Biology knowledge", "Data analysis", "Algorithms"],
    "education": ["B.Tech/B.E in CS/IT/Bioinformatics", "M.Tech/Bioinformatics preferred"],
    "growth": "Junior Bioinformatics Engineer → Bioinformatics Engineer → Senior → Lead Scientist → Bioinformatics Architect",
    "estimated_budget": "₹50k–2 lakhs (certifications + courses)",
    "estimated_salary": "₹25k–45k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": ["GATE CS/Bioinformatics for higher studies"],
    "link": "https://www.coursera.org/articles/bioinformatics-engineer",
    "related_careers": ["data scientist", "computational biologist", "ML engineer"]
},

"healthcare data analyst": {
    "domain": "Healthcare & Data Science",
    "tags": ["healthcare", "analytics", "data", "AI"],
    "description": [
        "Analyze patient and clinical data to improve outcomes",
        "Develop predictive models for healthcare interventions"
    ],
    "skills": ["Python/R", "SQL", "Statistics", "Healthcare domain knowledge", "Data visualization"],
    "education": ["B.Tech/B.E in CS/IT/Healthcare IT", "Certifications in Health Informatics/Data Analytics"],
    "growth": "Junior Analyst → Healthcare Data Analyst → Senior → Lead Data Scientist",
    "estimated_budget": "₹50k–1.5 lakhs (certifications + courses)",
    "estimated_salary": "₹25k–45k/month → ₹3–5 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/healthcare-data-analyst",
    "related_careers": ["data scientist", "bioinformatics engineer", "AI engineer"]
},

# -------- Robotics & Autonomous Systems --------

"autonomous vehicle engineer": {
    "domain": "Robotics & AI",
    "tags": ["self-driving", "autonomous", "AI", "robotics", "sensors"],
    "description": [
        "Develop autonomous navigation systems for vehicles",
        "Integrate AI, sensor fusion, and robotics for self-driving applications"
    ],
    "skills": ["Python/C++", "ROS", "Computer Vision", "Sensor fusion", "Machine Learning"],
    "education": ["B.Tech/B.E in CS/IT/ECE/Mechatronics", "Certifications in AI/Robotics"],
    "growth": "Junior AV Engineer → AV Engineer → Senior → Lead Autonomous Systems Engineer",
    "estimated_budget": "₹50k–3 lakhs (courses + certifications)",
    "estimated_salary": "₹30k–60k/month → ₹4–8 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/autonomous-vehicle-engineer",
    "related_careers": ["robotics engineer", "ML engineer", "embedded systems engineer"]
},

# -------- Computational Science & Research --------

"scientific computing engineer": {
    "domain": "Scientific Computing & AI",
    "tags": ["simulation", "HPC", "parallel computing", "algorithms"],
    "description": [
        "Develop software for simulations, modeling, and high-performance computing",
        "Work in physics, chemistry, and engineering research applications"
    ],
    "skills": ["Python/C++/Fortran", "Parallel computing", "Numerical methods", "Data analysis", "HPC tools"],
    "education": ["B.Tech/B.E in CS/IT/Computational Science", "M.Tech/PhD preferred"],
    "growth": "Junior Research Engineer → Scientific Computing Engineer → Senior → Lead Scientist",
    "estimated_budget": "₹0.5–3 lakhs (courses + higher studies)",
    "estimated_salary": "₹35k–60k/month → ₹4–8 LPM (senior/research roles)",
    "entrance_exams_required": ["GATE CS", "IISc/IIIT PhD entrance optional"],
    "link": "https://www.coursera.org/articles/scientific-computing-engineer",
    "related_careers": ["AI researcher", "data scientist", "computational biologist"]
},

# -------- UX, Product & Design in IT --------

"product manager (tech)": {
    "domain": "Product Management & IT",
    "tags": ["product", "management", "technology", "business"],
    "description": [
        "Define product strategy and roadmap",
        "Collaborate with engineering and design teams to launch software products"
    ],
    "skills": ["Project management", "Business analysis", "Technical knowledge", "UX/UI basics", "Communication"],
    "education": ["B.Tech/B.E in CS/IT + MBA optional", "Certifications in Product Management"],
    "growth": "Associate PM → Product Manager → Senior PM → Lead PM → Head of Product",
    "estimated_budget": "₹0.5–2 lakhs (courses + certifications)",
    "estimated_salary": "₹40k–80k/month → ₹5–10 LPM (senior/lead roles)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/tech-product-manager",
    "related_careers": ["UX designer", "project manager", "business analyst"]
},

"ux/ui designer": {
    "domain": "UX/UI & Product Design",
    "tags": ["ux", "ui", "design", "user experience", "interface"],
    "description": [
        "Design intuitive user interfaces and improve user experience",
        "Work closely with developers and product managers to implement designs"
    ],
    "skills": ["Figma/Sketch/Adobe XD", "Prototyping", "User research", "Wireframing", "Visual design"],
    "education": ["B.Des/B.Tech in CS/IT + Design courses", "UX/UI certifications"],
    "growth": "Junior Designer → UX/UI Designer → Senior → Lead → UX Architect",
    "estimated_budget": "₹50k–1.5 lakhs (courses + certifications)",
    "estimated_salary": "₹25k–50k/month → ₹3–6 LPM (senior)",
    "entrance_exams_required": [],
    "link": "https://www.coursera.org/articles/ux-ui-designer",
    "related_careers": ["product manager", "interaction designer", "frontend developer"]
},

}

# ================= Intelligent Domain Filtering & Search Functions =================

def get_careers_by_domain(domain_name):
    """
    Return all careers in a given domain.
    """
    return {k: v for k, v in CAREER_INFO.items() if v["domain"].lower() == domain_name.lower()}


def search_careers_by_tag(tag_name):
    """
    Return all careers matching a tag.
    """
    return {
        k: v
        for k, v in CAREER_INFO.items()
        if tag_name.lower() in [t.lower() for t in v.get("tags", [])]
    }


def search_careers_by_keyword(keyword):
    """
    Return careers where keyword appears in:
    - Career name
    - Career description
    - Tags
    """
    result = {}
    for k, v in CAREER_INFO.items():
        if (
            keyword.lower() in k.lower()
            or any(keyword.lower() in d.lower() for d in v.get("description", []))
            or any(keyword.lower() in t.lower() for t in v.get("tags", []))
        ):
            result[k] = v
    return result


def get_related_careers(career_name):
    """
    Return related careers for a given career.
    """
    career_data = CAREER_INFO.get(career_name.lower())
    if career_data and "related_careers" in career_data:
        return career_data["related_careers"]
    return []


# ------------------ New Functions for Budget, Salary, Entrance Exams ------------------

def search_careers_by_budget(min_budget=None, max_budget=None):
    """
    Return careers that fall within the estimated budget range.
    min_budget and max_budget are in INR numeric values.
    Example: min_budget=20000, max_budget=100000
    """
    result = {}
    for k, v in CAREER_INFO.items():
        budget_str = v.get("estimated_budget", "")
        # Extract numeric values from string like '₹20k – ₹1L'
        import re
        nums = re.findall(r'\d+', budget_str.replace(',', ''))
        if not nums:
            continue
        # Convert to integer in rupees
        if "k" in budget_str.lower():
            nums = [int(n) * 1000 for n in nums]
        elif "l" in budget_str.lower():
            nums = [int(n) * 100000 for n in nums]
        career_min = nums[0]
        career_max = nums[-1] if len(nums) > 1 else nums[0]

        if (min_budget is None or career_max >= min_budget) and (max_budget is None or career_min <= max_budget):
            result[k] = v
    return result


def search_careers_by_salary(min_salary=None, max_salary=None):
    """
    Return careers that fall within the estimated salary range.
    min_salary and max_salary are in INR numeric values.
    Example: min_salary=200000, max_salary=1000000
    """
    result = {}
    for k, v in CAREER_INFO.items():
        salary_str = v.get("estimated_salary", "")
        import re
        nums = re.findall(r'\d+', salary_str.replace(',', ''))
        if not nums:
            continue
        # Convert to integer in rupees
        if "k" in salary_str.lower():
            nums = [int(n) * 1000 for n in nums]
        elif "l" in salary_str.lower():
            nums = [int(n) * 100000 for n in nums]
        career_min = nums[0]
        career_max = nums[-1] if len(nums) > 1 else nums[0]

        if (min_salary is None or career_max >= min_salary) and (max_salary is None or career_min <= max_salary):
            result[k] = v
    return result


def search_careers_by_entrance_exam(exam_name):
    """
    Return all careers that require a particular entrance exam or certification.
    """
    result = {}
    for k, v in CAREER_INFO.items():
        exams = v.get("entrance_exams", [])
        if any(exam_name.lower() in e.lower() for e in exams):
            result[k] = v
    return result
