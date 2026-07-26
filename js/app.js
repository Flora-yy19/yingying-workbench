(() => {
  'use strict';

  // ===== 板块配置 =====
  const BOARDS = [
    { id: 'daily',    name: '每日计划', icon: '☀️', color: '#8b9d83', bg: '#edf1e9' },
    { id: 'inspo',    name: '灵感抓取', icon: '✨', color: '#c4a8a2', bg: '#f5eeeb' },
    { id: 'weekly',   name: '周周复盘', icon: '📋', color: '#9aa7b0', bg: '#eef1f3' },
    { id: 'memo',     name: '备忘录',   icon: '📌', color: '#c4b8a8', bg: '#f5f1ea' },
    { id: 'english',  name: '英语学习', icon: '🌿', color: '#b0a4b6', bg: '#f0edf2' },
    { id: 'edit',     name: '剪辑练习', icon: '🎬', color: '#c7a99e', bg: '#f7f0ec' },
    { id: 'photo',    name: '修图练习', icon: '🖼️', color: '#a3a88b', bg: '#eff1e8' }
  ];

  // 灵感素材分类
  const INSPO_TYPES = [
    { id: 'quote',   name: '语录金句', icon: '💬', color: '#c4a8a2' },
    { id: 'copy',    name: '文案灵感', icon: '✍️', color: '#9aa7b0' },
    { id: 'visual',  name: '视觉参考', icon: '👁️', color: '#c4b8a8' },
    { id: 'music',   name: '音乐/BGM', icon: '🎵', color: '#a3a88b' },
    { id: 'topic',   name: '爆款选题', icon: '🔥', color: '#c7a99e' },
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
    const fmt = d => `${d.getMonth() + 1}/${d.getDate()}`;
    return `${fmt(monday)} - ${fmt(sunday)}`;
  }

  function currentWeekStr() {
    return weekStr(new Date());
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
  let currentInspoFilter = 'all';
  let selectedBoard = 'daily';
  let weeklyWeek = currentWeekStr();

  function loadState() {
    try {
      const raw = localStorage.getItem('yingying-workbench');
      if (raw) {
        const s = JSON.parse(raw);
        // 兼容旧数据迁移
        if (!s.weeklies) s.weeklies = {};
        return s;
      }
    } catch (e) { console.warn('读取本地数据失败', e); }
    return defaultState();
  }

  function defaultState() {
    return {
      tasks: [
        { id: 't1', boardId: 'daily', title: '整理今日待办事项', date: todayStr(), done: true, desc: '', createdAt: Date.now() - 5000 },
        { id: 't2', boardId: 'daily', title: '完成灵感收集：刷抖音 20 分钟', date: todayStr(), done: false, desc: '记录金句、好文案、视觉参考', createdAt: Date.now() - 4000 },
        { id: 't3', boardId: 'english', title: '背诵英语单词 20 个', date: todayStr(), done: false, desc: '重点复习昨天错题', createdAt: Date.now() - 3000 },
        { id: 't4', boardId: 'english', title: '精听 VOA 一篇', date: todayStr(), done: false, desc: '做听写练习', createdAt: Date.now() - 2000 },
        { id: 't5', boardId: 'edit', title: '练习转场效果：叠化 + 缩放', date: todayStr(), done: false, desc: '参考教程第 3 章', createdAt: Date.now() - 1000 },
        { id: 't6', boardId: 'photo', title: '调色练习：莫兰迪风格 3 张', date: todayStr(), done: false, desc: '低饱和 + 暖调', createdAt: Date.now() }
      ],
      inspirations: [
        { id: 'i1', title: '普通人逆袭最好的方式：把一件事重复做一万遍。', type: 'quote', desc: '自律/成长类账号适用', source: '抖音', createdAt: Date.now() },
        { id: 'i2', title: '只会空想，但行动力为 0？恭喜你，你的时代来了！', type: 'copy', desc: '反焦虑/行动力选题，搭配 #AI 标签', source: '抖音', createdAt: Date.now() - 10000 },
        { id: 'i3', title: '俯拍 45° + 自然光 + 绿植前景', type: 'visual', desc: '画面干净、生活感强，适合 vlog 封面', source: '抖音', createdAt: Date.now() - 20000 },
        { id: 'i4', title: '治愈系轻音乐《Floating》前 8 秒适合做开头', type: 'music', desc: '情绪舒缓、不抢人声', source: '抖音', createdAt: Date.now() - 30000 },
        { id: 'i5', title: '“为什么你总存不下钱？”——因为钱都在先享受后吃苦里花掉了。', type: 'comment', desc: '理财/生活方式选题可用', source: '抖音', createdAt: Date.now() - 40000 },
        { id: 'i6', title: '5 个万能 pose：靠墙、摸头、插兜、转身、低头', type: 'topic', desc: '可直接做成「拍照姿势合集」', source: '抖音', createdAt: Date.now() - 50000 }
      ],
      weeklies: {}
    };
  }

  function saveState() {
    try { localStorage.setItem('yingying-workbench', JSON.stringify(state)); }
    catch (e) { console.warn('保存失败', e); }
  }

  // ===== 渲染：首页 =====
  function renderHome() {
    const date = new Date();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    document.getElementById('current-date').textContent =
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;

    // 进度环 — 只统计「每日计划」板块
    const dailyTasks = state.tasks.filter(t => t.boardId === 'daily' && (t.date === todayStr() || !t.date));
    const doneCount = dailyTasks.filter(t => t.done).length;
    const total = dailyTasks.length || 1;
    const pct = Math.round((doneCount / total) * 100);
    const circle = document.getElementById('progress-circle');
    circle.setAttribute('stroke-dasharray', `${pct}, 100`);
    document.getElementById('progress-text').textContent = `${pct}%`;

    // 今日任务预览（每日计划 + 其他板块今日任务，取前 5）
    const allToday = state.tasks.filter(t => t.date === todayStr() || !t.date);
    const homeTasks = document.getElementById('home-tasks');
    homeTasks.innerHTML = '';
    const displayTasks = allToday.slice(0, 5);
    if (displayTasks.length === 0) {
      homeTasks.innerHTML = `<div class="empty-state" style="padding:30px 0;"><p>今天还没有任务，点击下方 + 添加吧</p></div>`;
    } else {
      displayTasks.forEach(task => {
        const board = BOARDS.find(b => b.id === task.boardId) || BOARDS[0];
        homeTasks.appendChild(createTaskEl(task, board));
      });
    }

    // 板块卡片
    const boardGrid = document.getElementById('board-grid');
    boardGrid.innerHTML = '';
    BOARDS.forEach(board => {
      const count = state.tasks.filter(t => t.boardId === board.id && (t.date === todayStr() || !t.date)).length;
      const done = state.tasks.filter(t => t.boardId === board.id && t.done && (t.date === todayStr() || !t.date)).length;
      const boardPct = count > 0 ? Math.round((done / count) * 100) : 0;
      const card = document.createElement('div');
      card.className = 'board-card';
      card.innerHTML = `
        <div class="board-card-icon" style="background:${board.bg};color:${board.color};">${board.icon}</div>
        <div class="board-card-title">${board.name}</div>
        <div class="board-card-count">${done}/${count} 完成</div>
        ${count > 0 ? `<div class="board-card-progress"><div class="board-card-progress-bar" style="width:${boardPct}%;background:${board.color};"></div></div>` : ''}
      `;
      card.addEventListener('click', () => {
        selectedBoard = board.id;
        navigateTo('tasks');
      });
      boardGrid.appendChild(card);
    });
  }

  function createTaskEl(task, board) {
    const div = document.createElement('div');
    div.className = `task-item ${task.done ? 'done' : ''}`;
    div.dataset.taskId = task.id;
    div.innerHTML = `
      <div class="task-icon" style="background:${board.bg};color:${board.color};">${board.icon}</div>
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
      renderAll();
      showToast(task.done ? '已完成 ✓' : '已取消');
    }
  }

  function deleteTask(id) {
    if (!confirm('确定删除这条任务？')) return;
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveState();
    renderAll();
    showToast('已删除');
  }

  // ===== 渲染：任务页（按板块查看） =====
  function renderTasks() {
    const boardList = document.getElementById('board-list');
    boardList.innerHTML = '';

    BOARDS.forEach(board => {
      const tasks = state.tasks.filter(t => t.boardId === board.id && (t.date === todayStr() || !t.date));
      const done = tasks.filter(t => t.done).length;
      const total = tasks.length;

      const card = document.createElement('div');
      card.className = `category-card ${selectedBoard === board.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="category-card-icon" style="background:${board.bg};color:${board.color};">${board.icon}</div>
        <div class="category-card-info">
          <h4 class="category-card-title">${board.name}</h4>
          <p class="category-card-count">今日 ${done}/${total} 完成</p>
        </div>
        <div class="category-card-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      `;
      card.addEventListener('click', () => {
        selectedBoard = board.id;
        renderTasks();
      });
      boardList.appendChild(card);
    });

    renderTaskDetail();
  }

  function renderTaskDetail() {
    const area = document.getElementById('task-detail-area');
    const board = BOARDS.find(b => b.id === selectedBoard);
    const tasks = state.tasks.filter(t => t.boardId === selectedBoard && (t.date === todayStr() || !t.date));

    let html = `
      <div class="detail-header">
        <h2>${board.icon} ${board.name}</h2>
        <button class="icon-btn" id="add-task-in-board" style="width:32px;height:32px;background:${board.bg};color:${board.color};" aria-label="添加">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    `;

    if (tasks.length === 0) {
      html += `<div class="detail-empty"><p>该板块暂无今日任务<br>点击 + 添加一个吧</p></div>`;
    } else {
      html += `<div class="detail-task-list">`;
      tasks.forEach(task => {
        html += `
          <div class="task-item ${task.done ? 'done' : ''}" data-task-id="${task.id}">
            <div class="task-icon" style="background:${board.bg};color:${board.color};">${board.icon}</div>
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
          </div>
        `;
      });
      html += `</div>`;
    }

    area.innerHTML = html;

    // 绑定勾选/删除
    tasks.forEach(task => {
      const el = area.querySelector(`[data-task-id="${task.id}"]`);
      if (el) {
        el.addEventListener('click', e => {
          if (!e.target.closest('.delete-btn')) toggleTask(task.id);
        });
        el.querySelector('.delete-btn').addEventListener('click', e => {
          e.stopPropagation();
          deleteTask(task.id);
        });
      }
    });

    const addBtn = document.getElementById('add-task-in-board');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        document.querySelector('input[name="entry-type"][value="task"]').checked = true;
        document.getElementById('entry-board').value = selectedBoard;
        document.querySelectorAll('.add-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.add-tab[data-tab="task"]').classList.add('active');
        updateFormBoard();
        navigateTo('add');
      });
    }
  }

  // ===== 渲染：灵感抓取页 =====
  function renderInspirations() {
    const list = document.getElementById('inspo-list');
    list.innerHTML = '';

    const filtered = currentInspoFilter === 'all'
      ? state.inspirations
      : state.inspirations.filter(i => i.type === currentInspoFilter);

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === currentInspoFilter);
    });

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <p>还没有灵感素材<br>点击下方 + 添加金句、文案或视觉参考</p>
        </div>`;
      return;
    }

    filtered.sort((a, b) => b.createdAt - a.createdAt).forEach(item => {
      const type = INSPO_TYPES.find(t => t.id === item.type) || INSPO_TYPES[0];
      const card = document.createElement('div');
      card.className = 'inspo-card';
      card.dataset.type = item.type;
      card.innerHTML = `
        <div class="inspo-type" style="color:${type.color};">
          ${type.icon} ${type.name}
        </div>
        <p class="inspo-title">${escapeHtml(item.title)}</p>
        ${item.desc ? `<p class="inspo-desc">${escapeHtml(item.desc)}</p>` : ''}
        <div class="inspo-actions">
          <button class="copy-inspo-btn" data-id="${item.id}">📋 复制</button>
          <button class="del-inspo-btn" data-id="${item.id}">🗑 删除</button>
        </div>
      `;
      list.appendChild(card);
    });

    list.querySelectorAll('.copy-inspo-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const item = state.inspirations.find(x => x.id === btn.dataset.id);
        if (item) {
          navigator.clipboard.writeText(`${item.title}\n${item.desc || ''}`).then(() => showToast('已复制'));
        }
      });
    });

    list.querySelectorAll('.del-inspo-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (confirm('确定删除这条灵感？')) {
          state.inspirations = state.inspirations.filter(x => x.id !== btn.dataset.id);
          saveState();
          renderAll();
          showToast('已删除');
        }
      });
    });
  }

  // ===== 渲染：周周复盘页 =====
  function renderWeekly() {
    const container = document.getElementById('weekly-content');
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
        <textarea class="weekly-textarea"
          data-weekly-key="${s.key}"
          placeholder="${s.placeholder}"
          rows="3">${escapeHtml(data[s.key] || '')}</textarea>
      </div>
    `).join('');

    // 自动保存
    container.querySelectorAll('.weekly-textarea').forEach(ta => {
      ta.addEventListener('input', () => {
        if (!state.weeklies[weeklyWeek]) state.weeklies[weeklyWeek] = {};
        state.weeklies[weeklyWeek][ta.dataset.weeklyKey] = ta.value;
        saveState();
      });
    });

    document.getElementById('weekly-week-label').textContent = weeklyWeek;
  }

  function changeWeek(delta) {
    const current = weeklyWeek.split(' - ')[0];
    const [m, d] = current.split('/').map(Number);
    const ref = new Date(new Date().getFullYear(), m - 1, d);
    ref.setDate(ref.getDate() + delta * 7);
    weeklyWeek = weekStr(ref);
    renderWeekly();
  }

  // ===== 添加表单 =====
  function updateFormBoard() {
    const type = document.querySelector('input[name="entry-type"]:checked').value;
    const select = document.getElementById('entry-board');
    select.innerHTML = '';

    if (type === 'task') {
      BOARDS.forEach(b => {
        select.add(new Option(`${b.icon} ${b.name}`, b.id));
      });
      document.getElementById('date-group').style.display = 'flex';
      document.getElementById('board-select-group').style.display = 'flex';
    } else {
      INSPO_TYPES.forEach(t => {
        select.add(new Option(`${t.icon} ${t.name}`, t.id));
      });
      document.getElementById('date-group').style.display = 'none';
      document.getElementById('board-select-group').style.display = 'flex';
    }
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    const type = document.querySelector('input[name="entry-type"]:checked').value;
    const category = document.getElementById('entry-board').value;
    const title = document.getElementById('entry-title').value.trim();
    const desc = document.getElementById('entry-desc').value.trim();
    const date = document.getElementById('entry-date').value || todayStr();

    if (!title) { showToast('请输入标题'); return; }

    if (type === 'task') {
      state.tasks.push({
        id: generateId(),
        boardId: category,
        title, date, done: false, desc,
        createdAt: Date.now()
      });
    } else {
      state.inspirations.push({
        id: generateId(),
        title, type: category, desc,
        source: '手动添加',
        createdAt: Date.now()
      });
    }

    saveState();
    e.target.reset();
    document.getElementById('entry-date').value = todayStr();
    showToast('保存成功');
    navigateTo(type === 'task' ? 'tasks' : 'inspirations');
    renderAll();
  }

  // ===== 导航 =====
  function navigateTo(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.add('active');

    const nav = document.querySelector(`.nav-item[data-nav="${viewId}"]`);
    if (nav) nav.classList.add('active');

    renderAll();
  }

  function renderAll() {
    renderHome();
    renderTasks();
    renderInspirations();
    renderWeekly();
  }

  // ===== 导入/导出 =====
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
          if (!state.weeklies) state.weeklies = {};
          saveState();
          renderAll();
          showToast('数据导入成功');
        } else { throw new Error('格式错误'); }
      } catch (err) { showToast('导入失败：文件格式错误'); }
    };
    reader.readAsText(file);
  }

  // ===== 初始化 =====
  function init() {
    document.getElementById('entry-date').value = todayStr();
    document.getElementById('weekly-week-label').textContent = weeklyWeek;

    // 底部导航
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.nav));
    });

    // 筛选按钮
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentInspoFilter = btn.dataset.filter;
        renderInspirations();
      });
    });

    // 添加页标签
    document.querySelectorAll('.add-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.add-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const val = tab.dataset.tab;
        document.querySelector(`input[name="entry-type"][value="${val}"]`).checked = true;
        updateFormBoard();
      });
    });

    document.querySelectorAll('input[name="entry-type"]').forEach(radio => {
      radio.addEventListener('change', updateFormBoard);
    });

    document.getElementById('add-form').addEventListener('submit', handleAddSubmit);

    // 周周复盘 周切换
    document.getElementById('week-prev').addEventListener('click', () => changeWeek(-1));
    document.getElementById('week-next').addEventListener('click', () => changeWeek(1));

    // 同步按钮
    document.getElementById('sync-btn').addEventListener('click', () => {
      const btn = document.getElementById('sync-btn');
      btn.style.animation = 'spin 1s linear infinite';
      showToast('同步完成（本地模式）');
      setTimeout(() => { btn.style.animation = ''; }, 1200);
    });

    // 导入导出
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
        renderAll();
        showToast('数据已清空');
      }
    });

    updateFormBoard();
    renderAll();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
