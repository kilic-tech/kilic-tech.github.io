document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            document.getElementById('form-response').textContent = 'Thank you for your message! I will get back to you soon.';
        } else {
            response.json().then(data => {
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    document.getElementById('form-response').textContent = data['errors'].map(error => error['message']).join(', ');
                } else {
                    document.getElementById('form-response').textContent = 'Oops! There was a problem submitting your form.';
                }
            });
        }
    }).catch(error => {
        document.getElementById('form-response').textContent = 'Oops! There was a problem submitting your form.';
    });
});
