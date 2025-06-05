// Project Data
const projects = [{
        title: "SmartWatch Landing Page",
        description: "A modern and responsive SmartWatch Landing Page built with HTML, CSS, and JavaScript. Features smooth animations.",
        image: "https://github.com/user-attachments/assets/0cde4ad8-2141-41c8-ae68-b3725ae25a23",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: [
            "Contact Form",

            "Responsive Design",
            "Smooth Animations",
        ],
        liveLink: "https://mr-error738.github.io/SmartWatch-Landing-Page/",
        githubLink: "#"
    },
    /* {
        title: "Task Manager",
        description: "A feature-rich task management application with drag-and-drop functionality, categories, and local storage.",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: [
            "Drag & Drop",
            "Categories",
            "Priority Levels",
            "Smooth Animations"
        ],
        liveLink: "#",
        githubLink: "#"
    },
    {
        title: "Interactive Dashboard",
        description: "A clean and intuitive dashboard interface developed using vanilla JavaScript. Features interactive charts and real-time data updates.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: [
            "Interactive charts",
            "Customizable layout",
            "Dark/Light mode toggle",
            "Real-time data updates"
        ],
        liveLink: "#",
        githubLink: "#"
    } */
];

// DOM Elements
const contactForm = document.getElementById('contact-form');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links');
const dotLinks = document.querySelectorAll('.dot-link');

// Load Projects
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';
    projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <ul class="project-features">
                    ${project.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
                <div class="project-links">
                    <a href="${project.liveLink}" class="btn primary">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Section Visibility Observer
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateActiveDot(entry.target.id);
            }
        });
    },
    {
        threshold: 0.5
    }
);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Update Active Dot
function updateActiveDot(sectionId) {
    // Remove active class from all dots and labels
    dotLinks.forEach(link => {
        link.classList.remove('active');
        const dot = link.querySelector('.dot');
        const label = link.querySelector('.dot-label');
        if (dot) dot.classList.remove('active');
        if (label) label.classList.remove('active');
    });
    
    // Add active class to current section dot
    const activeDot = document.querySelector(`.dot-link[href="#${sectionId}"]`);
    if (activeDot) {
        activeDot.classList.add('active');
        const dot = activeDot.querySelector('.dot');
        const label = activeDot.querySelector('.dot-label');
        if (dot) dot.classList.add('active');
        if (label) label.classList.add('active');
    }
    
    // Update navbar links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (!element) return;
    
    window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
    });
}

// Event Listeners
dotLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
    });
});

// Navbar Shadow
function handleNavbarShadow() {
    if (window.scrollY > 0) {
        navbar.classList.add('with-shadow');
    } else {
        navbar.classList.remove('with-shadow');
    }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle-checkbox');
const themeWrapper = document.querySelector('.theme-wrapper');

function setThemeBasedOnSystem() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        themeToggle.checked = true;
    }
}

// Contact Form
if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    const submitIcon = submitBtn.querySelector('i');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitBtn.classList.add('loading');
        submitIcon.classList.remove('fa-paper-plane');
        submitIcon.classList.add('fa-spinner');
        
        try {
            await emailjs.sendForm('service_wtfsbax', 'template_olhbk04', contactForm);
            
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            submitIcon.classList.remove('fa-spinner');
            submitIcon.classList.add('fa-check');
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitIcon.classList.remove('fa-check');
                submitIcon.classList.add('fa-paper-plane');
            }, 2000);
            
        } catch (error) {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            submitIcon.classList.remove('fa-spinner');
            submitIcon.classList.add('fa-times');
            
            setTimeout(() => {
                submitBtn.classList.remove('error');
                submitIcon.classList.remove('fa-times');
                submitIcon.classList.add('fa-paper-plane');
            }, 2000);
        }
    });
}

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Hide nav links on large screens
if (window.innerWidth > 1340) {
    navLinks.forEach(link => {
        link.style.display = 'none';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setThemeBasedOnSystem();
    handleNavbarShadow();
    
    
    // Set initial active section
    const visibleSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    });
    
    if (visibleSection) {
        updateActiveDot(visibleSection.id);
    }
});

// Scroll Events
window.addEventListener('scroll', handleNavbarShadow);

// Prevent hash on page load
window.addEventListener('load', () => {
    window.location.replace('#');
});

// Debounce Function to Limit Frequency of Function Calls
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Function to handle scroll events
function handleScroll() {
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.dot-link');

    let foundActive = false; // Flag to check if an active section is found

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView && !foundActive) {
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
                const dotElement = dot.querySelector('.dot');
                if (dotElement) dotElement.classList.remove('active');
                const labelElement = dot.querySelector('.dot-label');
                if (labelElement) labelElement.classList.remove('active');
            });

            // Add active class to the current dot
            dots[index].classList.add('active');
            const activeDot = dots[index].querySelector('.dot');
            if (activeDot) activeDot.classList.add('active');
            const activeLabel = dots[index].querySelector('.dot-label');
            if (activeLabel) activeLabel.classList.add('active');

            foundActive = true; // Set the flag to true to prevent further processing
        }
    });
}
function tele() {
    window.location.replace('https://discord.gg/aU9kvTBD');
}
// Event listener for scroll
window.addEventListener('scroll', handleScroll);

// Initial call to set the active dot on page load
handleScroll();
