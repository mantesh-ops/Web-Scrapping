const experts = window.experts || [];

const grid = document.getElementById('expertsGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const specialtyFilter = document.getElementById('specialtyFilter');

function initials(name) {
  return name
    .split(' ')
    .map((chunk) => chunk[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function renderExperts(items) {
  grid.innerHTML = '';

  if (!items.length) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  for (const expert of items) {
    const card = document.createElement('li');
    card.className = 'expert-card';

    card.innerHTML = `
      <a class="expert-link" href="profile.html?id=${expert.id}" aria-label="Open profile for ${expert.name}">
        <div class="expert-header">
          <div class="avatar" aria-hidden="true">${initials(expert.name)}</div>
          <div>
            <h3>${expert.name}</h3>
            <p class="role">${expert.title}</p>
          </div>
        </div>
        <span class="tag">${expert.specialty}</span>
        <p class="meta">${expert.location}</p>
        <p class="meta">${expert.years} years of experience</p>
      </a>
    `;

    grid.appendChild(card);
  }
}

function getFilteredExperts() {
  const search = searchInput.value.trim().toLowerCase();
  const specialty = specialtyFilter.value;

  return experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(search) ||
      expert.specialty.toLowerCase().includes(search) ||
      expert.location.toLowerCase().includes(search);
    const matchesSpecialty = specialty === 'all' || expert.specialty === specialty;

    return matchesSearch && matchesSpecialty;
  });
}

function populateSpecialties() {
  const specialties = [...new Set(experts.map((expert) => expert.specialty))];

  for (const specialty of specialties) {
    const option = document.createElement('option');
    option.value = specialty;
    option.textContent = specialty;
    specialtyFilter.appendChild(option);
  }
}

function refresh() {
  renderExperts(getFilteredExperts());
}

searchInput.addEventListener('input', refresh);
specialtyFilter.addEventListener('change', refresh);

populateSpecialties();
refresh();
