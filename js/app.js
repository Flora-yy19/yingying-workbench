(() => {
  'use strict';

  // ===== 配置 =====
  const PAGES = [
    { id: 'home', name: '首页', icon: '🏠', type: 'home', color: '#8b9d83', bg: '#edf1e9' },
    { id: 'daily', name: '每日计划', icon: '☀️', type: 'task', color: '#8b9d83', bg: '#edf1e9' },
    { id: 'inspo', name: '灵感抓取', icon: '✨', type: 'inspo', color: '#c4a8a2', bg: '#f5eeeb' },
    { id: 'weekly', name: '周周复盘', icon: '📋', type: 'weekly', color: '#9aa7b0', bg: '#eef1f3' },
    { id: 'memo', name: '备忘录', icon: '📌', type: 'memo', color: '#c4b8a8', bg: '#f5f1ea' },
    { id: 'english', name: '英语学习', icon: '🌿', type: 'task', color: '#b0a4b6', bg: '#f0edf2' },
    { id: 'edit', name: '剪辑练习', icon: '🎬', type: 'task', color: '#c7a99e', bg: '#f7f0ec' },
    { id: 'photo', name: '修图练习', icon: '🖼️', type: 'task', color: '#a3a88b', bg: '#eff1e8' },
    { id: 'settings', name: '设置', icon: '⚙️', type: 'settings', color: '#9a9590', bg: '#f7f3ee' }
  ];

  const TASK_BOARDS = ['daily', 'english', 'edit', 'photo'];

  const INSPO_TYPES = [
    { id: 'quote', name: '语录金句', icon: '💬', color: '#c4a8a2' },
    { id: 'copy', name: '文案灵感', icon: '✍️', color: '#9aa7b0' },
    { id: 'visual', name: '视觉参考', icon: '👁️', color: '#c4b8a8' },
    { id: 'music', name: '音乐/BGM', icon: '🎵', color: '#a3a88b' },
    { id: 'topic', name: '爆款选题', icon: '🔥', color: '#c7a99e' },
    { id: 'comment', name: '评论素材', icon: '💭', color: '#b0a4b6' }
  ];

  // ===== 工具函数 =====
  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function weekStr(date) {
    const d = new Date(date);
    const day = d.getDay() || 7;
    const monday = new Date(d);
    monday.setDate(d.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const fmt = x => `${x.getMonth() + 1}/${x.getDate()}`;
    return `${fmt(monday)} - ${fmt(sunday)}`;
  }

  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ===== 状态 =====
  let state = loadState();
  let currentPage = 'home';
  let currentInspoFilter = 'all';
  let weeklyWeek = weekStr(new Date());

  function loadState() {
    try {
      const raw = localStorage.getItem('yingying-workbench');
      if (raw) {
        const s = JSON.parse(raw);
        if (!s.memos) s.memos = [];
        if (!s.weeklies) s.weeklies = {};
        return s;
      }
    } catch (e) { console.warn('读取失败', e); }
    return defaultState();
  }

  function defaultState() {
    return {
      tasks: [
        { id: 't1', boardId: 'daily', title: '整理今日待办事项', date: todayStr(), done: true, desc: '', createdAt: Date.now() - 5000 },
        { id: 't2', boardId: 'daily', title: '刷抖音收集灵感 20 分钟', date: todayStr(), done: false, desc: '记录金句、好文案、视觉参考', createdAt: Date.now() - 4000 },
        { id: 't3', boardId: 'english', title: '背诵英语单词 20 个', date: todayStr(), done: false, desc: '重点复习昨天错题', createdAt: Date.now() - 3000 },
        { id: 't4', boardId: 'english', title: '精听 VOA 一篇', date: todayStr(), done: false, desc: '做听写练习', createdAt: Date.now() - 2000 },
        { id: 't5', boardId: 'edit', title: '练习转场：叠化 + 缩放', date: todayStr(), done: false, desc: '参考教程第 3 章', createdAt: Date.now() - 1000 },
        { id: 't6', boardId: 'photo', title: '调色练习：莫兰迪风格 3 张', date: todayStr(), done: false, desc: '低饱和 + 暖调', createdAt: Date.now() }
      ],
      inspirations: [
        { id: 'i1', title: '普通人逆袭最好的方式：把一件事重复做一万遍。', type: 'quote', desc: '自律/成长类账号适用', source: '抖音', createdAt: Date.now() },
        { id: 'i2', title: '只会空想，但行动力为 0？恭喜你，你的时代来了！', type: 'copy', desc: '反焦虑/行动力选题', source: '抖音', createdAt: Date.now() - 10000 },
        { id: 'i3', title: '俯拍 45° + 自然光 + 绿植前景', type: 'visual', desc: '适合 vlog 封面', source: '抖音', createdAt: Date.now() - 20000 },
        { id: 'i4', title: '治愈系轻音乐《Floating》前 8 秒适合做开头', type: 'music', desc: '情绪舒缓、不抢人声', source: '抖音', createdAt: Date.now() - 30000 }
      ],
      memos: [
        { id: 'm1', content: '下周开始每天背 30 个单词，不能再拖了', date: todayStr(), createdAt: Date.now() }
      ],
      weeklies: {}
    };
  }

  function saveState() {
    try { localStorage.setItem('yingying-workbench', JSON.stringify(state)); }
    catch (e) { console.warn('保存失败', e); }
  }

  // ===== 侧边栏 =====
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const menuBtn = document.getElementById('menu-btn');

    function open() {
      sidebar.classList.add('open');
      overlay.classList.add('open');
    }

    function close() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    }

    menuBtn.addEventListener('click', open);
    overlay.addEventListener('click', close);

    // 渲染侧边栏菜单
    const nav = document.getElementById('sidebar-nav');
    PAGES.filter(p => p.id !== 'settings').forEach(page => {
      const btn = document.createElement('button');
      btn.className = `sidebar-item ${page.id === currentPage ? 'active' : ''}`;
      btn.dataset.page = page.id;
      btn.innerHTML = `<span class="sidebar-icon">${page.icon}</span><span class="sidebar-label">${page.name}</span>`;
      btn.addEventListener('click', () => {
        navigateTo(page.id);
        close();
      });
      nav.appendChild(btn);
    });

    document.querySelectorAll('.sidebar-footer .sidebar-item').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo(btn.dataset.page);
        close();
      });
    });
  }

  function updateSidebarActive() {
    document.querySelectorAll('.sidebar-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === currentPage);
    });
  }

  // ===== 导航 =====
  function navigateTo(pageId) {
    currentPage = pageId;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`)?.classList.add('active');

    const page = PAGES.find(p => p.id === pageId);
    document.getElementById('topbar-title').textContent = page ? page.name : '影影的工作台';

    updateSidebarActive();
    renderCurrentPage();
  }

  function renderCurrentPage() {
    renderHome();
    renderTaskPage('daily');
    renderTaskPage('english');
    renderTaskPage('edit');
    renderTaskPage('photo');
    renderInspirations();
    renderWeekly();
    renderMemos();
  }

  // ===== 渲染首页 =====
  function renderHome() {
    const date = new Date();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    document.getElementById('current-date').textContent =
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;

    const todayTasks = state.tasks.filter(t => t.date === todayStr() || !t.date);
    const done = todayTasks.filter(t => t.done).length;
    const total = todayTasks.length || 1;
    const pct = Math.round((done / total) * 100);
    document.getElementById('progress-circle').setAttribute('stroke-dasharray', `${pct}, 100`);
    document.getElementById('progress-text').textContent = `${pct}%`;

    const shortcuts = document.getElementById('home-shortcuts');
    shortcuts.innerHTML = '';
    PAGES.filter(p => TASK_BOARDS.includes(p.id) || p.id === 'inspo' || p.id === 'memo').forEach(p => {
      const card = document.createElement('div');
      card.className = 'shortcut-card';
      card.innerHTML = `
        <div class="shortcut-icon" style="background:${p.bg};color:${p.color};">${p.icon}</div>
        <span class="shortcut-text">${p.name}</span>
      `;
      card.addEventListener('click', () => navigateTo(p.id));
      shortcuts.appendChild(card);
    });
  }

  // ===== 渲染任务页 =====
  function renderTaskPage(boardId) {
    const container = document.getElementById(`${boardId}-tasks`);
    if (!container) return;
    const page = PAGES.find(p => p.id === boardId);
    const tasks = state.tasks.filter(t => t.boardId === boardId && (t.date === todayStr() || !t.date));

    container.innerHTML = '';
    if (tasks.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding:30px 0;">
          <p>该板块暂无任务<br>点击右下角 + 添加</p>
        </div>`;
      return;
    }

    tasks.forEach(task => {
      container.appendChild(createTaskEl(task, page));
    });
  }

  function createTaskEl(task, page) {
    const div = document.createElement('div');
    div.className = `task-item ${task.done ? 'done' : ''}`;
    div.dataset.taskId = task.id;
    div.innerHTML = `
      <div class="task-icon" style="background:${page.bg};color:${page.color};">${page.icon}</div>
      <div class="task-content">
        <p class="task-title">${escapeHtml(task.title)}</p>
        ${task.desc ? `<p class="task-meta">${escapeHtml(task.desc)}</p>` : ''}
      </div>
      <div class="task-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <button class="delete-btn" aria-label="删除">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </button>
    `;
    div.addEventListener('click', e => {
      if (!e.target.closest('.delete-btn')) toggleTask(task.id);
    });
    div.querySelector('.delete-btn').addEventListener('click', e => {
      e.stopPropagation();
      deleteTask(task.id);
    });
    return div;
  }

  function toggleTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      saveState();
      renderCurrentPage();
      showToast(task.done ? '已完成 ✓' : '已取消');
    }
  }

  function deleteTask(id) {
    if (!confirm('确定删除这条任务？')) return;
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveState();
    renderCurrentPage();
    showToast('已删除');
  }

  // ===== 渲染灵感页 =====
  function renderInspirations() {
    const filterBar = document.getElementById('inspo-filter');
    if (!filterBar || filterBar.children.length === 0) {
      filterBar.innerHTML = `<button class="filter-btn ${currentInspoFilter === 'all' ? 'active' : ''}" data-filter="all">全部</button>`;
      INSPO_TYPES.forEach(t => {
        filterBar.innerHTML += `<button class="filter-btn ${currentInspoFilter === t.id ? 'active' : ''}" data-filter="${t.id}">${t.name}</button>`;
      });
      filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentInspoFilter = btn.dataset.filter;
          renderInspirations();
        });
      });
    }

    const list = document.getElementById('inspo-list');
    if (!list) return;
    list.innerHTML = '';

    const filtered = currentInspoFilter === 'all'
      ? state.inspirations
      : state.inspirations.filter(i => i.type === currentInspoFilter);

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="empty-state" style="padding:40px 0;">
          <p>还没有灵感素材<br>点击右下角 + 添加</p>
        </div>`;
      return;
    }

    filtered.sort((a, b) => b.createdAt - a.createdAt).forEach(item => {
      const type = INSPO_TYPES.find(t => t.id === item.type) || INSPO_TYPES[0];
      const card = document.createElement('div');
      card.className = 'inspo-card';
      card.dataset.type = item.type;
      card.innerHTML = `
        <div class="inspo-type" style="color:${type.color};">${type.icon} ${type.name}</div>
        <p class="inspo-title">${escapeHtml(item.title)}</p>
        ${item.desc ? `<p class="inspo-desc">${escapeHtml(item.desc)}</p>` : ''}
        <div class="inspo-actions">
          <button class="copy-inspo-btn" data-id="${item.id}">复制</button>
          <button class="del-inspo-btn" data-id="${item.id}">删除</button>
        </div>
      `;
      list.appendChild(card);
    });

    list.querySelectorAll('.copy-inspo-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const item = state.inspirations.find(x => x.id === btn.dataset.id);
        if (item) navigator.clipboard.writeText(`${item.title}\n${item.desc || ''}`).then(() => showToast('已复制'));
      });
    });

    list.querySelectorAll('.del-inspo-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (confirm('确定删除这条灵感？')) {
          state.inspirations = state.inspirations.filter(x => x.id !== btn.dataset.id);
          saveState();
          renderInspirations();
          showToast('已删除');
        }
      });
    });
  }

  // ===== 渲染周周复盘 =====
  function renderWeekly() {
    const container = document.getElementById('weekly-content');
    if (!container) return;

    document.getElementById('weekly-week-label').textContent = weeklyWeek;

    const sections = [
      { key: 'done', label: '✅ 本周完成', placeholder: '这周完成了哪些事？' },
      { key: 'learned', label: '📖 学到了什么', placeholder: '新技能、新认知、新方法……' },
      { key: 'improve', label: '🔧 需要改进', placeholder: '哪些地方可以做得更好？' },
      { key: 'next', label: '🎯 下周计划', placeholder: '下周的重点目标和行动……' }
    ];

    const data = state.weeklies[weeklyWeek] || {};

    container.innerHTML = sections.map(s => `
      <div class="weekly-section">
        <div class="weekly-section-title">${s.label}</div>
        <textarea class="weekly-textarea" data-weekly-key="${s.key}" placeholder="${s.placeholder}" rows="3">${escapeHtml(data[s.key] || '')}</textarea>
      </div>
    `).join('');

    container.querySelectorAll('.weekly-textarea').forEach(ta => {
      ta.addEventListener('input', () => {
        if (!state.weeklies[weeklyWeek]) state.weeklies[weeklyWeek] = {};
        state.weeklies[weeklyWeek][ta.dataset.weeklyKey] = ta.value;
        saveState();
      });
    });
  }

  function changeWeek(delta) {
    const current = weeklyWeek.split(' - ')[0];
    const [m, d] = current.split('/').map(Number);
    const ref = new Date(new Date().getFullYear(), m - 1, d);
    ref.setDate(ref.getDate() + delta * 7);
    weeklyWeek = weekStr(ref);
    renderWeekly();
  }

  // ===== 渲染备忘录 =====
  function renderMemos() {
    const list = document.getElementById('memo-list');
    if (!list) return;
    list.innerHTML = '';

    if (state.memos.length === 0) {
      list.innerHTML = `<div class="empty-state" style="padding:30px 0;"><p>还没有备忘录<br>在上方输入并添加</p></div>`;
      return;
    }

    state.memos.sort((a, b) => b.createdAt - a.createdAt).forEach(m => {
      const card = document.createElement('div');
      card.className = 'memo-card';
      card.innerHTML = `
        <div class="memo-card-header">
          <span class="memo-card-date">${m.date}</span>
          <button class="delete-btn del-memo-btn" data-id="${m.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
        <div class="memo-card-body">${escapeHtml(m.content)}</div>
      `;
      list.appendChild(card);
    });

    list.querySelectorAll('.del-memo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('确定删除这条备忘录？')) {
          state.memos = state.memos.filter(m => m.id !== btn.dataset.id);
          saveState();
          renderMemos();
          showToast('已删除');
        }
      });
    });
  }

  function addMemo() {
    const input = document.getElementById('memo-input');
    const content = input.value.trim();
    if (!content) { showToast('请输入内容'); return; }
    state.memos.push({ id: generateId(), content, date: todayStr(), createdAt: Date.now() });
    saveState();
    input.value = '';
    renderMemos();
    showToast('已保存');
  }

  // ===== 添加表单 =====
  function initAddForm() {
    const boardSelect = document.getElementById('entry-board');
    boardSelect.innerHTML = '';
    TASK_BOARDS.forEach(id => {
      const p = PAGES.find(x => x.id === id);
      boardSelect.add(new Option(`${p.icon} ${p.name}`, id));
    });
    document.getElementById('entry-date').value = todayStr();

    document.querySelectorAll('.add-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.add-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateAddForm(tab.dataset.tab);
      });
    });

    document.getElementById('add-form').addEventListener('submit', e => {
      e.preventDefault();
      const type = document.querySelector('.add-tab.active').dataset.tab;
      const category = document.getElementById('entry-board').value;
      const title = document.getElementById('entry-title').value.trim();
      const desc = document.getElementById('entry-desc').value.trim();
      const date = document.getElementById('entry-date').value || todayStr();

      if (!title) { showToast('请输入标题'); return; }

      if (type === 'task') {
        state.tasks.push({ id: generateId(), boardId: category, title, date, done: false, desc, createdAt: Date.now() });
        saveState();
        e.target.reset();
        document.getElementById('entry-date').value = todayStr();
        showToast('任务已保存');
        navigateTo(category);
      } else {
        state.inspirations.push({ id: generateId(), title, type: category, desc, source: '手动添加', createdAt: Date.now() });
        saveState();
        e.target.reset();
        document.getElementById('entry-date').value = todayStr();
        showToast('灵感已保存');
        navigateTo('inspo');
      }
    });
  }

  function updateAddForm(type) {
    const boardSelect = document.getElementById('entry-board');
    boardSelect.innerHTML = '';
    if (type === 'task') {
      TASK_BOARDS.forEach(id => {
        const p = PAGES.find(x => x.id === id);
        boardSelect.add(new Option(`${p.icon} ${p.name}`, id));
      });
      document.getElementById('date-group').style.display = 'flex';
    } else {
      INSPO_TYPES.forEach(t => boardSelect.add(new Option(`${t.icon} ${t.name}`, t.id)));
      document.getElementById('date-group').style.display = 'none';
    }
  }

  // ===== 导入导出 =====
  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yingying-workbench-${todayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('数据已导出');
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.tasks && data.inspirations) {
          state = data;
          if (!state.memos) state.memos = [];
          if (!state.weeklies) state.weeklies = {};
          saveState();
          renderCurrentPage();
          showToast('数据导入成功');
        } else { throw new Error('格式错误'); }
      } catch (err) { showToast('导入失败：文件格式错误'); }
    };
    reader.readAsText(file);
  }

  // ===== 初始化 =====
  function init() {
    initSidebar();
    initAddForm();

    document.getElementById('fab').addEventListener('click', () => navigateTo('add'));

    document.getElementById('week-prev').addEventListener('click', () => changeWeek(-1));
    document.getElementById('week-next').addEventListener('click', () => changeWeek(1));

    document.getElementById('memo-add-btn').addEventListener('click', addMemo);

    document.getElementById('sync-btn').addEventListener('click', () => {
      const btn = document.getElementById('sync-btn');
      btn.classList.add('syncing');
      showToast('同步完成（本地模式）');
      setTimeout(() => btn.classList.remove('syncing'), 1200);
    });

    document.getElementById('export-btn').addEventListener('click', exportData);
    document.getElementById('import-btn').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', e => {
      if (e.target.files[0]) importData(e.target.files[0]);
      e.target.value = '';
    });
    document.getElementById('clear-btn').addEventListener('click', () => {
      if (confirm('确定清空所有数据？此操作不可恢复。')) {
        state = defaultState();
        saveState();
        renderCurrentPage();
        showToast('数据已清空');
      }
    });

    navigateTo('home');

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/yingying-workbench/sw.js', { scope: '/yingying-workbench/' }).catch(() => {});
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
