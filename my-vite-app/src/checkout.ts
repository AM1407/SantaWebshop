import { cart, resetCart } from './cart'; // Import tools from your cart file

// Selectors
const checkoutBtn = document.querySelector('.checkout-btn'); // The button in the dropdown
const modalElement = document.getElementById('checkoutModal');
const summaryList = document.getElementById('checkout-summary-list');
const checkoutTotal = document.getElementById('checkout-total-price');
const confirmBtn = document.getElementById('confirmOrderBtn');
const cancelBtn = document.getElementById('cancelCheckoutBtn');
const closeXBtn = document.getElementById('closeModalBtn');

// Helper to Open Modal
function openModal() {
    if (!modalElement) return;

    // 1. Bootstrap requires this class to show
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    document.body.classList.add('modal-open'); // Adds backdrop effect

    // 2. Add Backdrop manually (since we aren't using Bootstrap JS library)
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    backdrop.id = 'custom-backdrop';
    document.body.appendChild(backdrop);

    renderCheckoutSummary();
}

// Helper to Close Modal
function closeModal() {
    if (!modalElement) return;

    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-open');

    const backdrop = document.getElementById('custom-backdrop');
    if (backdrop) backdrop.remove();
}

// Render Logic
function renderCheckoutSummary() {
    if (!summaryList || !checkoutTotal) return;

    if (cart.length === 0) {
        summaryList.innerHTML = '<li class="list-group-item text-center">No items selected</li>';
        checkoutTotal.textContent = '€0.00';
        return;
    }

    // List Items
    summaryList.innerHTML = cart.map(item => `
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">${item.name}</h6>
                <small class="text-muted">Quantity: ${item.quantity}</small>
            </div>
            <span class="text-muted">€${(item.price * item.quantity).toFixed(2)}</span>
        </li>
    `).join('');

    // Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `€${total.toFixed(2)}`;
}

// Event Listeners
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            openModal();
        } else {
            alert("Your sleigh is empty! Add some toys first.");
        }
    });
}

// Close Buttons
cancelBtn?.addEventListener('click', closeModal);
closeXBtn?.addEventListener('click', closeModal);

// Confirm Purchase
if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        alert("Ho Ho Ho! Your letter has been sent to the North Pole!");
        resetCart(); // Clear the data
        closeModal(); // Close the window

        // Optional: Close the cart dropdown too
        document.querySelector('.cart-dropdown-menu')?.classList.remove('show');
    });
}