const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const metricElements = document.querySelectorAll(".metric strong[data-count]");
let metricsAnimated = false;

function animateMetrics() {
  if (metricsAnimated) return;
  const impact = document.getElementById("impact");
  if (!impact) return;

  const rect = impact.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.82 && rect.bottom > 0) {
    metricsAnimated = true;
    metricElements.forEach((el) => {
      const target = Number(el.dataset.count);
      const suffix = el.textContent.replace(String(target), "");
      let start = 0;
      const duration = 900;
      const startTime = performance.now();

      const tick = (now) => {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        start = Math.floor(eased * target);
        el.textContent = `${start}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  }
}

window.addEventListener("scroll", animateMetrics, { passive: true });
animateMetrics();

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a[href^='#']")];

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navItems.forEach((item) => item.classList.toggle("active", item.getAttribute("href") === id));
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));
