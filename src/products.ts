
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image?: string;
    rating?: { rate: number; count: number };
}

const productList = document.querySelector('#productList') as HTMLElement;
const searchInput = document.querySelector('#searchInput') as HTMLInputElement;
const searchForm = document.querySelector('#searchInput')?.closest('form');

let allProducts: Product[] = [];

function createProductCard(product: Product): string {
    const imageUrl = product.image || 'https://placehold.co/300x300/png?text=Gift';

    const ratingHtml = product.rating
        ? `<small class="text-warning"><i class="fa-solid fa-star"></i> ${product.rating.rate}</small>`
        : `<small class="text-muted"><i class="fa-regular fa-star"></i> New</small>`;

    const isOutOfStock = product.stock === 0;
    const stockBadge = isOutOfStock
        ? '<span class="badge bg-secondary">Out of Stock</span>'
        : `<span class="badge bg-success">${product.stock} left</span>`;

    const btnState = isOutOfStock ? 'disabled' : '';

    return `
    <div class="col-sm-6 col-md-4 col-lg-4">
        <div class="card h-100 shadow-sm product-card">
            <div class="position-relative bg-white border-bottom" style="height: 250px; overflow: hidden;">
                <img src="${imageUrl}" 
                     class="card-img-top w-100 h-100 object-fit-contain p-3" 
                     alt="${product.name}">
                
                <div class="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1 align-items-end">
                    <span class="badge bg-danger rounded-pill shadow-sm">€${product.price.toFixed(2)}</span>
                    ${stockBadge}
                </div>
            </div>
            
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-truncate" title="${product.name}">${product.name}</h5>
                
                
                <p class="card-text small text-muted">${product.description}</p>
                
                <div class="mt-auto pt-3 d-flex justify-content-between align-items-center border-top">
                    ${ratingHtml}
                    
                    <button 
                        class="btn btn-outline-success btn-sm add-to-cart-btn" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}" 
                        ${btnState}
                    >
                        <i class="fa-solid fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderProducts(products: Product[]) {
    if (!productList) return;
    if (products.length === 0) {
        productList.innerHTML = `
            <div class="col-12 text-center mt-5">
                <i class="fa-solid fa-sleigh fa-3x text-muted mb-3"></i>
                <h3 class="text-muted">No toys found!</h3>
                <p>Santa's elves are looking everywhere...</p>
            </div>
        `;
        return;
    }
    productList.innerHTML = products.map(createProductCard).join('');
}

async function initShop() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) throw new Error('Failed to connect DB');

        const data = await response.json() as Product[];
        allProducts = data;
        renderProducts(allProducts);
    } catch (error) {
        console.error(error);
        if (productList) {
            productList.innerHTML = `<div class="alert alert-danger">Error loading products. Is json-server running?</div>`;
        }
    }
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = (e.target as HTMLInputElement).value.toLowerCase();
        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(val) || p.category.toLowerCase().includes(val)
        );
        renderProducts(filtered);
    });
}

if (searchForm) searchForm.addEventListener('submit', (e) => e.preventDefault());

document.addEventListener('DOMContentLoaded', () => {
    if (productList) {
        void initShop();
    }
});