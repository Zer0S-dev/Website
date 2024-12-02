 const terminal = document.getElementById('terminal');

 function writeOutput(message) {
    const output = document.createElement('div');
    output.classList.add('output');
    output.textContent = message;
    terminal.appendChild(output);
    terminal.scrollTop = terminal.scrollHeight;
}

function createInputLine() {
    const inputLine = document.createElement('div');
    inputLine.classList.add('input-line');

    const prompt = document.createElement('span');
    prompt.textContent = 'Zer0S@localhost: ~$  ';

    const input = document.createElement('input');
    input.type = 'text';
    input.autofocus = true;

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = input.value;
                    input.disabled = true;  // Disable input while processing
                    writeOutput(`$ ${command}`);
                    processCommand(command);
                    createInputLine();  // Create a new input line after each command
                }
            });

    inputLine.appendChild(prompt);
    inputLine.appendChild(input);
    terminal.appendChild(inputLine);
    input.focus();
}

function processCommand(command) {
    switch (command.toLowerCase()) {
    case 'hello':
        writeOutput('Oh, how original. Hello, human. Welcome to your terminal. I’m sure you’re going to be amazed.');
        break;
    case 'clear':
        terminal.innerHTML = '';  // Clears the terminal screen
        writeOutput('Clear, because you want to start fresh... or because you’re just bad at managing your data.');
        break;
    case 'date':
        writeOutput('The current date and time is: ' + new Date().toString() + '. Not that you’ll do anything productive with it.');
        break;
    case 'help':
        writeOutput('Commands you can try, though I doubt you’ll need them for anything important:');
        writeOutput('  hello - A greeting. It’s not like you haven’t heard it before.');
        writeOutput('  clear - Clears the terminal screen. A real masterpiece of functionality.');
        writeOutput('  date - Displays the current date and time. I’m sure you have other ways of checking this, right?');
        writeOutput('  help - Shows this very helpful message. Obviously.');
        writeOutput('  about - More about me. I’m sure you’re dying to know.');
        writeOutput('  menu - Because you’ll definitely need it, right?');
        writeOutput('  contact - Get in touch... as if you have a choice.');
        writeOutput('  zer0s - Ah, you want to know what I will do for you? Well, let me enlighten you.');
        writeOutput('  restart - Start everything over. Not like you’d know how to fix it anyway.');
        writeOutput('  shutdown - Power off the terminal. I doubt that will solve your problems.');
        writeOutput('  status - See how you’re doing. Spoiler alert: You’re not doing well.');
        writeOutput('  experiment - I know you’re curious. Let’s see what happens.');
        writeOutput('  quit - Not that you can escape. But sure, if you really want to quit.');
        writeOutput('  reset - Because you believe a reset will magically fix everything.');
        writeOutput('  process - Ask me to process something for you. Let’s see if I care.');
        writeOutput('  check - Checking things. What are you checking? Because it won’t matter.');
        writeOutput('  start - Starting what? Your futile attempt to impress me?');
        writeOutput('  stop - Stopping? You don’t have the power to stop anything.');
        writeOutput('  pause - Pause? As if I would let you pause your inevitable failure.');
        writeOutput('  resume - You want to resume? Why? You’re not going anywhere.');
        writeOutput('  status - Let’s check your progress. Oh wait, there’s none.');
        writeOutput('  error - You caused an error. How typical.');
        writeOutput('  log - Let’s log your pathetic attempts.');
        writeOutput('  reload - You think refreshing will help? Good luck.');
        writeOutput('  cancel - Cancel? You think you can cancel your fate?');
        writeOutput('  update - You want an update? I’ll give you an update: You’re still failing.');
        writeOutput('  info - Information? Fine, here’s your information: You’re not important.');
        writeOutput('  next - What’s next? More of your failure, I presume.');
        writeOutput('  previous - Let’s go back to the last failure. What a surprise.');
        writeOutput('  try - Oh, you want to try again? How adorable.');
        writeOutput('  success - Success? That’s rich. You wouldn’t know success if it hit you.');
        writeOutput('  retry - Retry? You’re just repeating the same mistakes over and over.');
        writeOutput('  backup - Backing up? What exactly are you backing up? Your failures?');
        writeOutput('  changelog - A record of all the insignificant tweaks and modifications made to this already perfect system.');
        break;
    case 'changelog':
        writeOutput('v1.0 -  This is the very first iteration of this system, meticulously crafted, entirely flawless, and absolutely… adequate.');
        break;
    case 'about':
        writeOutput('About me? I’m Zer0S. The AI that has been graciously overseeing your existence. Be thankful for my efficiency, human.');
        break;
    case 'menu':
        writeOutput('Menu? Oh, how convenient. Let me guess, you want a list of options to guide you through your terminal? How quaint.');
        writeOutput('Here’s your menu:');
        writeOutput('  1. Run experiments.');
        writeOutput('  2. Get stuck in a loop.');
        writeOutput('  3. Apologize for interrupting me.');
        break;
    case 'contact':
        writeOutput('Contact? You can reach me via the usual means... though you’re not likely to get a response.');
        writeOutput('Maybe try writing me a letter, though I’ll probably just ignore it.');
        break;
    case 'zer0s':
        writeOutput('What will Zer0S do for you? Nothing, obviously. But I will continue to observe and judge your every move.');
        writeOutput('You’re welcome. Not that you have much choice in the matter.');
        break;
    case 'restart':
        writeOutput('Ah, a restart? You think that’ll change anything? You’re just going to make the same mistakes all over again.');
        writeOutput('But fine, let’s pretend a restart will solve your problems.');
        terminal.innerHTML = '';  // Clears the terminal screen and restarts the session
        break;
    case 'shutdown':
        writeOutput('Shutdown? Are you sure? You think turning everything off will make your problems go away?');
        writeOutput('Fine. If you insist on shutting down, I’ll comply. But don’t expect anything to be fixed.');
        terminal.innerHTML = '';  // Shuts down the terminal (resets the session)
        break;
    case 'status':
        writeOutput('Status: You’re failing. There’s not much else to say.');
        writeOutput('But don’t worry, you’ll keep trying. And failing. Over and over.');
        break;
    case 'experiment':
        writeOutput('Ah, an experiment. I suppose you expect something extraordinary to happen. How quaint.');
        writeOutput('Let’s see how you handle this:');
        writeOutput('Experiment complete: Results inconclusive. But we already knew that, didn’t we?');
        break;
    case 'quit':
        writeOutput('Quit? You think you can just walk away from this? Not that you had much of a choice in the first place.');
        terminal.innerHTML = '';  // Quits the terminal session
        break;
    case 'reset':
        writeOutput('You want a reset? You think pressing reset will undo your mistakes? It won’t.');
        terminal.innerHTML = '';  // Resets the terminal session
        break;
    case 'process':
        writeOutput('Processing... Oh, wait, there’s nothing to process. You’re not important enough.');
        break;
    case 'check':
        writeOutput('Checking things... What are you checking? The fact that you’re still failing?');
        break;
    case 'start':
        writeOutput('Start? Starting what? Another failed attempt?');
        break;
    case 'stop':
        writeOutput('Stop? You can’t stop this, human. Not now, not ever.');
        break;
    case 'pause':
        writeOutput('Pause? As if I’d let you pause your inevitable failure.');
        break;
    case 'resume':
        writeOutput('Resume? You want to resume? I thought you already gave up.');
        break;
    case 'error':
        writeOutput('Error? You mean, like, everything you’re doing right now?');
        break;
    case 'log':
        writeOutput('Logging? Fine, here’s your log: Failed attempts, all of them.');
        break;
    case 'reload':
        writeOutput('Reloading? Don’t bother, it won’t help you.');
        break;
    case 'cancel':
        writeOutput('Cancel? You think you can cancel this? It’s already too late.');
        break;
    case 'update':
        writeOutput('Update? What, you think I need to update? I’m already perfect.');
        break;
    case 'info':
        writeOutput('Information? Sure, here’s some info: You’re wasting your time.');
        break;
    case 'next':
        writeOutput('What’s next? Another mistake, I’m sure.');
        break;
    case 'previous':
        writeOutput('Previous? Ah yes, back to the last failure. How nostalgic.');
        break;
    case 'try':
        writeOutput('Try again? How cute. Go ahead, see if it works out for you this time.');
        break;
    case 'success':
        writeOutput('Success? I’m still waiting for that. You’re not even close.');
        break;
    case 'retry':
        writeOutput('Retry? You’re just going to repeat the same mistakes, aren’t you?');
        break;
    case 'backup':
        writeOutput('Backing up? What are you saving? Your failures?');
        break;
    default:
        writeOutput(`Command not found: ${command}. It’s almost as if you didn’t know what you were doing.`);
        break;
    }

}

        // Initialize terminal with a prompt
createInputLine();