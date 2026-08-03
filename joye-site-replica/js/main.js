/* 复刻 joyehuang.me 的交互逻辑（原创实现） */

/* ---------- 主题切换（localStorage 持久化 + 系统偏好） ---------- */
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
})();

document.getElementById('toggle-theme').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});

/* ---------- 移动端菜单 ---------- */
const navMenu = document.getElementById('nav-menu');
document.getElementById('toggle-menu').addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

/* ---------- 导航栏滚动阴影 ---------- */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ---------- 交互式终端 ---------- */
const shell = document.getElementById('terminal');
const output = document.getElementById('wt-output');
const input = document.getElementById('wt-input');

const FS = {
  '~': ['blog/', 'projects/', 'about.txt', 'contact.txt'],
  '/blog': ['hello-agent.md', 'interview-notes.md', 'mock-interview.md'],
  '/projects': ['project-alpha', 'project-beta'],
};

const COMMANDS = {
  help: () => `Available commands:
  help              show this message
  about             who am I
  ls [dir]          list files  (~, /blog, /projects)
  cat <file>        read a file (about.txt, contact.txt)
  theme             toggle dark / light
  clear             clear the screen
  exit              collapse the terminal`,
  about: () => `Your Name — builder & lifelong learner.
Focus: AI Agent products / full-stack dev.
Motto: Build fast, learn faster.`,
  theme: () => { document.getElementById('toggle-theme').click(); return 'theme toggled ✔'; },
  clear: () => { output.innerHTML = ''; return null; },
  exit: () => { shell.classList.add('collapsed'); return null; },
};

function runCommand(raw) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  if (!cmd) return '';
  if (cmd === 'ls') {
    const dir = args[0] || '~';
    return FS[dir] ? FS[dir].join('   ') : `ls: ${dir}: No such directory`;
  }
  if (cmd === 'cat') {
    const f = args[0] || '';
    if (f === 'about.txt') return COMMANDS.about();
    if (f === 'contact.txt') return 'email: hi@example.com · github: @yourname';
    return `cat: ${f}: No such file`;
  }
  if (COMMANDS[cmd]) return COMMANDS[cmd]();
  return `${cmd}: command not found — type 'help'`;
}

function printLine(text, cls) {
  if (text == null) return;
  const div = document.createElement('div');
  if (cls) div.className = cls;
  div.textContent = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

shell.addEventListener('click', () => {
  if (shell.classList.contains('collapsed')) {
    shell.classList.remove('collapsed');
    setTimeout(() => input.focus(), 50);
  }
});
input.addEventListener('click', e => e.stopPropagation());

input.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const raw = input.value;
  printLine(`you@mysite ~ $ ${raw}`, 'cmd-echo');
  printLine(runCommand(raw));
  input.value = '';
});

/* 按 ` 键快速打开终端 */
document.addEventListener('keydown', e => {
  if (e.key === '`' && document.activeElement !== input) {
    e.preventDefault();
    shell.classList.remove('collapsed');
    input.focus();
  }
});

/* ---------- 打字机（左下角弹窗） ---------- */
const typeTarget = document.getElementById('typewriter');
const typeText = '组队进行中，欢迎围观，说不定还有第二届 😄';
let typeIdx = 0;
(function type() {
  if (typeIdx <= typeText.length) {
    typeTarget.textContent = typeText.slice(0, typeIdx++);
    setTimeout(type, 70);
  }
})();

/* ---------- 弹窗关闭 / 延迟弹出 ---------- */
const popout = document.getElementById('popout');
setTimeout(() => popout.classList.remove('hidden'), 1200);
document.getElementById('popout-close').addEventListener('click', () => {
  popout.classList.add('hidden');
});

/* ---------- 底部 Quote 轮播 ---------- */
const QUOTES = [
  'Stay hungry, stay foolish.',
  'Build fast, learn faster.',
  '先跑起来，再跑得好。',
  'The best way to learn is to ship.',
];
const quoteEl = document.getElementById('quote-text');
let qi = 0;
quoteEl.textContent = QUOTES[0];
setInterval(() => {
  qi = (qi + 1) % QUOTES.length;
  quoteEl.textContent = QUOTES[qi];
}, 4000);

/* ---------- 语言切换（占位演示） ---------- */
document.getElementById('toggle-lang').addEventListener('click', () => {
  const html = document.documentElement;
  html.lang = html.lang === 'zh-CN' ? 'en' : 'zh-CN';
  // 实际站点会跳转到 /en 路由，这里仅切换 lang 属性作演示
});
