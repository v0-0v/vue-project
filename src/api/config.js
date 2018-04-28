var api='http://www.Zhengy.com/api';

export default{
	judegAccount:api+"/judegAccount",//登陆时检测用户名和角色是否匹配
	login:api+"/login",//登陆
	getTagtList:api+"/getTagtList",//获取商家标签列表
	getAccountList:api+"/getAccountList",//管理员获取账号列表
	adminHandle:api+"/adminHandle",//管理员的增删改查操作
	getGoodList:api+"/getGoodList",//商家获取店铺下商品列表
	getGoodMess:api+"/getGoodMess",//商家获取某商品详细信息
}