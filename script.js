/* ================================================================
   DeepWork Full System — script.js
   Complete interactive productivity system with localStorage
   ================================================================ */

'use strict';

// ═══════════════════════════════════════════════════════════════
// DATA DEFINITIONS
// ═══════════════════════════════════════════════════════════════

const SCHEDULE_BLOCKS = [
  { id: 'fajr-ritual',  time: '৪:৩০',  period: 'AM', cat: 'prayer',   catBn: 'নামাজ',          title: 'ওপেনিং রিচুয়াল',         dur: '৪৫ মিনিট', tags: ['ফজর','জিকির','কুরআন'],         desc: 'ফজর নামাজ, সকালের জিকির ও কুরআন তিলাওয়াত' },
  { id: 'deep-work-1',  time: '৫:১৫',  period: 'AM', cat: 'deepwork', catBn: 'ডিপ ওয়ার্ক ১',   title: 'নিজের প্রজেক্ট',           dur: '২ ঘ ৪৫ মি', tags: ['travelerbd.com','ডেভেলপমেন্ট','ফোকাস'], desc: 'ফোন দূরে, মন একাগ্র। নিজস্ব ওয়েবসাইটের কাজ' },
  { id: 'morning-prep', time: '৮:০০',  period: 'AM', cat: 'morning',  catBn: 'প্রস্তুতি',        title: 'নাস্তা ও পরিবার',           dur: '১ ঘণ্টা',  tags: ['ফ্যামিলি','নাস্তা'],           desc: 'ফ্রেশ হওয়া, নাস্তা এবং পরিবারের সাথে সময়' },
  { id: 'commute-1',    time: '৯:০০',  period: 'AM', cat: 'commute',  catBn: 'যাতায়াত',         title: 'অফিসে যাওয়া',               dur: '১ ঘণ্টা',  tags: ['পডকাস্ট','জিকির','অডিওবুক'],   desc: 'ইসলামিক পডকাস্ট বা জিকির শুনতে শুনতে যাওয়া' },
  { id: 'deep-work-2',  time: '১০:০০', period: 'AM', cat: 'deepwork', catBn: 'ডিপ ওয়ার্ক ২',   title: 'অফিস ও ক্লায়েন্ট',          dur: '৩ ঘণ্টা',  tags: ['অফিস','ক্লায়েন্ট','প্রজেক্ট'], desc: 'অফিসের গুরুত্বপূর্ণ কাজ ও ক্লায়েন্ট প্রজেক্ট' },
  { id: 'dhuhr',        time: '১:০০',  period: 'PM', cat: 'prayer',   catBn: 'নামাজ',          title: 'জোহর ও লাঞ্চ',              dur: '১ ঘণ্টা',  tags: ['জোহর','লাঞ্চ','বিশ্রাম'],      desc: 'জোহরের নামাজ, দুপুরের খাবার, স্ক্রিন ব্রেক' },
  { id: 'deep-work-3',  time: '২:০০',  period: 'PM', cat: 'deepwork', catBn: 'ডিপ ওয়ার্ক ৩',   title: 'স্কিল ডেভেলপমেন্ট',          dur: '২ ঘ ১৫ মি', tags: ['কোডিং','লার্নিং','স্কিল'],     desc: 'পার্সোনাল প্রোগ্রামিং বা স্কিল ডেভেলপমেন্ট' },
  { id: 'asr',          time: '৪:১৫',  period: 'PM', cat: 'prayer',   catBn: 'নামাজ',          title: 'আসর ও বিরতি',               dur: '৩০ মিনিট', tags: ['আসর','চা','বিরতি'],           desc: 'আসরের নামাজ এবং হালকা চা/কফি' },
  { id: 'shallow',      time: '৪:৪৫',  period: 'PM', cat: 'shallow',  catBn: 'শ্যালো ওয়ার্ক',  title: 'ক্লোজিং টাস্ক',             dur: '১ ঘণ্টা',  tags: ['ইমেইল','সার্ভার','পরিকল্পনা'], desc: 'ইমেইল, সার্ভার মেইনটেন্যান্স, পরদিনের লিস্ট' },
  { id: 'commute-2',    time: '৬:০০',  period: 'PM', cat: 'commute',  catBn: 'যাতায়াত',         title: 'যাতায়াত ও মাগরিব',           dur: '১ ঘণ্টা',  tags: ['মাগরিব','ফিরতি পথ'],          desc: 'বাড়ি ফেরা এবং মাগরিব নামাজ আদায়' },
  { id: 'family',       time: '৭:০০',  period: 'PM', cat: 'family',   catBn: 'ফ্যামিলি',        title: 'পরিবার ও বিশ্রাম',           dur: '২ ঘণ্টা',  tags: ['পরিবার','ডিনার','আরাফ'],      desc: 'কাজ ডিসকানেক্ট। স্ত্রী ও আরাফকে সময় দিন।' },
  { id: 'isha',         time: '৯:০০',  period: 'PM', cat: 'prayer',   catBn: 'নামাজ',          title: 'এশা ও রিলাক্সেশন',           dur: '১ ঘণ্টা',  tags: ['এশা','পড়া','গল্প'],           desc: 'এশার নামাজ, হালকা বই পড়া বা পরিবারের সাথে গল্প' },
  { id: 'closing',      time: '১০:০০', period: 'PM', cat: 'closing',  catBn: 'ক্লোজিং',         title: 'রাতের রিচুয়াল',             dur: '১ ঘণ্টা',  tags: ['মুহাসাবাহ','আয়াতুল কুরসি','ঘুম'], desc: 'মুহাসাবাহ, পরদিনের পরিকল্পনা, সুন্নাহ ঘুম' },
];

