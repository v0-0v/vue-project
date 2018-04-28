const Mock = require('mockjs');
var loginState="0";//登陆状态，0未登录，1管理员登陆，2商家登陆，3买家登陆
var accountInfo=[//账号列表
	[//管理员账号
  	{"name":"admin1","password":"123","mess":{"userName":"附近的拉布拉多","loginId":"admin1","password":"123"}},
  	{"name":"admin2","password":"123","mess":{"userName":"附近的哈士奇","loginId":"admin2","password":"123"}},
  	{"name":"admin3","password":"123","mess":{"userName":"附近的金毛","loginId":"admin3","password":"123"}},
  ],
  [//商家账号
  	{"name":"shop1","password":"123","mess":{"id":1,"userName":"张兴邦食品旗舰店","loginId":"shop1","password":"123","label":"食品"},
  	"goodList":[
  		{
  			"id":"1",
  			"coverImg":"../../../static/images/shop/coverImg1.jpg",//封面图片路径
  			"title":"零食大礼包",
  			"produce":"超多零食，送女友，超大一箱，多种类自选，小吃组合，散装混合批发，超级划算，性价比高，良心推荐，加量不加价",
  			"price":"￥23.5",
  			"exampleImg":"",//示例图片路径
  			"tags":[//个性化元素列表
  				{
  					"type":"",
  					"list":[""]
  				}
  			]
  		},
  	]
  },
  	{"name":"shop2","password":"123","mess":{"id":2,"userName":"自油自画旗舰店","loginId":"shop2","password":"123","label":"艺术"}},
  	{"name":"shop3","password":"123","mess":{"id":3,"userName":"帕霏原创女装","loginId":"shop3","password":"123","label":"服装"}},
  ],
  [//买家账号
  	{"name":"buyer1","password":"123","mess":{"id":1,"userName":"和牙刷私奔叻丶","loginId":"buyer1","password":"123","address":"黑龙江省大庆市"}},
  	{"name":"buyer2","password":"123","mess":{"id":2,"userName":"夜凋凝","loginId":"buyer2","password":"123","address":"黑龙江省鹤岗市"}},
  	{"name":"buyer3","password":"123","mess":{"id":3,"userName":"盛夏。","loginId":"buyer3","password":"123","address":"四川省南充市"}},
  ],
];
var shopTagList=[{id: 1, text: '食品', value: '食品' }, {id: 2, text: '艺术', value: '艺术' }, {id: 3, text: '服装', value: '服装' }]

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
	return res;
})
//管理员对账号增删改查
Mock.mock('http://www.Zhengy.com/api/adminHandle',function(options){
	var req = eval('('+options.body+')');
	var code = 201;
	var afterEdit = {};
	switch(req.handle){
		case "1"://添加账号
			if(req.type==1){//商家账号
				var shop={
					"name":req.mess.name,
					"password":req.mess.password,
					"mess":{
						"id":accountInfo[1][accountInfo[1].length-1].mess.id+1,
						"userName":req.mess.userName,
						"loginId":req.mess.name,
						"password":req.mess.password,
						"label":req.mess.label,
					}
				};
				accountInfo[1].push(shop);
				code=200;
			}else{//买家账号
				var buyer={
					"name":req.mess.name,
					"password":req.mess.password,
					"mess":{
						"id":accountInfo[2][accountInfo[2].length-1].mess.id+1,
						"userName":req.mess.userName,
						"loginId":req.mess.name,
						"password":req.mess.password,
						"address":req.mess.address,
					}
				}
				accountInfo[2].push(buyer);
				code=200;
			}
			break;
		case "2"://编辑账号
			var index=accountInfo[req.type].findIndex((value,index,arr)=>{
				return value.mess.id==req.mess.id;
			})
			if(req.mess.name!=""){
				accountInfo[req.type][index].name=req.mess.name;
				accountInfo[req.type][index].mess.loginId=req.mess.name;
			}
			if(req.mess.password!=""){
				accountInfo[req.type][index].password=req.mess.password;
				accountInfo[req.type][index].mess.password=req.mess.password;
			}
			if(req.mess.userName!=""){
				accountInfo[req.type][index].mess.userName=req.mess.userName;
			}
			if(req.type==1){//商家账号
				if(req.mess.label!=""){
					accountInfo[1][index].mess.label=req.mess.label;
				}
				code=200;
			}else{//买家账号
				if(req.mess.address!=""){
					accountInfo[2][index].mess.address=req.mess.address;
				}
				code=200;
			}
			afterEdit=accountInfo[req.type][index];
			break;
		default://删除账号
			var index=accountInfo[req.type].findIndex((value,index,arr)=>{
				return value.mess.id==req.mess.id;
			})
			accountInfo[req.type].splice(index,1);
			code=200;
	}
	return {"code":code,"afterEdit":afterEdit};
})

//商家页面
//商家获取已上架商品列表
Mock.mock('http://www.Zhengy.com/api/getGoodList',function(options){
	var req = eval('('+options.body+')');
	var index = accountInfo[1].findIndex((value,index,arr)=>{
		return value.mess.id==req.id;
	})
	var res = accountInfo[1][index].goodList;
	return res;
})
//商家获取某商品详细信息
Mock.mock('http://www.Zhengy.com/api/getGoodMess',function(options){
	var req = eval('('+options.body+')');
	var index1 = accountInfo[1].findIndex((value,index,arr)=>{
		return value.mess.id==req.shopId;
	})
	var index2 = accountInfo[1][index1].goodList.findIndex((value,index,arr)=>{
		return value.id==req.goodId;
	})
	var res = accountInfo[1][index1].goodList[index2];
	return res;
})