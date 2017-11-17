// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../db.js');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var fs =  require('fs');
var $multiparty = require('multiparty');


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

        var form = new $multiparty.Form({uploadDir: './public/files'});

            form.parse(req, function(err, fields, files) {
                console.log(fields);
                console.log(files);
                var filesTmp = JSON.stringify(files, null, 2);
                if (err) {
                    console.log('parse error: ' + err);
                } else {
                    console.log('parse files: ' + filesTmp);
                    var inputFile = files.pic[0];
                    var uploadedPath = inputFile.path;
                    var dstPath = '/files/' + inputFile.originalFilename;

                    fs.rename(uploadedPath, dstPath, function (err) {
                        if (err) {
                            console.log('rename error: ' + err);
                        } else {
                            console.log('rename ok');
                        }
                    });
                }
                console.log(fields);
                if(Object.prototype.toString.call(fields.tel) == '[object Array]'){
                    fields.tel=JSON.stringify(fields.tel);
                }

                pool.getConnection(function(err, connection) {
                    // 获取前台页面传过来的参数

                    // 建立连接，向表中插入值
                    connection.query($sql.insert, [fields.name,dstPath, fields.tel, fields.memo], function(err, result) {

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


            })

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
        if(param.name == null || param.tel == null || param.id == null || param.memo == null) {
            jsonWrite(res, undefined);
            return;
        }
        if(Object.prototype.toString.call(param.tel) == '[object Array]'){
            param.tel=JSON.stringify(param.tel);
        }
        console.log(param);
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.tel,param.memo,+param.id], function(err, result) {
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
                    res.render('users/edit', { user: result[0]});

                }else{
                    jsonWrite(res, result);
                }
                connection.release();

            });
        });
    },
    queryAll: function (req, res, next) {
        var param = req.query.dt;
        pool.getConnection(function(err, connection) {

            connection.query($sql.queryAll, function(err, result) {
                connection.query($sql.queryCount,function(err, result1) {
                    if (param == 'json') {
                        jsonWrite(res, {cc:result,iTotalRecords:result1[0].m,iTotalDisplayRecords:10});
                    }else if (param == 'lian') {
                        res.render('users/list-ejs', {list: result});
                    }else {
                        res.render('users/list', {list: result});
                    }
                    connection.release();
                });
            });
        });
    }

};