var express = require('express');
var router = express.Router();

var ordersDao = require('../dao/ordersDao');


router.get('/add', function(req, res, next) {
  res.render('orders/add');
});

router.get('/addBox', function(req, res, next) {
  res.render('orders/addBox');
});

/* GET orders listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('updateItemIfo');
});


router.post('/addItem', function(req, res, next) {
  ordersDao.add(req, res, next);
  res.redirect('/orders/queryAll');
});

router.post('/insertBox', function(req, res, next) {
  ordersDao.addBox(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
  ordersDao.queryAll(req, res, next);
});

router.get('/queryByGoodsName', function(req, res, next) {
  ordersDao.queryByName(req, res, next);
});
router.get('/queryByBoxName', function(req, res, next) {
  ordersDao.queryByName(req, res, next);
});


router.get('/query', function(req, res, next) {
  ordersDao.queryById(req, res, next);
});

router.get('/deleteItem', function(req, res, next) {
  ordersDao.remove(req, res, next);
});

router.post('/updateItem', function(req, res, next) {
  ordersDao.update(req, res, next);
  res.redirect('/orders/queryAll');
});

module.exports = router;
