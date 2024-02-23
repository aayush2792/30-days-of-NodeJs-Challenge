const mongoose = require('mongoose');

// Replace these with your actual credentials
const connectionString = 'mongodb://localhost/myDatabase';

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB database'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define Category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Category = mongoose.model('Category', categorySchema);

// Update Product schema with category reference
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } // Reference to Category model
});

const Product = mongoose.model('Product', productSchema);

// CRUD functions for Products
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

// Function to retrieve products with populated category details
async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate('category'); // Populate the category field
    return products;
  } catch (error) {
    throw error;
  }
}

// Example usage
// Uncomment the desired function calls below

// createProduct(newProduct)
//   .then(product => console.log('Product created:', product))
//   .catch(error => console.error('Error creating product:', error));

// getAllProducts()
//   .then(products => console.log('All products:', products))
//   .catch(error => console.error('Error getting products:', error));

getProductsPopulatedWithCategory()
   .then(products => console.log('Products with categories:', products))
   .catch(error => console.error('Error retrieving products with categories:', error));
