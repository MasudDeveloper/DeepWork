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

const SHUTDOWN_RITUALS = [
  { id: 'sr-1', title: 'চলতি কোড বা ফাইল সেভ ও গিট কমিট', desc: 'অসমাপ্ত কাজ পরিষ্কার অবস্থায় রাখুন যাতে কাল শুরু করা সহজ হয়' },
  { id: 'sr-2', title: 'ব্রাউজারের অপ্রয়োজনীয় কাজের ট্যাব বন্ধ', desc: 'কাজের সব উইন্ডো বন্ধ করে ডিজিটাল ক্লিয়ারেন্স করুন' },
  { id: 'sr-3', title: 'ডেস্ক ও ওয়ার্কস্পেস গুছিয়ে পরিচ্ছন্ন করা', desc: 'টেবিল পরিষ্কার রাখা মানসিক প্রশান্তির জন্য আবশ্যক' },
  { id: 'sr-4', title: 'আগামীকালের ডিপ ওয়ার্কের ৩টি প্রধান কাজ চিহ্নিত করা', desc: 'কাল কী করবেন তা আজ রাতেই চূড়ান্ত করুন' },
  { id: 'sr-5', title: 'শাটডাউন বাক্য উচ্চারণ ও কাজ ডিসকানেক্ট', desc: 'মুখে বলুন: "আলহামদুলিল্লাহ, আজকের কাজ সমাপ্ত — Shutdown Complete!"' },
];

const NOT_TO_DO_LIST = [
  { id: 'ntd-1', title: 'সকাল ১১টার আগে সোশ্যাল মিডিয়া নয়', desc: 'ঘুম থেকে উঠেই ইনস্টাগ্রাম, ফেসবুক বা টিকটক দেখা ডোপামিন ভেঙে ফেলে।' },
  { id: 'ntd-2', title: 'কাজের ব্লকের মাঝে রিলেটেড না এমন ভিডিও নয়', desc: 'ইউটিউবে শিক্ষণীয় বা পডকাস্টের নামে ফোকাস নষ্ট করা মারাত্মক ক্ষতি।' },
  { id: 'ntd-3', title: 'বিছানায় বসে বা শুয়ে কাজ নয়', desc: 'বিছানা শুধু বিশ্রামের জন্য; কাজের টেবিলে বসে সুনির্দিষ্টভাবে কাজ করুন।' },
  { id: 'ntd-4', title: 'জরুরি কারণ ছাড়া জোহরের পর চা/কফি নয়', desc: 'বিকালে ক্যাফেইন ঘুমের সাইকেল ও গভীর ঘুম নষ্ট করে।' },
  { id: 'ntd-5', title: 'আউটকাম নির্ধারণ না করে সরাসরি কাজে বসা নয়', desc: 'ঠিক কী শেষ হবে তা না জেনে শুরু করলে কাজ ড্র্যাগ হতে থাকে।' },
  { id: 'ntd-6', title: 'অযথা তর্ক-বিতর্ক ও অনর্থক কমেন্ট যুদ্ধ নয়', desc: 'সোশ্যাল মিডিয়ায় অনর্থক কথাবার্তা মানসিক শক্তি নিংড়ে ফেলে।' },
];

const BAD_HABITS = [
  {
    icon: '📱',
    name: 'অনিয়ন্ত্রিত রিলস ও সোশ্যাল স্ক্রলিং',
    damageWorld: 'ডোপামিন রিসেপ্টর ভোঁতা হয়, গভীর ফোকাস করার ক্ষমতা ৯০% কমে যায়, মস্তিষ্কে ব্রেন ফগ তৈরি হয়।',
    damageDeen: 'সময় অপচয় (যা অন্যতম বড় নিয়ামত) এবং চোখের খেয়ানত ও অশ্লীলতায় জড়ানোর ঝুঁকি বাড়ে।'
  },
  {
    icon: '⏰',
    name: 'নামাজে বিলম্ব ও শেষ মুহূর্তে আদায়',
    damageWorld: 'জীবনে ও রিজিকে বরকত ছিনিয়ে নেওয়া হয়, মনে সর্বদা এক অজানা ক্লান্তি ও অস্থিরতা বিরাজ করে।',
    damageDeen: 'মুনাফিকের অন্যতম আলামত; কিয়ামতের দিন প্রথম হিসাব হবে নামাজের।'
  },
  {
    icon: '⏳',
    name: 'গড়িমসি (Procrastination) ও আলসেমি',
    damageWorld: 'কাজের ডেডলাইন মিস, ক্লায়েন্ট হারানো ও নিজের আত্মবিশ্বাস ধ্বংস হয়ে যায়।',
    damageDeen: 'রাসূলুল্লাহ (ﷺ) প্রতিদিন দোয়া করতেন: "হে আল্লাহ, আমি আপনার কাছে অলসতা থেকে আশ্রয় চাই।"'
  },
  {
    icon: '🌙',
    name: 'দেরিতে ঘুমানো ও অযথা রাত জাগা',
    damageWorld: 'পরদিন সকালে ক্লান্তি, ব্রেনের স্মৃতিশক্তি দুর্বল হওয়া এবং হরমোনাল ভারসাম্য নষ্ট হওয়া।',
    damageDeen: 'ফজরের জামাত ও তাহাজ্জুদ ছুটে যাওয়া; রাতের বরকত থেকে বঞ্চিত হওয়া।'
  },
];