const NAMAZ_LIST = [
  { id: 'fajr',   arabic: 'الفجر',  bn: 'ফজর',   hint: '৪:৩০ - ৫:৪৫' },
  { id: 'dhuhr',  arabic: 'الظهر',  bn: 'জোহর',  hint: '১:০০ - ২:০০' },
  { id: 'asr',    arabic: 'العصر',  bn: 'আসর',   hint: '৪:১৫ - ৫:৩০' },
  { id: 'maghrib',arabic: 'المغرب', bn: 'মাগরিব', hint: '৬:০০ - ৭:০০' },
  { id: 'isha',   arabic: 'العشاء', bn: 'এশা',   hint: '৯:০০ - ১০:৩০' },
];

const AMAL_LIST = [
  { id: 'quran',      icon: '📖', name: 'কুরআন তিলাওয়াত', desc: 'অন্তত ১ পাতা/দিন' },
  { id: 'dhikr',      icon: '📿', name: 'সকাল-সন্ধ্যার জিকির', desc: 'আযকার আস-সাবাহ ও আযকার আল-মাসা' },
  { id: 'duha',       icon: '🌅', name: 'সালাতুদ দুহা', desc: '২-৮ রাকাত, চাশতের সময়' },
  { id: 'sadaqah',    icon: '💝', name: 'সদকাহ', desc: 'যেকোনো পরিমাণ, যেকোনো কিছু' },
  { id: 'smile',      icon: '😊', name: 'হাসি দেওয়া', desc: 'পরিবার/সহকর্মীদের সাথে' },
  { id: 'istighfar',  icon: '🤲', name: 'ইস্তিগফার', desc: 'দিনে কমপক্ষে ১০০ বার' },
  { id: 'tahajjud',   icon: '🌙', name: 'তাহাজ্জুদ', desc: '(ঐচ্ছিক) রাতের বিশেষ নামাজ' },
  { id: 'goodword',   icon: '💬', name: 'ভালো কথা বলা', desc: 'কোনো কটু কথা না বলা' },
];

const MORNING_RITUALS = [
  { id: 'mr-1', title: 'ফজরের নামাজ', desc: 'ওযু করে ফজরের ফরয ও সুন্নাহ আদায় করুন' },
  { id: 'mr-2', title: 'সকালের দোয়া ও জিকির', desc: 'আযকারুস সাবাহ পড়ুন — সকালের নির্দিষ্ট জিকিরগুলো' },
  { id: 'mr-3', title: 'নিয়ত করুন', desc: 'হালাল উপার্জন ও মানুষের উপকারের নিয়তে দিন শুরু করুন' },
  { id: 'mr-4', title: 'ডিজিটাল ডিটক্স', desc: 'ফোন ও সোশ্যাল মিডিয়া না ধরে সরাসরি কাজে বসুন' },
  { id: 'mr-5', title: 'কাজের তালিকা দেখুন', desc: 'রাতে লেখা টাস্ক লিস্ট দেখে ডিপ ওয়ার্ক শুরু করুন' },
  { id: 'mr-6', title: 'পানি পান করুন', desc: 'কমপক্ষে ১ গ্লাস পানি পান করুন, মস্তিষ্ক সতেজ রাখুন' },
];

