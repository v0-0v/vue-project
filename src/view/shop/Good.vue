<template>
	<div class="good-wrap">
		<div class="baseInfo-wrap">
			<img :src="goodMess.coverImg" />
			<div>
				<h5>{{goodMess.title}}</h5>
				<p>{{goodMess.produce}}</p>
				<span>{{goodMess.price}}</span>
				<el-button @click="toShowChange">修改基本信息</el-button>
			</div>
		</div>
		<el-tabs v-model="activeName">
	    <el-tab-pane label="商品信息" name="goodMess">
	    	<div class="tags-wrap">
	    		<h5>个性化案例展示</h5>
	    		<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-success="handleAvatarSuccess"
					  :on-remove="handleRemove"
					  :file-list="fileList"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
					<h5>个性化元素管理</h5>
					<div class="btn-wrap">
						<el-button size="small" type="primary" @click="toShowAdd">点击添加</el-button>
					</div>
					<div v-for="item in tagList" class="tags-content" :key="item.id">
						<h6>{{item.type}}</h6>
						<div>
							<el-tag
							  v-for="(tag,index) in item.list"
							  :key="index"
							  closable
							  :disable-transitions="false"
							  @close="handleClose(tag,item.id)">
							  {{tag.name}}
							</el-tag>
							<el-input
							  class="input-new-tag"
							  v-if="item.inputVisible"
							  v-model="inputValue1"
							  :ref="item.type"
							  size="small"
							  placeholder="标签名称"
							></el-input>
							<el-input
							  class="input-new-tag"
							  v-if="item.inputVisible"
							  v-model="inputValue2"
							  :ref="item.type"
							  size="small"
							  placeholder="标签价格"
							></el-input>
							<el-button v-if="item.inputVisible" class="button-new-tag" @click="handleInputConfirm(item.id)">确定</el-button>
							<el-button v-else class="button-new-tag" size="small" @click="showInput(item.id,item.type)">+ 添加新元素</el-button>
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
	  <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" :show-close="false">
      <div class="dialogheader">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="商品标题" v-show="dialogTitle=='修改基本信息'">
            <el-input v-model="showItem.title"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" v-show="dialogTitle=='修改基本信息'">
            <el-input type="textarea" v-model="showItem.produce"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" v-show="dialogTitle=='修改基本信息'">
            <el-input v-model="showItem.price"></el-input>
          </el-form-item>
          <el-form-item label="元素分类" v-show="dialogTitle=='添加元素分类'">
            <el-input v-model="showItem.type"></el-input>
          </el-form-item>
          <el-form-item label="元素标签" v-show="dialogTitle=='添加元素分类'">
            <el-tag
						  v-for="(tag,index) in showItem.list"
						  :key="index"
						  closable
						  :disable-transitions="false"
						  @close="handleClose(tag,-1)">
						  {{tag.name}}
						</el-tag>
						<el-input
						  class="input-new-tag"
						  v-if="showItem.inputVisible"
						  v-model="inputValue1"
						  ref="saveTagInput"
						  size="small"
						  placeholder="标签名称"
						>
						</el-input>
						<el-input
						  class="input-new-tag"
						  v-if="showItem.inputVisible"
						  v-model="inputValue2"
						  ref="saveTagInput"
						  size="small"
						  placeholder="标签价格"
						>
						</el-input>
						<el-button v-if="showItem.inputVisible" class="button-new-tag" @click="handleInputConfirm(-1)">确定</el-button>
						<el-button v-else class="button-new-tag" size="small" @click="showInput(-1,showItem.type)">+ 添加新元素</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toChangeBasicMess" v-show="dialogTitle=='修改基本信息'">提交</el-button>
            <el-button type="primary" @click="toAddGoodTags" v-show="dialogTitle=='添加元素分类'">提交</el-button>
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
				activeName:"goodMess",
				fileList:[],
				tagList:[],
				inputVisible: false,
        inputValue1: '',
        inputValue2: '',
        dialogTableVisible:false,
				dialogTitle:"",
        showItem:{
        	title:"",
        	produce:"",
        	price:"",
        	type:"",
        	list:[],
        	inputVisible:false
        }
			}
		},
		mounted(){
			this.getGoodMess();
		},
		methods:{
			getGoodMess(){
				let param = {
					shopId:this.$store.state.userMess.id,
					goodId:this.$route.params.id.slice(1)
				}
				this.axios.post(this.Api.getGoodMess,param).then((res)=>{
	      	this.goodMess=res.data;
	      	this.fileList=res.data.exampleImg;
	      	this.tagList=res.data.tags;
	      }).catch((err)=>{
	        console.log("getGoodMess:"+err);
	      });
			},
			handleRemove(file, fileList) {
        let param = {
					shopId:this.$store.state.userMess.id,
					goodId:this.$route.params.id.slice(1),
					type:2,
					name:file.name,
				}
				this.axios.post(this.Api.changeExampleImg,param).then((res)=>{
	      	console.log(res)
	      }).catch((err)=>{
	        console.log("handleRemove:"+err);
	      });
      },
      handleAvatarSuccess(res, file){
      	let param = {
					shopId:this.$store.state.userMess.id,
					goodId:this.$route.params.id.slice(1),
					type:1,
					file:{name:file.name,url:URL.createObjectURL(file.raw)},
				}
				this.axios.post(this.Api.changeExampleImg,param).then((res)=>{
	      	console.log(res)
	      }).catch((err)=>{
	        console.log("handleAvatarSuccess:"+err);
	      });
      },
      handleClose(tag,id) {
      	if(id!=-1){
      		this.tagList[id].list.splice(this.tagList[id].list.indexOf(tag), 1);
	        let param = {
						shopId:this.$store.state.userMess.id,
						goodId:this.$route.params.id.slice(1),
						id:id,
						list:this.tagList[id].list,
					}
					this.axios.post(this.Api.changeTags,param).then((res)=>{
		      	console.log(res)
		      }).catch((err)=>{
		        console.log("handleClose:"+err);
		      });
      	}else{
      		this.showItem.list.splice(this.showItem.list.indexOf(tag), 1);
      	}
      },
      showInput(id,type) {
      	if(id!=-1){
      		this.tagList[id].inputVisible = true;
      		// this.$nextTick(_ => {
      		// 	this.$refs[type][0].$refs.input.focus();
	       //  });
      	}else{
      		this.showItem.inputVisible = true;
      		// this.$nextTick(_ => {
	       //  	this.$refs.saveTagInput.$refs.input.focus();
	       //  });
      	}
        
      },
      handleInputConfirm(id) {
        let inputValue1 = this.inputValue1;
        let inputValue2 = this.inputValue2;
        if (inputValue1&&inputValue2&&id!=-1) {
        	var tag={
        		name:inputValue1,
        		price:inputValue2
        	}
          this.tagList[id].list.push(tag);
          let param = {
						shopId:this.$store.state.userMess.id,
						goodId:this.$route.params.id.slice(1),
						id:id,
						list:this.tagList[id].list,
					}
					this.axios.post(this.Api.changeTags,param).then((res)=>{
		      	console.log(res)
		      }).catch((err)=>{
		        console.log("handleInputConfirm:"+err);
		      });
		      this.tagList[id].inputVisible = false;
        }else if(inputValue1&&inputValue2&&id==-1){
        	var tag={
        		name:inputValue1,
        		price:inputValue2
        	}
        	this.showItem.list.push(tag);
        	this.showItem.inputVisible = false
        }else if(id!=-1&&(inputValue1==""||inputValue2=="")){
        	this.tagList[id].inputVisible = false;
        }else if(id==-1&&(inputValue1==""||inputValue2=="")){

        	this.showItem.inputVisible = false;
        }
        this.inputValue1 = '';
        this.inputValue2 = '';
      },
      toCancel(){
      	this.dialogTableVisible=false;
      	this.dialogTitle="";
      	this.showItem={
					title:"",
        	produce:"",
        	price:"",
        	type:"",
        	list:[],
        	inputVisible:false
				}
      },
      toShowChange(){
      	this.dialogTableVisible=true;
      	this.dialogTitle="修改基本信息";
      	this.showItem.title=this.goodMess.title;
      	this.showItem.produce=this.goodMess.produce;
      	this.showItem.price=this.goodMess.price;
      },
      toChangeBasicMess(){
      	if(this.showItem.title==""||this.showItem.produce==""||this.showItem.price==""){
      		this.$message.error('请填写完整信息');
      		return;
      	}
      	let param = {
					shopId:this.$store.state.userMess.id,
					goodId:this.$route.params.id.slice(1),
					title:this.showItem.title,
					produce:this.showItem.produce,
					price:this.showItem.price
				}
				this.axios.post(this.Api.changeGoodBasicMess,param).then((res)=>{
	      	console.log(res)
	      	if(res.data.code==200){
	      		this.$message({
	            message: '编辑成功',
	            type: 'success'
	          });
	          this.toCancel();
	      		this.getGoodMess();
	      	}
	      }).catch((err)=>{
	        console.log("toChangeBasicMess:"+err);
	      });
      },
      toShowAdd(){
      	this.dialogTableVisible=true;
      	this.dialogTitle="添加元素分类";
      },
      toAddGoodTags(){
      	console.log(this.showItem.list)
      	if(this.showItem.type==""||this.showItem.list.length==0){
      		this.$message.error('请填写完整信息');
      		return;
      	}
      	let param = {
					shopId:this.$store.state.userMess.id,
					goodId:this.$route.params.id.slice(1),
					type:this.showItem.type,
					list:this.showItem.list,
				}
				this.axios.post(this.Api.addGoodTags,param).then((res)=>{
	      	console.log(res)
	      	if(res.data.code==200){
	      		this.$message({
	            message: '添加成功',
	            type: 'success'
	          });
	          this.toCancel();
	      		this.getGoodMess();
	      	}
	      }).catch((err)=>{
	        console.log("toAddGoodTags:"+err);
	      });
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