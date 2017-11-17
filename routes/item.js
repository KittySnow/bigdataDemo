var express = require('express');
var router = express.Router();

var itemDao = require('../dao/itemDao');


router.get('/add', function(req, res, next) {
  res.render('item/add');
});

router.get('/addBox', function(req, res, next) {
  res.render('item/addBox');
});

/* GET item listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('updateItemIfo');
});


router.post('/addItem', function(req, res, next) {
  itemDao.add(req, res, next);
  res.redirect('/item/queryAll');
});

router.post('/insertBox', function(req, res, next) {
  itemDao.addBox(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
  itemDao.queryAll(req, res, next);
});

router.get('/queryByGoodsName', function(req, res, next) {
  itemDao.queryByName(req, res, next);
});
router.get('/queryByBoxName', function(req, res, next) {
  itemDao.queryByName(req, res, next);
});


router.get('/query', function(req, res, next) {
  itemDao.queryById(req, res, next);
});

router.get('/deleteItem', function(req, res, next) {
  itemDao.remove(req, res, next);
});

router.post('/updateItem', function(req, res, next) {
  itemDao.update(req, res, next);
  res.redirect('/item/queryAll');
});

module.exports = router;
