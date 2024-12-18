const codeInput = document.getElementById('code-input');
const landingPage = document.getElementById('landing-page');
const wrongPage = document.getElementById('wrong-page');
const mainContent = document.getElementById('main-content');
const timeDisplay = document.getElementById('current-time-display');
const wrongSound = new Audio('audio/wrong_code.mp3');
const welcomeSound = new Audio('audio/welcome.mp3');
const zer0sMenuSound = document.getElementById('audio');
const soundWarning = document.getElementById('sound-warning');
const terminalB = document.getElementById('terminal');
const enterButton = document.getElementById('enter-button');

let currentAudio = null;
let welcomePlayed = false;

// Helper: Check if an audio is currently playing
function isAudioPlaying(audio) {
    return !audio.paused;
}

// Helper: Setup audio to reset `currentAudio` when it ends
function setupAudio(audio) {
    audio.addEventListener('ended', () => {
        currentAudio = null;
    });
}

// Play the welcome sound only on Enter button click
enterButton.addEventListener('click', () => {
    if (!welcomePlayed) {
        welcomeSound.play()
            .then(() => {
                welcomePlayed = true;
                currentAudio = welcomeSound;
                setupAudio(welcomeSound);
            })
            .catch((error) => console.error('Error playing welcome audio:', error));
    }
});

// Function to get the current time and date as a 4-digit code
function getCurrentTimeCode() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const dateDisplay = `${month}/${day}/${year}`;
    const timeDisplay = `${hours}:${minutes}`;
    return {
        code: hours + minutes,
        display: `${dateDisplay} ${timeDisplay}`
    };
}

// Update time display and correct code
function updateTime() {
    const { code, display } = getCurrentTimeCode();
    correctCode = code;
    timeDisplay.textContent = `Zer0S Dev // Journey Log: ${display}`;
}

// Automatically fetch the correct code and update the display
let correctCode = getCurrentTimeCode().code;
updateTime();

// Refresh the time display every minute
setInterval(updateTime, 60000);

// Stop all currently playing audio
function stopAllAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

// Handle correct code entry
function handleCorrectCode() {
    stopAllAudio();

    landingPage.style.transform = 'translateX(-100vw)';
    setTimeout(() => {
        landingPage.classList.add('hidden');
        mainContent.style.display = 'flex';
        wrongSound.pause();

        if (!isAudioPlaying(zer0sMenuSound)) {
            zer0sMenuSound.play()
                .catch((err) => {
                    console.warn('Audio playback blocked for Zer0S menu:', err);
                    soundWarning.style.display = 'block';
                });
            currentAudio = zer0sMenuSound;
            setupAudio(zer0sMenuSound);

            // Show terminal after 5 seconds delay
            setTimeout(() => {
                terminalB.style.display = 'block';
                setTimeout(() => terminalB.classList.add('visible'), 10);
            }, 15000); // 5 seconds delay
        }
    }, 600);
}


// Handle wrong code entry
function handleWrongCode() {
    stopAllAudio();

    landingPage.style.transform = 'translateX(100vw)';

    if (!isAudioPlaying(wrongSound)) {
        wrongSound.play()
            .catch((err) => {
                console.warn('Audio playback blocked for wrong code:', err);
                soundWarning.style.display = 'block';
            });
        currentAudio = wrongSound;
        setupAudio(wrongSound);
    }

    setTimeout(() => {
        wrongPage.style.display = 'flex';
        setTimeout(() => {
            wrongPage.style.display = 'none';
            landingPage.style.transform = 'translateX(0)';
            codeInput.value = '';
            currentAudio = null;
        }, 1500);
    }, 600);
}

// Check input against the dynamic code
codeInput.addEventListener('input', () => {
    if (codeInput.value === correctCode) {
        handleCorrectCode();
    } else if (codeInput.value.length === 4) {
        handleWrongCode();
    }
});
