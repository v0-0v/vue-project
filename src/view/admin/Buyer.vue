<template>
	<div class="adminShop-wrap">
		<div class="addShopBtn" @click="toShowAdd"><i class="el-icon-plus"></i><span>添加买家</span></div>
		<div class="shopList-wrap">
			<h5>买家信息</h5>
	    <el-table
		    :data="buyerInfo"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="id"
		      label="编号"
		      min-width="1">
		    </el-table-column>
		    <el-table-column
		      prop="userName"
		      label="买家昵称"
		      min-width="3">
		    </el-table-column>
		    <el-table-column
		      prop="loginId"
		      label="登陆账号"
		      min-width="3">
		    </el-table-column>
		    <el-table-column
		      prop="password"
		      label="登陆密码"
		      min-width="3">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="邮寄地址"
		      min-width="6">
		    </el-table-column>
		    <el-table-column label="操作" min-width="6">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="toShowEdit(scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          @click="toDelete(scope.row.id)">删除</el-button>
		        <el-button
		          size="mini"
		          @click="toShowCheck(scope.row)">查看</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  <div class="pageblock">
	      <el-pagination
	        layout="prev, pager, next"
	        :page-size="pageSize"
	        :current-page.sync="currentPage"
	        :total="total"
	        @current-change="pagechange">
	      </el-pagination>
	    </div>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" :show-close="false">
      <div class="dialogheader">
        <el-form label-position="right" label-width="80px">
        	<el-form-item label="编号" v-show="dialogTitle=='查看买家'">
            <el-input v-model="showItem.id" :disabled="dialogTitle=='查看买家'"></el-input>
          </el-form-item>
          <el-form-item label="买家昵称">
            <el-input v-model="showItem.userName" :disabled="dialogTitle=='查看买家'"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号">
            <el-input v-model="showItem.name" :disabled="dialogTitle=='查看买家'"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码">
            <el-input v-model="showItem.password" :disabled="dialogTitle=='查看买家'"></el-input>
          </el-form-item>
          <el-form-item label="邮寄地址">
            <el-input v-model="showItem.address" :disabled="dialogTitle=='查看买家'"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toAdd" v-show="dialogTitle=='添加买家'">提交</el-button>
            <el-button type="primary" @click="toEdit" v-show="dialogTitle=='编辑买家'">提交</el-button>
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
				buyerInfo:[],
				dialogTableVisible:false,
				dialogTitle:"",
				showItem:{
					id:"",
					userName:"",
					name:"",
					password:"",
					address:""
				},
				total:0,
	      currentPage:1,
	      pageSize:10,
			}
		},
		mounted(){
			this.getShopList();
		},
		methods:{
			getShopList(){
				this.axios.post(this.Api.getAccountList,{
	        type:2
	      }).then((res)=>{
	      	this.buyerInfo=[];
          for(let i=(this.currentPage-1)*10;i<this.currentPage*10;i++){
            if(res.data.length-1>=i){
              this.buyerInfo.push(res.data[i])
            }
          }
          this.total=parseInt(res.data.length);
	      }).catch((err)=>{
	        console.log("getShopList:"+err);
	      });
			},
			filterTag(value, row) {
        return row.label === value;
      },
      toShowAdd(){
      	this.dialogTableVisible=true;
      	this.dialogTitle="添加买家";
      },
      toShowEdit(obj){
      	this.dialogTableVisible=true;
      	this.dialogTitle="编辑买家";
      	this.showItem.id=obj.id;
      	this.showItem.userName=obj.userName;
      	this.showItem.name=obj.loginId;
      	this.showItem.password=obj.password;
      	this.showItem.address=obj.address;
      },
      toShowCheck(obj){
      	this.dialogTableVisible=true;
      	this.dialogTitle="查看买家";
      	this.showItem.id=obj.id;
      	this.showItem.userName=obj.userName;
      	this.showItem.name=obj.loginId;
      	this.showItem.password=obj.password;
      	this.showItem.address=obj.address;
      },
      toCancel(){
      	this.dialogTableVisible=false;
      	this.dialogTitle="";
      	this.showItem={
					id:"",
					userName:"",
					name:"",
					password:"",
					address:""
				}
      },
      toAdd(){
      	if(this.showItem.name==""||this.showItem.password==""||this.showItem.userName==""||this.showItem.address==""){
      		this.$message.error('请填写完整信息');
      		console.log(this.showItem)
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
		      	this.getShopList();
      		}
	      }).catch((err)=>{
	        console.log("toAdd:"+err);
	      });
      },
      toEdit(){
      	if(this.showItem.name==""||this.showItem.password==""||this.showItem.userName==""||this.showItem.address==""){
      		this.$message.error('请填写完整信息');
      		console.log(this.showItem)
        	return;
      	}
      	let param={
      		type:2,
      		handle:"2",
      		mess:{
      			id:this.showItem.id,
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
	            message: '编辑成功',
	            type: 'success'
	          });
	          this.toCancel();
		      	this.getShopList();
      		}
	      }).catch((err)=>{
	        console.log("toEdit:"+err);
	      });
      },
      toDelete(id){
      	this.$confirm("确定将该买家删除吗？", '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	      	let param={
	      		type:2,
	      		handle:"3",
	      		mess:{
	      			id:id,
	      		}
	      	}
	        this.axios.post(this.Api.adminHandle,param).then((res)=>{
	          console.log(res);
	          if(res.data.code==200){
	            this.$message({
	              type: 'success',
	              message: '删除成功!'
	            });
		      		this.getShopList();
	          }else{
	            this.$notify({
	              title:'提示',
	              message:'删除失败',
	              type:'error',
	            })
	          }
	        });
	      }).catch(() => {
	        this.$message({
	          type: 'info',
	          message: '已取消操作'
	        });          
	      })
      },
      pagechange(val){
	      this.currentPage=val;
	      this.getShopList();
	    },
		}
	}
