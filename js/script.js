// 1. Image Sequence Logic
const canvas = document.getElementById("scroll-image");
const context = canvas.getContext("2d");

const frameCount = 290;
const currentFrame = index => `pics/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

const images = [];

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

images[0].onload = () => {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    context.drawImage(images[0], 0, 0);
};

const heroContent = document.querySelector('.hero-content');
const heroRight = document.querySelector('.hero-right');

function updateHeroParallax() {
    if (!heroContent || !heroRight) return;
    if (window.matchMedia("(max-width: 768px)").matches) {
        const isPhone = window.matchMedia("(max-width: 480px)").matches;
        const nameOffset = isPhone ? -20 : 16;
        const educationOffset = isPhone ? 20 : -16;
        const mobileDrift = Math.min(window.scrollY * 0.08, 32);
        heroContent.style.transform = `translateX(${nameOffset + mobileDrift}px)`;
        heroRight.style.transform = `translateX(${educationOffset - mobileDrift}px)`;
        return;
    }
    const drift = Math.min(window.scrollY * 0.15, 120);
    heroContent.style.transform = `translateX(${60 + drift}px)`;
    heroRight.style.transform = `translateX(${50 + drift}px)`; 
}

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    
    const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
    
    requestAnimationFrame(() => updateImage(frameIndex));
    updateHeroParallax();
}, { passive: true });

function updateImage(index) {
    if (images[index] && images[index].complete) {
        context.drawImage(images[index], 0, 0);
    }
}

updateHeroParallax();

// 2. Phone Click Logic
function toggleLinks(e) {
    e.preventDefault(); 
    const links = document.getElementById("contactLinks");
    if(links) {
        links.classList.toggle("show");
    }
}

const cvButton = document.getElementById("cvButton");
const resumeOverlay = document.getElementById("resumeOverlay");
const resumeClose = document.getElementById("resumeClose");
const resumeDownload = document.getElementById("resumeDownload");

function openResumeModal() {
    if (!resumeOverlay) return;
    resumeOverlay.classList.add("show");
    resumeOverlay.style.opacity = "1";
    resumeOverlay.style.visibility = "visible";
    resumeOverlay.setAttribute("aria-hidden", "false");
}

function closeResumeModal() {
    if (!resumeOverlay) return;
    resumeOverlay.classList.remove("show");
    resumeOverlay.style.opacity = "0";
    resumeOverlay.style.visibility = "hidden";
    resumeOverlay.setAttribute("aria-hidden", "true");
}

function downloadResumePdf() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>Pranjal Thakur Resume</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 12mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        margin: 0;
                        background: #fff;
                        color: #111;
                        font-family: Arial, Helvetica, sans-serif;
                    }
                    .page {
                        width: 100%;
                        max-width: 1000px;
                        margin: 0 auto;
                        padding: 18px 22px 10px;
                    }
                    h1 {
                        margin: 0;
                        font-size: 34px;
                        line-height: 1.1;
                        font-weight: 700;
                        letter-spacing: -0.04em;
                        text-align: center;
                    }
                    .contact-row {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                        gap: 12px;
                        margin: 10px 0 18px;
                        font-size: 13px;
                        color: #222;
                    }
                    .contact-row .sep {
                        opacity: 0.6;
                    }
                    .section {
                        margin-top: 18px;
                    }
                    .section-header {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        font-weight: 800;
                        font-size: 13px;
                        letter-spacing: 0.04em;
                        text-transform: uppercase;
                        margin-bottom: 8px;
                    }
                    .section-header::after {
                        content: "";
                        display: block;
                        height: 1px;
                        background: #111;
                        flex: 1;
                    }
                    .row {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 20px;
                    }
                    .edu-main {
                        font-size: 16px;
                        font-weight: 700;
                        margin: 0;
                    }
                    .edu-sub {
                        font-size: 15px;
                        font-style: italic;
                        font-weight: 400;
                        margin: 0 0 6px;
                    }
                    .right-meta {
                        text-align: right;
                        font-size: 14px;
                        min-width: 180px;
                    }
                    .school {
                        margin-top: 6px;
                    }
                    .skill-list {
                        list-style: disc;
                        margin: 0;
                        padding-left: 22px;
                        font-size: 14px;
                        line-height: 1.6;
                    }
                    .skill-list li {
                        margin-bottom: 2px;
                    }
                    .project-row {
                        display: flex;
                        align-items: baseline;
                        justify-content: space-between;
                        gap: 18px;
                        margin-top: 10px;
                    }
                    .project-title {
                        margin: 0;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .project-link {
                        font-size: 12px;
                        font-weight: 700;
                        white-space: nowrap;
                    }
                    .project-stack {
                        font-size: 15px;
                        margin: 4px 0 8px;
                        font-style: italic;
                    }
                    ul.bullets {
                        margin: 0;
                        padding-left: 20px;
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    ul.bullets li {
                        margin-bottom: 5px;
                    }
                    .achievement-list {
                        margin: 0;
                        padding-left: 20px;
                        font-size: 14px;
                        line-height: 1.6;
                    }
                    .achievement-list li {
                        margin-bottom: 4px;
                    }
                    .muted { color: #333; }
                </style>
            </head>
            <body>
                <div class="page">
                    <h1>Pranjal Thakur</h1>
                    <div class="contact-row">
                        <span>+91 8219567975</span>
                        <span class="sep">|</span>
                        <span>thakur.akkii0123@gmail.com</span>
                        <span class="sep">|</span>
                        <span>linkedin.com/in/pranjalthakur</span>
                        <span class="sep">|</span>
                        <span>github.com/PranjalThakur01</span>
                    </div>

                    <div class="section">
                        <div class="section-header">Education</div>
                        <div class="row">
                            <div>
                                <p class="edu-main">National Institute of Technology, Hamirpur</p>
                                <p class="edu-sub">Bachelor of Technology in Electronics and Communication Engineering</p>
                                <div class="school">
                                    <p class="edu-main">Venus Public Senior Secondary School</p>
                                    <p class="edu-sub">Class XII (Senior Secondary): 80.4%</p>
                                    <p class="edu-sub">Class X (Secondary): 99.23%</p>
                                </div>
                            </div>
                            <div class="right-meta">
                                <div>Hamirpur, Himachal Pradesh</div>
                                <div>2024 – 2028</div>
                                <div style="margin-top: 10px;">Neether, Himachal Pradesh</div>
                                <div>Graduated 2023</div>
                                <div>Graduated 2021</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-header">Technical Skills</div>
                        <ul class="skill-list">
                            <li><strong>Languages:</strong> C++, Python, JavaScript, TypeScript, HTML, CSS</li>
                            <li><strong>Frontend & UI:</strong> React.js, Next.js, Tailwind CSS, Vite</li>
                            <li><strong>Backend & Databases:</strong> Node.js, Express.js, MongoDB, Mongoose, RESTful APIs, SQL</li>
                            <li><strong>Tools & Architecture:</strong> Postman, Git, GitHub, Vercel, Server-Sent Events (SSE), HITL</li>
                        </ul>
                    </div>

                    <div class="section">
                        <div class="section-header">Projects</div>
                        <div class="project-row">
                            <h3 class="project-title">AutoVendor AI — Autonomous B2B Procurement Agent</h3>
                            <div class="project-link">GitHub | Live Demo</div>
                        </div>
                        <p class="project-stack">Next.js, TypeScript, Node.js, Express.js, Playwright, Groq (LLaMA), Gemini API, SSE</p>
                        <ul class="bullets">
                            <li>Engineered a resilient multi-LLM BOM parsing engine transforming unstructured hardware queries into validated parametric JSON specs with sub-second latency and deterministic regex fallbacks.</li>
                            <li>Implemented parallel headless browser agents to crawl dynamic e-commerce catalogs (Robu, Evelta, Mouser), extracting live inventory and computing a dual-strategy cost arbitrage optimization algorithm.</li>
                            <li>Integrated Server-Sent Events (SSE) for real-time telemetry and enforced Human-in-the-Loop (HITL) checkout safety, deploying the frontend on Vercel.</li>
                        </ul>

                        <div class="project-row" style="margin-top: 18px;">
                            <h3 class="project-title">Mobile Security Audit & Threat Detection Engine</h3>
                            <div class="project-link">GitHub</div>
                        </div>
                        <p class="project-stack">Android SDK, Java, Kotlin, Static Analysis</p>
                        <ul class="bullets">
                            <li>Developed an automated Android security auditing tool performing on-device static analysis across installed packages to detect system-level vulnerabilities and misconfigurations.</li>
                            <li>Engineered custom rules to identify excessive runtime permissions, enforcing the Principle of Least Privilege.</li>
                            <li>Flagged hardcoded cleartext URLs and outdated SDK targets, computing a dynamic "Device Health" metric based on aggregated vulnerability severity.</li>
                        </ul>

                        <div class="project-row" style="margin-top: 18px;">
                            <h3 class="project-title">GitFund IQ Agent — AI-Powered GitHub PR Reviewer</h3>
                            <div class="project-link">GitHub</div>
                        </div>
                        <p class="project-stack">TypeScript, Google Generative AI</p>
                        <ul class="bullets">
                            <li>Engineered an automated code review tool utilizing TypeScript and AI APIs to help repository maintainers identify suspicious, low-quality, or fake pull requests, drastically reducing manual review effort.</li>
                        </ul>
                    </div>

                    <div class="section">
                        <div class="section-header">Achievements & Leadership</div>
                        <ul class="achievement-list">
                            <li>Secured 1st Position Overall (Best Department Club) at Nimbus 2k25, the annual technical festival of NIT Hamirpur, representing Team Vibhav by building and showcasing multiple technical projects.</li>
                            <li>Solved 150+ Data Structures and Algorithms problems on LeetCode using C++.</li>
                            <li>Powerlifter, NITH Power Team (2024 – Present): Competitive athlete representing the institute in rigorous Inter-NIT powerlifting competitions.</li>
                            <li>Executive, GDG NIT Hamirpur (2024 – Present): Organize technical workshops and developer-focused hackathons.</li>
                            <li>Class Representative, ECE Dept (2024 – Present): Act as the primary liaison between students and faculty.</li>
                        </ul>
                    </div>
                </div>
            </body>
        </html>
    `;

    printWindow.document.write(printHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 350);
}

