/* ==========================================================
   影影的工作台 · 核心逻辑
   ========================================================== */
(function () {
  'use strict';
  const D = window.DATA;

  /* ================= 工具 ================= */
  const $ = id => document.getElementById(id);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const pad = n => String(n).padStart(2, '0');
  const dstr = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const mstr = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => (Math.round(n * 100) / 100).toFixed(2);

  let toastT;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function daySeed(offset = 0) {
    return Math.floor(Date.now() / 864e5) + offset;
  }
  const pickByDay = (arr, off = 0) => arr[daySeed(off) % arr.length];

  function weekKey(d = new Date()) {
    const t = new Date(d);
    t.setHours(0, 0, 0, 0);
    t.setDate(t.getDate() + 3 - ((t.getDay() + 6) % 7));
    const w1 = new Date(t.getFullYear(), 0, 4);
    const n = 1 + Math.round(((t - w1) / 864e5 - 3 + ((w1.getDay() + 6) % 7)) / 7);
    return `${t.getFullYear()}-W${pad(n)}`;
  }
  function weekRange(d) {
    const s = new Date(d);
    s.setDate(s.getDate() - ((s.getDay() + 6) % 7));
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    return `${s.getMonth() + 1}.${s.getDate()} - ${e.getMonth() + 1}.${e.getDate()}`;
  }

  /* ================= 状态 ================= */
  const KEY = 'yingying-workbench-v3';

  function defaultState() {
    return {
      tasks: [], inspos: [], topicsSaved: [],
      english: { my: [], known: [], checkins: [], minutes: 10, wordSeed: 0 },
      focus: { sessions: [], preset: 25 },
      moods: [], express: [], foods: [], lit: [], money: [],
      weekly: {}, meta: {}
    };
  }

  let S;
  try {
    const raw = localStorage.getItem(KEY);
    S = raw ? Object.assign(defaultState(), JSON.parse(raw)) : defaultState();
    S.english = Object.assign(defaultState().english, S.english || {});
    S.focus = Object.assign(defaultState().focus, S.focus || {});
    S.meta = S.meta || {};
  } catch (e) { S = defaultState(); }

  let saveT;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(S)); }
      catch (e) { toast('存储空间不够啦，试试删掉几张美食照片'); }
    }, 120);
  }

  /* ================= 页面表 ================= */
  const PAGES = [
    { k: 'home',    e: '🏠', n: '首页',     g: '' },
    { k: 'daily',   e: '☀️', n: '每日计划', g: '日常' },
    { k: 'focus',   e: '⏳', n: '专注计时', g: '日常' },
    { k: 'mood',    e: '🫧', n: '情绪日记', g: '日常' },
    { k: 'money',   e: '💰', n: '记账',     g: '日常' },
    { k: 'topic',   e: '🔥', n: '选题灵感', g: '创作' },
    { k: 'inspo',   e: '🌱', n: '灵感抓取', g: '创作' },
    { k: 'food',    e: '🍰', n: '美食',     g: '创作' },
    { k: 'english', e: '🌿', n: '英语学习', g: '成长' },
    { k: 'express', e: '💬', n: '表达力',   g: '成长' },
    { k: 'lit',     e: '📖', n: '文学',     g: '成长' },
    { k: 'weekly',  e: '🗓', n: '周周复盘', g: '回顾' }
  ];
  const TILE_BG = {
    daily: '#FBEFD6', focus: '#E7E1F7', mood: '#FBE4EA', money: '#DFF0E6',
    topic: '#FBE0E4', inspo: '#E4F1E6', food: '#FCE8DC',
    english: '#E1EEF9', express: '#EDE3F8', lit: '#E9E5F5', weekly: '#E7EFF9'
  };

  let current = 'home';

  /* ================= 封面 ================= */
  function initCover() {
    const d = new Date();
    const wk = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    $('cover-date').textContent = `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}　星期${wk}`;
    $('cover-quote').textContent = pickByDay(D.QUOTES);
    $('sidebar-date').textContent = `${d.getMonth() + 1}月${d.getDate()}日 星期${wk}`;

    const hide = () => $('cover').classList.add('hide');
    $('cover-enter').addEventListener('click', hide);
    if (S.meta.coverDate === dstr()) setTimeout(hide, 1000);
    S.meta.coverDate = dstr();
    save();

    $('cover-btn').addEventListener('click', () => {
      $('cover').classList.remove('hide');
      $('cover-quote').textContent = D.QUOTES[Math.floor(Math.random() * D.QUOTES.length)];
    });
  }

  /* ================= 导航 ================= */
  const openSide = () => { $('sidebar').classList.add('open'); $('sidebar-overlay').classList.add('show'); };
  const closeSide = () => { $('sidebar').classList.remove('open'); $('sidebar-overlay').classList.remove('show'); };

  function initNav() {
    const nav = $('sidebar-nav');
    let lastG = null;
    PAGES.forEach(p => {
      if (p.g && p.g !== lastG) { nav.appendChild(el('div', 'sidebar-group-title', p.g)); lastG = p.g; }
      const b = el('button', 'sidebar-item');
      b.dataset.page = p.k;
      b.innerHTML = `<span class="sidebar-icon">${p.e}</span><span class="sidebar-label">${p.n}</span>`;
      nav.appendChild(b);
    });

    document.querySelectorAll('[data-page]').forEach(b =>
      b.addEventListener('click', () => { go(b.dataset.page); closeSide(); }));
    document.querySelectorAll('[data-nav]').forEach(b =>
      b.addEventListener('click', () => go(b.dataset.nav)));

    $('menu-btn').addEventListener('click', openSide);
    $('sidebar-overlay').addEventListener('click', closeSide);

    const grid = $('home-grid'), agrid = $('add-grid');
    PAGES.filter(p => p.k !== 'home').forEach(p => {
      [grid, agrid].forEach(box => {
        const b = el('button', 'home-tile');
        b.innerHTML = `<span class="ti" style="background:${TILE_BG[p.k]}">${p.e}</span><span class="tl">${p.n}</span>`;
        b.addEventListener('click', () => go(p.k));
        box.appendChild(b);
      });
    });
  }

  function go(k) {
    if (current === 'english' && k !== 'english') EN.pause(true);
    current = k;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pg = $('page-' + k);
    if (pg) pg.classList.add('active');

    const p = PAGES.find(x => x.k === k);
    $('topbar-title').textContent = p ? (k === 'home' ? '影影的工作台' : p.n)
      : (k === 'add' ? '快速添加' : k === 'settings' ? '设置' : '影影的工作台');

    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.toggle('active', b.dataset.page === k));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.nav === k));
    window.scrollTo(0, 0);

    const R = {
      home: renderHome, daily: renderDaily, topic: renderTopic, inspo: renderInspo,
      english: () => { renderEnglish(); EN.autoStart(); }, focus: renderFocus,
      mood: renderMood, express: renderExpress, food: renderFood,
      lit: renderLit, money: renderMoney, weekly: renderWeekly
    };
    if (R[k]) R[k]();
  }

  /* ================= 首页 ================= */
  function renderHome() {
    const t = dstr();
    const today = S.tasks.filter(x => x.date === t);
    const done = today.filter(x => x.done).length;
    const pct = today.length ? Math.round(done / today.length * 100) : 0;
    $('progress-circle').setAttribute('stroke-dasharray', `${pct},100`);
    $('progress-text').textContent = pct + '%';

    const h = new Date().getHours();
    $('home-hello').textContent =
      h < 6 ? '这么晚还没睡呀 🌙' : h < 11 ? '早上好呀 ☀️' : h < 14 ? '中午好，记得吃饭 🍚'
      : h < 18 ? '下午好，喝口水 🍵' : h < 22 ? '晚上好 🌆' : '夜深了，早点休息 🌙';
    $('home-sub').innerHTML = today.length
      ? (done === today.length ? '影影<br>今天全部完成啦 🎉' : `影影<br>还剩 ${today.length - done} 件事`)
      : '影影<br>今天想先做什么？';

    $('st-task').textContent = today.length ? `${done}/${today.length}` : '0';
    $('st-focus').textContent = S.focus.sessions.filter(x => x.date === t).reduce((a, b) => a + b.min, 0);
    $('st-streak').textContent = calcStreak();
  }

  function calcStreak() {
    const days = new Set([
      ...S.english.checkins,
      ...S.focus.sessions.map(x => x.date),
      ...S.moods.map(x => x.date),
      ...S.tasks.filter(x => x.done).map(x => x.date)
    ]);
    let n = 0;
    const d = new Date();
    if (!days.has(dstr(d))) d.setDate(d.getDate() - 1);
    while (days.has(dstr(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* ================= 每日计划 ================= */
  function taskEl(t) {
    const n = el('div', 'task-item' + (t.done ? ' done' : ''));
    n.innerHTML =
      `<div class="task-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
       <div class="task-body"><div class="task-title">${esc(t.title)}</div>
       <div class="task-meta"><span>${t.date}</span></div></div>
       <button class="task-del">✕</button>`;
    n.querySelector('.task-check').addEventListener('click', () => {
      t.done = !t.done; save(); renderDaily(); renderHome();
      if (t.done) toast('完成一件，很棒 ✨');
    });
    n.querySelector('.task-del').addEventListener('click', () => {
      S.tasks = S.tasks.filter(x => x.id !== t.id); save(); renderDaily(); renderHome();
    });
    return n;
  }

  function renderDaily() {
    const t = dstr();
    const list = S.tasks.filter(x => x.date === t);
    const un = list.filter(x => !x.done), dn = list.filter(x => x.done);
    const box = $('daily-tasks'), dbox = $('daily-done');
    box.innerHTML = ''; dbox.innerHTML = '';
    $('daily-count').textContent = list.length ? `${dn.length}/${list.length}` : '';
    if (!un.length) box.appendChild(el('div', 'empty', '<span class="e-icon">🌤</span>今天还没有安排<br>加一件小事开始吧'));
    un.forEach(x => box.appendChild(taskEl(x)));
    if (!dn.length) dbox.appendChild(el('div', 'empty', '<span class="e-icon">🫧</span>还没有完成的事'));
    dn.forEach(x => dbox.appendChild(taskEl(x)));
  }

  function initDaily() {
    $('quick-task-form').addEventListener('submit', e => {
      e.preventDefault();
      const v = $('quick-task-input').value.trim();
      if (!v) return;
      S.tasks.push({ id: uid(), title: v, date: dstr(), done: false });
      $('quick-task-input').value = '';
      save(); renderDaily(); renderHome(); toast('加好啦 ✍️');
    });
  }

  /* ================= 选题灵感 ================= */
  let topicTab = 'xhs';
  function renderTopic() {
    const box = $('topic-list');
    box.innerHTML = '';
    let list;
    if (topicTab === 'mine') {
      list = S.topicsSaved;
      if (!list.length) {
        box.appendChild(el('div', 'empty', '<span class="e-icon">⭐</span>还没收藏选题<br>去小红书 / 抖音那栏挑几个'));
        return;
      }
    } else {
      list = topicTab === 'xhs' ? D.TOPIC_XHS : D.TOPIC_DY;
    }

    list.forEach((x, i) => {
      const saved = S.topicsSaved.some(s => s.t === x.t);
      const c = el('div', 'topic-card');
      c.innerHTML =
        `<div class="tc-head"><span class="tc-rank">${i + 1}</span><span class="tc-title">${esc(x.t)}</span></div>
         <div class="tc-desc">${esc(x.d)}</div>
         <div class="tc-tags">${(x.tags || []).map(t => `<span class="tag">#${esc(t)}</span>`).join('')}</div>
         ${x.how ? `<div class="sentence-note" style="margin-top:10px">📌 怎么拍：${esc(x.how)}</div>` : ''}
         <div class="tc-foot"><span class="heat">🔥 ${x.heat || 80}</span>
         <button class="btn-mini ${saved ? 'saved' : ''}">${saved ? '已收藏' : '＋ 收藏'}</button></div>`;
      c.querySelector('.btn-mini').addEventListener('click', () => {
        if (S.topicsSaved.some(s => s.t === x.t)) {
          S.topicsSaved = S.topicsSaved.filter(s => s.t !== x.t);
          toast('已取消收藏');
        } else {
          S.topicsSaved.push(Object.assign({ id: uid(), plat: topicTab }, x));
          toast('收藏啦，去「我收藏的」看看 ⭐');
        }
        save(); renderTopic();
      });
      box.appendChild(c);
    });
  }

  function initTopic() {
    $('topic-tabs').addEventListener('click', e => {
      const b = e.target.closest('.plat-tab');
      if (!b) return;
      topicTab = b.dataset.plat;
      document.querySelectorAll('#topic-tabs .plat-tab').forEach(x => x.classList.toggle('active', x === b));
      renderTopic();
    });
  }

  /* ================= 灵感抓取 ================= */
  let inspoFilter = 'all';
  function renderInspo() {
    const fb = $('inspo-filter');
    if (!fb.children.length) {
      [{ k: 'all', e: '📚', l: '全部' }].concat(D.INSPO_TYPES).forEach(t => {
        const c = el('button', 'filter-chip' + (t.k === inspoFilter ? ' active' : ''), `${t.e} ${t.l}`);
        c.addEventListener('click', () => {
          inspoFilter = t.k;
          fb.querySelectorAll('.filter-chip').forEach(x => x.classList.toggle('active', x === c));
          renderInspo();
        });
        fb.appendChild(c);
      });
    }
    const box = $('inspo-list');
    box.innerHTML = '';
    const list = S.inspos.filter(x => inspoFilter === 'all' || x.type === inspoFilter).slice().reverse();
    if (!list.length) {
      box.appendChild(el('div', 'empty', '<span class="e-icon">🌱</span>还没有灵感<br>刷到好句子就存进来'));
      return;
    }
    const SRC = { douyin: '抖音', xhs: '小红书', life: '生活', other: '其他' };
    list.forEach(x => {
      const t = D.INSPO_TYPES.find(y => y.k === x.type) || D.INSPO_TYPES[5];
      const c = el('div', 'inspo-card');
      c.innerHTML =
        `<div class="ic-head"><span class="tag">${t.e} ${t.l}</span><span class="tag">${SRC[x.src] || '其他'}</span></div>
         <div class="ic-text">${esc(x.text)}</div>
         <div class="ic-foot"><span>${x.date}</span><button class="task-del" style="margin-left:auto">✕</button></div>`;
      c.querySelector('.task-del').addEventListener('click', () => {
        S.inspos = S.inspos.filter(y => y.id !== x.id); save(); renderInspo();
      });
      box.appendChild(c);
    });
  }

  function initInspo() {
    const sel = $('inspo-type');
    D.INSPO_TYPES.forEach(t => {
      const o = el('option', null, `${t.e} ${t.l}`);
      o.value = t.k; sel.appendChild(o);
    });
    $('inspo-save').addEventListener('click', () => {
      const v = $('inspo-text').value.trim();
      if (!v) return toast('先写点什么吧 ✍️');
      S.inspos.push({ id: uid(), text: v, type: sel.value, src: $('inspo-src').value, date: dstr() });
      $('inspo-text').value = '';
      save(); renderInspo(); toast('存好啦 🌱');
    });
  }

  /* ================= 英语学习 ================= */
  const EN = {
    left: 0, total: 0, timer: null, running: false,
    fmt(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; },
    paint() {
      $('en-time').textContent = this.fmt(Math.max(0, this.left));
      const C = 2 * Math.PI * 44;
      const p = this.total ? this.left / this.total : 0;
      $('en-ring').setAttribute('stroke-dashoffset', C * (1 - p));
      $('en-state').textContent = this.running ? '专心学习中…' : (this.left <= 0 ? '完成啦 🎉' : '已暂停');
      $('en-toggle').textContent = this.running ? '暂停' : (this.left <= 0 ? '再来一轮' : '继续');
    },
    reset(min) {
      this.stop();
      this.total = (min || S.english.minutes) * 60;
      this.left = this.total;
      this.paint();
    },
    start() {
      if (this.running) return;
      if (this.left <= 0) this.reset();
      this.running = true;
      this.timer = setInterval(() => {
        this.left--;
        if (this.left <= 0) { this.left = 0; this.stop(); this.done(); }
        this.paint();
      }, 1000);
      this.paint();
    },
    stop() { clearInterval(this.timer); this.timer = null; this.running = false; },
    pause(silent) { if (this.running) { this.stop(); this.paint(); if (!silent) toast('已暂停'); } },
    autoStart() {
      if (this.total === 0) this.reset();
      if (!this.running && this.left > 0) this.start();
    },
    done() {
      this.paint();
      const t = dstr();
      if (!S.english.checkins.includes(t)) S.english.checkins.push(t);
      save(); renderEnStreak(); renderHome();
      showReward({ min: S.english.minutes, label: '英语学习', kind: 'en' });
    }
  };

  function speak(text) {
    if (!('speechSynthesis' in window)) return toast('这台设备不支持朗读');
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = .88;
    speechSynthesis.speak(u);
  }

  function renderEnSentence() {
    const s = pickByDay(D.SENTENCES);
    $('en-sentence').innerHTML =
      `<div class="sentence-en">${esc(s.en)}</div>
       <div class="sentence-cn">${esc(s.cn)}</div>
       <div class="sentence-note">💡 ${esc(s.note)}</div>
       <div class="sentence-act">
         <button class="btn-ghost" id="sc-play">🔊 朗读</button>
         <button class="btn-ghost" id="sc-copy">📋 复制</button>
         <button class="btn-ghost" id="sc-fav">💾 存进灵感</button>
       </div>`;
    $('sc-play').addEventListener('click', () => speak(s.en));
    $('sc-copy').addEventListener('click', () => {
      if (navigator.clipboard) navigator.clipboard.writeText(`${s.en}\n${s.cn}`).then(() => toast('已复制'), () => toast('复制失败'));
    });
    $('sc-fav').addEventListener('click', () => {
      S.inspos.push({ id: uid(), text: `${s.en}\n${s.cn}`, type: 'quote', src: 'other', date: dstr() });
      save(); toast('已存进灵感抓取 🌱');
    });
  }

  function renderEnMy() {
    const box = $('en-my-list');
    box.innerHTML = '';
    S.english.my.slice().reverse().forEach(m => {
      const c = el('div', 'sentence-card');
      c.innerHTML = `<div class="sentence-en">${esc(m.en)}</div>
        ${m.cn ? `<div class="sentence-cn">${esc(m.cn)}</div>` : ''}
        <div class="sentence-act">
          <button class="btn-ghost sp">🔊 朗读</button>
          <button class="btn-ghost dl">🗑 删除</button>
        </div>`;
      c.querySelector('.sp').addEventListener('click', () => speak(m.en));
      c.querySelector('.dl').addEventListener('click', () => {
        S.english.my = S.english.my.filter(x => x.id !== m.id); save(); renderEnMy();
      });
      box.appendChild(c);
    });
  }

  function renderEnWords() {
    const box = $('en-words');
    box.innerHTML = '';
    const start = (daySeed() + S.english.wordSeed * 8) % D.WORDS.length;
    for (let i = 0; i < 8; i++) {
      const w = D.WORDS[(start + i) % D.WORDS.length];
      const known = S.english.known.includes(w.w);
      const c = el('div', 'word-card' + (known ? ' known' : ''));
      c.innerHTML = `<div class="word-en">${esc(w.w)}</div><div class="word-ph">${esc(w.p)}</div><div class="word-cn">${esc(w.m)}</div>`;
      c.addEventListener('click', () => {
        if (S.english.known.includes(w.w)) S.english.known = S.english.known.filter(x => x !== w.w);
        else { S.english.known.push(w.w); speak(w.w); }
        save(); renderEnWords();
      });
      box.appendChild(c);
    }
  }

  function renderEnStreak() {
    const box = $('en-streak');
    box.innerHTML = '';
    const now = new Date();
    const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    const W = ['一', '二', '三', '四', '五', '六', '日'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(mon); d.setDate(mon.getDate() + i);
      const on = S.english.checkins.includes(dstr(d));
      box.appendChild(el('div', 'streak-day' + (on ? ' on' : ''),
        `<span class="sd-n">${d.getDate()}</span><span>${W[i]}</span>`));
    }
  }

  let speakIdx = 0;
  function renderSpeak() {
    const pool = D.SENTENCES.concat(S.english.my.filter(m => m.en).map(m => ({ en: m.en, cn: m.cn || '' })));
    const s = pool[(daySeed() + speakIdx) % pool.length];
    $('speak-text').textContent = s.en;
    $('speak-text').dataset.en = s.en;
    $('speak-score').textContent = '';
    $('speak-result').textContent = '点麦克风开始朗读';
  }

  function similarity(a, b) {
    const norm = s => s.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(Boolean);
    const A = norm(a), B = norm(b);
    if (!A.length || !B.length) return 0;
    const bag = B.slice();
    let hit = 0;
    A.forEach(w => { const i = bag.indexOf(w); if (i > -1) { hit++; bag.splice(i, 1); } });
    return Math.round(hit / A.length * 100);
  }

  function initSpeak() {
    const mic = $('speak-mic');
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    let rec = null, recording = false;

    mic.addEventListener('click', () => {
      if (!SR) {
        const t = dstr();
        if (!S.english.checkins.includes(t)) S.english.checkins.push(t);
        save(); renderEnStreak();
        $('speak-result').textContent = '这台设备不支持语音识别，已记为「朗读打卡」✅';
        return toast('已记录朗读打卡 ✅');
      }
      if (recording) { if (rec) rec.stop(); return; }
      rec = new SR();
      rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 1;
      recording = true;
      mic.classList.add('rec'); mic.textContent = '⏹';
      $('speak-result').textContent = '在听… 大声读出来吧';
      rec.onresult = ev => {
        const said = ev.results[0][0].transcript;
        const sc = similarity($('speak-text').dataset.en, said);
        $('speak-score').textContent = sc + ' 分';
        $('speak-result').textContent = `你读的是：${said}` +
          (sc >= 85 ? '　发音很准 🎉' : sc >= 60 ? '　不错，再顺一遍' : '　慢一点，一个词一个词来');
        const t = dstr();
        if (!S.english.checkins.includes(t)) S.english.checkins.push(t);
        save(); renderEnStreak();
      };
      rec.onerror = () => { $('speak-result').textContent = '没听清，再试一次（记得允许麦克风权限）'; };
      rec.onend = () => { recording = false; mic.classList.remove('rec'); mic.textContent = '🎤'; };
      rec.start();
    });

    $('speak-play').addEventListener('click', () => speak($('speak-text').dataset.en));
    $('speak-next').addEventListener('click', () => { speakIdx++; renderSpeak(); });
  }

  function renderEnglish() {
    renderEnSentence(); renderEnMy(); renderEnWords(); renderEnStreak(); renderSpeak();
    if (EN.total === 0) EN.reset();
    EN.paint();
  }

  function initEnglish() {
    $('en-seg').addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      $('en-seg').querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      ['sentence', 'word', 'speak'].forEach(t =>
        $('en-tab-' + t).style.display = t === b.dataset.tab ? '' : 'none');
    });
    $('en-toggle').addEventListener('click', () => EN.running ? EN.pause() : EN.start());
    $('en-reset').addEventListener('click', () => { EN.reset(); toast('已重置'); });
    $('en-setmin').addEventListener('click', () => {
      const v = prompt('学习时长（分钟）', S.english.minutes);
      const n = parseInt(v, 10);
      if (n > 0 && n <= 180) { S.english.minutes = n; save(); EN.reset(n); toast(`设为 ${n} 分钟`); }
    });
    $('en-my-add').addEventListener('click', () => {
      const en = $('en-my-en').value.trim();
      if (!en) return toast('先写英文内容');
      S.english.my.push({ id: uid(), en, cn: $('en-my-cn').value.trim() });
      $('en-my-en').value = ''; $('en-my-cn').value = '';
      save(); renderEnMy(); renderSpeak(); toast('加进你的短句库了 📚');
    });
    $('en-word-refresh').addEventListener('click', () => {
      S.english.wordSeed = (S.english.wordSeed + 1) % 100; save(); renderEnWords();
    });
    initSpeak();
  }
  /* ================= 专注计时 ================= */
  const FC = {
    left: 0, total: 0, timer: null, running: false,
    paint() {
      $('fc-time').textContent = `${pad(Math.floor(this.left / 60))}:${pad(this.left % 60)}`;
      const C = 2 * Math.PI * 44;
      const p = this.total ? this.left / this.total : 0;
      $('fc-ring').setAttribute('stroke-dashoffset', C * (1 - p));
      $('fc-state').textContent = this.running ? '专注中…' : (this.left === this.total ? '准备好了吗' : '已暂停');
      $('fc-emoji').textContent = this.running ? (p > .66 ? '🌱' : p > .33 ? '🌿' : '🌸') : '🌱';
      $('fc-toggle').textContent = this.running ? '暂停' : (this.left === this.total ? '开始专注' : '继续');
    },
    reset(min) {
      clearInterval(this.timer); this.timer = null; this.running = false;
      this.total = (min || S.focus.preset) * 60;
      this.left = this.total;
      this.paint();
    },
    start() {
      if (this.running) return;
      if (this.left <= 0) this.reset();
      this.running = true;
      this.timer = setInterval(() => {
        this.left--;
        if (this.left <= 0) { this.left = 0; this.finish(); return; }
        this.paint();
      }, 1000);
      this.paint();
    },
    pause() { clearInterval(this.timer); this.timer = null; this.running = false; this.paint(); },
    finish() {
      clearInterval(this.timer); this.timer = null; this.running = false;
      const min = Math.round(this.total / 60);
      const label = $('fc-label').value.trim() || '专注';
      S.focus.sessions.push({ id: uid(), label, min, date: dstr(), at: new Date().toISOString() });
      save();
      this.reset();
      renderFocus(); renderHome();
      showReward({ min, label, kind: 'focus' });
    }
  };

  const markPreset = () => document.querySelectorAll('#fc-presets .preset')
    .forEach(b => b.classList.toggle('active', +b.dataset.m === S.focus.preset));

  function renderFocus() {
    const pb = $('fc-presets');
    if (!pb.children.length) {
      [10, 15, 25, 45, 60].forEach(m => {
        const b = el('button', 'preset', m + ' 分');
        b.dataset.m = m;
        b.addEventListener('click', () => {
          if (FC.running) return toast('先暂停再改时长哦');
          S.focus.preset = m; save(); FC.reset(m); markPreset();
        });
        pb.appendChild(b);
      });
    }
    markPreset();
    if (FC.total === 0) FC.reset();
    FC.paint();

    const t = dstr();
    $('fc-today').textContent = S.focus.sessions.filter(x => x.date === t).reduce((a, b) => a + b.min, 0);
    $('fc-count').textContent = S.focus.sessions.length;
    $('fc-total').textContent = (S.focus.sessions.reduce((a, b) => a + b.min, 0) / 60).toFixed(1);

    const bg = $('fc-badges');
    bg.innerHTML = '';
    D.BADGES.forEach(b => {
      const on = S.focus.sessions.length >= b.n;
      bg.appendChild(el('div', 'badge-item' + (on ? '' : ' locked'),
        `<span>${b.e}</span><span class="bl">${b.l}</span>`));
    });

    const lg = $('fc-log');
    lg.innerHTML = '';
    const list = S.focus.sessions.slice().reverse().slice(0, 20);
    if (!list.length) { lg.appendChild(el('div', 'empty', '<span class="e-icon">⏳</span>还没有专注记录')); return; }
    list.forEach(x => {
      const tm = new Date(x.at);
      const c = el('div', 'money-item');
      c.innerHTML = `<div class="mi-ic">🎯</div>
        <div class="mi-b"><div class="mi-t">${esc(x.label)}</div>
        <div class="mi-d">${x.date} ${pad(tm.getHours())}:${pad(tm.getMinutes())}</div></div>
        <div class="mi-a" style="color:var(--primary-deep)">${x.min}′</div>`;
      lg.appendChild(c);
    });
  }

  function initFocus() {
    $('fc-toggle').addEventListener('click', () => FC.running ? FC.pause() : FC.start());
    $('fc-give').addEventListener('click', () => {
      if (!FC.running && FC.left === FC.total) return;
      if (confirm('确定放弃这次专注吗？')) { FC.reset(); toast('没关系，休息一下再来 🍵'); }
    });
  }

  /* ================= 奖励弹窗 ================= */
  function showReward(o) {
    const r = D.REWARDS[Math.floor(Math.random() * D.REWARDS.length)];
    $('reward-icon').textContent = r.e;
    $('reward-title').textContent = r.t;
    $('reward-sub').textContent = o.kind === 'en'
      ? `刚刚 ${o.min} 分钟的英语，你一句没落下。${r.s}`
      : `「${o.label}」专注了 ${o.min} 分钟。${r.s}`;
    $('reward-stat').innerHTML =
      `<div><div class="rn">${o.min}′</div><div class="rl">本次</div></div>
       <div><div class="rn">${S.focus.sessions.length}</div><div class="rl">总次数</div></div>
       <div><div class="rn">${calcStreak()}</div><div class="rl">连续天数</div></div>`;
    $('reward-mask').classList.add('show');
    confetti();
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
  }

  function confetti() {
    const colors = ['#C9AFE8', '#F9C4CB', '#BBD8F0', '#F8E7B8', '#B7E0D2', '#EFB8C0'];
    for (let i = 0; i < 46; i++) {
      const c = el('div', 'confetti');
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
      c.style.animationDuration = (1.7 + Math.random() * 1.4) + 's';
      c.style.animationDelay = (Math.random() * .5) + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }
  }

  /* ================= 情绪日记 ================= */
  let moodSel = null, reasonSel = [];

  function renderReasons() {
    const box = $('mood-reasons');
    box.innerHTML = '';
    const m = D.MOODS.find(x => x.k === moodSel);
    const pool = !m ? D.REASONS_GOOD.slice(0, 5).concat(D.REASONS_BAD.slice(0, 5))
      : (m.v >= 3.5 ? D.REASONS_GOOD : D.REASONS_BAD);
    pool.forEach(r => {
      const c = el('button', 'reason-chip' + (reasonSel.indexOf(r) > -1 ? ' sel' : ''), r);
      c.addEventListener('click', () => {
        reasonSel = reasonSel.indexOf(r) > -1 ? reasonSel.filter(x => x !== r) : reasonSel.concat(r);
        renderReasons();
      });
      box.appendChild(c);
    });
  }

  function renderMoodChart() {
    const box = $('mood-chart');
    box.innerHTML = '';
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const rec = S.moods.filter(x => x.date === dstr(d)).pop();
      const m = rec && D.MOODS.find(x => x.k === rec.mood);
      const h = m ? (m.v / 5 * 100) : 4;
      const bar = el('div', 'mood-bar');
      bar.innerHTML = `<div class="mb-f" style="height:${h}%"></div><div class="mb-l">${d.getDate()}</div>`;
      box.appendChild(bar);
    }
  }

  function renderMoodList() {
    const box = $('mood-list');
    box.innerHTML = '';
    const list = S.moods.slice().reverse();
    if (!list.length) { box.appendChild(el('div', 'empty', '<span class="e-icon">🫧</span>还没有记录<br>今天心情怎么样呢')); return; }
    list.forEach(x => {
      const m = D.MOODS.find(y => y.k === x.mood) || { e: '🫧', l: '心情' };
      const c = el('div', 'mood-entry');
      c.innerHTML = `<div class="me-e">${m.e}</div>
        <div class="me-b"><div class="me-t">${m.l}</div><div class="me-d">${x.date}</div>
        ${x.reasons && x.reasons.length ? `<div class="tc-tags" style="margin-top:6px">${x.reasons.map(r => `<span class="tag">${esc(r)}</span>`).join('')}</div>` : ''}
        ${x.note ? `<div class="me-x">${esc(x.note)}</div>` : ''}</div>
        <button class="task-del">✕</button>`;
      c.querySelector('.task-del').addEventListener('click', () => {
        S.moods = S.moods.filter(y => y.id !== x.id); save(); renderMood(); renderHome();
      });
      box.appendChild(c);
    });
  }

  function renderMood() {
    const pk = $('mood-picker');
    if (!pk.children.length) {
      D.MOODS.forEach(m => {
        const b = el('button', 'mood-opt', `<span class="mo-e">${m.e}</span><span class="mo-l">${m.l}</span>`);
        b.addEventListener('click', () => {
          moodSel = m.k;
          pk.querySelectorAll('.mood-opt').forEach(x => x.classList.toggle('sel', x === b));
          renderReasons();
        });
        pk.appendChild(b);
      });
    }
    renderReasons(); renderMoodChart(); renderMoodList();
  }

  function initMood() {
    $('mood-save').addEventListener('click', () => {
      if (!moodSel) return toast('先选一个心情呀 💭');
      S.moods.push({ id: uid(), date: dstr(), mood: moodSel, reasons: reasonSel, note: $('mood-note').value.trim() });
      $('mood-note').value = '';
      const m = D.MOODS.find(x => x.k === moodSel);
      moodSel = null; reasonSel = [];
      document.querySelectorAll('#mood-picker .mood-opt').forEach(x => x.classList.remove('sel'));
      save(); renderMood(); renderHome();
      toast(m && m.v < 3 ? '记下来了，抱抱你 🫂' : '记下来啦 ✨');
    });
  }

  /* ================= 表达力 ================= */
  let exTopicOff = 0;
  const curTopic = () => D.EX_TOPICS[(daySeed() + exTopicOff) % D.EX_TOPICS.length];

  function analyzeExpress(text) {
    const clean = text.trim();
    const len = clean.replace(/\s/g, '').length;
    const sentences = clean.split(/[。！？!?\n]/).filter(s => s.trim().length > 1);
    const avgLen = sentences.length ? len / sentences.length : len;

    const d1 = Math.min(100, Math.round(len / 220 * 100));

    const conn = ['首先', '其次', '再次', '最后', '另外', '而且', '但是', '不过', '因为', '所以',
      '第一', '第二', '第三', '一方面', '另一方面', '总的来说', '总之', '举个例子', '比如'];
    const connHit = conn.filter(c => clean.indexOf(c) > -1).length;
    const d2 = Math.min(100, 34 + connHit * 16 + (sentences.length >= 4 ? 16 : 0));

    const numHit = (clean.match(/\d/g) || []).length;
    const caseWord = ['比如', '例如', '有一次', '那天', '记得', '上周', '昨天', '我曾', '当时'];
    const caseHit = caseWord.filter(c => clean.indexOf(c) > -1).length;
    const d3 = Math.min(100, 26 + Math.min(numHit, 8) * 5 + caseHit * 20);

    const opinion = ['我觉得', '我认为', '在我看来', '我的答案', '我会', '我选择', '我更', '结论是', '所以我'];
    const opHit = opinion.filter(c => clean.indexOf(c) > -1).length;
    const d4 = Math.min(100, 30 + opHit * 24 + (avgLen > 12 && avgLen < 60 ? 18 : 0));

    const words = clean.split(/[，,。！？\s]/).filter(w => w.length > 1);
    const rep = words.length - new Set(words).size;
    const d5 = Math.min(100, Math.max(20, 92 - Math.max(0, avgLen - 55) * 1.4 - rep * 3));

    const dims = [
      { l: '内容量', v: Math.round(d1) }, { l: '结构', v: Math.round(d2) },
      { l: '举例', v: Math.round(d3) }, { l: '观点', v: Math.round(d4) },
      { l: '流畅', v: Math.round(d5) }
    ];
    const score = Math.round(dims.reduce((a, b) => a + b.v, 0) / dims.length);

    const adv = [];
    if (d1 < 55) adv.push({ i: '📏', t: `目前只有 ${len} 字，偏短。试着把每个观点再往下追问一层「为什么」「所以呢」，扩到 200 字以上。` });
    if (d2 < 55) adv.push({ i: '🧱', t: '结构不太清楚。用「首先 / 其次 / 最后」或「观点—理由—例子—结论」把话铺开，听的人会轻松很多。' });
    if (d3 < 55) adv.push({ i: '🔍', t: '缺少具体例子。加一件真实发生的事、一个时间点或一个数字，说服力立刻不一样。' });
    if (d4 < 55) adv.push({ i: '🚩', t: '观点不够鲜明。开头就把结论抛出来——「我认为…」，别让人猜你的立场。' });
    if (d5 < 55) adv.push({ i: '🌊', t: '句子偏长或有重复。一句话只说一件事，超过 40 个字就断开。' });
    if (!adv.length) adv.push({ i: '🎉', t: '这段表达已经很完整了！下次可以加一个反面情况，让论述更有层次。' });

    const weakest = dims.slice().sort((a, b) => a.v - b.v)[0];
    const goalMap = {
      '内容量': '下次目标：同一个话题写到 250 字以上，不重复绕圈。',
      '结构': '下次目标：强制用「结论 → 两个理由 → 一个例子 → 收尾」的顺序写一遍。',
      '举例': '下次目标：至少讲一件带时间、地点、人物的具体小事。',
      '观点': '下次目标：第一句话就把结论说完，后面全是支撑。',
      '流畅': '下次目标：写完读一遍，把所有超过 40 字的长句拆成两句。'
    };
    const level = score >= 85 ? '很出色' : score >= 70 ? '不错' : score >= 55 ? '及格' : '继续练';
    return { score, dims, adv, goal: goalMap[weakest.l], level };
  }

  function renderExFeedback(r) {
    const box = $('ex-feedback');
    box.innerHTML = '';
    const c = el('div', 'card');
    c.innerHTML =
      `<div class="sec-title"><span class="em">📊</span>系统点评</div>
       <div class="score-ring-row">
         <div class="big-score"><div class="bs-n">${r.score}</div><div class="bs-l">${r.level}</div></div>
         <div class="dim-list">${r.dims.map(d =>
        `<div class="dim-row"><span class="dr-l">${d.l}</span>
           <span class="dr-t"><span class="dr-f" style="width:${d.v}%"></span></span>
           <span class="dr-n">${d.v}</span></div>`).join('')}</div>
       </div>
       <div class="sec-title" style="margin:16px 0 10px"><span class="em">🛠</span>可以怎么改</div>
       ${r.adv.map(a => `<div class="advice-item"><span class="ai-i">${a.i}</span><span>${esc(a.t)}</span></div>`).join('')}
       <div class="sentence-note" style="margin-top:12px">🎯 ${esc(r.goal)}</div>`;
    box.appendChild(c);
  }

  function renderExHistory() {
    const box = $('ex-history');
    box.innerHTML = '';
    const list = S.express.slice().reverse();
    if (!list.length) { box.appendChild(el('div', 'empty', '<span class="e-icon">💬</span>还没有练习记录')); return; }
    list.forEach(x => {
      const c = el('div', 'card');
      c.innerHTML = `<div class="row-between" style="margin-bottom:8px">
          <span class="tag">${x.date}</span><span class="tag">${x.score} 分</span></div>
        <div class="muted" style="margin-bottom:6px">${esc(x.topic)}</div>
        <div class="ic-text" style="font-size:13px">${esc(x.text.slice(0, 120))}${x.text.length > 120 ? '…' : ''}</div>
        <div style="text-align:right;margin-top:8px"><button class="task-del">✕</button></div>`;
      c.querySelector('.task-del').addEventListener('click', () => {
        S.express = S.express.filter(y => y.id !== x.id); save(); renderExHistory();
      });
      box.appendChild(c);
    });
  }

  function renderExpress() {
    const t = curTopic();
    $('ex-topic').textContent = t.q;
    $('ex-hint').textContent = '💡 ' + t.h;
    renderExHistory();
  }

  function initExpress() {
    $('ex-input').addEventListener('input', e => {
      $('ex-count').textContent = e.target.value.replace(/\s/g, '').length + ' 字';
    });
    $('ex-change').addEventListener('click', () => { exTopicOff++; renderExpress(); $('ex-feedback').innerHTML = ''; });
    $('ex-submit').addEventListener('click', () => {
      const v = $('ex-input').value.trim();
      if (v.replace(/\s/g, '').length < 20) return toast('至少说满 20 个字再点评吧 ✍️');
      const t = curTopic();
      const r = analyzeExpress(v);
      renderExFeedback(r);
      S.express.push({ id: uid(), date: dstr(), topic: t.q, text: v, score: r.score });
      save(); renderExHistory(); renderHome();
    });
  }
  /* ================= 美食 ================= */
  let foodImg = null, foodStar = 5;

  function compressImage(file, cb) {
    const fr = new FileReader();
    fr.onload = e => {
      const img = new Image();
      img.onload = () => {
        const MAX = 620;
        let w = img.width, h = img.height;
        const s = Math.min(1, MAX / Math.max(w, h));
        w = Math.round(w * s); h = Math.round(h * s);
        const cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        cb(cv.toDataURL('image/jpeg', .72));
      };
      img.src = e.target.result;
    };
    fr.readAsDataURL(file);
  }

  function renderFoodStars() {
    const box = $('food-stars');
    box.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const s = el('span', i <= foodStar ? 'on' : '', '★');
      (function (n) { s.addEventListener('click', () => { foodStar = n; renderFoodStars(); }); })(i);
      box.appendChild(s);
    }
  }

  function renderFood() {
    renderFoodStars();
    const box = $('food-grid');
    box.innerHTML = '';
    $('food-count').textContent = S.foods.length ? S.foods.length + ' 张' : '';
    if (!S.foods.length) {
      box.style.display = 'block';
      box.appendChild(el('div', 'empty', '<span class="e-icon">🍰</span>还没有贴纸<br>拍下第一顿好吃的吧'));
      return;
    }
    box.style.display = '';
    S.foods.slice().reverse().forEach(f => {
      const c = el('div', 'food-sticker');
      c.innerHTML =
        `<div class="fs-tape"></div>
         ${f.img ? `<img class="fs-img" src="${f.img}" alt="">` : `<div class="fs-ph">🍽</div>`}
         <div class="fs-name">${esc(f.name || '好吃的')}</div>
         <div class="fs-shop">${esc(f.shop || f.date)}</div>
         <div class="fs-foot"><span class="fs-star">${'★'.repeat(f.stars || 0)}</span>
         <span class="fs-price">${f.price ? '¥' + esc(f.price) : ''}</span></div>`;
      c.addEventListener('click', () => {
        if (confirm(`${f.name}\n${f.shop || ''}\n${f.note || ''}\n\n删除这张贴纸？`)) {
          S.foods = S.foods.filter(x => x.id !== f.id); save(); renderFood();
        }
      });
      box.appendChild(c);
    });
  }

  function initFood() {
    $('food-file').addEventListener('change', e => {
      const f = e.target.files[0];
      if (!f) return;
      compressImage(f, url => {
        foodImg = url;
        const p = $('food-preview');
        p.src = url; p.style.display = '';
        $('food-drop').style.display = 'none';
      });
    });
    $('food-save').addEventListener('click', () => {
      const name = $('food-name').value.trim();
      if (!name && !foodImg) return toast('至少写个名字或放张图 🍽');
      S.foods.push({
        id: uid(), name: name, shop: $('food-shop').value.trim(),
        price: $('food-price').value.trim(), stars: foodStar,
        note: $('food-note').value.trim(), img: foodImg, date: dstr()
      });
      foodImg = null; foodStar = 5;
      ['food-name', 'food-shop', 'food-price', 'food-note'].forEach(i => $(i).value = '');
      $('food-preview').style.display = 'none';
      $('food-drop').style.display = '';
      $('food-file').value = '';
      save(); renderFood(); toast('贴纸做好啦 🧷');
    });
  }

  /* ================= 文学 ================= */
  let litCat = 'all', litOff = 0;
  function renderLit() {
    const box = $('lit-list');
    box.innerHTML = '';
    let list;
    if (litCat === 'mine') {
      list = S.lit.slice().reverse();
      $('lit-tip').textContent = '我的摘抄本';
      if (!list.length) { box.appendChild(el('div', 'empty', '<span class="e-icon">✒️</span>摘抄本还是空的<br>往下加一句喜欢的话')); return; }
    } else {
      const pool = D.LIT.concat(S.lit).filter(x => litCat === 'all' || x.c === litCat);
      $('lit-tip').textContent = '今日推送';
      list = [];
      for (let i = 0; i < Math.min(6, pool.length); i++) list.push(pool[(daySeed() + litOff * 6 + i) % pool.length]);
    }
    const CN = { poem: '诗歌', prose: '散文', novel: '小说', other: '其他' };
    list.forEach(x => {
      const c = el('div', 'lit-card');
      c.innerHTML =
        `<div class="lit-quote">${esc(x.q)}</div>
         <div class="lit-src"><span class="lit-cat ${x.c || 'other'}">${CN[x.c] || '其他'}</span>
         <span class="ls-book">《${esc(x.b)}》</span><span>· ${esc(x.a)}</span></div>
         <div style="display:flex;gap:8px;margin-top:12px">
           <button class="btn-ghost cp">📋 复制</button>
           <button class="btn-ghost sv">🌱 存进灵感</button>
           ${x.id ? '<button class="btn-ghost dl">🗑</button>' : ''}
         </div>`;
      c.querySelector('.cp').addEventListener('click', () => {
        if (navigator.clipboard) navigator.clipboard.writeText(`${x.q}\n——《${x.b}》${x.a}`).then(() => toast('已复制'));
      });
      c.querySelector('.sv').addEventListener('click', () => {
        S.inspos.push({ id: uid(), text: `${x.q}\n——《${x.b}》${x.a}`, type: 'quote', src: 'other', date: dstr() });
        save(); toast('已存进灵感 🌱');
      });
      const dl = c.querySelector('.dl');
      if (dl) dl.addEventListener('click', () => {
        S.lit = S.lit.filter(y => y.id !== x.id); save(); renderLit();
      });
      box.appendChild(c);
    });
  }

  function initLit() {
    $('lit-seg').addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      litCat = b.dataset.cat;
      $('lit-seg').querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      renderLit();
    });
    $('lit-refresh').addEventListener('click', () => { litOff++; renderLit(); });
    $('lit-save').addEventListener('click', () => {
      const q = $('lit-q').value.trim();
      if (!q) return toast('先摘一句话吧 ✒️');
      S.lit.push({
        id: uid(), q: q, b: $('lit-book').value.trim() || '未命名',
        a: $('lit-author').value.trim() || '佚名', c: $('lit-cat').value
      });
      ['lit-q', 'lit-book', 'lit-author'].forEach(i => $(i).value = '');
      save(); renderLit(); toast('收进摘抄本啦 📖');
    });
  }

  /* ================= 记账 ================= */
  let moKind = 'out', moChartKind = 'out', moMonth = mstr();

  function shiftMonth(m, n) {
    const p = m.split('-').map(Number);
    return mstr(new Date(p[0], p[1] - 1 + n, 1));
  }

  function renderMoCats() {
    const sel = $('mo-cat');
    sel.innerHTML = '';
    D.MONEY_CATS[moKind].forEach(c => {
      const o = el('option', null, `${c.e} ${c.l}`);
      o.value = c.k; sel.appendChild(o);
    });
  }

  function renderMoney() {
    const mp = moMonth.split('-');
    $('mo-label').textContent = `${mp[0]} 年 ${+mp[1]} 月`;
    if (!$('mo-date').value) $('mo-date').value = dstr();
    renderMoCats();

    const list = S.money.filter(x => x.date.slice(0, 7) === moMonth);
    const inSum = list.filter(x => x.kind === 'in').reduce((a, b) => a + b.amount, 0);
    const outSum = list.filter(x => x.kind === 'out').reduce((a, b) => a + b.amount, 0);
    $('mo-in').textContent = money(inSum);
    $('mo-out').textContent = money(outSum);
    $('mo-balance').textContent = (inSum - outSum < 0 ? '-¥' : '¥') + money(Math.abs(inSum - outSum));
    $('mo-count').textContent = list.length ? list.length + ' 笔' : '';

    const cb = $('mo-cats');
    cb.innerHTML = '';
    const sub = list.filter(x => x.kind === moChartKind);
    const total = sub.reduce((a, b) => a + b.amount, 0);
    if (!total) {
      cb.appendChild(el('div', 'empty', '<span class="e-icon">📊</span>本月还没有记录'));
    } else {
      D.MONEY_CATS[moChartKind]
        .map(c => ({ c: c, v: sub.filter(x => x.cat === c.k).reduce((a, b) => a + b.amount, 0) }))
        .filter(x => x.v > 0)
        .sort((a, b) => b.v - a.v)
        .forEach(o => {
          const row = el('div', 'cat-bar-row');
          row.innerHTML =
            `<div class="cat-bar-head"><span class="cb-i">${o.c.e}</span><span class="cb-n">${o.c.l}</span>
             <span class="cb-v">¥${money(o.v)} · ${Math.round(o.v / total * 100)}%</span></div>
             <div class="cat-bar-track"><div class="cat-bar-fill" style="width:${o.v / total * 100}%;background:${o.c.c}"></div></div>`;
          cb.appendChild(row);
        });
    }

    const lb = $('mo-list');
    lb.innerHTML = '';
    if (!list.length) { lb.appendChild(el('div', 'empty', '<span class="e-icon">🧾</span>这个月还没记账<br>从今天的第一笔开始')); return; }
    const byDay = {};
    list.forEach(x => { (byDay[x.date] = byDay[x.date] || []).push(x); });
    Object.keys(byDay).sort().reverse().forEach(day => {
      const items = byDay[day];
      const di = items.filter(x => x.kind === 'in').reduce((a, b) => a + b.amount, 0);
      const dou = items.filter(x => x.kind === 'out').reduce((a, b) => a + b.amount, 0);
      lb.appendChild(el('div', 'day-group-title',
        `<span>${day.slice(5)}</span><span>${di ? '收 ¥' + money(di) + '　' : ''}${dou ? '支 ¥' + money(dou) : ''}</span>`));
      items.forEach(x => {
        const c = D.MONEY_CATS[x.kind].find(y => y.k === x.cat) || { e: '📦', l: '其他', c: '#EFE5F9' };
        const n = el('div', 'money-item');
        n.innerHTML = `<div class="mi-ic" style="background:${c.c}33">${c.e}</div>
          <div class="mi-b"><div class="mi-t">${c.l}${x.note ? ' · ' + esc(x.note) : ''}</div>
          <div class="mi-d">${x.date}</div></div>
          <div class="mi-a ${x.kind}">${x.kind === 'in' ? '+' : '-'}${money(x.amount)}</div>`;
        n.addEventListener('click', () => {
          if (confirm(`删除这笔？\n${c.l} ${x.kind === 'in' ? '+' : '-'}${money(x.amount)}`)) {
            S.money = S.money.filter(y => y.id !== x.id); save(); renderMoney();
          }
        });
        lb.appendChild(n);
      });
    });
  }

  function initMoney() {
    $('mo-kind').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      moKind = b.dataset.kind;
      $('mo-kind').querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      renderMoCats();
    });
    $('mo-chart-kind').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      moChartKind = b.dataset.k;
      $('mo-chart-kind').querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      renderMoney();
    });
    $('mo-prev').addEventListener('click', () => { moMonth = shiftMonth(moMonth, -1); renderMoney(); });
    $('mo-next').addEventListener('click', () => { moMonth = shiftMonth(moMonth, 1); renderMoney(); });
    $('mo-save').addEventListener('click', () => {
      const a = parseFloat($('mo-amount').value);
      if (!(a > 0)) return toast('先填个金额呀 💰');
      const dt = $('mo-date').value || dstr();
      S.money.push({
        id: uid(), kind: moKind, amount: a, cat: $('mo-cat').value,
        note: $('mo-note').value.trim(), date: dt
      });
      $('mo-amount').value = ''; $('mo-note').value = '';
      moMonth = dt.slice(0, 7);
      save(); renderMoney(); toast(moKind === 'in' ? '收入记好啦 🌿' : '支出记好啦 🧾');
    });
  }

  /* ================= 周周复盘 ================= */
  const wkDate = new Date();
  function renderWeekly() {
    const k = weekKey(wkDate);
    $('wk-label').textContent = `第 ${+k.split('-W')[1]} 周　${weekRange(wkDate)}`;
    const w = S.weekly[k] || {};
    document.querySelectorAll('[data-wk]').forEach(t => { t.value = w[t.dataset.wk] || ''; });

    const s = new Date(wkDate); s.setDate(s.getDate() - ((s.getDay() + 6) % 7)); s.setHours(0, 0, 0, 0);
    const e = new Date(s); e.setDate(e.getDate() + 7);
    const inRange = ds => { const d = new Date(ds); return d >= s && d < e; };
    const tk = S.tasks.filter(x => inRange(x.date) && x.done).length;
    const fm = S.focus.sessions.filter(x => inRange(x.date)).reduce((a, b) => a + b.min, 0);
    const md = S.moods.filter(x => inRange(x.date)).length;
    $('wk-stats').innerHTML =
      `<div class="stat-box"><div class="n">${tk}</div><div class="l">完成任务</div></div>
       <div class="stat-box"><div class="n">${fm}</div><div class="l">专注分钟</div></div>
       <div class="stat-box"><div class="n">${md}</div><div class="l">心情记录</div></div>`;
  }

  function initWeekly() {
    $('wk-prev').addEventListener('click', () => { wkDate.setDate(wkDate.getDate() - 7); renderWeekly(); });
    $('wk-next').addEventListener('click', () => { wkDate.setDate(wkDate.getDate() + 7); renderWeekly(); });
    document.querySelectorAll('[data-wk]').forEach(t => {
      t.addEventListener('input', () => {
        const k = weekKey(wkDate);
        S.weekly[k] = S.weekly[k] || {};
        S.weekly[k][t.dataset.wk] = t.value;
        save();
      });
    });
  }

  /* ================= 设置 ================= */
  function initSettings() {
    $('export-btn').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `影影工作台备份-${dstr()}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('备份已导出 📦');
    });
    $('import-btn').addEventListener('click', () => $('import-file').click());
    $('import-file').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      const fr = new FileReader();
      fr.onload = ev => {
        try {
          S = Object.assign(defaultState(), JSON.parse(ev.target.result));
          localStorage.setItem(KEY, JSON.stringify(S));
          toast('导入成功，正在刷新…');
          setTimeout(() => location.reload(), 800);
        } catch (err) { toast('文件格式不对'); }
      };
      fr.readAsText(f);
    });
    $('clear-btn').addEventListener('click', () => {
      if (confirm('真的要清空所有数据吗？建议先导出备份。')) {
        localStorage.removeItem(KEY);
        toast('已清空');
        setTimeout(() => location.reload(), 600);
      }
    });
    $('reward-close').addEventListener('click', () => $('reward-mask').classList.remove('show'));
    $('reward-mask').addEventListener('click', e => {
      if (e.target === $('reward-mask')) $('reward-mask').classList.remove('show');
    });
  }

  /* ================= 启动 ================= */
  function boot() {
    initCover(); initNav(); initDaily(); initTopic(); initInspo();
    initEnglish(); initFocus(); initMood(); initExpress();
    initFood(); initLit(); initMoney(); initWeekly(); initSettings();
    go('home');

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () =>
        navigator.serviceWorker.register('sw.js').catch(function () {}));
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
