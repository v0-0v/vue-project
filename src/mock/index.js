const Mock = require('mockjs');
var loginState="0";//登陆状态，0未登录，1管理员登陆，2商家登陆，3买家登陆
var accountInfo=[//账号列表
	[//管理员账号
  	{"name":"admin1","password":"123","mess":{"userName":"附近的拉布拉多","loginId":"admin1","password":"123"}},
  	{"name":"admin2","password":"123","mess":{"userName":"附近的哈士奇","loginId":"admin2","password":"123"}},
  	{"name":"admin3","password":"123","mess":{"userName":"附近的金毛","loginId":"admin3","password":"123"}},
  ],
  [//商家账号
  	{"name":"shop1","password":"123","mess":{"id":1,"userName":"楚楚饰品店","loginId":"shop1","password":"123","label":"饰品"},
  	"goodList":[
  		{
  			"id":"1",
  			"coverImg":"../../../static/images/shop/coverImg2.jpg",
  			"title":"精美项链定制",
  			"produce":"文艺简约，气质，森系，黄金，纯银，彩金，玫瑰金，吊坠，韩版，首饰礼物，锁骨链，学生，潮流白搭",
  			"price":"￥119",
  			"exampleImg":[
  				{name:'exampleImg21.jpg',url:'../../../static/images/shop/exampleImg21.jpg'},
  				{name:'exampleImg22.jpg',url:'../../../static/images/shop/exampleImg22.jpg'},
  				{name:'exampleImg23.jpg',url:'../../../static/images/shop/exampleImg23.jpg'},
  				{name:'exampleImg24.jpg',url:'../../../static/images/shop/exampleImg24.jpg'},
  			],
  			"tags":[//个性化元素列表
  				{
  					"id":0,
  					"inputVisible":false,
  					"type":"材质",
  					"list":[{"name":"黄金","price":688},{"name":"白银","price":499},{"name":"彩金","price":378},{"name":"水晶","price":256},{"name":"珍珠","price":196}]
  				},
  				{
  					"id":1,
  					"inputVisible":false,
  					"type":"图形",
  					"list":[{"name":"比翼双飞","price":100},{"name":"心心相印","price":100},{"name":"长命百岁","price":100},{"name":"合家欢乐","price":100},{"name":"福运到","price":100},{"name":"守护天使","price":100}]
  				},
  				{
  					"id":2,
  					"inputVisible":false,
  					"type":"刻字",
  					"list":[{"name":"嘿，是我","price":100},{"name":"小幸运","price":100},{"name":"我是你爸爸","price":100},{"name":"女神","price":100}]
  				},
  			],
  			"commentsList":[
  				{
  					"text":"特别美妹妹很喜欢",
  					"author":"和牙刷私奔叻丶"
  				},
  				{
  					"text":"不咋地啊",
  					"author":"夜凋凝"
  				},
  				{
  					"text":"材质是真的",
  					"author":"盛夏。"
  				},
  			]
  		},
  		{
  			"id":"2",
  			"coverImg":"../../../static/images/shop/coverImg3.jpg",
  			"title":"戒指定制",
  			"produce":"北极光系列，裸钻定制，钻石，纯银，个性，学生，生日礼物，求婚，订婚，创意，网红定制刻字，日韩潮流",
  			"price":"￥749",
  			"exampleImg":[
  				{name:'exampleImg31.jpg',url:'../../../static/images/shop/exampleImg31.jpg'},
  				{name:'exampleImg32.jpg',url:'../../../static/images/shop/exampleImg32.jpg'},
  				{name:'exampleImg33.jpg',url:'../../../static/images/shop/exampleImg33.jpg'},
  				{name:'exampleImg34.jpg',url:'../../../static/images/shop/exampleImg34.jpg'},
  				{name:'exampleImg35.jpg',url:'../../../static/images/shop/exampleImg35.jpg'},
  			],
  			"tags":[//个性化元素列表
  				{
  					"id":0,
  					"inputVisible":false,
  					"type":"材质",
  					"list":[{"name":"黄金","price":688},{"name":"白银","price":499},{"name":"彩金","price":378},{"name":"水晶","price":256},{"name":"珍珠","price":196}]
  				},
  				{
  					"id":1,
  					"inputVisible":false,
  					"type":"图形",
  					"list":[{"name":"比翼双飞","price":100},{"name":"心心相印","price":100},{"name":"长命百岁","price":100},{"name":"合家欢乐","price":100},{"name":"福运到","price":100},{"name":"守护天使","price":100}]
  				},
  				{
  					"id":2,
  					"inputVisible":false,
  					"type":"刻字",
  					"list":[{"name":"嘿，是我","price":100},{"name":"小幸运","price":100},{"name":"我是你爸爸","price":100},{"name":"女神","price":100}]
  				},
  			],
  			"commentsList":[
  				{
  					"text":"特别美妹妹很喜欢",
  					"author":"和牙刷私奔叻丶"
  				},
  				{
  					"text":"不咋地啊",
  					"author":"夜凋凝"
  				},
  				{
  					"text":"材质是真的",
  					"author":"盛夏。"
  				},
  			]
  		},
  		{
  			"id":"3",
  			"coverImg":"../../../static/images/shop/coverImg4.jpg",
  			"title":"手链定制",
  			"produce":"手工定制，字母，激光，名字，纯手工饰品，时尚，韩版，个性，收藏，包邮",
  			"price":"￥158",
  			"exampleImg":[
  				{name:'exampleImg41.jpg',url:'../../../static/images/shop/exampleImg41.jpg'},
  				{name:'exampleImg42.jpg',url:'../../../static/images/shop/exampleImg42.jpg'},
  				{name:'exampleImg43.jpg',url:'../../../static/images/shop/exampleImg43.jpg'},
  				{name:'exampleImg44.jpg',url:'../../../static/images/shop/exampleImg44.jpg'},
  			],
  			"tags":[//个性化元素列表
  				{
  					"id":0,
  					"inputVisible":false,
  					"type":"材质",
  					"list":[{"name":"黄金","price":688},{"name":"白银","price":499},{"name":"彩金","price":378},{"name":"水晶","price":256},{"name":"珍珠","price":196}]
  				},
  				{
  					"id":1,
  					"inputVisible":false,
  					"type":"图形",
  					"list":[{"name":"比翼双飞","price":100},{"name":"心心相印","price":100},{"name":"长命百岁","price":100},{"name":"合家欢乐","price":100},{"name":"福运到","price":100},{"name":"守护天使","price":100}]
  				},
  				{
  					"id":2,
  					"inputVisible":false,
  					"type":"刻字",
  					"list":[{"name":"嘿，是我","price":100},{"name":"小幸运","price":100},{"name":"我是你爸爸","price":100},{"name":"女神","price":100}]
  				},
  			],
  			"commentsList":[
  				{
  					"text":"不咋地啊",
  					"author":"夜凋凝"
  				},
  				{
  					"text":"材质是真的",
  					"author":"盛夏。"
  				},
  			]
  		},
  		{
  			"id":"4",
  			"coverImg":"../../../static/images/shop/coverImg5.jpg",
  			"title":"耳坠定制",
  			"produce":"手工定制，字母，激光，名字，纯手工饰品，时尚，韩版，个性，收藏，包邮",
  			"price":"￥138",
  			"exampleImg":[
  				{name:'exampleImg51.jpg',url:'../../../static/images/shop/exampleImg51.jpg'},
  				{name:'exampleImg52.jpg',url:'../../../static/images/shop/exampleImg52.jpg'},
  				{name:'exampleImg53.jpg',url:'../../../static/images/shop/exampleImg53.jpg'},
  				{name:'exampleImg54.jpg',url:'../../../static/images/shop/exampleImg54.jpg'},
  			],
  			"tags":[//个性化元素列表
  				{
  					"id":0,
  					"inputVisible":false,
  					"type":"材质",
  					"list":[{"name":"黄金","price":688},{"name":"白银","price":499},{"name":"彩金","price":378},{"name":"水晶","price":256},{"name":"珍珠","price":196}]
  				},
  				{
  					"id":1,
  					"inputVisible":false,
  					"type":"图形",
  					"list":[{"name":"比翼双飞","price":100},{"name":"心心相印","price":100},{"name":"长命百岁","price":100},{"name":"合家欢乐","price":100},{"name":"福运到","price":100},{"name":"守护天使","price":100}]
  				},
  				{
  					"id":2,
  					"inputVisible":false,
  					"type":"刻字",
  					"list":[{"name":"嘿，是我","price":100},{"name":"小幸运","price":100},{"name":"我是你爸爸","price":100},{"name":"女神","price":100}]
  				},
  			],
  			"commentsList":[
  				{
  					"text":"不咋地啊",
  					"author":"夜凋凝"
  				},
  				{
  					"text":"材质是真的",
  					"author":"盛夏。"
  				},
  			]
  		},
  	]
  },
  	{"name":"shop2","password":"123","mess":{"id":2,"userName":"张兴邦食品旗舰店","loginId":"shop2","password":"123","label":"食品"},
  	"goodList":[
  		{
  			"id":"1",
  			"coverImg":"../../../static/images/shop/coverImg1.jpg",//封面图片路径
  			"title":"零食大礼包",
  			"produce":"超多零食，送女友，超大一箱，多种类自选，小吃组合，散装混合批发，超级划算，性价比高，良心推荐，加量不加价",
  			"price":"￥23.5",
  			"exampleImg":[
  				{name:'exampleImg11.jpg',url:'../../../static/images/shop/exampleImg11.jpg'},
  				{name:'exampleImg12.jpg',url:'../../../static/images/shop/exampleImg12.jpg'},
  				{name:'exampleImg13.jpg',url:'../../../static/images/shop/exampleImg13.jpg'},
  				{name:'exampleImg14.jpg',url:'../../../static/images/shop/exampleImg14.jpg'},
  			],//示例图片路径
  			"tags":[//个性化元素列表
  				{
  					"id":0,
  					"inputVisible":false,
  					"type":"膨化食品类",
  					"list":[{"name":"虾条","price":8},{"name":"薯片","price":8},{"name":"鱿鱼酥","price":12},{"name":"蔬菜圈","price":6},{"name":"爆米花","price":9}]
  				},
  				{
  					"id":1,
  					"inputVisible":false,
  					"type":"凉果蜜饯类",
  					"list":[{"name":"话梅","price":11},{"name":"凉果","price":8},{"name":"蜜饯","price":8},{"name":"果脯","price":10},{"name":"瓜果干","price":9},{"name":"酸角糕","price":8}]
  				},
  				{
  					"id":2,
  					"inputVisible":false,
  					"type":"肉干鱼干类",
  					"list":[{"name":"牛肉干","price":19.9},{"name":"牛肉脯","price":18.5},{"name":"猪肉粒","price":16.2},{"name":"鱼片","price":12}]
  				},
  				{
  					"id":3,
  					"inputVisible":false,
  					"type":"干果类",
  					"list":[{"name":"花生","price":8.8},{"name":"瓜子","price":8.8},{"name":"开心果","price":12},{"name":"核桃仁","price":18},{"name":"杏仁","price":11},{"name":"榛子","price":12}]
  				},
  			],
  			"commentsList":[
  				{
  					"text":"太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦",
  					"author":"和牙刷私奔叻丶"
  				},
  				{
  					"text":"不咋地",
  					"author":"夜凋凝"
  				}
  			]
  		},
  	]
  },
  	{"name":"shop3","password":"123","mess":{"id":3,"userName":"帕霏原创女装","loginId":"shop3","password":"123","label":"服装"},
  	"goodList":[
  		{
  			"id":"1",
  			"coverImg":"../../../static/images/shop/coverImg6.jpg",//封面图片路径
  			"title":"礼服定制",
  			"produce":"定制，华丽，礼服，裙，个性，蓬蓬裙，性感",
  			"price":"￥923.5",
  			"exampleImg":[
  				{name:'exampleImg61.jpg',url:'../../../static/images/shop/exampleImg61.jpg'},
  				{name:'exampleImg62.jpg',url:'../../../static/images/shop/exampleImg62.jpg'},
  				{name:'exampleImg63.jpg',url:'../../../static/images/shop/exampleImg63.jpg'},
  				{name:'exampleImg64.jpg',url:'../../../static/images/shop/exampleImg64.jpg'},
  				{name:'exampleImg65.jpg',url:'../../../static/images/shop/exampleImg65.jpg'},
  			],//示例图片路径
  			"tags":[//个性化元素列表
  				{
  					"id":0,
  					"inputVisible":false,
  					"type":"材质",
  					"list":[{"name":"羊毛","price":300},{"name":"石棉","price":280},{"name":"锦纶","price":190},{"name":"涤纶","price":130},{"name":"晴纶","price":120}]
  				},
  				{
  					"id":1,
  					"inputVisible":false,
  					"type":"颜色",
  					"list":[{"name":"红色","price":100},{"name":"黑色","price":100},{"name":"白色","price":100},{"name":"紫色","price":100},{"name":"粉色","price":100},{"name":"绿色","price":100}]
  				},
  				{
  					"id":2,
  					"inputVisible":false,
  					"type":"风格",
  					"list":[{"name":"少女","price":300},{"name":"尊贵","price":3500},{"name":"气质","price":280},{"name":"时尚","price":400}]
  				},
  			],
  			"commentsList":[
  				{
  					"text":"质量不错",
  					"author":"和牙刷私奔叻丶"
  				},
  				{
  					"text":"不咋地",
  					"author":"夜凋凝"
  				}
  			]
  		},
  		{
  			"id":"2",
  			"coverImg":"../../../static/images/shop/coverImg7.jpg",//封面图片路径
  			"title":"夏装个性定制",
  			"produce":"定制，华丽，礼服，裙，个性，蓬蓬裙，性感",
  			"price":"￥923.5",
  			"exampleImg":[
  				{name:'exampleImg71.jpg',url:'../../../static/images/shop/exampleImg71.jpg'},
  				{name:'exampleImg72.jpg',url:'../../../static/images/shop/exampleImg72.jpg'},
  				{name:'exampleImg73.jpg',url:'../../../static/images/shop/exampleImg73.jpg'},
  				{name:'exampleImg74.jpg',url:'../../../static/images/shop/exampleImg74.jpg'},
  			],//示例图片路径
  			"tags":[//个性化元素列表
  				{
  					"id":0,
  					"inputVisible":false,
  					"type":"材质",
  					"list":[{"name":"羊毛","price":300},{"name":"石棉","price":280},{"name":"锦纶","price":190},{"name":"涤纶","price":130},{"name":"晴纶","price":120}]
  				},
  				{
  					"id":1,
  					"inputVisible":false,
  					"type":"颜色",
  					"list":[{"name":"红色","price":100},{"name":"黑色","price":100},{"name":"白色","price":100},{"name":"紫色","price":100},{"name":"粉色","price":100},{"name":"绿色","price":100}]
  				},
  				{
  					"id":2,
  					"inputVisible":false,
  					"type":"风格",
  					"list":[{"name":"少女","price":300},{"name":"尊贵","price":3500},{"name":"气质","price":280},{"name":"时尚","price":400}]
  				},
  			],
  			"commentsList":[
  				{
  					"text":"不咋地",
  					"author":"夜凋凝"
  				}
  			]
  		},
  	]
  },
  ],
  [//买家账号
  	{"name":"buyer1","password":"123","mess":{"id":1,"userName":"和牙刷私奔叻丶","loginId":"buyer1","password":"123","address":"黑龙江省大庆市"},
  	"boughtList":[
  		{
  			"id":1,
  			"shopId":1,
  			"goodId":"1",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"白银",
  						"price":499
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"合家欢乐",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"嘿，是我",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"特别美妹妹很喜欢"
  		},
  		{
  			"id":2,
  			"shopId":1,
  			"goodId":"2",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"水晶",
  						"price":256
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"福运到",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"小幸运",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"特别美妹妹很喜欢"
  		},
  		{
  			"id":3,
  			"shopId":2,
  			"goodId":"1",
  			"madeTags":[
  				{
  					"type":"膨化食品类",
  					"item":{
  						"name":"虾条",
  						"price":8
  					}
  				},
  				{
  					"type":"凉果蜜饯类",
  					"item":{
  						"name":"凉果",
  						"price":8
  					}
  				},
  				{
  					"type":"肉干鱼干类",
  					"item":{
  						"name":"牛肉脯",
  						"price":18.5
  					}
  				},
  				{
  					"type":"干果类",
  					"item":{
  						"name":"杏仁",
  						"price":11
  					}
  				},
  			],
  			"evaluate":"太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦太好吃啦"
  		},
  		{
  			"id":4,
  			"shopId":3,
  			"goodId":"1",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"棉纶",
  						"price":190
  					}
  				},
  				{
  					"type":"颜色",
  					"item":{
  						"name":"黑色",
  						"price":100
  					}
  				},
  				{
  					"type":"风格",
  					"item":{
  						"name":"气质",
  						"price":280
  					}
  				},
  			],
  			"evaluate":"质量不错"
  		},
  	]
  },
  	{"name":"buyer2","password":"123","mess":{"id":2,"userName":"夜凋凝","loginId":"buyer2","password":"123","address":"黑龙江省鹤岗市"},
  	"boughtList":[
  		{
  			"id":1,
  			"shopId":1,
  			"goodId":"1",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"白银",
  						"price":499
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"合家欢乐",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"嘿，是我",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"不咋地啊"
  		},
  		{
  			"id":2,
  			"shopId":1,
  			"goodId":"2",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"水晶",
  						"price":256
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"福运到",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"小幸运",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"不咋地啊"
  		},
  		{
  			"id":3,
  			"shopId":1,
  			"goodId":"3",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"水晶",
  						"price":256
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"福运到",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"小幸运",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"不咋地啊"
  		},
  		{
  			"id":4,
  			"shopId":1,
  			"goodId":"4",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"水晶",
  						"price":256
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"福运到",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"小幸运",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"不咋地啊"
  		},
  		{
  			"id":5,
  			"shopId":2,
  			"goodId":"1",
  			"madeTags":[
  				{
  					"type":"膨化食品类",
  					"item":{
  						"name":"虾条",
  						"price":8
  					}
  				},
  				{
  					"type":"凉果蜜饯类",
  					"item":{
  						"name":"凉果",
  						"price":8
  					}
  				},
  				{
  					"type":"肉干鱼干类",
  					"item":{
  						"name":"牛肉脯",
  						"price":18.5
  					}
  				},
  				{
  					"type":"干果类",
  					"item":{
  						"name":"杏仁",
  						"price":11
  					}
  				},
  			],
  			"evaluate":"不咋地"
  		},
  		{
  			"id":6,
  			"shopId":3,
  			"goodId":"1",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"棉纶",
  						"price":190
  					}
  				},
  				{
  					"type":"颜色",
  					"item":{
  						"name":"黑色",
  						"price":100
  					}
  				},
  				{
  					"type":"风格",
  					"item":{
  						"name":"气质",
  						"price":280
  					}
  				},
  			],
  			"evaluate":"不咋地"
  		},
  		{
  			"id":7,
  			"shopId":3,
  			"goodId":"2",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"棉纶",
  						"price":190
  					}
  				},
  				{
  					"type":"颜色",
  					"item":{
  						"name":"黑色",
  						"price":100
  					}
  				},
  				{
  					"type":"风格",
  					"item":{
  						"name":"气质",
  						"price":280
  					}
  				},
  			],
  			"evaluate":"不咋地"
  		},
  	]
  },
  	{"name":"buyer3","password":"123","mess":{"id":3,"userName":"盛夏。","loginId":"buyer3","password":"123","address":"四川省南充市"},
  	"boughtList":[
  		{
  			"id":1,
  			"shopId":1,
  			"goodId":"1",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"白银",
  						"price":499
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"合家欢乐",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"嘿，是我",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"材质是真的"
  		},
  		{
  			"id":2,
  			"shopId":1,
  			"goodId":"2",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"水晶",
  						"price":256
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"福运到",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"小幸运",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"材质是真的"
  		},
  		{
  			"id":3,
  			"shopId":1,
  			"goodId":"3",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"水晶",
  						"price":256
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"福运到",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"小幸运",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"材质是真的"
  		},{
  			"id":4,
  			"shopId":1,
  			"goodId":"4",
  			"madeTags":[
  				{
  					"type":"材质",
  					"item":{
  						"name":"水晶",
  						"price":256
  					}
  				},
  				{
  					"type":"图形",
  					"item":{
  						"name":"福运到",
  						"price":100
  					}
  				},
  				{
  					"type":"刻字",
  					"item":{
  						"name":"小幸运",
  						"price":100
  					}
  				},
  			],
  			"evaluate":"材质是真的"
  		},
  	]
  },
  ],
];
var shopTagList=[{id: 1, text: '饰品', value: '饰品' }, {id: 2, text: '食品', value: '食品' }, {id: 3, text: '服装', value: '服装' }]

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
					},
					"goodList":[]
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
					},
					"boughtList":[]
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
	if(req.type=='1'){
		var res=[];
		for(var i=0,length1=accountInfo[1].length;i<length1;i++){
			for(var j=0,length2=accountInfo[1][i].goodList.length;j<length2;j++){
				accountInfo[1][i].goodList[j].shopId=accountInfo[1][i].mess.id;
				res.push(accountInfo[1][i].goodList[j]);
			}
		}
	}else{
		var index = accountInfo[1].findIndex((value,index,arr)=>{
			return value.mess.id==req.id;
		})
		var res = accountInfo[1][index].goodList;
	}
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
//商家修改商品基本信息
Mock.mock('http://www.Zhengy.com/api/changeGoodBasicMess',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index1 = accountInfo[1].findIndex((value,index,arr)=>{
		return value.mess.id==req.shopId;
	})
	var index2 = accountInfo[1][index1].goodList.findIndex((value,index,arr)=>{
		return value.id==req.goodId;
	})
	accountInfo[1][index1].goodList[index2].title=req.title;
	accountInfo[1][index1].goodList[index2].produce=req.produce;
	accountInfo[1][index1].goodList[index2].price=req.price;
	code=200;
	return {code:code};
})
//商家修改个性化案例展示图片
Mock.mock('http://www.Zhengy.com/api/changeExampleImg',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index1 = accountInfo[1].findIndex((value,index,arr)=>{
		return value.mess.id==req.shopId;
	})
	var index2 = accountInfo[1][index1].goodList.findIndex((value,index,arr)=>{
		return value.id==req.goodId;
	})
	if(req.type==1){//增加
		accountInfo[1][index1].goodList[index2].exampleImg.push(req.file);
		code=200;
	}else{//删除
		var index3 = accountInfo[1][index1].goodList[index2].exampleImg.findIndex((value,index,arr)=>{
			return value.name==req.name;
		})
		accountInfo[1][index1].goodList[index2].exampleImg.splice(index3,1);
		code=200;
	}
	return {code:code,exampleImg:accountInfo[1][index1].goodList[index2].exampleImg};
})
//商家个性化元素管理
Mock.mock('http://www.Zhengy.com/api/changeTags',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index1 = accountInfo[1].findIndex((value,index,arr)=>{
		return value.mess.id==req.shopId;
	})
	var index2 = accountInfo[1][index1].goodList.findIndex((value,index,arr)=>{
		return value.id==req.goodId;
	})
	accountInfo[1][index1].goodList[index2].tags[req.id].list=req.list;
	code=200;
	return {code:code};
})
//商家添加个性化元素分类
Mock.mock('http://www.Zhengy.com/api/addGoodTags',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index1 = accountInfo[1].findIndex((value,index,arr)=>{
		return value.mess.id==req.shopId;
	})
	var index2 = accountInfo[1][index1].goodList.findIndex((value,index,arr)=>{
		return value.id==req.goodId;
	})
	var tag = {
		"id":accountInfo[1][index1].goodList[index2].tags[accountInfo[1][index1].goodList[index2].tags.length-1].id+1,
		"inputVisible":false,
  	"type":req.type,
  	"list":req.list
	}
	accountInfo[1][index1].goodList[index2].tags.push(tag);
	code=200;
	return {code:code,tag:tag}
})
//商家上架商品
Mock.mock('http://www.Zhengy.com/api/addGood',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index = accountInfo[1].findIndex((value,index,arr)=>{
		return value.mess.id==req.shopId;
	})
	var good = req.good;
	if(accountInfo[1][index].goodList.length==0){
		good.id="1";
	}else{
		good.id=accountInfo[1][index].goodList[accountInfo[1][index].goodList.length-1].id+1;
	}
	accountInfo[1][index].goodList.push(good);
	code=200;
	return {code:code,goodlist:accountInfo[1][index].goodList}
})

