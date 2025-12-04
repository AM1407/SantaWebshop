type ToastType = 'success' | 'danger' | 'info' | 'warning';

export function showToast(message: string, type: ToastType = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0 show`;
    toastEl.style.zIndex = '1060'; // Ensure it sits on top
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    container.appendChild(toastEl);

    setTimeout(() => {
        toastEl.remove();
    }, 3500);
}