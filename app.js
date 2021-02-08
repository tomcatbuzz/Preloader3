import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const colors = ["#ffc000", "#ff3b3b", "#ff8400"];
const bubbles = 50;

const render = (particles, ctx, width, height) => {
  requestAnimationFrame(() => render(particles, ctx, width, height));
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p, i) => {
    p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180);
    p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180);

    p.opacity -= 0.01;
    p.speed *= p.friction;
    p.radius *= p.friction;
    p.yVel += p.gravity;
    p.y += p.yVel;

    if (p.opacity < 0 || p.radius < 0) return;

    ctx.beginPath();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  });

  return ctx;
};

const r = (a, b, c) =>
  parseFloat(
    (Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(
      c ? c : 0
    )
  );

// document
//   .querySelector(".hover")
//   .addEventListener("mouseover", (e) => explode(e.pageX, e.pageY));

function exploder(x, y) {
  
    let particles = [];
    let ratio = window.devicePixelRatio;
    let c = document.createElement("canvas");
    let ctx = c.getContext("2d");
  
    c.style.position = "absolute";
    c.style.left = x - 100 + "px";
    c.style.top = y - 100 + "px";
    c.style.pointerEvents = "none";
    c.style.width = 200 + "px";
    c.style.height = 200 + "px";
    c.style.zIndex = 100;
    c.width = 200 * ratio;
    c.height = 200 * ratio;
    document.body.appendChild(c);
  
    for (var i = 0; i < bubbles; i++) {
      particles.push({
        x: c.width / 2,
        y: c.height / 2,
        radius: r(20, 30),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: r(0, 360, true),
        speed: r(8, 12),
        friction: 0.9,
        opacity: r(0, 0.5, true),
        yVel: 0,
        gravity: 0.1,
      });
    }
  
    render(particles, ctx, c.width, c.height);
    setTimeout(() => document.body.removeChild(c), 1000);
}

var split = new SplitText('.hover', {type: "chars,words,lines", position: "absolute"});
//now animate each character into place from 100px above, fading in:
gsap.from(split.chars, {duration: 0.5, y: 100, autoAlpha: 0, stagger: 0.05});
//or animate each word
// gsap.from(split.words, {duration: 1, x: 200, autoAlpha: 0, ease: "elastic", stagger: 0.05});
//or animate each line
// gsap.from(split.lines, {duration: 1, x: 200, autoAlpha: 0, ease: "power3", stagger: 0.05});

const right = document.querySelector('.right');
const left = document.querySelector('.left');
const loader = document.querySelector('.loader');
const content = document.querySelector('.content')

gsap.fromTo(right, 
  { x: 250 }, 
  { x: 0,
  duration: 1.2, 
  rotation: -360,
  ease: 'power4.inOut'
})

gsap.fromTo(left, 
  { x: -250 },
  { x: 0,
  duration: 1.2,
  rotation: 360,
  ease: 'power4.inOut',
  onComplete: exploder
})

gsap.fromTo(loader, 
  { yPercent: 0 },
  { yPercent: -100,
  delay: 2,
  duration: 1,
  ease: 'power1.out'
})

gsap.fromTo(content, 
  { yPercent: 100 },
  { yPercent: 0,
  delay: 1.5,
  duration: 1,
  ease: 'power1.in'
})