//买家页面
//买家支付成功
Mock.mock('http://www.Zhengy.com/api/paySuccess',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index1 = accountInfo[2].findIndex((value,index,arr)=>{
		return value.mess.id==req.buyerId;
	})
	if(accountInfo[2][index1].boughtList.length==0){
		var id=1;
	}else{
		id=accountInfo[2][index1].boughtList[accountInfo[2][index1].boughtList.length-1].id+1;
	}
	let bought={
		"id":id,
		"shopId":req.shopId,
		"goodId":req.goodId,
		"madeTags":req.madeTags
	}
	accountInfo[2][index1].boughtList.push(bought);
	code=200;
	return {code:code,id:id}
})
//买家提交评价
Mock.mock('http://www.Zhengy.com/api/submitEvaluation',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index1 = accountInfo[2].findIndex((value,index,arr)=>{
		return value.mess.id==req.buyerId;
	})
	let comment={
		"text":req.comment,
		"author":accountInfo[2][index1].mess.userName,
	}
	var index2 = accountInfo[1].findIndex((value,index,arr)=>{
		return value.mess.id==req.shopId;
	})
	var index3 = accountInfo[1][index2].goodList.findIndex((value,index,arr)=>{
		return value.id==req.goodId;
	})
	accountInfo[1][index2].goodList[index3].commentsList.push(comment);
	var index4 = accountInfo[2][index1].boughtList.findIndex((value,index,arr)=>{
		return value.id==req.id;
	})
	accountInfo[2][index1].boughtList[index4].evaluate=req.comment;
	code=200;
	return {code:code,buyer:accountInfo[2][index1].boughtList[index4],shop:accountInfo[1][index2].goodList[index3]}
})
//买家获取订单列表
Mock.mock('http://www.Zhengy.com/api/getOrderList',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index = accountInfo[2].findIndex((value,index,arr)=>{
		return value.mess.id==req.buyerId;
	})
	var res=[];
	for(var i=0,length=accountInfo[2][index].boughtList.length;i<length;i++){
		var list = accountInfo[2][index].boughtList[i];
		var index2 = accountInfo[1].findIndex((value,index,arr)=>{
			return value.mess.id==list.shopId;
		})
		if(index2!=-1){
			var index3 = accountInfo[1][index2].goodList.findIndex((value,index,arr)=>{
				return value.id==list.goodId;
			})
			var item={
				id:accountInfo[2][index].boughtList[i].id,
				evaluate:accountInfo[2][index].boughtList[i].evaluate,
				shopId:accountInfo[2][index].boughtList[i].shopId,
				goodId:accountInfo[2][index].boughtList[i].goodId,
				coverImg:accountInfo[1][index2].goodList[index3].coverImg,
				title:accountInfo[1][index2].goodList[index3].title,
				produce:accountInfo[1][index2].goodList[index3].produce,
				price:accountInfo[1][index2].goodList[index3].price,
			}
			res.push(item);
		}
	}
	code=200;
	return {code:code,list:res}
})

//买家获取订单详情
Mock.mock('http://www.Zhengy.com/api/getOrderMess',function(options){
	var req = eval('('+options.body+')');
	var code=201;
	var index = accountInfo[2].findIndex((value,index,arr)=>{
		return value.mess.id==req.buyerId;
	})
	var index4 = accountInfo[2][index].boughtList.findIndex((value,index,arr)=>{
		return value.id==req.id;
	})
	var list = accountInfo[2][index].boughtList[index4];
	var index2 = accountInfo[2].findIndex((value,index,arr)=>{
		return value.mess.id==list.shopId;
	})
	var index3 = accountInfo[1][index2].goodList.findIndex((value,index,arr)=>{
		return value.id==list.goodId;
	})
	var res={
		coverImg:accountInfo[1][index2].goodList[index3].coverImg,
		title:accountInfo[1][index2].goodList[index3].title,
		produce:accountInfo[1][index2].goodList[index3].produce,
		price:accountInfo[1][index2].goodList[index3].price,
		evaluate:accountInfo[2][index].boughtList[index4].evaluate,
		madeTags:accountInfo[2][index].boughtList[index4].madeTags,
	}
	code=200;
	return {code:code,res:res}
})