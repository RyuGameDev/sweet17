/**
 * ====================================================================
 * ROMANTIC BIRTHDAY SURPRISE ENGINE (SWEET SEVENTEEN EDITION)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.HBD_CONFIG || {};
  const mobileEffects = window.matchMedia('(max-width: 768px), (pointer: coarse)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentScreen = 'countdown';

  // ------------------------------------------------------------------
  // 1. STAR & AMBIENT CANVAS PARTICLES
  // ------------------------------------------------------------------
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let floatingHearts = [];
  let ambientFrame = null;
  let lastAmbientPaint = 0;

  function resizeCanvas() {
    if (width === window.innerWidth && height === window.innerHeight) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => {
    resizeCanvas();
    syncAmbientAnimation();
  }, { passive: true });
  resizeCanvas();

  // Reuse a small heart sprite instead of drawing its path every frame.
  const heartCanvas = document.createElement('canvas');
  heartCanvas.width = 36;
  heartCanvas.height = 36;
  const hCtx = heartCanvas.getContext('2d');
  hCtx.fillStyle = '#f582ae';
  hCtx.beginPath();
  hCtx.moveTo(18, 29);
  hCtx.bezierCurveTo(9, 21, 3, 14, 3, 9);
  hCtx.bezierCurveTo(3, 4, 8, 3, 18, 10);
  hCtx.bezierCurveTo(28, 3, 33, 4, 33, 9);
  hCtx.bezierCurveTo(33, 14, 27, 21, 18, 29);
  hCtx.fill();

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.alphaChange = (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
      this.isSparkle = Math.random() < 0.22;
      this.sparkleSize = Math.random() * 4 + 2;
    }
    update(step = 1) {
      this.alpha += this.alphaChange * step;
      if (this.alpha <= 0.1 || this.alpha >= 0.9) {
        this.alphaChange = -this.alphaChange;
      }
    }
    draw() {
      ctx.globalAlpha = Math.max(0.1, Math.min(1, this.alpha));
      if (this.isSparkle) {
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 230, 180, ' + this.alpha * 0.8 + ')';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(this.x - this.sparkleSize, this.y);
        ctx.lineTo(this.x + this.sparkleSize, this.y);
        ctx.moveTo(this.x, this.y - this.sparkleSize);
        ctx.lineTo(this.x, this.y + this.sparkleSize);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  class AmbientHeart {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.55 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.25 + 0.1;
    }
    update(step = 1) {
      this.y -= this.speedY * step;
      this.x += this.speedX * step;
      if (this.y < -30) this.reset();
    }
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(heartCanvas, this.x, this.y, this.size, this.size);
    }
  }

  for (let i = 0; i < (mobileEffects.matches ? 48 : 90); i++) stars.push(new Star());
  for (let i = 0; i < (mobileEffects.matches ? 8 : 18); i++) floatingHearts.push(new AmbientHeart());

  function drawAmbient(step = 0) {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => { if (step) s.update(step); s.draw(); });
    floatingHearts.forEach(h => { if (step) h.update(step); h.draw(); });
  }

  function animateCanvas(timestamp) {
    const interval = mobileEffects.matches ? 1000 / 30 : 1000 / 60;
    const elapsed = timestamp - lastAmbientPaint;
    if (elapsed >= interval) {
      drawAmbient(Math.min(elapsed / (1000 / 60), 2));
      lastAmbientPaint = timestamp - (elapsed % interval);
    }
    ambientFrame = requestAnimationFrame(animateCanvas);
  }

  function syncAmbientAnimation() {
    cancelAnimationFrame(ambientFrame);
    ambientFrame = null;
    if (document.hidden) return;
    drawAmbient();
    // The stars remain visible while reading and scrolling; no full-screen repaints.
    const readingOnMobile = mobileEffects.matches && ['letter', 'memories'].includes(currentScreen);
    if (!reducedMotion.matches && !readingOnMobile) {
      lastAmbientPaint = performance.now();
      ambientFrame = requestAnimationFrame(animateCanvas);
    }
  }

  document.addEventListener('visibilitychange', syncAmbientAnimation);
  mobileEffects.addEventListener('change', syncAmbientAnimation);
  reducedMotion.addEventListener('change', syncAmbientAnimation);
  syncAmbientAnimation();

  // ------------------------------------------------------------------
  // 2. AUDIO & MUSIC BADGE CONTROLLER
  // ------------------------------------------------------------------
  const bgAudio = document.getElementById('bg-audio');
  const musicBadge = document.getElementById('music-badge');
  const badgeSongText = document.getElementById('badge-song-text');
  const badgePlayToggle = document.getElementById('badge-play-toggle');
  let audioInitialized = false;

  bgAudio.src = config.musicSrc || 'assets/music.mp3';
  if (config.musicTitle) {
    badgeSongText.textContent = `${config.musicTitle} - ${config.musicArtist || ''}`;
  }

  const svgPlayIcon = `<svg class="badge-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>`;
  const svgPauseIcon = `<svg class="badge-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>`;

  function updatePlayButtonUI(isPlaying) {
    if (isPlaying) {
      musicBadge.classList.add('playing');
      badgePlayToggle.innerHTML = svgPauseIcon;
      badgePlayToggle.setAttribute('aria-label', 'Jeda Musik');
    } else {
      musicBadge.classList.remove('playing');
      badgePlayToggle.innerHTML = svgPlayIcon;
      badgePlayToggle.setAttribute('aria-label', 'Putar Musik');
    }
  }

  function playAudio() {
    bgAudio.play().then(() => {
      updatePlayButtonUI(true);
      audioInitialized = true;
    }).catch(err => {
      console.log('Audio autoplay prevented:', err);
    });
  }

  function pauseAudio() {
    bgAudio.pause();
    updatePlayButtonUI(false);
  }

  function toggleAudio() {
    if (bgAudio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  if (musicBadge) musicBadge.addEventListener('click', toggleAudio);

  function firstInteractionListener() {
    if (!audioInitialized) {
      playAudio();
    }
    document.removeEventListener('click', firstInteractionListener);
    document.removeEventListener('touchstart', firstInteractionListener);
  }
  document.addEventListener('click', firstInteractionListener);
  document.addEventListener('touchstart', firstInteractionListener, { passive: true });

  // ------------------------------------------------------------------
  // 3. SCREEN MANAGER & BUTTON LIQUID LEFT-TO-RIGHT WIPE
  // ------------------------------------------------------------------
  const screens = {
    countdown: document.getElementById('screen-countdown'),
    gift: document.getElementById('screen-gift'),
    cover: document.getElementById('screen-cover'),
    letter: document.getElementById('screen-letter'),
    memories: document.getElementById('screen-memories'),
    video: document.getElementById('screen-video'),
    wishes: document.getElementById('screen-wishes'),
    closing: document.getElementById('screen-closing')
  };

  Object.values(screens).forEach(screen => {
    let scrollIdleTimer;
    screen.addEventListener('scroll', () => {
      if (!mobileEffects.matches) return;
      screen.classList.add('is-scrolling');
      clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => screen.classList.remove('is-scrolling'), 160);
    }, { passive: true });
  });

  // Helper for button click: fills from left to right, then navigates
  function onGlassBtnClick(btn, actionCallback) {
    if (!btn || btn.disabled) return;
    btn.classList.add('clicked');
    setTimeout(() => {
      btn.classList.remove('clicked');
      if (typeof actionCallback === 'function') actionCallback();
    }, 280);
  }

  function goToScreen(screenKey) {
    if (!screens[screenKey]) return;

    if (currentScreen === 'letter' && screenKey !== 'letter') {
      stopTypewriter();
    }
    
    const videoElem = document.getElementById('special-video');
    if (currentScreen === 'video' && videoElem && !videoElem.paused) {
      videoElem.pause();
    }

    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenKey].classList.add('active');
    currentScreen = screenKey;
    screens[screenKey].scrollTop = 0;
    syncAmbientAnimation();

    if (screenKey === 'letter') {
      startTypewriter();
    } else if (screenKey === 'closing') {
      startMorphingTitle();
      triggerConfettiBurst(width / 2, height / 2, 80);
    }
  }

  // ------------------------------------------------------------------
  // 4. SCREEN 1: COUNTDOWN TIMER
  // ------------------------------------------------------------------
  const countDays = document.getElementById('count-days');
  const countHours = document.getElementById('count-hours');
  const countMinutes = document.getElementById('count-minutes');
  const countSeconds = document.getElementById('count-seconds');
  const countdownStatus = document.getElementById('countdown-status');
  const btnCountdown = document.getElementById('btn-countdown');
  let countdownTimer = null;

  if (config.countdownTag) document.getElementById('countdown-tag').textContent = config.countdownTag;
  if (config.countdownTitleLine1) document.getElementById('countdown-title-1').textContent = config.countdownTitleLine1;
  if (config.countdownTitleLine2) document.getElementById('countdown-title-2').textContent = config.countdownTitleLine2;
  if (config.countdownSubtitle) document.getElementById('countdown-subtitle').textContent = config.countdownSubtitle;

  function initCountdown() {
    clearInterval(countdownTimer);

    if (config.countdownMode === 'seconds') {
      let remaining = config.countdownSeconds || 3;
      
      const updateSecondsView = () => {
        countDays.textContent = '00';
        countHours.textContent = '00';
        countMinutes.textContent = '00';
        countSeconds.textContent = String(remaining).padStart(2, '0');

        if (remaining <= 0) {
          clearInterval(countdownTimer);
          onCountdownComplete();
        } else {
          remaining--;
        }
      };

      updateSecondsView();
      countdownTimer = setInterval(updateSecondsView, 1000);

    } else {
      const targetTime = new Date(config.targetDate || '2026-10-10T00:00:00').getTime();

      const updateDateView = () => {
        const now = new Date().getTime();
        const diff = targetTime - now;

        if (diff <= 0) {
          clearInterval(countdownTimer);
          countDays.textContent = '00';
          countHours.textContent = '00';
          countMinutes.textContent = '00';
          countSeconds.textContent = '00';
          onCountdownComplete();
          return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        countDays.textContent = String(d).padStart(2, '0');
        countHours.textContent = String(h).padStart(2, '0');
        countMinutes.textContent = String(m).padStart(2, '0');
        countSeconds.textContent = String(s).padStart(2, '0');
      };

      updateDateView();
      countdownTimer = setInterval(updateDateView, 1000);
    }
  }

  function onCountdownComplete() {
    countdownStatus.textContent = config.countdownReadyText || '🎉 Happy Sweet Seventeen, Sayang! 🎉';
    countdownStatus.style.color = '#ffd166';
    countdownStatus.style.fontWeight = '700';

    btnCountdown.disabled = false;
    btnCountdown.classList.remove('locked');
    btnCountdown.classList.add('glowing-btn');
    btnCountdown.querySelector('.btn-text').textContent = config.countdownOpenButton || '✨ BUKA HADIAH ✨';
  }

  btnCountdown.addEventListener('click', () => {
    onGlassBtnClick(btnCountdown, () => {
      playAudio();
      triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 60);
      goToScreen('gift');
    });
  });

  initCountdown();

  // ------------------------------------------------------------------
  // 5. SCREEN 2: 3D GIFT BOX INTERACTION
  // ------------------------------------------------------------------
  const giftTrigger = document.getElementById('gift-trigger');
  const giftBoxElem = document.getElementById('gift-box-elem');
  let giftOpened = false;

  giftTrigger.addEventListener('click', (e) => {
    if (giftOpened) return;
    giftOpened = true;

    playAudio();
    giftBoxElem.classList.add('wiggle');
    
    setTimeout(() => {
      giftBoxElem.classList.remove('wiggle');
      giftBoxElem.classList.add('open');

      const rect = giftBoxElem.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      triggerConfettiBurst(cx, cy, 90);

      setTimeout(() => {
        goToScreen('cover');
      }, 900);
    }, 450);
  });

  // ------------------------------------------------------------------
  // 6. SCREEN 3: COVER & FLOATING POLAROIDS
  // ------------------------------------------------------------------
  const coverPolaroidsLeft = document.getElementById('cover-polaroids-left');
  const coverPolaroidsRight = document.getElementById('cover-polaroids-right');
  const btnReadLetter = document.getElementById('btn-read-letter');

  if (config.coverTag) document.getElementById('cover-tag').textContent = config.coverTag;
  if (config.coverTitle1) document.getElementById('cover-title-1').textContent = config.coverTitle1;
  if (config.coverTitle2) document.getElementById('cover-title-2').textContent = config.coverTitle2;
  if (config.coverSubtitle) document.getElementById('cover-subtitle').textContent = config.coverSubtitle;
  if (config.coverButton) btnReadLetter.querySelector('.btn-text').textContent = config.coverButton;

  const photos = config.photos || [];
  if (photos.length >= 6) {
    const leftAngles = [-6, 4, -4];
    for (let i = 0; i < 3; i++) {
      const card = document.createElement('div');
      card.className = 'cover-polaroid-item';
      card.style.setProperty('--rot', `${leftAngles[i]}deg`);
      card.style.animationDelay = `${i * 0.8}s`;
      card.innerHTML = `<img src="${photos[i].src}" alt="Memory" loading="lazy" decoding="async">`;
      card.addEventListener('click', () => openLightbox(i));
      coverPolaroidsLeft.appendChild(card);
    }

    const rightAngles = [5, -4, 6];
    for (let i = 3; i < 6; i++) {
      const card = document.createElement('div');
      card.className = 'cover-polaroid-item';
      card.style.setProperty('--rot', `${rightAngles[i - 3]}deg`);
      card.style.animationDelay = `${(i - 3) * 0.9}s`;
      card.innerHTML = `<img src="${photos[i].src}" alt="Memory" loading="lazy" decoding="async">`;
      card.addEventListener('click', () => openLightbox(i));
      coverPolaroidsRight.appendChild(card);
    }
  }

  btnReadLetter.addEventListener('click', () => {
    onGlassBtnClick(btnReadLetter, () => {
      goToScreen('letter');
    });
  });

  // ------------------------------------------------------------------
  // 7. SCREEN 4: TYPEWRITER LOVE LETTER
  // ------------------------------------------------------------------
  const letterTextElem = document.getElementById('letter-text');
  const typingCursor = document.getElementById('typing-cursor');
  const btnToMemories = document.getElementById('btn-to-memories');
  let typewriterActive = false;
  let typewriterInterval = null;

  if (config.letterTitle) document.getElementById('letter-title').textContent = config.letterTitle;
  if (config.letterGreeting) document.getElementById('letter-greeting').textContent = config.letterGreeting;
  if (config.letterButton) document.getElementById('letter-btn-text').textContent = config.letterButton;

  const paragraphs = config.letterParagraphs || [];

  const letterBodyElem = document.querySelector('.letter-body');
  let userManuallyScrolled = false;
  let letterScrollTimer = null;

  if (letterBodyElem) {
    letterBodyElem.addEventListener('scroll', () => {
      const atBottom = letterBodyElem.scrollHeight - letterBodyElem.scrollTop - letterBodyElem.clientHeight < 35;
      userManuallyScrolled = !atBottom;
    }, { passive: true });
  }

  function scrollLetterToBottom() {
    // Follow new text inside the card only; leave the outer page to the reader.
    if (userManuallyScrolled || letterScrollTimer !== null) return;
    letterScrollTimer = setTimeout(() => {
      letterScrollTimer = null;
      if (currentScreen === 'letter' && !userManuallyScrolled) {
        letterBodyElem.scrollTop = letterBodyElem.scrollHeight;
      }
    }, 120);
  }

  function stopTypewriter() {
    clearTimeout(typewriterInterval);
    clearTimeout(letterScrollTimer);
    typewriterInterval = null;
    letterScrollTimer = null;
    typewriterActive = false;
  }

  function startTypewriter() {
    if (typewriterActive) return;
    typewriterActive = true;
    userManuallyScrolled = false;
    if (letterBodyElem) letterBodyElem.scrollTop = 0;
    letterTextElem.innerHTML = '';
    typingCursor.style.display = 'inline-block';

    if (reducedMotion.matches) {
      finishTypewriter();
      return;
    }

    let pIndex = 0;
    let charIndex = 0;
    let currentP = document.createElement('p');
    let currentText = document.createTextNode('');
    currentP.appendChild(currentText);
    letterTextElem.appendChild(currentP);

    function typeChar() {
      if (currentScreen !== 'letter') return;
      if (pIndex >= paragraphs.length) {
        finishTypewriter();
        return;
      }

      const pText = paragraphs[pIndex];
      if (charIndex < pText.length) {
        currentText.appendData(pText[charIndex]);
        charIndex++;
        scrollLetterToBottom();
        const char = pText[charIndex - 1];
        let delay = 32;
        if (char === '.' || char === '!' || char === '?') delay = 220;
        else if (char === ',') delay = 100;
        typewriterInterval = setTimeout(typeChar, delay);
      } else {
        pIndex++;
        charIndex = 0;
        if (pIndex < paragraphs.length) {
          currentP = document.createElement('p');
          currentText = document.createTextNode('');
          currentP.appendChild(currentText);
          letterTextElem.appendChild(currentP);
          scrollLetterToBottom();
          typewriterInterval = setTimeout(typeChar, 300);
        } else {
          finishTypewriter();
        }
      }
    }

    typeChar();
  }

  function finishTypewriter() {
    clearTimeout(typewriterInterval);
    letterTextElem.innerHTML = '';
    paragraphs.forEach(p => {
      const pElem = document.createElement('p');
      pElem.textContent = p;
      letterTextElem.appendChild(pElem);
    });
    typingCursor.style.display = 'none';
    btnToMemories.classList.add('glowing-btn');
    scrollLetterToBottom();
  }

  btnToMemories.addEventListener('click', () => {
    onGlassBtnClick(btnToMemories, () => {
      goToScreen('memories');
    });
  });

  // ------------------------------------------------------------------
  // 8. SCREEN 5: POLAROID MEMORIES GALLERY & BIRTHDAY STICKERS
  // ------------------------------------------------------------------
  const polaroidGrid = document.getElementById('polaroid-grid');
  const btnToVideo = document.getElementById('btn-to-video');

  if (config.memoriesTitle) document.getElementById('memories-title').textContent = config.memoriesTitle;
  if (config.memoriesSubtitle) document.getElementById('memories-subtitle').textContent = config.memoriesSubtitle;
  if (config.memoriesButton) document.getElementById('memories-btn-text').textContent = config.memoriesButton;

  const tiltAngles = [-2.2, 2.5, -1.8, 2, 1.8, -2.5, 1.5, -1.8];
  const polaroidObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { root: screens.memories, threshold: 0.05 })
    : null;
  const stickers = [
    { main: 'assets/stickers/balloons.svg', mainPos: 'top-left', sub: 'assets/stickers/gift.svg', subPos: 'bottom-right' },
    { main: 'assets/stickers/cake.svg', mainPos: 'top-right', sub: 'assets/stickers/party_hat.svg', subPos: 'bottom-left' },
    { main: 'assets/stickers/sweet17.svg', mainPos: 'top-left', sub: 'assets/stickers/popper.svg', subPos: 'bottom-right' },
    { main: 'assets/stickers/ribbon_bow.svg', mainPos: 'top-right', sub: 'assets/stickers/cupcake.svg', subPos: 'bottom-left' },
    { main: 'assets/stickers/party_hat.svg', mainPos: 'top-left', sub: 'assets/stickers/balloons.svg', subPos: 'bottom-right' },
    { main: 'assets/stickers/gift.svg', mainPos: 'top-right', sub: 'assets/stickers/sweet17.svg', subPos: 'bottom-left' },
    { main: 'assets/stickers/cake.svg', mainPos: 'top-left', sub: 'assets/stickers/ribbon_bow.svg', subPos: 'bottom-right' },
    { main: 'assets/stickers/popper.svg', mainPos: 'top-right', sub: 'assets/stickers/cupcake.svg', subPos: 'bottom-left' }
  ];

  photos.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.setProperty('--tilt', `${tiltAngles[idx % tiltAngles.length]}deg`);
    
    const st = stickers[idx % stickers.length];

    card.innerHTML = `
      <div class="polaroid-tape"></div>
      <div class="polaroid-sticker-wrapper pos-${st.mainPos}">
        <img src="${st.main}" class="bday-sticker-img" alt="Birthday Decoration" loading="lazy">
      </div>
      <div class="polaroid-sticker-wrapper pos-${st.subPos}">
        <img src="${st.sub}" class="bday-sticker-img" alt="Birthday Decoration" loading="lazy">
      </div>
      <div class="polaroid-photo-box">
        <img src="${photo.src}" alt="${photo.caption || 'Memory'}" loading="lazy" decoding="async">
      </div>
      <div class="polaroid-caption">${photo.caption || 'Sweet Memory 🤍'}</div>
    `;

    card.addEventListener('click', () => openLightbox(idx));
    polaroidGrid.appendChild(card);
    if (polaroidObserver) polaroidObserver.observe(card);
    else card.classList.add('is-visible');
  });

  btnToVideo.addEventListener('click', () => {
    onGlassBtnClick(btnToVideo, () => {
      goToScreen('video');
    });
  });

  // ------------------------------------------------------------------
  // 9. SCREEN 6: CUSTOM VIDEO PLAYER WITH SOUND SYNC
  // ------------------------------------------------------------------
  const specialVideo = document.getElementById('special-video');
  const btnBigPlay = document.getElementById('btn-big-play');
  const btnVPlayPause = document.getElementById('btn-v-playpause');
  const vProgressTrack = document.getElementById('v-progress-track');
  const vProgressBar = document.getElementById('v-progress-bar');
  const vCurrentTime = document.getElementById('v-current-time');
  const vDuration = document.getElementById('v-duration');
  const btnVMute = document.getElementById('btn-v-mute');
  const btnVFullscreen = document.getElementById('btn-v-fullscreen');
  const videoWrapper = document.getElementById('video-wrapper');
  const btnToWishes = document.getElementById('btn-to-wishes');

  if (config.videoTitle) document.getElementById('video-title').textContent = config.videoTitle;
  if (config.videoSubtitle) document.getElementById('video-subtitle').textContent = config.videoSubtitle;
  if (config.videoButton) document.getElementById('video-btn-text').textContent = config.videoButton;
  if (config.videoSrc) specialVideo.src = config.videoSrc;

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${String(sec).padStart(2, '0')}`;
  }

  function togglePlayVideo() {
    if (specialVideo.paused) {
      specialVideo.play();
    } else {
      specialVideo.pause();
    }
  }

  btnBigPlay.addEventListener('click', togglePlayVideo);
  btnVPlayPause.addEventListener('click', togglePlayVideo);
  specialVideo.addEventListener('click', togglePlayVideo);

  specialVideo.addEventListener('play', () => {
    btnBigPlay.classList.add('hidden');
    btnVPlayPause.textContent = '⏸';
    pauseAudio();
  });

  specialVideo.addEventListener('pause', () => {
    btnBigPlay.classList.remove('hidden');
    btnVPlayPause.textContent = '▶';
    playAudio();
  });

  specialVideo.addEventListener('ended', () => {
    btnBigPlay.classList.remove('hidden');
    btnVPlayPause.textContent = '▶';
    playAudio();
  });

  specialVideo.addEventListener('timeupdate', () => {
    if (specialVideo.duration) {
      const pct = (specialVideo.currentTime / specialVideo.duration) * 100;
      vProgressBar.style.width = `${pct}%`;
      vCurrentTime.textContent = formatTime(specialVideo.currentTime);
      vDuration.textContent = formatTime(specialVideo.duration);
    }
  });

  specialVideo.addEventListener('loadedmetadata', () => {
    vDuration.textContent = formatTime(specialVideo.duration);
  });

  vProgressTrack.addEventListener('click', (e) => {
    const rect = vProgressTrack.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    specialVideo.currentTime = pos * specialVideo.duration;
  });

  btnVMute.addEventListener('click', () => {
    specialVideo.muted = !specialVideo.muted;
    btnVMute.textContent = specialVideo.muted ? '🔇' : '🔊';
  });

  btnVFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  });

  btnToWishes.addEventListener('click', () => {
    onGlassBtnClick(btnToWishes, () => {
      goToScreen('wishes');
    });
  });

  // ------------------------------------------------------------------
  // 10. SCREEN 7: BIRTHDAY WISHES & HEART BURSTS
  // ------------------------------------------------------------------
  const wishesCard = document.getElementById('wishes-card');
  const wishesTextElem = document.getElementById('wishes-text');
  const btnToClosing = document.getElementById('btn-to-closing');

  if (config.wishesTitle) document.getElementById('wishes-title').textContent = config.wishesTitle;
  if (config.wishesSubtitle) document.getElementById('wishes-subtitle').textContent = config.wishesSubtitle;
  if (config.wishesText) wishesTextElem.textContent = config.wishesText;
  if (config.wishesButton) document.getElementById('wishes-btn-text').textContent = config.wishesButton;

  wishesCard.addEventListener('click', (e) => {
    const emojis = ['🤍', '💖', '✨', '🌸', '🕊️', '💐', '🎂', '🎈'];
    const heart = document.createElement('div');
    heart.className = 'floating-click-heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1600);
  });

  btnToClosing.addEventListener('click', () => {
    onGlassBtnClick(btnToClosing, () => {
      goToScreen('closing');
    });
  });

  // ------------------------------------------------------------------
  // 11. SCREEN 8: FINAL CLOSING & MORPHING TITLE
  // ------------------------------------------------------------------
  const morphTitleElem = document.getElementById('morph-title');
  const btnReplay = document.getElementById('btn-replay');
  let morphActive = false;

  if (config.closingMessage1) document.getElementById('closing-msg-1').textContent = config.closingMessage1;
  if (config.closingMessage2) document.getElementById('closing-msg-2').textContent = config.closingMessage2;
  if (config.closingSignature) document.getElementById('closing-signature').textContent = config.closingSignature;
  if (config.replayButton) document.getElementById('replay-btn-text').textContent = config.replayButton;

  const titles = config.closingTitles || ["Happy Sweet 17 ✨", "Happy Birthday 🤍", "With All My Love 💖", "Always & Forever 🕊️"];
  let titleIndex = 0;

  function startMorphingTitle() {
    if (morphActive) return;
    morphActive = true;
    titleIndex = 0;

    function morphNext() {
      if (currentScreen !== 'closing') {
        morphActive = false;
        return;
      }

      morphTitleElem.style.opacity = '0';
      setTimeout(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        morphTitleElem.textContent = titles[titleIndex];
        morphTitleElem.style.opacity = '1';
        setTimeout(morphNext, 2800);
      }, 500);
    }

    setTimeout(morphNext, 2500);
  }

  btnReplay.addEventListener('click', () => {
    onGlassBtnClick(btnReplay, () => {
      giftOpened = false;
      giftBoxElem.classList.remove('open');
      typewriterActive = false;
      initCountdown();
      goToScreen('countdown');
    });
  });

  // ------------------------------------------------------------------
  // 12. LIGHTBOX MODAL
  // ------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let activeLightboxIndex = 0;

  function openLightbox(index) {
    if (!photos[index]) return;
    activeLightboxIndex = index;
    lightboxImg.src = photos[index].src;
    lightboxCaption.textContent = photos[index].caption || '';
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    activeLightboxIndex = (activeLightboxIndex - 1 + photos.length) % photos.length;
    openLightbox(activeLightboxIndex);
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    activeLightboxIndex = (activeLightboxIndex + 1) % photos.length;
    openLightbox(activeLightboxIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
    }
  });

  // ------------------------------------------------------------------
  // 13. CONFETTI BURST GENERATOR
  // ------------------------------------------------------------------
  function triggerConfettiBurst(originX, originY, count = 75) {
    if (reducedMotion.matches) return;
    if (mobileEffects.matches) count = Math.min(count, 40);
    const colors = ['#f582ae', '#9d71e8', '#ffd166', '#ffffff', '#ff7597', '#ffe3a8'];
    const confettiPieces = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      confettiPieces.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
        alpha: 1,
        gravity: 0.22,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '999';
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    document.body.appendChild(confettiCanvas);

    const cCtx = confettiCanvas.getContext('2d');

    function renderConfetti() {
      cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let alive = false;

      confettiPieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          alive = true;
          cCtx.save();
          cCtx.globalAlpha = p.alpha;
          cCtx.translate(p.x, p.y);
          cCtx.rotate((p.rotation * Math.PI) / 180);
          cCtx.fillStyle = p.color;
          cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          cCtx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(renderConfetti);
      } else {
        confettiCanvas.remove();
      }
    }

    requestAnimationFrame(renderConfetti);
  }
});
