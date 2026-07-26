(() => {
  'use strict';

  // ===== 板块配置 =====
  const PAGES = [
    { id: 'home',     name: '影影的工作台', icon: '🏠',  type: 'home',     color: '#8b9d83', bg: '#edf1e9' },
    { id: 'daily',    name: '每日计划',     icon: '☀️',  type: 'task',     color: '#8b9d83', bg: '#edf1e9' },
    { id: 'topic',    name: '选题灵感',     icon: '🔥',  type: 'hub',      color: '#c7a99e', bg: '#f7f0ec' },
    { id: 'inspo',    name: '灵感抓取',     icon: '✨',  type: 'inspo',    color: '#c4a8a2', bg: '#f5eeeb' },
    { id: 'weekly',   name: '周周复盘',     icon: '📋',  type: 'weekly',   color: '#9aa7b0', bg: '#eef1f3' },
    { id: 'english',  name: '英语学习',     icon: '🌿',  type: 'hub',      color: '#b0a4b6', bg: '#f0edf2' },
    { id: 'edit',     name: '剪辑练习',     icon: '🎬',  type: 'hub',      color: '#c7a99e', bg: '#f7f0ec' },
    { id: 'photo',    name: '修图练习',     icon: '🖼️', type: 'hub',      color: '#a3a88b', bg: '#eff1e8' },
    { id: 'settings', name: '设置',         icon: '⚙️',  type: 'settings', color: '#9a9590', bg: '#f7f3ee' }
  ];

  const HUB_PAGES = ['topic', 'english', 'edit', 'photo'];
  const TASK_PAGES = ['daily', 'topic', 'english', 'edit', 'photo'];
  const BOTTOM_NAV = ['home', 'topic', 'add', 'inspo', 'weekly'];

  const INSPO_TYPES = [
    { id: 'quote',   name: '语录金句', icon: '💬', color: '#c4a8a2' },
    { id: 'copy',    name: '文案灵感', icon: '✍️', color: '#9aa7b0' },
    { id: 'visual',  name: '视觉参考', icon: '👁️', color: '#c4b8a8' },
    { id: 'music',   name: '音乐/BGM', icon: '🎵', color: '#a3a88b' },
    { id: 'topic',   name: '爆款选题', icon: '🔥', color: '#c7a99e' },
    { id: 'comment', name: '评论素材', icon: '💭', color: '#b0a4b6' }
  ];

  const PLATFORMS = {
    douyin: { name: '抖音', cls: 'platform-douyin' },
    xiaohongshu: { name: '小红书', cls: 'platform-xiaohongshu' },
    bilibili: { name: 'B站', cls: 'platform-bilibili' },
    other: { name: '其他', cls: 'platform-other' }
  };

  const DOUYIN_KEYWORDS = {
    quote: ['金句', '语录', '名言', '说', '告诉你', '感悟', '道理', '人生', '心态', '格局', '认知', '思维'],
    copy: ['文案', '标题', '脚本', '怎么写', '选题', '爆款', '流量', '涨粉', '运营', '自媒体'],
    visual: ['拍摄', '构图', '画面', '色调', '滤镜', '角度', '镜头', '运镜', '封面', '打光', '布景'],
    music: ['BGM', '背景音乐', '配乐', '音效', '节奏', '卡点', '音乐', '歌曲', '旋律'],
    topic: ['挑战', '趋势', '热门', '跟拍', '二创', '模仿', '新玩法', '教程', '干货'],
    comment: ['评论', '神评', '高赞', '评论区', '网友说', '热评']
  };

  // ===== 推荐视频数据 =====
  const RECOMMENDATIONS = {
    topic: [
      { id: 'rt1', title: '如何用ChatGPT批量生成爆款选题', url: 'https://www.bilibili.com/video/BV1xx411c7uX', platform: 'bilibili', desc: 'AI辅助选题，效率翻10倍', type: 'video' },
      { id: 'rt2', title: '拆解一条500万播放的抖音视频', url: 'https://www.douyin.com', platform: 'douyin', desc: '从选题到剪辑全流程拆解', type: 'video' },
      { id: 'rt3', title: '小红书爆款笔记的7个公式', url: 'https://www.xiaohongshu.com', platform: 'xiaohongshu', desc: '标题+封面+内容结构', type: 'article' }
    ],
    english: [
      { id: 're1', title: '影子跟读法：30天口语蜕变', url: 'https://www.bilibili.com/video/BV1GJ411x7M5', platform: 'bilibili', desc: '每天10分钟跟读练习', type: 'video' },
      { id: 're2', title: 'VOA慢速英语精听训练', url: 'https://www.bilibili.com/video/BV1vJ411x7M6', platform: 'bilibili', desc: '逐句听写，提升听力', type: 'video' },
      { id: 're3', title: '英语vlog博主推荐：轻松学口语', url: 'https://www.xiaohongshu.com', platform: 'xiaohongshu', desc: '日常生活英语，接地气', type: 'article' }
    ],
    edit: [
      { id: 'rd1', title: '剪映专业版0基础到精通', url: 'https://www.bilibili.com/video/BV1GZ4y1H7Ep', platform: 'bilibili', desc: '保姆级教程，从入门到接单', type: 'video' },
      { id: 'rd2', title: '5种高级转场技巧详解', url: 'https://www.bilibili.com/video/BV1a44y1G7dY', platform: 'bilibili', desc: '叠化/缩放/旋转/遮罩/匹配剪辑', type: 'video' },
      { id: 'rd3', title: '爆款短视频节奏分析', url: 'https://www.douyin.com', platform: 'douyin', desc: '前3秒抓人，黄金5秒法则', type: 'video' }
    ],
    photo: [
      { id: 'rp1', title: '莫兰迪色调色全攻略', url: 'https://www.bilibili.com/video/BV1W54y1L7Yy', platform: 'bilibili', desc: '低饱和高级感调色参数', type: 'video' },
      { id: 'rp2', title: '手机修图App推荐+实操', url: 'https://www.xiaohongshu.com', platform: 'xiaohongshu', desc: '醒图/美图秀秀/VSCO对比', type: 'video' },
      { id: 'rp3', title: '构图法则：9种万能构图', url: 'https://www.douyin.com', platform: 'douyin', desc: '三分法/引导线/框架/对称...', type: 'video' }
    ]
  };

  // ===== 工具 =====
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

  function generateId() { return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
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
        if (!s.resources) s.resources = [];
        if (!s.weeklies) s.weeklies = {};
        return s;
      }
    } catch (e) {}
    return defaultState();
  }

  function defaultState() {
    return {
      tasks: [
        { id: 't1', boardId: 'daily', title: '整理今日待办事项', date: todayStr(), done: false, desc: '', createdAt: Date.now() - 5000 },
        { id: 't2', boardId: 'daily', title: '刷抖音收集灵感 20 分钟', date: todayStr(), done: false, desc: '记录金句、好文案、视觉参考', createdAt: Date.now() - 4000 },
        { id: 't3', boardId: 'english', title: '跟读练习 10 分钟', date: todayStr(), done: false, desc: '影子跟读法', createdAt: Date.now() - 3000 },
        { id: 't4', boardId: 'english', title: '精听 VOA 一篇', date: todayStr(), done: false, desc: '做听写练习', createdAt: Date.now() - 2000 },
        { id: 't5', boardId: 'edit', title: '练习转场：叠化 + 缩放', date: todayStr(), done: false, desc: '参考教程第 3 章', createdAt: Date.now() - 1000 },
        { id: 't6', boardId: 'photo', title: '调色练习：莫兰迪风格 3 张', date: todayStr(), done: false, desc: '低饱和 + 暖调', createdAt: Date.now() }
      ],
      inspirations: [
        { id: 'i1', title: '普通人逆袭最好的方式：把一件事重复做一万遍。', type: 'quote', desc: '自律/成长类账号适用', source: '抖音', sourceUrl: '', createdAt: Date.now() },
        { id: 'i2', title: '只会空想，但行动力为 0？恭喜你，你的时代来了！', type: 'copy', desc: '反焦虑/行动力选题', source: '抖音', sourceUrl: '', createdAt: Date.now() - 10000 },
        { id: 'i3', title: '俯拍 45° + 自然光 + 绿植前景', type: 'visual', desc: '适合 vlog 封面', source: '抖音', sourceUrl: '', createdAt: Date.now() - 20000 }
      ],
      resources: [],
      weeklies: {}
    };
  }

  function saveState() {
    try { localStorage.setItem('yingying-workbench', JSON.stringify(state)); }
    catch (e) {}
  }

  // ===== 侧边栏 =====
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const menuBtn = document.getElementById('menu-btn');

    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open'); overlay.classList.add('open');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open'); overlay.classList.remove('open');
    });

    const nav = document.getElementById('sidebar-nav');
    PAGES.filter(p => p.id !== 'settings').forEach(page => {
      const btn = document.createElement('button');
      btn.className = `sidebar-item`;
      btn.dataset.page = page.id;
      btn.innerHTML = `<span class="sidebar-icon">${page.icon}</span><span class="sidebar-label">${page.name}</span>`;
      btn.addEventListener('click', () => {
        navigateTo(page.id);
        sidebar.classList.remove('open'); overlay.classList.remove('open');
      });
      nav.appendChild(btn);
    });

    document.querySelectorAll('.sidebar-footer .sidebar-item').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo(btn.dataset.page);
        sidebar.classList.remove('open'); overlay.classList.remove('open');
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
    const target = document.getElementById(`page-${pageId}`);
    if (target) target.classList.add('active');

    const page = PAGES.find(p => p.id === pageId);
    document.getElementById('topbar-title').textContent = page ? page.name : '影影的工作台';

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navTarget = pageId === 'add' ? 'add' : (BOTTOM_NAV.includes(pageId) ? pageId : null);
    if (navTarget) {
      const navBtn = document.querySelector(`.nav-item[data-nav="${navTarget}"]`);
      if (navBtn) navBtn.classList.add('active');
    }

    updateSidebarActive();
    renderCurrentPage();
  }

  function renderCurrentPage() {
    renderHome();
    renderTaskPage('daily');
    renderHubPage('topic');
    renderHubPage('english');
    renderHubPage('edit');
    renderHubPage('photo');
    renderInspirations();
    renderWeekly();
  }

  // ===== 首页 =====
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
    PAGES.filter(p => ['daily', 'topic', 'inspo', 'english', 'edit', 'photo', 'weekly'].includes(p.id)).forEach(p => {
      const card = document.createElement('div');
      card.className = 'shortcut-card';
      card.innerHTML = `<div class="shortcut-icon" style="background:${p.bg};color:${p.color};">${p.icon}</div><span class="shortcut-text">${p.name}</span>`;
      card.addEventListener('click', () => navigateTo(p.id));
      shortcuts.appendChild(card);
    });
  }

  // ===== 任务列表通用 =====
  function renderTaskPage(boardId) {
    const container = document.getElementById(`${boardId}-tasks`);
    if (!container) return;
    const page = PAGES.find(p => p.id === boardId);
    const tasks = state.tasks.filter(t => t.boardId === boardId && (t.date === todayStr() || !t.date));
    container.innerHTML = '';

    if (tasks.length === 0) {
      container.innerHTML = `<div class="empty-state" style="padding:24px 0;"><p>暂无今日任务<br>点击底部 + 添加</p></div>`;
      return;
    }

    tasks.forEach(task => container.appendChild(createTaskEl(task, page)));
  }

  function createTaskEl(task, page) {
    const div = document.createElement('div');
    div.className = `task-item ${task.done ? 'done' : ''}`;
    div.innerHTML = `
      <div class="task-icon" style="background:${page.bg};color:${page.color};">${page.icon}</div>
      <div class="task-content">
        <p class="task-title">${escapeHtml(task.title)}</p>
        ${task.desc ? `<p class="task-meta">${escapeHtml(task.desc)}</p>` : ''}
      </div>
      <div class="task-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <button class="delete-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
    `;
    div.addEventListener('click', e => { if (!e.target.closest('.delete-btn')) toggleTask(task.id); });
    div.querySelector('.delete-btn').addEventListener('click', e => { e.stopPropagation(); deleteTask(task.id); });
    return div;
  }

  function toggleTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) { task.done = !task.done; saveState(); renderCurrentPage(); showToast(task.done ? '已完成 ✓' : '已取消'); }
  }

  function deleteTask(id) {
    if (!confirm('确定删除？')) return;
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveState(); renderCurrentPage(); showToast('已删除');
  }

  // ===== Hub 板块（选题/英语/剪辑/修图） =====
  function renderHubPage(boardId) {
    const recContainer = document.getElementById(`${boardId}-recommend`);
    const mineContainer = document.getElementById(`${boardId}-mine`);
    const taskContainer = document.getElementById(`${boardId}-tasks`);

    if (!recContainer || !mineContainer) return;

    // 推荐视频
    const recs = RECOMMENDATIONS[boardId] || [];
    recContainer.innerHTML = '';
    recs.forEach(r => recContainer.appendChild(createResourceEl(r, true)));

    // 我的收藏
    const mine = state.resources.filter(r => r.boardId === boardId);
    mineContainer.innerHTML = '';
    if (mine.length === 0) {
      mineContainer.innerHTML = `<div class="empty-state" style="padding:20px 0;"><p style="font-size:13px;">还没有收藏资料<br>点击底部 + 添加视频或图文</p></div>`;
    } else {
      mine.forEach(r => mineContainer.appendChild(createResourceEl(r, false)));
    }

    // 任务
    if (taskContainer) renderTaskPage(boardId);
  }

  function createResourceEl(resource, isRec) {
    const pf = PLATFORMS[resource.platform] || PLATFORMS.other;
    const div = document.createElement('div');
    div.className = `resource-item ${isRec ? 'recommended' : ''}`;
    const typeIcon = resource.type === 'image' ? '🖼️' : resource.type === 'article' ? '📄' : '▶️';

    div.innerHTML = `
      <span class="platform-badge ${pf.cls}">${pf.name}</span>
      <div class="resource-thumb">${typeIcon}</div>
      <div class="resource-info">
        <p class="resource-title">${escapeHtml(resource.title)}</p>
        <p class="resource-desc">${escapeHtml(resource.desc || '')}</p>
      </div>
      ${isRec ? '<span class="rec-badge">推荐</span>' : `
        <div class="resource-actions">
          <button class="open-btn" title="打开链接">🔗</button>
          <button class="del-res-btn" title="删除">🗑</button>
        </div>
      `}
    `;

    div.addEventListener('click', e => {
      if (e.target.closest('.del-res-btn')) {
        e.stopPropagation();
        if (confirm('确定删除？')) {
          state.resources = state.resources.filter(r => r.id !== resource.id);
          saveState(); renderCurrentPage(); showToast('已删除');
        }
        return;
      }
      if (e.target.closest('.open-btn')) return;
      if (resource.url && resource.url.startsWith('http')) {
        window.open(resource.url, '_blank');
      }
    });

    // 推荐也加打开链接
    if (isRec && resource.url) {
      div.addEventListener('click', () => {
        if (resource.url.startsWith('http')) window.open(resource.url, '_blank');
      });
    }

    return div;
  }

  // ===== 灵感抓取 =====
  function initDouyinInput() {
    const input = document.getElementById('douyin-link-input');
    const btn = document.getElementById('douyin-link-btn');
    const resultCard = document.getElementById('douyin-result-card');

    btn.addEventListener('click', () => {
      const url = input.value.trim();
      if (!url) { showToast('请先粘贴链接'); return; }
      showDouyinManualInput(url);
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const url = input.value.trim();
        if (!url) { showToast('请先粘贴链接'); return; }
        showDouyinManualInput(url);
      }
    });
  }

  function showDouyinManualInput(sourceUrl) {
    const resultCard = document.getElementById('douyin-result-card');
    const input = document.getElementById('douyin-link-input');

    resultCard.style.display = 'block';
    resultCard.innerHTML = `
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">
        🔗 链接：<span style="word-break:break-all;color:var(--text);">${escapeHtml(sourceUrl)}</span>
      </div>
      <div style="font-size:14px;font-weight:600;margin-bottom:8px;">📝 粘贴视频中的金句或文案</div>
      <textarea class="form-textarea" id="douyin-manual-content" rows="4" placeholder="把视频里打动你的那句话、那段文案复制到这里..." style="margin-bottom:12px;"></textarea>
      <div class="douyin-result-tags" id="douyin-live-tags" style="margin-bottom:12px;"></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn-primary" id="douyin-analyze-btn" style="flex:1;min-width:100px;">分析并分类</button>
        <button class="btn-secondary" id="douyin-skip-btn" style="flex:1;min-width:80px;">只保存链接</button>
        <button class="btn-secondary" id="douyin-close-btn" style="flex:1;min-width:60px;">取消</button>
      </div>
    `;

    const contentTa = document.getElementById('douyin-manual-content');

    contentTa.addEventListener('input', () => {
      const content = contentTa.value.trim();
      if (content.length > 3) {
        const result = analyzeDouyinContent(content, sourceUrl);
        const ti = INSPO_TYPES.find(t => t.id === result.type) || INSPO_TYPES[0];
        document.getElementById('douyin-live-tags').innerHTML = `
          <span style="font-size:12px;color:var(--text-muted);margin-right:6px;">预测分类：</span>
          <span style="font-size:12px;font-weight:600;color:${ti.color};">${ti.icon} ${ti.name}</span>
          ${result.tags.map(t => `<span class="douyin-result-tag">#${t}</span>`).join('')}
        `;
      } else {
        document.getElementById('douyin-live-tags').innerHTML = '';
      }
    });

    document.getElementById('douyin-analyze-btn').addEventListener('click', () => {
      const content = contentTa.value.trim();
      if (!content || content.length < 5) { showToast('请先粘贴视频中的文案或金句'); return; }
      const result = analyzeDouyinContent(content, sourceUrl);
      showDouyinResult(result);
    });

    document.getElementById('douyin-skip-btn').addEventListener('click', () => {
      state.inspirations.push({
        id: generateId(), title: '待整理灵感', type: 'topic',
        desc: `来源链接：${sourceUrl}`, source: '待分类', sourceUrl, tags: [], createdAt: Date.now()
      });
      saveState(); renderInspirations();
      resultCard.style.display = 'none'; input.value = '';
      showToast('已保存链接（待整理）');
    });

    document.getElementById('douyin-close-btn').addEventListener('click', () => { resultCard.style.display = 'none'; });
  }

  function analyzeDouyinContent(content, sourceUrl) {
    const scores = {};
    for (const [type, keywords] of Object.entries(DOUYIN_KEYWORDS)) {
      scores[type] = keywords.reduce((sum, kw) => sum + (content.includes(kw) ? 1 : 0), 0);
    }
    const bestType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const confidence = bestType[1] > 0 ? Math.min(bestType[1] * 25, 95) : 50;
    const type = bestType[1] > 0 ? bestType[0] : 'quote';
    const title = content.length > 80 ? content.slice(0, 80) + '...' : content;
    const tags = [];
    if (content.includes('文案')) tags.push('文案');
    if (content.includes('选题')) tags.push('选题');
    if (content.includes('拍摄') || content.includes('构图')) tags.push('拍摄技巧');
    if (content.includes('金句') || content.includes('语录')) tags.push('金句');
    if (content.includes('音乐') || content.includes('BGM')) tags.push('音乐');
    if (content.includes('评论')) tags.push('评论');
    return { title, summary: content, type, confidence, tags, sourceUrl };
  }

  function showDouyinResult(result) {
    const resultCard = document.getElementById('douyin-result-card');
    const input = document.getElementById('douyin-link-input');
    const ti = INSPO_TYPES.find(t => t.id === result.type) || INSPO_TYPES[0];

    resultCard.innerHTML = `
      <div class="douyin-result-header">
        <span class="douyin-result-type" style="background:${ti.color}15;color:${ti.color};">${ti.icon} ${ti.name}</span>
        <span class="douyin-result-confidence">匹配度 ${result.confidence}%</span>
      </div>
      <p class="douyin-result-title">${escapeHtml(result.title)}</p>
      <p class="douyin-result-summary">${escapeHtml(result.summary)}</p>
      <div class="douyin-result-tags">${result.tags.map(t => `<span class="douyin-result-tag">#${t}</span>`).join('')}</div>
      <div class="douyin-result-actions">
        <button class="btn-primary" id="douyin-save-btn">保存到灵感库</button>
        <button class="btn-secondary" id="douyin-edit-btn">修改后再保存</button>
        <button class="btn-secondary" id="douyin-back-btn">返回重填</button>
      </div>
    `;

    document.getElementById('douyin-save-btn').addEventListener('click', () => {
      state.inspirations.push({
        id: generateId(), title: result.title, type: result.type,
        desc: result.summary, source: '抖音', sourceUrl: result.sourceUrl,
        tags: result.tags, createdAt: Date.now()
      });
      saveState(); renderInspirations();
      resultCard.style.display = 'none'; input.value = '';
      showToast('灵感已保存 ✓');
    });

    document.getElementById('douyin-edit-btn').addEventListener('click', () => {
      document.querySelectorAll('.add-tab').forEach(t => t.classList.remove('active'));
      document.querySelector('.add-tab[data-tab="inspiration"]').classList.add('active');
      document.getElementById('entry-board').value = result.type;
      document.getElementById('entry-title').value = result.title;
      document.getElementById('entry-desc').value = result.summary;
      resultCard.style.display = 'none'; input.value = '';
      navigateTo('add');
    });

    document.getElementById('douyin-back-btn').addEventListener('click', () => {
      showDouyinManualInput(result.sourceUrl);
    });
  }

  function renderInspirations() {
    const filterBar = document.getElementById('inspo-filter');
    if (!filterBar || filterBar.children.length === 0) {
      filterBar.innerHTML = `<button class="filter-btn ${currentInspoFilter === 'all' ? 'active' : ''}" data-filter="all">全部</button>`;
      INSPO_TYPES.forEach(t => {
        filterBar.innerHTML += `<button class="filter-btn ${currentInspoFilter === t.id ? 'active' : ''}" data-filter="${t.id}">${t.name}</button>`;
      });
      filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => { currentInspoFilter = btn.dataset.filter; renderInspirations(); });
      });
    }

    const list = document.getElementById('inspo-list');
    if (!list) return;
    list.innerHTML = '';

    const filtered = currentInspoFilter === 'all' ? state.inspirations : state.inspirations.filter(i => i.type === currentInspoFilter);

    if (filtered.length === 0) {
      list.innerHTML = `<div class="empty-state" style="padding:30px 0;"><p>还没有灵感素材<br>粘贴链接或点击底部 + 添加</p></div>`;
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
        ${item.tags && item.tags.length ? `<div class="douyin-result-tags" style="margin-bottom:10px;">${item.tags.map(t => `<span class="douyin-result-tag">#${t}</span>`).join('')}</div>` : ''}
        ${item.sourceUrl ? `<p class="inspo-desc" style="font-size:11px;">🔗 <a href="${escapeHtml(item.sourceUrl)}" target="_blank" style="color:var(--text-muted);">查看原链接</a></p>` : ''}
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
        if (confirm('确定删除？')) {
          state.inspirations = state.inspirations.filter(x => x.id !== btn.dataset.id);
          saveState(); renderInspirations(); showToast('已删除');
        }
      });
    });
  }

  // ===== 周周复盘 =====
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

  // ===== 添加表单 =====
  function initAddForm() {
    updateAddForm('task');
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
      const title = document.getElementById('entry-title').value.trim();
      const desc = document.getElementById('entry-desc').value.trim();
      const date = document.getElementById('entry-date').value || todayStr();
      const board = document.getElementById('entry-board').value;

      if (!title) { showToast('请输入标题'); return; }

      if (type === 'task') {
        state.tasks.push({ id: generateId(), boardId: board, title, date, done: false, desc, createdAt: Date.now() });
        saveState();
        e.target.reset();
        document.getElementById('entry-date').value = todayStr();
        showToast('任务已保存');
        navigateTo(board);
      } else if (type === 'resource') {
        const resType = document.getElementById('resource-type').value;
        const platform = document.getElementById('entry-platform').value;
        state.resources.push({ id: generateId(), boardId: board, title, desc, url: desc, type: resType, platform, createdAt: Date.now() });
        saveState();
        e.target.reset();
        document.getElementById('entry-date').value = todayStr();
        showToast('学习资料已保存');
        navigateTo(board);
      } else {
        state.inspirations.push({ id: generateId(), title, type: board, desc, source: '手动添加', sourceUrl: '', createdAt: Date.now() });
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

    document.getElementById('resource-type-group').style.display = type === 'resource' ? 'flex' : 'none';
    document.getElementById('platform-group').style.display = type === 'resource' ? 'flex' : 'none';
    document.getElementById('date-group').style.display = type === 'resource' ? 'none' : 'flex';
    document.getElementById('desc-label').textContent = type === 'resource' ? '链接（视频/图文地址）' : '备注 / 链接 / 详情';

    if (type === 'task') {
      TASK_PAGES.forEach(id => {
        const p = PAGES.find(x => x.id === id);
        boardSelect.add(new Option(`${p.icon} ${p.name}`, id));
      });
    } else if (type === 'resource') {
      HUB_PAGES.forEach(id => {
        const p = PAGES.find(x => x.id === id);
        boardSelect.add(new Option(`${p.icon} ${p.name}`, id));
      });
    } else {
      INSPO_TYPES.forEach(t => boardSelect.add(new Option(`${t.icon} ${t.name}`, t.id)));
    }
  }

  // ===== 导入导出 =====
  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `yingying-workbench-${todayStr()}.json`;
    a.click(); URL.revokeObjectURL(url);
    showToast('数据已导出');
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.tasks && data.inspirations) {
          state = data;
          if (!state.resources) state.resources = [];
          if (!state.weeklies) state.weeklies = {};
          saveState(); renderCurrentPage();
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
    initDouyinInput();

    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.nav));
    });

    document.getElementById('week-prev').addEventListener('click', () => changeWeek(-1));
    document.getElementById('week-next').addEventListener('click', () => changeWeek(1));

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
        saveState(); renderCurrentPage();
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