const GOOD_HABITS = [
  {
    icon: '⚡',
    name: 'ফজরের পরপরই ডিপ ওয়ার্ক করা',
    benefitWorld: 'পৃথিবী যখন ঘুমে থাকে, তখন ৩ ঘণ্টায় সাধারণের পুরো দিনের চেয়ে বেশি ও উন্নত কাজ তৈরি হয়।',
    benefitDeen: 'রাসূলুল্লাহ (ﷺ) দোয়া করেছেন: "হে আল্লাহ, আমার উম্মতকে তার সকালের কাজে বরকত দান করুন।" (আবু দাউদ)'
  },
  {
    icon: '🕌',
    name: 'পাঁচ ওয়াক্ত নামাজ যথাসময়ে আদায়',
    benefitWorld: 'প্রতি ৩-৪ ঘণ্টা পর ব্রেনের চমৎকার বায়োলজিক্যাল রিসেট, স্ট্রেস দূরীকরণ ও মানসিক শৃঙ্খলা।',
    benefitDeen: 'আল্লাহর ভালোবাসা অর্জন এবং বান্দা ও রবের সরাসরি আত্মিক সংযোগ।'
  },
  {
    icon: '🎯',
    name: 'এক সময়ে একটি কাজে পূর্ণ নিবেদন',
    benefitWorld: 'কাজের কোয়ালিটি বাড়ে, ভুল কমে এবং জটিলতম সফটওয়্যার/প্রজেক্ট অতি দ্রুত শেষ হয়।',
    benefitDeen: 'ইহসান (পরিপূর্ণতা) নীতি: "আল্লাহ ভালোবাসেন যখন তোমাদের কেউ কোনো কাজ করে, তা নিখুঁতভাবে করে।"'
  },
  {
    icon: '📖',
    name: 'দৈনিক কুরআন তিলাওয়াত ও জিকির',
    benefitWorld: 'হৃদয়ের প্রশান্তি, স্ট্রেস ও ডিপ্রেশন থেকে মুক্তি এবং ইতিবাচক মানসিকতা।',
    benefitDeen: '"জেনে রাখো, আল্লাহর জিকিরেই কেবল অন্তরসমূহ প্রশান্ত হয়।" (সূরা রাদ: ২৮)'
  },
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
    shutdownRitual: {},
    notToDo: {},
    outcomes: {},
    distractions: [],
    preflight: { phone: false, tabs: false, water: false },
    tasks: {},        // { blockId: [{id, text, done}] }
    tomorrowTasks: {}, // { blockId: [text] }
    sessionPrep: {},   // { 'sc-1-1': true, ... }
    muhasabah: { accomplished: '', wasted: '', grateful: '', improve: '', rating: 0 },
    pomodoro: { count: 0, totalMin: 0 },
  };
  SCHEDULE_BLOCKS.forEach(b => { s.schedule[b.id] = { completed: false, note: '' }; });
  AMAL_LIST.forEach(a => { s.amal[a.id] = false; });
  MORNING_RITUALS.forEach(r => { s.morningRitual[r.id] = false; });
  EVENING_RITUALS.forEach(r => { s.eveningRitual[r.id] = false; });
  SHUTDOWN_RITUALS.forEach(r => { s.shutdownRitual[r.id] = false; });
  NOT_TO_DO_LIST.forEach(n => { s.notToDo[n.id] = false; });
  DEEP_WORK_BLOCKS.forEach(b => { s.tasks[b.id] = []; s.tomorrowTasks[b.id] = []; s.outcomes[b.id] = ''; });
  return s;
}

