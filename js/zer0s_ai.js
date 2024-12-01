const dot = document.querySelector('.eye-glow');
const innerDot = document.querySelector('.red-dot');
const audio = document.getElementById('audio');
const eyeGlow = document.querySelector('.eye-glow');
// Set up Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // Defines the frequency resolution, affects the number of bins

const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

const frequencyData = new Uint8Array(analyser.frequencyBinCount);

// Animate the dot
function animateDot() {
    analyser.getByteFrequencyData(frequencyData);

    // Get the average frequency (this determines the "glow" level)
    const avgFrequency = frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;

    // Map the average frequency to a new dot size and glow intensity
    const sensitivity = 1.2; // Adjust this value to change the responsiveness
    const minSize = 50; // Minimum size of the dot to match the inner circle's size
    const dotSize = Math.max(minSize, Math.min(60, avgFrequency * sensitivity));
    const glowIntensity = Math.min(10, avgFrequency / 25); // Controls the glow strength

    // Update the outer dot's size and glow
    dot.style.width = `${dotSize}px`;
    dot.style.height = `${dotSize}px`;
    dot.style.boxShadow = `0 0 ${glowIntensity * 15}px rgba(249, 228, 0, 0.7)`; // Glow effect

    // Continue the animation
    requestAnimationFrame(animateDot);
}

// Resume audio context on user interaction (required by some browsers)
document.body.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

animateDot();

function moveEyeRandomly() {
    const maxOffsetPercent = 10; // Maximum ±10% from the center
    const chanceToCenter = 0.2; // 20% chance to return to center

    let randomXPercent, randomYPercent;

    if (Math.random() < chanceToCenter) {
        // Return to the center
        randomXPercent = 0;
        randomYPercent = 0;
    } else {
        // Generate random offsets within a smaller percentage range
        randomXPercent = (Math.random() * 2 - 1) * maxOffsetPercent; // Random between -maxOffsetPercent and maxOffsetPercent
        randomYPercent = (Math.random() * 8 - 1) * maxOffsetPercent; // Random between -maxOffsetPercent and maxOffsetPercent
    }
    eyeGlow.style.transform = `translate(-50%, -50%) translate(${randomXPercent}%, ${randomYPercent}%)`;
}
setInterval(moveEyeRandomly, 1500); // Move every 500ms (faster)

