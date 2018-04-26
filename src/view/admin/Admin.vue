<template>
	<div class="admin-wrap">
		<el-container>
		  <el-aside width="200px">
		  	<el-menu
		      default-active="1-1"
		      class="el-menu-vertical-demo"
		      background-color="#545c64"
		      text-color="#fff"
		      active-text-color="#3eb983">
		      <el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-tickets"></i>
		          <span>账号管理</span>
		        </template>
		        <el-menu-item-group>
		          <el-menu-item index="1-1">商家账号管理</el-menu-item>
		          <el-menu-item index="1-2">买家账号管理</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
		  </el-aside>
		  <el-main>
				<h5>商家账户管理</h5>
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
</style>

<style>
	.el-container{
		height: 100%;
	}
	.el-menu{
		height: 100%;
	}
</style>