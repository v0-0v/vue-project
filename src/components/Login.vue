<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>请先登陆您的身份</h2>
    <div class="hello">
      <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
        <el-form-item label="角色" prop="radio">
          <el-radio-group v-model="form.radio" v-on:change="judegAccount">
            <el-radio label="0" border>管理员</el-radio>
            <el-radio label="1" border>商家</el-radio>
            <el-radio label="2" border>买家</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" v-on:blur="judegAccount" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="submitForm">登陆</el-button>
          <el-button v-on:click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎来到《私人定制》个性化商品网站',
      labelPosition: 'top',
      form: {
        radio: '0',
        name: '',
        password: ''
      }
    }
  },
  mounted(){
    
  },
  methods:{
    judegAccount(){//检测用户名和角色是否匹配
      if(this.form.name==""){
        return;
      }
      this.axios.post(this.Api.judegAccount,{
        radio:this.form.radio,
        name:this.form.name
      }).then((res)=>{
        if(res.data==-1){
          this.showText('用户名输入错误，请重新输入');
          this.form.name="";
        }
      }).catch((err)=>{
        console.log("judegAccount:"+err);
      });
    },
    resetForm(formName) {//重置
      this.$refs[formName].resetFields();
    },
    submitForm(){//点击登陆验证用户名和密码
      if(this.form.name==""||this.form.password==""){
        this.showText('请输入用户名和密码');
        return;
      }
      this.axios.post(this.Api.login,this.form).then((res)=>{
        if(res.data.code==200){
          this.$message({
            type: 'success',
            message: '登陆成功!'
          });
          if(this.form.radio=='0'){
            this.$router.push({path: '/admin'});
          }else if(this.form.radio=='1'){
            this.$router.push({path: '/shop'});
          }else{
            this.$router.push({path: '/buyer'});
          }
        }else{
          this.showText('密码输入错误，请重新输入');
          this.form.password="";
        }
      }).catch((err)=>{
        console.log("login:"+err);
      });
    },
    showText(mess){//错误提示
      this.$alert(mess, '错了哦', {
        confirmButtonText: '确定'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  width: 286px;
  margin: 0 auto;
  text-align: left;
}
</style>
