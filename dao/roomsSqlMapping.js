var goods = {
    insert:'INSERT INTO rooms(goodsName,goodsNum,memo,position) VALUES(?,?,?,?)',
    update:'update rooms set goodsName=?, goodsNum=? ,memo=?,position=? where id=?',
    remove: 'delete from rooms where id=?',
    queryById: 'select * from rooms where id=?',
    queryByDate:'select * from rooms where roomid in (' +
        'select roomid from orders where orderFromDate > ? or orderEndDate < ?)',
    queryAll: 'select * from rooms'
};

module.exports = goods;