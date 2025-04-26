document.addEventListener('DOMContentLoaded', () => {
  /* Обработка отправки формы */
  const form = document.getElementById('applicationForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Ваша заявка успешно отправлена!');
    form.reset();
  });

  /* Анимация появления секций при скролле */
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(section => observer.observe(section));

  /* АНМАЦИЯ ЛЕТАЮЩИХ ЧАСТИЦ */
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Параметры частиц и массив для хранения объектов
  const particleCount = 100;
  const particles = [];

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: "rgba(255, 255, 255, 0.8)"  // белые частицы
      });
    }
  }

  function updateParticles() {
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }

  function animateParticles() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
});
