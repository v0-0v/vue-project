<template>
	<div class="admin-wrap">
		<el-container>
		  <el-aside width="260px">
		    <el-row >
			    <el-col>
			      <el-menu 
			        default-active="1" 
			        class="el-menu-vertical-demo" 
			        :unique-opened="true">
			        <el-menu-item index="1">
			          <router-link to="/shop/index"><img src="../../assets/images/admin/administrator.png" />店铺信息</router-link>
			        </el-menu-item>
			        <el-submenu index="2">
			          <template slot="title" ><i class="el-icon-tickets"></i>商品管理</template>
			          <el-menu-item-group>
			            <el-menu-item index="2-1">
			              <router-link to="/shop/goodList">已上架商品</router-link>
			            </el-menu-item>
			            <el-menu-item index="2-2">
			              <router-link to="/shop/addGood">添加商品</router-link>
			            </el-menu-item>
			          </el-menu-item-group>
			        </el-submenu>
			      </el-menu>
			    </el-col>
			  </el-row>
		  </el-aside>
		  <el-main>
		  	<div class="header-wrap">
		  		<router-link to="/index">退出</router-link>
		  		<div>
		  			<img src="../../assets/images/admin/userImg.png" />
		  			{{$store.state.userMess.userName}}
		  		</div>
		  	</div>
				<router-view></router-view>
		  </el-main>
		</el-container>
	</div>
</template>

<script>
	
</script>

<style scoped>
	.admin-wrap{
		height: 100%;
	}
	.header-wrap{
		width: 100%;
		height: 50px;
		background-color: #fff;
		padding: 0 20px;
		line-height: 50px;
	}
	.header-wrap a{
		display: block;
		float: right;
		color: #3eb983;
	}
	.header-wrap div{
		height: 100%;
		float: right;
		text-align: left;
		vertical-align: middle;
		padding-right: 30px;
	}
	.header-wrap img{
		width: 20px;
		vertical-align: middle;
		margin-right: 5px;
	}
</style>

<style>
	.el-container{
		height: 100%;
	}
	.el-aside{
		background-color: #1f2935;
		text-align: left;
	}
	.el-main{
		padding: 0;
	}
	.el-menu{
		height: 100%;
	}
</style>

<style>
	.iconfont{
    margin-right:10px;
  }
  .el-menu-vertical-demo{
    padding-left: 18px;
  }
  .el-menu{
    background: #1f2935!important;
    border-right: 0;
  }
  .el-menu img{
  	width: 20px;
  	margin: 0 5px 0 2px;
  	vertical-align: middle;
  }
  .el-menu-item a{
    display: block;
    width: 100%;
    height: 100%;
    font-size: 14px;
    /*padding-left: 6px;*/
  }
  .el-submenu a{
    padding-left: 6px;
  }
  a.router-link-active a{
    color:#3eb983!important; 
  }
  .el-menu-item-group .is-active a{
    color:#3eb983!important; 
  }
  .el-menu-item-group li{
    background:#1f2935;
    line-height: 48px;
    font-size:16px;
  }
  .el-menu-item-group li i{
  	margin-right: 10px;
  }
  .el-menu-item-group__title {
    padding-top: 0;
    color: #a2aebf;
  }
  a{
    color: #a2aebf;
  }
  .el-submenu .el-menu-item:hover, .el-submenu__title:hover{
    background: #0f1722!important;
  }
  .el-menu-item, .el-submenu__title{
    color:#a2aebf; 
  }
  .el-submenu__icon-arrow{
    right: 40px;
  }
  .el-menu-vertical-demo{
    padding-left: 0;
  }
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover, .el-menu-item:hover{
    background: #0f1722;
  }
</style>