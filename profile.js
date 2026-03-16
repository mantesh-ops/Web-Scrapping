const profileCard = document.getElementById('profileCard');
const params = new URLSearchParams(window.location.search);
const expertId = Number(params.get('id'));
const experts = window.experts || [];

function initials(name) {
  return name
    .split(' ')
    .map((chunk) => chunk[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function renderNotFound() {
  profileCard.innerHTML = `
    <h1 class="profile-title">Profile not found</h1>
    <p class="meta">The selected expert profile does not exist.</p>
    <a class="back-link" href="index.html">Go back to experts</a>
  `;
}

function renderProfile(expert) {
  document.title = `${expert.name} | Expert Profile`;
  profileCard.innerHTML = `
    <div class="expert-header">
      <div class="avatar" aria-hidden="true">${initials(expert.name)}</div>
      <div>
        <h1 class="profile-title">${expert.name}</h1>
        <p class="role">${expert.title} · ${expert.specialty}</p>
      </div>
    </div>
    <p><strong>Location:</strong> ${expert.location}</p>
    <p><strong>Experience:</strong> ${expert.years} years</p>
    <p>${expert.bio}</p>
    <p><strong>Contact:</strong> <a href="mailto:${expert.contact}">${expert.contact}</a></p>
  `;
}

const expert = experts.find((entry) => entry.id === expertId);

if (!expert) {
  renderNotFound();
} else {
  renderProfile(expert);
}