function computeStreak(prevState) {
  // If yesterday's 5 prayers all done, increment streak
  const all5 = NAMAZ_LIST.every(n => prevState.namaz && prevState.namaz[n.id]);
  return all5 ? (prevState.streak || 0) + 1 : 0;
}

function saveState() {
  localStorage.setItem('dw-state', JSON.stringify(state));
}

let state = loadState();
if (!state.shutdownRitual) state.shutdownRitual = {};
if (!state.notToDo) state.notToDo = {};
if (!state.outcomes) state.outcomes = {};
if (!state.distractions) state.distractions = [];
if (!state.preflight) state.preflight = { phone: false, tabs: false, water: false };
if (!state.sessionPrep) state.sessionPrep = {};

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════

let currentPage = 'dashboard';
const pageNames = {
  dashboard: 'আজকের রুটিন',
  namaz:     'নামাজ ট্র্যাকার',
  deepwork:  'ডিপ ওয়ার্ক',
  session:   'পারফেক্ট সেশন গাইড',
  amal:      'আমল ট্র্যাকার',
  protocol:  'প্রোটোকল ও রুলস',
  habits:    'অভ্যাস ও মাইন্ডসেট',
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
  
  // Render Point 1: Outcome
  renderOutcome(block.id);

  renderDwBlockSelector();
  renderTasks(block.id);
  renderDistractions();
}

// ─── Outcome Management (Point 1) ───────────────────────────────
function renderOutcome(blockId) {
  const currentVal = state.outcomes && state.outcomes[blockId] ? state.outcomes[blockId] : '';
  const displayBox = document.getElementById('currentOutcomeDisplay');
  const displayText = document.getElementById('currentOutcomeText');
  const inputRow   = document.querySelector('.outcome-input-row');
  const input      = document.getElementById('sessionOutcomeInput');

  if (currentVal) {
    displayText.textContent = currentVal;
    displayBox.style.display = 'flex';
    inputRow.style.display = 'none';
  } else {
    input.value = '';
    displayBox.style.display = 'none';
    inputRow.style.display = 'flex';
  }
}

document.getElementById('saveOutcomeBtn').addEventListener('click', saveOutcome);
document.getElementById('sessionOutcomeInput').addEventListener('keydown', e => { if (e.key === 'Enter') saveOutcome(); });
document.getElementById('clearOutcomeBtn').addEventListener('click', () => {
  if (!activeBlock) return;
  state.outcomes[activeBlock.id] = '';
  saveState();
  renderOutcome(activeBlock.id);
});

function saveOutcome() {
  if (!activeBlock) { showToast('প্রথমে একটি ব্লক বেছে নিন'); return; }
  const input = document.getElementById('sessionOutcomeInput');
  const val = input.value.trim();
  if (!val) { showToast('একটি স্পষ্ট আউটকাম লিখুন'); return; }
  state.outcomes[activeBlock.id] = val;
  saveState();
  renderOutcome(activeBlock.id);
  showToast('🎯 সেশন আউটকাম নির্ধারিত হয়েছে!');
}

// ─── Preflight Checks (Point 3 & 4) ─────────────────────────────
['phone', 'tabs', 'water'].forEach(key => {
  const el = document.getElementById(`pf-${key}`);
  if (el) {
    el.checked = !!state.preflight[key];
    el.addEventListener('change', () => {
      state.preflight[key] = el.checked;
      saveState();
    });
  }
});

document.getElementById('timerStart').addEventListener('click', startTimer);
document.getElementById('timerPause').addEventListener('click', pauseTimer);
document.getElementById('timerReset').addEventListener('click', resetTimer);

