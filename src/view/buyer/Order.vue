<template>
	<div class="toBuy-wrap">
		<div class="baseInfo-wrap">
			<img :src="$route.query.coverImg" />
			<div>
				<h5>{{$route.query.title}}</h5>
				<p>{{$route.query.produce}}</p>
				<span>{{$route.query.price}}</span>
			</div>
		</div>
		<div class="flow-wrap">
			<el-steps :active="active" finish-status="success">
			  <el-step title="订单选择"></el-step>
			  <el-step title="确认支付"></el-step>
			  <el-step title="订单完成"></el-step>
			</el-steps>
			<div class="flow-content orderCompletion">
				<img src="../../assets/images/admin/complate.png" />
				<p>订单已完成！可在“我的订单”中查看</p>
				<el-button class="confrimBtn price" @click="toShow" v-show="active==2">立即评价</el-button>
			</div>
		</div>
		<el-dialog title="我的评价" :visible.sync="dialogTableVisible" :show-close="false">
      <div class="dialogheader">
        <el-form label-position="right" label-width="80px">
        	<el-form-item label="评价内容">
            <el-input type="textarea" v-model="evaluate"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSubmitEvaluation">提交</el-button>
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
				active: 0,
				dialogTableVisible:false,
				evaluate:"",
			}
		},
		mounted(){
			this.getGoodMess();
		},
		methods:{
			getGoodMess(){
				if(this.$route.query.evaluate==""){
					this.active=2;
				}else{
					this.active=3;
				}
			},
			next() {
        if (this.active++ > 2) this.active = 0;
      },
      toCancel(){
      	this.dialogTableVisible=false;
      	this.evaluate="";
      },
      toShow(){
      	this.dialogTableVisible=true;
      },
      toSubmitEvaluation(){
      	if(this.evaluate==""){
      		this.$message.error('请输入评价内容');
      		return;
      	}
      	let param={
      		buyerId:this.$store.state.userMess.id,
      		shopId:this.$route.query.shopId,
					goodId:this.$route.query.goodId,
					id:this.$route.query.id,
					comment:this.evaluate
      	}
      	this.axios.post(this.Api.submitEvaluation,param).then((res)=>{
	      	console.log(res.data)
	      	if(res.data.code==200){
	      		this.next();
	      		this.toCancel();
	      	}
	      }).catch((err)=>{
	        console.log("toSubmitEvaluation:"+err);
	      });
      }
		}
	}
</script>

<style scoped>
	.toBuy-wrap{
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

	.flow-wrap{
		width: 100%;
		height: auto;
		margin-top: 20px;
		background-color: #fff;
		padding: 20px;
	}
	.flow-content{
		width: 600px;
		margin: 40px auto 0;
	}
	.confrimBtn{
		background-color: #3eb983;
		border-color: #3eb983;
		color: #fff;
		padding: 10px 40px;
	}
	.price{
		margin-top: 20px;
	}

	.orderCompletion{
		text-align: center;
	}
	.orderCompletion img{
		width: 180px;
	}
	.orderCompletion p{
		color: #3eb983;
		font-size: 18px;
		line-height: 30px;
	}
</style>

<style>
	.el-step__head{
		text-align: left;
	}
</style>