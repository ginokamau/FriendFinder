var path = require("path");

mobile.exports = function(app){
    app.get("/submit", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });
    app.use(function(req, res){
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
}