const EVENING_RITUALS = [
  { id: 'er-1', title: 'এশার নামাজ', desc: 'ওযু করে এশার ফরয ও সুন্নাহ আদায় করুন' },
  { id: 'er-2', title: 'সন্ধ্যার জিকির', desc: 'আযকারুল মাসা পড়ুন — সন্ধ্যার নির্দিষ্ট জিকিরগুলো' },
  { id: 'er-3', title: 'মুহাসাবাহ করুন', desc: '৫ মিনিট নিন। কী অর্জন হলো, কোথায় সময় নষ্ট হলো' },
  { id: 'er-4', title: 'কালকের টাস্ক লিখুন', desc: 'পরদিনের ডিপ ওয়ার্ক ব্লকের কাজ আজ রাতেই লিখুন' },
  { id: 'er-5', title: 'আয়াতুল কুরসি ও তিন কুল', desc: 'শুয়ে পড়ে তিনবার সূরা ইখলাস, ফালাক, নাস পড়ুন' },
  { id: 'er-6', title: 'সুন্নাহ ঘুম', desc: 'ওযু করে ডান কাত হয়ে ১১টার মধ্যে ঘুমান' },
];

const DEEP_WORK_BLOCKS = SCHEDULE_BLOCKS.filter(b => b.cat === 'deepwork');

// ═══════════════════════════════════════════════════════════════
// STATE MANAGEMENT (localStorage)
// ═══════════════════════════════════════════════════════════════

const TODAY = getToday();

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function loadState() {
  const raw = localStorage.getItem('dw-state');
  if (!raw) return getDefaultState();
  try {
    const s = JSON.parse(raw);
    if (s.date !== TODAY) {
      // New day — preserve streak, reset everything else
      const newState = getDefaultState();
      newState.streak = computeStreak(s);
      return newState;
    }
    return s;
  } catch { return getDefaultState(); }
}

function getDefaultState() {
  const s = {
    date: TODAY,
    streak: 0,
    schedule: {},
    namaz: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    amal: {},
    morningRitual: {},
    eveningRitual: {},
    tasks: {},        // { blockId: [{id, text, done}] }
    tomorrowTasks: {}, // { blockId: [text] }
    muhasabah: { accomplished: '', wasted: '', grateful: '', improve: '', rating: 0 },
    pomodoro: { count: 0, totalMin: 0 },
  };
  SCHEDULE_BLOCKS.forEach(b => { s.schedule[b.id] = { completed: false, note: '' }; });
  AMAL_LIST.forEach(a => { s.amal[a.id] = false; });
  MORNING_RITUALS.forEach(r => { s.morningRitual[r.id] = false; });
  EVENING_RITUALS.forEach(r => { s.eveningRitual[r.id] = false; });
  DEEP_WORK_BLOCKS.forEach(b => { s.tasks[b.id] = []; s.tomorrowTasks[b.id] = []; });
  return s;
}

function computeStreak(prevState) {
  // If yesterday's 5 prayers all done, increment streak
  const all5 = NAMAZ_LIST.every(n => prevState.namaz[n.id]);
  return all5 ? (prevState.streak || 0) + 1 : 0;
}

function saveState() {
  localStorage.setItem('dw-state', JSON.stringify(state));
}

let state = loadState();

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════

let currentPage = 'dashboard';
const pageNames = {
  dashboard: 'আজকের রুটিন',
  namaz:     'নামাজ ট্র্যাকার',
  deepwork:  'ডিপ ওয়ার্ক',
  amal:      'আমল ট্র্যাকার',
  ritual:    'রিচুয়াল',
  muhasabah: 'রাতের হিসাব',
};

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;
    navigateTo(page);
    // Close sidebar on mobile
    if (window.innerWidth <= 700) closeSidebar();
  });
});

function navigateTo(page) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`nav-${page}`).classList.add('active');
  document.getElementById(`page-${page}`).classList.add('active');
  document.getElementById('topbarTitle').textContent = pageNames[page];
  currentPage = page;
}

// ═══════════════════════════════════════════════════════════════
// SIDEBAR TOGGLE (mobile)
// ═══════════════════════════════════════════════════════════════

