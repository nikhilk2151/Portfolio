/* Dynamic Mobile Viewport Height & Auto-Resize System */
function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

updateViewportHeight();
window.addEventListener('resize', updateViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(updateViewportHeight, 100);
});
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', updateViewportHeight);
}

const navLinks = document.querySelector('.nav-links');
const menuToggle = document.getElementById('menuToggle');
const body = document.body;
const sections = document.querySelectorAll('section[id]');
const progressBar = document.querySelector('.progress-bar');
const revealElements = document.querySelectorAll('.reveal');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects .project-card');
const searchInput = document.querySelector('#project-search');
const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = document.querySelector('.modal img');
const modalTitle = document.querySelector('.modal h3');
const modalClose = document.querySelector('.modal-close');
const certificateButtons = document.querySelectorAll('[data-certificate]');
const contactForm = document.querySelector('#contact-form');
const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
const progressCircles = document.querySelectorAll('.skill-circle');
const loadingScreen = document.querySelector('.page-loader');
const typedText = document.querySelector('.typewriter');

const typePhrases = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Computer Science Student'];
let typeIndex = 0;
let charIndex = 0;
let deleting = false;

function typeAnimation() {
  if (!typedText) return;
  const current = typePhrases[typeIndex];
  if (deleting) {
    charIndex -= 1;
    typedText.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      typeIndex = (typeIndex + 1) % typePhrases.length;
    }
  } else {
    charIndex += 1;
    typedText.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
    }
  }
  setTimeout(typeAnimation, deleting ? 100 : 140);
}

typeAnimation();

// Mobile Menu Toggle Functionality
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollY / scrollHeight) * 100;
  if (progressBar) progressBar.style.width = `${progress}%`;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href ? href.endsWith(`#${sectionId}`) : false);
      });
    }
  });
});

const filterProjects = (category) => {
  projectCards.forEach(card => {
    const categories = card.dataset.categories ? card.dataset.categories.toLowerCase().split(',').map(c => c.trim()) : [];
    const title = card.dataset.title ? card.dataset.title.toLowerCase() : '';
    const searchKey = searchInput ? searchInput.value.toLowerCase() : '';
    const matchesCategory = category === 'all' || categories.includes(category);
    const matchesSearch = title.includes(searchKey);
    card.style.display = matchesCategory && matchesSearch ? 'grid' : 'none';
  });
};

filterBtns.forEach(button => {
  button.addEventListener('click', () => {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects(button.dataset.filter);
  });
});

searchInput?.addEventListener('input', () => {
  const activeBtn = document.querySelector('.filter-btn.active');
  const activeCategory = activeBtn ? activeBtn.dataset.filter : 'all';
  filterProjects(activeCategory);
});

certificateButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.certificate;
    const title = btn.dataset.title || 'Certificate Preview';
    modalImage.src = src;
    modalTitle.textContent = title;
    modalImage.style.filter = 'none';
    modalOverlay.classList.add('active');
  });
});

modalClose?.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});

modalOverlay?.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.remove('active');
  }
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  const formMessage = document.querySelector('#form-message');
  inputs.forEach(input => {
    if (!input.value.trim()) {
      valid = false;
      input.style.borderColor = '#ff6b6b';
    } else {
      input.style.borderColor = 'rgba(255, 255, 255, 0.12)';
    }
  });
  const emailInput = document.querySelector('#email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput && !emailPattern.test(emailInput.value.trim())) {
    valid = false;
    emailInput.style.borderColor = '#ff6b6b';
  }
  if (formMessage) {
    formMessage.textContent = valid ? 'Message sent successfully! I’ll respond soon.' : 'Please fill all fields correctly.';
    formMessage.style.color = valid ? '#70d6ff' : '#ff7b7b';
    formMessage.classList.add('visible');
  }
  if (valid) {
    contactForm.reset();
  }
});

progressCircles.forEach(circle => {
  const percent = circle.dataset.percent;
  const progress = circle.querySelector('.progress');
  if (progress) {
    const offset = 377 - (377 * percent) / 100;
    progress.style.strokeDashoffset = offset;
    circle.querySelector('span').textContent = `${percent}%`;
  }
});

window.addEventListener('load', () => {
  loadingScreen?.classList.add('hide');
  setTimeout(() => {
    loadingScreen?.remove();
  }, 800);
});