function startTimer() {
  if (!activeBlock) return;
  
  // Tip if outcome not yet set
  if (!state.outcomes[activeBlock.id]) {
    showToast('💡 টিপ: পয়েন্ট ১ অনুযায়ী ক্লিয়ার আউটকাম লিখে নিলে একাগ্রতা বৃদ্ধি পায়');
  }

  timerRunning = true;
  sessionStart = Date.now();
  document.getElementById('timerStart').disabled = true;
  document.getElementById('timerPause').disabled = false;
  document.getElementById('timerDisplay').classList.add('running');
  const bp = document.getElementById('breakProtocolBanner');
  if (bp) bp.classList.remove('active');

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

      // Feature 2: Play soothing Chime Bell when session finishes
      playSessionChime();

      // Point 6: Activate Smart Break Guide
      const bpBanner = document.getElementById('breakProtocolBanner');
      if (bpBanner) bpBanner.classList.add('active');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  document.getElementById('timerStart').disabled = false;
  document.getElementById('timerPause').disabled = true;
  document.getElementById('timerDisplay').classList.remove('running');
  syncZenControls();
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
  const bp = document.getElementById('breakProtocolBanner');
  if (bp) bp.classList.remove('active');
  syncZenControls();
}

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  const timeFormatted = `${toBn(String(m).padStart(2,'0'))}:${toBn(String(s).padStart(2,'0'))}`;
  
  const timerDisplay = document.getElementById('timerDisplay');
  if (timerDisplay) timerDisplay.textContent = timeFormatted;

  // Sync to Zen display if open
  const zenDisplay = document.getElementById('zenTimerDisplay');
  if (zenDisplay) zenDisplay.textContent = timeFormatted;
}

function updatePomodoroInfo() {
  const countStr = toBn(state.pomodoro.count);
  const timeStr  = toBn(state.pomodoro.totalMin) + ' মি';
  document.getElementById('pomodoroCount').textContent  = countStr;
  document.getElementById('totalFocusTime').textContent = timeStr;

  const zCount = document.getElementById('zenPomodoroCount');
  const zTime  = document.getElementById('zenFocusTime');
  if (zCount) zCount.textContent = countStr;
  if (zTime)  zTime.textContent  = timeStr;
}

// ═══════════════════════════════════════════════════════════════
// FEATURE 1: AMBIENT FOCUS SOUND GENERATOR (Web Audio API)
// ═══════════════════════════════════════════════════════════════

let audioCtx = null;
let currentAmbientSound = null; // 'rain' | 'waves' | 'wind' | 'birds' | null
let ambientGainNode = null;
let ambientSourceNodes = [];
let soundBellEnabled = true;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function stopAmbientSound() {
  ambientSourceNodes.forEach(node => {
    try { node.stop(); node.disconnect(); } catch (e) {}
  });
  ambientSourceNodes = [];
  currentAmbientSound = null;
  document.querySelectorAll('.amb-btn').forEach(b => b.classList.remove('active'));
  const zSound = document.getElementById('zenCurrentSound');
  if (zSound) zSound.textContent = 'বন্ধ';
}

function getVolume() {
  const slider = document.getElementById('ambVolume');
  return slider ? parseFloat(slider.value) : 0.3;
}

