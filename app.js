const express = require("express");
const path = require("path");
// const fs = require("fs");
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
const port = 80;

var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactschema);
//app.use(express.static('static',options))
app.use('/static', express.static('static')) // For serving static files

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.urlencoded())
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/services',(req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})
app.get('/about',(req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/classinfo',(req, res)=>{
    const params = {}
    res.status(200).render('classinfo.pug', params);
})
app.post('/contact', (req, res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been save to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
   // res.status(200).render('contact.pug');
})


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});