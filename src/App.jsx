import { useEffect } from 'react';
import markup from './portfolio.html?raw';
import './App.css';

const projects = [
  {
    title: 'Epoxy Bois',
    description:
      'Laravel website I built from scratch for a real business, with a production-ready front end and content structure.',
    problem:
      'The business needed a modern, clear web presence to present services and products professionally.',
    solution:
      'Developed the full project using Laravel, Blade templates, and MySQL with a clean architecture and responsive design.',
    impact:
      'Delivered a live website ready for clients and ongoing updates.',
    tech: ['Laravel', 'PHP', 'Blade', 'MySQL', 'HTML', 'CSS'],
    demo: 'https://epoxy-bois.com/fr'
  },
  {
    title: 'Tawki D SA',
    description:
      'Laravel-based platform where I contributed development improvements and feature enhancements.',
    problem:
      'The project needed technical updates to improve stability and overall user experience.',
    solution:
      'Implemented targeted Laravel improvements, optimized existing flows, and added development refinements.',
    impact:
      'Helped strengthen the platform and improve usability.',
    tech: ['Laravel', 'PHP', 'Blade', 'MySQL', 'APIs'],
    demo: 'https://tawkidsa.com/'
  },
  {
    title: 'Halmanhaj',
    description:
      'Laravel educational website project focused on clear structure and practical usability.',
    problem:
      'Needed a maintainable platform structure that supports content growth and smooth browsing.',
    solution:
      'Built the project with Laravel architecture, Blade views, and MySQL-backed data management.',
    impact:
      'Published a live Laravel project aligned with modern web application practices.',
    tech: ['Laravel', 'PHP', 'Blade', 'MySQL', 'REST APIs'],
    demo: 'https://www.halmanhaj.com/'
  }
];

const githubColors = [
  'var(--bg-elevated)',
  'rgba(0, 212, 170, 0.2)',
  'rgba(0, 212, 170, 0.4)',
  'rgba(0, 212, 170, 0.6)',
  'rgba(0, 212, 170, 0.8)'
];

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project, index) => `
        <div class="reveal project-card rounded-2xl overflow-hidden" style="transition-delay: ${index * 0.1}s;">
          <div class="grid lg:grid-cols-2">
            <div class="aspect-video lg:aspect-auto img-placeholder">
              <div class="w-full h-full flex items-center justify-center">
                <svg class="w-16 h-16" style="color: var(--muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div class="p-6 lg:p-8">
              <div class="flex items-start justify-between gap-4 mb-4">
                <h3 class="text-xl font-bold">${project.title}</h3>
                <div class="flex gap-2 flex-shrink-0">
                  <a href="${project.demo}" target="_blank" rel="noreferrer" class="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Visit Site</a>
                </div>
              </div>
              <p class="text-sm mb-4" style="color: var(--muted);">${project.description}</p>

              <div class="space-y-3 mb-4">
                <div class="text-xs">
                  <span style="color: var(--accent);">Problem:</span>
                  <span style="color: var(--muted);">${project.problem}</span>
                </div>
                <div class="text-xs">
                  <span style="color: var(--accent);">Solution:</span>
                  <span style="color: var(--muted);">${project.solution}</span>
                </div>
                <div class="text-xs">
                  <span style="color: var(--accent);">Impact:</span>
                  <span style="color: var(--muted);">${project.impact}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                ${project.tech.map((t) => `<span class="tech-badge text-xs">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join('');
}

function renderGithubGrid() {
  const grid = document.getElementById('github-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const weeks = 52;
  const daysPerWeek = 7;

  for (let week = 0; week < weeks; week += 1) {
    for (let day = 0; day < daysPerWeek; day += 1) {
      const level = Math.floor(Math.random() * 5);
      const cell = document.createElement('div');
      cell.className = 'w-3 h-3 rounded-sm';
      cell.style.background = githubColors[level];
      cell.style.transition = 'transform 0.2s ease';
      cell.addEventListener('mouseenter', () => {
        cell.style.transform = 'scale(1.3)';
      });
      cell.addEventListener('mouseleave', () => {
        cell.style.transform = 'scale(1)';
      });
      grid.appendChild(cell);
    }
  }
}

function initParticles() {
  const canvas = document.getElementById('particles');
  if (!(canvas instanceof HTMLCanvasElement)) return undefined;

  const ctx = canvas.getContext('2d');
  if (!ctx) return undefined;

  let particles = [];
  let animationId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const numParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < numParticles; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 170, ${p.opacity})`;
      ctx.fill();

      particles.slice(i + 1).forEach((p2) => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 212, 170, ${0.1 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      });
    });

    animationId = window.requestAnimationFrame(animate);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    resize();
    createParticles();
    animate();
    window.addEventListener('resize', onResize);
  }

  function onResize() {
    resize();
    createParticles();
  }

  return () => {
    window.removeEventListener('resize', onResize);
    if (animationId !== null) {
      window.cancelAnimationFrame(animationId);
    }
  };
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length === 0) return undefined;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  reveals.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');

  if (!toggle || !moonIcon || !sunIcon) return undefined;

  const onToggle = () => {
    document.body.classList.toggle('light-mode');
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
  };

  toggle.addEventListener('click', onToggle);

  return () => {
    toggle.removeEventListener('click', onToggle);
  };
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (!btn || !menu) return undefined;

  const onBtnClick = () => {
    menu.classList.toggle('hidden');
  };

  const links = menu.querySelectorAll('a');
  const onLinkClick = () => {
    menu.classList.add('hidden');
  };

  btn.addEventListener('click', onBtnClick);
  links.forEach((link) => link.addEventListener('click', onLinkClick));

  return () => {
    btn.removeEventListener('click', onBtnClick);
    links.forEach((link) => link.removeEventListener('click', onLinkClick));
  };
}

function initTyping() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return undefined;

  const texts = [
    'Laravel developer ready for new challenges.',
    'Building modern web apps with Blade, PHP, and MySQL.',
    "Let's build your next project."
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    typingEl.textContent = texts[0];
    return undefined;
  }

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeoutId;

  const type = () => {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex -= 1;
    } else {
      typingEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex += 1;
    }

    let delay = isDeleting ? 30 : 50;

    if (!isDeleting && charIndex === currentText.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 500;
    }

    timeoutId = window.setTimeout(type, delay);
  };

  type();

  return () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  };
}

function App() {
  useEffect(() => {
    document.body.classList.add('bg-grid');

    renderProjects();
    renderGithubGrid();

    const cleanupParticles = initParticles();
    const cleanupReveal = initScrollReveal();
    const cleanupTheme = initThemeToggle();
    const cleanupMobile = initMobileMenu();
    const cleanupTyping = initTyping();

    return () => {
      document.body.classList.remove('bg-grid');
      document.body.classList.remove('light-mode');
      cleanupParticles?.();
      cleanupReveal?.();
      cleanupTheme?.();
      cleanupMobile?.();
      cleanupTyping?.();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}

export default App;
