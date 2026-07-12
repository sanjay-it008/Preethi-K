/* ---------- preloader: premium PK loading screen, shown on every load/refresh ---------- */
document.body.classList.add('is-loading');
const preloaderEl = document.getElementById('preloader');
const plFillEl = document.getElementById('plProgressFill');
const plPercentEl = document.getElementById('plPercent');
const plRingFillEl = document.getElementById('plRingFill');
const plParticleWrap = document.getElementById('plParticles');

/* self-contained particles inside the loading screen */
for(let i=0;i<26;i++){
  const p=document.createElement('div');
  p.className='pl-particle';
  p.style.left=Math.random()*100+'vw';
  p.style.top=Math.random()*100+'%';
  p.style.animationDuration=(6+Math.random()*10)+'s';
  p.style.animationDelay=(Math.random()*4)+'s';
  p.style.opacity=Math.random()*0.6+0.25;
  plParticleWrap.appendChild(p);
}

/* set up the circular glowing ring loader */
let plRingCirc = 0;
if(plRingFillEl){
  const r = plRingFillEl.r.baseVal.value;
  plRingCirc = 2 * Math.PI * r;
  plRingFillEl.style.strokeDasharray = plRingCirc;
  plRingFillEl.style.strokeDashoffset = plRingCirc;
}

const LOAD_DURATION = 2600;   // core fill duration
const HOLD_AT_FULL = 150;     // brief pause once it hits 100%
const FADE_DURATION = 550;    // smooth fade-out into the site  => total ~2.5-3s

function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

const loaderStart = performance.now();
function tickLoader(now){
  const raw = Math.min(1, (now - loaderStart) / LOAD_DURATION);
  const eased = easeOutCubic(raw);
  const pct = Math.round(eased * 100);
  plFillEl.style.width = pct + '%';
  plPercentEl.textContent = pct;
  if(plRingFillEl) plRingFillEl.style.strokeDashoffset = plRingCirc * (1 - eased);

  if(raw < 1){
    requestAnimationFrame(tickLoader);
  } else {
    setTimeout(finishLoading, HOLD_AT_FULL);
  }
}
requestAnimationFrame(tickLoader);

function finishLoading(){
  preloaderEl.classList.add('hidden');
  document.body.classList.remove('is-loading');
  startHeroReveal();
  setTimeout(()=>{ preloaderEl.style.display = 'none'; }, FADE_DURATION);
}

lucide.createIcons();

/* ---------- cursor glow ---------- */
const glow=document.getElementById('cursor-glow');
document.addEventListener('mousemove',e=>{
  glow.style.left=e.clientX+'px';
  glow.style.top=e.clientY+'px';
});

/* ---------- particles ---------- */
const pWrap=document.getElementById('particles');
for(let i=0;i<40;i++){
  const p=document.createElement('div');
  p.className='particle';
  p.style.left=Math.random()*100+'vw';
  p.style.animationDuration=(8+Math.random()*14)+'s';
  p.style.animationDelay=(Math.random()*10)+'s';
  p.style.opacity=Math.random()*0.6+0.2;
  pWrap.appendChild(p);
}

/* ---------- scroll progress ---------- */
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const pct=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  document.getElementById('progress').style.width=pct+'%';
});

/* ---------- mobile nav ---------- */
const burger=document.getElementById('burger');
const navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

/* ---------- typing effect ---------- */
const roles=["Software Test Engineer","Automation Test Engineer","Playwright Automation Engineer","QA Engineer"];
let ri=0,ci=0,deleting=false;
const typedEl=document.getElementById('typed');
function typeLoop(){
  const word=roles[ri];
  if(!deleting){
    ci++;
    typedEl.textContent=word.slice(0,ci);
    if(ci===word.length){deleting=true;setTimeout(typeLoop,1400);return;}
  }else{
    ci--;
    typedEl.textContent=word.slice(0,ci);
    if(ci===0){deleting=false;ri=(ri+1)%roles.length;}
  }
  setTimeout(typeLoop,deleting?45:90);
}
/* typing starts only once the hero role-line is revealed (see startHeroReveal) */

