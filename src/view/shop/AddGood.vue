<template>
	<div class="addGood-wrap">
		<div class="baseInfo-wrap">
			<h5>基本信息</h5>
			<el-form label-position="right" label-width="80px">
				<div>
					<el-form-item label="商品标题">
	          <el-input v-model="title"></el-input>
	        </el-form-item>
	        <el-form-item label="商品价格">
	          <el-input v-model="price"></el-input>
	        </el-form-item>
	        <el-form-item label="封面图片">
	          <el-upload
						  class="upload-demo"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :on-success="handleAvatarSuccess1"
						  :on-remove="handleRemove1"
						  :before-upload="beforeAvatarUpload"
						  list-type="picture">
						  <el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
	        </el-form-item>
				</div>
				<div>
					<el-form-item label="商品描述">
	          <el-input type="textarea" v-model="produce"></el-input>
	        </el-form-item>
				</div>
      </el-form>
		</div>
		<div class="personal-wrap">
			<h5>个性化案例展示</h5>
			<el-upload
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :on-success="handleAvatarSuccess2"
			  :on-remove="handleRemove2"
			  list-type="picture">
			  <el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
			<h5>个性化元素管理</h5>
			<div class="btn-wrap">
				<el-button size="small" type="primary" @click="toShowAdd">点击添加</el-button>
			</div>
			<div v-for="item in tags" class="tags-content" :key="item.id">
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
					<el-button v-else class="button-new-tag" @click="showInput(item.id,item.type)">+ 添加新元素</el-button>
				</div>
			</div>
		</div>
		<el-button class="submitBtn" size="small" @click="toSubmit">确认上架该商品</el-button>
		<el-dialog title="添加元素分类" :visible.sync="dialogTableVisible" :show-close="false">
      <div class="dialogheader">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="元素分类">
            <el-input v-model="showItem.type"></el-input>
          </el-form-item>
          <el-form-item label="元素标签">
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
            <el-button type="primary" @click="toAddGoodTags">提交</el-button>
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
				coverImg:"",
				title:"",
				produce:"",
				price:"",
				exampleImg:[],
				tags:[],
				commentsList:[],
				inputVisible: false,
        inputValue1: '',
        inputValue2: '',
        dialogTableVisible:false,
        showItem:{
        	type:"",
        	list:[],
        	inputVisible:false
        },
        
			}
		},
		methods:{
			handleAvatarSuccess1(res, file){
      	this.coverImg=URL.createObjectURL(file.raw);
      },
      handleRemove1(file, fileList) {
        this.coverImg="";
      },
      beforeAvatarUpload(file){
      	if(this.coverImg!=""){
      		this.$message.error('只能上传一张，若要修改请将上一张删除');
      		return false;
      	}
      },
      handleAvatarSuccess2(res, file){
      	var imgObj={
      		name:file.name,
      		url:URL.createObjectURL(file.raw)
      	}
      	this.exampleImg.push(imgObj);
      },
      handleRemove2(file, fileList) {
        var index = this.exampleImg.findIndex((value,index,arr)=>{
					return value.name==file.name;
				})
				this.exampleImg.splice(index,1);
      },
      handleClose(tag,id) {
      	if(id!=-1){
      		this.tags[id].list.splice(this.tags[id].list.indexOf(tag), 1);
	        
      	}else{
      		this.showItem.list.splice(this.showItem.list.indexOf(tag), 1);
      	}
      },
      showInput(id,type) {
        console.log(id)
      	if(id!=-1){
      		this.tags[id].inputVisible = true;
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
          this.tags[id].list.push(tag);
          // let param = {
          //   shopId:this.$store.state.userMess.id,
          //   goodId:this.$route.params.id.slice(1),
          //   id:id,
          //   list:this.tagList[id].list,
          // }
          // this.axios.post(this.Api.changeTags,param).then((res)=>{
          //   console.log(res)
          // }).catch((err)=>{
          //   console.log("handleInputConfirm:"+err);
          // });
          this.tags[id].inputVisible = false;
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
        	type:"",
        	list:[],
        	inputVisible:false
				}
      },
      toShowAdd(){
      	this.dialogTableVisible=true;
      },
      toAddGoodTags(){
      	if(this.showItem.type==""||this.showItem.list.length==0){
      		this.$message.error('请填写完整信息');
      		return;
      	}
      	var id=0;
      	if(this.tags.length==0){
      		id=0;
      	}else{
      		id=this.tags[this.tags.length-1].id+1;
      	}
      	var tag={
      		id:id,
      		inputVisible:false,
      		type:this.showItem.type,
      		list:this.showItem.list
      	}
      	this.tags.push(tag);
      	this.toCancel()
      },
      toSubmit(){
      	if(this.coverImg==""||this.title==""||this.produce==""||this.price==""||this.exampleImg.length==0||this.tags.length==0){
      		this.$message.error('请填写完整信息');
      		return;
      	}
      	let param = {
					shopId:this.$store.state.userMess.id,
					good:{
						coverImg:this.coverImg,
						title:this.title,
						produce:this.produce,
						price:this.price,
						exampleImg:this.exampleImg,
						tags:this.tags,
						commentsList:this.commentsList
					}
				}
				this.axios.post(this.Api.addGood,param).then((res)=>{
	      	console.log(res)
	      	if(res.data.code==200){
	      		this.$router.push({path: '/shop/goodList'});
	      	}
	      }).catch((err)=>{
	        console.log("toSubmit:"+err);
	      });
      }
		}
	}
</script>

<style scoped>
	.addGood-wrap{
		width: 100%;
		padding: 0 20px;
	}
	.baseInfo-wrap{
		width: 100%;
		height: 360px;
		margin-top: 20px;
		background-color: #fff;
		border-left: 6px solid #3eb983;
		padding: 0 20px 20px 13px;
	}
	.baseInfo-wrap h5{
		height: 50px;
		line-height: 50px;
		text-align: left;
		padding-left: 14px;
		font-size: 16px;
		border-bottom: 1px solid #eee;
		font-weight: bolder;
	}
	.personal-wrap{
		width: 100%;
		height: auto;
		padding: 20px;
		margin-top: 20px;
		background-color: #fff;
	}
	.personal-wrap h5{
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
	.btn-wrap{
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

  .submitBtn{
  	background-color: #3eb983;
    border-color: #3eb983;
    color: #fff;
    padding: 15px 30px;
    font-size: 16px;
    margin-top: 10px;
  }
</style>

<style>
	.el-form{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-top: 20px;
	}
	.el-form div{
		width: 400px;
		padding-right: 80px;
		box-sizing: content-box;
	}
	.el-upload-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.el-upload-list li{
		width: 300px;
	}
	.el-upload {
    width: 100%;
    text-align: left;
    padding-top: 10px;
	}
	.el-button--primary {
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