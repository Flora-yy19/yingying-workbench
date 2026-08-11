/* 影影的工作台 · 自包含版 app.js
 * 说明：本文件自带样式、数据、逻辑，不依赖 data.js / 原 app.js。
 * 部署方式：用本文件【整段替换】仓库里 js/app.js 的现有内容即可。
 */
(function () {
  'use strict';

  /* ============ 内联样式 ============ */
  var CSS = `
:root{
  --primary:#B99BD8; --primary-d:#a07fc6; --bg:#faf7fc; --card:#ffffff;
  --text:#4a4458; --muted:#9a93a8; --line:#efe9f5; --accent:#ffb4a2;
  --good:#8ec5a3; --warn:#f3c07b; --bad:#ef9a9a; --radius:18px;
  --shadow:0 6px 20px rgba(150,120,190,.12);
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;padding:0}
body{
  font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
  background:linear-gradient(160deg,#faf7fc,#f3ecfa);color:var(--text);
  min-height:100vh;line-height:1.6;
}
.yw-app{max-width:480px;margin:0 auto;min-height:100vh;position:relative;padding-bottom:78px}
.yw-top{position:sticky;top:0;z-index:20;background:rgba(250,247,252,.92);backdrop-filter:blur(8px);
  display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line)}
.yw-top .logo{font-weight:700;font-size:17px;color:var(--primary-d);letter-spacing:1px}
.yw-top .sub{font-size:12px;color:var(--muted);margin-left:auto}
.yw-menu{cursor:pointer;width:34px;height:34px;border-radius:10px;background:var(--card);
  display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow);font-size:18px}
.yw-cover{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:30px;gap:18px}
.yw-cover .stars{font-size:30px;letter-spacing:6px;color:var(--primary)}
.yw-cover h1{font-size:30px;margin:0;letter-spacing:3px;color:var(--primary-d)}
.yw-cover .quote{font-size:15px;color:var(--muted);max-width:300px;min-height:44px}
.yw-btn{background:linear-gradient(135deg,var(--primary),var(--primary-d));color:#fff;border:0;
  border-radius:30px;padding:14px 46px;font-size:17px;font-weight:600;cursor:pointer;
  box-shadow:0 8px 20px rgba(160,127,198,.4);transition:transform .15s}
.yw-btn:active{transform:scale(.96)}
.yw-card{background:var(--card);border-radius:var(--radius);padding:18px;margin:14px 16px;
  box-shadow:var(--shadow)}
.yw-card h2{margin:0 0 4px;font-size:18px;color:var(--primary-d)}
.yw-card .desc{font-size:13px;color:var(--muted);margin:0 0 14px}
.yw-page-title{font-size:20px;font-weight:700;color:var(--primary-d);margin:18px 16px 4px;display:flex;align-items:center;gap:8px}
.yw-row{display:flex;gap:10px;flex-wrap:wrap}
.yw-input,.yw-area,.yw-select{width:100%;border:1px solid var(--line);border-radius:12px;
  padding:11px 13px;font-size:15px;background:#fcfaff;color:var(--text);outline:none;font-family:inherit}
.yw-input:focus,.yw-area:focus{border-color:var(--primary)}
.yw-area{min-height:84px;resize:vertical}
.yw-sm{flex:1;min-width:120px}
.yw-pill{display:inline-block;padding:7px 14px;border-radius:20px;background:#f1ebf8;color:var(--primary-d);
  font-size:13px;cursor:pointer;border:0;margin:4px 4px 0 0}
.yw-pill.on{background:var(--primary);color:#fff}
.yw-list{list-style:none;padding:0;margin:10px 0 0}
.yw-list li{background:#faf6ff;border:1px solid var(--line);border-radius:12px;padding:11px 13px;
  margin-bottom:8px;display:flex;align-items:center;gap:10px;font-size:14px}
.yw-list li .x{margin-left:auto;color:var(--bad);cursor:pointer;font-weight:700}
.yw-list li .ok{color:var(--good);cursor:pointer;font-weight:700}
.yw-tabs{display:flex;gap:8px;overflow-x:auto;padding:4px 16px 0}
.yw-tab{flex:0 0 auto;padding:8px 16px;border-radius:14px;background:var(--card);
  box-shadow:var(--shadow);font-size:14px;cursor:pointer;border:0;color:var(--muted)}
.yw-tab.on{background:var(--primary);color:#fff}
.yw-stat{display:flex;gap:10px;margin:14px 16px}
.yw-stat .b{flex:1;background:var(--card);border-radius:14px;padding:12px;text-align:center;box-shadow:var(--shadow)}
.yw-stat .b .n{font-size:22px;font-weight:700;color:var(--primary-d)}
.yw-stat .b .t{font-size:12px;color:var(--muted)}
.yw-focus{text-align:center;padding:30px 16px}
.yw-focus .t{font-size:64px;font-weight:700;color:var(--primary-d);font-variant-numeric:tabular-nums}
.yw-side{position:fixed;inset:0;z-index:50;display:none}
.yw-side.on{display:block}
.yw-side .mask{position:absolute;inset:0;background:rgba(74,68,88,.4)}
.yw-side .panel{position:absolute;left:0;top:0;bottom:0;width:74%;max-width:320px;background:var(--card);
  padding:24px 16px;overflow:auto;box-shadow:var(--shadow)}
.yw-side .panel h3{color:var(--primary-d);margin:6px 0 16px;font-size:18px}
.yw-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;
  display:flex;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-top:1px solid var(--line);
  z-index:30}
.yw-nav button{flex:1;background:none;border:0;padding:9px 2px;font-size:11px;color:var(--muted);
  display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer}
.yw-nav button .ic{font-size:19px}
.yw-nav button.on{color:var(--primary-d);font-weight:600}
.yw-bottom{height:20px}
.yw-badge{display:inline-flex;align-items:center;gap:6px;background:#f1ebf8;color:var(--primary-d);
  border-radius:20px;padding:6px 12px;font-size:13px;margin:4px}
.yw-toast{position:fixed;left:50%;bottom:96px;transform:translateX(-50%);background:rgba(74,68,88,.92);
  color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;z-index:99;opacity:0;transition:opacity .3s;pointer-events:none}
.yw-toast.on{opacity:1}
.yw-reward{position:fixed;inset:0;z-index:80;display:none;align-items:center;justify-content:center;
  background:rgba(74,68,88,.45)}
.yw-reward.on{display:flex}
.yw-reward .box{background:#fff;border-radius:24px;padding:30px;text-align:center;max-width:300px;
  box-shadow:var(--shadow);animation:pop .4s}
@keyframes pop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}
.yw-reward .em{font-size:54px}
.yw-reward h3{color:var(--primary-d);margin:8px 0}
.yw-canvas{position:fixed;inset:0;pointer-events:none;z-index:90}
.muted{color:var(--muted);font-size:13px}
`;

  /* ============ 数据 ============ */
  var DATA = {
    TOPIC_XHS: [
      '大学生活 vlog｜宿舍改造 100 元搞定', '考研 / 期末复习 一天 vlog', '宿舍好物分享｜平价但好用',
      '一个人也要好好吃饭｜食堂测评', '期末周自律打卡挑战', '大学生副业｜靠技能赚钱',
      '简历 / 实习经验避坑', '图书馆沉浸式学习', '平价穿搭｜学生党 OOTD',
      '宿舍健身｜无器械跟练', '和室友的搞笑日常', '校园恋爱甜甜的小事'
    ],
    TOPIC_DY: [
      '宿舍改造前后对比（卡点）', '考研倒计时碎碎念', '食堂神菜安利', '期末复习沉浸式',
      '平价好物开箱', '校园漫步随手拍', '和朋友的搞笑对话', '一个人吃火锅 vlog',
      '早八人の崩溃瞬间', '宿舍夜聊名场面', '期末周解压方式', '毕业季回忆杀'
    ],
    SENTENCES: [
      '慢慢来，比较快。', '今天也要开开心心。', '你已经做得很棒了。', '允许自己偶尔摆烂。',
      '小事也要好好完成。', '把今天过好就是胜利。', '累了就休息一下吧。', '你比想象中更勇敢。',
      '不必事事完美。', '好好吃饭，好好睡觉。', '进步一点点也是进步。', '对自己温柔一点。',
      '今天的努力会有回响。', '生活明朗，万物可爱。', '慢慢长大，慢慢变好。', '你值得被好好对待。',
      '深呼吸，一切都会好的。', '把时间花在喜欢的事上。', '平凡的一天也值得记录。', '明天又是新的一天。'
    ],
    WORDS: [
      'serene 平静的', 'diligent 勤奋的', 'cozy 舒适的', 'mellow 柔和的', 'resilient 有韧性的',
      'grateful 感激的', 'gentle 温柔的', 'vibrant 充满活力的', 'tranquil 宁静的', 'wholesome 健康的',
      'delight 喜悦', 'routine 日常', 'harvest 收获', 'bloom 绽放', 'spark 火花',
      'cherish 珍惜', 'embrace 拥抱', 'wander 漫步', 'flutter 雀跃', 'nourish 滋养',
      'serendipity 不期而遇的美好', 'solitude 独处', 'candid 真诚的', 'luminous 发光的', 'tiny 微小的',
      'comfort 安慰', 'brave 勇敢', 'calm 冷静', 'hope 希望', 'dream 梦想',
      'moment 此刻', 'warmth 温暖', 'echo 回响', 'dawn 黎明', 'glow 微光',
      'pause 暂停', 'breathe 呼吸', 'shine 闪耀', 'grow 成长', 'rest 休息',
      'smile 微笑', 'trust 信任', 'light 光', 'star 星', 'peace 平和',
      'soft 柔软', 'sweet 甜', 'free 自由', 'kind 善意', 'true 真实',
      'quiet 安静', 'magic 魔法', 'heart 心', 'soul 灵魂', 'rose 玫瑰',
      'cloud 云', 'wind 风', 'rain 雨', 'sun 太阳', 'moon 月',
      'leaf 叶', 'song 歌', 'poem 诗', 'story 故事', 'friend 朋友',
      'home 家', 'path 路', 'time 时间', 'life 生活', 'love 爱'
    ],
    LIT: [
      {t:'诗歌', a:'余秀华', c:'“一个能够升起月亮的身体，必然驮住了无数次的日落。”'},
      {t:'散文', a:'汪曾祺', c:'“四方食事，不过一碗人间烟火。”'},
      {t:'小说', a:'路遥', c:'“其实我们每个人的生活都是一个世界，即使最平凡的人也要为他生活的那个世界而奋斗。”'},
      {t:'诗歌', a:'海子', c:'“面朝大海，春暖花开。”'},
      {t:'散文', a:'朱自清', c:'“热闹是它们的，我什么也没有。”'},
      {t:'小说', a:'毛姆', c:'“要使一个人显出他的本质，叫他承担一种责任是最有效的办法。”'},
      {t:'诗歌', a:'顾城', c:'“黑夜给了我黑色的眼睛，我却用它寻找光明。”'},
      {t:'散文', a:'林清玄', c:'“以清净心看世界，以欢喜心过生活。”'},
      {t:'小说', a:'村上春树', c:'“当你穿过了暴风雨，你就不再是原来那个人。”'},
      {t:'诗歌', a:'北岛', c:'“玻璃晴朗，橘子辉煌。”'},
      {t:'散文', a:'周作人', c:'“我们于日用必需的东西以外，必须还有一点无用的游戏与享乐。”'},
      {t:'小说', a:'杨绛', c:'“你的问题主要在于读书不多而想得太多。”'},
      {t:'诗歌', a:'舒婷', c:'“不怕天涯海角，岂在朝朝夕夕。”'},
      {t:'散文', a:'丰子恺', c:'“不乱于心，不困于情，不畏将来，不念过去。”'},
      {t:'小说', a:'加缪', c:'“在隆冬，我终于知道，我身上有一个不可战胜的夏天。”'},
      {t:'诗歌', a:'席慕蓉', c:'“所有的结局都已写好，所有的泪水也都已启程。”'},
      {t:'散文', a:'梁实秋', c:'“人在有闲的时候才最像是一个人。”'},
      {t:'小说', a:'马尔克斯', c:'“生命中曾经有过的所有灿烂，终究都需要用寂寞来偿还。”'},
      {t:'诗歌', a:'聂鲁达', c:'“我偏爱写诗的荒谬，胜于不写诗的荒谬。”'},
      {t:'散文', a:'林语堂', c:'“人生不过如此，且行且珍惜。”'},
      {t:'小说', a:'钱锺书', c:'“婚姻是一座围城，城外的人想进去，城里的人想出来。”'},
      {t:'诗歌', a:'博尔赫斯', c:'“我给你我的寂寞、我的黑暗、我心的饥渴；我试图用困惑、危险、失败来打动你。”'},
      {t:'散文', a:'木心', c:'“从前的日色变得慢，车、马、邮件都慢，一生只够爱一个人。”'},
      {t:'小说', a:'圣埃克苏佩里', c:'“也许世界上也有五千朵和你一模一样的花，但只有你浇灌的那一朵才属于你。”'},
      {t:'诗歌', a:'叶芝', c:'“多少人爱你青春欢畅的时辰，爱慕你的美丽，假意或真心。”'},
      {t:'散文', a:'梭罗', c:'“我步入丛林，因为我希望生活得有意义。”'},
      {t:'小说', a:'托尔斯泰', c:'“幸福的家庭都是相似的，不幸的家庭各有各的不幸。”'},
      {t:'诗歌', a:'泰戈尔', c:'“世界以痛吻我，要我报之以歌。”'},
      {t:'散文', a:'毕淑敏', c:'“趁着年轻，去见你想见的人，做你想做的事。”'},
      {t:'小说', a:'张爱玲', c:'“于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里。”'},
      {t:'诗歌', a:'徐志摩', c:'“轻轻的我走了，正如我轻轻的来。”'},
      {t:'散文', a:'三毛', c:'“一个人至少拥有一个梦想，有一个理由去坚强。”'},
      {t:'小说', a:'东野圭吾', c:'“有时候，一个人只要好好活着，就足以拯救某人。”'},
      {t:'诗歌', a:'辛波斯卡', c:'“凡是有生命的地方，就有恐惧与怜悯。”'},
      {t:'散文', a:'沈从文', c:'“凡事都有偶然的凑巧，结果却又如宿命的必然。”'},
      {t:'小说', a:'卡勒德·胡赛尼', c:'“为你，千千万万遍。”'},
      {t:'诗歌', a:'拜伦', c:'“若我会见到你，事隔经年。我如何和你招呼，以眼泪，以沉默。”'},
      {t:'散文', a:'川端康成', c:'“美在于发现，在于邂逅，是机缘。”'},
      {t:'小说', a:'东野圭吾', c:'“有时候，一个人只要好好活着，就足以拯救某人。”'},
      {t:'诗歌', a:'席慕蓉', c:'“所有的结局都已写好，所有的泪水也都已启程。”'}
    ],
    EX_TOPICS: [
      '我的周末计划', '今天最开心的一件事', '想对三个月后的自己说', '我的宝藏歌单',
      '最近读到的一句好话', '一道我常做的菜', '我的解压小方法', '我喜欢的电影台词',
      '如果明天放假', '我的小小成就', '想尝试的新事物', '我和好朋友的故事',
      '今晚的月亮', '我家的猫 / 狗', '我的理想房间'
    ],
    MOODS: ['开心', '平静', '疲惫', '焦虑', '委屈', '充实', '孤单', '期待', '无聊', '感恩'],
    REASONS_GOOD: ['完成了计划', '被人肯定', '学到了东西', '和喜欢的人在一起', '休息好了', '吃到了好吃的', '运动了一下', '天气很好'],
    REASONS_BAD: ['任务没做完', '睡太晚', '和人有摩擦', '担心未来', '效率低', '身体不舒服', '想家', '拖延了'],
    MONEY_CATS: {
      out: ['餐饮', '交通', '购物', '学习', '娱乐', '社交', '宿舍', '医疗', '通讯', '其他'],
      in: ['生活费', '兼职', '奖学金', '红包', '稿费', '理财', '其他']
    },
    REWARDS: ['看一集剧', '吃顿好的', '睡个懒觉', '买个小物件', '逛逛街', '打一局游戏', '喝杯奶茶', '敷个面膜', '散个步', '什么都不做'],
    BADGES: [
      {id:'first', em:'🌟', name:'第一步', cond:'完成第一个专注'},
      {id:'focus3', em:'🔥', name:'小有定力', cond:'专注 3 次'},
      {id:'plan', em:'📋', name:'计划达人', cond:'填好每日三件事'},
      {id:'mood', em:'💧', name:'关照情绪', cond:'记录 3 次心情'},
      {id:'money', em:'💰', name:'理财新手', cond:'记账 5 笔'},
      {id:'food', em:'🍰', name:'美食收藏', cond:'存 3 张美食贴纸'},
      {id:'lit', em:'📖', name:'书香', cond:'摘抄 3 句'},
      {id:'streak', em:'🌈', name:'坚持', cond:'连续使用 7 天'}
    ],
    QUOTES: [
      '慢慢来，比较快。', '今天也要开开心心。', '你已经做得很棒了。', '允许自己偶尔摆烂。',
      '把今天过好就是胜利。', '你比想象中更勇敢。', '不必事事完美。', '对自己温柔一点。'
    ],
    INSPO_TYPES: ['抖音', '小红书', '生活', '其他', '评论', '文案']
  };
  window.DATA = DATA;
  var D = DATA;

  /* ============ 工具 ============ */
  var KEY = 'yingying-workbench-v3';
  function def() {
    return {
      tasks: ['', '', ''], todos: [], dones: [], topics: [], inspos: [],
      focus: [], eng: { sentences: [], words: [], spoken: [] },
      moods: [], foods: [], lits: [], money: [], week: {}, quick: [],
      rewards: [], badges: [], streak: {}
    };
  }
  var S = load();
  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY)); if (o && typeof o === 'object') return Object.assign(def(), o); } catch (e) {}
    return def();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function $(s) { return document.querySelector(s); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function money(n) { return (n < 0 ? '-' : '') + '¥' + Math.abs(n).toFixed(2); }
  function weekKey(d) { d = d || new Date(); var t = new Date(d); var day = (t.getDay() + 6) % 7; t.setDate(t.getDate() - day); return t.toISOString().slice(0, 10); }
  function toast(msg) {
    var el = $('#ywToast'); if (!el) { el = document.createElement('div'); el.id = 'ywToast'; el.className = 'yw-toast'; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('on'); }, 1800);
  }
  function compressImage(file, cb) {
    var r = new FileReader();
    r.onload = function () {
      var img = new Image();
      img.onload = function () {
        var w = img.width, h = img.height, max = 720, scale = Math.min(1, max / Math.max(w, h));
        var c = document.createElement('canvas'); c.width = w * scale; c.height = h * scale;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        try { cb(c.toDataURL('image/jpeg', 0.7)); } catch (e) { cb(r.result); }
      };
      img.onerror = function () { cb(r.result); };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  }

  /* ============ 构建外壳 ============ */
  var PAGES = [
    { id: 'plan', name: '每日计划', ic: '☀️' },
    { id: 'todos', name: '今日清单', ic: '📋' },
    { id: 'topics', name: '选题灵感', ic: '🔥' },
    { id: 'inspo', name: '灵感抓取', ic: '🌱' },
    { id: 'focus', name: '专注', ic: '⏳' },
    { id: 'english', name: '英语', ic: '🔤' },
    { id: 'mood', name: '情绪日记', ic: '🫧' },
    { id: 'food', name: '美食日记', ic: '🍰' },
    { id: 'lit', name: '文学', ic: '📖' },
    { id: 'money', name: '记账', ic: '💰' },
    { id: 'week', name: '周周复盘', ic: '🗓' },
    { id: 'quick', name: '快速添加', ic: '✨' },
    { id: 'settings', name: '设置', ic: '⚙️' }
  ];
  var cur = 'plan';

  function boot() {
    // 清理旧的 Service Worker，避免缓存导致新版不生效
    try {
      if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
        navigator.serviceWorker.getRegistrations().then(function (regs) { regs.forEach(function (r) { r.unregister(); }); });
      }
    } catch (e) {}

    var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);

    document.body.innerHTML =
      '<div class="yw-app">' +
        '<div class="yw-top"><div class="yw-menu" id="ywMenu">☰</div>' +
          '<div class="logo">影影的工作台</div><div class="sub" id="ywDate"></div></div>' +
        '<div id="ywView"></div>' +
        '<div class="yw-bottom"></div>' +
      '</div>' +
      '<div class="yw-side" id="ywSide"><div class="mask" id="ywMask"></div>' +
        '<div class="panel"><h3>🧺 全部板块</h3><div id="ywSideList"></div></div></div>' +
      '<div class="yw-nav" id="ywNav"></div>' +
      '<div class="yw-reward" id="ywReward"><div class="box"><div class="em" id="ywRewardEm">🎉</div>' +
        '<h3 id="ywRewardTitle">奖励到手</h3><p class="muted" id="ywRewardText"></p>' +
        '<button class="yw-btn" id="ywRewardOk">好的</button></div></div>' +
      '<canvas class="yw-canvas" id="ywCanvas"></canvas>';

    $('#ywDate').textContent = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' });

    // 侧边栏
    $('#ywSideList').innerHTML = PAGES.map(function (p) {
      return '<div class="yw-pill" data-go="' + p.id + '" style="display:block;width:100%;text-align:left;margin:6px 0">' + p.ic + ' ' + p.name + '</div>';
    }).join('');
    $('#ywSideList').querySelectorAll('[data-go]').forEach(function (el) {
      el.onclick = function () { go(el.getAttribute('data-go')); closeSide(); };
    });
    // 底部导航（取前 5 个常驻）
    var navIds = ['plan', 'focus', 'mood', 'money', 'settings'];
    $('#ywNav').innerHTML = navIds.map(function (id) {
      var p = PAGES.filter(function (x) { return x.id === id; })[0];
      return '<button data-go="' + id + '"><span class="ic">' + p.ic + '</span>' + p.name + '</button>';
    }).join('');
    $('#ywNav').querySelectorAll('[data-go]').forEach(function (el) {
      el.onclick = function () { go(el.getAttribute('data-go')); };
    });

    $('#ywMenu').onclick = openSide;
    $('#ywMask').onclick = closeSide;
    $('#ywRewardOk').onclick = function () { $('#ywReward').classList.remove('on'); };

    showCover();
  }

  function openSide() { $('#ywSide').classList.add('on'); }
  function closeSide() { $('#ywSide').classList.remove('on'); }

  function showCover() {
    var q = D.QUOTES[Math.floor(Math.random() * D.QUOTES.length)];
    $('#ywView').innerHTML =
      '<div class="yw-cover"><div class="stars">✦ ✧ ✦</div>' +
      '<h1>欢 迎</h1><div class="quote">' + esc(q) + '</div>' +
      '<button class="yw-btn" id="ywEnter">进 入</button>' +
      '<div class="muted">今天也要开开心心 ☁️</div></div>';
    $('#ywEnter').onclick = function () {
      var today = weekKey();
      S.streak = S.streak || {};
      if (S.streak.last !== today) {
        S.streak.count = (S.streak.last && weekKey(new Date(S.streak.last + 'T00:00:00')) === weekKey(new Date(Date.now() - 864e5)) ) ? (S.streak.count || 0) + 1 : 1;
        S.streak.last = today; save();
      }
      go('plan');
    };
  }

  function go(id) {
    cur = id;
    var p = PAGES.filter(function (x) { return x.id === id; })[0];
    closeSide();
    Array.prototype.forEach.call(document.querySelectorAll('.yw-nav button'), function (b) {
      b.classList.toggle('on', b.getAttribute('data-go') === id);
    });
    render(id);
  }
  var RENDER = {
    plan: function () {
      $('#ywView').innerHTML =
        '<div class="yw-page-title">☀️ 每日计划</div>' +
        '<p class="muted" style="margin:0 16px">一天做好三件事，就很棒了</p>' +
        '<div class="yw-card" id="planCard"></div>';
      var c = $('#planCard');
      c.innerHTML = '<div id="planList"></div>';
      var list = $('#planList');
      function draw() {
        list.innerHTML = S.tasks.map(function (t, i) {
          return '<input class="yw-input" data-i="' + i + '" value="' + esc(t) + '" placeholder="第 ' + (i + 1) + ' 件事">' +
            (t ? '<span class="x" data-del="' + i + '">✕</span>' : '');
        }).join('');
        list.querySelectorAll('input').forEach(function (inp) {
          inp.oninput = function () { S.tasks[+inp.dataset.i] = inp.value; save(); };
        });
        list.querySelectorAll('.x').forEach(function (x) {
          x.onclick = function () { S.tasks[+x.dataset.del] = ''; save(); draw(); };
        });
      }
      draw();
      if (S.tasks.filter(function (t) { return t; }).length >= 3) award('plan');
    },

    todos: function () {
      $('#ywView').innerHTML =
        '<div class="yw-page-title">📋 今日清单</div>' +
        '<div class="yw-card"><input class="yw-input" id="todoIn" placeholder="添加一件要做的事…">' +
        '<button class="yw-btn yw-sm" style="margin-top:10px" id="todoAdd">添加</button></div>' +
        '<div class="yw-card"><h2>🌙 已完成</h2><ul class="yw-list" id="doneList"></ul>' +
        '<h2 style="margin-top:8px">📋 待办</h2><ul class="yw-list" id="todoList"></ul></div>';
      function draw() {
        $('#todoList').innerHTML = (S.todos.length ? S.todos : []).map(function (t) {
          return '<li><span class="ok" data-ok="' + t.id + '">○</span>' + esc(t.text) + '<span class="x" data-x="' + t.id + '">✕</span></li>';
        }).join('') || '<li class="muted">还没有待办，加一件吧～</li>';
        $('#doneList').innerHTML = (S.dones.length ? S.dones : []).map(function (t) {
          return '<li style="opacity:.6"><span>✔</span>' + esc(t.text) + '<span class="x" data-dx="' + t.id + '">✕</span></li>';
        }).join('') || '<li class="muted">完成后会移到这里</li>';
        bind();
      }
      function bind() {
        $('#todoList').querySelectorAll('[data-ok]').forEach(function (b) {
          b.onclick = function () {
            var i = S.todos.findIndex(function (t) { return t.id === b.dataset.ok; });
            if (i >= 0) { S.dones.unshift(S.todos.splice(i, 1)[0]); save(); draw(); }
          };
        });
        $('#todoList').querySelectorAll('[data-x]').forEach(function (b) {
          b.onclick = function () { S.todos = S.todos.filter(function (t) { return t.id !== b.dataset.x; }); save(); draw(); };
        });
        $('#doneList').querySelectorAll('[data-dx]').forEach(function (b) {
          b.onclick = function () { S.dones = S.dones.filter(function (t) { return t.id !== b.dataset.dx; }); save(); draw(); };
        });
      }
      $('#todoAdd').onclick = function () {
        var v = $('#todoIn').value.trim(); if (!v) return;
        S.todos.push({ id: uid(), text: v }); $('#todoIn').value = ''; save(); draw(); toast('已添加');
      };
      draw();
    },

    topics: function () {
      var tab = 'xhs';
      function draw() {
        var arr = tab === 'xhs' ? D.TOPIC_XHS : D.TOPIC_DY;
        $('#ywView').innerHTML =
          '<div class="yw-page-title">🔥 选题灵感</div>' +
          '<p class="muted" style="margin:0 16px">小红书 · 抖音｜大学生博主能拍的热门选题</p>' +
          '<div class="yw-tabs"><button class="yw-tab ' + (tab === 'xhs' ? 'on' : '') + '" data-t="xhs">📕 小红书</button>' +
          '<button class="yw-tab ' + (tab === 'dy' ? 'on' : '') + '" data-t="dy">🎵 抖音</button>' +
          '<button class="yw-tab ' + (tab === 'fav' ? 'on' : '') + '" data-t="fav">⭐ 我收藏的</button></div>' +
          '<div class="yw-card"><ul class="yw-list" id="topicList"></ul></div>';
        var list = tab === 'fav' ? S.topics : arr;
        $('#topicList').innerHTML = (list.length ? list : []).map(function (t, i) {
          var txt = typeof t === 'string' ? t : t.text; var key = tab === 'fav' ? t.id : ('_' + i);
          return '<li>' + esc(txt) + (tab === 'fav'
            ? '<span class="x" data-rm="' + t.id + '">✕</span>'
            : '<span class="ok" data-fav="' + esc(txt) + '">收藏</span>') + '</li>';
        }).join('') || '<li class="muted">这里还没有内容</li>';
        $('#ywView').querySelectorAll('[data-t]').forEach(function (b) { b.onclick = function () { tab = b.dataset.t; draw(); }; });
        $('#ywView').querySelectorAll('[data-fav]').forEach(function (b) {
          b.onclick = function () { S.topics.push({ id: uid(), text: b.dataset.fav }); save(); toast('已收藏'); draw(); };
        });
        $('#ywView').querySelectorAll('[data-rm]').forEach(function (b) {
          b.onclick = function () { S.topics = S.topics.filter(function (x) { return x.id !== b.dataset.rm; }); save(); draw(); };
        });
      }
      draw();
    },

    inspo: function () {
      $('#ywView').innerHTML =
        '<div class="yw-page-title">🌱 灵感抓取</div>' +
        '<p class="muted" style="margin:0 16px">刷到的金句、文案、评论，随手存下来</p>' +
        '<div class="yw-card"><textarea class="yw-area" id="insIn" placeholder="灵感内容…"></textarea>' +
        '<div class="yw-row" style="margin-top:10px"><select class="yw-select yw-sm" id="insType">' +
        D.INSPO_TYPES.map(function (t) { return '<option>' + t + '</option>'; }).join('') + '</select>' +
        '<button class="yw-btn yw-sm" id="insSave">存下这条灵感</button></div></div>' +
        '<div class="yw-card"><h2>我的灵感库</h2><ul class="yw-list" id="insList"></ul></div>';
      function draw() {
        $('#insList').innerHTML = (S.inspos.length ? S.inspos : []).map(function (t) {
          return '<li><span>[' + esc(t.type) + ']</span> ' + esc(t.text) + '<span class="x" data-x="' + t.id + '">✕</span></li>';
        }).join('') || '<li class="muted">还没有灵感，存一条吧</li>';
        $('#insList').querySelectorAll('[data-x]').forEach(function (b) {
          b.onclick = function () { S.inspos = S.inspos.filter(function (x) { return x.id !== b.dataset.x; }); save(); draw(); };
        });
      }
      $('#insSave').onclick = function () {
        var v = $('#insIn').value.trim(); if (!v) return;
        S.inspos.unshift({ id: uid(), text: v, type: $('#insType').value }); $('#insIn').value = ''; save(); draw(); toast('已保存');
      };
      draw();
    },

    focus: function () {
      var sec = 25 * 60, left = sec, timer = null, running = false;
      $('#ywView').innerHTML =
        '<div class="yw-page-title">⏳ 专注</div>' +
        '<div class="yw-card yw-focus"><div class="t" id="fTime">25:00</div>' +
        '<input class="yw-input" id="fWhat" placeholder="🏷 这次专注做什么" style="margin:14px 0">' +
        '<div class="yw-row" style="justify-content:center">' +
        '<button class="yw-btn" id="fStart">开始专注</button>' +
        '<button class="yw-pill" id="fReset">重置</button></div></div>' +
        '<div class="yw-stat"><div class="b"><div class="n" id="fToday">0</div><div class="t">今日专注</div></div>' +
        '<div class="b"><div class="n" id="fDone">0</div><div class="t">完成次数</div></div>' +
        '<div class="b"><div class="n" id="fHour">0</div><div class="t">累计小时</div></div></div>' +
        '<div class="yw-card"><h2>🏅 我的奖励徽章</h2><div id="badgeBox"></div>' +
        '<h2 style="margin-top:6px">📖 专注记录</h2><ul class="yw-list" id="fList"></ul></div>';
      function fmt(s) { var m = Math.floor(s / 60), ss = s % 60; return (m < 10 ? '0' : '') + m + ':' + (ss < 10 ? '0' : '') + ss; }
      function stats() {
        var today = weekKey(); var td = S.focus.filter(function (f) { return f.day === today; }).length;
        $('#fToday').textContent = td; $('#fDone').textContent = S.focus.length;
        $('#fHour').textContent = (S.focus.reduce(function (a, f) { return a + f.min; }, 0) / 60).toFixed(1);
        $('#badgeBox').innerHTML = D.BADGES.map(function (b) {
          var got = S.badges.indexOf(b.id) >= 0; return '<span class="yw-badge" style="' + (got ? '' : 'opacity:.4') + '">' + b.em + ' ' + b.name + '</span>';
        }).join('');
        $('#fList').innerHTML = (S.focus.length ? S.focus.slice().reverse() : []).map(function (f) {
          return '<li>' + esc(f.what || '专注') + ' · ' + f.min + ' 分钟 <span class="x" data-x="' + f.id + '">✕</span></li>';
        }).join('') || '<li class="muted">还没有专注记录</li>';
        $('#fList').querySelectorAll('[data-x]').forEach(function (b) {
          b.onclick = function () { S.focus = S.focus.filter(function (x) { return x.id !== b.dataset.x; }); save(); stats(); };
        });
      }
      function tick() { left--; $('#fTime').textContent = fmt(left); if (left <= 0) finish(); }
      function finish() {
        clearInterval(timer); running = false; $('#fStart').textContent = '开始专注';
        var rec = { id: uid(), min: sec / 60, what: $('#fWhat').value.trim(), day: weekKey() };
        S.focus.push(rec); save();
        if (S.focus.length >= 1) award('first');
        if (S.focus.length >= 3) award('focus3');
        confetti(); showReward(D.REWARDS[Math.floor(Math.random() * D.REWARDS.length)]);
        left = sec; $('#fTime').textContent = fmt(left); stats();
      }
      $('#fStart').onclick = function () {
        if (running) { clearInterval(timer); running = false; $('#fStart').textContent = '继续'; }
        else { running = true; $('#fStart').textContent = '暂停'; timer = setInterval(tick, 1000); }
      };
      $('#fReset').onclick = function () { clearInterval(timer); running = false; left = sec; $('#fTime').textContent = fmt(left); $('#fStart').textContent = '开始专注'; };
      stats();
    },

    english: function () {
      var tab = 'sentence';
      function draw() {
        var opts = { sentence: ['📮 每日短句', D.SENTENCES, S.eng.sentences, '加入我的短句库'],
          word: ['🔤 单词', D.WORDS, S.eng.words, '加入我的单词本'],
          spoken: ['🎙 口语', ['用英语介绍你的专业', '描述今天的心情', '推荐一家餐厅', '聊一聊周末计划', '说说你的家乡'], S.eng.spoken, '加入我的口语题'] };
        var o = opts[tab];
        $('#ywView').innerHTML =
          '<div class="yw-page-title">🔤 英语</div>' +
          '<div class="yw-tabs">' + Object.keys(opts).map(function (k) {
            return '<button class="yw-tab ' + (tab === k ? 'on' : '') + '" data-t="' + k + '">' + opts[k][0] + '</button>';
          }).join('') + '</div>' +
          '<div class="yw-card"><ul class="yw-list" id="engList"></ul>' +
          '<div class="yw-row" style="margin-top:10px"><input class="yw-input yw-sm" id="engIn" placeholder="我自己加的内容…">' +
          '<button class="yw-btn yw-sm" id="engAdd">' + o[3] + '</button></div></div>';
        var lib = o[1], mine = o[2];
        var items = lib.concat(mine);
        $('#engList').innerHTML = items.map(function (t, i) {
          var txt = typeof t === 'string' ? t : t.text || t.c; var mineIt = i >= lib.length;
          return '<li>' + esc(txt) + (mineIt ? '<span class="x" data-x="' + t.id + '">✕</span>' : '') + '</li>';
        }).join('') || '<li class="muted">空空如也</li>';
        $('#engList').querySelectorAll('[data-x]').forEach(function (b) {
          b.onclick = function () {
            if (tab === 'sentence') S.eng.sentences = S.eng.sentences.filter(function (x) { return x.id !== b.dataset.x; });
            if (tab === 'word') S.eng.words = S.eng.words.filter(function (x) { return x.id !== b.dataset.x; });
            if (tab === 'spoken') S.eng.spoken = S.eng.spoken.filter(function (x) { return x.id !== b.dataset.x; });
            save(); draw();
          };
        });
        $('#engAdd').onclick = function () {
          var v = $('#engIn').value.trim(); if (!v) return;
          var arr = tab === 'sentence' ? S.eng.sentences : tab === 'word' ? S.eng.words : S.eng.spoken;
          arr.push({ id: uid(), text: v }); $('#engIn').value = ''; save(); draw(); toast('已加入');
        };
        $('#ywView').querySelectorAll('[data-t]').forEach(function (b) { b.onclick = function () { tab = b.dataset.t; draw(); }; });
      }
      draw();
    },

    mood: function () {
      var m = '', reason = '';
      function chart() {
        var arr = []; for (var i = 13; i >= 0; i--) { var d = new Date(Date.now() - i * 864e5); arr.push(S.moods.filter(function (x) { return x.day === d.toISOString().slice(0, 10); }).length); }
        var max = Math.max(1, Math.max.apply(null, arr));
        return arr.map(function (n) { return '<div style="flex:1;display:flex;align-items:flex-end;height:42px"><div style="width:100%;background:var(--primary);opacity:' + (0.25 + 0.75 * n / max) + ';height:' + (n / max * 100) + '%;border-radius:4px 4px 0 0"></div></div>'; }).join('');
      }
      function draw() {
        $('#ywView').innerHTML =
          '<div class="yw-page-title">🫧 情绪日记</div>' +
          '<div class="yw-card"><h2>今天的心情</h2><div id="moodPills"></div>' +
          '<h2 style="margin-top:10px">因为什么呢</h2><div id="reasonPills"></div>' +
          '<textarea class="yw-area" id="moodNote" placeholder="还想说点什么…" style="margin-top:10px"></textarea>' +
          '<button class="yw-btn" id="moodSave" style="margin-top:10px">记录今天</button></div>' +
          '<div class="yw-card"><h2>📈 近 14 天心情</h2><div class="yw-row" id="moodChart" style="gap:3px"></div>' +
          '<h2 style="margin-top:10px">🗂 我的心情记录</h2><ul class="yw-list" id="moodList"></ul></div>';
        $('#moodPills').innerHTML = D.MOODS.map(function (x) { return '<button class="yw-pill ' + (m === x ? 'on' : '') + '" data-m="' + x + '">' + x + '</button>'; }).join('');
        $('#reasonPills').innerHTML = D.REASONS_GOOD.concat(D.REASONS_BAD).map(function (x) { return '<button class="yw-pill ' + (reason === x ? 'on' : '') + '" data-r="' + x + '">' + x + '</button>'; }).join('');
        $('#moodChart').innerHTML = chart();
        $('#moodList').innerHTML = (S.moods.length ? S.moods.slice().reverse() : []).map(function (x) {
          return '<li>' + esc(x.mood) + (x.reason ? ' · ' + esc(x.reason) : '') + (x.note ? '：' + esc(x.note) : '') + '<span class="x" data-x="' + x.id + '">✕</span></li>';
        }).join('') || '<li class="muted">还没有记录</li>';
        $('#moodPills').querySelectorAll('[data-m]').forEach(function (b) { b.onclick = function () { m = b.dataset.m; draw(); }; });
        $('#reasonPills').querySelectorAll('[data-r]').forEach(function (b) { b.onclick = function () { reason = b.dataset.r; draw(); }; });
        $('#moodList').querySelectorAll('[data-x]').forEach(function (b) { b.onclick = function () { S.moods = S.moods.filter(function (x) { return x.id !== b.dataset.x; }); save(); draw(); }; });
        $('#moodSave').onclick = function () {
          if (!m) { toast('先选一下心情吧'); return; }
          S.moods.push({ id: uid(), mood: m, reason: reason, note: $('#moodNote').value.trim(), day: new Date().toISOString().slice(0, 10) });
          save(); m = ''; reason = ''; $('#moodNote').value = '';
          if (S.moods.length >= 3) award('mood');
          draw(); toast('已记录 💧');
        };
      }
      draw();
    },

    food: function () {
      $('#ywView').innerHTML =
        '<div class="yw-page-title">🍰 美食日记</div>' +
        '<div class="yw-card"><h2>记一顿好吃的</h2>' +
        '<div id="foodImg" style="border:2px dashed var(--line);border-radius:12px;padding:24px;text-align:center;color:var(--muted);cursor:pointer">🖼️ 点这里拍照 / 选一张图</div>' +
        '<input type="file" accept="image/*" id="foodFile" style="display:none">' +
        '<div class="yw-row" style="margin-top:10px;align-items:center"><span class="muted">好吃程度</span>' +
        '<input type="range" min="1" max="5" value="3" id="foodRate" style="flex:1"><span id="foodRateV">3</span></div>' +
        '<button class="yw-btn" id="foodSave" style="margin-top:10px">做成贴纸卡</button></div>' +
        '<div class="yw-card"><h2>🧷 我的美食贴纸墙</h2><div class="yw-row" id="foodWall"></div></div>';
      function draw() {
        $('#foodWall').innerHTML = (S.foods.length ? S.foods : []).map(function (f) {
          return '<div style="position:relative"><img src="' + f.img + '" style="width:88px;height:88px;object-fit:cover;border-radius:14px;box-shadow:var(--shadow)">' +
            '<div style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,.5);color:#fff;border-radius:10px;padding:0 6px;font-size:11px">' + f.rate + '★</div>' +
            '<div class="x" data-x="' + f.id + '" style="position:absolute;bottom:2px;right:2px;color:#fff;background:rgba(0,0,0,.5);border-radius:10px;padding:0 6px;cursor:pointer">✕</div></div>';
        }).join('') || '<span class="muted">还没有贴纸，拍一张吧</span>';
        $('#foodWall').querySelectorAll('[data-x]').forEach(function (b) { b.onclick = function () { S.foods = S.foods.filter(function (x) { return x.id !== b.dataset.x; }); save(); draw(); }; });
      }
      $('#foodImg').onclick = function () { $('#foodFile').click(); };
      $('#foodFile').onchange = function () {
        var f = this.files[0]; if (!f) return;
        compressImage(f, function (d) { $('#foodImg').innerHTML = '<img src="' + d + '" style="max-width:100%;border-radius:12px">'; $('#foodImg').dataset.img = d; });
      };
      $('#foodRate').oninput = function () { $('#foodRateV').textContent = this.value; };
      $('#foodSave').onclick = function () {
        var img = $('#foodImg').dataset.img; if (!img) { toast('先选一张图'); return; }
        S.foods.push({ id: uid(), img: img, rate: +$('#foodRate').value }); save();
        if (S.foods.length >= 3) award('food');
        $('#foodImg').innerHTML = '🖼️ 点这里拍照 / 选一张图'; delete $('#foodImg').dataset.img;
        draw(); toast('贴纸到手 🍰');
      };
      draw();
    },

    lit: function () {
      var tab = 'all';
      function draw() {
        var types = ['all', '诗歌', '散文', '小说'];
        var list = tab === 'all' ? D.LIT : D.LIT.filter(function (x) { return x.t === tab; });
        $('#ywView').innerHTML =
          '<div class="yw-page-title">📖 文学</div>' +
          '<div class="yw-tabs">' + types.map(function (t) { return '<button class="yw-tab ' + (tab === t ? 'on' : '') + '" data-t="' + t + '">' + (t === 'all' ? '全部' : t) + '</button>'; }).join('') + '</div>' +
          '<div class="yw-card"><ul class="yw-list" id="litList"></ul>' +
          '<p class="muted" style="text-align:center;margin:6px 0">— 换一批 —</p>' +
          '<div class="yw-row" style="margin-top:6px"><input class="yw-input yw-sm" id="litIn" placeholder="✒️ 添加我喜欢的句子"></input>' +
          '<select class="yw-select yw-sm" id="litType"><option>小说</option><option>诗歌</option><option>散文</option><option>其他</option></select>' +
          '<button class="yw-btn yw-sm" id="litAdd">收进我的摘抄本</button></div></div>';
        $('#litList').innerHTML = list.map(function (x, i) {
          return '<li><b>' + esc(x.c) + '</b><br><span class="muted">' + esc(x.a) + ' · ' + esc(x.t) + '</span></li>';
        }).join('') || '<li class="muted">空</li>';
        $('#ywView').querySelectorAll('[data-t]').forEach(function (b) { b.onclick = function () { tab = b.dataset.t; draw(); }; });
        $('#litAdd').onclick = function () {
          var v = $('#litIn').value.trim(); if (!v) return;
          D.LIT.unshift({ t: $('#litType').value, a: '我', c: v });
          S.lits.push({ id: uid(), c: v }); save(); $('#litIn').value = ''; draw(); toast('已摘抄');
        };
        if (S.lits.length >= 3) award('lit');
      }
      draw();
    },

    money: function () {
      function month() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1); }
      function summary() {
        var m = month(); var recs = S.money.filter(function (x) { return (x.day || '').slice(0, 7) === m; });
        var in_ = recs.filter(function (x) { return x.type === 'in'; }).reduce(function (a, x) { return a + x.amt; }, 0);
        var out = recs.filter(function (x) { return x.type === 'out'; }).reduce(function (a, x) { return a + x.amt; }, 0);
        $('#mSum').innerHTML = '<div class="b"><div class="n">' + money(in_ - out) + '</div><div class="t">本月结余</div></div>' +
          '<div class="b"><div class="n">' + in_.toFixed(2) + '</div><div class="t">收入</div></div>' +
          '<div class="b"><div class="n">' + out.toFixed(2) + '</div><div class="t">支出</div></div>';
      }
      $('#ywView').innerHTML =
        '<div class="yw-page-title">💰 记账</div>' +
        '<div class="yw-stat" id="mSum"></div>' +
        '<div class="yw-card"><div class="yw-row">' +
        '<select class="yw-select yw-sm" id="mType"><option value="out">支出</option><option value="in">收入</option></select>' +
        '<select class="yw-select yw-sm" id="mCat"></select></div>' +
        '<input class="yw-input" id="mAmt" placeholder="金额，如 12.5" style="margin-top:10px" inputmode="decimal">' +
        '<input class="yw-input" id="mNote" placeholder="备注（可选）" style="margin-top:10px">' +
        '<button class="yw-btn" id="mSave" style="margin-top:10px">➕ 记一笔</button></div>' +
        '<div class="yw-card"><h2>🧾 本月明细</h2><ul class="yw-list" id="mList"></ul></div>';
      function cats() { $('#mCat').innerHTML = (($('#mType').value === 'in' ? D.MONEY_CATS.in : D.MONEY_CATS.out)).map(function (c) { return '<option>' + c + '</option>'; }).join(''); }
      cats();
      $('#mType').onchange = cats;
      $('#mSave').onclick = function () {
        var amt = parseFloat($('#mAmt').value); if (!(amt > 0)) { toast('金额填一下'); return; }
        S.money.push({ id: uid(), type: $('#mType').value, cat: $('#mCat').value, amt: amt, note: $('#mNote').value.trim(), day: new Date().toISOString().slice(0, 10) });
        $('#mAmt').value = ''; $('#mNote').value = ''; save();
        if (S.money.length >= 5) award('money');
        summary(); drawList();
      };
      function drawList() {
        var m = month();
        $('#mList').innerHTML = (S.money.filter(function (x) { return (x.day || '').slice(0, 7) === m; }).slice().reverse()).map(function (x) {
          return '<li><span style="color:' + (x.type === 'in' ? 'var(--good)' : 'var(--bad)') + '">' + (x.type === 'in' ? '+' : '-') + x.amt.toFixed(2) + '</span> ' +
            esc(x.cat) + (x.note ? ' · ' + esc(x.note) : '') + '<span class="x" data-x="' + x.id + '">✕</span></li>';
        }).join('') || '<li class="muted">这个月还没记账</li>';
        $('#mList').querySelectorAll('[data-x]').forEach(function (b) { b.onclick = function () { S.money = S.money.filter(function (x) { return x.id !== b.dataset.x; }); save(); summary(); drawList(); }; });
      }
      summary(); drawList();
    },

    week: function () {
      var fields = [['good', '🌟 这周做得好的'], ['bad', '🌧 没做好 / 卡住的'], ['learn', '💡 学到了什么'], ['next', '🎯 下周想做到']];
      function draw() {
        $('#ywView').innerHTML = '<div class="yw-page-title">🗓 周周复盘</div>' +
          '<p class="muted" style="margin:0 16px">回头看看这一周，才知道走了多远</p>' +
          '<div class="yw-card" id="weekCard"></div>';
        $('#weekCard').innerHTML = fields.map(function (f) {
          return '<h2>' + f[1] + '</h2><textarea class="yw-area" data-f="' + f[0] + '" placeholder="写点什么…">' + esc(S.week[f[0]] || '') + '</textarea>';
        }).join('') + '<p class="muted" style="text-align:center">内容自动保存 ☁️</p>';
        $('#weekCard').querySelectorAll('textarea').forEach(function (t) {
          t.oninput = function () { S.week[t.dataset.f] = t.value; save(); };
        });
      }
      draw();
    },

    quick: function () {
      $('#ywView').innerHTML =
        '<div class="yw-page-title">✨ 快速添加</div>' +
        '<p class="muted" style="margin:0 16px">想记什么就记什么</p>' +
        '<div class="yw-card"><textarea class="yw-area" id="qIn" placeholder="写点什么…"></textarea>' +
        '<button class="yw-btn" id="qAdd" style="margin-top:10px">记下来</button></div>' +
        '<div class="yw-card"><h2>📝 我的速记</h2><ul class="yw-list" id="qList"></ul></div>';
      function draw() {
        $('#qList').innerHTML = (S.quick.length ? S.quick.slice().reverse() : []).map(function (x) {
          return '<li>' + esc(x.text) + '<span class="x" data-x="' + x.id + '">✕</span></li>';
        }).join('') || '<li class="muted">还没有速记</li>';
        $('#qList').querySelectorAll('[data-x]').forEach(function (b) { b.onclick = function () { S.quick = S.quick.filter(function (x) { return x.id !== b.dataset.x; }); save(); draw(); }; });
      }
      $('#qAdd').onclick = function () {
        var v = $('#qIn').value.trim(); if (!v) return;
        S.quick.push({ id: uid(), text: v }); $('#qIn').value = ''; save(); draw(); toast('已记录');
      };
      draw();
    },

    settings: function () {
      $('#ywView').innerHTML =
        '<div class="yw-page-title">⚙️ 设置</div>' +
        '<div class="yw-card"><h2>📦 数据管理</h2><p class="muted">所有内容保存在本机浏览器。换手机前记得导出备份。</p>' +
        '<div class="yw-row"><button class="yw-btn yw-sm" id="exportBtn">导出备份</button>' +
        '<button class="yw-btn yw-sm" id="importBtn">导入备份</button></div>' +
        '<input type="file" id="importFile" accept="application/json" style="display:none"></div>' +
        '<div class="yw-card"><h2>📱 装到手机桌面</h2><p class="muted">iPhone：Safari 打开 → 底部分享按钮 → 添加到主屏幕<br>安卓：浏览器菜单 → 添加到主屏幕</p></div>' +
        '<div class="yw-card" style="border:1px solid var(--bad)"><h2 style="color:var(--bad)">⚠️ 危险操作</h2>' +
        '<button class="yw-pill" id="clearBtn" style="background:var(--bad);color:#fff">清空所有数据</button></div>';
      $('#exportBtn').onclick = function () {
        var blob = new Blob([JSON.stringify(S)], { type: 'application/json' });
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'yingying-backup.json'; a.click();
        toast('已导出');
      };
      $('#importBtn').onclick = function () { $('#importFile').click(); };
      $('#importFile').onchange = function () {
        var f = this.files[0]; if (!f) return; var r = new FileReader();
        r.onload = function () { try { S = Object.assign(def(), JSON.parse(r.result)); save(); toast('已导入，刷新生效'); } catch (e) { toast('文件格式不对'); } };
        r.readAsText(f);
      };
      $('#clearBtn').onclick = function () {
        if (confirm('确定清空所有数据？此操作不可恢复。')) { S = def(); save(); toast('已清空'); }
      };
    }
  };

  /* ============ 奖励 / 徽章 / 彩带 ============ */
  function award(id) {
    if (S.badges.indexOf(id) < 0) { S.badges.push(id); save(); }
  }
  function showReward(text) {
    $('#ywRewardEm').textContent = '🎉';
    $('#ywRewardTitle').textContent = '奖励到手';
    $('#ywRewardText').textContent = '奖励自己：' + (text || '休息一下');
    $('#ywReward').classList.add('on');
  }
  function confetti() {
    var cv = $('#ywCanvas'); var ctx = cv.getContext('2d');
    cv.width = innerWidth; cv.height = innerHeight;
    var cols = ['#B99BD8', '#ffb4a2', '#8ec5a3', '#f3c07b', '#ef9a9a'];
    var ps = []; for (var i = 0; i < 120; i++) ps.push({ x: Math.random() * cv.width, y: -20 - Math.random() * cv.height, r: 4 + Math.random() * 6, c: cols[i % cols.length], v: 2 + Math.random() * 4, a: Math.random() * 6 });
    var n = 0;
    var t = setInterval(function () {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ps.forEach(function (p) { p.y += p.v; p.x += Math.sin(p.a) * 1; ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); });
      if (++n > 90) { clearInterval(t); ctx.clearRect(0, 0, cv.width, cv.height); }
    }, 30);
  }

  /* ============ 启动 ============ */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})();
