/* 
  Ipsita Bajpai Portfolio Scripts
  Interactivity: Custom Cursor, Typing Animation, Scroll Reveals, Particles, Form Handling
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Loading Screen ---
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1500);
  });

  // --- Custom Cursor ---
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
    
    // Smooth outline movement
    cursorOutline.animate({
      transform: `translate(${posX - 20}px, ${posY - 20}px)`
    }, { duration: 500, fill: "forwards" });
  });

  // Cursor hover effects
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.transform = 'scale(1.5)';
      cursorOutline.style.background = 'rgba(212, 175, 55, 0.1)';
      cursorOutline.style.borderColor = 'rgba(212, 175, 55, 1)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = 'scale(1)';
      cursorOutline.style.background = 'transparent';
      cursorOutline.style.borderColor = 'var(--secondary)';
    });
  });

  // --- Typing Animation ---
  const typedTextSpan = document.getElementById('typedText');
  const textArray = ["B.Tech CSE Student", "Front-End Developer", "UI/UX Enthusiast", "Creative Technologist"];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 1100);
    }
  }

  if (textArray.length) setTimeout(type, newTextDelay + 250);

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('revealed');
        
        // Skill bar specific animation
        if(el.classList.contains('skill-category')) {
          const bars = el.querySelectorAll('.skill-fill');
          bars.forEach(bar => {
            bar.style.width = bar.parentElement.previousElementSibling.querySelector('.skill-pct').textContent;
          });
        }
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      scrollTopBtn.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      scrollTopBtn.classList.remove('visible');
    }
    
    // Highlight Active Link
    let current = "";
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // --- Particles Canvas ---
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particlesArray;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 1;
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 2) - 1;
      let directionY = (Math.random() * 2) - 1;
      let color = 'rgba(212, 175, 55, 0.3)';
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
  }

  init();
  animate();

  window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });

  // --- Project Card Hover Effect ---
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.onmousemove = e => {
      const { x, y } = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - x}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - y}px`);
    };
  });

  // --- Form Handling ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const sendBtn = document.getElementById('sendBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate sending
    setTimeout(() => {
      contactForm.reset();
      sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      formSuccess.style.display = 'flex';
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 2000);
  });

  // --- Smooth Scroll Top ---
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
