const {BrowserWindow, Notification} = require('electron');
const {getConnection} = require('./database');

let window;

async function createProduct(product) {
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price);
    
        const result = await conn.query("INSERT INTO products SET ?", product);
        console.log(result);

        new Notification({
            title: 'Electron - MySQL',
            body: 'New Product Saved Successfully'
        }).show();

        product.id = result.insertId;

        return product;
    } catch (error) {
        console.log(error);
    }
}

async function getProducts() {
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM products ORDER BY id DESC');

    console.log(results);

    return results;
}

async function getProductById(id) {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM products WHERE id = ?', id);

    console.log(result);

    return result;
}

async function updateProduct(id, product) {

    try {        
        const conn = await getConnection();
        const result = await conn.query('UPDATE products SET ? WHERE id = ?', [product, id]);
        
        new Notification({
            title: 'Electron - MySQL',
            body: 'Product Updated Successfully'
        }).show();

        return result[0];
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(id) {
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM products WHERE id = ?', id);

    return result;
};

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.loadFile('src/ui/index.html');
}

module.exports = {
    createWindow,
    createProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
}