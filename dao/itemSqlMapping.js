var goods = {
    insert:'INSERT INTO goods(goodsName,goodsNum,memo,position) VALUES(?,?,?,?)',
    update:'update goods set goodsName=?, goodsNum=? ,memo=?,position=? where id=?',
    remove: 'delete from goods where id=?',
    queryById: 'select * from goods where id=?',
    queryByGoodsName:'select * from goods where goodsName like ?',
    queryAll: 'select * from goods'
};

module.exports = goods;