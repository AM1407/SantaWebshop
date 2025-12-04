interface product{
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    description: string;
}

const productList = document.querySelector('#productList') as HTMLElement;
const searchInput = document.querySelector('#searchInput') as HTMLInputElement;
const searchForm = document.querySelector('#searchInput')?.closest('form');

let allProducts: Product[] = [];

function createProductCard(product: Product): string{
    return `
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm product-card">
            <div class="position-relative" style="height: 200px; overflow: hidden;">
                <img src="${product.image}" class="card-img-top w-100 h-100 object-fit-contain p-3 alt="${product.title}">
                <span class="position-absolute top-0 end-0 badge bg-danger m-2 rounded-pill">
                    $${product.price.toFixed(2)}
                </span>
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-truncate" title="${product.title}">${product.title}</h5>
                <p class="card-text small text-muted text-truncate">${product.description}</p>
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

function renderProducts(products: Product[]) {
    if (!productList) return;

    if (products.length === 0) {
        productList.innerHTML =
        `<div class="col-12 text-center mt-5">
            <i class="fa-solid fa-sleigh fa-3x text-muted mb-3"></i>
            <h3 class="text-muted">No products found</h3>
            <p>Santa's elves are looking everywhere...</p>
        </div>`;
        return;
    }

    productList.innerHTML = products.map(createProductCard).join('');
}

async function initShop() {
    try {
        const response = await fetch('https://localhost:3000/products');

        if (!response.ok) throw new Error('Failed to connect to Santa\'s database');

        const data = await response.json();
        allProducts = data;
        renderProducts(allProducts);

    } catch (error) {
        console.error(error);
        if (productList) {
            productList.innerHTML = `<div class="alert alert-danger">Error loading products. Is json-server running?</div>`;
        }
    }
}