const sidebar  = document.getElementById('sidebar');
const overlay  = document.getElementById('sidebarOverlay');
const menuBtn  = document.getElementById('menuBtn');
const closeBtn = document.getElementById('sidebarClose');

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('show'); }
function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('show'); }

// ═══════════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════════

const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const themeLabel  = document.getElementById('themeLabel');

const savedTheme = localStorage.getItem('dw-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const cur  = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('dw-theme', next);
});

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  themeIcon.textContent  = t === 'dark' ? '☀️' : '🌙';
  themeLabel.textContent = t === 'dark' ? 'লাইট মোড' : 'ডার্ক মোড';
}

// ═══════════════════════════════════════════════════════════════
// LIVE CLOCK & DATE
// ═══════════════════════════════════════════════════════════════

const DAYS_BN = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
const MONTHS_BN = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];

function toBn(n) {
  return String(n).replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[d]);
}

function updateClock() {
  const d    = new Date();
  const h    = d.getHours();
  const m    = d.getMinutes();
  const s    = d.getSeconds();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12  = h % 12 || 12;
  document.getElementById('liveClock').textContent =
    `${toBn(h12)}:${toBn(String(m).padStart(2,'0'))}:${toBn(String(s).padStart(2,'0'))} ${ampm}`;
}

function setDateDisplay() {
  const d   = new Date();
  const day = DAYS_BN[d.getDay()];
  const dt  = toBn(d.getDate());
  const mon = MONTHS_BN[d.getMonth()];
  const yr  = toBn(d.getFullYear());
  document.getElementById('dateDay').textContent  = day;
  document.getElementById('dateFull').textContent = `${dt} ${mon}, ${yr}`;
}

setInterval(updateClock, 1000);
updateClock();
setDateDisplay();

// ═══════════════════════════════════════════════════════════════
// RESET DAY
// ═══════════════════════════════════════════════════════════════

document.getElementById('resetDay').addEventListener('click', () => {
  if (!confirm('আজকের সমস্ত ডেটা রিসেট করবেন? (স্ট্রিক বাদে)')) return;
  const streak = state.streak;
  state = getDefaultState();
  state.streak = streak;
  saveState();
  location.reload();
});

// ═══════════════════════════════════════════════════════════════
// DASHBOARD — SCHEDULE LIST
// ═══════════════════════════════════════════════════════════════

function renderSchedule() {
  const container = document.getElementById('scheduleList');
  container.innerHTML = '';

  SCHEDULE_BLOCKS.forEach((block, idx) => {
    const st   = state.schedule[block.id];
    const done = st.completed;

    const item = document.createElement('div');
    item.className = `sched-item${done ? ' completed' : ''}`;
    item.style.animationDelay = `${idx * 50}ms`;
    item.dataset.id = block.id;

    item.innerHTML = `
      <div class="sched-main">
        <button class="sched-check" aria-label="Mark complete" onclick="toggleSchedule('${block.id}', event)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
        <div class="sched-time">
          <span class="t-main">${block.time}</span>
          <span class="t-sub">${block.period}</span>
        </div>
        <span class="sched-dot dot-${block.cat}"></span>
        <div class="sched-info">
          <span class="sched-cat cat-${block.cat}">${block.catBn}</span>
          <div class="sched-title">${block.title}</div>
          <div class="sched-dur">${block.dur}</div>
        </div>
        <button class="sched-expand-btn" aria-label="Expand" onclick="toggleExpand('${block.id}', event)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>
      <div class="sched-expand">
        <div class="sched-expand-inner">
          <p style="font-size:0.82rem;color:var(--text-2);margin-bottom:12px;">${block.desc}</p>
          <div class="sched-note-label">নোট / কী করলাম</div>
          <textarea class="sched-note" rows="2" placeholder="এই ব্লকে কী করলাম লিখুন..." maxlength="300"
            oninput="saveNote('${block.id}', this.value)">${st.note}</textarea>
          <div class="sched-tags">${block.tags.map(t => `<span class="sched-tag">${t}</span>`).join('')}</div>
        </div>
      </div>
    `;

    container.appendChild(item);
  });

  updateDayProgress();
}

window.toggleSchedule = function(id, e) {
  e.stopPropagation();
  state.schedule[id].completed = !state.schedule[id].completed;
  saveState();
  renderSchedule();
  updateDayProgress();
  updateSidebarBadges();
  const done = state.schedule[id].completed;
  showToast(done ? '✅ সম্পন্ন হয়েছে!' : '↩️ চিহ্ন সরানো হলো');
};

