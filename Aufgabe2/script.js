document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hauptaufgabe: Scheiben-Animation ---
    const diskSprite = document.getElementById('disk-sprite');
    const totalFrames = 8;
    const frameWidth = 150;
    let currentFrame = 0;
    
    let isAutoPlaying = false;
    let autoInterval = null;

    function updateDiskFrame() {
        diskSprite.style.backgroundPosition = `-${currentFrame * frameWidth}px 0px`;
    }

    function nextFrame() {
        currentFrame = (currentFrame + 1) % totalFrames;
        updateDiskFrame();
    }

    function prevFrame() {
        currentFrame = (currentFrame - 1 + totalFrames) % totalFrames;
        updateDiskFrame();
    }

    // Manuelle Steuerung (Buttons)
    document.getElementById('btn-right').addEventListener('click', nextFrame);
    document.getElementById('btn-left').addEventListener('click', prevFrame);

    // Automatische Animation (Erweiterung 2)
    function toggleAutoPlay() {
        isAutoPlaying = !isAutoPlaying;
        const btnAuto = document.getElementById('btn-auto');
        
        if (isAutoPlaying) {
            autoInterval = setInterval(nextFrame, 100); // 100ms pro Frame
            btnAuto.textContent = 'Stoppen (a)';
            btnAuto.classList.add('btn-primary');
        } else {
            clearInterval(autoInterval);
            autoInterval = null;
            btnAuto.textContent = 'Auto An/Aus (a)';
            btnAuto.classList.remove('btn-primary');
        }
    }

    document.getElementById('btn-auto').addEventListener('click', toggleAutoPlay);

    // Tastatursteuerung (HCI-Anforderung)
    window.addEventListener('keydown', (event) => {
        // Verhindern, dass Standard-Scrollverhalten bei Pfeiltasten greift falls nötig, 
        // hier speziell gefordert für 'l', 'r' und 'a'
        const key = event.key.toLowerCase();
        
        if (key === 'l') {
            prevFrame();
        } else if (key === 'r') {
            nextFrame();
        } else if (key === 'a') {
            toggleAutoPlay();
        }
    });

    // --- 2. Erweiterung 1: Zweites Objekt (z.B. kleiner Animationstakt) ---
    const bunnySprite = document.getElementById('bunny-sprite');
    let bunnyFrame = 0;
    const bunnyTotalFrames = 8;
    let bunnyInterval = null;
    let bunnyActive = true;

    function startBunnyAnimation() {
        bunnyInterval = setInterval(() => {
            bunnyFrame = (bunnyFrame + 1) % bunnyTotalFrames;
            bunnySprite.style.backgroundPosition = `-${bunnyFrame * frameWidth}px 0px`;
        }, 150);
    }

    startBunnyAnimation();

    document.getElementById('btn-bunny-toggle').addEventListener('click', () => {
        if (bunnyActive) {
            clearInterval(bunnyInterval);
            bunnyActive = false;
        } else {
            startBunnyAnimation();
            bunnyActive = true;
        }
    });
});