function playAmbientSound(type) {
  initAudioContext();

  if (currentAmbientSound === type) {
    stopAmbientSound();
    showToast('🔇 অ্যাম্বিয়েন্ট সাউন্ড বন্ধ করা হলো');
    return;
  }

  stopAmbientSound();
  currentAmbientSound = type;

  // Active state button
  const activeBtn = document.getElementById(`btn-${type}`);
  if (activeBtn) activeBtn.classList.add('active');

  ambientGainNode = audioCtx.createGain();
  ambientGainNode.gain.setValueAtTime(getVolume(), audioCtx.currentTime);
  ambientGainNode.connect(audioCtx.destination);

  const zSound = document.getElementById('zenCurrentSound');
  const soundTitles = {
    brown: 'ডিপ ব্রাউন নয়েজ 🪐',
    rain: 'মৃদু বৃষ্টির রিমঝিম 🌧️',
    binaural: 'আলফা ওয়েভ (১০Hz ফোকাস) 🧠',
    fire: 'উষ্ণ অগ্নিকুণ্ড 🪵'
  };
  if (zSound) zSound.textContent = soundTitles[type] || type;

  const sampleRate = audioCtx.sampleRate;
  // 5 seconds looping buffer for ultra-smooth realistic texture
  const bufferDuration = 5;
  const bufferSize = sampleRate * bufferDuration;

  if (type === 'brown') {
    // 1. Pure Deep Brown Noise (Red Noise) — 6dB/octave dropoff, deeply calming, masks all distractions
    const buffer = audioCtx.createBuffer(2, bufferSize, sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + (0.025 * white)) / 1.025;
        data[i] = lastOut * 3.5; // Smooth warm brown noise
      }
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Warm Butterworth low-pass to eliminate any trace of harsh hiss
    const lowPass = audioCtx.createBiquadFilter();
    lowPass.type = 'lowpass';
    lowPass.frequency.setValueAtTime(380, audioCtx.currentTime);

    noise.connect(lowPass);
    lowPass.connect(ambientGainNode);
    noise.start();
    ambientSourceNodes.push(noise);

  } else if (type === 'rain') {
    // 2. Soft Gentle Rain — continuous muffled rain drops + brown noise baseline (no harsh sizzling)
    const buffer = audioCtx.createBuffer(2, bufferSize, sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        // Soft raindrop bursts
        const dropMod = Math.sin(i / (sampleRate * 0.4)) * 0.15;
        data[i] = ((b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.07) * (0.85 + dropMod);
        b6 = white * 0.115926;
      }
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to soft rain window resonance
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(ambientGainNode);
    noise.start();
    ambientSourceNodes.push(noise);

  } else if (type === 'binaural') {
    // 3. Alpha Wave 10Hz Binaural Beat (160Hz Left, 170Hz Right) with warm harmonic drone (216Hz)
    // Proven neuroscience frequency for deep focus & calm alertness
    const merger = audioCtx.createChannelMerger(2);

    const oscLeft = audioCtx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(160, audioCtx.currentTime);

    const oscRight = audioCtx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(170, audioCtx.currentTime); // 170 - 160 = 10Hz Alpha beat

    const gainL = audioCtx.createGain();
    const gainR = audioCtx.createGain();
    gainL.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gainR.gain.setValueAtTime(0.18, audioCtx.currentTime);

    oscLeft.connect(gainL);
    oscRight.connect(gainR);

    gainL.connect(merger, 0, 0); // Left ear
    gainR.connect(merger, 0, 1); // Right ear

    // Soft sub-harmonic drone for richness
    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(80, audioCtx.currentTime);
    subGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(ambientGainNode);

    merger.connect(ambientGainNode);

    oscLeft.start();
    oscRight.start();
    subOsc.start();
    ambientSourceNodes.push(oscLeft, oscRight, subOsc);

  } else if (type === 'fire') {
    // 4. Warm Cozy Fireplace / Bonfire crackle
    const buffer = audioCtx.createBuffer(2, bufferSize, sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Deep warm rumble
        lastOut = (lastOut + (0.018 * white)) / 1.018;
        // Occasional gentle wood crackle pop
        let crackle = 0;
        if (Math.random() < 0.00045) {
          crackle = (Math.random() * 2 - 1) * 0.45;
        }
        data[i] = (lastOut * 2.8) + crackle;
      }
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(ambientGainNode);
    noise.start();
    ambientSourceNodes.push(noise);
  }

  showToast(`🎧 ${soundTitles[type] || type} চালু করা হলো`);
}

// ═══════════════════════════════════════════════════════════════
// FEATURE 2: SOOTHING CHIME BELL (Session Complete)
// ═══════════════════════════════════════════════════════════════

function playSessionChime() {
  if (!soundBellEnabled) return;
  try {
    initAudioContext();
    const now = audioCtx.currentTime;

    // Harmonic Tibetan/Singing bell chords (528Hz, 660Hz, 792Hz)
    const freqs = [528, 660, 792, 1056];
    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.28 / (idx + 1), now + 0.05 + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + 3.5);
    });
  } catch (err) {
    console.log('Chime sound error:', err);
  }
}

// ═══════════════════════════════════════════════════════════════
// FEATURE 3: FULLSCREEN ZEN MONASTIC MODE
// ═══════════════════════════════════════════════════════════════

function openZenMode() {
  const overlay = document.getElementById('zenOverlay');
  if (!overlay) return;

  // Sync state into Zen
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  const blockTitle = activeBlock ? `${activeBlock.catBn} — ${activeBlock.title}` : 'ব্লক বেছে নিন';
  document.getElementById('zenTimerBlock').textContent = blockTitle;

  const currentOutcome = (activeBlock && state.outcomes && state.outcomes[activeBlock.id]) 
    ? state.outcomes[activeBlock.id] 
    : '🎯 সেশনের নির্দিষ্ট আউটকাম সেট করা হয়নি — শুধু গভীর একাগ্রতা ধরে রাখুন';
  document.getElementById('zenOutcomeText').textContent = currentOutcome;

  updateTimerDisplay();
  updatePomodoroInfo();
  syncZenControls();

  showToast('🧘‍♂️ জেন মোডে স্বাগতম! ফুলস্ক্রিন একাগ্রতা মোড চালু');
}

