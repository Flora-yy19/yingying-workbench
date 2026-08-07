/* ==========================================================
   影影的工作台 · 内容库
   （选题 / 四级短句 / 单词 / 文学金句 / 表达话题）
   ========================================================== */
window.DATA = (function () {

  /* ---------- 小红书热门选题（大学生博主向） ---------- */
  const TOPIC_XHS = [
    { t: '大学生一周伙食费挑战', d: '记录一周三餐花了多少钱，配食堂窗口实拍。真实感强，评论区容易炸。', tags: ['省钱', '日常', '食堂'], heat: 98,
      how: '开头直接抛数字「一周只花了 XX 元」，中间按天铺，结尾算总账 + 心得。' },
    { t: '我的宿舍改造前后对比', d: '几十块钱把桌面/床帘/收纳改一遍，前后对比图冲击力强。', tags: ['宿舍', '改造', '好物'], heat: 95,
      how: '首图必须放 before/after 拼图，正文写清每样东西多少钱、哪里买。' },
    { t: '期末速通｜我是怎么两周捡回一学期的', d: '复习方法 + 时间表 + 真实成绩，期末季必爆。', tags: ['学习', '期末', '干货'], heat: 94,
      how: '给出可复制的时间表，配笔记实拍，标题带具体天数。' },
    { t: '一个人也能做的周末 city walk', d: '本地小众路线，地图 + 拍照点位 + 花费。', tags: ['旅行', '本地', '独处'], heat: 90,
      how: '路线图做成一张图，每个点位配一张出片照，结尾写总花费。' },
    { t: '大学生适合的兼职有哪些（真实踩坑）', d: '家教、探店、剪辑…讲清单价、耗时、坑在哪。', tags: ['兼职', '副业', '避雷'], heat: 92,
      how: '用表格式排版，一项一项对比时薪和门槛，真实感最重要。' },
    { t: '我的每日 plan 是怎么写的', d: '手帐 / 电子清单实拍，附模板。', tags: ['自律', '效率', '模板'], heat: 88,
      how: '结尾放可下载模板，能大量涨收藏。' },
    { t: '开学季｜这些东西真的别买', d: '反向种草，避雷向内容比推荐更容易火。', tags: ['开学', '避雷', '清单'], heat: 89,
      how: '每样东西写清「为什么不推荐」，语气可以毒舌一点。' },
    { t: '普通女生变好看的 10 个小习惯', d: '低成本变美，不涉及整容和贵妇产品。', tags: ['变美', '习惯', '自律'], heat: 93,
      how: '每条一句话讲完，配九宫格，别写成长篇。' },
    { t: '英语四级 425 → 550 我做对了什么', d: '备考路径 + 资料 + 时间投入。', tags: ['四级', '英语', '备考'], heat: 91,
      how: '前后分数截图是可信度关键，资料整理成清单。' },
    { t: '我的手机里那些相见恨晚的 App', d: '效率、学习、修图类 App 合集。', tags: ['App', '效率', '工具'], heat: 86,
      how: '一张图放全部图标，正文分类讲，收藏率极高。' },
    { t: '在图书馆待一整天是什么体验', d: 'vlog 式图文，从早到晚的时间线。', tags: ['学习', 'vlog', '日常'], heat: 84,
      how: '用时间点做小标题，中间穿插吃了什么、状态怎么样。' },
    { t: '给学妹的大一避坑指南', d: '选课、社团、人际、消费四个方面。', tags: ['大一', '经验', '干货'], heat: 87,
      how: '分点写，每点给一句「过来人结论」。' }
  ];

  /* ---------- 抖音热门选题 ---------- */
  const TOPIC_DY = [
    { t: '「大学生的一天」快剪 vlog', d: '早八到熄灯，卡点快剪 30-45 秒，节奏是关键。', tags: ['vlog', '快剪', '日常'], heat: 97,
      how: '前 3 秒必须放最出片的一个画面，全程卡鼓点，字幕要大。' },
    { t: '宿舍好物一镜到底', d: '手机一镜扫过桌面，边走边介绍。', tags: ['好物', '宿舍', '一镜到底'], heat: 93,
      how: '不要停顿，语速快，最后一句留钩子「还有一个我藏起来了」。' },
    { t: '我妈打电话问我在干嘛系列', d: '情景反差剧，学生党共鸣极强。', tags: ['剧情', '搞笑', '共鸣'], heat: 95,
      how: '反差要够大，时长控制在 20 秒内。' },
    { t: '花 XX 元在学校门口吃到饱', d: '探店挑战，价格越低越有看点。', tags: ['探店', '美食', '挑战'], heat: 96,
      how: '标题带具体数字，中途实时报剩余金额。' },
    { t: '自习室 4 小时 timelapse', d: '延时摄影 + 学习白噪音，治愈系。', tags: ['学习', '延时', '治愈'], heat: 88,
      how: '固定机位，加进度条字幕，配轻音乐。' },
    { t: '突然被点名回答问题的 100 种反应', d: '夸张表演类，模板化容易复制。', tags: ['搞笑', '表演', '校园'], heat: 90,
      how: '每种反应 2 秒，快切，结尾放最离谱的。' },
    { t: '我的四级备考桌面', d: '空镜 + 手写 + 翻书声，ASMR 感。', tags: ['学习', 'ASMR', '四级'], heat: 85,
      how: '收音要干净，画面构图整洁，不用出镜。' },
    { t: '穷学生版「精致生活」', d: '低成本复刻网红生活方式，反差幽默。', tags: ['反差', '搞笑', '省钱'], heat: 92,
      how: '左右分屏对比「网红版 vs 我的版」。' },
    { t: '大学四年我踩过的坑', d: '口播类，一条一句，语速快。', tags: ['口播', '经验', '干货'], heat: 89,
      how: '正对镜头，背景干净，每句话配一行大字幕。' },
    { t: '收到成绩那一刻的表情管理', d: '强情绪画面，完播率高。', tags: ['情绪', '搞笑', '考试'], heat: 91,
      how: '前面铺垫紧张感，最后一秒反转。' },
    { t: '一个人吃饭的第 N 天', d: '慢节奏治愈向，配文案字幕。', tags: ['治愈', '独处', '美食'], heat: 83,
      how: '画面稳、色调统一，文案要戳心。' },
    { t: '学生党化妆前后（不磨皮）', d: '真实向变美内容，信任度高。', tags: ['变美', '化妆', '真实'], heat: 87,
      how: '强调不开美颜，前后同机位同光线。' }
  ];

  /* ---------- 四级每日短句 ---------- */
  const SENTENCES = [
    { en: 'Every accomplishment starts with the decision to try.', cn: '每一项成就都始于决定尝试的那一刻。', note: 'accomplishment n. 成就；start with 以…开始。四级写作万能开头句。' },
    { en: 'The best preparation for tomorrow is doing your best today.', cn: '为明天做的最好准备，就是今天全力以赴。', note: 'preparation for 对…的准备；do one\'s best 尽全力。' },
    { en: 'Success is the sum of small efforts repeated day in and day out.', cn: '成功是日复一日小努力的总和。', note: 'the sum of …的总和；day in and day out 日复一日（高频短语）。' },
    { en: 'It is not enough to be busy; the question is what we are busy about.', cn: '光是忙碌还不够，问题在于我们在忙什么。', note: 'It is not enough to do sth. 做某事还不够，四级作文常用句型。' },
    { en: 'What we learn with pleasure we never forget.', cn: '带着愉悦学到的东西，永远不会忘记。', note: 'what 引导主语从句，写作提分句型。' },
    { en: 'Difficulties strengthen the mind, as labor does the body.', cn: '困难磨炼心智，正如劳动锻炼身体。', note: 'as 引导比较状语从句，注意省略结构。' },
    { en: 'The future depends on what you do today.', cn: '未来取决于你今天做了什么。', note: 'depend on 取决于（四级高频动词短语）。' },
    { en: 'Nothing is impossible to a willing heart.', cn: '心之所愿，无所不成。', note: 'be impossible to sb. 对某人来说不可能；willing adj. 愿意的。' },
    { en: 'Learning is a treasure that will follow its owner everywhere.', cn: '学识是能伴随主人四处而行的珍宝。', note: 'treasure n. 珍宝；that 引导定语从句。' },
    { en: 'You miss 100% of the shots you don\'t take.', cn: '你不出手，就会错失全部机会。', note: 'miss v. 错过；take a shot 尝试一次。' },
    { en: 'Time you enjoy wasting is not wasted time.', cn: '你享受浪费的时间，就不算浪费。', note: '定语从句省略 that；waste 的动名词用法。' },
    { en: 'Small steps every day add up to big results.', cn: '每天一小步，累积成大成果。', note: 'add up to 加起来等于/累积成（四级高频短语动词）。' },
    { en: 'A comfort zone is a beautiful place, but nothing ever grows there.', cn: '舒适区很美好，但那里长不出任何东西。', note: 'comfort zone 舒适区，写作素材词。' },
    { en: 'Believe you can and you are halfway there.', cn: '相信自己能做到，你就已经成功了一半。', note: 'halfway adv. 到一半；祈使句 + and + 陈述句结构。' },
    { en: 'The only way to do great work is to love what you do.', cn: '做出伟大成就的唯一方法，就是热爱你所做的事。', note: 'The only way to do sth. is to… 四级作文经典句型。' },
    { en: 'Knowledge makes humble; ignorance makes proud.', cn: '知识令人谦逊，无知使人骄傲。', note: 'humble adj. 谦逊的；ignorance n. 无知。对比结构。' },
    { en: 'Do not wait for opportunity; create it.', cn: '不要等待机会，要创造机会。', note: 'wait for 等待；祈使句否定形式。' },
    { en: 'Persistence guarantees that results are inevitable.', cn: '坚持能保证结果必然到来。', note: 'persistence n. 坚持；inevitable adj. 不可避免的（四级词汇）。' },
    { en: 'The expert in anything was once a beginner.', cn: '任何领域的专家都曾是初学者。', note: 'expert in 在…方面的专家；once adv. 曾经。' },
    { en: 'Focus on being productive instead of busy.', cn: '专注于高效，而不是忙碌。', note: 'focus on 专注于；instead of 而不是。' }
  ];

  /* ---------- 四级核心词 ---------- */
  const WORDS = [
    { w: 'abandon', p: '/əˈbændən/', m: 'v. 放弃；抛弃' },
    { w: 'absorb', p: '/əbˈsɔːrb/', m: 'v. 吸收；理解' },
    { w: 'academic', p: '/ˌækəˈdemɪk/', m: 'adj. 学术的' },
    { w: 'accompany', p: '/əˈkʌmpəni/', m: 'v. 陪伴；伴随' },
    { w: 'accurate', p: '/ˈækjərət/', m: 'adj. 精确的' },
    { w: 'achieve', p: '/əˈtʃiːv/', m: 'v. 实现；达到' },
    { w: 'acquire', p: '/əˈkwaɪər/', m: 'v. 获得；习得' },
    { w: 'adapt', p: '/əˈdæpt/', m: 'v. 适应；改编' },
    { w: 'adequate', p: '/ˈædɪkwət/', m: 'adj. 足够的' },
    { w: 'adjust', p: '/əˈdʒʌst/', m: 'v. 调整；适应' },
    { w: 'advantage', p: '/ədˈvæntɪdʒ/', m: 'n. 优势；好处' },
    { w: 'affect', p: '/əˈfekt/', m: 'v. 影响' },
    { w: 'ambitious', p: '/æmˈbɪʃəs/', m: 'adj. 有雄心的' },
    { w: 'analyze', p: '/ˈænəlaɪz/', m: 'v. 分析' },
    { w: 'anxiety', p: '/æŋˈzaɪəti/', m: 'n. 焦虑' },
    { w: 'appreciate', p: '/əˈpriːʃieɪt/', m: 'v. 欣赏；感激' },
    { w: 'approach', p: '/əˈproʊtʃ/', m: 'n. 方法 v. 接近' },
    { w: 'appropriate', p: '/əˈproʊpriət/', m: 'adj. 恰当的' },
    { w: 'assume', p: '/əˈsuːm/', m: 'v. 假定；承担' },
    { w: 'attitude', p: '/ˈætɪtuːd/', m: 'n. 态度' },
    { w: 'available', p: '/əˈveɪləbl/', m: 'adj. 可获得的' },
    { w: 'benefit', p: '/ˈbenɪfɪt/', m: 'n./v. 益处；受益' },
    { w: 'capacity', p: '/kəˈpæsəti/', m: 'n. 容量；能力' },
    { w: 'challenge', p: '/ˈtʃælɪndʒ/', m: 'n./v. 挑战' },
    { w: 'circumstance', p: '/ˈsɜːrkəmstæns/', m: 'n. 情况；环境' },
    { w: 'commit', p: '/kəˈmɪt/', m: 'v. 承诺；犯（错）' },
    { w: 'compete', p: '/kəmˈpiːt/', m: 'v. 竞争' },
    { w: 'complex', p: '/kəmˈpleks/', m: 'adj. 复杂的' },
    { w: 'concentrate', p: '/ˈkɑːnsntreɪt/', m: 'v. 集中；专心' },
    { w: 'confidence', p: '/ˈkɑːnfɪdəns/', m: 'n. 信心' },
    { w: 'consequence', p: '/ˈkɑːnsɪkwens/', m: 'n. 后果' },
    { w: 'considerable', p: '/kənˈsɪdərəbl/', m: 'adj. 相当大的' },
    { w: 'contribute', p: '/kənˈtrɪbjuːt/', m: 'v. 贡献；促成' },
    { w: 'convince', p: '/kənˈvɪns/', m: 'v. 说服；使信服' },
    { w: 'crucial', p: '/ˈkruːʃl/', m: 'adj. 至关重要的' },
    { w: 'decline', p: '/dɪˈklaɪn/', m: 'v./n. 下降；婉拒' },
    { w: 'dedicate', p: '/ˈdedɪkeɪt/', m: 'v. 致力于；奉献' },
    { w: 'demonstrate', p: '/ˈdemənstreɪt/', m: 'v. 证明；演示' },
    { w: 'distinguish', p: '/dɪˈstɪŋɡwɪʃ/', m: 'v. 区分' },
    { w: 'efficient', p: '/ɪˈfɪʃnt/', m: 'adj. 高效的' },
    { w: 'eliminate', p: '/ɪˈlɪmɪneɪt/', m: 'v. 消除；淘汰' },
    { w: 'emphasize', p: '/ˈemfəsaɪz/', m: 'v. 强调' },
    { w: 'encounter', p: '/ɪnˈkaʊntər/', m: 'v./n. 遭遇' },
    { w: 'essential', p: '/ɪˈsenʃl/', m: 'adj. 必要的' },
    { w: 'establish', p: '/ɪˈstæblɪʃ/', m: 'v. 建立' },
    { w: 'evaluate', p: '/ɪˈvæljueɪt/', m: 'v. 评估' },
    { w: 'evidence', p: '/ˈevɪdəns/', m: 'n. 证据' },
    { w: 'expose', p: '/ɪkˈspoʊz/', m: 'v. 暴露；使接触' },
    { w: 'flexible', p: '/ˈfleksəbl/', m: 'adj. 灵活的' },
    { w: 'fundamental', p: '/ˌfʌndəˈmentl/', m: 'adj. 基本的' },
    { w: 'generate', p: '/ˈdʒenəreɪt/', m: 'v. 产生' },
    { w: 'guarantee', p: '/ˌɡærənˈtiː/', m: 'v./n. 保证' },
    { w: 'identify', p: '/aɪˈdentɪfaɪ/', m: 'v. 识别；确认' },
    { w: 'impact', p: '/ˈɪmpækt/', m: 'n. 影响；冲击' },
    { w: 'implement', p: '/ˈɪmplɪment/', m: 'v. 实施' },
    { w: 'indicate', p: '/ˈɪndɪkeɪt/', m: 'v. 表明' },
    { w: 'inevitable', p: '/ɪnˈevɪtəbl/', m: 'adj. 不可避免的' },
    { w: 'initiative', p: '/ɪˈnɪʃətɪv/', m: 'n. 主动性；倡议' },
    { w: 'maintain', p: '/meɪnˈteɪn/', m: 'v. 维持；主张' },
    { w: 'motivate', p: '/ˈmoʊtɪveɪt/', m: 'v. 激励' },
    { w: 'obtain', p: '/əbˈteɪn/', m: 'v. 获得' },
    { w: 'obvious', p: '/ˈɑːbviəs/', m: 'adj. 明显的' },
    { w: 'participate', p: '/pɑːrˈtɪsɪpeɪt/', m: 'v. 参与' },
    { w: 'perspective', p: '/pərˈspektɪv/', m: 'n. 视角；观点' },
    { w: 'potential', p: '/pəˈtenʃl/', m: 'n./adj. 潜力；潜在的' },
    { w: 'previous', p: '/ˈpriːviəs/', m: 'adj. 先前的' },
    { w: 'priority', p: '/praɪˈɔːrəti/', m: 'n. 优先事项' },
    { w: 'reluctant', p: '/rɪˈlʌktənt/', m: 'adj. 不情愿的' },
    { w: 'reveal', p: '/rɪˈviːl/', m: 'v. 揭示' },
    { w: 'significant', p: '/sɪɡˈnɪfɪkənt/', m: 'adj. 显著的' },
    { w: 'strategy', p: '/ˈstrætədʒi/', m: 'n. 策略' },
    { w: 'sufficient', p: '/səˈfɪʃnt/', m: 'adj. 充足的' },
    { w: 'tendency', p: '/ˈtendənsi/', m: 'n. 趋势；倾向' },
    { w: 'transform', p: '/trænsˈfɔːrm/', m: 'v. 转变' },
    { w: 'urgent', p: '/ˈɜːrdʒənt/', m: 'adj. 紧急的' },
    { w: 'virtual', p: '/ˈvɜːrtʃuəl/', m: 'adj. 虚拟的' },
    { w: 'vital', p: '/ˈvaɪtl/', m: 'adj. 至关重要的' }
  ];

  /* ---------- 文学金句 ---------- */
  const LIT = [
    { q: '愿你在被打击时，记起你的珍贵，抵抗恶意；愿你在迷茫时，坚信你的珍贵，爱你所爱，行你所行，听从你心，无问西东。', b: '无问西东', a: '李芳芳', c: 'other' },
    { q: '你要做一个不动声色的大人了。不准情绪化，不准偷偷想念，不准回头看。去过自己另外的生活。', b: '玛格丽特小镇', a: '加布瑞埃拉·泽文', c: 'novel' },
    { q: '生活明朗，万物可爱，人间值得，未来可期。', b: '人间值得', a: '中村恒子', c: 'prose' },
    { q: '每个人都是一个月亮，总有一个阴暗面从来不让人看见。', b: '赤道航行记', a: '马克·吐温', c: 'novel' },
    { q: '我们都是虫，但我确实觉得，我是一只萤火虫。', b: '丘吉尔演讲集', a: '丘吉尔', c: 'prose' },
    { q: '人的一生可能燃烧也可能腐朽，我不能腐朽，我愿意燃烧起来！', b: '钢铁是怎样炼成的', a: '奥斯特洛夫斯基', c: 'novel' },
    { q: '面包会有的，牛奶也会有的，一切都会有的。', b: '列宁在1918', a: '苏联电影台词', c: 'other' },
    { q: '希望是本无所谓有，无所谓无的。这正如地上的路；其实地上本没有路，走的人多了，也便成了路。', b: '故乡', a: '鲁迅', c: 'prose' },
    { q: '愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话。', b: '热风', a: '鲁迅', c: 'prose' },
    { q: '我们一生的种种努力，无非是为了周遭的人对我们满意。', b: '沉思录', a: '马可·奥勒留', c: 'prose' },
    { q: '你若要喜爱你自己的价值，你就得给世界创造价值。', b: '歌德谈话录', a: '歌德', c: 'prose' },
    { q: '生如夏花之绚烂，死如秋叶之静美。', b: '飞鸟集', a: '泰戈尔', c: 'poem' },
    { q: '世界以痛吻我，要我报之以歌。', b: '飞鸟集', a: '泰戈尔', c: 'poem' },
    { q: '黑夜给了我黑色的眼睛，我却用它寻找光明。', b: '一代人', a: '顾城', c: 'poem' },
    { q: '从明天起，做一个幸福的人，喂马、劈柴，周游世界。', b: '面朝大海，春暖花开', a: '海子', c: 'poem' },
    { q: '我如果爱你，绝不像攀援的凌霄花，借你的高枝炫耀自己。', b: '致橡树', a: '舒婷', c: 'poem' },
    { q: '轻轻的我走了，正如我轻轻的来；我挥一挥衣袖，不带走一片云彩。', b: '再别康桥', a: '徐志摩', c: 'poem' },
    { q: '你站在桥上看风景，看风景的人在楼上看你。', b: '断章', a: '卞之琳', c: 'poem' },
    { q: '所有的日子，所有的日子都来吧，让我编织你们，用青春的金线，和幸福的璎珞。', b: '生活是多么广阔', a: '何其芳', c: 'poem' },
    { q: '大地上的事情，是永远也说不完的。', b: '大地上的事情', a: '苇岸', c: 'prose' },
    { q: '一个人只要不再想要，就什么都可以放下。', b: '半生缘', a: '张爱玲', c: 'novel' },
    { q: '于千万人之中遇见你所要遇见的人，于千万年之中，时间的无涯的荒野里，没有早一步，也没有晚一步。', b: '爱', a: '张爱玲', c: 'prose' },
    { q: '人是为了活着本身而活着，而不是为了活着之外的任何事物而活着。', b: '活着', a: '余华', c: 'novel' },
    { q: '没有一个冬天不可逾越，没有一个春天不会来临。', b: '西西弗神话', a: '加缪', c: 'prose' },
    { q: '在隆冬，我终于知道，我身上有一个不可战胜的夏天。', b: '夏天集', a: '加缪', c: 'prose' },
    { q: '所有伟大的行动和思想，都有一个微不足道的开始。', b: '西西弗神话', a: '加缪', c: 'prose' },
    { q: '生命中曾经有过的所有灿烂，终究都需要用寂寞来偿还。', b: '百年孤独', a: '加西亚·马尔克斯', c: 'novel' },
    { q: '过去都是假的，回忆是一条没有归途的路。', b: '百年孤独', a: '加西亚·马尔克斯', c: 'novel' },
    { q: '你什么时候放下，什么时候就没有烦恼。', b: '瓦尔登湖', a: '梭罗', c: 'prose' },
    { q: '我步入丛林，因为我希望生活得有意义，我希望活得深刻，吸取生命中所有的精华。', b: '瓦尔登湖', a: '梭罗', c: 'prose' },
    { q: '如果你想造一艘船，先不要雇人去收集木头，而是要激起他们对大海的向往。', b: '小王子', a: '圣埃克苏佩里', c: 'novel' },
    { q: '你在你的玫瑰花身上耗费的时间，使得你的玫瑰花变得如此重要。', b: '小王子', a: '圣埃克苏佩里', c: 'novel' },
    { q: '每个人都是一座孤岛，但每座孤岛下面，都连着同一片海底。', b: '岛上书店', a: '加布瑞埃拉·泽文', c: 'novel' },
    { q: '当你真心渴望某样东西时，整个宇宙都会联合起来帮助你完成。', b: '牧羊少年奇幻之旅', a: '保罗·柯艾略', c: 'novel' },
    { q: '一个人的命运，当然要靠自我奋斗，但是也要考虑到历史的进程。', b: '回忆录', a: '－', c: 'other' },
    { q: '我们最容易忽略的，往往是我们已经拥有的。', b: '追风筝的人', a: '卡勒德·胡赛尼', c: 'novel' },
    { q: '为你，千千万万遍。', b: '追风筝的人', a: '卡勒德·胡赛尼', c: 'novel' },
    { q: '人生如逆旅，我亦是行人。', b: '临江仙', a: '苏轼', c: 'poem' },
    { q: '莫听穿林打叶声，何妨吟啸且徐行。', b: '定风波', a: '苏轼', c: 'poem' },
    { q: '路漫漫其修远兮，吾将上下而求索。', b: '离骚', a: '屈原', c: 'poem' }
  ];

  /* ---------- 表达力话题 ---------- */
  const EX_TOPICS = [
    { q: '如果要用三个词形容现在的自己，你会选哪三个？为什么？', h: '先给结论（三个词），再各配一件具体的事。' },
    { q: '最近让你觉得「值得」的一笔花销是什么？', h: '讲清花了多少、买了什么、为什么值得，最后给一个判断标准。' },
    { q: '你怎么看「大学生要不要做兼职」这件事？', h: '先亮观点，再给两个理由 + 一个反方情况，最后收结论。' },
    { q: '向没来过你学校的人介绍你的学校，你会怎么说？', h: '用一个比喻开场，选三个最有代表性的点，别面面俱到。' },
    { q: '描述一个让你印象最深的陌生人。', h: '写外貌不如写细节动作，结尾点出这件事对你的影响。' },
    { q: '你觉得「自律」到底是什么？', h: '先反驳一个常见误解，再给出你的定义，配自己的例子。' },
    { q: '如果给一年前的自己发一条消息，你会说什么？', h: '控制在三句话内，第一句要有冲击力。' },
    { q: '推荐一部你会二刷的作品，说服别人去看。', h: '不要剧透，讲它让你产生的感受，给一个具体的画面。' },
    { q: '你怎么处理「和朋友观点不合」的情况？', h: '给方法而不是给态度，最好能举一个真实回合。' },
    { q: '最近一次「坚持下来」的经历是什么？', h: '交代难点在哪、什么时候最想放弃、靠什么撑过来。' },
    { q: '你觉得什么样的生活算「过得不错」？', h: '避免空话，用三个可观察的标准来定义。' },
    { q: '如果让你做一期视频给同龄人打气，你的开场白是什么？', h: '开场白要短、要具体、要能引起对号入座。' },
    { q: '讲讲一件你「后来才明白」的事。', h: '按当时怎么想 → 发生了什么 → 现在怎么想来铺。' },
    { q: '你最想改掉自己的哪个习惯？打算怎么改？', h: '说清触发场景，给一个可执行的替代动作。' },
    { q: '如果只能带三样东西去一个陌生城市生活一个月，你带什么？', h: '每样东西给一个非功能性的理由，会更有意思。' }
  ];

  /* ---------- 情绪选项 ---------- */
  const MOODS = [
    { k: 'great', e: '🥰', l: '超开心', v: 5 },
    { k: 'good',  e: '😊', l: '还不错', v: 4 },
    { k: 'flat',  e: '😐', l: '平平的', v: 3 },
    { k: 'tired', e: '🥱', l: '好累呀', v: 2.5 },
    { k: 'sad',   e: '🥺', l: '很难过', v: 1.5 },
    { k: 'anx',   e: '😰', l: '好焦虑', v: 1.5 },
    { k: 'angry', e: '😤', l: '有点气', v: 2 },
    { k: 'calm',  e: '🍃', l: '很平静', v: 4 },
    { k: 'proud', e: '✨', l: '有成就', v: 5 },
    { k: 'lost',  e: '🌫', l: '有点迷', v: 2 }
  ];

  const REASONS_GOOD = ['被夸了', '任务完成', '吃到好吃的', '睡饱了', '和朋友玩', '天气很好', '看了好剧', '收到钱了', '运动了', '进步了'];
  const REASONS_BAD  = ['没睡好', '作业太多', '考试压力', '和人闹别扭', '拖延了', '身体不舒服', '花超了', '被否定', '太孤单', '计划泡汤'];

  /* ---------- 记账分类 ---------- */
  const MONEY_CATS = {
    out: [
      { k: 'food',  e: '🍜', l: '吃饭',   c: '#E9B7C4' },
      { k: 'drink', e: '🧋', l: '奶茶咖啡', c: '#D9BCA8' },
      { k: 'study', e: '📚', l: '学习',   c: '#B4C9E8' },
      { k: 'daily', e: '🧴', l: '日用',   c: '#C7DCC9' },
      { k: 'cloth', e: '👗', l: '穿搭',   c: '#D8C0E4' },
      { k: 'trip',  e: '🚇', l: '交通',   c: '#A9C8D8' },
      { k: 'fun',   e: '🎡', l: '娱乐',   c: '#F0CFA0' },
      { k: 'beauty',e: '💄', l: '美妆',   c: '#EFB8C0' },
      { k: 'health',e: '💊', l: '医疗',   c: '#B8D8C8' },
      { k: 'other_o',e: '📦', l: '其他',  c: '#CFC6DA' }
    ],
    in: [
      { k: 'tutor', e: '🧑‍🏫', l: '家教', c: '#A8CFC0' },
      { k: 'part',  e: '💼', l: '兼职',   c: '#B5CBE6' },
      { k: 'living',e: '🏠', l: '生活费', c: '#E0C9A8' },
      { k: 'scholar',e: '🏆', l: '奖学金', c: '#F0D69B' },
      { k: 'gift',  e: '🎁', l: '红包',   c: '#EFB9C3' },
      { k: 'sell',  e: '🛍', l: '闲置',   c: '#C3C9E8' },
      { k: 'other_i',e: '✨', l: '其他',  c: '#CFC6DA' }
    ]
  };

  /* ---------- 专注奖励 ---------- */
  const REWARDS = [
    { e: '🌟', t: '你真棒！', s: '刚刚那段时间，你只属于自己。' },
    { e: '🎉', t: '太厉害了！', s: '又一次说到做到，这就是了不起。' },
    { e: '🍀', t: '真的很棒！', s: '专注的样子，比任何滤镜都好看。' },
    { e: '🌸', t: '你做到了！', s: '一点一点来，你已经走了很远。' },
    { e: '🧁', t: '给你比心！', s: '奖励自己一小块蛋糕吧，值得的。' },
    { e: '🐰', t: '棒棒的！', s: '今天的你，比昨天更靠近想去的地方。' },
    { e: '☁️', t: '完成啦！', s: '深呼吸，你已经把这件事做完了。' },
    { e: '🏆', t: '厉害！', s: '专注是种能力，你正在越练越强。' },
    { e: '🌈', t: '好样的！', s: '别小看这几十分钟，它们会攒成大事。' },
    { e: '🍓', t: '超级棒！', s: '你值得为刚刚的自己骄傲一下。' }
  ];

  const BADGES = [
    { n: 1,  e: '🌱', l: '第一次' },
    { n: 5,  e: '🌿', l: '5 次' },
    { n: 10, e: '🍀', l: '10 次' },
    { n: 20, e: '🌸', l: '20 次' },
    { n: 30, e: '🌻', l: '30 次' },
    { n: 50, e: '🏆', l: '50 次' },
    { n: 80, e: '💎', l: '80 次' },
    { n: 120,e: '👑', l: '120 次' }
  ];

  const QUOTES = [
    '慢慢来，比较快 ☁️',
    '今天也要好好吃饭呀 🍚',
    '你已经比昨天更好了 ✨',
    '不着急，一件一件来 🌿',
    '做不完也没关系的 🫧',
    '你值得被自己温柔对待 🌸',
    '每一步都算数 🐾',
    '今天也辛苦啦 🍵'
  ];

  const INSPO_TYPES = [
    { k: 'quote',   e: '💬', l: '金句' },
    { k: 'copy',    e: '✍️', l: '文案' },
    { k: 'comment', e: '🗯', l: '神评论' },
    { k: 'idea',    e: '💡', l: '想法' },
    { k: 'style',   e: '🎨', l: '画面风格' },
    { k: 'other',   e: '🔖', l: '其他' }
  ];

  return { TOPIC_XHS, TOPIC_DY, SENTENCES, WORDS, LIT, EX_TOPICS, MOODS,
           REASONS_GOOD, REASONS_BAD, MONEY_CATS, REWARDS, BADGES, QUOTES, INSPO_TYPES };
})();
