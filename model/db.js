var db = require('mongoose');
//连接数据库
db.connect('mongodb://localhost/test');

//改用自己的promise
db.Promise = global.Promise;

//创建数据集合
var studentSchema=db.Schema({
	id: String,
	name: String,
	isMale: Boolean,
	age: Number,
	phone: Number,
	email: String,
	description: String
});

//模型映射
var Student = db.model('Student',studentSchema);

//模块导出
module.exports = {
	Student
}
