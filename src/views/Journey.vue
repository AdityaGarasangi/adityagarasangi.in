<template>
  <div class="journey-view pt-32 pb-16">
    <div class="container text-center mb-20">
      <h1 class="section-title mb-4" v-reveal>My Journey</h1>
      <p class="text-muted" v-reveal>The milestones, experiences, and certifications that shaped my path.</p>
    </div>

    <div class="container">
      <div class="timeline-wrapper">
        <!-- The central line -->
        <div class="timeline-line"></div>

        <div class="timeline-events">
          

          <!-- <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass achievement">
              <div class="event-header">
                <span class="event-date">Oct 2024</span>
                <span class="event-tag achievement">Achievement</span>
              </div>
              <h3 class="event-title">Hackathon Winner</h3>
              <p class="event-subtitle">Cloud Native Tech Summit</p>
              <div class="event-body">
                <p>Won 1st place for building an automated disaster recovery tool using AWS and Terraform.</p>
              </div>
            </div>
          </div>


           <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass promoted">
              <div class="event-header">
                <span class="event-date">Jan 2026 - Present</span>
                <span class="event-tag promotion">Promotion</span>
              </div>
              <h3 class="event-title">New Senior Title</h3>
              <p class="event-subtitle">SecurEnds • Internal Promotion</p>
            </div>
          </div> -->

          <!-- Event 1: Product Engineer Trainee -->
          <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass work">
              <div class="event-header">
                <span class="event-date">Aug 2025 - Present</span>
                <span class="event-tag work">Experience</span>
              </div>
              <h3 class="event-title">Product Engineer (Trainee)</h3>
              <p class="event-subtitle">SecurEnds Software</p>
              <div class="event-location">
                <i class="fas fa-map-marker-alt"></i> Bengaluru, Karnataka, India
              </div>
              <div class="event-body">
                <p>Working as a DevOps Engineer, focusing on infrastructure automation and CI/CD pipelines.</p>
              </div>
            </div>
          </div>

          <!-- Event 2: B.E. Computer Science -->
          <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass edu">
              <div class="event-header">
                <span class="event-date">Dec 2021 - May 2025</span>
                <span class="event-tag edu">Education</span>
              </div>
              <h3 class="event-title">B.E. Computer Science</h3>
              <p class="event-subtitle">Jain College of Engineering</p>
              <div class="event-location">
                <i class="fas fa-map-marker-alt"></i> Belagavi, Karnataka, India
              </div>
              <div class="event-body">
                <p>Graduated with 8.40 <small>CGPA</small><br>Focused on core software engineering principles and cloud computing.</p>
              </div>
            </div>
          </div>

          <!-- Event 3: AWS Cloud Practitioner -->
          <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass cert">
              <div class="event-header">
                <span class="event-date">Dec 2024 - Dec 2027</span>
                <span class="event-tag cert">Certification</span>
              </div>
              <h3 class="event-title">AWS Certified Cloud Practitioner</h3>
              <p class="event-subtitle">Amazon Web Services</p>
              <div class="event-body">
                <p>Validated foundational cloud knowledge and AWS service ecosystem expertise.</p>
              </div>
            </div>
          </div>

          <!-- Event 4: AWS CLF-C02 Course -->
          <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass cert">
              <div class="event-header">
                <span class="event-date">2024</span>
                <span class="event-tag cert">Certification</span>
              </div>
              <h3 class="event-title">AWS CLF-C02 Course</h3>
              <p class="event-subtitle">Udemy</p>
              <div class="event-body">
                <p>Deep-dived into AWS architecture and security best practices.</p>
              </div>
            </div>
          </div>

          <!-- Event 5: Django Masterclass -->
          <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass cert">
              <div class="event-header">
                <span class="event-date">2023</span>
                <span class="event-tag cert">Certification</span>
              </div>
              <h3 class="event-title">Django Masterclass</h3>
              <p class="event-subtitle">Udemy</p>
              <div class="event-body">
                <p>Mastered backend development using Python and the Django framework.</p>
              </div>
            </div>
          </div>

          <!-- Event 6: Pre-University -->
          <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass edu">
              <div class="event-header">
                <span class="event-date">Jun 2021</span>
                <span class="event-tag edu">Education</span>
              </div>
              <h3 class="event-title">Pre-University</h3>
              <p class="event-subtitle">Mahesh PU College</p>
              <div class="event-location">
                <i class="fas fa-map-marker-alt"></i> Hubballi, Karnataka, India
              </div>
              <div class="event-body">
                <p>Completed pre-university education with a focus on Science and Mathematics.</p>
              </div>
            </div>
          </div>

          <div class="timeline-event" v-reveal>
            <div class="event-dot"></div>
            <div class="event-card glass edu">
              <div class="event-header">
                <span class="event-date">Jun 2019</span>
                <span class="event-tag edu">Education</span>
              </div>
              <h3 class="event-title">High School</h3>
              <p class="event-subtitle">Oriental High School</p>
              <div class="event-location">
                <i class="fas fa-map-marker-alt"></i> Hubballi, Karnataka, India
              </div>
              <div class="event-body">
                <p>Completed High School, establishing a strong academic foundation for higher education.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'Journey',
  meta: [
    { name: 'description', content: 'A visual timeline of my career, education, and technical certifications.' }
  ]
});
</script>

