
const urlUsers = 'http://localhost:3000/users';
const urlProducts = 'http://localhost:3000/products';


export async function fetchUsers() {
    try {
        const response = await fetch(urlUsers);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataUsers = await response.json();
        return dataUsers;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}


export async function fetchProducts() {
    try {
        const response = await fetch(urlProducts);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataProducts = await response.json();
        return dataProducts;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}