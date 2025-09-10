// Login System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkAuthStatus();
    
    // Initialize login functionality
    initializeLogin();
    
    // Setup password visibility toggle
    setupPasswordToggle();
    
    // Setup change password modal
    setupChangePasswordModal();
});

// Authentication System
const AuthSystem = {
    // Default credentials (should be changed after first login)
    defaultCredentials: {
        username: 'admin',
        password: 'admin123'
    },
    
    // Get stored credentials or use defaults
    getCredentials() {
        const stored = localStorage.getItem('adminCredentials');
        return stored ? JSON.parse(stored) : this.defaultCredentials;
    },
    
    // Save new credentials
    saveCredentials(username, password) {
        const credentials = { username, password };
        localStorage.setItem('adminCredentials', JSON.stringify(credentials));
    },
    
    // Validate login
    validateLogin(username, password) {
        const credentials = this.getCredentials();
        return username === credentials.username && password === credentials.password;
    },
    
    // Set login session
    setSession() {
        const sessionData = {
            isLoggedIn: true,
            loginTime: Date.now(),
            expiresIn: 24 * 60 * 60 * 1000 // 24 hours
        };
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
    },
    
    // Check if session is valid
    isSessionValid() {
        const session = localStorage.getItem('adminSession');
        if (!session) return false;
        
        const sessionData = JSON.parse(session);
        const now = Date.now();
        
        // Check if session has expired
        if (now - sessionData.loginTime > sessionData.expiresIn) {
            localStorage.removeItem('adminSession');
            return false;
        }
        
        return sessionData.isLoggedIn;
    },
    
    // Logout
    logout() {
        localStorage.removeItem('adminSession');
        window.location.href = 'login.html';
    },
    
    // Check if using default credentials
    isUsingDefaultCredentials() {
        const credentials = this.getCredentials();
        return credentials.username === this.defaultCredentials.username && 
               credentials.password === this.defaultCredentials.password;
    }
};

// Check authentication status
function checkAuthStatus() {
    // If already logged in and on login page, redirect to admin
    if (AuthSystem.isSessionValid() && window.location.pathname.includes('login.html')) {
        window.location.href = 'admin.html';
        return;
    }
    
    // If not logged in and trying to access admin, redirect to login
    if (!AuthSystem.isSessionValid() && window.location.pathname.includes('admin.html')) {
        window.location.href = 'login.html';
        return;
    }
}

// Initialize login functionality
function initializeLogin() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', handleLogin);
    
    // Show warning if using default credentials
    if (AuthSystem.isUsingDefaultCredentials()) {
        showDefaultCredentialsWarning();
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    const loginBtn = document.querySelector('.login-btn');
    const errorMessage = document.getElementById('error-message');
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    hideError();
    
    // Simulate authentication delay (for better UX)
    setTimeout(() => {
        if (AuthSystem.validateLogin(username, password)) {
            // Successful login
            AuthSystem.setSession();
            
            // If remember me is checked, extend session
            if (rememberMe) {
                const sessionData = JSON.parse(localStorage.getItem('adminSession'));
                sessionData.expiresIn = 30 * 24 * 60 * 60 * 1000; // 30 days
                localStorage.setItem('adminSession', JSON.stringify(sessionData));
            }
            
            // Show success and redirect
            showSuccess('¡Acceso autorizado! Redirigiendo...');
            
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
            
        } else {
            // Failed login
            showError('Usuario o contraseña incorrectos');
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            
            // Clear password field
            document.getElementById('password').value = '';
            
            // Shake effect
            const loginCard = document.querySelector('.login-card');
            loginCard.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                loginCard.style.animation = '';
            }, 500);
        }
    }, 1000);
}

// Setup password visibility toggle
function setupPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (!toggleBtn || !passwordInput) return;
    
    toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('far', 'fa-eye');
            icon.classList.add('fas', 'fa-eye-slash');
        } else {
            icon.classList.remove('fas', 'fa-eye-slash');
            icon.classList.add('far', 'fa-eye');
        }
    });
}

// Setup change password modal
function setupChangePasswordModal() {
    const modal = document.getElementById('change-password-modal');
    const closeBtn = document.getElementById('close-change-password');
    const cancelBtn = document.getElementById('cancel-change-password');
    const form = document.getElementById('change-password-form');
    
    if (!modal) return;
    
    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(modal));
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeModal(modal));
    }
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', handleChangePassword);
    }
}

// Handle change password
function handleChangePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validate current password
    const credentials = AuthSystem.getCredentials();
    if (currentPassword !== credentials.password) {
        showError('Contraseña actual incorrecta');
        return;
    }
    
    // Validate new password
    if (newPassword.length < 6) {
        showError('La nueva contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Validate password confirmation
    if (newPassword !== confirmPassword) {
        showError('Las contraseñas no coinciden');
        return;
    }
    
    // Save new credentials
    AuthSystem.saveCredentials(credentials.username, newPassword);
    
    // Close modal and show success
    const modal = document.getElementById('change-password-modal');
    closeModal(modal);
    showSuccess('Contraseña cambiada exitosamente');
    
    // Clear form
    e.target.reset();
}

// Open change password modal
function openChangePasswordModal() {
    const modal = document.getElementById('change-password-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    
    if (errorElement && errorText) {
        errorText.textContent = message;
        errorElement.style.display = 'flex';
    }
}

// Hide error message
function hideError() {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Show success message
function showSuccess(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Show default credentials warning
function showDefaultCredentialsWarning() {
    const helpSection = document.querySelector('.login-help');
    if (helpSection) {
        const warningElement = document.createElement('div');
        warningElement.style.cssText = `
            background-color: #fff3cd;
            border: 2px solid #ffc107;
            border-radius: 8px;
            padding: 1rem;
            margin-top: 1rem;
            animation: pulse 2s infinite;
        `;
        
        warningElement.innerHTML = `
            <h4 style="color: #856404; margin-bottom: 0.5rem;">
                <i class="fas fa-exclamation-triangle"></i> Atención: Seguridad
            </h4>
            <p style="color: #856404; font-size: 0.85rem; margin-bottom: 0.5rem;">
                Está usando las credenciales por defecto. Por seguridad, cámbielas después del primer acceso.
            </p>
            <button onclick="showChangePasswordInfo()" style="
                background-color: #ffc107;
                color: #212529;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 0.8rem;
                cursor: pointer;
            ">¿Cómo cambiar?</button>
        `;
        
        helpSection.appendChild(warningElement);
    }
}

// Show how to change password info
function showChangePasswordInfo() {
    alert(`Para cambiar la contraseña:

1. Inicie sesión con las credenciales actuales
2. En el panel de administración, busque la opción "Cambiar Contraseña"
3. O modifique las credenciales en el código JavaScript

¡Es importante cambiar las credenciales por defecto para mantener la seguridad!`);
}

// Export functions for use in admin panel
window.AuthSystem = AuthSystem;
window.openChangePasswordModal = openChangePasswordModal;
