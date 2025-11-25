/* =========================================================
   ANIMACIÓN DEL CANVAS
   ========================================================= */

const canvas = document.getElementById("dataCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const POINTS_COUNT = 50;
  const MAX_DISTANCE = 150;
  const points = [];

  function randomColor() {
    const r = Math.floor(Math.random() * 200 + 55);
    const g = Math.floor(Math.random() * 200 + 55);
    const b = Math.floor(Math.random() * 200 + 55);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function randomSpeed() {
    return (Math.random() - 0.5) * 0.5;
  }

  for (let i = 0; i < POINTS_COUNT; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: randomSpeed(),
      vy: randomSpeed(),
      radius: Math.random() * 3 + 2,
      color: randomColor(),
      changeTimer: Math.random() * 100
    });
  }

  function drawLines() {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DISTANCE) {
          const alpha = 1 - dist / MAX_DISTANCE;
          ctx.strokeStyle = `rgba(50, 150, 250, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function drawPoints() {
    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      p.changeTimer--;
      if (p.changeTimer <= 0) {
        p.color = randomColor();
        p.radius = Math.random() * 3 + 2;
        p.changeTimer = Math.random() * 200 + 50;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
    drawPoints();
    requestAnimationFrame(animate);
  }

  animate();
}

/* =========================================================
   CÁLCULO AUTOMÁTICO DE PERÍODOS
   ========================================================= */

function calcularPeriodos() {
  const elementos = document.querySelectorAll('.periodo');
  const anioActual = new Date().getFullYear();

  elementos.forEach(e => {
    const inicio = parseInt(e.dataset.start);
    const fin = e.dataset.end === "actual" ? anioActual : parseInt(e.dataset.end);
    const total = fin - inicio + 1;

    e.textContent = ` • (${total} año${total > 1 ? 's' : ''})`;
  });
}
calcularPeriodos();

/* =========================================================
    FILTRO POR TEMÁTICAS 
    ========================================================= */

// Filtrado por etiqueta
const tagButtons = document.querySelectorAll('.tag-filter-btn');
const projectCards = document.querySelectorAll('.project-card');

tagButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remover la clase 'active' de todos los botones
    tagButtons.forEach(b => b.classList.remove('active'));
    // Agregar la clase 'active' al botón clicado
    btn.classList.add('active');

    // Obtener la etiqueta seleccionada
    const selectedTag = btn.dataset.tag;
    
    // Filtrar las tarjetas de proyecto
    projectCards.forEach(card => {
      const projectTags = card.dataset.tags.split(' '); // Aquí se soportan varias etiquetas por tarjeta
      if (selectedTag === 'all' || projectTags.includes(selectedTag)) {
        card.style.display = 'block'; // Mostrar el proyecto
      } else {
        card.style.display = 'none'; // Ocultar el proyecto
      }
    });
  });
});




