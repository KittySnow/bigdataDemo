var goods = {
    insert:'INSERT INTO orders(orderid,orderdate,isCancel,orderFromDate,orderEndDate,roomid) VALUES(?,?,?,?,?,?)',
    update:'update orders set goodsName=?, goodsNum=? ,memo=?,position=? where id=?',
    remove: 'delete from orders where id=?',
    queryById: 'select * from orders where id=?',
    queryAll: 'select * from orders'
};

module.exports = goods;