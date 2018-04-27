<template>
	<div class="adminIndex-wrap">
		<div class="mess-wrap">
			<h5>您好！{{$store.state.userMess.userName}}管理员</h5>
			<div>
				<img src="../../assets/images/admin/userImg.png" />
				<div class="mess-content">
					<p>账户昵称：{{$store.state.userMess.userName}}</p>
					<p>登陆账号：{{$store.state.userMess.loginId}}</p>
					<p>登陆密码：{{$store.state.userMess.password}}</p>
				</div>
			</div>
		</div>
		<div class="handle-wrap">
			<el-card class="box-card">
				<h6>商家账号人数</h6>
				<p>3</p>
				<button>添加商家</button>
			</el-card>
			<el-card class="box-card handle-content">
				<h6>买家账号人数</h6>
				<p>3</p>
				<button>添加买家</button>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default{

	}
</script>

<style scoped>
	.adminIndex-wrap{
		width: 100%;
		padding: 0 20px;
	}
	.adminIndex-wrap .mess-wrap{
		width: 100%;
		height: 150px;
		margin-top: 20px;
		background-color: #fff;
		border-left: 6px solid #3eb983;
	}
	.adminIndex-wrap h5{
		font-size: 18px;
		text-align: left;
		line-height: 35px;
		padding-left: 20px;
	}
	.adminIndex-wrap .mess-wrap img{
		width: 80px;
		height: 80px;
		display: block;
		float: left;
		margin: 15px 20px 15px;
	}
	.adminIndex-wrap .mess-content{
		width: calc(100% - 120px);
		height: 100%;
		float: left;
		margin-top: 5px;
	}
	.adminIndex-wrap .mess-content p{
		text-align: left;
		font-size: 16px;
		line-height: 35px;
	}
	.adminIndex-wrap .handle-wrap{
		width: 100%;
		height: 150px;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.adminIndex-wrap .box-card{
		width: 450px;
		height: 174px;
		background-color: #fff;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.3);
		border: 0;
		margin-top: 20px;
	}
	.adminIndex-wrap .box-card h6{
		font-size: 16px;
		line-height: 45px;
	}
	.adminIndex-wrap .box-card p{
		font-size: 34px;
		color: #008dc5;
		line-height: 60px;
	}
	.adminIndex-wrap .handle-content p{
		color: #54cdc8;
	}
	.adminIndex-wrap .box-card button{
		width: 100%;
		height: 50px;
		background-color: #008dc5;
		color: #fff;
		border: 0;
		font-size: 16px;
		margin-top: 20px;
		cursor: pointer;
	}
	.adminIndex-wrap .handle-content button{
		background-color: #54cdc8;
	}
</style>

<style>
	.adminIndex-wrap .el-card__body{
		padding: 0;
	}
</style>