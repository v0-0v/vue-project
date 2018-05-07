<template>
	<div class="toBuy-wrap">
		<div class="baseInfo-wrap">
			<img :src="coverImg" />
			<div>
				<h5>{{title}}</h5>
				<p>{{produce}}</p>
				<span>{{price}}</span>
			</div>
		</div>
		<div class="flow-wrap">
			<el-steps :active="active" finish-status="success">
			  <el-step title="订单选择"></el-step>
			  <el-step title="确认支付"></el-step>
			  <el-step title="订单完成"></el-step>
			</el-steps>
			<div class="flow-content orderCompletion">
				<el-button class="confrimBtn price" @click="toShow" v-show="active==2">立即评价</el-button>
				<qrcode 
				:value="value" 
				:options="{ size: 170 }">
				</qrcode>
				<p>可扫描二维码，查看订单详情</p>
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
import QRcode from '@xkeshi/vue-qrcode'
	export default{
		data(){
			return{
				active: 0,
				dialogTableVisible:false,
				evaluate:"",
				value: '',
				coverImg:"",
				title:"",
				produce:"",
				price:"",
				madeTags:[],
			}
		},
		components:{
			qrcode:QRcode,
		},
		mounted(){
			this.getGoodMess();
		},
		methods:{
			getGoodMess(){
				this.axios.post(this.Api.getOrderMess,{buyerId:this.$store.state.userMess.id,id:this.$route.query.id}).then((res)=>{
					console.log(res.data)
	      	if(res.data.code==200){
	      		this.coverImg=res.data.res.coverImg;
	      		this.title=res.data.res.title;
	      		this.produce=res.data.res.produce;
	      		this.price=res.data.res.price;
	      		this.evaluate=res.data.res.evaluate;
	      		this.madeTags=res.data.res.madeTags;
	      		console.log(this.evaluate)
	      		if(this.evaluate==""){
							this.active=2;
						}else{
							this.active=3;
						}
						//this.value="商品名称："+this.title+";";
						let num=0;
						for(var i=0,length=this.madeTags.length;i<length;i++){
							// this.value+=this.madeTags[i].type+":"+this.madeTags[i].item.name+";"
							// this.value+="价格:"+this.madeTags[i].item.price+"元;"
							num+=this.madeTags[i].item.price
						}
						this.value+="price:"+num+";"
	      	}
	      }).catch((err)=>{
	        console.log("getShopTagList:"+err);
	      });
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
		display: block;
		margin: 20px auto;
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
	.el-step__head.is-success{
		color: #3eb983;
		border-color: #3eb983;
	}
	.el-step__title.is-success{
		color: #3eb983;
	}
</style>