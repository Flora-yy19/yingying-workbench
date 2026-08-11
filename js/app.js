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
      {t:'散文', a:'梭罗', c:'“我步入丛林，因为我希望生活得有意义���”'},
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
    // 底部导航（取前 5 个常驻）
    var navIds = ['plan', 'focus', 'mood', 'money', 'settings'];
    $('#ywNav').innerHTML = navIds.map(function (id) {
      var p = PAGES.filter(function (x) { return x.id === id; })[0];
      return '<button data-go="' + id + '"><span class="ic">' + p.ic + '</span>' + p.name + '</button>';
    }).join('');

    document.body.addEventListener('click', function (e) {
      var t = e.target.closest('[data-go]');
      if (t) { go(t.getAttribute('data-go')); closeSide(); return; }
      if (e.target.id === 'ywMenu') { openSide(); return; }
      if (e.target.id === 'ywMask') { closeSide(); return; }
      if (e.target.id === 'ywRewardOk') { $('#ywReward').classList.remove('on'); return; }
    });

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

  return { TOPIC_XHS, TOPIC_DY, SENTENCES, WORDS, LIT, EX_TOPICS, MOODS,
           REASONS_GOOD, REASONS_BAD, MONEY_CATS, REWARDS, BADGES, QUOTES, INSPO_TYPES };
})();
