module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next) {
        res.render('addroom', { title: 'Jing\'s Pets' });
    });

    router.post("/", function(req, res){
        console.log("ADDING Room");
        console.log(req.body);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO room (room.name, room.area) VALUES (?, ?);";

        var inserts = [req.body.roomName, req.body.roomArea];

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log(inserts);
                res.redirect('/viewroom');
            }
        });
    });
    return router;
}();