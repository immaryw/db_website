module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next) {
        var callbackCount = 0;
        var context = { title: 'Jing\'s Pets' };
        var mysql = req.app.get('mysql');
        getRoom(res,mysql,context,done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('addcat', context);
            }
        }});

    function getRoom(res, mysql, context, done){
        mysql.pool.query("SELECT room_id as id, name FROM room", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.room = results;
            done();
        });
    }

    router.post('/', function(req, res){
        console.log("Adding Cat");
        console.log(req.body);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO cat (name, breed, color, hair, age, weight, room) VALUES (?, ?,?,?,?,?,?);";

        var inserts = [req.body.catName, req.body.catBreed, req.body.catColor, req.body.catHair, req.body.catAge, req.body.catWeight, req.body.room];

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log(inserts);
                res.redirect('/viewcat');
            }
        });
    });
    return router;
}();