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
				<p>{{shopLength}}</p>
				<button @click="toShowAddShop">添加商家</button>
			</el-card>
			<el-card class="box-card handle-content">
				<h6>买家账号人数</h6>
				<p>{{buyerLength}}</p>
				<button @click="toShowAddBuyer">添加买家</button>
			</el-card>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" :show-close="false">
      <div class="dialogheader">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="店铺名称" v-show="dialogTitle=='添加商家'">
            <el-input v-model="showItem.userName"></el-input>
          </el-form-item>
          <el-form-item label="买家昵称" v-show="dialogTitle=='添加买家'">
            <el-input v-model="showItem.userName"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号">
            <el-input v-model="showItem.name"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码">
            <el-input v-model="showItem.password"></el-input>
          </el-form-item>
          <el-form-item label="店铺标签" v-show="dialogTitle=='添加商家'">
            <el-select v-model="showItem.label" placeholder="请选择">
					    <el-option
					      v-for="item in shopTagList"
					      :key="item.id"
					      :label="item.text"
					      :value="item.value">
					    </el-option>
					  </el-select>
          </el-form-item>
          <el-form-item label="邮寄地址" v-show="dialogTitle=='添加买家'">
            <el-input v-model="showItem.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toAddShop" v-show="dialogTitle=='添加商家'">提交</el-button>
            <el-button type="primary" @click="toAddBuyer" v-show="dialogTitle=='添加买家'">提交</el-button>
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
				shopLength:"",
				buyerLength:"",
				shopTagList:[],
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
			this.getShopList();
			this.getBuyerList();
			this.getShopTagList();
		},
		methods:{
			getShopList(){
				this.axios.post(this.Api.getAccountList,{
	        type:1
	      }).then((res)=>{
	      	this.shopLength=res.data.length;
	      }).catch((err)=>{
	        console.log("getShopList:"+err);
	      });
			},
			getBuyerList(){
				this.axios.post(this.Api.getAccountList,{
	        type:2
	      }).then((res)=>{
	      	this.buyerLength=res.data.length;
	      }).catch((err)=>{
	        console.log("getBuyerList:"+err);
	      });
			},
			getShopTagList(){
				this.axios.post(this.Api.getTagtList,{}).then((res)=>{
	      	this.shopTagList=res.data;
	      }).catch((err)=>{
	        console.log("getShopTagList:"+err);
	      });
			},
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
			toShowAddShop(){
      	this.dialogTableVisible=true;
      	this.dialogTitle="添加商家";
      },
      toShowAddBuyer(){
      	this.dialogTableVisible=true;
      	this.dialogTitle="添加买家";
      },
      toAddShop(){
      	if(this.showItem.name==""||this.showItem.password==""||this.showItem.userName==""||this.showItem.label==""){
      		this.$message.error('请填写完整信息');
      		console.log(this.showItem)
        	return;
      	}
      	let param={
      		type:1,
      		handle:"1",
      		mess:{
      			name:this.showItem.name,
      			password:this.showItem.password,
      			userName:this.showItem.userName,
      			label:this.showItem.label,
      		}
      	}
      	this.axios.post(this.Api.adminHandle,param).then((res)=>{
      		console.log(res);
      		if(res.data.code==200){
      			this.$message({
	            message: '添加成功',
	            type: 'success'
	          });
	          this.toCancel();
		      	this.getShopList();
      		}
	      }).catch((err)=>{
	        console.log("toAdd:"+err);
	      });
      },
      toAddBuyer(){
      	if(this.showItem.name==""||this.showItem.password==""||this.showItem.userName==""||this.showItem.address==""){
      		this.$message.error('请填写完整信息');
        	return;
      	}
      	let param={
      		type:2,
      		handle:"1",
      		mess:{
      			name:this.showItem.name,
      			password:this.showItem.password,
      			userName:this.showItem.userName,
      			address:this.showItem.address,
      		}
      	}
      	this.axios.post(this.Api.adminHandle,param).then((res)=>{
      		console.log(res);
      		if(res.data.code==200){
      			this.$message({
	            message: '添加成功',
	            type: 'success'
	          });
	          this.toCancel();
		      	this.getBuyerList();
      		}
	      }).catch((err)=>{
	        console.log("toAdd:"+err);
	      });
      }
		}
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