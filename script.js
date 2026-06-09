// Application State
const state = {
    school: null,
    format: null,
    prompt: null,
    response: null,
    timeLimit: 0,
    wordLimit: 0,
    timerInterval: null,
    timeElapsed: 0,
    timerRunning: false
};

// Stage Management
function showStage(stageName) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.getElementById(`stage-${stageName}`).classList.add('active');
    window.scrollTo(0, 0);
}

// School Selection
document.querySelectorAll('.school-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        state.school = e.currentTarget.dataset.school;
        showStage('format');
    });
});

// Format Selection
document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        state.format = e.currentTarget.dataset.format;
        initializePrompt();
        showStage('prompt');
    });
});

// Initialize Prompt
function initializePrompt() {
    const prompt = generatePrompt(state.school, state.format);
    state.prompt = prompt.question;
    state.timeLimit = prompt.timeLimit;
    state.wordLimit = prompt.wordLimit;

    // Update UI
    const schoolNames = {
        queens: "Queen's Smith Commerce",
        ivey: "Western Ivey AEO",
        rotman: "U of T Rotman Commerce"
    };

    const formatNames = {
        essay: "Timed Essay",
        video: "Video Transcription"
    };

    document.getElementById('prompt-school').textContent = schoolNames[state.school];
    document.getElementById('prompt-format').textContent = formatNames[state.format];
    document.getElementById('prompt-content').textContent = state.prompt;
    document.getElementById('time-limit').textContent = `${state.timeLimit} minutes`;
    document.getElementById('word-limit').textContent = state.wordLimit;
    document.getElementById('max-word-count').textContent = state.wordLimit;
    document.getElementById('timer').textContent = '00:00';
}

// Timer Functions
function startTimer() {
    if (state.timerRunning) return;
    state.timerRunning = true;
    document.getElementById('btn-start-timer').style.display = 'none';
    document.getElementById('btn-pause-timer').style.display = 'inline-block';

    state.timerInterval = setInterval(() => {
        state.timeElapsed++;
        updateTimerDisplay();

        if (state.timeElapsed >= state.timeLimit * 60) {
            clearInterval(state.timerInterval);
            state.timerRunning = false;
            alert(`⏰ Time's up! You have ${state.timeLimit} minutes to submit.`);
        }
    }, 1000);
}

function pauseTimer() {
    if (!state.timerRunning) return;
    state.timerRunning = false;
    clearInterval(state.timerInterval);
    document.getElementById('btn-start-timer').style.display = 'inline-block';
    document.getElementById('btn-pause-timer').style.display = 'none';
}

function resetTimer() {
    pauseTimer();
    state.timeElapsed = 0;
    document.getElementById('btn-start-timer').style.display = 'inline-block';
    document.getElementById('btn-pause-timer').style.display = 'none';
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(state.timeElapsed / 60);
    const secs = state.timeElapsed % 60;
    document.getElementById('timer').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Word Count
document.getElementById('response-text').addEventListener('input', (e) => {
    const wordCount = e.target.value.trim().split(/\s+/).filter(w => w.length > 0).length;
    document.getElementById('current-word-count').textContent = wordCount;

    if (wordCount > state.wordLimit) {
        document.getElementById('current-word-count').style.color = 'var(--accent)';
    } else {
        document.getElementById('current-word-count').style.color = 'inherit';
    }
});

// Timer Controls
document.getElementById('btn-start-timer').addEventListener('click', startTimer);
document.getElementById('btn-pause-timer').addEventListener('click', pauseTimer);
document.getElementById('btn-reset-timer').addEventListener('click', resetTimer);

// Submit Response
document.getElementById('btn-submit').addEventListener('click', () => {
    const responseText = document.getElementById('response-text').value.trim();

    if (!responseText) {
        alert('Please write a response before submitting.');
        return;
    }

    state.response = responseText;
    pauseTimer();

    // Grade the response
    const evaluation = gradeResponse(state.school, state.format, state.response, state.timeElapsed, state.wordLimit);
    displayReport(evaluation);
});

// Back Button
document.getElementById('btn-back').addEventListener('click', () => {
    resetTimer();
    document.getElementById('response-text').value = '';
    document.getElementById('current-word-count').textContent = '0';
    showStage('format');
});

// Report Navigation
document.getElementById('btn-new-attempt').addEventListener('click', () => {
    resetTimer();
    document.getElementById('response-text').value = '';
    document.getElementById('current-word-count').textContent = '0';
    initializePrompt();
    showStage('prompt');
});

document.getElementById('btn-home').addEventListener('click', () => {
    resetTimer();
    state.school = null;
    state.format = null;
    document.getElementById('response-text').value = '';
    document.getElementById('current-word-count').textContent = '0';
    showStage('school');
});
