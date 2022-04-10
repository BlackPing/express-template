const mariadb = require('../lib/DBConnect');
var sql = 'select * from test';
var sql1 = 'select * from test';
var sql2 = 'select * from test';

var sqlps = [1, 2];
var sqlps1 = [1, 2];
var sqlps2 = [1, 2];

var test_array = [];
var test2_array = [];
var test_object = {};
test_array.push(sql);
test_array.push(sql1);
test_array.push(sql2);

test2_array.push(sqlps);
test2_array.push(sqlps1);
test2_array.push(sqlps2);

console.log(typeof test2_array)
console.log(sql.toLowerCase().indexOf('select'));

mariadb(`select * from test`, []);
mariadb(test_array, []);