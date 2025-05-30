document.addEventListener('DOMContentLoaded', () => {
    // Initialize Pomodoro Timer
    const pomodoroCard = document.getElementById('pomodoro');
    const timerContainer = pomodoroCard.querySelector('.timer-container');
    const timerDisplay = pomodoroCard.querySelector('.timer-display');
    const startButton = pomodoroCard.querySelector('.start');
    const resetButton = pomodoroCard.querySelector('.reset');

    let timeLeft = 25 * 60; // 25 minutes in seconds
    let timerId = null;
    let isRunning = false;

    // Toggle timer visibility when clicking the Pomodoro card
    pomodoroCard.addEventListener('click', (e) => {
        if (!e.target.closest('.timer-btn')) {
            timerContainer.classList.toggle('hidden');
        }
    });

    // Timer functions
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startButton.textContent = 'Pause';
            timerId = setInterval(() => {
                timeLeft--;
                updateDisplay();
                if (timeLeft === 0) {
                    clearInterval(timerId);
                    isRunning = false;
                    startButton.textContent = 'Start';
                    notify('Pomodoro session completed!');
                }
            }, 1000);
        } else {
            clearInterval(timerId);
            isRunning = false;
            startButton.textContent = 'Start';
        }
    }

    function resetTimer() {
        clearInterval(timerId);
        isRunning = false;
        timeLeft = 25 * 60;
        updateDisplay();
        startButton.textContent = 'Start';
    }

    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);

    // Task Management
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');

    // Load saved tasks from localStorage
    function loadSavedTasks() {
        taskCheckboxes.forEach((checkbox, index) => {
            const isChecked = localStorage.getItem(`task-${index}`);
            if (isChecked === 'true') {
                checkbox.checked = true;
            }
        });
    }

    // Save task state to localStorage
    function saveTaskState(checkbox, index) {
        localStorage.setItem(`task-${index}`, checkbox.checked);
    }

    taskCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            saveTaskState(checkbox, index);
        });
    });

    // Notification function
    function notify(message) {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('WillaZilla', { body: message });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('WillaZilla', { body: message });
                    }
                });
            }
        }
    }

    // Initialize
    loadSavedTasks();
    updateDisplay();

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add responsive navigation for mobile
    const features = document.querySelectorAll('.feature-card');
    features.forEach(feature => {
        feature.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        feature.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Handle window resize for responsive layouts
    function handleResize() {
        const isMobile = window.innerWidth < 768;
        features.forEach(feature => {
            feature.style.transition = isMobile ? 'transform 0.2s ease' : 'none';
        });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});
