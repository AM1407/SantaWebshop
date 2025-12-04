// 1. Interfaces
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

// 2. Wait for HTML to load (Safety wrapper)
document.addEventListener('DOMContentLoaded', () => {

    // Selectors
    const loginForm = document.querySelector('.login-box') as HTMLFormElement; // Select the FORM, not just the button
    const userNameInput = document.querySelector('#usernameInput') as HTMLInputElement;
    const passwordInput = document.querySelector('#passwordInput') as HTMLInputElement;
    const checkBox = document.querySelector('#rememberMe') as HTMLInputElement;

    // UI Containers
    const loginOverlay = document.querySelector('#login-overlay') as HTMLElement;
    const mainApp = document.querySelector('#main-app') as HTMLElement;
    const userDisplay = document.querySelector('#loggedInUser');

    // Debug: Check if elements exist
    if (!loginForm || !loginOverlay || !mainApp) {
        console.error("Critical: HTML elements not found. Check IDs.");
        return;
    }

    // Helper: Hide Login, Show App
    const showApp = (user: User) => {
        console.log("Switching to Main App view...");
        loginOverlay.style.display = 'none';
        mainApp.style.display = 'block';
        if (userDisplay) userDisplay.textContent = user.name;
    };

    // 3. LISTEN TO FORM SUBMIT (Handles Click AND Enter key)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // STOP the page reload
        console.log("Form submitted. Processing login...");

        const username = userNameInput.value;
        const passwordValue = passwordInput.value;
        const rememberMe = checkBox.checked;

        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then((users: User[]) => {
                const user = users.find(u => u.name === username && u.password === passwordValue);

                if (user) {
                    console.log("User found:", user.name);
                    alert(`Welcome, ${user.name}!`);

                    // Save Session
                    if (rememberMe) {
                        localStorage.setItem('loggedInUser', JSON.stringify(user));
                    } else {
                        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                    }

                    // Switch View
                    showApp(user);
                } else {
                    alert('Invalid username or password.');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Login system offline (Check json-server).');
            });
    });

    // 4. Check for existing session on load
    const checkSession = () => {
        const storedUser = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');

        if (storedUser) {
            const user: User = JSON.parse(storedUser);
            console.log("Session found for:", user.name);
            showApp(user);
        } else {
            // Ensure correct initial state
            console.log("No session. Showing login.");
            loginOverlay.style.display = 'flex'; // Make sure flex/block matches your CSS
            mainApp.style.display = 'none';
        }
    };

    checkSession();
});