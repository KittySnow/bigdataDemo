var express = require('express');
var router = express.Router();

var roomsDao = require('../dao/roomsDao');


router.get('/add', function(req, res, next) {
  res.render('rooms/add');
});

router.get('/addBox', function(req, res, next) {
  res.render('rooms/addBox');
});

/* GET rooms listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('updateItemIfo');
});


router.post('/addItem', function(req, res, next) {
  roomsDao.add(req, res, next);
  res.redirect('/rooms/queryAll');
});

router.post('/insertBox', function(req, res, next) {
  roomsDao.addBox(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
  roomsDao.queryAll(req, res, next);
});

router.get('/queryByDate', function(req, res, next) {
  roomsDao.queryByDate(req, res, next);
});
router.get('/queryByBoxName', function(req, res, next) {
  roomsDao.queryByName(req, res, next);
});


router.get('/query', function(req, res, next) {
  roomsDao.queryById(req, res, next);
});

router.get('/deleteItem', function(req, res, next) {
  roomsDao.remove(req, res, next);
});

router.post('/updateItem', function(req, res, next) {
  roomsDao.update(req, res, next);
  res.redirect('/rooms/queryAll');
});

module.exports = router;
