// =====================================================
//  ✏️ 你可以在这里改成自己的内容
// =====================================================
const CONFIG = {
  herName: "宝贝",              // 女朋友的称呼，比如 "小猪猪"、"亲爱的"
  myName: "你的男朋友",          // 你的署名
  plan: [                        // 约会安排（随便改）
    "🕑 下午两点我来接你",
    "🍰 先去吃甜品",
    "🎬 然后看一场电影",
    "🌙 晚上一起吃好吃的晚餐",
  ],
  // 这里直接用你已经放进 images/ 的图片文件；如果只有一张图，就一起复用
  images: {
    ask: "images/lulu1.jpeg",
    sad: "images/lulu1.jpeg",
    happy: "images/lulu1.jpeg",
  },
};

// 她每次想按「不要」，按钮上的字会变
const NO_TEXTS = [
  "不要",
  "真的不要吗？",
  "再想想嘛 🥺",
  "噜噜要哭了…",
  "按不到的啦～",
  "别挣扎啦 😝",
  "卡皮巴拉不同意！",
  "你逃不掉的 💕",
  "乖，按左边那个",
];

// 副标题也跟着变
const SUBTITLES = [
  "噜噜在等你的回答 🍊",
  "诶？手滑了吧？",
  "噜噜的心碎了一点点 💔",
  "噜噜开始泡温泉疗伤了 ♨️",
  "「好呀」按钮越来越大了喔～",
  "只剩一个选项了呢 😌",
];

// =====================================================
//  卡皮巴拉（没放图片时用这个画出来的）
// =====================================================
function capySVG(withHeart = false) {
  return `
<svg class="capy" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  ${withHeart ? `<path d="M168 40 c-6-10-22-6-20 6 c2 9 20 18 20 18 s18-9 20-18 c2-12-14-16-20-6z" fill="#fb6f92"/>` : ""}
  <!-- 头上的橘子 -->
  <path d="M100 22 q8-12 18-8 q-6 10-18 8z" fill="#7bc67b"/>
  <circle cx="100" cy="40" r="17" fill="#ffa94d"/>
  <circle cx="94" cy="34" r="4" fill="#ffd8a8"/>
  <!-- 耳朵 -->
  <ellipse cx="58" cy="66" rx="11" ry="9" fill="#a86f45"/>
  <ellipse cx="142" cy="66" rx="11" ry="9" fill="#a86f45"/>
  <!-- 身体 -->
  <ellipse cx="100" cy="118" rx="74" ry="66" fill="#c8915f"/>
  <ellipse cx="74" cy="182" rx="14" ry="8" fill="#a86f45"/>
  <ellipse cx="126" cy="182" rx="14" ry="8" fill="#a86f45"/>
  <!-- 腮红 -->
  <ellipse cx="56" cy="124" rx="12" ry="7" fill="#ff9fb5" opacity=".75"/>
  <ellipse cx="144" cy="124" rx="12" ry="7" fill="#ff9fb5" opacity=".75"/>
  <!-- 开心的眼睛 -->
  <g class="face-happy">
    <circle cx="72" cy="100" r="7" fill="#3b2416"/>
    <circle cx="128" cy="100" r="7" fill="#3b2416"/>
    <circle cx="74.5" cy="97.5" r="2.3" fill="#fff"/>
    <circle cx="130.5" cy="97.5" r="2.3" fill="#fff"/>
  </g>
  <!-- 难过的眼睛 -->
  <g class="face-sad" fill="none" stroke="#3b2416" stroke-width="4" stroke-linecap="round">
    <path d="M64 102 q8 -7 16 0"/>
    <path d="M120 102 q8 -7 16 0"/>
    <path d="M62 88 l16 -6"/>
    <path d="M138 88 l-16 -6"/>
  </g>
  <!-- 眼泪 -->
  <g class="tears" fill="#8fd3ff">
    <ellipse cx="68" cy="112" rx="4" ry="6"/>
    <ellipse cx="132" cy="112" rx="4" ry="6"/>
  </g>
  <!-- 鼻子 -->
  <ellipse cx="100" cy="134" rx="38" ry="27" fill="#a8754b"/>
  <ellipse cx="89" cy="126" rx="5" ry="3.5" fill="#5a3a24"/>
  <ellipse cx="111" cy="126" rx="5" ry="3.5" fill="#5a3a24"/>
  <!-- 嘴巴 -->
  <path class="face-happy" d="M90 145 q5 6 10 0 q5 6 10 0" fill="none" stroke="#5a3a24" stroke-width="3" stroke-linecap="round"/>
  <path class="face-sad" d="M90 151 q10 -8 20 0" fill="none" stroke="#5a3a24" stroke-width="3" stroke-linecap="round"/>
</svg>`;
}

