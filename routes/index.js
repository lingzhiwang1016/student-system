var express = require('express');
var router = express.Router();

//引入数据库
var db = require('../model/db');
var Student = db.Student; 

//主页路由
router.get('/home', function(req, res) {
  Student.find({}).then((data)=>{
		res.render('index',{data:data});
	}).catch((err)=>{
		console.log(err)
	})
});

//添加学生信息路由
//修改学生信息
router.get('/add:id?',(req,res)=>{
//		console.log(req.params.id)
		Student.findOne({id: req.params.id}).then((data)=>{
			if(data){
				res.render('add',{data:data})
			}else{
				var obj={}
				obj.isMale=true;
				obj.id=1;
				res.render('add',{data:obj});
			}
		}).catch((err)=>{
			console.log(err);
		})
});

//提交学生信息
router.post('/submit:id?',(req,res)=>{
	req.body.id=Date.now();
	if(req.params.id.length>1){
		Student.findOneAndUpdate({id:req.params.id},req.body,(err)=>{
			if(err){
				res.json({msg:"更新失败"})
			}else{
				res.json({msg:"更新数据成功",status:200})
			}
		})
	}else{
		Student.findOne({name:req.body.name}).then((data)=>{
			if(data){
				res.json({msg:"此用户已经存在"})
			}else{
				//新建一条数据
				Student.create(req.body).then((data)=>{
					res.json({msg:"添加成功",status:200})
				}).catch((err)=>{
					res.json({msg:"添加失败"})
				})
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
				
})

//删除数据
router.post('/delete/:id',(req,res)=>{
	console.log(req.params.id)
	Student.findOneAndRemove({id:req.params.id},(err)=>{
		if(err){
			console.log("删除失败")
		}else{
			console.log("删除成功")
			res.json({msg:"删除成功"})
		}
	})
})


module.exports = router;
