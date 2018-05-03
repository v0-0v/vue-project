<template>
	<div class="shopIndex-wrap">
		<div class="mess-wrap">
			<div class="mess-title">
				<h5>您好！{{$store.state.userMess.userName}}用户</h5>
				<el-button @click="toShowEditShop">修改用户信息</el-button>
			</div>
			<div>
				<img src="../../assets/images/admin/userImg.png" />
				<div class="mess-content">
					<p>用户昵称：{{$store.state.userMess.userName}}</p>
					<p>登陆账号：{{$store.state.userMess.loginId}}</p>
					<p>登陆密码：{{$store.state.userMess.password}}</p>
					<p>邮寄地址：{{$store.state.userMess.address}}</p>
				</div>
			</div>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" :show-close="false">
      <div class="dialogheader">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="用户昵称">
            <el-input v-model="showItem.userName"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号">
            <el-input v-model="showItem.name"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码">
            <el-input v-model="showItem.password"></el-input>
          </el-form-item>
          <el-form-item label="邮寄地址">
            <el-input v-model="showItem.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toEditShop">确认修改</el-button>
            <el-button @click="toCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dialogTableVisible:false,
				dialogTitle:"",
				showItem:{
					id:"",
					userName:"",
					name:"",
					password:"",
					label:"",
					address:"",
				}
			}
		},
		mounted(){
		},
		methods:{
			toCancel(){
      	this.dialogTableVisible=false;
      	this.dialogTitle="";
      	this.showItem={
					id:"",
					userName:"",
					name:"",
					password:"",
					label:""
				}
      },
      toShowEditShop(){
      	this.dialogTableVisible=true;
      	this.dialogTitle="修改信息";
      	this.showItem.id=this.$store.state.userMess.id;
      	this.showItem.userName=this.$store.state.userMess.userName;
      	this.showItem.name=this.$store.state.userMess.loginId;
      	this.showItem.password=this.$store.state.userMess.password;
      	this.showItem.address=this.$store.state.userMess.address;
      },
      toEditShop(){
      	if(this.showItem.name==""||this.showItem.password==""||this.showItem.userName==""||this.showItem.address==""){
      		this.$message.error('请填写完整信息');
      		console.log(this.showItem)
        	return;
      	}
      	let param={
      		type:2,
      		handle:"2",
      		mess:this.showItem
      	}
      	this.axios.post(this.Api.adminHandle,param).then((res)=>{
      		console.log(res);
      		if(res.data.code==200){
      			this.$message({
	            message: '编辑成功',
	            type: 'success'
	          });
	          this.toCancel();
	          this.$store.commit('login',{userMess:res.data.afterEdit.mess});
      		}
	      }).catch((err)=>{
	        console.log("toEditShop:"+err);
	      });
      }
		}
	}
</script>

<style scoped>
	.shopIndex-wrap{
		width: 100%;
		padding: 0 20px;
	}
	.mess-title{
		width: 100%;
		padding: 0 20px;
		text-align: left;
	}
	.mess-title h5{
		font-size: 18px;
		line-height: 35px;
		display: inline-block;
	}
	.mess-title button{
		float: right;
	}
	.mess-title .el-button{
		padding: 8px 16px;
		margin-top: 5px;
	}
	.shopIndex-wrap .mess-wrap{
		width: 100%;
		height: 185px;
		margin-top: 20px;
		background-color: #fff;
		border-left: 6px solid #3eb983;
	}
	.shopIndex-wrap .mess-wrap img{
		width: 110px;
		height: 110px;
		display: block;
		float: left;
		margin: 15px 20px 15px;
	}
	.shopIndex-wrap .mess-content{
		width: calc(100% - 150px);
		height: 100%;
		float: left;
		margin-top: 5px;
	}
	.shopIndex-wrap .mess-content p{
		text-align: left;
		font-size: 16px;
		line-height: 35px;
	}
</style>

<style>
	.el-dialog{
    width: 500px;
    /*height: 280px;*/
    border-radius: 6px;
    text-align: left;
  }
  .el-dialog__header{
    padding: 20px 30px 0 40px;
  }
  .el-dialog__body{
    padding: 20px 30px;
  }
  .dialogheader{
    width: 100%;
      /*height: 60px;*/
      
  }
  .dialogheader p{
    width: 360px;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    border:1px solid #3eb983;
    border-radius: 6px;
    text-align: left;
    padding-left: 10px;
    margin-left: 60px; 
  }
  .dialogheader p input{
  	height: 24px;
    line-height: 24px;
    border:0;
    margin-left: 20px;
  }
  .dialogheader .button{
    background: #3eb983;
    color: #fff;
    text-align: center;
    margin-top: 40px;
    cursor: pointer;
  }
  .dialogheader .el-button{
    width: 173px;
    padding: 10px 0;
  }
  .dialogheader .el-form-item{
    margin-bottom: 15px;
  }
  .dialogheader .el-button+.el-button{
    margin-left: 0;
  }
  .dialogheader .el-button--primary{
    background-color: #3eb983;
    border-color: #3eb983;
  }
  .dialogheader .el-button--primary:hover{
    background-color: #3eb983;
    border-color: #3eb983;
  }
  .dialogheader .el-button--default{
    background-color: #bfcbd9;
    color: #fff;
  }
  .dialogheader .el-button--default:hover{
    background-color: #bfcbd9;
    border-color: #bfcbd9;
    color: #fff;
  }
</style>