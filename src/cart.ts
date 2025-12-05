export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}


export let cart: CartItem[] = [];

const productList = document.querySelector('#productList');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total-price');
const cartItemsList = document.querySelector('#cart-items-list');
const cartDropdown = document.querySelector('#cart-dropdown');
const shoppingCartBtn = document.querySelector('#shoppingCartButton');
const closeCartBtn = document.querySelector('#close-cart');


export function resetCart() {
    cart = [];
    updateCartUI();
}

export function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems.toString();

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = `€${totalPrice.toFixed(2)}`;

    if (cartItemsList) {
        if (cart.length === 0) {
            cartItemsList.innerHTML = `<li class="text-muted text-center py-2">Your sleigh is empty!</li>`;
        } else {
            cartItemsList.innerHTML = cart.map(item => `
                <li class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                    <div>
                        <div class="fw-bold">${item.name}</div>
                        <small class="text-muted">€${item.price.toFixed(2)} x ${item.quantity}</small>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-outline-secondary decrease-btn" data-id="${item.id}">-</button>
                        <button class="btn btn-sm btn-outline-danger remove-btn" data-id="${item.id}">&times;</button>
                    </div>
                </li>
            `).join('');
        }
    }
}

function addToCart(id: string, name: string, price: number) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
    cartDropdown?.classList.add('show');
}

if (productList) {
    productList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const button = target.closest('.add-to-cart-btn') as HTMLElement;

        if (button) {
            const id = button.dataset.id!;
            const name = button.dataset.name!;
            const price = parseFloat(button.dataset.price!);
            addToCart(id, name, price);
        }
    });
}

if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        if (target.classList.contains('remove-btn')) {
            const id = target.dataset.id;
            cart = cart.filter(item => item.id !== id);
            updateCartUI();
        }

        if (target.classList.contains('decrease-btn')) {
            const id = target.dataset.id;
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity--;
                if (item.quantity === 0) {
                    cart = cart.filter(i => i.id !== id);
                }
                updateCartUI();
            }
        }
    });
}

shoppingCartBtn?.addEventListener('click', () => {
    cartDropdown?.classList.toggle('show');
});

closeCartBtn?.addEventListener('click', () => {
    cartDropdown?.classList.remove('show');
});