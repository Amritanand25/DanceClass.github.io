const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amritkart', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("We are connected bro...")
});

const kittySchema = new mongoose.Schema({
   name: String
 });

 kittySchema.methods.speak = function () {
  const greeting = "Meow name is " + this.name +  ". I don't have a name";
  //console.log(greeting);
}

 const Kitten = mongoose.model('harrykitty', kittySchema);

 const harrykitty = new Kitten({ name: 'harrykitty name' });
 const harrykitty2 = new Kitten({ name: 'harrykitty' });
// console.log(harrykitty.name);
//harrykitty.speak();

harrykitty.save(function (err, harrykitty) {
  if (err) return console.error(err);
  //harrykitty.speak();
});

harrykitty2.save(function (err, harrykitty2) {
  if (err) return console.error(err);
 // harrykitty2.speak();
});

Kitten.find({name:"harrykitty"},function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})