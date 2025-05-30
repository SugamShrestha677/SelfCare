// Set current date
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);
    dateElement.textContent = currentDate;
});

// Auto-save functionality
const textareas = document.querySelectorAll('textarea');
const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('select');

// Load saved data
function loadSavedData() {
    textareas.forEach(textarea => {
        const savedValue = localStorage.getItem(textarea.placeholder);
        if (savedValue) textarea.value = savedValue;
    });

    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.placeholder);
        if (savedValue) input.value = savedValue;
    });

    selects.forEach(select => {
        const savedValue = localStorage.getItem(select.previousElementSibling.textContent);
        if (savedValue) select.value = savedValue;
    });
}

// Save data
function saveData(element, key) {
    localStorage.setItem(key, element.value);
}

// Add event listeners
textareas.forEach(textarea => {
    textarea.addEventListener('input', () => saveData(textarea, textarea.placeholder));
});

inputs.forEach(input => {
    input.addEventListener('input', () => saveData(input, input.placeholder));
});

selects.forEach(select => {
    select.addEventListener('change', () => saveData(select, select.previousElementSibling.textContent));
});

// Load saved data when page loads
loadSavedData();