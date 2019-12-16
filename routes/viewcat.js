module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Jing\'s Pets' };
        context.jsscripts = ["deletecat.js"];
        var mysql = req.app.get('mysql');
        getCat(res,mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('viewcat',context);
            }
        }});

    function getCat(res, mysql, context, done){
        var sql = 'SELECT cat_id as catID, cat.name as catName, breed as catBreed, color as catColor, hair as catHair, age as catAge, weight as catWeight, room.name as catRoom FROM cat\n' +
            'LEFT JOIN room ON cat.room = room.room_id\n' +
            'ORDER BY catID ASC;';
        mysql.pool.query(sql,
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.cat = results;
            console.log(context.cat);
            done();
        });
    }

    router.delete('/:id', function(req, res){

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM cat WHERE cat_id = ?";

        var deletes = req.params.id;//[req.params.id]

        sql = mysql.pool.query(sql, deletes, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.status(400);
                res.end();
            }else{
                res.status(202);
                console.log("DELETE CONFIRMED");
                res.end();
            }
        });
    });

    router.get('/:id', function(req,res){
        callbackCount = 0;
        var context = { title: 'Jing\'s Pets' };
        context.jsscripts = ["updatecat.js"];
        var mysql = req.app.get('mysql');
        getOneCat(res, mysql, context, req.params.id, done);
        getRooms(res, mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('updatecat', context);
            }
        }
    });

    router.put('/:id',function(req,res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE cat SET name=?, breed=?, color=?, hair=?, age=?, weight=?, room=? WHERE cat_id=?";
        var updates = [req.body.catName, req.body.catBreed, req.body.catColor, req.body.catHair, req.body.catAge, req.body.catWeight, req.body.room, req.params.id];
        sql = mysql.pool.query(sql,updates,function(error,results,fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                console.log("UPDATE CONFIRMED");
                res.end();
            }
        })
    })

    function getOneCat(res, mysql, context, id, done){
        var sql = 'SELECT cat.cat_id as catID, cat.name as catName, breed as catBreed, color as catColor, hair as catHair, age as catAge, weight as catWeight, room.name as catRoom FROM cat\n' +
        'JOIN room ON cat.room = room.room_id\n' +
        'WHERE cat_id = ?;';
        var updates = [id];
        console.log(updates);

        mysql.pool.query(sql, updates, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.cat = results[0]; //updatecat.hbs{{cat.x}}
            done();
        });
    }

    //updatecat.hbs line21
    function getRooms(res, mysql, context, done){
        mysql.pool.query("SELECT room_id as id, name FROM room", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rooms = results;
            done();
        });
    }

    return router;
}();