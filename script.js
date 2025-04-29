const heroes = [
  { name: 'D.Va', img: 'images/dva.png' },
  { name: 'Doomfist', img: 'images/doom.png' },
  { name: 'Hazard', img: 'images/hazard.png' },
  { name: 'Junkerqueen', img: 'images/jq.png' },
  { name: 'Mauga', img: 'images/mauga.png' },
  { name: 'Orisa', img: 'images/orisa.png' },
  { name: 'Ramattra', img: 'images/ram.png' },
  { name: 'Reinhardt', img: 'images/reinhardt.png' },
  { name: 'Roadhog', img: 'images/hog.png' },
  { name: 'Sigma', img: 'images/sigma.png' },
  { name: 'Winston', img: 'images/winston.png' },
  { name: 'Wrecking Ball', img: 'images/ball.png' },
  { name: 'Zarya', img: 'images/zarya.png' },
  { name: 'Ashe', img: 'images/ashe.png' },
  { name: 'Bastion', img: 'images/bastion.png' },
  { name: 'Cassidy', img: 'images/cass.png' },
  { name: 'Echo', img: 'images/echo.png' },
  { name: 'Freja', img: 'images/freja.png' },
  { name: 'Genji', img: 'images/genji.png' },
  { name: 'Hanzo', img: 'images/hanzo.png' },
  { name: 'Junkrat', img: 'images/junkrat.png' },
  { name: 'Mei', img: 'images/mei.png' },
  { name: 'Pharah', img: 'images/pharah.png' },
  { name: 'Reaper', img: 'images/reaper.png' },
  { name: 'Sojourn', img: 'images/soj.png' },
  { name: 'Soldier', img: 'images/soldier.png' },
  { name: 'Sombra', img: 'images/sombra.png' },
  { name: 'Symmetra', img: 'images/sym.png' },
  { name: 'Torbjorn', img: 'images/torb.png' },
  { name: 'Tracer', img: 'images/tracer.png' },
  { name: 'Venture', img: 'images/venture.png' },
  { name: 'Widowmaker', img: 'images/widow.png' },
  { name: 'Tracer', img: 'images/tracer.png' },
  
  { name: 'Ana', img: 'images/ana.png' },
  { name: 'Baptiste', img: 'images/bap.png' },
  { name: 'Brigitte', img: 'images/brig.png' },
  { name: 'Illari', img: 'images/illari.png' },
  { name: 'Juno', img: 'images/juno.png' },
  { name: 'Kiriko', img: 'images/kiri.png' },
  { name: 'Lifeweaver', img: 'images/lw.png' },
  { name: 'Lucio', img: 'images/lucio.png' },
  { name: 'Mercy', img: 'images/mercy.png' },
  { name: 'Moira', img: 'images/moira.png' },
  { name: 'Zenyatta', img: 'images/zen.png' }


];

const teamCount = 42;
const slotCount = 5;

const roles = ['Tank', 'FDPS', 'HS', 'FS', 'MS'];

let draggedHero = null;
let placingCooldown = false;

const pool = document.getElementById('hero-pool');
const teamsContainer = document.getElementById('teams-container');

// Create hero pool
heroes.forEach(hero => {
  const box = document.createElement('div');
  box.className = 'hero';
  box.dataset.name = hero.name;
  box.dataset.img = hero.img;

  const img = document.createElement('img');
  img.src = hero.img;
  img.alt = hero.name;
  box.appendChild(img);

  box.addEventListener('click', () => {
    draggedHero = hero;
  });

  pool.appendChild(box);
});

// Create teams with "Team/Map" input above each
for (let t = 0; t < teamCount; t++) {
  const wrapper = document.createElement('div');
  wrapper.className = 'team-wrapper';

  const input = document.createElement('input');
  input.className = 'team-label';
  input.placeholder = 'Team/Map';
  wrapper.appendChild(input);

  const grid = document.createElement('div');
  grid.className = 'grid';

  for (let i = 0; i < slotCount; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';

    const applyHero = () => {
      if (placingCooldown) return;
      if (draggedHero) {
        slot.innerHTML = '';
        const img = document.createElement('img');
        img.src = draggedHero.img;
        img.alt = draggedHero.name;
        slot.appendChild(img);
        draggedHero = null;
        placingCooldown = true;
        setTimeout(() => placingCooldown = false, 100);
      } else if (slot.children.length > 0) {
        slot.innerHTML = '';
      }
    };

    slot.addEventListener('click', applyHero);
    grid.appendChild(slot);
  }

  wrapper.appendChild(grid);
  teamsContainer.appendChild(wrapper);
}

// ✅ Export teams that have at least one filled slot — works on Safari too
function exportTeamsToClipboard() {
  const allWrappers = document.querySelectorAll('.team-wrapper');
  let exportText = '';

  allWrappers.forEach((wrapper) => {
    const slots = wrapper.querySelectorAll('.slot');
    const filled = Array.from(slots).some(slot => slot.querySelector('img'));

    if (!filled) return;

    const label = wrapper.querySelector('.team-label')?.value.trim() || 'Team';
    exportText += `🟦 ${label}\n`;

    slots.forEach((slot, j) => {
      const name = slot.querySelector('img')?.alt || '-';
      exportText += `${roles[j]}: ${name}\n`;
    });

    exportText += '\n';
  });

  if (exportText.trim()) {
    // Safari-safe fallback copy method
    const textarea = document.createElement('textarea');
    textarea.value = exportText;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const success = document.execCommand('copy');
      alert(success ? 'Copied to clipboard! ✅' : 'Copy failed 😢');
    } catch (err) {
      alert('Clipboard error in this browser 😓');
    }
    document.body.removeChild(textarea);
  } else {
    alert('No teams filled. Nothing to copy.');
  }
}
