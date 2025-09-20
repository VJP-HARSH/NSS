// frontend/assets/js/auth.js

// Utility to show messages
function showMessage(elementId, message, type = 'success') {
  const el = document.getElementById(elementId);
  if (el) {
    el.innerHTML = `<div class='alert alert-${type}'>${message}</div>`;
  }
}

// Register admin
async function registerAdmin(form) {
  const formData = new FormData(form);
  try {
    const res = await fetch('/api/admin/register', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      showMessage('registerMsg', data.message, 'success');
      form.reset();
    } else {
      showMessage('registerMsg', data.message || 'Registration failed.', 'danger');
    }
  } catch (err) {
    showMessage('registerMsg', 'Network error. Please try again.', 'danger');
  }
}

// Login admin
async function loginAdmin(form) {
  const formData = {
    identifier: form.identifier.value,
    password: form.password.value
  };
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      showMessage('loginMsg', 'Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '/profile/view.html';
      }, 1000);
    } else {
      showMessage('loginMsg', data.message || 'Login failed.', 'danger');
    }
  } catch (err) {
    showMessage('loginMsg', 'Network error. Please try again.', 'danger');
  }
}

// Export functions for use in HTML
window.registerAdmin = registerAdmin;
window.loginAdmin = loginAdmin;
window.showMessage = showMessage; 