window.toggleExpand = function(id, e) {
  e.stopPropagation();
  const item = document.querySelector(`.sched-item[data-id="${id}"]`);
  item.classList.toggle('expanded');
};

window.saveNote = function(id, val) {
  state.schedule[id].note = val;
  saveState();
};

// ─── Day Progress Ring & Bar ────────────────────────────────────
function updateDayProgress() {
  const total  = SCHEDULE_BLOCKS.length;
  const done   = SCHEDULE_BLOCKS.filter(b => state.schedule[b.id].completed).length;
  const pct    = total > 0 ? Math.round((done / total) * 100) : 0;
  const pctBn  = toBn(pct);

  // Sidebar bar
  document.getElementById('dayProgressBar').style.width = pct + '%';
  document.getElementById('dayProgressPct').textContent = pctBn + '%';

  // Ring
  const circumference = 2 * Math.PI * 32; // r=32
  const offset = circumference - (pct / 100) * circumference;
  const ring = document.getElementById('ringFill');
  if (ring) {
    ring.style.strokeDasharray  = `${circumference} ${circumference}`;
    ring.style.strokeDashoffset = offset;
  }
  const ringPct = document.getElementById('ringPct');
  if (ringPct) ringPct.textContent = pctBn + '%';
}

// ═══════════════════════════════════════════════════════════════
// NAMAZ TRACKER
// ═══════════════════════════════════════════════════════════════

function renderNamaz() {
  const grid = document.getElementById('namazGrid');
  grid.innerHTML = '';

  NAMAZ_LIST.forEach(n => {
    const prayed = state.namaz[n.id];
    const card   = document.createElement('div');
    card.className = `namaz-card${prayed ? ' prayed' : ''}`;
    card.innerHTML = `
      <span class="namaz-arabic">${n.arabic}</span>
      <div class="namaz-bn">${n.bn}</div>
      <span class="namaz-time-hint">${n.hint}</span>
      <div class="namaz-tick">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
    `;
    card.addEventListener('click', () => toggleNamaz(n.id, card));
    grid.appendChild(card);
  });

  updateNamazCount();
  updateStreak();
}

function toggleNamaz(id, card) {
  state.namaz[id] = !state.namaz[id];
  saveState();
  card.classList.toggle('prayed', state.namaz[id]);
  updateNamazCount();
  updateSidebarBadges();
  const prayed = state.namaz[id];
  showToast(prayed ? '🕌 আলহামদুলিল্লাহ! নামাজ আদায় হয়েছে' : '↩️ চিহ্ন সরানো হলো');
}

function updateNamazCount() {
  const count  = NAMAZ_LIST.filter(n => state.namaz[n.id]).length;
  document.getElementById('namazCount').textContent = toBn(count);
}

function updateStreak() {
  document.getElementById('streakVal').textContent = toBn(state.streak);
}

// ═══════════════════════════════════════════════════════════════
// DEEP WORK TIMER
// ═══════════════════════════════════════════════════════════════

let activeBlock   = null;
let timerInterval = null;
let timerSeconds  = 25 * 60;
let timerRunning  = false;
let sessionStart  = null;

function renderDwBlockSelector() {
  const sel = document.getElementById('dwBlockSelector');
  sel.innerHTML = '';
  DEEP_WORK_BLOCKS.forEach(b => {
    const btn = document.createElement('button');
    btn.className = `dw-block-btn${activeBlock?.id === b.id ? ' active' : ''}`;
    btn.textContent = b.catBn;
    btn.addEventListener('click', () => selectDwBlock(b));
    sel.appendChild(btn);
  });
}

function selectDwBlock(block) {
  if (timerRunning) {
    showToast('⚠️ আগে টাইমার থামান');
    return;
  }
  activeBlock = block;
  timerSeconds = 25 * 60;
  updateTimerDisplay();
  document.getElementById('timerBlockLabel').textContent = block.catBn + ' — ' + block.title;
  document.getElementById('timerStart').disabled = false;
  document.getElementById('timerReset').disabled = false;
  document.getElementById('tasksBlockTitle').textContent = block.title + ' — কাজের তালিকা';
  document.getElementById('tasksBlockTag').textContent = block.catBn;
  renderDwBlockSelector();
  renderTasks(block.id);
}

