// 保证背景图片足够多，自动补足以填满横向空间
const galleryRow = document.getElementById('galleryRow');
function fillGalleryRow() {
  const minWidth = window.innerWidth * 1.2;
  while (galleryRow.scrollWidth < minWidth) {
    for (let i = 0; i < galleryRow.children.length; i++) {
      const clone = galleryRow.children[i].cloneNode(true);
      galleryRow.appendChild(clone);
      if (galleryRow.scrollWidth > minWidth) break;
    }
  }
  // 新增：克隆一遍所有图片到末尾，实现无缝滚动
  const count = galleryRow.children.length;
  for(let i=0; i<count; i++) {
    const clone = galleryRow.children[i].cloneNode(true);
    galleryRow.appendChild(clone);
  }
}
fillGalleryRow();
let scrollX = 0;
const speed = 0.4; // 调整速度
const totalWidth = galleryRow.scrollWidth / 2;
function animateGallery() {
  scrollX += speed;
  if (scrollX >= totalWidth) {
    scrollX = 0; // 无缝重置
  }
  galleryRow.style.transform = `translateX(${-scrollX}px)`;
  requestAnimationFrame(animateGallery);
}
animateGallery();

// ------------------ 其余动效 ------------------
// 跳跃功能词切换（黄色背景，逐字跳跃）
const featureWords = [
  "一键启动", "卡片管理", "模组管理", "插件管理", "进阶功能", "高级功能"
];
let featureIdx = 0;
let featureWordBg = document.getElementById('feature-word-bg');
let featureWordInner = document.getElementById('feature-word-inner');
function setFeatureWord(word) {
  featureWordInner.innerHTML = '';
  for(let i=0;i<word.length;i++) {
    const span = document.createElement('span');
    span.className = 'feature-word-char';
    span.textContent = word[i];
    featureWordInner.appendChild(span);
  }
}
setFeatureWord(featureWords[0]);
function jumpFeatureWord(nextWord) {
  const oldChars = featureWordInner.querySelectorAll('.feature-word-char');
  // 跳出旧字
  oldChars.forEach((char, i) => {
    setTimeout(()=>{ char.classList.add('jump'); }, i*40);
  });
  setTimeout(()=>{
    setFeatureWord(nextWord);
    // 跳入新字
    const newChars = featureWordInner.querySelectorAll('.feature-word-char');
    newChars.forEach((char, i) => {
      char.classList.add('jump');
      setTimeout(()=>{ char.classList.remove('jump'); }, 120 + i*40);
    });
  }, oldChars.length*40+120);
}
setInterval(()=>{
  featureIdx = (featureIdx+1)%featureWords.length;
  jumpFeatureWord(featureWords[featureIdx]);
}, 2000);

// AOS滚动动效初始化（每次进入都有效果）
AOS.init({
  once: false,
  duration: 900,
  offset: 80,
  easing: 'ease-out-cubic'
});

// 下载按钮下拉
const downloadBtn = document.getElementById('download-btn');
const downloadDropdown = document.getElementById('download-dropdown');
downloadBtn.onclick = function(e) {
  e.stopPropagation();
  downloadDropdown.classList.toggle('show');
};
document.addEventListener('click', function(e) {
  if(downloadDropdown.classList.contains('show')) {
    downloadDropdown.classList.remove('show');
  }
});
downloadDropdown.onclick = function(e) {
  e.stopPropagation();
};

