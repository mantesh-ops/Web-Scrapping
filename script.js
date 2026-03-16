const defaultExperts = [
  {
    id: 1,
    name: 'Maria Keller',
    title: 'Tax Counsel',
    specialty: 'Tax & Customs',
    location: 'Berlin, Germany',
    years: 12,
    bio: 'Helps global companies navigate cross-border VAT, import/export issues, and compliance audits.',
    contact: 'maria.keller@yourfirm.com'
  },
  {
    id: 2,
    name: 'Nathan Ruiz',
    title: 'M&A Advisor',
    specialty: 'Corporate Law',
    location: 'Madrid, Spain',
    years: 9,
    bio: 'Advises growth-stage and enterprise clients on mergers, acquisitions, and governance structure.',
    contact: 'nathan.ruiz@yourfirm.com'
  },
  {
    id: 3,
    name: 'Anika Sato',
    title: 'IP Litigation Lead',
    specialty: 'Intellectual Property',
    location: 'Tokyo, Japan',
    years: 14,
    bio: 'Represents software and biotech clients in patent disputes and trademark enforcement matters.',
    contact: 'anika.sato@yourfirm.com'
  },
  {
    id: 4,
    name: 'Oliver Mensah',
    title: 'Employment Partner',
    specialty: 'Employment',
    location: 'London, UK',
    years: 11,
    bio: 'Specializes in executive contracts, workplace investigations, and labor dispute strategy.',
    contact: 'oliver.mensah@yourfirm.com'
  },
  {
    id: 5,
    name: 'Sofia Almeida',
    title: 'Data Privacy Consultant',
    specialty: 'Privacy & Cybersecurity',
    location: 'Lisbon, Portugal',
    years: 8,
    bio: 'Supports privacy programs, incident response planning, and GDPR readiness initiatives.',
    contact: 'sofia.almeida@yourfirm.com'
  },
  {
    id: 6,
    name: 'Luca Bianchi',
    title: 'Dispute Resolution Expert',
    specialty: 'Litigation',
    location: 'Milan, Italy',
    years: 10,
    bio: 'Leads commercial litigation and arbitration in high-value, multi-jurisdiction disputes.',
    contact: 'luca.bianchi@yourfirm.com'
  }
];

const experts = Array.isArray(window.experts) && window.experts.length ? window.experts : defaultExperts;

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