</script>

<style scoped>
	.adminShop-wrap{
		width: 100%;
		padding: 0 20px;
	}
	.addShopBtn{
		width: 100%;
		height: 70px;
		background-color: #3eb983;
		border: 0;
		color: #fff;
		margin: 20px 0;
		font-size: 16px;
		line-height: 70px;
		cursor: pointer;
	}
	.addShopBtn span{
		height: 100%;
		display: inline-block;
		vertical-align: middle;
	}
	.addShopBtn i{
		font-size: 30px;
		margin-right: 10px;
		display: inline-block;
		vertical-align: middle;
	}
	.shopList-wrap{
		background-color: #fff;
		padding: 20px;
		margin-top: 20px;
	}
	.shopList-wrap h5{
		font-size: 16px;
		text-align: left;
		margin-bottom: 10px;
	}
	.shopList-content{
		width: 100%;
	}
	.el-table thead{
		background-color: #bcf2db;
		height: 32px;
		line-height: 32px;
		font-size: 12px;
		text-align: center;
	}
	.has-gutter th{
		color: #17905c;
		padding: 0 4px;
	}
	.pageblock{
		margin-top: 20px;
		text-align: right;
	}
</style>

<style>
	.el-table thead{
		background-color: #bcf2db;
		height: 32px;
		line-height: 32px;
		font-size: 12px;
		text-align: center;
	}
	.el-table thead tr{
		background-color: #bcf2db;
	}
	.el-table th{
		color: #17905c;
		padding: 0;
		background-color: #bcf2db;
		text-align: center;
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

  .el-message-box button{
    display: inline-block;
    float: right;
  }
  .el-message-box .el-message-box__btns{
  	height: 61px;
  }
  .el-message-box .el-message-box__btns button:nth-child(1){
    margin-left: 10px;
  }
	.el-message-box .el-message-box__btns .el-button--default{
    background-color: #bfcbd9;
    color: #fff;
  }
  .el-message-box .el-message-box__btns .el-button--default:hover{
    background-color: #bfcbd9;
    border-color: #bfcbd9;
    color: #fff;
  }
  .el-message-box .el-message-box__btns .el-button--primary{
    background-color: #3eb983;
    border-color: #3eb983;
  }
  .el-message-box .el-message-box__btns .el-button--primary:hover{
    background-color: #3eb983;
    border-color: #3eb983;
  }

  .el-pagination{
  	font-weight: normal;
  	padding-right: 0;
  }
  .el-pagination button{
  	padding: 0 6px;
  	min-width: 28px;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev{
  	border: 1px solid #d1dbe5;
  }
  .el-pagination .btn-prev{
  	padding-right: 6px;
  	border-right: 0;
  	border-radius: 2px 0 0 2px;
  }
  .el-pagination .btn-next{
  	border-left: 0;
  	padding-left: 6px;
  	border-radius: 0 2px 2px 0;
  }
  .el-pager li{
  	border: 1px solid #d1dbe5;
  	border-right: 0;
  	min-width: 28px;
  }
  .el-pager li.active{
  	color: #fff;
  }
  .pageblock .el-pager li.active{
  	border-color: #3eb983;
  	background-color: #3eb983;
  }
  .el-pager li.active+li{
  	border-left: 0;
  }
  .el-pager li:last-child{
  	border-right: 1px solid #d1dbe5;
  }
</style>