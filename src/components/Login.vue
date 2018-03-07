<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>请先登陆您的身份</h2>
    <div class="hello">
      <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
        <el-form-item label="角色" prop="radio">
          <el-radio-group v-model="form.radio" v-on:change="judegAccount">
            <el-radio label="1" border>管理员</el-radio>
            <el-radio label="2" border>商家</el-radio>
            <el-radio label="3" border>买家</el-radio>
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
        radio: '1',
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
      var accountArr = [];
      var accountName = [];
      switch(this.form.radio){
        case "1":accountArr=this.$store.state.adminAccount;break;
        case "2":accountArr=this.$store.state.shopAccount;break;
        default:accountArr=this.$store.state.buyerAccount;
      }
      for(var i=0,arrLength=accountArr.length;i<arrLength;i++){
        accountName.push(accountArr[i].name);
      }
      if(accountName.indexOf(this.form.name)==-1){
        this.showText('用户名输入错误，请重新输入');
        this.form.name = '';
      }
    },
    resetForm(formName) {//重置
      this.$refs[formName].resetFields();
    },
    submitForm(){//点击登陆验证用户名和密码
      if(this.form.name==""||this.form.password==""){
        this.showText('请输入用户名和密码');
        return;
      }
      let accountArr = [];
      var type = "";
      switch(this.form.radio){
        case "1":accountArr=this.$store.state.adminAccount;type="admin";break;
        case "2":accountArr=this.$store.state.shopAccount;type="shop";break;
        default:accountArr=this.$store.state.buyerAccount;type="buyer";
      }
      for(var i=0,arrLength=accountArr.length;i<arrLength;i++){
        if(this.form.name==accountArr[i].name&&this.form.password!=accountArr[i].password){
          this.showText('密码输入错误，请重新输入');
          this.form.password = '';
          return;
        }else if(this.form.name==accountArr[i].name&&this.form.password==accountArr[i].password){
          this.$store.commit('login',{userMess:accountArr[i].mess,loginState:this.form.radio})
          this.$router.push({path:`/${type}`});
        }
      }
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
