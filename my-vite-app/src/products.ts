// 1. Define the Product Interface (Make sure this has a capital 'P')
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

// 2. Select DOM Elements
const productList = document.querySelector('#productList') as HTMLElement;
const searchInput = document.querySelector('#searchInput') as HTMLInputElement;
const searchForm = document.querySelector('#searchInput')?.closest('form');

// State to hold all products (Ensure 'Product[]' uses capital P)
let allProducts: Product[] = [];

// 3. Function to Create HTML for a Single Card
// (Ensure 'product: Product' uses capital P)
function createProductCard(product: Product): string {
    return `
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm product-card">
            <div class="position-relative" style="height: 200px; overflow: hidden;">
                <img src="${product.image}" class="card-img-top w-100 h-100 object-fit-contain p-3" alt="${product.title}">
                <span class="position-absolute top-0 end-0 badge bg-danger m-2 rounded-pill">
                    €${product.price.toFixed(2)}
                </span>
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-truncate" title="${product.title}">${product.title}</h5>
                <p class="card-text small text-muted text-truncate">${product.category}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <small class="text-warning">
                        <i class="fa-solid fa-star"></i> ${product.rating.rate}
                    </small>
                    <button class="btn btn-outline-success btn-sm add-to-cart-btn" data-id="${product.id}">
                        <i class="fa-solid fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// 4. Function to Render the List
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

    // Join all card strings and inject into HTML
    productList.innerHTML = products.map(createProductCard).join('');
}

// 5. Fetch Logic
async function initShop() {
    try {
        const response = await fetch('http://localhost:3000/products');

        if (!response.ok) throw new Error('Failed to connect to Santa\'s database');

        // Explicitly tell TypeScript the data we got back is an array of 'Product'
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

// 6. Search Logic
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();

        const filtered = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        renderProducts(filtered);
    });
}

// Prevent form submit refresh
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

// Start the shop when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (productList) {
        initShop();
    }
});