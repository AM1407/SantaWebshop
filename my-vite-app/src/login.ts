const userName = document.querySelector('#usernameInput') as HTMLInputElement;
const password = document.querySelector('#passwordInput') as HTMLInputElement;
const loginBtn = document.querySelector('#loginBtn') as HTMLButtonElement;
const checkBox = document.querySelector('#rememberMe') as HTMLInputElement;

const loginOverlay = document.querySelector('#login-overlay');
const userDisplay = document.querySelector('#loggedInUser');

let loggedInUser: User | null = null;

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = userName.value;
    const passwordValue = password.value;
    const rememberMe = checkBox.checked;

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then((users: User[]) => {
            const user = users.find(u => u.name === username && u.password === passwordValue);
            if (user) {
                loggedInUser = user;
                alert(`Welcome, ${user.name}!`);
                if (rememberMe) {
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                }

            loginOverlay?.classList.add('d-none');

            if (userDisplay) {
                userDisplay.textContent = user.name;
            }
            } else {
                alert('Invalid username or password. Please try again.');
            }
        })

        .catch(error => {
            console.error('Error fetching users:', error);
            alert('An error occurred while trying to log in. Please try again later.');
        });
});

window.addEventListener('load', () => {

    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);


        if (userName) userName.value = parsedUser.name;
        if (password) password.value = parsedUser.password;


        if (checkBox) checkBox.checked = true;


    }


    const activeSession = sessionStorage.getItem('loggedInUser');
    if (activeSession) {
        const parsedSession: User = JSON.parse(activeSession);
        loggedInUser = parsedSession;
        loginOverlay?.classList.add('d-none');
        if (userDisplay) userDisplay.textContent = parsedSession.name;
    }
});