// =====================================================
//  工具函数
// =====================================================
function nextSaturday() {
  const d = new Date();
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function imageExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

const $ = (id) => document.getElementById(id);

// =====================================================
//  初始化
// =====================================================
const saturday = nextSaturday();
$("title").textContent = `${CONFIG.herName}，这个星期六（${saturday}）可以跟我约会吗？`;
$("subtitle").textContent = SUBTITLES[0];
$("capy-svg-holder").innerHTML = capySVG();
$("capy-svg-holder-happy").innerHTML = capySVG(true);

const hasImg = { ask: false, sad: false, happy: false };
(async () => {
  for (const key of Object.keys(hasImg)) {
    hasImg[key] = await imageExists(CONFIG.images[key]);
  }
  if (hasImg.ask) {
    $("capy-img").src = CONFIG.images.ask;
    $("capy-img").hidden = false;
    $("capy-svg-holder").hidden = true;
  }
  if (hasImg.happy) {
    $("capy-img-happy").src = CONFIG.images.happy;
    $("capy-img-happy").hidden = false;
    $("capy-svg-holder-happy").hidden = true;
  }
})();

// =====================================================
//  「不要」按钮：永远按不到
// =====================================================
const yesBtn = $("yes-btn");
const noBtn = $("no-btn");
let noCount = 0;

function overlaps(a, b, pad = 20) {
  return !(a.right + pad < b.left || a.left - pad > b.right ||
           a.bottom + pad < b.top || a.top - pad > b.bottom);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function keepNoButtonOnScreen() {
  if (!noBtn.classList.contains("running")) return;

  const margin = 12;
  const w = noBtn.offsetWidth || 120;
  const h = noBtn.offsetHeight || 52;
  const maxX = Math.max(margin, window.innerWidth - w - margin);
  const maxY = Math.max(margin, window.innerHeight - h - margin);
  const currentLeft = Number.parseFloat(noBtn.style.left) || noBtn.getBoundingClientRect().left;
  const currentTop = Number.parseFloat(noBtn.style.top) || noBtn.getBoundingClientRect().top;

  noBtn.style.left = `${clamp(currentLeft, margin, maxX)}px`;
  noBtn.style.top = `${clamp(currentTop, margin, maxY)}px`;
}

function moveNoButton() {
  noCount++;

  // 换文字
  noBtn.textContent = NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)];
  $("subtitle").textContent = SUBTITLES[Math.min(noCount, SUBTITLES.length - 1)];

  // 「好呀」按钮越来越大
  const scale = Math.min(1 + noCount * 0.15, 2.2);
  yesBtn.style.transform = `scale(${scale})`;

  // 卡皮巴拉变难过
  const capy = document.querySelector("#capy-svg-holder .capy");
  capy.classList.add("sad");
  if (noCount >= 3) capy.classList.add("crying");
  if (hasImg.sad) {
    $("capy-img").src = CONFIG.images.sad;
    $("capy-img").hidden = false;
    $("capy-svg-holder").hidden = true;
  }

  // 第一次逃跑前先固定在当前位置，这样动画是从原地跑开的
  if (!noBtn.classList.contains("running")) {
    const r = noBtn.getBoundingClientRect();
    noBtn.style.left = `${r.left}px`;
    noBtn.style.top = `${r.top}px`;
    noBtn.classList.add("running");
    noBtn.getBoundingClientRect(); // 强制重排，让过渡生效
  }

  // 随机找一个不和「好呀」按钮重叠、也不和当前位置太近的地方
  const margin = 12;
  const w = noBtn.offsetWidth;
  const h = noBtn.offsetHeight;
  const maxX = Math.max(margin, window.innerWidth - w - margin);
  const maxY = Math.max(margin, window.innerHeight - h - margin);
  const yesRect = yesBtn.getBoundingClientRect();
  const cur = noBtn.getBoundingClientRect();

  let x, y;
  for (let i = 0; i < 50; i++) {
    x = margin + Math.random() * Math.max(maxX - margin, 0);
    y = margin + Math.random() * Math.max(maxY - margin, 0);
    const rect = { left: x, top: y, right: x + w, bottom: y + h };
    const farEnough = Math.hypot(x - cur.left, y - cur.top) > 120;
    if (!overlaps(rect, yesRect) && farEnough) break;
  }

  x = clamp(x, margin, maxX);
  y = clamp(y, margin, maxY);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  keepNoButtonOnScreen();
}

window.addEventListener("resize", keepNoButtonOnScreen);

// 电脑：鼠标一靠近就跑
noBtn.addEventListener("mouseenter", moveNoButton);
// 手机：手指一碰就跑（阻止后续的 click）
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });
// 万一还是点到了（比如用键盘），也只是跑掉，绝不拒绝 😏
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// =====================================================
//  「好呀」按钮
// =====================================================
yesBtn.addEventListener("click", (e) => {
  burstHearts(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
  noBtn.remove();
  $("ask-page").hidden = true;
  $("yes-page").hidden = false;

  $("date-line").textContent = `${saturday}（星期六），${CONFIG.herName}的时间就交给我啦！`;
  $("plan-list").innerHTML = CONFIG.plan.map((p) => `<li>${p}</li>`).join("");
  $("sign-line").textContent = `—— 爱你的 ${CONFIG.myName} & 噜噜 🍊`;

  heartRate = 120; // 爱心下得更猛
  for (let i = 0; i < 4; i++) {
    setTimeout(() => burstHearts(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.6), 300 + i * 350);
  }
});

// =====================================================
//  爱心特效
// =====================================================
const HEARTS = ["💖", "💕", "💗", "💓", "🩷", "🍊"];
let heartRate = 450;

function spawnFallingHeart() {
  const el = document.createElement("span");
  el.className = "float-heart";
  el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
  el.style.left = `${Math.random() * 100}vw`;
  el.style.fontSize = `${14 + Math.random() * 22}px`;
  el.style.animationDuration = `${5 + Math.random() * 5}s`;
  $("hearts-bg").appendChild(el);
  el.addEventListener("animationend", () => el.remove());
  setTimeout(spawnFallingHeart, heartRate);
}
spawnFallingHeart();

function burstHearts(x, y) {
  for (let i = 0; i < 24; i++) {
    const el = document.createElement("span");
    el.className = "burst-heart";
    el.textContent = HEARTS[i % HEARTS.length];
    const angle = (Math.PI * 2 * i) / 24;
    const dist = 100 + Math.random() * 120;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${18 + Math.random() * 16}px`;
    el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}
