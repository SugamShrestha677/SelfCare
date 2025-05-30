document.addEventListener('DOMContentLoaded', function() {
    // BMI Calculator functionality
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const genderSelect = document.getElementById('gender');
    const bmiResult = document.getElementById('bmi-result');

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        
        if (height && weight) {
            // Convert height from feet to meters (1 foot = 0.3048 meters)
            const heightInMeters = height * 0.3048;
            
            // Calculate BMI
            const bmi = weight / (heightInMeters * heightInMeters);
            
            // Determine BMI category
            let category;
            if (bmi < 18.5) {
                category = 'underweight';
            } else if (bmi < 25) {
                category = 'normal weight';
            } else if (bmi < 30) {
                category = 'overweight';
            } else {
                category = 'obese';
            }
            
            bmiResult.textContent = `You are ${category}. You should eat the recommended foods.`;
        }
    }

    // Add event listeners for BMI calculation
    heightInput.addEventListener('input', calculateBMI);
    weightInput.addEventListener('input', calculateBMI);
    genderSelect.addEventListener('change', calculateBMI);

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const foodCards = document.querySelectorAll('.food-card');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        foodCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});