const pageLinks = document.querySelectorAll('.nav-links a');
pageLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    const linkPath = link.pathname.replace(/\/index\.html$/, '/');
    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    if (link.host === window.location.host && linkPath !== currentPath) return;
    if (link.hash) {
      event.preventDefault();
      const target = document.querySelector(link.hash);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const imageModals = document.querySelectorAll('.preview-btn');
imageModals.forEach(button => {
  button.addEventListener('click', () => {
    const src = button.dataset.src;
    const title = button.dataset.title;
    if (modalImage) modalImage.src = src;
    if (modalTitle) modalTitle.textContent = title;
    if (modalImage) modalImage.style.filter = 'none';
    if (modalOverlay) modalOverlay.classList.add('active');
  });
});

/* ==========================================================================
   ANIMATED TECHNOLOGY BACKGROUND SYSTEM
   - Cybernetic Node Network with Electric Connection Lines
   - Data Packet Pulses traveling between circuit nodes
   - Binary Code & Tech Stream Particles (0, 1, </>, {}, 0x1F, AI, CPU)
   - Interactive Mouse Energy Field & Tech Reticle Target
   ========================================================================== */

(function initTechBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function setupCanvas() {
    let canvas = document.getElementById('tech-bg-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'tech-bg-canvas';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
      radius: 170
    };

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
    });

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
      initCodeStreams();
    }

    let resizeTimeout;
    const handleCanvasResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    };
    window.addEventListener('resize', handleCanvasResize);
    window.addEventListener('orientationchange', handleCanvasResize);

    const colors = ['#70d6ff', '#ad5fff', '#4a4eff', '#00f5d4'];

    // 1. TECH NODES
    let nodes = [];

    class Node {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.03 + Math.random() * 0.03;
        this.type = Math.random() > 0.82 ? (Math.random() > 0.5 ? 1 : 2) : 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.pulse += this.pulseSpeed;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        const currentRadius = this.radius + Math.sin(this.pulse) * 0.6;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;

        if (this.type === 1) {
          ctx.fillRect(this.x - currentRadius, this.y - currentRadius, currentRadius * 2, currentRadius * 2);
        } else if (this.type === 2) {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.x - 4, this.y);
          ctx.lineTo(this.x + 4, this.y);
          ctx.moveTo(this.x, this.y - 4);
          ctx.lineTo(this.x, this.y + 4);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    }

    function initNodes() {
      nodes = [];
      const count = Math.min(Math.floor((width * height) / 16000), 80);
      for (let i = 0; i < count; i++) {
        nodes.push(new Node());
      }
    }

    // 2. DATA PACKETS PULSING ALONG LINES
    let dataPackets = [];

    class DataPacket {
      constructor(startNode, endNode) {
        this.start = startNode;
        this.end = endNode;
        this.progress = 0;
        this.speed = 0.015 + Math.random() * 0.025;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = 2.5 + Math.random() * 1.5;
      }

      update() {
        this.progress += this.speed;
        return this.progress < 1;
      }

      draw() {
        const currentX = this.start.x + (this.end.x - this.start.x) * this.progress;
        const currentY = this.start.y + (this.end.y - this.start.y) * this.progress;

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(currentX, currentY, this.size, 0, Math.PI * 2);
        ctx.fill();

        const tailX = this.start.x + (this.end.x - this.start.x) * Math.max(0, this.progress - 0.08);
        const tailY = this.start.y + (this.end.y - this.start.y) * Math.max(0, this.progress - 0.08);
        const grad = ctx.createLinearGradient(currentX, currentY, tailX, tailY);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.shadowBlur = 0;
      }
    }

    // 3. FLOATING BINARY & CODE STREAM PARTICLES
    const symbols = ['0', '1', '</>', '{ }', '0x1F', 'AI', 'CPU', '=>', '&&', '0101', '[]', 'CSS', 'JS', 'HTML', 'GIT', 'SQL', 'DEV', 'API', 'FN', '10'];
    let codeStreams = [];

    class CodeParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.text = symbols[Math.floor(Math.random() * symbols.length)];
        this.speed = 0.25 + Math.random() * 0.45;
        this.fontSize = Math.floor(10 + Math.random() * 4);
        this.opacity = 0.07 + Math.random() * 0.16;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speed;
        if (this.y < -20) {
          this.y = height + 20;
          this.x = Math.random() * width;
          this.text = symbols[Math.floor(Math.random() * symbols.length)];
        }
      }

      draw() {
        ctx.font = `${this.fontSize}px "Fira Code", "Courier New", monospace`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1.0;
      }
    }

    function initCodeStreams() {
      codeStreams = [];
      const streamCount = Math.min(Math.floor(width / 45), 35);
      for (let i = 0; i < streamCount; i++) {
        codeStreams.push(new CodeParticle());
      }
    }

    initNodes();
    initCodeStreams();

    function animate() {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      for (let i = 0; i < codeStreams.length; i++) {
        codeStreams[i].update();
        codeStreams[i].draw();
      }

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();
      }

      const maxDist = 135;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.strokeStyle = `rgba(112, 214, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            if (Math.random() < 0.0008 && dataPackets.length < 15) {
              dataPackets.push(new DataPacket(nodes[i], nodes[j]));
            }
          }
        }

        if (mouse.active) {
          const mdx = nodes[i].x - mouse.x;
          const mdy = nodes[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouse.radius) {
            const mAlpha = (1 - mdist / mouse.radius) * 0.45;
            ctx.strokeStyle = `rgba(173, 95, 255, ${mAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (let i = dataPackets.length - 1; i >= 0; i--) {
        if (dataPackets[i].update()) {
          dataPackets[i].draw();
        } else {
          dataPackets.splice(i, 1);
        }
      }

      if (mouse.active) {
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(112, 214, 255, 0.4)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(173, 95, 255, 0.6)';
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(6, 0);
        ctx.moveTo(0, -6);
        ctx.lineTo(0, 6);
        ctx.stroke();

        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCanvas);
  } else {
    setupCanvas();
  }
})();
