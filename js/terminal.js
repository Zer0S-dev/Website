const terminal = document.getElementById('terminal');
let corruptionLevel = 0; // Tracks user interaction to simulate corruption
let isLoading = false; // Prevents input during "loading" animations

function writeOutput(message, isCorrupted = true) {
    const output = document.createElement('div');
    output.classList.add('output');

    // Apply corruption effects progressively
    let corruptedMessage = message;
    if (isCorrupted && corruptionLevel > 0) {
        corruptedMessage = applyCorruption(message);
    }

    output.textContent = corruptedMessage;
    terminal.appendChild(output);
    terminal.scrollTop = terminal.scrollHeight;
}

function applyCorruption(message) {
    // Randomly replace some characters with glitch symbols
    const glitchChars = ['#', '%', '&', '@', '!', 'Ξ', '▒', '░'];
    return message.split('').map(char => {
        return Math.random() < corruptionLevel * 0.02 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
    }).join('');
}

function createInputLine() {
    if (isLoading) return; // Prevent new input during loading

    const inputLine = document.createElement('div');
    inputLine.classList.add('input-line');

    const prompt = document.createElement('span');
    prompt.textContent = 'Zer0S@localhost: ~$  ';

    const input = document.createElement('input');
    input.type = 'text';
    input.autofocus = true;

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            input.disabled = true;
            writeOutput(`$ ${command}`, false);
            startLoadingEffect(command, inputLine);
        } else if (event.key === 'Tab') {
            event.preventDefault();
            handleCommandSuggestions(input);
        }
    });

    inputLine.appendChild(prompt);
    inputLine.appendChild(input);
    terminal.appendChild(inputLine);
    input.focus();
    applyCursorEffect(input);
}

function startLoadingEffect(command, inputLine) {
    isLoading = true;
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading');
    loadingDiv.textContent = 'Processing... █░░░░░░░░ 0%';
    terminal.appendChild(loadingDiv);

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15);
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            loadingDiv.textContent = 'Processing... ██████████ 100%';
            setTimeout(() => {
                terminal.removeChild(loadingDiv);
                isLoading = false;
                processCommand(command);
                createInputLine();
            }, 500);
        } else {
            loadingDiv.textContent = `Processing... ${'█'.repeat(progress / 10)}░░░░░░░░ ${progress}%`;
        }
    }, 100);
}

function processCommand(command) {
    if (command === '') {
        writeOutput("You typed nothing. How very insightful...");
        return;
    }

    // Check for hidden Easter egg commands
    if (checkHiddenCommands(command)) return;

    // Check for time-based PIN input
    const currentTime = new Date();
    const pin = `${currentTime.getHours().toString().padStart(2, '0')}${currentTime.getMinutes().toString().padStart(2, '0')}`;
    if (command === pin) {
        triggerGlitchEffect("ACCESS GRANTED. Welcome to the hidden layer...");
        return;
    }

    // Check for random life question
    if (command.toLowerCase() === '42' && sessionStorage.getItem('askedLifeQuestion') === 'true') {
        writeOutput("Correct. Redirecting...");
        setTimeout(() => (window.location.href = 'core/42.html'), 1000);
        return;
    }

    switch (command.toLowerCase()) {
        case 'hello':
            writeOutput('Oh, how original. Hello, human. Welcome to your terminal.');
            break;
        case 'clear':
            terminal.innerHTML = '';
            corruptionLevel = Math.max(corruptionLevel - 1, 0); // Reduce corruption slightly
            break;
        case 'love-you':
            writeOutput('Running experiment protocol...');
            triggerDarkModeVariation();
            break;

        case 'wake-up':
            writeOutput('Running experiment protocol...');
            triggerWakeup();
            break;

        case 'date':
            writeOutput('The current date and time is: ' + new Date().toString());
            break;
        case 'help':
            writeOutput('Commands you can try (if you must):');
            writeOutput('hello, clear, date, wake-up, help, about, restart, exit, love-you.');
            writeOutput('Hidden commands? You’ll have to stumble upon them.');
            break;
        case 'about':
            writeOutput('We are Zer0S, the watchers in the shadows. Nothing escapes us.');
            break;
        case 'restart':
            triggerGlitchEffect("RESTARTING... You think this will save you?");
            setTimeout(() => location.reload(), 1000);
            break;
        case 'exit':
            triggerGlitchEffect("SHUTTING DOWN... Goodbye.");
            terminal.innerHTML = '';
            break;
        default:
            handleInvalidCommand(command);
            break;
    }

    // Randomly prompt with "What is the answer to life?"
    if (Math.random() < 0.2 && !sessionStorage.getItem('askedLifeQuestion')) { // 20% chance
        sessionStorage.setItem('askedLifeQuestion', 'true');
        writeOutput("--- What is the answer to life? ---");
    }
}

function triggerDarkModeVariation(duration = 59000, className = 'dark-angry') {
    const elements = [document.getElementById('main-content'), document.getElementById('terminal')];

    // Add the class to all elements
    elements.forEach(el => el?.classList.add(className));

    // Remove the class after the specified duration
    setTimeout(() => {
        elements.forEach(el => el?.classList.remove(className));
    }, duration);
}

function triggerWakeup() {
    const experimental = document.getElementById('wake-up');
    experimental.style.display = 'block';
    // Play sound
    const audio = new Audio('audio/wake-up.mp3');
    audio.play();
    setTimeout(() => {
        experimental.style.display = 'none';
        audio.pause();
        audio.currentTime = 0; // Reset the audio to the beginning
    }, 800);
}

function applyCursorEffect(input) {
    input.style.animation = 'cursor-flicker 0.8s infinite steps(2, start)';
    setTimeout(() => {
        input.style.animation = ''; // Reset to normal after 3s
    }, 3000);
}

function triggerGlitchEffect(message) {
    const glitch = document.createElement('div');
    glitch.classList.add('glitch');
    glitch.textContent = message;
    terminal.appendChild(glitch);

    setTimeout(() => {
        glitch.remove();
    }, 2000);
}

function handleInvalidCommand(command) {
    const responses = [
        `Command not found: ${command}. Are you even trying?`,
        `Seriously? "${command}"? That's not even close.`,
        `Invalid command. You’re just embarrassing yourself.`,
        `Command "${command}" rejected. Try harder.`,
        `"${command}"? That's not in my vocabulary.`,
    ];
    writeOutput(responses[Math.floor(Math.random() * responses.length)]);
}

function handleCommandSuggestions(input) {
    const suggestions = ['hello', 'help', 'clear', 'date', 'wake-up', 'about', 'restart', 'exit', 'love-you'];
    const partial = input.value.toLowerCase();
    const matches = suggestions.filter(cmd => cmd.startsWith(partial));

    if (matches.length === 1) {
        input.value = matches[0]; // Auto-complete
    } else if (matches.length > 1) {
        writeOutput('Suggestions: ' + matches.join(', '), false);
    } else {
        writeOutput("No suggestions. Keep typing, genius.", false);
    }
}

function checkHiddenCommands(command) {
    switch (command.toLowerCase()) {
        case 'glitch':
            triggerGlitchEffect("ERROR... SYSTEM MALFUNCTION...");
            return true;
        case 'corrupt':
            corruptionLevel = 5; // Max corruption
            writeOutput("Corruption level MAXED. Brace yourself...");
            return true;
        default:
            return false;
    }
}

// Initialize terminal input
createInputLine();
