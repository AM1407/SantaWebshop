const userName = document.querySelector('#usernameInput') as HTMLInputElement;
const password = document.querySelector('#passwordInput') as HTMLInputElement;
const loginBtn = document.querySelector('#loginBtn') as HTMLButtonElement;
const checkBox = document.querySelector('#rememberMe') as HTMLInputElement;

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

    fetch('https://example.com/api/users')
        .then(response => response.json())
        .then((users: User[]) => {
            const user = users.find(u => u.email === username && u.password === passwordValue);
            if (user) {
                alert(`Welcome, ${user.name}!`);
                if (rememberMe) {
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                }
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password.');
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('An error occurred while trying to log in. Please try again later.');
        });
})