// 回到顶部按钮
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
  if(window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.onclick = function() {
  window.scrollTo({top:0, behavior:'smooth'});
};

// 代码雨动画（增加鼠标悬停浪漫爱心520效果，并联动左侧文案）
function startMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.parentElement.offsetWidth;
  let h = canvas.parentElement.offsetHeight;
  canvas.width = w;
  canvas.height = h;
  let fontSize = Math.max(14, Math.floor(w/32));
  let columns = Math.floor(w / fontSize);
  let drops = [];
  for(let x=0;x<columns;x++) drops[x]=1;
  let normalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%#@!*&abcdefghijklmnopqrstuvwxyz'.split('');
  let loveChars = ['5','2','0','❤','♥','love','520','LOVE'];
  let useLove = false;
  function draw() {
    ctx.fillStyle = "rgba(16,19,26,0.18)";
    ctx.fillRect(0,0,w,h);
    for(let i=0;i<drops.length;i++) {
      let text = useLove
        ? loveChars[Math.floor(Math.random()*loveChars.length)]
        : normalChars[Math.floor(Math.random()*normalChars.length)];
      ctx.font = fontSize+"px monospace";
      ctx.fillStyle = useLove
        ? `hsl(${330+Math.random()*30}, 80%, ${60+Math.random()*20}%)`
        : `hsl(${120+Math.random()*120}, 70%, ${60+Math.random()*20}%)`;
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);
      if(drops[i]*fontSize > h && Math.random()>0.96) drops[i]=0;
      drops[i]++;
    }
  }
  let matrixTimer = setInterval(draw, 50);
  const optimizeDesc = document.getElementById('optimize-desc');
  const loveDesc = document.getElementById('love-desc');
  const optimizeTitle = document.getElementById('optimize-title');
  const optimizeSection = document.getElementById('optimize');
  let optimizeTitleOrigin = optimizeTitle.textContent;
  let optimizeTitleLove = "只为与你共赴星辰大海";
  function animateTitleChange(newText, addLoveClass) {
    optimizeTitle.classList.remove('optimize-title-animate-in');
    optimizeTitle.classList.add('optimize-title-animate-out');
    setTimeout(() => {
      optimizeTitle.textContent = newText;
      if (addLoveClass) {
        optimizeTitle.classList.add('optimize-title-love');
      } else {
        optimizeTitle.classList.remove('optimize-title-love');
      }
      optimizeTitle.classList.remove('optimize-title-animate-out');
      optimizeTitle.classList.add('optimize-title-animate-in');
    }, 400);
  }
  const optimizeDescOrigin = optimizeDesc.textContent;
  let optimizeDescLove = "每一行代码都注入了浪漫与热爱，只为与你共赴星辰大海。";
  function animateDescChange(newText, isPink = false) {
    const optimizeDesc = document.getElementById('optimize-desc');
    if (!optimizeDesc) return;
    optimizeDesc.style.transition = 'all 0.4s cubic-bezier(.23,1.12,.32,1)';
    optimizeDesc.style.opacity = 0;
    optimizeDesc.style.transform = 'translateY(20px) scale(0.95)';
    setTimeout(() => {
      optimizeDesc.textContent = newText;
      if (isPink) {
        optimizeDesc.classList.add('text-pink-400','font-semibold');
      } else {
        optimizeDesc.classList.remove('text-pink-400','font-semibold');
      }
      optimizeDesc.style.opacity = 1;
      optimizeDesc.style.transform = 'translateY(0) scale(1)';
    }, 400);
  }
  // 樱花飘落特效
  let sakuraInstance = null;
  canvas.addEventListener('mouseenter', ()=>{
    useLove = true;
    if(optimizeDesc && loveDesc) {
      optimizeDesc.classList.add('hidden');
      loveDesc.classList.remove('hidden');
    }
    animateTitleChange(optimizeTitleLove, true);
    animateDescChange(optimizeDescLove, true);
    // 启动樱花
    if (!sakuraInstance) {
      sakuraInstance = new Sakura('#optimize', {
        className: 'sakura-falling',
        zIndex: 1,
        maxSize: 18,
        minSize: 10,
        fallSpeed: 1.2,
        delay: 300
      });
    }
  });
  canvas.addEventListener('mouseleave', ()=>{
    useLove = false;
    if(optimizeDesc && loveDesc) {
      optimizeDesc.classList.remove('hidden');
      loveDesc.classList.add('hidden');
    }
    animateTitleChange(optimizeTitleOrigin, false);
    animateDescChange(optimizeDescOrigin, false);
    // 停止樱花
    if (sakuraInstance) {
      sakuraInstance.stop();
      sakuraInstance = null;
    }
  });
  window.addEventListener('resize', ()=>{
    clearInterval(matrixTimer);
    setTimeout(startMatrix, 200);
  }, {once:true});
}
setTimeout(startMatrix, 400);

window.addEventListener('DOMContentLoaded', () => {
  const optimizeDesc = document.getElementById('optimize-desc');
  if (optimizeDesc) {
    optimizeDesc.style.opacity = 0;
    optimizeDesc.style.transform = 'translateY(20px) scale(0.95)';
    setTimeout(() => {
      optimizeDesc.style.transition = 'all 0.6s cubic-bezier(.23,1.12,.32,1)';
      optimizeDesc.style.opacity = 1;
      optimizeDesc.style.transform = 'translateY(0) scale(1)';
    }, 100);
  }
});

// ---- 最新更新百分比计数动画（仅滚动到板块时触发） ----
function animateCount(el, target, duration = 2200, decimals = 2) {
  let start = 0;
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    let progress = Math.min((ts - startTime) / duration, 1);
    let value = start + (target - start) * progress;
    el.textContent = value.toFixed(decimals);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toFixed(decimals);
    }
  }
  requestAnimationFrame(step);
}
let countAnimated = false;
function setupCountObserver() {
  const updateSection = document.getElementById('update');
  if (!updateSection) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countAnimated) {
        countAnimated = true;
        animateCount(document.getElementById('count-fix'), 69.25);
        animateCount(document.getElementById('count-update'), 77.72);
        animateCount(document.getElementById('count-feature'), 75.21);
        animateCount(document.getElementById('count-feedback'), 100.00);
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 }); // 30%可见时触发
  observer.observe(updateSection);
}
window.addEventListener('DOMContentLoaded', setupCountObserver);

// 资源集成板块图标自动高亮轮播
(function(){
  const icons = document.querySelectorAll('.integration-icons .icon-item');
  if (!icons.length) return;
  let activeIdx = 0;
  let timer = null;
  let paused = false;
  function setActive(idx) {
    icons.forEach((el, i) => {
      if(i === idx) el.classList.add('active');
      else el.classList.remove('active');
    });
  }
  function nextActive() {
    if (paused) return;
    activeIdx = (activeIdx + 1) % icons.length;
    setActive(activeIdx);
  }
  // 初始高亮第一个
  setActive(activeIdx);
  timer = setInterval(nextActive, 1500);
  icons.forEach((el, i) => {
    el.addEventListener('mouseenter', () => {
      paused = true;
      setActive(i);
    });
    el.addEventListener('mouseleave', () => {
      paused = false;
      setActive(activeIdx);
    });
  });
})(); 