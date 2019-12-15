module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Jing\'s Pets' };
        context.jsscripts = ["deleteroom.js"];
        var mysql = req.app.get('mysql');
        getRoom(res, mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('viewroom',context);
            }

        }});

    //fill the update form
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = { title: 'Jing\'s Pets' };
        context.jsscripts = [ "updateroom.js"];
        var mysql = req.app.get('mysql');
        getOneRoom(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('updateroom', context);
            }

        }
    });

    //update database actually
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE room SET name=?, area=? WHERE room_id=?";
        var updates = [req.body.roomName, req.body.roomArea, req.params.id];
        console.log(updates);

        sql = mysql.pool.query(sql, updates, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log("Room UPDATED");
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM room WHERE room_id = ?";

        var deletes = [req.params.id];

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

    function getRoom(res, mysql, context, done){
        var sql = "SELECT room_id as roomID, name as roomName, area as roomArea FROM room WHERE room_id != 999;" ;
        mysql.pool.query(sql,
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.room = results;
                console.log(context.room);
                done();
            });
    }

    function getOneRoom(res, mysql, context, id, done){
        var sql = "SELECT room.room_id as roomID, room.name as roomName, area as roomArea FROM room WHERE room.room_id = ?;";
        var updates = id;//[id]
        console.log(updates);

        mysql.pool.query(sql, updates, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.room = results[0];
            done();
        });
    }

    return router;
}();