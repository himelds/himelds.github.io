/*==================== MOBILE NAVIGATION MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close'),
    navBackdrop = document.getElementById('nav-backdrop');

function openMobileMenu() {
    if (navMenu) navMenu.classList.add('show-menu');
    if (navBackdrop) navBackdrop.classList.add('show-backdrop');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('show-menu');
    if (navBackdrop) navBackdrop.classList.remove('show-backdrop');
    document.body.style.overflow = '';
}

if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu && navMenu.classList.contains('show-menu')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (navClose) {
    navClose.addEventListener('click', closeMobileMenu);
}

if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
}

const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-cta');
navLinks.forEach(n => n.addEventListener('click', closeMobileMenu));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
        closeMobileMenu();
    }
});

/*==================== SCROLL HEADER STYLING ====================*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }
}
window.addEventListener('scroll', scrollHeader);

/*==================== PROJECT DATA ====================*/
// The data behind the massive custom modal windows
const projectData = {
    'p-kidney': {
        badge: 'Deep Learning',
        icon: 'fa-brain',
        title: 'Kidney Tumor Identification System',
        domain: 'Medical AI · Computer Vision · MLOps',
        descShort: 'A production-ready deep learning system for kidney CT scan classification with explainable AI and automated ML tracking.',
        github: 'https://github.com/himelds/kidney-tumor-identification-system',
        linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7460666885672546307/',
        streamlit: 'https://kidney-tumor-identification-system.streamlit.app/',
        images: [
            { src: './assets/documents/kidney_1.png', alt: 'Dataset Distribution' },
            { src: './assets/documents/kidney_2.png', alt: 'Model Performance Metrics' },
            { src: './assets/documents/kidney_3.png', alt: 'Grad-CAM Heatmap Overlay' },
            { src: './assets/documents/kidney_4.png', alt: 'Kidney Tumor Identification System Screenshot 1' },
            { src: './assets/documents/kidney_5.png', alt: 'Kidney Tumor Identification System Screenshot 2' },
            { src: './assets/documents/kidney_6.png', alt: 'Kidney Tumor Identification System Screenshot 3' }
        ],
        descLong: '<ul><li><strong>Project Overview:</strong> A production-ready deep learning application that classifies kidney CT scan images into four categories: Normal, Cyst, Tumor, and Stone. Built with MLOps best practices, it provides accurate AI-assisted diagnostics with full explainability.</li><li><strong>Methodology:</strong> Developed using EfficientNetB4 with a custom classification head. The system integrates Grad-CAM heatmaps for visual explanations and Monte Carlo Dropout for uncertainty quantification. It includes a complete MLOps pipeline with MLflow for experiment tracking, Evidently AI for data drift monitoring, and GitHub Actions for CI/CD.</li><li><strong>Model Performance:</strong> Achieved a Validation Accuracy of 99.46% and a Test AUC-ROC of 98.38%. The model is highly specific (95.00%) and sensitive (85.36%), making it a robust decision-support tool.</li><li><strong>Architecture & Deployment:</strong> The system features a decoupled architecture with a Streamlit UI and a FastAPI backend, utilizing Redis and Celery for asynchronous PDF report generation. The entire system is containerized with Docker and the model is hosted on Hugging Face Hub.</li></ul>',
        video: 'https://www.youtube.com/embed/PrtjSg-C7gw'
    },
    'p-bikeshare': {
        badge: 'Machine Learning',
        icon: 'fa-brain',
        title: 'London Bike-Sharing Prediction',
        domain: 'Time Series Forecasting · Machine Learning · Urban Mobility',
        descShort: 'Developed an end-to-end machine learning pipeline and interactive Streamlit Dashboard to predict demand for London\'s bike-sharing system.',
        github: 'https://github.com/himelds/London_Bike_Sharing_Project',
        streamlit: 'https://londonbikesharingproject.streamlit.app/',
        images: [
            { src: './assets/documents/bike_shares_across_month.png', alt: 'Bike sharing counts per month' },
            { src: './assets/documents/Actual_vs_predicted_value.png', alt: 'Actual vs predicted value' },
            { src: './assets/documents/Performance_metrics.png', alt: 'Performance metrics' }
        ],
        descLong: '<ul><li><strong>Project Overview:</strong> An end-to-end machine learning project focused on predicting demand for London\'s Santander bike-sharing system using real-world environmental and temporal data. It features a modular MLOps pipeline and an interactive Streamlit Dashboard for real-time predictions.</li><li><strong>Data Analysis & Insights:</strong> Analyzed 17,414 hourly entries, extracting temporal features and validating outliers. Key findings show bike rentals peak heavily during the morning (8 AM) and evening commutes (5-6 PM), and demand consistently increases as temperatures rise.</li><li><strong>Model Performance:</strong> Evaluated several regression models. While Gradient Boosting initially performed well, the deployed Random Forest model achieved a superior R² Score of 0.957 after final pipeline optimizations, proving highly robust and interpretable.</li><li><strong>Project Architecture & Impact:</strong> Transformed from an experimental notebook into a professional ML repository featuring a zero-config cloud deployment that auto-trains the model if missing. These actionable insights support operational decisions like predictive bike allocation and resource optimization.</li></ul>',
        // video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder video
    },
    'p-mediquery': {
        badge: 'Healthcare RAG / GenAI',
        icon: 'fa-user-md',
        title: 'MediQuery — Role-Gated Medical Assistant',
        domain: 'Generative AI · Hybrid RAG · RBAC · Containerized Architecture',
        descShort: 'Role-gated medical knowledge assistant for hospital staff. Hybrid-retrieval RAG with JWT-based RBAC, query-time safety guards, and conversation-aware query rewriting — containerised end-to-end.',
        github: 'https://github.com/himelds/MediQuery',
        images: [
            { src: './assets/documents/mediquery_doctor_chat.png', alt: 'Doctor querying clinical policy with verified cited sources' },
            { src: './assets/documents/mediquery_login_page.png', alt: 'Role-based JWT authentication interface' },
            { src: './assets/documents/mediquery_nurse_chat.png', alt: 'Cross-role denial enforcing retrieval-time RBAC safety' },
            { src: './assets/documents/mediquery_billing_chat.png', alt: 'Billing executive retrieving authorized NHS Trust financial policies' }
        ],
        descLong: '<ul><li><strong>Problem & Motivation:</strong> Hospital knowledge is fragmented and role-sensitive. Clinical ICU guidelines, billing submission rules, and biomedical equipment manuals must not be commingled. Off-the-shelf RAG demos retrieve from a single flattened index and rely on fragile prompt instructions. MediQuery enforces access control at retrieval, not at generation.</li><li><strong>Role-Based Access Control (RBAC):</strong> Server-side JWT role claims gate collection access across 6 independent corpora (medical, clinical, nursing, billing, equipment, general) before retrieval runs. An unauthorized collection is never queried, ranked, or exposed to the LLM. Nurse roles feature additional semantic intent filtering prohibiting diagnostic or prescribing queries.</li><li><strong>Production-Grade Hybrid Retrieval:</strong> Combines lexical precision (BM25) with semantic recall (ChromaDB dense embeddings via sentence-transformers/all-MiniLM-L6-v2) across role-authorized collections. Candidates are merged via Reciprocal Rank Fusion (RRF, k=60), then re-ranked with a Cross-Encoder (ms-marco-MiniLM-L-6-v2) to provide the top-5 relevant passages to Groq (llama-3.3-70b-versatile).</li><li><strong>Intelligent Safety Guardrails & Query Rewriting:</strong> A 3-layer pre-retrieval guard stops prompt injections, out-of-scope queries, and role violations with helpful refusal hints. Multi-turn context is managed via LLM query rewriting rather than raw chat history stuffing.</li><li><strong>End-to-End Containerization & Quality:</strong> Full-stack orchestration via Docker Compose with pre-built indexes and models for instant cold starts. Tested with pytest for auth and role matrices, linted with Ruff, and protected with Gitleaks in GitHub Actions CI.</li></ul>',
    },
    'p-traffic': {
        badge: 'Data Visualization',
        icon: 'fa-chart-line',
        title: 'UK Traffic Accidents Analysis',
        domain: 'Exploratory Data Analysis · Data Visualization',
        descShort: 'Analyzed large-scale UK traffic accident data to identify key factors influencing accident frequency and severity using data visualization and statistical analysis.',
        github: 'https://github.com/himelds/Analysis_of_United_Kingdom_Traffic_Accidents',
        images: [
            { src: './assets/documents/Accident_Severity_by_Conditions.png', alt: 'Accident Severity Based on light and Weather' },
            { src: './assets/documents/Distribution_Accident_Severity.png', alt: 'Distribution of Accident Severity' },
            { src: './assets/documents/Impact_of_Speed_Limit_on_Accident_Severity.png', alt: 'Speed Limit Impact on Accident Severity' },
            { src: './assets/documents/Number_of_Causalities_by_Day_of_the_Week.png', alt: 'Number of Causalities by Day of the Week' }

        ],
        descLong: '<ul><li><strong>Project Overview:</strong> This project focuses on analyzing traffic accident data from the United Kingdom to identify key factors affecting accident frequency and severity. The dataset consists of approximately 1.8 million records with 33 features, including weather conditions, road type, lighting conditions, and speed limits.</li><li><strong>Data Processing & Analysis:</strong> I performed data cleaning by handling missing values, validating data consistency, and transforming variables into appropriate formats. Exploratory data analysis (EDA) was conducted using Python libraries such as Pandas, NumPy, Matplotlib, and Seaborn to uncover patterns and relationships within the data.</li><li><strong>Key Findings:</strong> The analysis revealed that factors such as weather conditions, lighting, road type, and speed limits significantly influence accident severity. Higher speed limits and adverse environmental conditions were associated with more severe accidents, while traffic patterns and road design also played a critical role.</li><li><strong>Impact & Applications:</strong> The findings from this project can support real-world applications such as improving road safety strategies, optimizing traffic management, and informing infrastructure planning.</li></ul>',

    },
    'p-b360': {
        badge: 'Power BI',
        icon: 'fa-chart-bar',
        title: 'Business 360 Dashboard',
        domain: 'Finance · Sales · Marketing · Supply Chain',
        descShort: 'Developed an interactive Power BI dashboard to deliver data-driven insights across multiple business functions, enabling informed decision-making and performance analysis.',
        github: 'https://github.com/himelds/Business-360-insight',
        linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7123534203882803200',
        images: [
            { src: './assets/documents/Business_360.png', alt: 'Business 360 Project Dashboard' },
            { src: './assets/documents/finance_view.png', alt: 'Finance Dashboard' },
            { src: './assets/documents/marketing_view.png', alt: 'Marketing Dashboard' },
            { src: './assets/documents/supply_chain_view.png', alt: 'Supply Chain Dashboard' },
            { src: './assets/documents/sales_view.png', alt: 'Sales Dashboard' },
            { src: './assets/documents/executive_view.png', alt: 'Evecutive Dashboard' }
        ],
        descLong: '<ul><li><strong>Project Overview:</strong> This project focuses on building a comprehensive business intelligence dashboard for AtliQ Hardware, a global company operating in the computer hardware market. The objective was to transform raw business data into actionable insights to support decision-making across departments including Sales, Finance, Marketing, Supply Chain, and Executive management.</li><li><strong>Data Architecture:</strong> I connected to a MySQL database, performed data validation, and designed a structured data model using a snowflake schema. A custom date table was created using M language to enable time-based analysis. Using DAX, I developed calculated columns and measures to support key business metrics.</li><li><strong>Dashboard Design:</strong> The dashboard was designed with interactive features such as dynamic filtering, conditional formatting, bookmarks, and navigation buttons to enhance usability and user experience. Multiple views were created to provide role-specific insights for different business functions.</li><li><strong>Business Value:</strong> This solution enables stakeholders to monitor performance, identify trends, and make data-driven decisions, demonstrating the practical application of business intelligence and data visualization in a real-world business context.</li></ul>',

    },
    'p-expense': {
        badge: 'Full-Stack App',
        icon: 'fa-wallet',
        title: 'Expense Tracking System',
        domain: 'FastAPI · Streamlit · MySQL · Data Analytics',
        descShort: 'A full-stack Expense Tracking System built with FastAPI backend and Streamlit frontend to track, categorize, budget, and analyze expenses.',
        github: 'https://github.com/himelds/Expense-Management-System',
        images: [
            { src: './assets/documents/expense_dashboard.png', alt: 'Expense Dashboard' },
            { src: './assets/documents/expense_budget.png', alt: 'Budget Manager' },
            { src: './assets/documents/expense_analytics.png', alt: 'Analytics View' },
            { src: './assets/documents/expense_transactions.png', alt: 'Transactions List' }
        ],
        descLong: '<ul><li><strong>Project Overview:</strong> A full-stack Expense Tracking System built with FastAPI backend and Streamlit frontend. It helps users track, categorize, budget, and analyze their expenses through an interactive dashboard and a clean UI.</li><li><strong>Key Features:</strong> The system includes a comprehensive dashboard with summary metrics and spending trend charts. It provides robust transaction management with search and filter capabilities, a budget manager with visual progress bars and over-budget alerts, and detailed analytics by category and month.</li><li><strong>Technical Architecture:</strong> The application features a decoupled architecture with a Streamlit frontend and a FastAPI backend. It utilizes MySQL 8.0 for data persistence, with automatic schema generation on startup. Data validation is handled via Pydantic v2, and interactive data visualizations are powered by Plotly.</li><li><strong>API Integration:</strong> The backend exposes a RESTful API with endpoints for CRUD operations on expenses, budgets, and custom categories, which the frontend consumes to provide a seamless user experience.</li></ul>',
    }
};

