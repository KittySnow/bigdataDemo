var box = {
    insert:'INSERT INTO box(boxName,position) VALUES(?,?)',
    update:'update box set boxName=?, position=? where id=?',
    remove: 'delete from box where id=?',
    queryById: 'select * from box where id=?',
    queryAll: 'select * from box',
    maxPosId:'select MAX(position) as m FROM box',
    queryByBoxName:'select * from box where boxName like %?%'
};

module.exports = box;