if (cvButton) {
    cvButton.addEventListener("click", openResumeModal);
}

if (resumeClose) {
    resumeClose.addEventListener("click", closeResumeModal);
}

if (resumeDownload) {
    resumeDownload.addEventListener("click", downloadResumePdf);
}

if (resumeOverlay) {
    resumeOverlay.addEventListener("click", (event) => {
        if (event.target === resumeOverlay) closeResumeModal();
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && resumeOverlay && resumeOverlay.classList.contains("show")) {
        closeResumeModal();
    }
});

document.addEventListener("click", function(event) {
    const floatingContact = document.querySelector(".floating-contact");
    const links = document.getElementById("contactLinks");
    
    if (floatingContact && links && !floatingContact.contains(event.target)) {
        links.classList.remove("show");
    }
});

// Featured projects: auto-advance while idle, with manual controls and reduced-motion support.
const projectsTrack = document.getElementById("projectsTrack");
const projectControls = document.querySelectorAll("[data-project-direction]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (projectsTrack) {
    const getScrollStep = () => {
        const card = projectsTrack.querySelector(".project-card");
        return card ? card.getBoundingClientRect().width + 20 : projectsTrack.clientWidth;
    };

    const moveProjects = direction => {
        const atEnd = projectsTrack.scrollLeft + projectsTrack.clientWidth >= projectsTrack.scrollWidth - 8;
        const target = direction > 0 && atEnd ? 0 : projectsTrack.scrollLeft + getScrollStep() * direction;
        projectsTrack.scrollTo({ left: target, behavior: reduceMotion.matches ? "auto" : "smooth" });
    };

    projectControls.forEach(button => {
        button.addEventListener("click", () => moveProjects(Number(button.dataset.projectDirection)));
    });

    let carouselTimer;
    const stopCarousel = () => window.clearInterval(carouselTimer);
    const startCarousel = () => {
        stopCarousel();
        if (reduceMotion.matches) return;
        carouselTimer = window.setInterval(() => moveProjects(1), 5000);
    };

    ["mouseenter", "focusin", "touchstart", "pointerdown"].forEach(eventName => {
        projectsTrack.addEventListener(eventName, stopCarousel, { passive: true });
    });
    ["mouseleave", "focusout", "touchend", "pointerup"].forEach(eventName => {
        projectsTrack.addEventListener(eventName, startCarousel, { passive: true });
    });
    reduceMotion.addEventListener("change", startCarousel);
    startCarousel();
}