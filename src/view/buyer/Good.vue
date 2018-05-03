<template>
	<div class="good-wrap">
		<div class="baseInfo-wrap">
			<img :src="goodMess.coverImg" />
			<div>
				<h5>{{goodMess.title}}</h5>
				<p>{{goodMess.produce}}</p>
				<span>{{goodMess.price}}</span>
				<el-button @click="toBuy">立即购买</el-button>
			</div>
		</div>
		<el-tabs v-model="activeName">
	    <el-tab-pane label="商品信息" name="goodMess">
	    	<div class="tags-wrap">
	    		<h5>个性化案例展示</h5>
	    		<div class="caseShow-wrap">
	    			<el-carousel :interval="4000" type="card" height="300px">
					    <el-carousel-item v-for="(item,index) in fileList" :key="index">
					      <img :src="item.url" />
					    </el-carousel-item>
					  </el-carousel>
	    		</div>
	    		<h5>个性化元素</h5>
	    		<div v-for="(item,index) in tagList" class="tags-content" :key="index">
	    			<h6>{{item.type}}</h6>
	    			<div>
	    				<el-tag v-for="(tag,index) in item.list" :key="index">{{tag.name}}</el-tag>
	    			</div>
	    		</div>
	    	</div>
	    </el-tab-pane>
	    <el-tab-pane label="商品评价" name="goodEvaluate">
	    	<ul class="comments-wrap">
	    		<li v-for="comment in goodMess.commentsList">
	    			<p>{{comment.text}}</p>
	    			<span>{{comment.author}}</span>
	    			<div></div>
	    		</li>
	    	</ul>
	    </el-tab-pane>
	  </el-tabs>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				goodMess:{},
				activeName:"goodMess",
				fileList:[],
				tagList:[],
			}
		},
		mounted(){
			this.getGoodMess();
		},
		methods:{
			getGoodMess(){
				let param = {
					shopId:this.$route.query.shopId,
					goodId:this.$route.query.id
				}
				this.axios.post(this.Api.getGoodMess,param).then((res)=>{
	      	this.goodMess=res.data;
	      	this.fileList=res.data.exampleImg;
	      	this.tagList=res.data.tags;
	      }).catch((err)=>{
	        console.log("getGoodMess:"+err);
	      });
			},
			toBuy(){
				this.$router.push({
          path: '/buyer/toBuy',
          query: {
            id: this.$route.query.id,
            shopId: this.$route.query.shopId
          }
        })
			}
		}
	}
</script>

<style scoped>
	.good-wrap{
		width: 100%;
		padding: 0 20px;
	}
	.baseInfo-wrap{
		width: 100%;
		height: 300px;
		margin-top: 20px;
		background-color: #fff;
		border-left: 6px solid #3eb983;
		padding: 20px 20px 20px 13px;
	}
	.baseInfo-wrap img{
		display: block;
		float: left;
		width: 260px;
		height: 260px;
	}
	.baseInfo-wrap div{
		float: left;
		padding-left: 20px;
		text-align: left;
		width: calc(100% - 260px);
	}
	.baseInfo-wrap h5{
		font-size: 30px;
		margin-bottom: 10px;
	}
	.baseInfo-wrap p{
		font-size: 16px;
		color: #666;
		width: 100%;
		height: 100px;
	}
	.baseInfo-wrap span{
		font-size: 30px;
		color: #EA6A69;
		line-height: 65px;
		display: block;
	}
	.baseInfo-wrap button{
		float: right;
	}

	.el-tabs{
		background-color: #fff;
		margin-top: 20px;
		padding: 20px;
	}

	.tags-wrap{
		width: 100%;
		height: auto;
	}
	.tags-wrap h5{
		height: 50px;
		line-height: 50px;
		text-align: left;
		padding-left: 14px;
		border-left: 6px solid #3eb983;
		font-size: 16px;
		border-bottom: 1px solid #eee;
		margin-top: 15px;
		font-weight: bolder;
	}
	.tags-wrap .btn-wrap{
		width: 100%;
		text-align: left;
		padding-top: 10px;
	}
	.tags-content{
		width: 100%;
		text-align: left;
	}
	.tags-content h6{
		font-size: 16px;
		line-height: 40px;
	}

	.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .comments-wrap{
  	width: 100%;
  }
  .comments-wrap li{
  	width: 100%;
  	height: auto;
  	border-bottom: 1px solid #eee;
  }
  .comments-wrap div{
  	width: 100%;
  	height: auto;
  	clear: both;
  }
  .comments-wrap p{
  	width: calc(100% - 200px);
  	float: left;
  	text-align: left;
  	line-height: 30px;
  	padding: 5px 0 5px 10px;
  }
  .comments-wrap span{
  	display: block;
  	width: 200px;
  	float: left;
  	line-height: 40px;
  }

  .caseShow-wrap{
  	width: 1000px;
  	height: auto;
  	margin: 20px auto 0;
  }
  .el-carousel img{
		width: 100%;
		height: 100%;
  }
</style>

<style>
	.el-tabs__item.is-active{
		color: #3eb983;
	}
	.el-tabs__active-bar{
		background-color: #3eb983;
	}
	.el-tabs__header{
		margin: 0;
	}
	.el-upload-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.el-upload-list li{
		width: 300px;
	}
	.el-upload{
		width: 100%;
		text-align: left;
		padding-top: 10px;
	}
	.el-button--primary{
		background-color: #3eb983;
		border-color: #3eb983;
	}
	.el-button--primary:hover{
		background-color: #3eb983;
		border-color: #3eb983;
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
  .dialogheader .button-new-tag{
  	width: auto;
  	background-color: #fff;
  	color: #606266;
  	margin-left: 0;
    height: 32px;
    line-height: 30px;
    padding: 9px 15px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .dialogheader .button-new-tag:hover{
  	color: #409EFF;
  	background-color: rgba(64,158,255,.1);
  	border: 1px solid rgba(64,158,255,.2);
  }
</style>