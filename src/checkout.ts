import { cart, resetCart } from './cart';
import { showToast } from './toast';
import emailjs from '@emailjs/browser';

// --- CONFIGURATION ---
// I have pre-filled these from your screenshot:
const SERVICE_ID = "service_nexn2im";
const TEMPLATE_ID = "template_n1qvxhn";
const PUBLIC_KEY = "CxRBlJnj59867LJNw";

// Selectors
const checkoutBtn = document.querySelector('.checkout-btn');
const modalElement = document.getElementById('checkoutModal');
const summaryList = document.getElementById('checkout-summary-list');
const checkoutTotal = document.getElementById('checkout-total-price');
const confirmBtn = document.getElementById('confirmOrderBtn') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancelCheckoutBtn');
const closeXBtn = document.getElementById('closeModalBtn');

// --- MODAL LOGIC ---
function openModal() {
    if (!modalElement) return;

    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    document.body.classList.add('modal-open');

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    backdrop.id = 'custom-backdrop';
    document.body.appendChild(backdrop);

    renderCheckoutSummary();
}

function closeModal() {
    if (!modalElement) return;

    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-open');

    const backdrop = document.getElementById('custom-backdrop');
    if (backdrop) backdrop.remove();
}

function renderCheckoutSummary() {
    if (!summaryList || !checkoutTotal) return;

    if (cart.length === 0) {
        summaryList.innerHTML = '<li class="list-group-item text-center">No items selected</li>';
        checkoutTotal.textContent = '€0.00';
        return;
    }

    summaryList.innerHTML = cart.map(item => `
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">${item.name}</h6>
                <small class="text-muted">Quantity: ${item.quantity}</small>
            </div>
            <span class="text-muted">€${(item.price * item.quantity).toFixed(2)}</span>
        </li>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `€${total.toFixed(2)}`;
}

// --- EMAIL DATA PREPARATION ---
function prepareEmailParams() {
    const storedUser = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');
    const userName = storedUser ? JSON.parse(storedUser).name : "Guest Santa";

    // Build the HTML rows for the email table
    const productRowsHtml = cart.map(item => `
        <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 5px;">
                <div style="font-weight: bold; font-size: 14px; color: #333;">${item.name}</div>
                <div style="color: #777; font-size: 12px;">Qty: ${item.quantity}</div>
            </td>
            <td style="padding: 10px 5px; text-align: right; vertical-align: top;">
                <strong>€${(item.price * item.quantity).toFixed(2)}</strong>
            </td>
        </tr>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = "NP-" + Math.floor(Math.random() * 1000000);

    return {
        to_name: userName,

        // !!! IMPORTANT: CHANGE THIS TO YOUR EMAIL ADDRESS !!!
        to_email: "alessiomicciche@outlook.com",

        order_id: orderId,
        product_rows: productRowsHtml,
        total_price: `€${total.toFixed(2)}`
    };
}

// --- EVENT LISTENERS ---
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            openModal();
        } else {
            showToast("Your sleigh is empty! Add some toys first.", 'warning');
        }
    });
}

cancelBtn?.addEventListener('click', closeModal);
closeXBtn?.addEventListener('click', closeModal);

// --- SEND EMAIL LOGIC ---
if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {

        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...';
        confirmBtn.disabled = true;

        const templateParams = prepareEmailParams();

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                showToast("Ho Ho Ho! Letter sent to North Pole!", 'success');
                resetCart();
                closeModal();
                document.querySelector('.cart-dropdown-menu')?.classList.remove('show');
            })
            .catch((error) => {
                console.error('Email failed:', error);
                showToast("Failed to send letter. Check console.", 'danger');
            })
            .finally(() => {
                confirmBtn.innerHTML = originalText;
                confirmBtn.disabled = false;
            });
    });
}