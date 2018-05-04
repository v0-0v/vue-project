<template>
	<div class="toBuy-wrap">
		<div class="baseInfo-wrap">
			<img :src="goodMess.coverImg" />
			<div>
				<h5>{{goodMess.title}}</h5>
				<p>{{goodMess.produce}}</p>
				<span>{{goodMess.price}}</span>
			</div>
		</div>
		<div class="flow-wrap">
			<el-steps :active="active" finish-status="success">
			  <el-step title="订单选择"></el-step>
			  <el-step title="确认支付"></el-step>
			  <el-step title="订单完成"></el-step>
			</el-steps>
			<div class="flow-content" v-show="active==0">
				<el-form label-position="right" label-width="80px">
					<el-form-item v-for="(tag,index) in tagList" :label="tag.type" :key="index">
				    <el-select v-model="orderForm[index].item.name" placeholder="请选择个性化分类" @change="selectChange($event,index)">
				      <el-option v-for="(list,index) in tag.list" :value="list.name" :key="index">{{list.name}}</el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="价格">
				  	<el-input v-model="price" disabled></el-input>
				  </el-form-item>
				</el-form>
				<el-button class="confrimBtn" @click="toConfrimOrder">确认订单</el-button>
			</div>
			<div class="flow-content" v-show="active==1">
				<div v-for="(item,index) in orderForm" class="confirmPayment">
					<p>{{item.type}}：{{item.item.name}}</p>
					<p>价格：<span>{{item.item.price}}</span></p>
				</div>
				<div class="confirmPayment">
					<p></p>
					<p>总计：<span>{{price}}</span></p>
				</div>
				<el-button class="confrimBtn price" @click="toConfirmPayment">确认支付</el-button>
			</div>
			<div class="flow-content orderCompletion" v-show="active>=2">
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
				goodMess:{},
				active: 0,
				tagList:[],
				orderForm:[],
				price:0,
				dialogTableVisible:false,
				evaluate:"",
				id:"",
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
	      	this.tagList=res.data.tags;
	      	for(var i=0,length=this.tagList.length;i<length;i++){
	      		let tag={
	      			type:this.tagList[i].type,
	      			item:{
	      				name:"",
	      				price:0
	      			}
	      		}
	      		this.orderForm.push(tag);
	      	}
	      }).catch((err)=>{
	        console.log("getGoodMess:"+err);
	      });
			},
			next() {
        if (this.active++ > 2) this.active = 0;
      },
      toConfrimOrder(){
      	var index = this.orderForm.findIndex((value,index,arr)=>{
					return value.item.name=="";
				})
				if(index==-1){
					this.next();
				}else{
					this.$message.error('请填写完整信息');
				}
      },
      selectChange(value,index){
      	var index2 = this.tagList[index].list.findIndex((value1,index,arr)=>{
					return value1.name==value;
				})
      	this.orderForm[index].item.price=this.tagList[index].list[index2].price;
      	console.log(this.orderForm)
      	this.calcPrice();
      },
      calcPrice(){
      	this.price=0;
      	for(var i=0,length=this.orderForm.length;i<length;i++){
      		this.price+=this.orderForm[i].item.price;
      	}
      },
      toConfirmPayment(){
      	let param = {
					shopId:this.$route.query.shopId,
					goodId:this.$route.query.id,
					buyerId:this.$store.state.userMess.id,
					madeTags:this.orderForm,
				}
      	this.axios.post(this.Api.paySuccess,param).then((res)=>{
	      	console.log(res.data)
	      	if(res.data.code==200){
	      		this.id=res.data.id;
	      		this.next();
	      	}
	      }).catch((err)=>{
	        console.log("toConfirmPayment:"+err);
	      });
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
					goodId:this.$route.query.id,
					id:this.id,
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

	.confirmPayment{
		display: flex;
		justify-content: space-around;
		font-size: 20px;
		line-height: 40px;
	}
	.confirmPayment p{
		width: 200px;
	}
	.confirmPayment span{
		color: #EA6A69;
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
	.flow-wrap .el-input.is-disabled .el-input__inner{
		color: #EA6A69;
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

  .el-step__head.is-success{
		color: #3eb983;
		border-color: #3eb983;
	}
	.el-step__title.is-success{
		color: #3eb983;
	}
</style>