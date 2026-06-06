const navLinks = document.querySelector('.nav-links');
const menuToggle = document.getElementById('menuToggle');
const body = document.body;
const sections = document.querySelectorAll('section[id]');
const progressBar = document.querySelector('.progress-bar');
const revealElements = document.querySelectorAll('.reveal');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
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
  progressBar.style.width = `${progress}%`;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
      });
    }
  });
});

const filterProjects = (category) => {
  projectCards.forEach(card => {
    const categories = card.dataset.categories.toLowerCase().split(',');
    const title = card.dataset.title.toLowerCase();
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
    if (link.host === window.location.host && link.pathname !== window.location.pathname) return;
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
    modalImage.src = src;
    modalTitle.textContent = title;
    modalOverlay.classList.add('active');
  });
});
