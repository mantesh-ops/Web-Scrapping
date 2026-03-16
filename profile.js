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

const profileCard = document.getElementById('profileCard');
const params = new URLSearchParams(window.location.search);
const expertId = Number(params.get('id'));
const experts = Array.isArray(window.experts) && window.experts.length ? window.experts : defaultExperts;

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
