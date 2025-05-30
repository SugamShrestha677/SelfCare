document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.querySelector('.timer-display');
    const startBtn = document.getElementById('start-btn');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('tasks');
    const playMusicBtn = document.getElementById('play-music-btn');

    let timer;
    let isRunning = false;
    let time = 25 * 60; // 25 minutes in seconds

    function updateDisplay() {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startBtn.textContent = 'Pause';
            timer = setInterval(() => {
                if (time > 0) {
                    time--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    startBtn.textContent = 'Start';
                }
            }, 1000);
        } else {
            clearInterval(timer);
            isRunning = false;
            startBtn.textContent = 'Start';
        }
    }

    function setMode(mode) {
        clearInterval(timer); // Stop any existing timer
        isRunning = false;
        startBtn.textContent = 'Start';
    
        switch (mode) {
            case 'pomodoro':
                time = 25 * 60;
                break;
            case 'rest':
                time = 5 * 60;
                break;
            case 'long-rest':
                time = 15 * 60;
                break;
        }
    
        updateDisplay();
    }

    startBtn.addEventListener('click', startTimer);

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setMode(btn.dataset.mode);
        });
    });

    addTaskBtn.addEventListener('click', () => {
        const taskName = prompt("Please enter your task:");
        if (taskName) { // Check if user entered a task
            const taskId = `task${taskList.children.length + 1}`;
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" id="${taskId}">
                <label for="${taskId}">${taskName}</label>
            `;
            taskList.appendChild(li);
        }
    });

    let isPlaying = false;
    const audio = document.getElementById('background-music'); // Get the audio element
    
    playMusicBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playMusicBtn.textContent = isPlaying ? '⏸' : '▶';
    
        if (isPlaying) {
            audio.play(); // Play the music
        } else {
            audio.pause(); // Pause the music
        }
    });

    updateDisplay();
});