function closeZenMode() {
  const overlay = document.getElementById('zenOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function syncZenControls() {
  const zStart = document.getElementById('zenTimerStart');
  const zPause = document.getElementById('zenTimerPause');
  const zReset = document.getElementById('zenTimerReset');
  if (!zStart || !zPause) return;

  if (timerRunning) {
    zStart.disabled = true;
    zPause.disabled = false;
  } else {
    zStart.disabled = !activeBlock;
    zPause.disabled = true;
  }
}

// Global Keyboard Shortcuts (Esc for Zen, F for Fullscreen Zen, Space for Timer)
document.addEventListener('keydown', (e) => {
  // If user is writing in an input or textarea, ignore shortcuts
  const tag = e.target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea') return;

  if (e.key === 'Escape') {
    closeZenMode();
  } else if (e.key === 'f' || e.key === 'F') {
    if (currentPage === 'deepwork' || document.getElementById('zenOverlay').classList.contains('active')) {
      const isZen = document.getElementById('zenOverlay').classList.contains('active');
      if (isZen) closeZenMode();
      else openZenMode();
    }
  } else if (e.code === 'Space') {
    e.preventDefault();
    if (timerRunning) pauseTimer();
    else if (activeBlock) startTimer();
  }
});

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

// ─── 3. Distraction Parking Lot ─────────────────────────────────
function renderDistractions() {
  const list = document.getElementById('distractionList');
  if (!list) return;
  list.innerHTML = '';
  const items = state.distractions || [];

  if (items.length === 0) {
    list.innerHTML = `<div class="tasks-empty"><span>🛡️ পার্কিং লট ফাঁকা। কাজ করার সময় অনর্থক কোনো চিন্তা মনে এলে এখানে লিখে কাজে ফিরে যান।</span></div>`;
    return;
  }

  items.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'task-item parked-item';
    div.innerHTML = `
      <span class="parked-bullet">📌</span>
      <span class="task-text">${escHtml(item.text)} <small class="parked-time">${item.time || ''}</small></span>
      <button class="task-del" onclick="deleteDistraction(${idx})" aria-label="Delete">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    list.appendChild(div);
  });
}

const distInput = document.getElementById('distractionInput');
const distAddBtn = document.getElementById('distractionAddBtn');
if (distAddBtn && distInput) {
  distAddBtn.addEventListener('click', addDistraction);
  distInput.addEventListener('keydown', e => { if (e.key === 'Enter') addDistraction(); });
}

function addDistraction() {
  const val = distInput.value.trim();
  if (!val) return;
  const d = new Date();
  const timeStr = `${toBn(d.getHours() % 12 || 12)}:${toBn(String(d.getMinutes()).padStart(2,'0'))}`;
  if (!state.distractions) state.distractions = [];
  state.distractions.unshift({ text: val, time: timeStr });
  saveState();
  distInput.value = '';
  renderDistractions();
  showToast('🛡️ চিন্তাটি পার্ক করা হলো! এখন কাজে পূর্ণ ফোকাস রাখুন');
}

window.deleteDistraction = function(idx) {
  state.distractions.splice(idx, 1);
  saveState();
  renderDistractions();
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
// RITUALS (Morning, Evening, Shutdown)
// ═══════════════════════════════════════════════════════════════

function renderRituals() {
  renderChecklist('morningChecklist', MORNING_RITUALS, state.morningRitual, 'morning-cb', 'morningProgress');
  renderChecklist('eveningChecklist', EVENING_RITUALS, state.eveningRitual, 'evening-cb', 'eveningProgress');
  renderChecklist('shutdownChecklist', SHUTDOWN_RITUALS, state.shutdownRitual, 'shutdown-cb', 'shutdownProgress');
}

function renderChecklist(containerId, list, stateObj, cbClass, progressId) {
  const container = document.getElementById(containerId);
  if (!container) return;
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

  const prog = document.getElementById(progressId);
  if (prog) prog.textContent = `${toBn(doneCount)}/${toBn(list.length)}`;
}

window.toggleRitual = function(containerId, rId, cbClass, progressId) {
  let stateObj, list;
  if (containerId === 'morningChecklist') {
    stateObj = state.morningRitual;
    list = MORNING_RITUALS;
  } else if (containerId === 'eveningChecklist') {
    stateObj = state.eveningRitual;
    list = EVENING_RITUALS;
  } else {
    stateObj = state.shutdownRitual;
    list = SHUTDOWN_RITUALS;
  }

  stateObj[rId] = !stateObj[rId];
  saveState();
  renderChecklist(containerId, list, stateObj, cbClass, progressId);
  updateSidebarBadges();
  showToast(stateObj[rId] ? '✅ সম্পন্ন হয়েছে!' : '↩️ চিহ্ন সরানো হলো');
};

// ─── Point 7: Not To Do List ────────────────────────────────────
function renderNotToDoList() {
  const container = document.getElementById('notToDoList');
  if (!container) return;
  container.innerHTML = '';

  NOT_TO_DO_LIST.forEach((item, idx) => {
    const active = state.notToDo && state.notToDo[item.id];
    const div = document.createElement('div');
    div.className = `nottodo-item${active ? ' committed' : ''}`;
    div.innerHTML = `
      <div class="ntd-cb-wrap">
        <input type="checkbox" id="ntd-${item.id}" ${active ? 'checked' : ''} onchange="toggleNotToDo('${item.id}')" />
      </div>
      <div class="ntd-content">
        <div class="ntd-title">🛑 ${item.title}</div>
        <div class="ntd-desc">${item.desc}</div>
      </div>
      <div class="ntd-badge">${active ? 'অঙ্গীকারাবদ্ধ ✓' : 'ওয়াদা করুন'}</div>
    `;
    container.appendChild(div);
  });
}

window.toggleNotToDo = function(id) {
  if (!state.notToDo) state.notToDo = {};
  state.notToDo[id] = !state.notToDo[id];
  saveState();
  renderNotToDoList();
  updateSidebarBadges();
  showToast(state.notToDo[id] ? '🛡️ এই বদভ্যাস থেকে দূরে থাকার অঙ্গীকার করা হলো' : '↩️ আপডেট করা হলো');
};

// ─── Points 9 & 10: Habits & Reminders ──────────────────────────
function renderHabits() {
  // Bad Habits
  const badGrid = document.getElementById('badHabitsGrid');
  if (badGrid) {
    badGrid.innerHTML = '';
    BAD_HABITS.forEach(h => {
      const card = document.createElement('div');
      card.className = 'habit-card bad-habit-card';
      card.innerHTML = `
        <div class="hc-header">
          <span class="hc-icon">${h.icon}</span>
          <h3 class="hc-name">${h.name}</h3>
        </div>
        <div class="hc-section">
          <div class="hc-sub-title danger-text">💥 পার্থিব ক্ষয়ক্ষতি:</div>
          <p class="hc-text">${h.damageWorld}</p>
        </div>
        <div class="hc-section">
          <div class="hc-sub-title deen-danger-text">⚠️ দ্বীনি ও আত্মিক ক্ষতি:</div>
          <p class="hc-text">${h.damageDeen}</p>
        </div>
      `;
      badGrid.appendChild(card);
    });
  }

  // Good Habits
  const goodGrid = document.getElementById('goodHabitsGrid');
  if (goodGrid) {
    goodGrid.innerHTML = '';
    GOOD_HABITS.forEach(h => {
      const card = document.createElement('div');
      card.className = 'habit-card good-habit-card';
      card.innerHTML = `
        <div class="hc-header">
          <span class="hc-icon">${h.icon}</span>
          <h3 class="hc-name">${h.name}</h3>
        </div>
        <div class="hc-section">
          <div class="hc-sub-title success-text">🚀 ইহকালীন সমৃদ্ধি:</div>
          <p class="hc-text">${h.benefitWorld}</p>
        </div>
        <div class="hc-section">
          <div class="hc-sub-title deen-success-text">✨ পরকালীন সাওয়াব ও বরকত:</div>
          <p class="hc-text">${h.benefitDeen}</p>
        </div>
      `;
      goodGrid.appendChild(card);
    });
  }
}

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

  // Ritual — remaining (Morning + Evening + Shutdown)
  const morningDone  = MORNING_RITUALS.filter(r => state.morningRitual[r.id]).length;
  const eveningDone  = EVENING_RITUALS.filter(r => state.eveningRitual[r.id]).length;
  const shutdownDone = SHUTDOWN_RITUALS.filter(r => state.shutdownRitual && state.shutdownRitual[r.id]).length;
  const totalRituals = MORNING_RITUALS.length + EVENING_RITUALS.length + SHUTDOWN_RITUALS.length;
  const ritualRem    = totalRituals - morningDone - eveningDone - shutdownDone;
  setBadge('badge-ritual', ritualRem);

  // Protocol / Not-To-Do commitments
  const notToDoTotal = NOT_TO_DO_LIST.length;
  const notToDoDone  = NOT_TO_DO_LIST.filter(n => state.notToDo && state.notToDo[n.id]).length;
  setBadge('badge-protocol', notToDoTotal - notToDoDone);

  // Session Preparation remaining checklist count
  const totalSessionChecks = 15; // 5 pillars * 3 checks each
  const doneSessionChecks  = Object.values(state.sessionPrep || {}).filter(Boolean).length;
  setBadge('badge-session', totalSessionChecks - doneSessionChecks);
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
// PERFECT WORK SESSION PREPARATION HANDLERS
// ═══════════════════════════════════════════════════════════════

function renderSessionPrep() {
  const checks = document.querySelectorAll('.session-chk');
  if (!checks.length) return;

  checks.forEach(chk => {
    const id = chk.id;
    chk.checked = !!(state.sessionPrep && state.sessionPrep[id]);
    chk.onchange = () => {
      if (!state.sessionPrep) state.sessionPrep = {};
      state.sessionPrep[id] = chk.checked;
      saveState();
      updateSessionScore();
      updateSidebarBadges();
      if (chk.checked) {
        showToast('🎯 প্রস্তুতি চেকলিস্ট সম্পন্ন!');
      }
    };
  });

  updateSessionScore();

  // Jump to deepwork button
  const jumpBtn = document.getElementById('goToDeepWorkBtn');
  if (jumpBtn) {
    jumpBtn.onclick = () => {
      navigateTo('deepwork');
      showToast('⚡ ডিপ ওয়ার্ক মোডে স্বাগতম! বিসমিল্লাহ বলে শুরু করুন');
    };
  }
}

function updateSessionScore() {
  const total = 15;
  const done = Object.values(state.sessionPrep || {}).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  const scoreEl = document.getElementById('sessionPrepScore');
  const barEl   = document.getElementById('sessionPrepBar');
  if (scoreEl) scoreEl.textContent = `${toBn(pct)}%`;
  if (barEl) barEl.style.width = `${pct}%`;
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

function initSoundAndZenControls() {
  // Ambient Sound Buttons
  document.querySelectorAll('.amb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.sound;
      playAmbientSound(type);
    });
  });

  // Volume slider
  const volSlider = document.getElementById('ambVolume');
  if (volSlider) {
    volSlider.addEventListener('input', () => {
      if (ambientGainNode && audioCtx) {
        ambientGainNode.gain.setValueAtTime(parseFloat(volSlider.value), audioCtx.currentTime);
      }
    });
  }

  // Bell toggle
  const bellBtn   = document.getElementById('bellToggleBtn');
  const bellIcon  = document.getElementById('bellIcon');
  const bellLabel = document.getElementById('bellLabel');
  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      soundBellEnabled = !soundBellEnabled;
      bellIcon.textContent = soundBellEnabled ? '🔔' : '🔕';
      bellLabel.textContent = soundBellEnabled ? 'সাউন্ড অন' : 'সাউন্ড অফ';
      showToast(soundBellEnabled ? '🔔 সেশন সমাপ্তি বেল চালু' : '🔕 বেল শব্দ বন্ধ');
    });
  }

  // Zen mode buttons
  const openZen = document.getElementById('openZenBtn');
  const closeZen = document.getElementById('closeZenBtn');
  if (openZen) openZen.addEventListener('click', openZenMode);
  if (closeZen) closeZen.addEventListener('click', closeZenMode);

  // Zen internal timer controls
  const zStart = document.getElementById('zenTimerStart');
  const zPause = document.getElementById('zenTimerPause');
  const zReset = document.getElementById('zenTimerReset');
  if (zStart) zStart.addEventListener('click', () => { startTimer(); syncZenControls(); });
  if (zPause) zPause.addEventListener('click', () => { pauseTimer(); syncZenControls(); });
  if (zReset) zReset.addEventListener('click', () => { resetTimer(); syncZenControls(); });
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
  renderSessionPrep();
  renderNotToDoList();
  renderHabits();
  renderMuhasabah();
  renderTomorrowBlocks();
  updateDayProgress();
  updatePomodoroInfo();
  updateSidebarBadges();
  initSoundAndZenControls();

  // Auto-select first DW block
  if (DEEP_WORK_BLOCKS.length > 0) {
    selectDwBlock(DEEP_WORK_BLOCKS[0]);
  }

  console.log('%c⚡ DeepWork System Ready — বারক আল্লাহু ফিক', 'color:#7c6ef5;font-size:14px;font-weight:bold;');
}

init();