<style scoped>
.pt-32 { padding-top: 8rem; }
.pb-16 { padding-bottom: 4rem; }
.mb-20 { margin-bottom: 5rem; }

.timeline-wrapper {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}

/* The vertical line */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    transparent, 
    var(--glass-border) 10%, 
    var(--glass-border) 90%, 
    transparent
  );
  transform: translateX(-50%);
}

.timeline-events {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.timeline-event {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Category Colors & Glows */
.timeline-event {
  --event-color: var(--accent-primary);
  --event-glow: rgba(96, 165, 250, 0.3);
}

/* Color Overrides based on content (Work is default) */
.timeline-event:has(.edu) { --event-color: #34d399; --event-glow: rgba(52, 211, 153, 0.3); }
.timeline-event:has(.cert) { --event-color: #a78bfa; --event-glow: rgba(167, 139, 250, 0.3); }
.timeline-event:has(.achievement) { --event-color: #fbbf24; --event-glow: rgba(251, 191, 36, 0.3); }
.timeline-event:has(.promotion) { --event-color: #818cf8; --event-glow: rgba(129, 140, 248, 0.3); }

/* Dots on the line */
.event-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg-dark);
  border: 3px solid var(--event-color);
  z-index: 2;
  transition: all var(--transition-fast);
}

.timeline-event.is-visible .event-dot {
  background: var(--event-color);
  animation: dot-pulse 3s infinite ease-in-out;
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 0px var(--event-color); transform: translate(-50%, -50%) scale(1); }
  50% { box-shadow: 0 0 15px var(--event-color); transform: translate(-50%, -50%) scale(1.15); }
}

/* Event Cards */
.event-card {
  width: 42%;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  position: relative;
  transition: all var(--transition-slow);
  animation: card-glow 4s infinite ease-in-out;
  border: 1px solid var(--glass-border);
  overflow: hidden; /* For trophy clipping */
}

@keyframes card-glow {
  0%, 100% { border-color: var(--glass-border); box-shadow: 0 0 0px transparent; }
  50% { border-color: var(--event-color); box-shadow: 0 0 20px var(--event-glow); }
}

/* Decorative Background Icons */
.event-card::after {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  position: absolute;
  right: -10px;
  bottom: -10px;
  font-size: 5rem;
  opacity: 0.05;
  transform: rotate(-15deg);
  pointer-events: none;
  transition: all var(--transition-slow);
  z-index: 0;
}

.event-card:hover::after {
  opacity: 0.1;
  transform: rotate(0deg) scale(1.1);
}

.event-card.work::after { content: '\f0b1'; }        /* Briefcase */
.event-card.edu::after { content: '\f19d'; }         /* Graduation Cap */
.event-card.cert::after { content: '\f0a3'; }        /* Certificate */
.event-card.achievement::after { content: '\f091'; } /* Trophy */
.event-card.promoted::after { content: '\f135'; }    /* Rocket / Promotion */

/* Special styling for promotions */
.event-card.promoted {
  border-left: 4px solid var(--accent-primary) !important;
}

/* Alternating Sides */
.timeline-event:nth-child(odd) {
  justify-content: flex-start;
}

.timeline-event:nth-child(even) {
  justify-content: flex-end;
}

.timeline-event:nth-child(odd) .event-card {
  transform: translateX(-20px);
}

.timeline-event:nth-child(even) .event-card {
  transform: translateX(20px);
}

.timeline-event.is-visible .event-card {
  transform: translateX(0);
  opacity: 1;
}

/* Card Header */
.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.event-date {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-primary);
}

.event-tag {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.event-tag.work { background: rgba(96, 165, 250, 0.15); color: #60a5fa; }
.event-tag.edu  { background: rgba(52, 211, 153, 0.15); color: #34d399; }
.event-tag.cert { background: rgba(167, 139, 250, 0.15); color: #a78bfa; }
.event-tag.achievement { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }
.event-tag.promotion { background: rgba(129, 140, 248, 0.15); color: #818cf8; }

.event-title {
  font-size: 1.25rem;
  margin-bottom: 0.3rem;
  color: var(--text-primary);
}

.event-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.event-location {
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.event-location i {
  color: var(--event-color);
  font-size: 0.8rem;
}

.event-body {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .event-dot {
    left: 20px;
  }

  .event-card {
    width: calc(100% - 60px);
    margin-left: 60px;
  }

  .timeline-event:nth-child(odd),
  .timeline-event:nth-child(even) {
    justify-content: flex-start;
  }

  .timeline-event:nth-child(odd) .event-card,
  .timeline-event:nth-child(even) .event-card {
    transform: translateX(20px);
  }

  .timeline-event.is-visible .event-card {
    transform: translateX(0);
  }
}
</style>

