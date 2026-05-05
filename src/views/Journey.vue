<template>
  <div class="journey-view pt-32 pb-16">
    <div class="container text-center mb-12">
      <h1 class="section-title mb-4">My Journey</h1>
      <p class="text-muted">Where I've worked, studied, and gotten certified.</p>
    </div>

    <div class="container">
      <div class="grid grid-cols-3 journey-grid">
        <!-- Education -->
        <div class="journey-column">
          <h3 class="journey-header"><i class="fas fa-graduation-cap text-accent"></i> Education</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">Dec 2021 - May 2025</div>
              <h4 class="timeline-title">B.E. Computer Science</h4>
              <p class="timeline-subtitle">Jain College of Engineering</p>
              <p class="timeline-meta">CGPA 8.40</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">Jun 2021</div>
              <h4 class="timeline-title">Pre-University</h4>
              <p class="timeline-subtitle">Mahesh PU College</p>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div class="journey-column">
          <h3 class="journey-header"><i class="fas fa-certificate text-accent"></i> Certifications</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">Dec 2024 - Dec 2027</div>
              <h4 class="timeline-title">AWS Cloud Practitioner</h4>
              <p class="timeline-subtitle">Amazon Web Services</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">2024</div>
              <h4 class="timeline-title">AWS CLF-C02 Course</h4>
              <p class="timeline-subtitle">Udemy</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">2023</div>
              <h4 class="timeline-title">Django Masterclass</h4>
              <p class="timeline-subtitle">Udemy</p>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div class="journey-column">
          <h3 class="journey-header"><i class="fas fa-briefcase text-accent"></i> Experience</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">Aug 2025 - Present</div>
              <h4 class="timeline-title">Product Engineer Trainee</h4>
              <p class="timeline-subtitle">SecurEnds Software Pvt LTD</p>
              <p class="timeline-meta">DevOps Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.pt-32 { padding-top: 8rem; }
.pb-16 { padding-bottom: 4rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-4 { margin-bottom: 1rem; }

/* Journey Timeline */
.journey-grid {
  gap: 2rem;
}

.journey-column {
  padding: 0 1rem;
}

.journey-header {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.timeline {
  position: relative;
  padding-left: 1.5rem;
  border-left: 2px solid var(--glass-border);
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -1.5rem;
  transform: translateX(-50%);
  top: 0.3rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent-primary);
  border: 3px solid var(--bg-card);
  animation: dot-blink 3s ease-in-out infinite;
}

@keyframes dot-blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 0px var(--accent-primary); }
  50% { opacity: 0.5; box-shadow: 0 0 8px var(--accent-primary); }
}

.timeline-date {
  font-size: 0.85rem;
  color: var(--accent-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
  color: var(--text-primary);
}

.timeline-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 0.3rem;
}

.timeline-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: italic;
}

@media (max-width: 992px) {
  .journey-grid { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
