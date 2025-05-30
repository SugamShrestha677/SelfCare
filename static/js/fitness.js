// Add click event listeners to all cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        // Get the title of the clicked card
        const title = card.querySelector('h3').textContent;
        
        // You can implement different actions based on which card was clicked
        console.log(`Clicked: ${title}`);
        
        // Example: Show a modal or navigate to a detailed page
        // showDetail(title);
    });
});

// Add active class to nav links when clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        e.target.classList.add('active');
    });
});

// Streak button functionality
const streakBtn = document.querySelector('.streak-btn');
let streakCount = 0;

streakBtn.addEventListener('click', () => {
    streakCount++;
    streakBtn.textContent = `Streaks: ${streakCount}`;
});

// Responsive sidebar toggle for mobile
if (window.innerWidth <= 480) {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Add toggle functionality
    document.addEventListener('DOMContentLoaded', () => {
        const toggleButton = document.createElement('button');
        toggleButton.textContent = '☰';
        toggleButton.classList.add('toggle-sidebar');
        toggleButton.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: var(--sidebar-bg);
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
        `;
        
        document.body.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    });
}