/*==================== PROJECT MODAL LOGIC & CAROUSEL ====================*/
const modal = document.getElementById('project-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseBtn = document.getElementById('modal-close');

// Modal Elements
const pmHeaderTitle = document.getElementById('pm-header-title');
const pmBadge = document.getElementById('pm-badge');
const pmBadgeIcon = document.getElementById('pm-badge-icon');
const pmTitle = document.getElementById('pm-title');
const pmDomain = document.getElementById('pm-domain');
const pmDescShort = document.getElementById('pm-desc-short');
const pmGithubLink = document.getElementById('pm-github-link');
const pmLinkedinLink = document.getElementById('pm-linkedin-link');
const pmStreamlitLink = document.getElementById('pm-streamlit-link');
const pmDescLong = document.getElementById('pm-desc-long');
const pmVideo = document.getElementById('pm-video');
const pmVideoContainer = document.getElementById('pm-video-container');
const pmBottomRow = document.getElementById('pm-bottom-row');
const pmCarouselInner = document.getElementById('pm-carousel-inner');
const pmCarouselCaption = document.getElementById('pm-carousel-caption');

// Carousel State
let currentSlide = 0;
let carouselImages = [];
let slideInterval;

function buildCarousel() {
    pmCarouselInner.innerHTML = '';
    if (!carouselImages || carouselImages.length === 0) {
        pmCarouselInner.innerHTML = '<div class="pm-slide active">No Images</div>';
        pmCarouselCaption.textContent = '';
        return;
    }

    carouselImages.forEach((img, idx) => {
        const slide = document.createElement('div');
        slide.className = `pm-slide ${idx === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        pmCarouselInner.appendChild(slide);
    });

    pmCarouselCaption.textContent = carouselImages[0].alt;
    currentSlide = 0;

    // Auto slide
    clearInterval(slideInterval);
    if (carouselImages.length > 1) {
        slideInterval = setInterval(() => nextSlide(), 4000);
    }
}

function updateSlide(index) {
    if (!carouselImages || carouselImages.length === 0) return;
    const slides = pmCarouselInner.querySelectorAll('.pm-slide');
    if (!slides.length) return;

    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    slides[currentSlide].classList.add('active');
    pmCarouselCaption.textContent = carouselImages[currentSlide].alt;
}

function nextSlide() { updateSlide(currentSlide + 1); }
function prevSlide() { updateSlide(currentSlide - 1); }

document.getElementById('pm-carousel-next').addEventListener('click', () => {
    nextSlide();
    clearInterval(slideInterval); // stop auto on manual click
});
document.getElementById('pm-carousel-prev').addEventListener('click', () => {
    prevSlide();
    clearInterval(slideInterval);
});

// Open Modal Action
const openModalBtns = document.querySelectorAll('.project-card');

openModalBtns.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.getAttribute('data-project-id');
        const data = projectData[projectId];
        if (!data) return;

        // Populate left column
        pmHeaderTitle.textContent = data.title;
        pmBadge.textContent = data.badge;
        pmBadgeIcon.className = `fas ${data.icon} pm-icon-logo`;
        pmTitle.textContent = data.title;
        pmDomain.textContent = data.domain;
        pmDescShort.textContent = data.descShort;
        pmGithubLink.href = data.github;

        // Conditional LinkedIn Link
        if (data.linkedin) {
            pmLinkedinLink.href = data.linkedin;
            pmLinkedinLink.style.display = 'inline-flex';
        } else {
            pmLinkedinLink.style.display = 'none';
        }

        // Conditional Streamlit Link
        if (data.streamlit) {
            pmStreamlitLink.href = data.streamlit;
            pmStreamlitLink.style.display = 'inline-flex';
        } else {
            pmStreamlitLink.style.display = 'none';
        }

        // Populate bottom methodology
        pmDescLong.innerHTML = data.descLong;

        // Conditional Video Logic
        if (data.video) {
            pmVideoContainer.style.display = 'block';
            pmVideo.src = data.video;
            pmBottomRow.style.gridTemplateColumns = ''; // Reverts to CSS default (5fr 7fr)
        } else {
            pmVideoContainer.style.display = 'none';
            pmVideo.src = '';
            // If on mobile where it's overridden by media queries, setting 1fr still works fine as mobile is already 1fr
            pmBottomRow.style.gridTemplateColumns = '1fr';
        }

        // Setup Carousel
        carouselImages = data.images;
        buildCarousel();

        modal.classList.add('show-modal');
        document.body.style.overflow = 'hidden';
    });
});

const closeModal = function () {
    modal.classList.remove('show-modal');
    document.body.style.overflow = '';
    pmVideo.src = ''; // Stop video playing
    clearInterval(slideInterval);
};

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('show-modal')) {
        closeModal();
    }
});

/*==================== CERTIFICATE DATA & MODAL LOGIC ====================*/
const certData = {
    'c-python': {
        title: 'Python: Beginner to Advanced For Data Professionals',
        provider: 'Codebasics',
        year: '2024',
        skills: ['Python', 'NumPy', 'Pandas', 'Data Cleaning', 'EDA', 'OOP'],
        image: './assets/documents/python_certificate.jpg',
        link: 'https://codebasics.io/certificate/CB-48-27911'
    },
    'c-sql': {
        title: 'SQL Beginner to Advanced For Data Professionals',
        provider: 'Codebasics',
        year: '2024',
        skills: ['SQL', 'MySQL', 'Joins', 'Subqueries'],
        image: './assets/documents/SQL_certificate.jpg',
        link: 'https://codebasics.io/certificate/CB-50-27911'
    },
    'c-powerbi': {
        title: 'Power BI Data Analytics Bootcamp',
        provider: 'Codebasics',
        year: '2024',
        skills: ['Power BI', 'DAX', 'Power Query', 'Data Modelling', 'Dashboards'],
        image: './assets/documents/power bi certificate.jpg',
        link: 'https://codebasics.io/certificate/CB-49-27911'
    },
    'c-excel': {
        title: 'Excel: Mother of Business Intelligence',
        provider: 'Codebasics',
        year: '2024',
        skills: ['Excel', 'Power Query', 'Pivot Tables', 'DAX'],
        image: './assets/documents/Excel_certificate.jpg',
        link: 'https://codebasics.io/certificate/CB-51-27911'
    },
    'c-google': {
        title: 'Google Data Analytics Professional Certificate',
        provider: 'Google · Coursera',
        year: '2023',
        skills: ['Data Analytics', 'R', 'Tableau', 'Spreadsheets', 'Problem Solving'],
        image: './assets/documents/Google Data Analytics_certificate.jpg',
        link: 'https://www.coursera.org/account/accomplishments/professional-cert/TLAT7R76JGCS'
    },
    'c-matlab': {
        title: 'Introduction to Programming with MATLAB',
        provider: 'Coursera',
        year: '2022',
        skills: ['MATLAB', 'Programming Fundamentals', 'Numerical Computing'],
        image: './assets/documents/matlab_certificate.jpg',
        link: 'https://www.coursera.org/account/accomplishments/verify/5ZEVF378RLNS'
    }
};

const certModal = document.getElementById('cert-modal');
const certModalOverlay = document.getElementById('cert-modal-overlay');
const certModalClose = document.getElementById('cert-modal-close');

const cmTitle = document.getElementById('cm-title');
const cmProvider = document.getElementById('cm-provider');
const cmSkillsContainer = document.getElementById('cm-skills-container');
const cmVerifyLink = document.getElementById('cm-verify-link');
const cmImage = document.getElementById('cm-image');

const openCertBtns = document.querySelectorAll('.btn-cert-details');

openCertBtns.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const certId = card.getAttribute('data-cert-id');
        const data = certData[certId];
        if (!data) return;

        cmTitle.textContent = data.title;
        cmProvider.textContent = `${data.provider} · ${data.year}`;

        cmSkillsContainer.innerHTML = '';
        data.skills.forEach(skill => {
            const span = document.createElement('span');
            span.textContent = skill;
            cmSkillsContainer.appendChild(span);
        });

        cmVerifyLink.href = data.link;
        cmImage.src = data.image;
        cmImage.alt = `${data.title} Certificate`;

        certModal.classList.add('show-modal');
        document.body.style.overflow = 'hidden';
    });
});

const closeCertModal = function () {
    certModal.classList.remove('show-modal');
    document.body.style.overflow = '';
};

if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certModalOverlay) certModalOverlay.addEventListener('click', closeCertModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('show-modal')) {
        closeCertModal();
    }
});
