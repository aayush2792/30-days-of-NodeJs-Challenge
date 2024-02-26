// Function to execute the aggregation pipeline
function getProductStats(collection) {
    const pipeline = [
      {
        $group: {
          _id: null, // Group all documents into one
          count: { $sum: 1 }, // Total number of products
          avgPrice: { $avg: "$price" }, // Average price
          highestQuantity: { $max: "$quantity" }, // Highest quantity
        },
      },
    ];
  
    return collection.aggregate(pipeline).toArray();
  }

const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
    });
const Product = mongoose.model('Product', productSchema);

mongoose.connect('mongodb://localhost/products')
  .then(() => {
    console.log('MongoDB connected ✅');

    // Access the Products collection from the Mongoose model
    const productsCollection = Product.collection;

    getProductStats(productsCollection) // Pass the collection to the function
      .then(productStats => {
        console.log("Product Statistics:", productStats);
      })
      .catch(error => {
        console.error("Error occurred:", error);
      });
  })
  .catch((err) => console.log(err));
