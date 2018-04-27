<template>
	<div class="adminShop-wrap">
		<div class="addShopBtn"><i class="el-icon-plus"></i><span>添加商家</span></div>
		<div class="shopList-wrap">
			<h5>商家信息</h5>
	    <!-- <table class="shopList-content">
	      <thead>
	        <tr class="shopList-thead">
	          <th>编号</th>
	          <th>店铺名称</th>
	          <th>登陆账号</th>
	          <th>登陆密码</th>
	          <th>店铺标签</th>
	          <th>操作</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr v-for="item in shopInfo">
	          <td>{{item.id}}</td>
	          <td>{{item.userName}}</td>
	          <td>{{item.loginId}}</td>
	          <td>{{item.password}}</td>
	          <td>{{item.label}}</td>
	          <td>删除，编辑，查看</td>
	        </tr>
	      </tbody>
	    </table> -->
	    <el-table
		    :data="shopInfo"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="id"
		      label="编号"
		      min-width="1">
		    </el-table-column>
		    <el-table-column
		      prop="userName"
		      label="店铺名称"
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
		      prop="label"
		      label="店铺标签"
		      min-width="3">
		    </el-table-column>
		    <el-table-column
		      prop="label"
		      label="标签"
		      :filters="shopTagList"
		      :filter-method="filterTag"
		      filter-placement="bottom-end"
		      min-width="3">
		      <template slot-scope="scope">
		        <el-tag
		          :type="'success'"
		          close-transition>{{scope.row.label}}</el-tag>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" min-width="6">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="">编辑</el-button>
		        <el-button
		          size="mini"
		          @click="">删除</el-button>
		        <el-button
		          size="mini"
		          @click="">查看</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				shopInfo:[],
				shopTagList:[],
			}
		},
		mounted(){
			this.getShopList();
			this.getShopTagList();
		},
		methods:{
			getShopList(){
				this.axios.post(this.Api.getAccountList,{
	        type:1
	      }).then((res)=>{
	      	this.shopInfo=res.data;
	      }).catch((err)=>{
	        console.log("getShopList:"+err);
	      });
			},
			getShopTagList(){
				this.axios.post(this.Api.getTagtList,{}).then((res)=>{
	      	this.shopTagList=res.data;
	      }).catch((err)=>{
	        console.log("getShopList:"+err);
	      });
			},
			filterTag(value, row) {
        return row.label === value;
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
</style>