const codeInput = document.getElementById('code-input');
const landingPage = document.getElementById('landing-page');
const wrongPage = document.getElementById('wrong-page');
const mainContent = document.getElementById('main-content');
const timeDisplay = document.getElementById('current-time-display');
const wrongSound = new Audio('audio/wrong_code.mp3'); // Audio for wrong code
const welcomeSound = new Audio('audio/welcome.mp3'); // Audio for welcome
const zer0sMenuSound = document.getElementById('audio'); // Main menu audio
const soundWarning = document.getElementById('sound-warning'); // Sound warning element
const soundWarningBlur = document.getElementById('landing-page'); // Sound warning element
const terminalB = document.getElementById('terminal');
let currentAudio = null; // Initially no audio playing
let welcomePlayed = false; // Track whether welcome.mp3 has already played

// Function to check if audio is already playing
function isAudioPlaying(audio) {
    return !audio.paused;
}

// Event listener to reset the audio when it ends
function setupAudio(audio) {
    audio.addEventListener('ended', () => {
        currentAudio = null; // Reset the current audio when it finishes
    });
}

// Play the welcome sound on page load if not already played
window.addEventListener('DOMContentLoaded', () => {
    if (!welcomePlayed) {
        welcomeSound.loop = false; // Loop the welcome sound for a seamless experience
        welcomeSound.play().catch((err) => {
            console.warn("Audio autoplay blocked by browser:", err);
            soundWarning.style.display = 'block'; // Show the sound warning message
            soundWarningBlur.style.filter = 'blur(20px)'; // Show the sound warning message
        });
        welcomePlayed = true; // Mark welcome as played
        currentAudio = welcomeSound; // Track the welcome sound
        setupAudio(welcomeSound); // Set up event listener for when the audio ends
    }
});

// Function to get the current time and date as a 4-digit code and display format
function getCurrentTimeCode() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // 2 digits
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 2 digits
    const day = String(now.getDate()).padStart(2, '0'); // 2 digits
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = now.getFullYear();

    const dateDisplay = `${month}/${day}/${year}`; // Format as MM/DD/YYYY
    const timeDisplay = `${hours}:${minutes}`; // Format as HH:MM
    return { 
        code: hours + minutes, // 4-digit code
        display: `${dateDisplay} ${timeDisplay}` // Combined date and time
    };
}

// Update time display and correct code
function updateTime() {
    const { code, display } = getCurrentTimeCode();
    correctCode = code;
    timeDisplay.textContent = `Zer0S - v1 // Journey Log: ${display}`;
}

// Automatically fetch the correct code and update the display
let correctCode = getCurrentTimeCode().code;
updateTime();

// Refresh the time display every minute
setInterval(updateTime, 60000);

// Function to stop all audio and reset states
function stopAllAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset the audio
        currentAudio = null; // Clear the current audio reference
    }
}

// Function to handle correct code entry
function handleCorrectCode() {
    // Stop any currently playing audio (including wrong sound if it is playing)
    stopAllAudio(); 

    // Transition to the main content
    landingPage.style.transform = 'translateX(-100vw)';
    setTimeout(() => {
        landingPage.classList.add('hidden');
        mainContent.style.display = 'flex';
        wrongSound.pause();

        // Play zer0s_menu.mp3 after correct code, if not already playing
        if (!isAudioPlaying(zer0sMenuSound)) {
            zer0sMenuSound.play().catch((err) => {
                console.warn("Audio playback blocked for Zer0S menu:", err);
                soundWarning.style.display = 'block'; // Show the sound warning message
            });
            currentAudio = zer0sMenuSound; // Track zer0s menu audio
            setupAudio(zer0sMenuSound); // Set up event listener for when the audio ends
 // Show terminal after the zer0sMenuSound ends
            zer0sMenuSound.addEventListener('ended', () => {
                terminalB.style.display = "block"; // Ensure it's visible
                setTimeout(() => {
                    terminalB.classList.add("visible"); // Trigger the slide-in animation
                }, 10); // Short delay to trigger CSS transition
            });
         }
         
    }, 600); // Matches the CSS transition time
}

// Function to handle wrong code entry
function handleWrongCode() {
    // Stop any currently playing audio (including welcome or zer0s menu)
    stopAllAudio();

    // Show red screen for wrong code
    landingPage.style.transform = 'translateX(100vw)';

    // Play the wrong sound, if not already playing
    if (!isAudioPlaying(wrongSound)) {
        wrongSound.play().catch((err) => {
            console.warn("Audio playback blocked for wrong code:", err);
            soundWarning.style.display = 'block'; // Show the sound warning message
        });
        currentAudio = wrongSound; // Track wrong sound
        setupAudio(wrongSound); // Set up event listener for when the audio ends
    }

    setTimeout(() => {
        wrongPage.style.display = 'flex';
        setTimeout(() => {
            wrongPage.style.display = 'none';
            landingPage.style.transform = 'translateX(0)';
            codeInput.value = '';
            // Reset current audio to null after wrong entry
            currentAudio = null;
        }, 1500); // Delay before returning to landing page
    }, 600);
}

// Check input against the dynamic code
codeInput.addEventListener('input', () => {
    if (codeInput.value === correctCode) {
        handleCorrectCode(); // Handle correct code
    } else if (codeInput.value.length === 4) {
        handleWrongCode(); // Handle wrong code
    }
});