document.getElementById('timerStart').addEventListener('click', startTimer);
document.getElementById('timerPause').addEventListener('click', pauseTimer);
document.getElementById('timerReset').addEventListener('click', resetTimer);

function startTimer() {
  if (!activeBlock) return;
  timerRunning = true;
  sessionStart = Date.now();
  document.getElementById('timerStart').disabled = true;
  document.getElementById('timerPause').disabled = false;
  document.getElementById('timerDisplay').classList.add('running');

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      document.getElementById('timerDisplay').classList.remove('running');
      document.getElementById('timerDisplay').classList.add('finished');
      // Count pomodoro
      state.pomodoro.count++;
      state.pomodoro.totalMin += 25;
      saveState();
      updatePomodoroInfo();
      showToast('🎉 পোমোডোরো সম্পন্ন! সুবহানাল্লাহ');
      document.getElementById('timerStart').disabled = false;
      document.getElementById('timerPause').disabled = true;
      timerSeconds = 25 * 60;
      updateTimerDisplay();
      document.getElementById('timerDisplay').classList.remove('finished');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  document.getElementById('timerStart').disabled = false;
  document.getElementById('timerPause').disabled = true;
  document.getElementById('timerDisplay').classList.remove('running');
  showToast('⏸️ বিরতি');
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = 25 * 60;
  updateTimerDisplay();
  document.getElementById('timerStart').disabled = !activeBlock;
  document.getElementById('timerPause').disabled = true;
  document.getElementById('timerDisplay').classList.remove('running', 'finished');
}

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  document.getElementById('timerDisplay').textContent =
    `${toBn(String(m).padStart(2,'0'))}:${toBn(String(s).padStart(2,'0'))}`;
}

function updatePomodoroInfo() {
  document.getElementById('pomodoroCount').textContent  = toBn(state.pomodoro.count);
  document.getElementById('totalFocusTime').textContent = toBn(state.pomodoro.totalMin) + ' মি';
}

