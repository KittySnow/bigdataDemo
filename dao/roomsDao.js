// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../db.js');
var $util = require('../util/util');
var $sql = require('./roomsSqlMapping');
/*var $sqlBox = require('./itemBoxSqlMapping');*/

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {

        var param = req.body;

        //if(Object.prototype.toString.call(param.tel) == '[object Array]'){
        //    param.tel=JSON.stringify(param.tel);
        //}

        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数

            // 建立连接，向表中插入值
            connection.query($sql.insert, [param.roomid, +param.roomname], function(err, result) {

                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }else{
                    return 'wrong';
                }
                // 以json形式，把操作结果返回给前台页面
                //jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });

    },
    addBox: function (req, res, next) {

        var param = req.body;
        //if(Object.prototype.toString.call(param.tel) == '[object Array]'){
        //    param.tel=JSON.stringify(param.tel);
        //}

        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数

            // 建立连接，向表中插入值
            connection.query($sqlBox.maxPosId, [], function(err, res1) {
                var max = res1[0].m;
                connection.query($sqlBox.insert, [param.boxName,+max+1], function(err, result) {
                    if(result) {
                        result = {
                            code: 200,
                            msg:'增加成功'
                            };
                    }
                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result);
                    // 释放连接
                    connection.release();
                });

            });

        });

    },
    remove: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.remove, id, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.goodsName == null || param.goodsNum == null || param.id == null || param.memo == null|| param.position == null ) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.goodsName, +param.goodsNum, param.memo, +param.position,+param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    console.log(result);
                    /*res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用*/
                } else {
                    /*res.render('fail',  {
                        result: result
                    });*/
                }

                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                //jsonWrite(res, result);
                if(Object.prototype.toString.call(result) == '[object Array]'){
                    res.render('item/edit', { item: result[0]});

                }else{
                    jsonWrite(res, result);
                }
                connection.release();

            });
        });
    },
    queryByDate: function (req, res, next) {
        var orderFromDate = req.query.orderFromDate;
        var orderEndDate = req.query.orderEndDate;
        console.log(orderFromDate);
        console.log(orderEndDate);
        var sql = $sql.queryByDate;

        /*if(!orderEndDate){
            sql=sql.replace('or orderEndDate < ?','');
        }
        if(!orderFromDate){
            sql=sql.replace('orderFromDate > ? or','');
            pool.getConnection(function(err, connection) {
                connection.query($sql,orderEndDate, function(err, result){
                    res.render('rooms/list', {list: result});
                    return false
                })
            });
        }*/

        pool.getConnection(function(err, connection) {
            connection.query(sql,[orderFromDate,orderEndDate], function(err, result){
                res.render('rooms/list', {list: result});
            })
        });






    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                console.log(result);
                //console.log(result[13]);
                /*connection.query($sqlBox.queryAll, function(err, result1) {
                    console.log(result1);
                    var newObject = {};
                    if(Object.prototype.toString.call(result1) == '[object Array]'){
                        for(var i=0;i<result1.length ;i++ ){
                            newObject['p'+result1[i].position] =  result1[i].boxName;
                        }
                    }
                    console.log('newObject',newObject);
                    res.render('room/list', { list: result ,obj: newObject});
                    connection.release();
                });*/

                res.render('rooms/list', {list: result});
            });
        });
    },

    queryAllBox: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sqlBox.queryAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    }

};