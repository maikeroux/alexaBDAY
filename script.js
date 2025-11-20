const messages = [
  "You make everyone smile!",
  "You’re the best friend ever!",
  "Keep shining!",
  "You bring joy wherever you go!",
  "Your laughter is contagious!",
  "You deserve all the happiness!",
  "Life is brighter with you!",
  "You’re one of a kind!",
  "Thanks for being you!",
];

const totalBalloons = 12;
let poppedCount = 0;

const gameContainer = document.getElementById("game-container");
const messageBox = document.getElementById("message");
const duckSound = document.getElementById("duck-sound");
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

// Unlock audio on first interaction
window.addEventListener("click", () => {
  duckSound.play().catch(() => {});
  bgMusic.play().catch(() => {});
}, { once: true });

// Toggle music
musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "🔇 Music";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🔊 Music";
  }
});

// Show message
function showMessage(text) {
  messageBox.textContent = text;
  messageBox.style.display = "block";
  setTimeout(() => (messageBox.style.display = "none"), 2500);
}

// Confetti
function createConfetti(x, y) {
  for (let i = 0; i < 20; i++) {
    const c = document.createElement("div");
    c.classList.add("confetti");
    c.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    c.style.left = x + "px";
    c.style.top = y + "px";
    c.style.animationDuration = 1 + Math.random() + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1500);
  }
}

// POP HANDLER
function handlePop(e, duck) {
  e.preventDefault();
  duckSound.currentTime = 0;
  duckSound.play();

  const touchX = e.touches ? e.touches[0].clientX : e.clientX;
  const touchY = e.touches ? e.touches[0].clientY : e.clientY;

  createConfetti(touchX, touchY);
  showMessage(duck.dataset.message);

  duck.remove();
  poppedCount++;

  if (poppedCount === totalBalloons) {
    showMessage("🎉 HAPPY BIRTHDAY!!! 🎉");
  }
}

// SPAWN DUCKS
function spawnDucks() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  for (let i = 0; i < totalBalloons; i++) {
    const duck = document.createElement("div");
    duck.classList.add("duck-balloon");

    let size = Math.max(vw * 0.08, 55);
    size = Math.min(size, 120);
    duck.style.width = duck.style.height = size + "px";

    const safeX = Math.random() * (vw - size - 20);
    const safeY = Math.random() * (vh - size - 20);
    duck.style.left = safeX + "px";
    duck.style.top = safeY + "px";

    duck.dataset.message = messages[i % messages.length];

    // FLOATING
    let yPos = safeY;
    let speed = 0.4 + Math.random() * 0.6;
    let floatOffset = Math.random() * 10;
    let direction = 1;

    function floatDuck() {
      yPos -= speed;
      if (yPos < -size) yPos = vh + size;
      duck.style.top = yPos + floatOffset + "px";

      floatOffset += direction * 0.25;
      if (floatOffset > 10 || floatOffset < -10) direction *= -1;

      requestAnimationFrame(floatDuck);
    }
    floatDuck();

    duck.addEventListener("click", (e) => handlePop(e, duck));
    duck.addEventListener("touchstart", (e) => handlePop(e, duck), { passive: false });

    gameContainer.appendChild(duck);
  }
}

spawnDucks();

window.addEventListener("resize", () => {
  document.querySelectorAll(".duck-balloon").forEach(d => d.remove());
  poppedCount = 0;
  spawnDucks();
});
