var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/torti-app', {useNewUrlParser: true})
.then(_ => console.log("Successfull MongoDB connection"))
.catch(console.error);
