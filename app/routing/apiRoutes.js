var dawgz = require("../data/dawgPound.js");

module.exports = function(app){
    app.get("/api/dawgPound", function(req, res){
        res.json(dawgz);
    });

    app.post("/api/dawgPound", function(req, res){
        var totalDawgDiff = 0;
        var dawgMatch = {
            name: "",
            photo: "",
            dawgDiff: 1000
        };
        var dawgData = req.body;
        var dawgName = dawgData.name;
        var dawgScores = dawgData.scores;
        
        var dc = dawgScores.map(function(item){
            return parseInt(item, 10);
        }); 
        dawgData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: dc
        };

        console.log("New Fan Name:  "+dawgName);
        console.log("Scores:  "+dawgScores);
        var sum = dc.reduce((a, dc) => a+dc, 0);
        console.log("Sum of scores:  "+sum);
        console.log("Best match Dawg Differential:  "+dawgMatch.dawgDiff);
        console.log("[[[[[[[[[[===============\\\---------------///=============]]]]]]]]]]");

        for(var i=0;i<dawgz.length;i++){
            console.log("Name:  "+dawgz[i].name);
            totalDawgDiff = 0;
            console.log("Total dawgDiff:  "+totalDawgDiff);
            console.log("Best Dawg match dawgDiff"+dawgMatch.dawgDiff);

            var dcScore = dawgz[i].scores.reduce((a, dc) => a+dc, 0);
            console.log("Dawg Check Score:  "+dcScore);
            totalDawgDiff += Math.abs(sum - dcScore);
            console.log("------------------------------------->   "+totalDawgDiff);

            if (totalDawgDiff <= dawgMatch.dawgDiff){
                dawgMatch.name = dawgz[i].name;
                dawgMatch.photo = dawgz[i].photo;
                dawgMatch.dawgDiff = totalDawgDiff;
            }
            console.log(totalDawgDiff+" Total Dawg Differential");
        }
        console.log(dawgMatch);
        dawgz.push(dawgData);
        console.log("New Fan added");
        console.log(dawgData);
        res.json(dawgMatch);

    });
};