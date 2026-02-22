// Shared email validation function
function validateEmail(emailInput) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValue = emailInput.value;

  if (!emailRegex.test(emailValue)) {
    alert('Please enter a valid email address.');
    emailInput.classList.add('error');
    return false;
  } else {
    emailInput.classList.remove('error');
    return true;
  }
}

// Form validation for empty fields (login and signup)
function validateForm(form) {
  const emailInput = form.querySelector('input[name="email"]');
  const password = form.querySelector('input[name="password"]').value.trim();
  const confirmPassword = form.querySelector('input[name="confirmPassword"]') ? form.querySelector('input[name="confirmPassword"]').value.trim() : '';

  if (!validateEmail(emailInput)) {
    return false;
  }

  if (password === '') {
    alert('Please enter a password');
    return false;
  }

  if (form === signupForm) {
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
  }

  return true;
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm(signupForm)) {
      return;
    }
    window.location.href = "cars.html";
  });
}

function forgotPassword() {
  alert('Forgot password functionality not yet implemented. Please contact support.');
}

function openFacebookLogin() {
  window.open('https://www.facebook.com/login/', '_blank');
}

function openGoogleLogin() {
  window.open('https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fwww.google.com%2F&hl=en', '_blank');
}

// Search functionality
const searchInput = document.getElementById('searchInput');

// Check if the searchInput element is found
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent default Enter key action (form submission or page reload)
      const searchTerm = searchInput.value.toLowerCase().trim();
      console.log("Search term entered:", searchTerm);  // Debugging log

      if (searchTerm.includes('car') || searchTerm.includes('cars')) {
        window.location.href = 'cars.html';
      } else if (searchTerm.includes('animal') || searchTerm.includes('animals')) {
        window.location.href = 'animals.html';
      } else if (searchTerm.includes('art')) {
        window.location.href = 'art.html';
      } else if (searchTerm.includes('nature')) {
        window.location.href = 'nature.html';
      } else {
        alert(`No results found for "${searchTerm}". Please try "cars", "animals", "art", or "nature".`);
      }
    }
  });
} else {
  console.error("Search input element not found. Please check the HTML structure.");  // Debugging error log
}

// Toggle Mode (Dark/Light Mode)
const toggleModeButton = document.getElementById('toggleModeButton'); // Ensure you have a button with this ID

if (toggleModeButton) {
  toggleModeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode'); // Toggles light-mode class on the body

    // Optionally, change button text based on mode
    if (document.body.classList.contains('light-mode')) {
      toggleModeButton.textContent = 'Switch to Dark Mode';
    } else {
      toggleModeButton.textContent = 'Switch to Light Mode';
    }
  });
} else {
  console.error("Toggle mode button not found. Please check the HTML structure.");
}