/* ---------- letter-by-letter name animation ---------- */
function animateHeroName(h1){
  const gradSpan = h1.querySelector('.grad');
  if(!gradSpan || h1.dataset.lettersReady) return;
  h1.dataset.lettersReady = '1';

  // grab the leading plain text node, e.g. "Hi, I'm "
  const leadingNode = h1.firstChild;
  const plainText = leadingNode && leadingNode.nodeType === Node.TEXT_NODE ? leadingNode.textContent : '';
  const nameText = gradSpan.textContent;

  const plainWrap = document.createElement('span');
  plainWrap.className = 'letters-plain';
  let delayStep = 0;
  const STEP = 0.035;
  [...plainText].forEach(ch=>{
    const s = document.createElement('span');
    s.className = 'letter';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = (delayStep).toFixed(3) + 's';
    delayStep += STEP;
    plainWrap.appendChild(s);
  });
  if(leadingNode) h1.removeChild(leadingNode);
  h1.insertBefore(plainWrap, gradSpan);

  gradSpan.textContent = '';
  const letters = [...nameText];
  letters.forEach((ch,i)=>{
    const s = document.createElement('span');
    s.className = 'letter';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = (delayStep).toFixed(3) + 's';
    delayStep += STEP;
    s.style.backgroundImage = 'var(--grad)';
    s.style.webkitBackgroundClip = 'text';
    s.style.backgroundClip = 'text';
    s.style.color = 'transparent';
    s.style.backgroundSize = (letters.length * 100) + '% 100%';
    s.style.backgroundPosition = (letters.length <= 1 ? 0 : (i/(letters.length-1))*100) + '% 0';
    gradSpan.appendChild(s);
  });
}

/* ---------- avatar mouse-tilt effect ---------- */
const avatarEntranceEl = document.getElementById('avatarEntrance');
if(avatarEntranceEl){
  avatarEntranceEl.addEventListener('mousemove', e=>{
    const rect = avatarEntranceEl.getBoundingClientRect();
    const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / (rect.width/2);
    const dy = (e.clientY - cy) / (rect.height/2);
    const maxTilt = 12;
    avatarEntranceEl.style.setProperty('--tiltX', (dx*maxTilt).toFixed(2)+'deg');
    avatarEntranceEl.style.setProperty('--tiltY', (-dy*maxTilt).toFixed(2)+'deg');
  });
  avatarEntranceEl.addEventListener('mouseleave', ()=>{
    avatarEntranceEl.style.setProperty('--tiltX','0deg');
    avatarEntranceEl.style.setProperty('--tiltY','0deg');
  });
}

/* ---------- cinematic hero reveal sequence, triggered once the loader finishes ---------- */
function startHeroReveal(){
  const eyebrow = document.getElementById('heroEyebrow');
  const h1 = document.getElementById('heroName');
  const roleLine = document.getElementById('heroRoleLine');
  const desc = document.getElementById('heroDesc');
  const contactItems = document.querySelectorAll('#heroContacts .item');
  const buttons = document.querySelectorAll('#heroButtons .btn');
  const avatarEntrance = document.getElementById('avatarEntrance');
  const badges = document.querySelectorAll('.float-badge');

  // 1. Available badge — slide down, fade, glow
  setTimeout(()=>{ eyebrow.classList.add('in'); }, 0);

  // 2. Name — slide in + letter-by-letter
  setTimeout(()=>{
    h1.classList.add('in');
    animateHeroName(h1);
  }, 300);

  // 3. Typing animation starts
  setTimeout(()=>{
    roleLine.classList.add('in');
    typeLoop();
  }, 900);

  // 4. Description — fades in from left, 0.4s after typing starts
  setTimeout(()=>{ desc.classList.add('in'); }, 900 + 400);

  // 5. Contact info — one after another from the left
  setTimeout(()=>{
    contactItems.forEach((item,i)=>{
      setTimeout(()=>item.classList.add('in'), i*150);
    });
  }, 1700);

  // 6. Buttons — scale up with glow
  setTimeout(()=>{
    buttons.forEach((btn,i)=>{
      setTimeout(()=>btn.classList.add('in'), i*130);
    });
  }, 2150);

  // Profile image — starts ~1s after hero text begins, slides from right, fades, zooms in
  setTimeout(()=>{
    if(!avatarEntrance) return;
    avatarEntrance.classList.add('in');
    setTimeout(()=>avatarEntrance.classList.add('floaty'), 900);
  }, 1000);

  // Floating badges — appear after the profile image, then float
  setTimeout(()=>{
    badges.forEach((b,i)=>{
      setTimeout(()=>{
        b.classList.add('in');
        setTimeout(()=>b.classList.add('floaty'), 650);
      }, i*300);
    });
  }, 2000);
}

