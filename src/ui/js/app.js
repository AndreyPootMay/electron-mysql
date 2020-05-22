const { remote } = require('electron');
const main = remote.require('./main');

const productForm = document.getElementById('productForm');

const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');

const productsList = document.getElementById('products');

let products = [];
let editingStatus = false;
let editProductId = '';

productForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        const product = {
            name: productName.value,
            price: productPrice.value,
            description: productDescription.value,
        };

        if (!editingStatus) {
            const savedProduct = await main.createProduct(product);
            console.log(savedProduct);
        } else {
            const productUpdated = await main.updateProduct(editProductId, product);
            console.log(productUpdated);

            // Reset
            editingStatus = false;
            editProductId = "";
        }

        productForm.reset();
        productName.focus();
        await getProducts();
    } catch (error) {
        console.log(error);
    }
});

function renderProducts(tasks) {
    productsList.innerHTML = "";
    tasks.forEach((product) => {
        productsList.innerHTML += `
        <div class="card card-body my-2 animated fadeInLeft">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <h3>${product.price}$</h3>
          <p>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">
            DELETE
          </button>
          <button class="btn btn-secondary btn-sm" onclick="editProduct('${product.id}')">
            EDIT 
          </button>
          </p>
        </div>
      `;
    });
}

let deleteProduct = async (id) => {
    const response = confirm('Are you sure you want to delete this product?');

    if (response) {
        await main.deleteProduct(id);
        getProducts();
    }

    return;
};

const editProduct = async (id) => {
    const product = await main.getProductById(id);
    productName.value = product[0].name;
    productPrice.value = product[0].price;
    productDescription.value = product[0].description;

    editingStatus = true;
    editProductId = id;
};

const getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products);
};

async function init() {
    getProducts();
};

init();