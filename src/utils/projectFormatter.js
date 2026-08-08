// ─────────────────────────────────────────────────────────────
// 🏠 FEATURED REPOS — shown on the homepage (order matters)
// Only repo names here. Add/remove to control the homepage list.
// ─────────────────────────────────────────────────────────────
export const FEATURED_REPOS = [
  'terraform-aws-infrastructure',
  'AWS-Devops-Portfolio-Deployment',
  'dockerized-nodejs-mongo-app',
  'Kubernetes-Email-Submission-App',
  // ✅ Add more featured repos here (homepage only):
  // 'your-repo-name',
];

// ─────────────────────────────────────────────────────────────
// ✏️  CUSTOM TITLES — global display name overrides
// Applies everywhere in the app (homepage, side hustles, cards).
// Use this to override the auto-formatted title for any repo.
// ─────────────────────────────────────────────────────────────
export const CUSTOM_TITLES = {
  'AWS-Devops-Portfolio-Deployment': 'AWS DevOps Portfolio Deployment',
  'dockerized-nodejs-mongo-app': 'Dockerized Node.js MongoDB App',
  'Kubernetes-Email-Submission-App': 'Kubernetes Email Submission App',
  'terraform-aws-infrastructure': 'Terraform AWS Infrastructure',
  'adityagarasangi.in': 'adityagarasangi.in',
  'AdityaGarasangi': 'AdityaGarasangi',
  'Jenkins-CICD-Pipeline-Nodejs': 'Jenkins CICD Pipeline Nodejs',
  'DPDzero-Devops-Assignment': 'DPDzero Devops Assignment'
};

// ─────────────────────────────────────────────────────────────
// 🔧 formatProjectTitle — resolves the display title for a repo
// Priority: CUSTOM_TITLES → auto kebab-case → Title Case fallback
// ─────────────────────────────────────────────────────────────
export const formatProjectTitle = (repoName) => {
  if (!repoName) return '';

  if (CUSTOM_TITLES[repoName]) {
    return CUSTOM_TITLES[repoName];
  }

  // Fallback: convert kebab-case or snake_case to Title Case
  return repoName
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

