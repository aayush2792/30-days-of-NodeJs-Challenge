const mongoose = require('mongoose');
function connectToMongoDB(){
    mongoose.connect('mongodb://localhost:27017/myDatabase');
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.error(err);
    });
    db.once('open', () =>{
        console.log('Connected');
    });
}
connectToMongoDB();

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: { type: String, required: true, unique:true},
});

const User = mongoose.model('User', userSchema);

async function addUserToDatabase(user){
    try{
        const newUser = new User ({ username: user.username, email: user.email});
        await newUser.save();
        console.log('User data added', newUser);
    } catch (error){
        console.error('Error: ', error.message);
    }
}

addUserToDatabase({ username: 'Ash', email: 'ash123@345.com' });