/* (reveal + counter observers are set up at the end of this script, after all
    dynamically-generated cards exist in the DOM) */

/* ---------- data: skills ---------- */
const skills=["Manual Testing","Automation Testing","Playwright","JavaScript","SQL","API Testing","Regression Testing","Smoke Testing","Sanity Testing","Integration Testing","Performance Testing","Database Testing","UAT","JIRA","Azure DevOps","Burp Suite","Agile","STLC","SDLC","XPath","Test Case Design","End-to-End Testing"];
const skillsGrid=document.getElementById('skillsGrid');
skills.forEach(s=>{
  const d=document.createElement('div');
  d.className='skill-card glass reveal';
  d.innerHTML=`<span class="skill-dot"></span><span>${s}</span>`;
  skillsGrid.appendChild(d);
});

/* ---------- data: projects ---------- */
const projects=[
  {name:"Yellowstone",tag:"Asset Management",icon:"warehouse",tags:["POS","Inventory","Hotel Management","Employee Scheduling","Azure DevOps"]},
  {name:"RubiCube",tag:"AI Analytics Platform",icon:"brain-circuit",tags:["Predictive Analytics","Data Warehouse","ETL Validation","Business Intelligence"]},
  {name:"Metaproteins",tag:"E-commerce Platform",icon:"shopping-cart",tags:["Android","iOS","Tablet Testing","JIRA"]},
  {name:"Statfin",tag:"FinTech",icon:"landmark",tags:["CPV","RCU","Role Based Access","Workflow Testing"]},
  {name:"PayIn",tag:"Payment Collection",icon:"credit-card",tags:["Dashboard","Reports","Analytics"]},
  {name:"Apex",tag:"EdTech",icon:"graduation-cap",tags:["Education Loan","Institute Portal","Admin Module"]},
];
const projectGrid=document.getElementById('projectGrid');
projects.forEach((p,i)=>{
  const d=document.createElement('div');
  d.className='project-card glass reveal';
  d.innerHTML=`<div class="phead"><div class="pnum">0${i+1}</div><div class="project-icon"><i data-lucide="${p.icon}"></i></div></div>
  <h3>${p.name}</h3><span class="ptag">${p.tag}</span>
  <div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>`;
  d.addEventListener('mousemove',e=>{
    const r=d.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    d.style.transform=`perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;
  });
  d.addEventListener('mouseleave',()=>{ d.style.transform='none'; });
  projectGrid.appendChild(d);
});

/* ---------- data: tools & technologies (resume-grounded only) ---------- */
const tools=[
  {name:"Playwright",icon:"drama"},
  {name:"JavaScript",icon:"braces"},
  {name:"SQL",icon:"database"},
  {name:"JIRA",icon:"clipboard-list"},
  {name:"Azure DevOps",icon:"infinity"},
  {name:"Burp Suite",icon:"shield-alert"},
  {name:"Agile",icon:"workflow"},
  {name:"STLC",icon:"list-checks"},
  {name:"SDLC",icon:"git-merge"},
  {name:"API Testing",icon:"webhook"},
  {name:"Database Testing",icon:"server"},
  {name:"RTM",icon:"file-check"},
];
const toolsTrack=document.getElementById('toolsTrackA');
tools.forEach(t=>{
  const d=document.createElement('div');
  d.className='tool-pill glass';
  d.innerHTML=`<span class="ic-box"><i data-lucide="${t.icon}"></i></span><span>${t.name}</span>`;
  toolsTrack.appendChild(d);
});

/* ---------- data: testing expertise ---------- */
const expertise=[
  {icon:"clipboard-check",title:"Manual Testing",desc:"Experienced in Functional, Smoke, Sanity, Regression, Integration, User Acceptance (UAT), Performance, and Database Testing."},
  {icon:"bot",title:"Automation Testing",desc:"Hands-on experience with Playwright and JavaScript for End-to-End Web Automation."},
  {icon:"webhook",title:"API Testing",desc:"Experience validating APIs, backend responses, business logic, and application workflows."},
  {icon:"database",title:"Database Testing",desc:"Skilled in SQL queries and database validation to ensure data accuracy and integrity."},
  {icon:"list-checks",title:"Test Management",desc:"Strong understanding of STLC, SDLC, Test Case Design, Defect Life Cycle, Requirement Traceability Matrix (RTM), and Agile methodologies."},
  {icon:"shield-alert",title:"Security & QA Tools",desc:"Experience using JIRA, Azure DevOps, Burp Suite, SQL, and Playwright for testing and defect tracking."},
];
const expertiseGrid=document.getElementById('expertiseGrid');
expertise.forEach(e=>{
  const d=document.createElement('div');
  d.className='expertise-card glass reveal';
  d.innerHTML=`<div class="expertise-icon"><i data-lucide="${e.icon}"></i></div><h3>${e.title}</h3><p>${e.desc}</p>`;
  expertiseGrid.appendChild(d);
});

/* ---------- data: key achievements ---------- */
const achievements=[
  {type:"counter", target:3, suffix:"+", label:"Years of Professional Experience"},
  {type:"counter", target:2, suffix:"", label:"Companies Worked At"},
  {type:"counter", target:6, suffix:"+", label:"Enterprise Projects Delivered"},
  {type:"text", icon:"layers", text:"Experience in FinTech, E-Commerce, Asset Management, EdTech, Analytics, and Payment Applications"},
  {type:"text", icon:"bot", text:"Manual & Automation Testing Specialist"},
  {type:"text", icon:"git-branch", text:"Strong knowledge of STLC, SDLC, Agile, SQL, API Testing, and Playwright"},
];
const achieveGrid=document.getElementById('achieveGrid');
achievements.forEach(a=>{
  const d=document.createElement('div');
  d.className='achieve-card glass reveal';
  if(a.type==='counter'){
    d.innerHTML=`<div class="achieve-badge"><i data-lucide="check"></i></div>
    <div><span class="num counter" data-target="${a.target}" data-suffix="${a.suffix}">0</span><p>${a.label}</p></div>`;
  }else{
    d.innerHTML=`<div class="achieve-badge"><i data-lucide="${a.icon}"></i></div>
    <div class="title-only">${a.text}</div>`;
  }
  achieveGrid.appendChild(d);
});

/* ---------- data: testing process (horizontal animated timeline) ---------- */
const processSteps=["Requirement Analysis","Test Planning","Test Case Design","Test Execution","Bug Reporting","Regression Testing","Final Validation"];
const processTrack=document.getElementById('processTrack');
processSteps.forEach((step,i)=>{
  const d=document.createElement('div');
  d.className='process-step reveal';
  d.style.transitionDelay=(i*0.12)+'s';
  d.innerHTML=`<div class="process-dot">${i+1}</div><span class="label">${step}</span>`;
  processTrack.appendChild(d);
});

/* ---------- contact form: opens a real, prefilled email ---------- */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const inputs = this.querySelectorAll('input, textarea');
  const name = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const subject = inputs[2].value.trim();
  const message = inputs[3].value.trim();

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:preethivairu05@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(body)}`;

  const status=document.getElementById('formStatus');
  status.textContent='✓ Opening your email app with this message filled in...';
  status.style.display='block';

  window.location.href = mailto;
  this.reset();
  setTimeout(()=>status.style.display='none',6000);
});

/* ---------- reveal on scroll (set up now that all dynamic cards exist) ---------- */
const revealEls=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
},{threshold:0.1});
revealEls.forEach(el=>io.observe(el));

/* ---------- counters ---------- */
const counters=document.querySelectorAll('.counter');
const cio=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const el=en.target, target=+el.dataset.target, suffix=el.dataset.suffix||'';
      let cur=0; const step=Math.max(1,target/50);
      const t=setInterval(()=>{
        cur+=step;
        if(cur>=target){cur=target;clearInterval(t);}
        el.textContent=Math.floor(cur)+suffix;
      },30);
      cio.unobserve(el);
    }
  });
},{threshold:0.5});
counters.forEach(c=>cio.observe(c));

lucide.createIcons();
