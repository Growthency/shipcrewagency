import type { BlogPost } from "@/lib/blog-types";

// Publish-ready seed articles for Ship Crew Agency (环球船员管理).
// Six articles, each written in English and Simplified Chinese.
// The en/zh pair of an article shares the same slug; the site filters by language.

export const blogSeed: BlogPost[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. How Ship Crew Manning Works — EN
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-en-1",
    language: "en",
    title: "How Ship Crew Manning Works: The Complete Guide",
    slug: "how-ship-crew-manning-works",
    excerpt:
      "From crew matrix planning to embarkation, this complete guide explains how a professional manning agency sources, vets and rotates qualified seafarers for the global fleet.",
    content: `
<p>Behind every vessel that sails on schedule is an invisible logistics operation: the sourcing, vetting, certifying and rotating of the people who run it. <strong>Ship crew manning</strong> — sometimes called crewing or crew management — is the discipline of putting the right qualified seafarer in the right rank on the right ship at the right time, and doing it in full compliance with international law. This guide walks shipowners, fleet managers and superintendents through how a modern manning agency actually works.</p>

<h2>What a manning agency does</h2>
<p>A manning agency is the bridge between two worlds that rarely meet directly: the shipowner who needs labour and the seafarer who supplies it. The owner sets the technical and commercial requirements; the seafarer brings the certificates, sea time and competence. The agency's job is to match them, document everything, and carry the administrative and regulatory burden so the vessel keeps trading.</p>
<p>In practice the agency owns the full lifecycle: building a candidate pool, verifying credentials, conducting interviews, arranging medicals, booking flights and visas, managing the sign-on and sign-off, and keeping records that will survive a flag-state audit or a port state control inspection years later.</p>

<h2>The crew matrix: the blueprint of every fleet</h2>
<p>Everything begins with the <strong>crew matrix</strong> — the manning scale that defines, rank by rank, exactly who must be aboard a given vessel. It is driven by three forces working together:</p>
<ul>
  <li><strong>The flag state's Minimum Safe Manning Document (MSMD)</strong>, which sets the legal floor for how many crew, and of which certificates of competency, a ship must carry to operate safely.</li>
  <li><strong>The owner's operational standard</strong>, which often exceeds the legal minimum for safety, maintenance or charterer requirements.</li>
  <li><strong>The vessel type and trade</strong> — a chemical tanker, a container feeder, a heavy-lift project carrier and an FPSO each demand very different competence profiles.</li>
</ul>
<p>From the matrix the agency derives a rotation plan. Seafarers do not work indefinitely; they serve a contract (a "tour of duty") and then go home on leave while a reliever takes their place. A well-run crewing desk is forecasting reliefs months ahead, not scrambling the week a contract ends.</p>

<blockquote>A vessel is only as compliant as its weakest certificate. One expired endorsement can detain a ship — and a detention costs far more than the salary of the officer who should have replaced him.</blockquote>

<h2>Sourcing qualified seafarers</h2>
<p>Quality manning is fundamentally about the pipeline. Agencies maintain databases of pre-screened officers and ratings, build relationships with maritime academies, and run referral networks among trusted senior crew. The strongest agencies are deeply rooted in the major supply nations — the Philippines, India, China, Indonesia, Ukraine and Eastern Europe — where the bulk of the world's seafarers are trained.</p>
<p>But a name in a database is not a hire. Every candidate must be matched against the specific vessel: a Master who has commanded Aframax tankers is not automatically the right fit for a LNG carrier, and a rating with passenger-ship experience may need additional training for a bulk carrier's deck.</p>

<h3>The vetting process</h3>
<p>Vetting is where a serious agency earns its fee. A complete check covers:</p>
<ol>
  <li><strong>Certificates of Competency (CoC)</strong> and STCW endorsements — verified against the issuing administration, not just photocopied.</li>
  <li><strong>Sea service records and discharge books</strong> confirming the rank, vessel type and tonnage actually served.</li>
  <li><strong>The ENG1 (or equivalent) medical fitness certificate</strong>, proving the seafarer is fit for the demands of life at sea.</li>
  <li><strong>References from previous employers</strong> and, increasingly, database checks for past performance or disciplinary issues.</li>
  <li><strong>Specialised training</strong> where the trade demands it — tanker familiarisation, BOSIET and HUET for offshore postings, dangerous-goods handling, and so on.</li>
</ol>

<h2>From offer to embarkation</h2>
<p>Once a candidate is approved, the logistics phase begins, and this is where many crew changes fail. The agency must align several moving parts so they all converge on a single port on a single date:</p>
<ul>
  <li>A signed Seafarer Employment Agreement (SEA) that complies with MLC 2006.</li>
  <li>Valid travel documents — passport, seaman's book, and any transit or joining visas.</li>
  <li>Flights routed to a port the vessel will actually reach, accounting for schedule slippage.</li>
  <li>A port agent at the joining port to handle gangway formalities and immigration.</li>
  <li>A briefing so the joining seafarer arrives knowing the vessel, the role and the handover.</li>
</ul>
<p>The reverse process — sign-off — must run in parallel so the off-signer can go home without leaving the ship short-handed for even a single watch.</p>

<h2>Compliance is not optional</h2>
<p>Manning sits inside a dense regulatory framework. The <strong>STCW Convention</strong> governs training and certification standards worldwide. <strong>MLC 2006</strong> — often called the "seafarers' bill of rights" — sets minimum standards for contracts, wages, hours of rest, accommodation and repatriation. The flag state enforces these through inspections and the MSMD, while <strong>port state control</strong> regimes such as the Paris and Tokyo MOUs can board any visiting vessel and detain it for deficiencies. A manning agency that treats compliance as paperwork rather than as the core of the service is a liability waiting to surface.</p>

<h2>Why owners outsource crewing</h2>
<p>Building an in-house crewing department for a small or mid-sized fleet rarely pays off. The hidden costs are enormous: 24/7 coverage across time zones, recruitment networks in multiple countries, certificate-tracking systems, travel desks, and the institutional knowledge to read a discharge book and spot a forged endorsement. A specialised manning agency spreads those costs across many clients and brings hard-won expertise that an occasional hirer simply cannot match.</p>
<p>Done well, manning is invisible: the vessel is always crewed, always compliant, never detained, and never delayed for want of a single qualified officer. That quiet reliability — not glossy marketing — is the real product of a professional crew manning service.</p>
`,
    featured_image: null,
    category: "Guide",
    tag: "Guide",
    read_time: "9 min read",
    status: "published",
    author_name: "Ship Crew Agency",
    author_role: "Maritime Editorial Team",
    meta_title: "How Ship Crew Manning Works: The Complete Guide",
    meta_description:
      "A complete guide to ship crew manning: crew matrix planning, STCW and MLC compliance, seafarer vetting, and crew change logistics for the global fleet.",
    views: 3120,
    created_at: "2026-01-18T09:00:00.000Z",
    published_at: "2026-01-18T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 1. How Ship Crew Manning Works — ZH
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-zh-1",
    language: "zh",
    title: "船员配备如何运作：完整指南",
    slug: "how-ship-crew-manning-works",
    excerpt:
      "从船员配员矩阵规划到上船登轮，本指南完整讲解专业船员管理公司如何为全球船队甄选、审核与轮换合格船员。",
    content: `
<p>每一艘准点起航的船舶背后，都有一套看不见的物流运作：为驾驭船舶的人员进行甄选、审核、办证与轮换。<strong>船员配备</strong>（manning，也称配员或船员管理）是一门专业——把合适的合格船员，按正确的职级，在正确的时间送上正确的船舶，并且全程符合国际法规。本指南将带领船东、船队经理与船舶监督，了解现代船员管理公司的实际运作方式。</p>

<h2>船员管理公司做什么</h2>
<p>船员管理公司是两个鲜少直接相遇的世界之间的桥梁：需要劳动力的船东，与提供劳动力的船员。船东设定技术与商务要求，船员带来证书、海上资历与适任能力。公司的职责是将两者匹配、记录全部资料，并承担行政与监管负担，让船舶持续营运。</p>
<p>实务中，公司掌管完整的生命周期：建立候选人储备、核验资历、安排面试、安排体检、订机票办签证、管理上下船，并保存可在数年后经受船旗国审核或港口国监督检查的记录。</p>

<h2>配员矩阵：每支船队的蓝图</h2>
<p>一切始于<strong>配员矩阵</strong>（crew matrix）——逐一职级界定某艘船舶上必须配备何人的配员表。它由三股力量共同驱动：</p>
<ul>
  <li><strong>船旗国的最低安全配员证书（MSMD）</strong>，规定船舶安全营运所需的最少船员人数及其适任证书种类，是法律底线。</li>
  <li><strong>船东的运营标准</strong>，出于安全、维护或租家要求，往往高于法定最低配员。</li>
  <li><strong>船舶类型与航线</strong>——化学品船、集装箱支线船、重吊项目货船与 FPSO，所需的适任能力组合截然不同。</li>
</ul>
<p>公司据此推导出轮换计划。船员不会无限期工作，而是履行一份合同（一个"上船任期"），随后回家休假，由替班人员接替。运作良好的配员部门会提前数月预测换班，而不是在合同到期那一周才手忙脚乱。</p>

<blockquote>一艘船的合规程度，取决于其最薄弱的那一张证书。一张过期的签证签注就足以滞留船舶——而一次滞留的代价，远高于那名本应被替换的高级船员的薪资。</blockquote>

<h2>甄选合格船员</h2>
<p>优质配员的根本在于人才管道。公司维护经预先筛选的高级船员与普通船员数据库，与海事院校建立合作，并在受信任的资深船员之间运作推荐网络。最强的公司深植于主要劳务输出国——菲律宾、印度、中国、印尼、乌克兰与东欧，世界上大多数船员都在这些地方接受培训。</p>
<p>但数据库中的一个名字并不等于一次录用。每位候选人都必须与具体船舶相匹配：指挥过 Aframax 油轮的船长，不会自动适合 LNG 运输船；具备客船经验的普通船员，登上散货船甲板可能仍需额外培训。</p>

<h3>审核流程</h3>
<p>审核是认真负责的公司体现其价值之处。一次完整的核查涵盖：</p>
<ol>
  <li><strong>适任证书（CoC）</strong>与 STCW 签注——向签发主管机关核验，而非仅仅复印。</li>
  <li><strong>海上资历记录与海员服务簿</strong>，确认实际担任过的职级、船型与吨位。</li>
  <li><strong>ENG1（或同等）健康适任证书</strong>，证明船员能胜任海上生活的体力要求。</li>
  <li><strong>前雇主推荐</strong>，并日益普遍地对以往表现或纪律问题进行数据库核查。</li>
  <li><strong>专项培训</strong>，视航线需要而定——油轮熟悉培训、海上岗位的 BOSIET 与 HUET、危险品操作等。</li>
</ol>

<h2>从录用到登轮</h2>
<p>候选人获批后，物流阶段随即开始，许多换班正是在这一环节失败。公司必须协调多个变动的环节，使它们在某一港口、某一日期同时汇合：</p>
<ul>
  <li>一份符合 MLC 2006 的已签署船员雇佣协议（SEA）。</li>
  <li>有效的旅行证件——护照、海员证，以及任何过境或上船签证。</li>
  <li>航线指向船舶确实会抵达的港口，并预留船期延误的余量。</li>
  <li>登轮港的港口代理，负责办理舷梯手续与移民通关。</li>
  <li>岗前简报，使登轮船员到达时已熟悉船舶、职责与交接。</li>
</ul>
<p>相反的流程——下船签离——必须同步进行，使下船者得以回家，而不致让船舶哪怕一个值班班次出现人手短缺。</p>

<h2>合规并非可选项</h2>
<p>配员置身于一套严密的监管框架之中。<strong>STCW 公约</strong>统一规范全球的培训与发证标准。<strong>MLC 2006</strong>——常被称为"船员权利法案"——为合同、薪资、休息时间、起居舱室与遣返设定最低标准。船旗国通过检查与 MSMD 加以执行，而<strong>港口国监督</strong>机制（如巴黎与东京备忘录）可登上任何来访船舶，并因缺陷将其滞留。若一家船员管理公司把合规当作文书工作、而非服务的核心，那便是一颗早晚会引爆的隐患。</p>

<h2>船东为何外包配员</h2>
<p>对于中小型船队而言，自建船员部门很少划算。隐性成本极为庞大：跨时区的全天候值守、多国的招募网络、证书追踪系统、票务部门，以及读懂海员服务簿、识破伪造签注的机构经验。专业的船员管理公司将这些成本分摊到众多客户身上，并带来偶尔招人者根本无从企及的、来之不易的专业能力。</p>
<p>做得好的配员是无形的：船舶始终配齐人员、始终合规、从不被滞留、也从不因缺一名合格高级船员而延误。那份不声不响的可靠——而非华丽的营销——才是专业船员配备服务真正的产品。</p>
`,
    featured_image: null,
    category: "指南",
    tag: "指南",
    read_time: "9 分钟阅读",
    status: "published",
    author_name: "环球船员管理",
    author_role: "海事编辑团队",
    meta_title: "船员配备如何运作：完整指南",
    meta_description:
      "船员配备完整指南：配员矩阵规划、STCW 与 MLC 合规、船员审核，以及全球船队的换班物流安排。",
    views: 2480,
    created_at: "2026-01-18T09:00:00.000Z",
    published_at: "2026-01-18T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. STCW Certification Explained — EN
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-en-2",
    language: "en",
    title: "STCW Certification: What Every Shipowner Must Know",
    slug: "stcw-certification-explained",
    excerpt:
      "STCW is the global standard that decides who is legally allowed to crew your vessel. Here is what shipowners and managers need to know about certificates, endorsements and revalidation.",
    content: `
<p>If MLC 2006 is the seafarers' bill of rights, the <strong>STCW Convention</strong> is the rulebook that decides who is even allowed on the bridge or in the engine room. Officially the <em>International Convention on Standards of Training, Certification and Watchkeeping for Seafarers, 1978</em>, as amended, STCW is the single global benchmark that makes a certificate issued in Manila meaningful to a flag state in Europe and a port inspector in Singapore. For shipowners and managers, understanding STCW is not academic — it is the difference between a compliant crew and a detained ship.</p>

<h2>Why STCW exists</h2>
<p>Before STCW, every maritime nation set its own training standards, and there was no reliable way to know whether a certificate from one country meant anything in another. The convention, adopted in 1978 and significantly overhauled by the 1995 and 2010 (Manila) amendments, replaced that patchwork with a common floor: minimum standards of competence, defined training, mandatory rest hours, and a system of mutual recognition. The result is a global labour market in which a qualified officer can serve on ships of many flags.</p>

<blockquote>STCW does not certify a person — it certifies a competence. The question is never "is this seafarer good?" but "has this seafarer demonstrated, to a recognised standard, that they can do this specific job?"</blockquote>

<h2>Certificates, endorsements and documents</h2>
<p>STCW paperwork confuses many owners because several different documents travel together. The essentials are:</p>
<ul>
  <li><strong>Certificate of Competency (CoC)</strong> — the core qualification for officers (deck and engine), issued by a maritime administration after examination. It defines the capacity and limitation, for example "Officer in Charge of a Navigational Watch" or "Chief Engineer, unlimited."</li>
  <li><strong>Certificate of Proficiency (CoP)</strong> — proof of specific skills such as survival craft, advanced firefighting, or medical first aid.</li>
  <li><strong>Flag State Endorsement (FSE)</strong> — recognition by the ship's flag state of a CoC issued by another country, allowing that officer to serve on its vessels. Without it, a foreign CoC is not valid for that flag.</li>
  <li><strong>Basic Safety Training (BST)</strong> — the four foundational modules every seafarer needs: personal survival techniques, fire prevention and firefighting, elementary first aid, and personal safety and social responsibility.</li>
</ul>

<h3>The hierarchy of competence</h3>
<p>STCW organises competence into management, operational and support levels. A Master and Chief Engineer sit at the management level; watchkeeping officers at the operational level; ratings forming part of a watch at the support level. Each level carries its own training, examination and revalidation requirements, and the manning matrix must place a correctly certified person at every required level.</p>

<h2>Specialised and vessel-specific training</h2>
<p>The four basic modules are only the start. The type of ship dictates a stack of additional STCW requirements:</p>
<ol>
  <li><strong>Tankers</strong> require basic and advanced training in oil, chemical or liquefied gas operations depending on cargo.</li>
  <li><strong>Passenger ships</strong> demand crowd management, crisis management and passenger safety training.</li>
  <li><strong>Ships in polar waters</strong> require Polar Code training for the officers concerned.</li>
  <li><strong>Vessels with ECDIS</strong> require type-specific electronic chart training for watchkeepers.</li>
  <li><strong>Security duties</strong> require designated security duties or ship security officer training under the ISPS Code.</li>
</ol>
<p>For offshore work the picture extends further. While BOSIET and HUET are industry standards (OPITO) rather than strictly STCW, no manning agency placing crew on an FPSO, drillship or offshore support vessel can ignore them — the helicopter transfer to an offshore installation simply will not board an untrained worker.</p>

<h2>Revalidation: the trap that detains ships</h2>
<p>Certificates do not last forever. Under the Manila amendments, most CoCs and many proficiency certificates must be <strong>revalidated every five years</strong>, with the officer demonstrating continued competence — typically through recent sea service or refresher training. This is where compliance quietly fails. A perfectly good officer with a lapsed survival-craft certificate or an expired endorsement is, in the eyes of port state control, not certified at all.</p>
<p>This is precisely why certificate tracking is a core function of any serious manning operation. A modern crewing desk monitors expiry dates across the entire fleet and triggers refresher training or revalidation well before a document lapses — not in the port where an inspector finds it expired.</p>

<h2>What shipowners should demand</h2>
<p>When you engage a manning agency, STCW compliance should be visible, auditable and proactive. Insist on the following:</p>
<ul>
  <li><strong>Source verification</strong> — certificates checked against the issuing administration, not accepted on photocopies.</li>
  <li><strong>Flag matching</strong> — confirmation that every officer holds a valid endorsement for your specific flag state.</li>
  <li><strong>Expiry monitoring</strong> — a live system that flags revalidation deadlines months ahead.</li>
  <li><strong>Vessel-specific competence</strong> — the right tanker, passenger, polar or offshore endorsements for the actual trade.</li>
</ul>
<p>STCW is dense, but its logic is simple: standardised, verifiable, current competence for every role on every ship. An owner who treats it as the backbone of crewing — not as a box to tick at the gangway — keeps their fleet trading, their charterers confident, and their vessels off the detention list.</p>
`,
    featured_image: null,
    category: "Compliance",
    tag: "Compliance",
    read_time: "8 min read",
    status: "published",
    author_name: "Ship Crew Agency",
    author_role: "Maritime Editorial Team",
    meta_title: "STCW Certification Explained for Shipowners",
    meta_description:
      "Understand STCW certification: CoC, endorsements, basic safety training, vessel-specific modules and five-year revalidation that keeps your fleet compliant.",
    views: 2760,
    created_at: "2026-02-12T09:00:00.000Z",
    published_at: "2026-02-12T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. STCW Certification Explained — ZH
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-zh-2",
    language: "zh",
    title: "STCW 适任证书：每位船东都必须了解的事",
    slug: "stcw-certification-explained",
    excerpt:
      "STCW 是决定谁有合法资格驾驭你船舶的全球标准。本文讲解船东与管理者必须了解的证书、签注与再有效化要点。",
    content: `
<p>如果说 MLC 2006 是船员的权利法案，那么 <strong>STCW 公约</strong>就是决定谁才有资格踏上驾驶台或进入机舱的规则手册。其正式名称为《1978 年海员培训、发证和值班标准国际公约》（经修正），STCW 是唯一的全球基准，使得在马尼拉签发的一张证书，对欧洲的某个船旗国、对新加坡的某位港口检查官同样具有意义。对船东与管理者而言，理解 STCW 绝非纸上谈兵——它是合规船员与被滞留船舶之间的分界线。</p>

<h2>STCW 为何存在</h2>
<p>在 STCW 之前，每个海运国家各自制定培训标准，无从可靠判断一国的证书在另一国是否还有意义。该公约于 1978 年通过，并经 1995 年和 2010 年（马尼拉）修正案大幅革新，以一条共同底线取代了这种各行其是的局面：最低适任标准、规定的培训、强制的休息时间，以及一套相互承认的机制。其结果是形成了一个全球劳务市场，让合格高级船员得以在多个船旗的船舶上任职。</p>

<blockquote>STCW 认证的不是一个人，而是一项适任能力。问题从来不是"这名船员好不好"，而是"这名船员是否已按公认标准证明，自己能胜任这项具体工作"。</blockquote>

<h2>证书、签注与文件</h2>
<p>STCW 的文件常令许多船东困惑，因为多份不同文件往往是一同出现的。要点如下：</p>
<ul>
  <li><strong>适任证书（CoC）</strong>——高级船员（甲板与轮机）的核心资历，由海事主管机关考核后签发。它界定适任的职务范围与限制，例如"航行值班负责高级船员"或"轮机长，无限制"。</li>
  <li><strong>专业证书（CoP）</strong>——特定技能的证明，如救生艇筏、高级消防或医护急救。</li>
  <li><strong>船旗国签注（FSE）</strong>——船舶船旗国对他国签发之 CoC 的承认，准许该高级船员在其船舶上任职。没有它，外国 CoC 对该船旗便属无效。</li>
  <li><strong>基本安全培训（BST）</strong>——每位船员都需具备的四个基础模块：个人求生技能、防火与灭火、基础急救，以及个人安全与社会责任。</li>
</ul>

<h3>适任能力的层级</h3>
<p>STCW 将适任能力划分为管理级、操作级与辅助级。船长与轮机长处于管理级；值班高级船员处于操作级；构成值班一部分的普通船员处于辅助级。每一层级都有各自的培训、考核与再有效化要求，而配员矩阵必须在每一个所需层级上安排一名持证正确的人员。</p>

<h2>专项与船型专属培训</h2>
<p>四个基础模块仅仅是起点。船舶类型决定了一系列附加的 STCW 要求：</p>
<ol>
  <li><strong>液货船</strong>需依货种接受石油、化学品或液化气操作的基础与高级培训。</li>
  <li><strong>客船</strong>要求人群管理、危机管理与旅客安全培训。</li>
  <li><strong>极地水域船舶</strong>要求相关高级船员接受极地规则（Polar Code）培训。</li>
  <li><strong>配备 ECDIS 的船舶</strong>要求值班人员接受针对设备型号的电子海图培训。</li>
  <li><strong>保安职责</strong>要求依据 ISPS 规则接受指定保安职责或船舶保安员培训。</li>
</ol>
<p>对海上作业而言，情况还要更进一步。虽然 BOSIET 与 HUET 属行业标准（OPITO）而非严格意义上的 STCW，但任何向 FPSO、钻井船或海工支持船派遣船员的公司都不能忽视它们——飞往海上设施的直升机，根本不会让未受训人员登机。</p>

<h2>再有效化：滞留船舶的陷阱</h2>
<p>证书并非永久有效。依据马尼拉修正案，大多数 CoC 与许多专业证书必须<strong>每五年再有效化一次</strong>，由该高级船员证明其适任能力的延续——通常通过近期海上资历或复训实现。合规正是在这里悄然失守。一名各方面都很优秀、却持有失效救生艇筏证书或过期签注的高级船员，在港口国监督眼中，等同于完全无证。</p>
<p>这正是为何证书追踪是任何认真负责的配员运作的核心职能。现代配员部门会监控整支船队的有效期，并在文件失效之前从容触发复训或再有效化——而不是等到检查官在港口发现其已过期。</p>

<h2>船东应当提出的要求</h2>
<p>当你聘用一家船员管理公司时，STCW 合规应当是可见、可审核且主动的。务必坚持以下几点：</p>
<ul>
  <li><strong>来源核验</strong>——证书向签发主管机关核对，而非凭复印件接受。</li>
  <li><strong>船旗匹配</strong>——确认每位高级船员都持有针对你具体船旗国的有效签注。</li>
  <li><strong>有效期监控</strong>——一套实时系统，提前数月标示再有效化的截止期限。</li>
  <li><strong>船型专属适任</strong>——为实际航线配齐正确的液货船、客船、极地或海工签注。</li>
</ul>
<p>STCW 内容繁密，但其逻辑很简单：为每艘船上的每个岗位，提供标准化、可核验且现行有效的适任能力。把它当作配员中枢、而非舷梯口一道勾选项的船东，才能让船队持续营运、让租家放心、让船舶远离滞留名单。</p>
`,
    featured_image: null,
    category: "合规",
    tag: "合规",
    read_time: "8 分钟阅读",
    status: "published",
    author_name: "环球船员管理",
    author_role: "海事编辑团队",
    meta_title: "STCW 适任证书：船东必读解析",
    meta_description:
      "理解 STCW 适任证书：CoC、签注、基本安全培训、船型专项模块，以及每五年再有效化，助你船队持续合规。",
    views: 2150,
    created_at: "2026-02-12T09:00:00.000Z",
    published_at: "2026-02-12T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Emergency Crew Replacement — EN
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-en-3",
    language: "en",
    title: "Emergency Crew Replacement: Act Fast Without Compromising Compliance",
    slug: "emergency-crew-replacement",
    excerpt:
      "When a seafarer falls ill, is injured or must leave a vessel unexpectedly, every hour counts. Here is how to replace crew fast while keeping the ship fully compliant.",
    content: `
<p>A vessel is mid-ocean, three days from the nearest major port, when the Second Engineer suffers a suspected appendicitis. Or a deck officer's certificate is discovered to have lapsed during a port state control inspection. Or a family emergency forces a Chief Officer to repatriate immediately. <strong>Emergency crew replacement</strong> is the part of manning that never appears in the brochure but defines whether an agency is genuinely operational. When it happens, two clocks start ticking at once: the cost of delay, and the risk of cutting a compliance corner under pressure.</p>

<h2>Why emergencies are different</h2>
<p>Planned crew changes are a logistics exercise with weeks of lead time. Emergencies compress that into hours and strip away the comfortable margins. The temptation — to grab whoever is available, skip a verification step, or sail short-handed "just to the next port" — is exactly where owners expose themselves to detention, insurance disputes and, in the worst case, an unsafe ship. The discipline of emergency replacement is to move at maximum speed while refusing to compromise on the things that cannot be compromised.</p>

<blockquote>Speed and compliance are not opposites. The agencies that move fastest in a crisis are the ones whose compliance was already in order before the crisis began.</blockquote>

<h2>The first hours: triage and stabilise</h2>
<p>The moment the call comes in, a competent crewing desk runs a rapid triage:</p>
<ol>
  <li><strong>Define the gap precisely.</strong> What rank, what certificates, what vessel-specific endorsements, and by what date and port must the reliever join?</li>
  <li><strong>Check the Minimum Safe Manning Document.</strong> Can the vessel legally continue to the next suitable port with the remaining crew, even temporarily, or is she now below the legal floor?</li>
  <li><strong>Assess redistribution.</strong> Can duties be safely covered on board — for example a Master holding a higher CoC temporarily — without breaching hours-of-rest rules under STCW and MLC 2006?</li>
  <li><strong>Open the pipeline.</strong> Simultaneously begin searching for a qualified, available, correctly certified replacement.</li>
</ol>
<p>This triage is why a deep, pre-vetted candidate pool is worth more in an emergency than at any other time. An agency that already holds verified, ready-to-travel officers can fill a gap in days; one that starts recruiting from scratch cannot.</p>

<h2>The non-negotiables under pressure</h2>
<p>Even at maximum urgency, certain checks simply cannot be skipped, because skipping them transfers the emergency from a logistics problem to a safety and legal one:</p>
<ul>
  <li><strong>Certificate of Competency and STCW endorsements</strong> valid for the rank and the flag state — verified, not assumed.</li>
  <li><strong>A valid ENG1 or equivalent medical</strong> — sending an unfit seafarer to sea simply creates the next emergency.</li>
  <li><strong>Vessel-specific competence</strong> — tanker, gas, passenger or, for offshore, valid BOSIET and HUET. A reliever who cannot board the helicopter to an FPSO has not solved the problem.</li>
  <li><strong>A compliant Seafarer Employment Agreement</strong> under MLC 2006, even when signed under time pressure.</li>
</ul>

<h2>Logistics: where speed is won or lost</h2>
<p>Once a compliant replacement is identified, the race becomes pure logistics, and the deciding factors are often outside the agency's direct control:</p>
<ul>
  <li><strong>Visa and travel documents.</strong> Emergency joining visas, crew transit arrangements and a valid seaman's book can make or break a same-week change. Established relationships with embassies and a working knowledge of fast-track schemes are decisive.</li>
  <li><strong>Flight routing to a moving target.</strong> The vessel is still sailing; the joining port may shift. Experienced crewing coordinators book flexibly and stay in constant contact with the master and port agent.</li>
  <li><strong>Port agency and immigration.</strong> A reliable agent at the joining port clears the gangway and shore-pass formalities so the change does not stall at the quayside.</li>
  <li><strong>Medical evacuation, where needed.</strong> If the emergency is medical, the replacement runs in parallel with medevac, telemedicine advice and possibly a deviation to land the casualty.</li>
</ul>

<h2>The role of forward planning</h2>
<p>The paradox of emergency response is that it is largely won in advance. Owners and agencies that prepare suffer far shorter and cheaper emergencies:</p>
<ol>
  <li><strong>A live certificate-tracking system</strong> that prevents the most common "emergency" of all — an expiry no one noticed until an inspector did.</li>
  <li><strong>A bench of pre-vetted relievers</strong> with documents and medicals already current.</li>
  <li><strong>Pre-cleared travel and visa channels</strong> for the trades and routes the fleet actually operates.</li>
  <li><strong>A 24/7 duty crewing desk</strong> — emergencies do not respect office hours or time zones.</li>
</ol>

<h2>What good looks like</h2>
<p>A well-handled emergency replacement looks almost boring from the outside: the affected seafarer is cared for and repatriated properly, a fully qualified reliever joins within days at a port the vessel actually reaches, the Minimum Safe Manning is never breached, hours-of-rest rules are respected throughout, and the vessel resumes trading with complete documentation. No detention, no insurance dispute, no unsafe watch. That calm outcome under pressure is the truest test of a manning partner — and it is built, long before the phone rings, on compliance that was never allowed to slip.</p>
`,
    featured_image: null,
    category: "Operations",
    tag: "Operations",
    read_time: "8 min read",
    status: "published",
    author_name: "Ship Crew Agency",
    author_role: "Maritime Editorial Team",
    meta_title: "Emergency Crew Replacement Without Compromising Compliance",
    meta_description:
      "How to replace a seafarer fast in an emergency: triage, minimum safe manning, certificate checks, visa logistics and the forward planning that prevents crises.",
    views: 1840,
    created_at: "2026-03-09T09:00:00.000Z",
    published_at: "2026-03-09T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Emergency Crew Replacement — ZH
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-zh-3",
    language: "zh",
    title: "紧急船员替换：快速行动，绝不牺牲合规",
    slug: "emergency-crew-replacement",
    excerpt:
      "当船员突发疾病、受伤或必须意外离船时，每一小时都至关重要。本文讲解如何在保持船舶全面合规的前提下，快速完成船员替换。",
    content: `
<p>一艘船正航行在大洋中央，距最近的大港尚有三天航程，二管轮却疑似突发阑尾炎。又或者，在一次港口国监督检查中，发现某甲板高级船员的证书已经失效。再或者，一桩家庭急事迫使大副必须立即遣返回国。<strong>紧急船员替换</strong>是配员中从不出现在宣传册上、却决定一家公司是否真正具备运营能力的那一部分。一旦发生，两只时钟同时开始走动：延误的成本，以及在压力之下走合规捷径的风险。</p>

<h2>紧急情况为何不同</h2>
<p>有计划的换班是一项有数周筹备期的物流安排。紧急情况则将其压缩到数小时，并剥去了那些令人安心的余量。那种诱惑——随便抓一个有空的人、跳过一道核验步骤、或者"就到下一港"地少人航行——恰恰是船东将自己暴露于滞留、保险纠纷，乃至最坏情况下一艘不安全船舶之中的地方。紧急替换的纪律，在于以最高速度行动，同时拒绝在那些绝不能让步的事情上让步。</p>

<blockquote>速度与合规并非对立。在危机中行动最快的公司，正是那些在危机来临之前合规就早已就绪的公司。</blockquote>

<h2>最初几小时：分诊与稳住局面</h2>
<p>电话一打进来，称职的配员部门就会进行一次快速分诊：</p>
<ol>
  <li><strong>精确界定缺口。</strong>替班人员需要何种职级、何种证书、何种船型专属签注，并须在哪一日期、哪一港口登轮？</li>
  <li><strong>核对最低安全配员证书。</strong>以现有船员，船舶能否合法地（哪怕暂时地）继续航行至下一合适港口，还是已跌破法律底线？</li>
  <li><strong>评估职责再分配。</strong>船上能否安全地分担职责——例如由持有更高 CoC 的船长暂时顶替——而不违反 STCW 与 MLC 2006 的休息时间规定？</li>
  <li><strong>打开人才管道。</strong>同时着手寻找一名合格、有空且持证正确的替换人员。</li>
</ol>
<p>这正是为何一个深厚、经预先审核的候选人储备，在紧急情况下比任何时候都更有价值。已握有经核验、随时可出发的高级船员的公司，能在数天内补上缺口；而从零开始招募的公司，则做不到。</p>

<h2>压力之下绝不可让步之处</h2>
<p>即便在最紧迫之时，某些核查也根本不能跳过，因为跳过它们会把紧急情况从一个物流问题，转变为一个安全与法律问题：</p>
<ul>
  <li><strong>对该职级与该船旗国有效的适任证书与 STCW 签注</strong>——须经核验，而非想当然。</li>
  <li><strong>有效的 ENG1 或同等体检证明</strong>——把一名不适任的船员送上海，无异于制造下一起紧急事件。</li>
  <li><strong>船型专属适任能力</strong>——液货船、气体船、客船，或对海工而言有效的 BOSIET 与 HUET。一名登不上飞往 FPSO 直升机的替班人员，并没有解决问题。</li>
  <li><strong>符合 MLC 2006 的船员雇佣协议</strong>，即便是在时间压力下签署。</li>
</ul>

<h2>物流：速度在此决出胜负</h2>
<p>一旦确定了合规的替换人员，这场竞赛便化为纯粹的物流，而决定性因素往往不在公司的直接掌控之内：</p>
<ul>
  <li><strong>签证与旅行证件。</strong>紧急登轮签证、船员过境安排与有效的海员证，足以成就或断送一次当周换班。与使领馆既有的关系，以及对快速通道方案的熟练运用，至关重要。</li>
  <li><strong>飞向移动目标的航班安排。</strong>船舶仍在航行，登轮港可能变动。经验丰富的配员协调员会灵活订票，并与船长及港口代理保持持续联络。</li>
  <li><strong>港口代理与移民通关。</strong>登轮港一位可靠的代理，会办妥舷梯与岸上通行证手续，使换班不致在码头边卡住。</li>
  <li><strong>必要时的医疗后送。</strong>若属医疗紧急，替换工作会与医疗后送、远程医疗咨询，乃至为送下伤员而改变航向同步进行。</li>
</ul>

<h2>前瞻规划的作用</h2>
<p>应急的吊诡之处在于：它在很大程度上是提前赢下的。事先有所准备的船东与公司，所经历的紧急情况要短得多、也便宜得多：</p>
<ol>
  <li><strong>一套实时证书追踪系统</strong>，预防最常见的那种"紧急情况"——一份直到被检查官发现才有人注意到的过期文件。</li>
  <li><strong>一支经预先审核的替班储备</strong>，证件与体检均已现行有效。</li>
  <li><strong>预先打通的行程与签证渠道</strong>，针对船队实际经营的航线与货种。</li>
  <li><strong>一个全天候值守的配员部门</strong>——紧急情况不会顾及办公时间或时区。</li>
</ol>

<h2>做得好是什么样子</h2>
<p>处理得当的紧急替换，从外部看几乎平淡无奇：受影响的船员得到妥善照护并被正确遣返，一名完全合格的替班人员在数天内于船舶确实抵达的港口登轮，最低安全配员从未被突破，休息时间规定全程得到遵守，船舶在文件齐备的情况下恢复营运。没有滞留、没有保险纠纷、没有不安全的值班。压力之下这份从容的结果，正是对一家配员伙伴最真实的检验——而它，早在电话响起之前，便建立在从未被允许松懈的合规之上。</p>
`,
    featured_image: null,
    category: "运营",
    tag: "运营",
    read_time: "8 分钟阅读",
    status: "published",
    author_name: "环球船员管理",
    author_role: "海事编辑团队",
    meta_title: "紧急船员替换：快速行动且不失合规",
    meta_description:
      "如何在紧急情况下快速替换船员：分诊、最低安全配员、证书核查、签证物流，以及预防危机的前瞻规划。",
    views: 1490,
    created_at: "2026-03-09T09:00:00.000Z",
    published_at: "2026-03-09T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. MLC 2006 Seafarer Rights — EN
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-en-4",
    language: "en",
    title: "MLC 2006: A Seafarer's Rights Guide for Ship Management Companies",
    slug: "mlc-2006-seafarer-rights",
    excerpt:
      "The Maritime Labour Convention sets the global standard for how seafarers must be treated. This guide explains MLC 2006 obligations for ship managers and manning agencies.",
    content: `
<p>The <strong>Maritime Labour Convention, 2006 (MLC 2006)</strong> is often described as the fourth pillar of international maritime regulation, standing alongside SOLAS, MARPOL and STCW. Where STCW governs competence and the others govern safety and pollution, MLC 2006 governs people — the working and living conditions of the seafarers who make global trade possible. For ship management companies and manning agencies, it is not a welfare aspiration but a binding legal framework enforced by flag states and port state control alike.</p>

<h2>Why MLC 2006 is called the seafarers' bill of rights</h2>
<p>Before MLC, seafarers' rights were scattered across dozens of older ILO conventions that few states had ratified consistently. MLC 2006 consolidated them into a single, enforceable instrument that entered force in 2013 and now covers the overwhelming majority of world tonnage. Its genius is in its enforcement teeth: a ship can be detained by port state control for serious breaches, exactly as it can for a safety deficiency. Crew welfare became an operational reality, not a moral footnote.</p>

<blockquote>MLC 2006 turned seafarer welfare from something owners ought to provide into something they must prove they provide — documented, inspectable and enforceable in any port.</blockquote>

<h2>The five titles of the convention</h2>
<p>MLC is organised into five titles that together cover the seafarer's entire working life:</p>
<ol>
  <li><strong>Title 1 — Minimum requirements for seafarers to work on a ship.</strong> Minimum age, medical fitness (the ENG1 or equivalent), training and qualification, and properly regulated recruitment and placement services.</li>
  <li><strong>Title 2 — Conditions of employment.</strong> The Seafarer Employment Agreement, wages, hours of work and rest, leave, and repatriation.</li>
  <li><strong>Title 3 — Accommodation, recreation, food and catering.</strong> Standards for living quarters, recreational facilities, and the quality and quantity of food and drinking water.</li>
  <li><strong>Title 4 — Health protection, medical care, welfare and social security.</strong> Medical care on board and ashore, shipowner liability, health and safety, access to welfare facilities, and social security protection.</li>
  <li><strong>Title 5 — Compliance and enforcement.</strong> The Maritime Labour Certificate, the Declaration of Maritime Labour Compliance, inspections and on-board complaint procedures.</li>
</ol>

<h2>The Seafarer Employment Agreement</h2>
<p>At the heart of Title 2 is the <strong>Seafarer Employment Agreement (SEA)</strong>. Every seafarer must have a clear written contract, in a language they understand, signed before joining, with a copy in their possession. The SEA must set out the parties, the wages and how they are calculated, paid leave, the conditions of repatriation, health and social security benefits, and notice periods. For a manning agency this is non-negotiable groundwork: an emergency placement does not excuse an absent or non-compliant SEA.</p>

<h3>Hours of rest</h3>
<p>MLC, working alongside STCW, sets clear limits on fatigue. Seafarers are entitled to <strong>a minimum of 10 hours of rest in any 24-hour period and 77 hours in any 7-day period</strong>, with rest divisible into no more than two periods, one of which is at least six hours. These are not guidelines; they are recorded, audited, and directly linked to safe watchkeeping. Manning levels that quietly rely on crew breaching rest hours are a compliance failure waiting to be found.</p>

<h2>Recruitment and placement: the agency's own obligations</h2>
<p>MLC 2006 regulates manning agencies directly. A compliant recruitment and placement service must:</p>
<ul>
  <li>Charge <strong>no fees to the seafarer</strong> for finding employment — the cost falls on the shipowner, not the worker.</li>
  <li>Maintain an up-to-date register of the seafarers it places.</li>
  <li>Ensure seafarers are informed of their rights and duties under the SEA before engagement.</li>
  <li>Verify that seafarers are qualified and hold the documents required for the job.</li>
  <li>Operate a system of protection to compensate seafarers if the agency or the shipowner fails to meet obligations.</li>
</ul>
<p>This is one of the clearest dividing lines between a professional agency and an exploitative one. The "no fees to the seafarer" principle is fundamental, and any arrangement that charges crew for jobs is a direct breach.</p>

<h2>Repatriation: a right, not a favour</h2>
<p>One of MLC's most important protections is the right to repatriation — a seafarer must be returned home at the end of their contract, or in cases of illness, injury, shipwreck or the shipowner's insolvency, <strong>at no cost to the seafarer</strong>. The 2014 amendments strengthened this further with financial security requirements, so that abandoned crews are not left stranded without wages or a way home. Managers must ensure the financial security certificate is valid and that repatriation is planned, not improvised.</p>

<h2>What compliance looks like in practice</h2>
<p>For a ship management company, MLC 2006 compliance is continuous and documented. The vessel carries a valid Maritime Labour Certificate and Declaration of Maritime Labour Compliance; SEAs are in place and held by every crew member; rest-hour records are maintained honestly; accommodation, food and welfare meet the standard; and an on-board complaint procedure exists that crew can actually use without fear. When port state control boards, none of this should require scrambling — it should already be true. Treating MLC as the human foundation of crewing, rather than a certificate to renew, is what separates a responsible operator from one waiting for a detention.</p>
`,
    featured_image: null,
    category: "Compliance",
    tag: "Compliance",
    read_time: "9 min read",
    status: "published",
    author_name: "Ship Crew Agency",
    author_role: "Maritime Editorial Team",
    meta_title: "MLC 2006 Seafarer Rights Guide for Ship Managers",
    meta_description:
      "An MLC 2006 guide for ship managers: the five titles, the Seafarer Employment Agreement, rest hours, no-fee recruitment, and repatriation rights explained.",
    views: 2310,
    created_at: "2026-04-07T09:00:00.000Z",
    published_at: "2026-04-07T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. MLC 2006 Seafarer Rights — ZH
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-zh-4",
    language: "zh",
    title: "MLC 2006：写给船舶管理公司的船员权利指南",
    slug: "mlc-2006-seafarer-rights",
    excerpt:
      "《海事劳工公约》为船员应受的待遇设定了全球标准。本指南讲解船舶管理公司与船员管理公司在 MLC 2006 下的各项义务。",
    content: `
<p><strong>《2006 年海事劳工公约》（MLC 2006）</strong>常被称为国际海事监管的第四大支柱，与 SOLAS、MARPOL 和 STCW 并立。STCW 规范适任能力，其余两者规范安全与防污染，而 MLC 2006 规范的是人——使全球贸易得以运转的船员们的工作与生活条件。对船舶管理公司和船员管理公司而言，它并非一项福利愿景，而是一套由船旗国与港口国监督共同执行的、具有约束力的法律框架。</p>

<h2>为何 MLC 2006 被称为船员权利法案</h2>
<p>在 MLC 之前，船员权利散见于数十部较旧的国际劳工组织公约之中，而能始终如一批准这些公约的国家寥寥无几。MLC 2006 将它们整合为一部单一、可执行的文书，于 2013 年生效，如今已覆盖世界绝大多数吨位。其精妙之处在于执行的"牙齿"：船舶可因严重违约而被港口国监督滞留，正如因安全缺陷被滞留一样。船员福利由此成为一项运营现实，而非道德层面的脚注。</p>

<blockquote>MLC 2006 把船员福利，从船东"理应提供"之物，变为他们"必须证明自己确已提供"之物——有据可查、可受检查，且在任何港口都可被执行。</blockquote>

<h2>公约的五大标题</h2>
<p>MLC 划分为五大标题，合在一起涵盖了船员的整个工作生涯：</p>
<ol>
  <li><strong>标题一——船员在船工作的最低要求。</strong>最低年龄、健康适任（ENG1 或同等证明）、培训与资历，以及受到妥善监管的招募与配置服务。</li>
  <li><strong>标题二——就业条件。</strong>船员雇佣协议、薪资、工作与休息时间、休假，以及遣返。</li>
  <li><strong>标题三——起居舱室、娱乐设施、膳食与餐饮服务。</strong>关于居住舱室、娱乐设施，以及食品和饮用水质量与数量的标准。</li>
  <li><strong>标题四——健康保护、医疗、福利与社会保障。</strong>船上与岸上的医疗、船东责任、健康与安全、福利设施的获取，以及社会保障。</li>
  <li><strong>标题五——合规与执行。</strong>海事劳工证书、海事劳工合规声明、检查，以及船上投诉程序。</li>
</ol>

<h2>船员雇佣协议</h2>
<p>标题二的核心是<strong>船员雇佣协议（SEA）</strong>。每位船员都必须持有一份清晰的书面合同，以其能理解的语言书写，在登轮前签署，本人留存一份。SEA 必须载明合同双方、薪资及其计算方式、带薪休假、遣返条件、健康与社会保障福利，以及通知期。对一家船员管理公司而言，这是不容商量的基础工作：一次紧急派遣，并不能成为缺失或不合规 SEA 的借口。</p>

<h3>休息时间</h3>
<p>MLC 与 STCW 协同运作，对疲劳设定了明确限制。船员有权<strong>在任何 24 小时内获得至少 10 小时休息、在任何 7 天内获得至少 77 小时休息</strong>，休息至多可分为两段，其中一段至少六小时。这些不是指导性建议，而是会被记录、审核，并与安全值班直接挂钩的硬性规定。若配员水平暗中依赖船员突破休息时间来维持，那便是一项早晚会被查出的合规失误。</p>

<h2>招募与配置：公司自身的义务</h2>
<p>MLC 2006 直接对船员管理公司加以监管。一家合规的招募与配置服务机构必须：</p>
<ul>
  <li>为船员寻找工作<strong>不向船员收取任何费用</strong>——成本由船东承担，而非劳动者。</li>
  <li>对其所配置的船员保有一份最新的登记册。</li>
  <li>确保船员在受聘前已知悉其在 SEA 下的权利与义务。</li>
  <li>核实船员具备资格，并持有该岗位所需的文件。</li>
  <li>设立一套保障机制，当公司或船东未能履行义务时，向船员作出补偿。</li>
</ul>
<p>这是专业公司与剥削型机构之间最清晰的分界线之一。"不向船员收费"原则乃根本所在，任何向船员收取工作费用的安排，都属直接违约。</p>

<h2>遣返：一项权利，而非恩惠</h2>
<p>MLC 最重要的保护之一，是遣返权——船员在合同结束时，或在患病、受伤、海难或船东破产的情形下，必须<strong>在不向船员收取费用的前提下</strong>被送返回国。2014 年修正案以财务担保要求进一步强化了这一点，使被遗弃的船员不致流落异乡、既无薪资也无归途。管理者必须确保财务担保证书有效，并确保遣返是经过规划的，而非临时拼凑。</p>

<h2>合规在实务中是什么样子</h2>
<p>对一家船舶管理公司而言，MLC 2006 合规是持续且有据可查的。船舶持有有效的海事劳工证书与海事劳工合规声明；SEA 均已就位，并由每位船员本人留存；休息时间记录如实保存；起居舱室、膳食与福利均达标；船上设有一套船员真正能够、且无须心存顾虑地使用的投诉程序。当港口国监督登轮时，这一切都不应临时抱佛脚——它本就该是既成事实。把 MLC 当作配员的人文根基、而非一张待续期的证书，正是负责任的经营者与等着被滞留者之间的分野。</p>
`,
    featured_image: null,
    category: "合规",
    tag: "合规",
    read_time: "9 分钟阅读",
    status: "published",
    author_name: "环球船员管理",
    author_role: "海事编辑团队",
    meta_title: "MLC 2006：船舶管理公司船员权利指南",
    meta_description:
      "写给船舶管理者的 MLC 2006 指南：五大标题、船员雇佣协议、休息时间、零收费招募，以及遣返权利全解析。",
    views: 1880,
    created_at: "2026-04-07T09:00:00.000Z",
    published_at: "2026-04-07T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Global Seafarer Supply — EN
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-en-5",
    language: "en",
    title: "Global Seafarer Supply: Where the World's Qualified Maritime Labour Comes From",
    slug: "global-seafarer-supply",
    excerpt:
      "More than 1.8 million seafarers crew the world fleet. This is where they come from, how the global labour market is shifting, and what the officer shortage means for owners.",
    content: `
<p>The world fleet of merchant ships is crewed by an estimated <strong>1.8 to 1.9 million seafarers</strong>, a workforce drawn from almost every nation but concentrated in a handful of major supply countries. For shipowners and fleet managers, understanding where qualified maritime labour comes from — and where it is becoming scarce — is not a matter of curiosity. It directly shapes crewing cost, availability, and the resilience of any manning strategy.</p>

<h2>The shape of the global labour market</h2>
<p>Maritime labour divides broadly into two categories: <strong>officers</strong> (the certificated deck and engine professionals who manage the ship) and <strong>ratings</strong> (the skilled and support crew who operate it). The two markets behave very differently. Ratings are relatively plentiful; certificated officers — particularly senior engineers and those with specialised endorsements — are the genuine bottleneck. Industry bodies have warned for years of a structural shortfall in qualified officers as fleets grow and existing officers age out.</p>

<blockquote>The shortage is not of people willing to go to sea. It is of people certified, experienced and current enough to take a senior watch on a modern, specialised vessel.</blockquote>

<h2>The major supply nations</h2>
<p>While seafarers come from across the globe, a few countries supply the bulk of the workforce:</p>
<ul>
  <li><strong>The Philippines</strong> — for decades the single largest source of seafarers, especially ratings, with a vast training infrastructure and a deep culture of seafaring as a career.</li>
  <li><strong>China</strong> — an enormous and growing pool of both officers and ratings, increasingly serving the international fleet alongside its huge domestic merchant marine.</li>
  <li><strong>India</strong> — a fast-growing and highly regarded source of officers, particularly engineers, backed by a strong maritime education system in English.</li>
  <li><strong>Indonesia</strong> — a large and expanding supply nation contributing significant numbers of both ratings and officers.</li>
  <li><strong>Eastern Europe and the former Soviet states</strong> — including Ukraine, traditionally a major source of well-trained, experienced officers for the international fleet.</li>
</ul>
<p>Other significant contributors include Myanmar, Vietnam, Turkey and a range of nations across South and East Asia. The map is not static: supply shifts with economics, education investment, currency, and geopolitics.</p>

<h2>Why supply is concentrated</h2>
<p>Several factors explain why maritime labour clusters in particular nations:</p>
<ol>
  <li><strong>Training infrastructure.</strong> Producing a certificated officer requires maritime academies, approved STCW courses, examination systems and cadet berths. Nations that invested early built lasting advantages.</li>
  <li><strong>Economic incentive.</strong> Seafaring wages, paid in hard currency, are highly attractive relative to domestic alternatives in many supply countries — a powerful draw that sustains recruitment.</li>
  <li><strong>Language.</strong> English is the working language of the sea. Countries with strong English-medium maritime education, such as India and the Philippines, hold a structural advantage.</li>
  <li><strong>Culture and continuity.</strong> In established maritime nations, seafaring is a respected, multi-generational career path with deep family and community networks.</li>
</ol>

<h2>The officer shortage and what drives it</h2>
<p>The persistent concern across the industry is the supply of senior officers. The drivers are structural and slow to reverse:</p>
<ul>
  <li><strong>Fleet growth</strong> outpacing the rate at which new officers can be trained and gain the sea time needed for senior certificates.</li>
  <li><strong>An ageing officer population</strong>, with experienced Masters and Chief Engineers retiring faster than replacements reach the management level.</li>
  <li><strong>Specialisation</strong>, as LNG carriers, chemical tankers, offshore units and other complex vessels demand endorsements that take years to build.</li>
  <li><strong>Retention</strong>, with the demands of life at sea, time away from family and shifting career expectations among younger workers all pulling talent ashore.</li>
</ul>

<h2>What this means for shipowners</h2>
<p>For owners, the global supply picture has direct operational consequences, and a sound manning strategy responds to it deliberately:</p>
<ol>
  <li><strong>Diversify sourcing.</strong> Relying on a single nationality concentrates risk; geopolitical events, regulatory changes or currency shifts can disrupt one country overnight. A multi-nation pipeline is more resilient.</li>
  <li><strong>Invest in retention.</strong> Competitive wages, fair MLC-compliant conditions, good rotation and career progression are what keep scarce officers loyal to a fleet rather than its competitors.</li>
  <li><strong>Support cadet development.</strong> Owners and agencies that fund cadet berths and training are building the senior officers of the next decade, not just hiring today's.</li>
  <li><strong>Plan for specialised competence early.</strong> The officers who can crew an LNG carrier or an FPSO are scarce; their availability must be forecast far ahead of need.</li>
</ol>

<h2>The role of the manning agency</h2>
<p>This is precisely where a globally networked manning agency proves its worth. Deep recruitment relationships across multiple supply nations, an understanding of where particular competences are strong, and the ability to forecast availability turn an abstract labour-market challenge into a managed, reliable crew supply. The world has enough seafarers; the skill lies in connecting the right ones, from the right places, to the ships that need them — consistently, compliantly, and ahead of the shortage rather than behind it.</p>
`,
    featured_image: null,
    category: "Industry",
    tag: "Industry",
    read_time: "9 min read",
    status: "published",
    author_name: "Ship Crew Agency",
    author_role: "Maritime Editorial Team",
    meta_title: "Global Seafarer Supply and the Officer Shortage",
    meta_description:
      "Where the world's 1.8 million seafarers come from: major supply nations, the officer shortage, and what the global maritime labour market means for shipowners.",
    views: 1620,
    created_at: "2026-05-05T09:00:00.000Z",
    published_at: "2026-05-05T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Global Seafarer Supply — ZH
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-zh-5",
    language: "zh",
    title: "全球船员供给：世界合格海事劳动力从何而来",
    slug: "global-seafarer-supply",
    excerpt:
      "超过 180 万名船员驾驭着世界船队。本文讲解他们从何而来、全球劳务市场如何演变，以及高级船员短缺对船东意味着什么。",
    content: `
<p>世界商船船队由估计<strong>180 至 190 万名船员</strong>驾驭，这支劳动力几乎来自每一个国家，却集中于少数几个主要劳务输出国。对船东与船队经理而言，了解合格海事劳动力从何而来——以及它在何处正变得稀缺——绝非出于好奇。它直接左右配员成本、人员可得性，以及任何配员策略的韧性。</p>

<h2>全球劳务市场的格局</h2>
<p>海事劳动力大致分为两类：<strong>高级船员</strong>（管理船舶的持证甲板与轮机专业人员）与<strong>普通船员</strong>（操作船舶的技术与辅助人员）。两个市场的表现截然不同。普通船员相对充足；持证高级船员——尤其是资深轮机人员及持有专项签注者——才是真正的瓶颈。多年来，业界机构一直警告：随着船队扩张、现有高级船员老去退出，合格高级船员存在结构性短缺。</p>

<blockquote>短缺的不是愿意出海的人，而是持证、有经验、且资历足够现行有效，能在一艘现代化专业船舶上担任高级值班的人。</blockquote>

<h2>主要劳务输出国</h2>
<p>尽管船员来自全球各地，但少数几个国家供给了劳动力的主体：</p>
<ul>
  <li><strong>菲律宾</strong>——数十年来单一最大的船员来源国，尤以普通船员为甚，拥有庞大的培训体系，以及把航海作为职业的深厚文化。</li>
  <li><strong>中国</strong>——高级船员与普通船员兼具的庞大且持续增长的人才库，在拥有巨大国内商船队的同时，正日益服务于国际船队。</li>
  <li><strong>印度</strong>——高级船员（尤其是轮机人员）增长迅速且广受认可的来源国，背后有以英语为教学语言的强大海事教育体系支撑。</li>
  <li><strong>印度尼西亚</strong>——一个规模庞大且不断扩张的输出国，贡献了数量可观的普通船员与高级船员。</li>
  <li><strong>东欧与前苏联国家</strong>——包括乌克兰，传统上是国际船队训练有素、经验丰富高级船员的重要来源。</li>
</ul>
<p>其他重要贡献者还包括缅甸、越南、土耳其，以及南亚和东亚的一系列国家。这张地图并非一成不变：供给会随经济、教育投入、汇率与地缘政治而变动。</p>

<h2>供给为何如此集中</h2>
<p>有若干因素可以解释海事劳动力为何聚集于特定国家：</p>
<ol>
  <li><strong>培训基础设施。</strong>培养一名持证高级船员，需要海事院校、经认可的 STCW 课程、考试体系与见习生岗位。早早投入的国家，建立起了持久的优势。</li>
  <li><strong>经济激励。</strong>在许多输出国，以硬通货支付的航海薪资，相较国内的其他选择极具吸引力——这是支撑招募的强大引力。</li>
  <li><strong>语言。</strong>英语是海上的工作语言。拥有强大英语教学海事教育的国家，如印度与菲律宾，握有结构性优势。</li>
  <li><strong>文化与传承。</strong>在传统海事国家，航海是一条受人尊敬、世代相传的职业道路，背后有深厚的家庭与社区网络。</li>
</ol>

<h2>高级船员短缺及其成因</h2>
<p>贯穿整个行业的长期忧虑，是高级船员的供给。其成因是结构性的，且难以迅速扭转：</p>
<ul>
  <li><strong>船队增长</strong>，超过了新高级船员能够被培养、并积累担任高级证书所需海上资历的速度。</li>
  <li><strong>高级船员队伍老龄化</strong>，经验丰富的船长与轮机长退休的速度，快于替补者升至管理级的速度。</li>
  <li><strong>专业化</strong>，LNG 运输船、化学品船、海工装置及其他复杂船舶，要求需要数年才能积累的各类签注。</li>
  <li><strong>留任难题</strong>，海上生活的辛劳、长期离家，以及年轻一代职业期望的转变，都在把人才拉向岸上。</li>
</ul>

<h2>这对船东意味着什么</h2>
<p>对船东而言，全球供给格局带来直接的运营后果，而一套稳健的配员策略会有针对性地予以回应：</p>
<ol>
  <li><strong>多元化人才来源。</strong>依赖单一国籍会使风险集中；地缘政治事件、监管变化或汇率波动，可在一夜之间扰乱某一国家。一条多国并行的人才管道更具韧性。</li>
  <li><strong>投入留任。</strong>有竞争力的薪资、符合 MLC 的公平条件、良好的轮换与职业晋升，才是让稀缺高级船员忠于某支船队、而非投奔其竞争对手的关键。</li>
  <li><strong>支持见习生培养。</strong>出资设立见习生岗位与培训的船东和公司，是在打造下一个十年的高级船员，而不仅仅是招用今天的人。</li>
  <li><strong>及早规划专项适任。</strong>能够驾驭 LNG 运输船或 FPSO 的高级船员十分稀缺；其可得性必须远在需求之前就加以预测。</li>
</ol>

<h2>船员管理公司的作用</h2>
<p>这恰恰是一家拥有全球网络的船员管理公司证明其价值之处。横跨多个输出国的深厚招募关系、对各项适任能力在何处更具优势的洞察，以及预测人员可得性的能力，把一项抽象的劳务市场难题，转化为一套受到管理、可靠的船员供给。世界并不缺船员；真正的本事，在于把合适的人，从合适的地方，持续地、合规地、且抢在短缺之前而非落于其后地，对接到需要他们的船舶上。</p>
`,
    featured_image: null,
    category: "行业",
    tag: "行业",
    read_time: "9 分钟阅读",
    status: "published",
    author_name: "环球船员管理",
    author_role: "海事编辑团队",
    meta_title: "全球船员供给与高级船员短缺",
    meta_description:
      "世界 180 万名船员从何而来：主要劳务输出国、高级船员短缺，以及全球海事劳务市场对船东的意义。",
    views: 1280,
    created_at: "2026-05-05T09:00:00.000Z",
    published_at: "2026-05-05T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Maritime Hiring Checklist — EN
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-en-6",
    language: "en",
    title: "Maritime Hiring Checklist: 10 Things to Verify Before Your Crew Joins",
    slug: "maritime-hiring-checklist",
    excerpt:
      "Before any seafarer steps aboard, ten things must be confirmed. This practical checklist helps owners and managers prevent detentions, delays and disputes.",
    content: `
<p>Every detention, crew-change failure and insurance dispute can usually be traced back to something that should have been checked before the seafarer joined — and was not. <strong>Crew onboarding is a verification discipline</strong>, and the cost of getting it wrong is measured in detained ships and lost charter days. This practical checklist covers the ten things a shipowner, fleet manager or superintendent should confirm before any crew member steps across the gangway. Treat it as a gate: nothing missing, nothing assumed.</p>

<h2>Why a checklist beats good intentions</h2>
<p>Under time pressure, even experienced crewing teams skip steps and rely on memory. A formal checklist removes that risk. It converts compliance from something people try to remember into something the system guarantees. The best manning agencies run exactly this kind of gate on every single placement, planned or emergency, because port state control does not grade on effort — only on what is, or is not, valid on the day of inspection.</p>

<blockquote>An owner is never detained for the certificate they checked. They are detained for the one they assumed was fine.</blockquote>

<h2>The 10-point onboarding checklist</h2>
<ol>
  <li><strong>Certificate of Competency, valid for the rank.</strong> Confirm the seafarer holds a current CoC appropriate to the position — Master, Chief Engineer, OOW and so on — within its stated capacity and any limitations.</li>
  <li><strong>Flag State Endorsement for your specific flag.</strong> A foreign CoC is not enough on its own. Verify a valid endorsement recognising it for the vessel's flag state, with an expiry date comfortably beyond the contract.</li>
  <li><strong>STCW basic and specialised training current.</strong> Confirm basic safety training (personal survival, firefighting, first aid, personal safety) plus any vessel-specific modules — tanker, gas, passenger, ECDIS, security — all within their validity.</li>
  <li><strong>ENG1 or equivalent medical fitness.</strong> Verify a valid seafarer medical certificate confirming fitness for the role, including any restrictions, and that it will not expire mid-contract.</li>
  <li><strong>Valid passport and seaman's book.</strong> Check expiry dates with sufficient validity beyond the contract, the necessary blank pages, and a current discharge book recording sea service.</li>
  <li><strong>Visas and joining documents.</strong> Confirm any transit, joining or crew visas for the embarkation country and routing, so the seafarer is not turned back en route to the ship.</li>
  <li><strong>Signed MLC-compliant Seafarer Employment Agreement.</strong> Ensure the SEA is signed before joining, in a language the seafarer understands, with a copy in their possession and terms that meet MLC 2006.</li>
  <li><strong>Verified sea service and references.</strong> Confirm the discharge book and references actually support the claimed rank, vessel type and tonnage — not just that the documents exist.</li>
  <li><strong>Offshore-specific certificates where applicable.</strong> For FPSO, drillship or OSV postings, confirm valid BOSIET and HUET and any installation-specific requirements — without them the worker cannot even board the helicopter.</li>
  <li><strong>Crew matrix and minimum safe manning check.</strong> Confirm that with this seafarer aboard the vessel meets its Minimum Safe Manning Document and the owner's own manning standard, with the right mix of certificates at each level.</li>
  <li><strong>Travel, logistics and join-port confirmation.</strong> Verify flights, port agent, and the realistic joining port and date, accounting for schedule slippage, so the crew change actually converges.</li>
</ol>

<h2>How to use the checklist</h2>
<p>A checklist is only as good as the discipline behind it. A few principles make the difference between a document that protects you and one that gathers dust:</p>
<ul>
  <li><strong>Verify at source, not on photocopies.</strong> Certificates should be checked against issuing administrations wherever possible. A convincing forgery passes a glance but not a database check.</li>
  <li><strong>Watch the expiry, not just the existence.</strong> A certificate that lapses three weeks into a four-month contract is a future detention. Validity must extend safely beyond the tour.</li>
  <li><strong>Match competence to the actual vessel.</strong> Generic qualification is not enough; the endorsements must fit the specific ship type and trade.</li>
  <li><strong>Run it on emergencies too.</strong> The urge to skip steps is strongest exactly when the cost of skipping them is highest. Emergency placements need the gate most of all.</li>
</ul>

<h2>The cost of skipping a step</h2>
<p>Consider what each missed item actually risks. A lapsed endorsement: detention at the next port. An expired medical: an unfit crew member and a possible repatriation. A missing visa: a seafarer turned away at immigration with the ship sailing. An unsigned SEA: an MLC breach detectable by any inspector. A manning gap below the MSMD: a ship that cannot legally sail. None of these are exotic failures — they are the ordinary, preventable ways that crew changes go wrong, and every one is caught by a checklist run honestly.</p>

<h2>Make it the standard, not the exception</h2>
<p>The owners and managers who never make the detention list are not lucky — they are systematic. They apply the same verification gate to every placement, hold their manning agency to it, and refuse to let urgency override it. A good manning partner does not resent this rigour; they build their entire service around it, because a clean compliance record is the most valuable asset a fleet can carry. Verify everything, assume nothing, and let your crew join knowing the ship is ready for them and they are ready for the ship.</p>
`,
    featured_image: null,
    category: "Checklist",
    tag: "Checklist",
    read_time: "8 min read",
    status: "published",
    author_name: "Ship Crew Agency",
    author_role: "Maritime Editorial Team",
    meta_title: "Maritime Hiring Checklist: 10 Crew Onboarding Checks",
    meta_description:
      "A 10-point maritime hiring checklist: CoC, flag endorsement, STCW, ENG1, visas, MLC contract, BOSIET/HUET and safe manning to verify before crew join.",
    views: 2540,
    created_at: "2026-05-22T09:00:00.000Z",
    published_at: "2026-05-22T09:00:00.000Z",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Maritime Hiring Checklist — ZH
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "seed-zh-6",
    language: "zh",
    title: "海事招聘清单：船员登轮前必须核实的 10 件事",
    slug: "maritime-hiring-checklist",
    excerpt:
      "任何船员踏上甲板之前，都有十件事必须确认。这份实用清单帮助船东与管理者防范滞留、延误与纠纷。",
    content: `
<p>每一次滞留、每一回换班失败、每一桩保险纠纷，几乎都能追溯到某件本应在船员登轮前核实、却未曾核实的事。<strong>船员登轮是一门核验的纪律</strong>，而做错的代价，要以被滞留的船舶和损失的租期来计量。这份实用清单，涵盖了船东、船队经理或船舶监督在任何船员跨过舷梯之前应当确认的十件事。请把它当作一道关卡：不缺漏任何一项，不臆断任何一项。</p>

<h2>为何清单胜过良好意愿</h2>
<p>在时间压力下，即便经验丰富的配员团队也会跳过步骤、凭记忆行事。一份正式清单能消除这种风险。它把合规，从人们"努力去记住"之物，变为系统"加以保证"之物。最优秀的船员管理公司，会对每一次派遣——无论有计划还是紧急——都设置正是这样一道关卡，因为港口国监督不会按努力程度打分，只看检查当天哪些有效、哪些无效。</p>

<blockquote>船东从不会因他们核查过的那张证书而被滞留，而是因他们臆断"应该没问题"的那一张。</blockquote>

<h2>十项登轮核验清单</h2>
<ol>
  <li><strong>对应职级的有效适任证书。</strong>确认船员持有与岗位相称的现行 CoC——船长、轮机长、值班高级船员等——并在其载明的职务范围与任何限制之内。</li>
  <li><strong>针对你具体船旗的船旗国签注。</strong>仅凭一张外国 CoC 并不足够。核实存在一份承认该证书、适用于船舶船旗国的有效签注，且有效期从容地超出合同期限。</li>
  <li><strong>现行有效的 STCW 基础与专项培训。</strong>确认基本安全培训（个人求生、消防、急救、个人安全），以及任何船型专属模块——液货船、气体船、客船、ECDIS、保安——均在有效期内。</li>
  <li><strong>ENG1 或同等健康适任证明。</strong>核实一份有效的船员体检证书，确认其适任该岗位（含任何限制），且不会在合同中途到期。</li>
  <li><strong>有效护照与海员证。</strong>核查有效期，确保从容超出合同期限，备有所需空白页，并持有一本如实记录海上资历的现行海员服务簿。</li>
  <li><strong>签证与登轮证件。</strong>确认登轮国家及航线所需的任何过境、登轮或船员签证，使船员不致在前往船舶途中被遣返。</li>
  <li><strong>已签署且符合 MLC 的船员雇佣协议。</strong>确保 SEA 在登轮前签署，以船员能理解的语言书写，本人留存一份，且条款符合 MLC 2006。</li>
  <li><strong>经核验的海上资历与推荐。</strong>确认海员服务簿与推荐确实支持所声称的职级、船型与吨位——而不仅仅是文件存在而已。</li>
  <li><strong>适用情形下的海工专属证书。</strong>对 FPSO、钻井船或海工支持船岗位，确认有效的 BOSIET 与 HUET 及任何设施专属要求——没有它们，人员甚至登不上直升机。</li>
  <li><strong>配员矩阵与最低安全配员核查。</strong>确认这名船员在船后，船舶满足其最低安全配员证书与船东自身的配员标准，且各层级证书搭配正确。</li>
  <li><strong>行程、物流与登轮港确认。</strong>核实航班、港口代理，以及切实可行的登轮港与日期，并预留船期延误余量，使换班确实汇合。</li>
</ol>

<h2>如何使用这份清单</h2>
<p>一份清单的价值，取决于其背后的纪律。以下几条原则，决定了它究竟是一份保护你的文件，还是一份蒙尘的文件：</p>
<ul>
  <li><strong>向来源核验，而非凭复印件。</strong>证书应尽可能向签发主管机关核对。一份逼真的伪造件能蒙混一眼，却过不了数据库核查。</li>
  <li><strong>盯住有效期，而不只是是否存在。</strong>一张在四个月合同第三周就失效的证书，就是一次未来的滞留。有效期必须从容地超出整个任期。</li>
  <li><strong>让适任能力匹配实际船舶。</strong>笼统的资历并不足够；签注必须契合具体船型与航线。</li>
  <li><strong>紧急情况下同样照此执行。</strong>跳过步骤的冲动，恰恰在跳过代价最高之时最为强烈。紧急派遣最需要这道关卡。</li>
</ul>

<h2>跳过一步的代价</h2>
<p>不妨想想，每漏掉一项实际上意味着什么风险。一张失效签注：在下一港被滞留。一张过期体检：一名不适任的船员，以及可能的遣返。一张缺失的签证：船员在移民关口被拒，而船舶照常起航。一份未签署的 SEA：任何检查官都能查出的 MLC 违约。一处低于 MSMD 的配员缺口：一艘无法合法开航的船。这些都不是什么稀奇的失误——它们正是换班出错的那些寻常、本可避免的方式，而每一项，都会被一份如实执行的清单当场拦下。</p>

<h2>让它成为常规，而非例外</h2>
<p>那些从不上滞留名单的船东与管理者，靠的不是运气，而是系统。他们对每一次派遣施以同样的核验关卡，要求其船员管理公司照此执行，并拒绝让紧迫凌驾于其上。一家优秀的配员伙伴，不会对这份严谨心生抵触，反而会围绕它构建起整套服务，因为一份清白的合规记录，是一支船队所能承载的最宝贵资产。核实一切、不臆断任何事，让你的船员在登轮时确知：船已为他们准备就绪，而他们也已为这艘船准备就绪。</p>
`,
    featured_image: null,
    category: "清单",
    tag: "清单",
    read_time: "8 分钟阅读",
    status: "published",
    author_name: "环球船员管理",
    author_role: "海事编辑团队",
    meta_title: "海事招聘清单：船员登轮前 10 项核验",
    meta_description:
      "十项海事招聘清单：CoC、船旗签注、STCW、ENG1、签证、MLC 合同、BOSIET/HUET 与安全配员，船员登轮前逐一核实。",
    views: 1960,
    created_at: "2026-05-22T09:00:00.000Z",
    published_at: "2026-05-22T09:00:00.000Z",
  },
];
