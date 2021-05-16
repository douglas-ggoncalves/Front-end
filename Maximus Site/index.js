var express = require("express");
var app = express();
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
})

app.use(function(req, res) { // caso o user tente acessar uma url não identificada ele é redirecionado
    res.redirect("/");
  });

app.listen(8080, (erro) => {
    if (erro) {
        console.log("An error has occurred !");
    } else {
        console.log("Log in");
    }
})