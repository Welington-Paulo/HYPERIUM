// --- AUTH.JS (para login.html) ---

document.addEventListener('DOMContentLoaded', () => {
    const loginFormContainer = document.getElementById('loginFormContainer');
    const registerFormContainer = document.getElementById('registerFormContainer');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authMessage = document.getElementById('authMessage');

    function displayAuthMessage(message, type) {
        if(authMessage) {
            authMessage.textContent = message;
            authMessage.className = 'auth-message'; 
            authMessage.classList.add(type);
        }
    }

    if(showRegisterBtn && loginFormContainer && registerFormContainer) {
        showRegisterBtn.addEventListener('click', () => {
            loginFormContainer.classList.add('hidden');
            registerFormContainer.classList.remove('hidden');
            if(authMessage) {
                authMessage.textContent = '';
                authMessage.className = 'auth-message';
            }
        });
    }

    if(showLoginBtn && loginFormContainer && registerFormContainer) {
        showLoginBtn.addEventListener('click', () => {
            registerFormContainer.classList.add('hidden');
            loginFormContainer.classList.remove('hidden');
            if(authMessage) {
                authMessage.textContent = '';
                authMessage.className = 'auth-message';
            }
        });
    }

    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(authMessage) { authMessage.textContent = ''; authMessage.className = 'auth-message'; }
            
            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');

            if (!emailInput || !passwordInput) return;

            const email = emailInput.value;
            const password = passwordInput.value;

            if (!email || !password) {
                displayAuthMessage('Por favor, preencha email e senha.', 'error');
                return;
            }
            
            console.log('Tentativa de login com:', email);
            localStorage.setItem('userProfileName', 'Usuário Teste');
            localStorage.setItem('isLoggedIn', 'true');
            displayAuthMessage('Login realizado com sucesso! Redirecionando...', 'success');
            
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        });
    }

    if(registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(authMessage) { authMessage.textContent = ''; authMessage.className = 'auth-message'; }

            const nameInput = document.getElementById('registerName');
            const emailInput = document.getElementById('registerEmail');
            const passwordInput = document.getElementById('registerPassword');
            const confirmPasswordInput = document.getElementById('registerConfirmPassword');

            if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) return;

            const name = nameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (!name || !email || !password || !confirmPassword) {
                displayAuthMessage('Por favor, preencha todos os campos.', 'error');
                return;
            }
            if (password !== confirmPassword) {
                displayAuthMessage('As senhas não coincidem.', 'error');
                return;
            }
            if (password.length < 6) {
                displayAuthMessage('A senha deve ter pelo menos 6 caracteres.', 'error');
                return;
            }

            console.log('Tentativa de registro:', { name, email });
            localStorage.setItem('userProfileName', name);
            localStorage.setItem('isLoggedIn', 'true');
            displayAuthMessage('Cadastro realizado com sucesso! Redirecionando...', 'success');
            
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        });
    }
});