// ─── Task List ──────────────────────────────────────────────────
function renderTasks(blockId) {
  const list   = document.getElementById('taskList');
  const empty  = document.getElementById('tasksEmpty');
  const tasks  = state.tasks[blockId] || [];
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.appendChild(empty);
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tasks.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = `task-item${t.done ? ' done' : ''}`;
    item.innerHTML = `
      <button class="task-cb" onclick="toggleTask('${blockId}', ${i})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
      <span class="task-text" onclick="toggleTask('${blockId}', ${i})">${escHtml(t.text)}</span>
      <button class="task-del" onclick="deleteTask('${blockId}', ${i})" aria-label="Delete">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    list.appendChild(item);
  });
}

document.getElementById('taskAddBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

function addTask() {
  if (!activeBlock) { showToast('প্রথমে একটি ব্লক বেছে নিন'); return; }
  const input = document.getElementById('taskInput');
  const val   = input.value.trim();
  if (!val) return;
  if (!state.tasks[activeBlock.id]) state.tasks[activeBlock.id] = [];
  state.tasks[activeBlock.id].push({ text: val, done: false });
  saveState();
  input.value = '';
  renderTasks(activeBlock.id);
  showToast('✅ কাজ যোগ হয়েছে');
}

window.toggleTask = function(blockId, idx) {
  state.tasks[blockId][idx].done = !state.tasks[blockId][idx].done;
  saveState();
  renderTasks(blockId);
};

window.deleteTask = function(blockId, idx) {
  state.tasks[blockId].splice(idx, 1);
  saveState();
  renderTasks(blockId);
};

// ═══════════════════════════════════════════════════════════════
// AMAL TRACKER
// ═══════════════════════════════════════════════════════════════

function renderAmal() {
  const grid = document.getElementById('amalGrid');
  grid.innerHTML = '';
  document.getElementById('amalTotal').textContent = AMAL_LIST.length;

  AMAL_LIST.forEach(a => {
    const done = state.amal[a.id];
    const card = document.createElement('div');
    card.className = `amal-card${done ? ' done' : ''}`;
    card.innerHTML = `
      <div class="amal-check">✓</div>
      <span class="amal-icon">${a.icon}</span>
      <div class="amal-name">${a.name}</div>
      <div class="amal-desc">${a.desc}</div>
    `;
    card.addEventListener('click', () => toggleAmal(a.id, card));
    grid.appendChild(card);
  });

  updateAmalCount();
}

function toggleAmal(id, card) {
  state.amal[id] = !state.amal[id];
  saveState();
  card.classList.toggle('done', state.amal[id]);
  updateAmalCount();
  updateSidebarBadges();
  showToast(state.amal[id] ? '📿 আমল সম্পন্ন! জাযাকাল্লাহ' : '↩️ চিহ্ন সরানো হলো');
}

function updateAmalCount() {
  const count = AMAL_LIST.filter(a => state.amal[a.id]).length;
  document.getElementById('amalCount').textContent = toBn(count);
}

// ═══════════════════════════════════════════════════════════════
// RITUALS
// ═══════════════════════════════════════════════════════════════

function renderRituals() {
  renderChecklist('morningChecklist', MORNING_RITUALS, state.morningRitual, 'morning-cb', 'morningProgress');
  renderChecklist('eveningChecklist', EVENING_RITUALS, state.eveningRitual, 'evening-cb', 'eveningProgress');
}

function renderChecklist(containerId, list, stateObj, cbClass, progressId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  let doneCount = 0;
  list.forEach((r, i) => {
    const done = stateObj[r.id] || false;
    if (done) doneCount++;
    const item = document.createElement('div');
    item.className = `ritual-item${done ? ' done' : ''}`;
    item.innerHTML = `
      <button class="ritual-cb ${cbClass}" aria-label="Toggle" onclick="toggleRitual('${containerId}','${r.id}','${cbClass}','${progressId}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
      <div class="ritual-item-info">
        <div class="ritual-item-title">${r.title}</div>
        <div class="ritual-item-desc">${r.desc}</div>
      </div>
      <span class="ritual-item-num">${toBn(i+1)}</span>
    `;
    container.appendChild(item);
  });

  document.getElementById(progressId).textContent = `${toBn(doneCount)}/${toBn(list.length)}`;
}

window.toggleRitual = function(containerId, rId, cbClass, progressId) {
  const isMorning = containerId === 'morningChecklist';
  const stateObj  = isMorning ? state.morningRitual : state.eveningRitual;
  const list      = isMorning ? MORNING_RITUALS : EVENING_RITUALS;
  stateObj[rId]   = !stateObj[rId];
  saveState();
  renderChecklist(containerId, list, stateObj, cbClass, progressId);
  updateSidebarBadges();
  showToast(stateObj[rId] ? '✅ রিচুয়াল সম্পন্ন!' : '↩️ চিহ্ন সরানো হলো');
};

// ═══════════════════════════════════════════════════════════════
// MUHASABAH
// ═══════════════════════════════════════════════════════════════

function renderMuhasabah() {
  const m = state.muhasabah;
  document.getElementById('muh-accomplished').value = m.accomplished || '';
  document.getElementById('muh-wasted').value       = m.wasted       || '';
  document.getElementById('muh-grateful').value     = m.grateful     || '';
  document.getElementById('muh-improve').value      = m.improve      || '';
  updateStarRating(m.rating || 0);
}

// Textarea autosave
['accomplished','wasted','grateful','improve'].forEach(key => {
  const el = document.getElementById(`muh-${key}`);
  const cc = document.getElementById(`cc-${key}`);
  el.addEventListener('input', () => {
    state.muhasabah[key] = el.value;
    saveState();
    cc.textContent = `${el.value.length}/${el.maxLength}`;
  });
  el.addEventListener('focus', () => {
    if (cc) cc.textContent = `${el.value.length}/${el.maxLength}`;
  });
});

// Star rating
document.querySelectorAll('.star-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = parseInt(btn.dataset.val);
    state.muhasabah.rating = val;
    saveState();
    updateStarRating(val);
  });
});

function updateStarRating(val) {
  document.querySelectorAll('.star-btn').forEach((b, i) => {
    b.classList.toggle('active', i < val);
  });
}

// Save Muhasabah
document.getElementById('saveMuhBtn').addEventListener('click', () => {
  saveState();
  const confirm = document.getElementById('saveConfirm');
  confirm.classList.add('show');
  setTimeout(() => confirm.classList.remove('show'), 3500);
  showToast('🤲 মুহাসাবাহ সেভ হয়েছে');
});

// ─── Tomorrow Planning ─────────────────────────────────────────
function renderTomorrowBlocks() {
  const container = document.getElementById('tomorrowBlocks');
  container.innerHTML = '';

  DEEP_WORK_BLOCKS.forEach(block => {
    const tasks = state.tomorrowTasks[block.id] || [];
    const wrap  = document.createElement('div');
    wrap.className = 'tmr-block';
    wrap.innerHTML = `
      <div class="tmr-block-label">
        <span class="tmr-block-tag cat-${block.cat}">${block.catBn}</span>
        <span class="tmr-block-time">${block.time} ${block.period} — ${block.title}</span>
      </div>
      <div class="tmr-input-row">
        <input type="text" class="tmr-input" id="tmr-input-${block.id}" placeholder="কাল কী করবো..." maxlength="100" />
        <button class="tmr-add" onclick="addTomorrowTask('${block.id}')">+</button>
      </div>
      <div class="tmr-task-list" id="tmr-list-${block.id}">
        ${tasks.map((t, i) => `
          <div class="tmr-task-item">
            <span class="tmr-task-bullet"></span>
            <span class="tmr-task-text">${escHtml(t)}</span>
            <button class="tmr-task-del" onclick="deleteTomorrowTask('${block.id}', ${i})">✕</button>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(wrap);

    // Enter key
    const inp = wrap.querySelector(`#tmr-input-${block.id}`);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') addTomorrowTask(block.id); });
  });
}

