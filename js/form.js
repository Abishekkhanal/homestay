
    document.getElementById('submit').addEventListener('click', function() {
        var formData = new FormData(document.getElementById('contactForm'));
        var formIsValid = true;

        // Check if all required fields are filled
        document.querySelectorAll('[required]').forEach(function(el) {
            if (!el.value.trim()) {
                formIsValid = false;
                el.parentNode.querySelector('.help-block').textContent = "Please fill out this field";
            } else {
                el.parentNode.querySelector('.help-block').textContent = "";
            }
        });

        // Check if the date is not in the past
        var inputDate = new Date(document.getElementById('input_date').value);
        var currentDate = new Date();
        if (inputDate < currentDate) {
            formIsValid = false;
            document.getElementById('input_date').parentNode.querySelector('.help-block').textContent = "Date must be in the future";
        }

        // Check if the time is not in the past
        var inputTime = document.getElementById('input_time').value.split(':');
        var currentTime = new Date();
        currentTime.setHours(inputTime[0]);
        currentTime.setMinutes(inputTime[1]);
        if (currentTime < currentDate) {
            formIsValid = false;
            document.getElementById('input_time').parentNode.querySelector('.help-block').textContent = "Time must be in the future";
        }

        // Check if person input is valid
        var personInput = document.getElementById('person').value;
        if (!(/^\d+$/.test(personInput))) {
            formIsValid = false;
            document.getElementById('person').parentNode.querySelector('.help-block').textContent = "Please enter a valid number";
        } else if (parseInt(personInput) === 0) { // Check if number of persons is 0
            formIsValid = false;
            document.getElementById('person').parentNode.querySelector('.help-block').textContent = "Number of persons cannot be 0";
        }

        if (formIsValid) {
            var message = "**NEW REGISTRATION:**\n"; // Bold and capitalized
            formData.forEach(function(value, key) {
                // Capitalize the first letter of each key and value
                var capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                var capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                message += capitalizedKey + ": " + capitalizedValue + "\n";
            });

            // WhatsApp link with pre-filled message
            var whatsappURL = "https://api.whatsapp.com/send?phone=+918101103964&text=" + encodeURIComponent(message);
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
        }
    });