const experts = [
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

const grid = document.getElementById('expertsGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const specialtyFilter = document.getElementById('specialtyFilter');
const profileDialog = document.getElementById('profileDialog');
const dialogContent = document.getElementById('dialogContent');
const closeDialog = document.getElementById('closeDialog');

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
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open profile for ${expert.name}`);

    card.innerHTML = `
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
    `;

    const open = () => openProfile(expert);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });

    grid.appendChild(card);
  }
}

function openProfile(expert) {
  dialogContent.innerHTML = `
    <h2 id="dialogTitle" class="profile-title">${expert.name}</h2>
    <p class="role">${expert.title} · ${expert.specialty}</p>
    <p><strong>Location:</strong> ${expert.location}</p>
    <p><strong>Experience:</strong> ${expert.years} years</p>
    <p>${expert.bio}</p>
    <p><strong>Contact:</strong> <a href="mailto:${expert.contact}">${expert.contact}</a></p>
  `;

  profileDialog.showModal();
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
closeDialog.addEventListener('click', () => profileDialog.close());
profileDialog.addEventListener('click', (event) => {
  const box = profileDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom;

  if (clickedOutside) {
    profileDialog.close();
  }
});

populateSpecialties();
refresh();
