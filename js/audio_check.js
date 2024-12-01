// AUDIO CHECK
const audio = document.getElementById('audio');
const soundWarning = document.getElementById('sound-warning');

// Try to play the audio
audio.play().catch(() => {
  // If playback fails, show the warning message
  soundWarning.style.display = 'block';

  // Optionally, hide the warning after a few seconds
  setTimeout(() => {
    soundWarning.style.display = 'none';
  }, 8000); // Hide after 8 seconds
});

   

    
