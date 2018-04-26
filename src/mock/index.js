const Mock = require('mockjs');
var loginState="0";//登陆状态，0未登录，1管理员登陆，2商家登陆，3买家登陆
var accountInfo=[//账号列表
	[//管理员账号
  	{"name":"admin1","password":"123","mess":{}},
  	{"name":"admin2","password":"123","mess":{}},
  	{"name":"admin3","password":"123","mess":{}},
  ],
  [//商家账号
  	{"name":"shop1","password":"123","mess":{}},
  	{"name":"shop2","password":"123","mess":{}},
  	{"name":"shop3","password":"123","mess":{}},
  ],
  [//买家账号
  	{"name":"buyer1","password":"123","mess":{}},
  	{"name":"buyer2","password":"123","mess":{}},
  	{"name":"buyer3","password":"123","mess":{}},
  ],
];
var userMess={}//登陆者信息

//登陆前检测用户名和角色是否匹配
Mock.mock('http://www.Zhengy.com/api/judegAccount',function(options){
	var res = eval('('+options.body+')');
	var find = accountInfo[res.radio].findIndex((value,index,arr)=>{
		return value.name==res.name;
	})
	return find;
})
//登陆
Mock.mock('http://www.Zhengy.com/api/login',function(options){
	var res = eval('('+options.body+')');
	var index = accountInfo[res.radio].findIndex((value,index,arr)=>{
		return value.name==res.name;
	})
	var code=accountInfo[res.radio][index].password==res.password?200:201;
	return {"code":code};
})