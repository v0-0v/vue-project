const Mock = require('mockjs');
var loginState="0";//登陆状态，0未登录，1管理员登陆，2商家登陆，3买家登陆
var accountInfo=[//账号列表
	[//管理员账号
  	{"name":"admin1","password":"123","mess":{"userName":"附近的拉布拉多","loginId":"admin1","password":"123"}},
  	{"name":"admin2","password":"123","mess":{"userName":"附近的哈士奇","loginId":"admin2","password":"123"}},
  	{"name":"admin3","password":"123","mess":{"userName":"附近的金毛","loginId":"admin3","password":"123"}},
  ],
  [//商家账号
  	{"name":"shop1","password":"123","mess":{"id":"1","userName":"张兴邦食品旗舰店","loginId":"shop1","password":"123","label":"食品"}},
  	{"name":"shop2","password":"123","mess":{"id":"2","userName":"自油自画旗舰店","loginId":"shop2","password":"123","label":"艺术"}},
  	{"name":"shop3","password":"123","mess":{"id":"3","userName":"帕霏原创女装","loginId":"shop3","password":"123","label":"服装"}},
  ],
  [//买家账号
  	{"name":"buyer1","password":"123","mess":{}},
  	{"name":"buyer2","password":"123","mess":{}},
  	{"name":"buyer3","password":"123","mess":{}},
  ],
];
var shopTagList=[{ text: '食品', value: '食品' }, { text: '艺术', value: '艺术' }, { text: '服装', value: '服装' }]

//登陆前检测用户名和角色是否匹配
Mock.mock('http://www.Zhengy.com/api/judegAccount',function(options){
	var req = eval('('+options.body+')');
	var find = accountInfo[req.radio].findIndex((value,index,arr)=>{
		return value.name==req.name;
	})
	return find;
})
//登陆
Mock.mock('http://www.Zhengy.com/api/login',function(options){
	var req = eval('('+options.body+')');
	var index = accountInfo[req.radio].findIndex((value,index,arr)=>{
		return value.name==req.name;
	})
	var code=accountInfo[req.radio][index].password==req.password?200:201;
	var mess=accountInfo[req.radio][index].mess;
	return {"code":code,"mess":mess};
})
//管理员页面
//获取商家标签列表
Mock.mock('http://www.Zhengy.com/api/getTagtList',function(options){
	var res = shopTagList;
	return res;
})
//获取账号列表
Mock.mock('http://www.Zhengy.com/api/getAccountList',function(options){
	var req = eval('('+options.body+')');
	var res = [];
	for(var i=0,length=accountInfo[req.type].length;i<length;i++){
		res.push(accountInfo[req.type][i].mess);
	}
	//var res = accountInfo[req.type]
	return res;
})
//管理员对账号增删改查

