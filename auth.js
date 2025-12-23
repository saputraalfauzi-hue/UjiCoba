document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.login-container')) {
        initAuthPage();
    }
});

function initAuthPage() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerLink = document.getElementById('registerLink');
    const backToLogin = document.getElementById('backToLogin');
    const loginBox = document.querySelector('.login-box');
    const registerBox = document.getElementById('registerBox');
    const togglePassword = document.getElementById('togglePassword');
    const togglePasswordReg = document.getElementById('togglePasswordReg');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    if (togglePasswordReg) {
        togglePasswordReg.addEventListener('click', function() {
            const passwordInput = document.getElementById('passwordReg');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginBox.style.display = 'none';
            registerBox.style.display = 'block';
        });
    }
    
    if (backToLogin) {
        backToLogin.addEventListener('click', function() {
            registerBox.style.display = 'none';
            loginBox.style.display = 'block';
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            if (!username || !password) {
                alert('Silakan isi semua field');
                return;
            }
            
            showLoading();
            
            setTimeout(() => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', username.includes('@') ? username.split('@')[0] : username);
                localStorage.setItem('userHandle', '@' + (username.includes('@') ? username.split('@')[0] : username));
                localStorage.setItem('userAvatar', `https://i.pravatar.cc/150?u=${username}`);
                
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('usernameReg').value;
            const password = document.getElementById('passwordReg').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!fullName || !email || !username || !password || !confirmPassword) {
                alert('Silakan isi semua field');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Password tidak cocok');
                return;
            }
            
            if (password.length < 8) {
                alert('Password harus minimal 8 karakter');
                return;
            }
            
            showLoading();
            
            setTimeout(() => {
                alert('Pendaftaran berhasil! Silakan masuk dengan akun Anda.');
                
                registerBox.style.display = 'none';
                loginBox.style.display = 'block';
                registerForm.reset();
            }, 1500);
        });
    }
    
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
            alert(`Login dengan ${platform} akan diimplementasikan pada versi lengkap.`);
        });
    });
    
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
    }
}

function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Memproses...</p>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f0f0f0;
            border-top: 5px solid #4a5fc1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        if (loadingOverlay.parentNode) {
            loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 1500);
}