window.addTomorrowTask = function(blockId) {
  const inp = document.getElementById(`tmr-input-${blockId}`);
  const val = inp.value.trim();
  if (!val) return;
  if (!state.tomorrowTasks[blockId]) state.tomorrowTasks[blockId] = [];
  state.tomorrowTasks[blockId].push(val);
  saveState();
  inp.value = '';
  renderTomorrowBlocks();
  showToast('📋 কালকের কাজ যোগ হয়েছে');
};

window.deleteTomorrowTask = function(blockId, idx) {
  state.tomorrowTasks[blockId].splice(idx, 1);
  saveState();
  renderTomorrowBlocks();
};

// ═══════════════════════════════════════════════════════════════
// SIDEBAR BADGES
// ═══════════════════════════════════════════════════════════════

function updateSidebarBadges() {
  // Dashboard — incomplete blocks
  const incomplete = SCHEDULE_BLOCKS.filter(b => !state.schedule[b.id].completed).length;
  setBadge('badge-dashboard', incomplete);

  // Namaz — remaining
  const namazDone = NAMAZ_LIST.filter(n => state.namaz[n.id]).length;
  setBadge('badge-namaz', 5 - namazDone);

  // Amal — remaining
  const amalDone = AMAL_LIST.filter(a => state.amal[a.id]).length;
  setBadge('badge-amal', AMAL_LIST.length - amalDone);

  // Ritual — remaining
  const morningDone  = MORNING_RITUALS.filter(r => state.morningRitual[r.id]).length;
  const eveningDone  = EVENING_RITUALS.filter(r => state.eveningRitual[r.id]).length;
  const ritualRem    = (MORNING_RITUALS.length + EVENING_RITUALS.length) - morningDone - eveningDone;
  setBadge('badge-ritual', ritualRem);
}

function setBadge(id, count) {
  const el = document.getElementById(id);
  if (!el) return;
  if (count > 0) {
    el.textContent = toBn(count);
    el.classList.add('show');
  } else {
    el.classList.remove('show');
  }
}

// ═══════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════

let toastTimeout;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2400);
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════════════════════
// SVG GRADIENT (for ring)
// ═══════════════════════════════════════════════════════════════

function injectSvgDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  svg.innerHTML = `
    <defs>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#7c6ef5"/>
        <stop offset="100%" stop-color="#4a9eff"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svg);
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

function init() {
  injectSvgDefs();
  renderSchedule();
  renderNamaz();
  renderDwBlockSelector();
  renderTasks(DEEP_WORK_BLOCKS[0]?.id || null);
  renderAmal();
  renderRituals();
  renderMuhasabah();
  renderTomorrowBlocks();
  updateDayProgress();
  updatePomodoroInfo();
  updateSidebarBadges();

  // Auto-select first DW block
  if (DEEP_WORK_BLOCKS.length > 0) {
    selectDwBlock(DEEP_WORK_BLOCKS[0]);
  }

  console.log('%c⚡ DeepWork System Ready — بارك الله فيك', 'color:#7c6ef5;font-size:14px;font-weight:bold;');
}

init();
