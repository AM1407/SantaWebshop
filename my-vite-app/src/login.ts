interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.querySelector('.login-box') as HTMLFormElement;
    const userNameInput = document.querySelector('#usernameInput') as HTMLInputElement;
    const passwordInput = document.querySelector('#passwordInput') as HTMLInputElement;
    const checkBox = document.querySelector('#rememberMe') as HTMLInputElement;

    const loginOverlay = document.querySelector('#login-overlay') as HTMLElement;
    const mainApp = document.querySelector('#main-app') as HTMLElement;

    const userDisplay = document.querySelector('#loggedInUser');
    const welcomeBackMsg = document.querySelector('#welcomeBack');

    const logoutBtn = document.querySelector('#logoutBtn');

    if (!loginForm || !loginOverlay || !mainApp) {
        console.error("Critical: HTML elements not found.");
        return;
    }

    const showApp = (user: User) => {
        console.log("Switching to App View...");

        loginOverlay.style.display = 'none';
        mainApp.style.display = 'block';

        if (userDisplay) userDisplay.textContent = user.name;

        if (welcomeBackMsg) {
            welcomeBackMsg.textContent = `Welcome back, ${user.name}!`;
        }
    };

    const handleLogout = () => {
        if (confirm("Are you sure you want to leave the workshop?")) {
            localStorage.removeItem('loggedInUser');
            sessionStorage.removeItem('loggedInUser');

            loginOverlay.style.display = 'flex';
            mainApp.style.display = 'none';

            userNameInput.value = '';
            passwordInput.value = '';

            if (userDisplay) userDisplay.textContent = "Guest";
        }
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = userNameInput.value;
        const passwordValue = passwordInput.value;
        const rememberMe = checkBox.checked;

        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then((users: User[]) => {
                const user = users.find(u => u.name === username && u.password === passwordValue);

                if (user) {
                    if (rememberMe) {
                        localStorage.setItem('loggedInUser', JSON.stringify(user));
                    } else {
                        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                    }
                    showApp(user);
                } else {
                    alert('Invalid username or password.');
                }
            })
            .catch(error => {
                console.error(error);
                alert('Login system offline.');
            });
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    const checkSession = () => {
        const storedUser = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');

        if (storedUser) {
            const user: User = JSON.parse(storedUser);
            showApp(user);
        } else {
            loginOverlay.style.display = 'flex';
            mainApp.style.display = 'none';
        }
    };

    checkSession();
});