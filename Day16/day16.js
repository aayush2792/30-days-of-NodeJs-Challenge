const mongoose = require('mongoose');

function connectToMongoDB(){
    const mongo = 'mongodb://localhost/myDatabase';
    mongoose.connect(mongo);
    mongoose.connection.once('open', () => {
        console.log('Connected');
    });
    mongoose.connection.on('error', ()=> {
        console.log('Error');
    });
}

connectToMongoDB();