const mongoose = require('mongoose');

// Replace these with your actual credentials
const connectionString = 'mongodb://localhost/myDatabase';

mongoose.connect(connectionString)
.then(() => console.log('Connected to MongoDB database'))
.catch(error => console.error('Error connecting to MongoDB:', error));

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    return await newProduct.save();
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    return await Product.find();
  } catch (error) {
    throw error;
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    return await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    return await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw error;
  }
}

// Choose the task you want to perform:

// Create a new product
const newProduct = {
  name: 'Product',
  price: 20.00,
  quantity: 10
};

// createProduct(newProduct)
//   .then(product => console.log('Product created:', product))
//   .catch(error => console.error('Error creating product:', error));

// Comment out the functions you don't want to run.


// Get all products
 getAllProducts()
   .then(products => console.log('All products:', products))
   .catch(error => console.error('Error getting products:', error));

// Update a product (replace ID and data)
// const productId = '...';
// const updatedProduct = {
//   price: 24.99,
//   quantity: 5
// };

// updateProduct(productId, updatedProduct)
//   .then(product => console.log('Product updated:', product))
//   .catch(error => console.error('Error updating product:', error));

// Delete a product (replace ID)
// const productId = '...';

// deleteProduct(productId)
//   .then(() => console.log('Product deleted'))
//   .catch(error => console.error('Error deleting product:', error));