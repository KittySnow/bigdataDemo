var user = {
    insert:'INSERT INTO user(name,pic,tel,memo) VALUES(?,?,?,?)',
    update:'update user set name=?, tel=? ,memo=? where id=?',
    remove: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryByName: 'select * from user where name=?',
    queryByTel: 'select * from user where tel=?',
    queryAll: 'select * from user',
    queryCount:'select count(*) as m from user'
};

module.exports = user;