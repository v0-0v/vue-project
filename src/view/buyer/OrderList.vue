<template>
	<div class="shopGoodList-wrap">
		<el-card :body-style="{ padding: '0px' }" v-for="item in goodList" class="goodList-content" :key="item.id">
      <img :src="item.coverImg">
      <div class="goodList-mess">
        <h5>{{item.title}}</h5>
        <div class="bottom clearfix">
          <span class="time">{{item.price}}</span>
          <span class="link" @click="toEdit(item)">查看详情</span>
        </div>
      </div>
    </el-card>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				goodList:[],
			}
		},
		mounted(){
			this.getGoodList();
		},
		methods:{
			getGoodList(){
				this.axios.post(this.Api.getOrderList,{buyerId:this.$store.state.userMess.id}).then((res)=>{
					console.log(res.data.list)
	      	this.goodList=res.data.list;
	      }).catch((err)=>{
	        console.log("getShopTagList:"+err);
	      });
			},
			toEdit(obj){
				this.$router.push({
          path: '/buyer/order',
          query: {
            id: obj.id,
          }
        })
			}
		}
	}
</script>

<style scoped>
	.shopGoodList-wrap{
		width: calc(100% - 40px);
		background-color: #fff;
		margin: 20px auto;
		padding: 20px 20px 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.goodList-content{
		width: 300px;
		height: auto;
		margin-bottom: 20px;
	}
	.goodList-content img{
		width: 100%;
		height: 300px;
		display: block;
	}
	.goodList-mess{
		width: 100%;
		padding: 10px;
		text-align: left;
	}
	.goodList-mess h5{
		font-size: 16px;
	}
	.goodList-mess span{
		font-size: 30px;
		color: #EA6A69;
		line-height: 65px;
	}
	.goodList-mess span.link{
		float: right;
		line-height: 65px;
		color: #409eff;
		font-size: 14px;
		cursor: pointer;
	}
</style>