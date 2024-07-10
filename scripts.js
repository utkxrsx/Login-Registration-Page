document.getElementById('showLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.card.register').style.display = 'none';
    document.querySelector('.card.login').style.display = 'block';
});

document.getElementById('showRegister').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.card.login').style.display = 'none';
    document.querySelector('.card.register').style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    validateLoginForm();
});

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    validateRegistrationForm();
});

function validateLoginForm() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let isValid = true;

    if (!validateEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Invalid email';
        isValid = false;
    } else {
        document.getElementById('loginEmailError').textContent = '';
    }

    if (password.length < 6) {
        document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        document.getElementById('loginPasswordError').textContent = '';
    }

    if (isValid) {
        // Send login request to server
        loginUser(email, password);
    }
}

function validateRegistrationForm() {
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let isValid = true;

    if (!validateEmail(email)) {
        document.getElementById('registerEmailError').textContent = 'Invalid email';
        isValid = false;
    } else {
        document.getElementById('registerEmailError').textContent = '';
    }

    if (password.length < 6) {
        document.getElementById('registerPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        document.getElementById('registerPasswordError').textContent = '';
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').textContent = '';
    }

    if (isValid) {
        // Send registration request to server
        registerUser(email, password);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function loginUser(email, password) {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful');
        } else {
            document.getElementById('loginError').textContent = data.message;
        }
    });
}

function registerUser(email, password) {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful');
        } else {
            document.getElementById('registerError').textContent = data.message;
        }
    });
}
