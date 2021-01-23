const express = require('express'); //get the express js 
const morgan = require('morgan'); //get the middleware handler
const mongoose = require('mongoose'); //get the database connection
const blogRoutes = require('./routes/blogRoutes'); //get the middleware handlers that are put for easyness in routing table

// express app
const app = express();
// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://deshan:asrc5964@nodetuts.8fonc.mongodb.net/node-tuts?retryWrites=true&w=majority";
// this is connecting to the local host 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000)) //if the database in connected sucessfully then listen to port 3000
    .catch(err => console.log(err)); //else give an error
// this is connecting to the remote host
const PORT = process.env.PORT || 3000
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT)) //if the database in connected sucessfully then listen to port 3000
    .catch(err => console.log(err)); //else give an error    

// register view engine
app.set('view engine', 'ejs'); //set the view engine and from this middleware the system look at the views dir directly

// middleware & static files
app.use(express.static('public')); // this middleware is for serving static files and the directory is the "public"
app.use(express.urlencoded({ extended: true })); //here to encode the json files comming
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// -------------------------------------------    there all url are comming from the "front end"    ----------------------------------
// routes

// if the comming url ends with /
app.get('/', (req, res) => { //this is the index page 
    res.redirect('/blogs');
});

app.get('/about', (req, res) => { //here if the request is about then output is seen in the about ejs file
    res.render('about', { title: 'About' });
});

app.get('/travel', (req, res) => { //here if the request is about then output is seen in the about ejs file
    res.render('travel', { title: 'Travel details' });
});

// blog routes
app.use('/blogs', blogRoutes); //here call to blogroutes and the path is defined in the import of that directory

// 404 page
app.use((req, res) => { //if for any other page finding it is page not found
    res.status(404).render('404', { title: '404' });
});