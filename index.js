//Add express to your file by requiring the package/ framework

const express = require('express');

//It is a norm to use this format as used my developers
//This express function consist of multiple other methods and properties
const app = express();

//fetching or requiring path module which is part of express
const path = require('path');

//fetching or requiring API data mimic file

const redditData = require('./data.json');

//Serving our static files
app.use(express.static(path.join(__dirname, '/public')));

//Set EJS to be the view engine
app.set('view engine', 'ejs');

//set the default folder to view ejs file
app.set('views', path.join(__dirname, '/views'));

//Create homepage route 
app.get('/', (req, res) => {
    //TO check the server is working we send a string first
    // res.send("Server is working !");

    //Sending an view file as response after rendering to html file
    //It by default looks in views folder thus only filename Required
    res.render('home.ejs');
});

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    
    //Choose data by using object property while peropetyName is provided by user
    //As Reddit data has three properties soccer, chicken and harvest
    const data = redditData[subreddit];
    //We always pass variable as an object but we can simply write its name too
    //If we pass an object is is passed an object thats it
    if(data){
    res.render('subreddit.ejs', {...data, subreddit: subreddit});
    } else {
        res.render('notfound.ejs', {subreddit: subreddit});
    }
});

app.get('/random', (req, res) => {
    //passing num variable by storing a random num as an obj
    const num = Math.floor((Math.random() * 10) + 1);
    //We generally pass both key and value pair with same name
    res.render("random.ejs", {num: num});
});

app.get('/cats', (req, res) => {
    const cats = ['monty', 'rasberry', 'tom', 'walter', 'nilofer'];
    res.render('cats.ejs', {cats: cats});
});

//Start your server
app.listen(3000, () => {
    console.log("Listening to port 3000");
});