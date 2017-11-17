var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');


router.get('/add', function(req, res, next) {
  res.render('users/add');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/list-json');
});


router.post('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
  res.redirect('/users/queryAll');
});


router.get('/queryAll', function(req, res, next) {
  userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
  userDao.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
  userDao.remove(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
  userDao.update(req, res, next);
  res.redirect('/users/queryAll');
});

module.exports = router;
