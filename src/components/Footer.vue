<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="social-links">
        <a href="https://x.com/adityagarasangi" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/aditya._.garasangi/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://www.linkedin.com/in/adityagarasangi/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/AdityaGarasangi" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
      </div>
      <p>&copy; {{ new Date().getFullYear() }} Aditya Garasangi. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3rem 0;
  border-top: 1px solid var(--glass-border);
  background: rgba(5, 5, 5, 0.5);
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid var(--glass-border);
}

.social-links a:hover {
  background: var(--accent-primary);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(129, 140, 248, 0.4);
}

p {
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
