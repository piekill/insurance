<template>
  <div class="login-container">
    <div class="login-form">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <Form ref="loginForm" :model="loginForm" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="loginForm.user" placeholder="用户名" disabled>
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="密码"
                 @on-enter="handleSubmit('loginForm')" autofocus="true">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('loginForm')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { ROSTER_LOGIN } from '../common/api';

const sha256 = require('js-sha256');

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        user: 'admin',
        password: '',
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.toLogin();
        }
      });
    },
    toLogin() {
      window.post(ROSTER_LOGIN, {
        user: this.loginForm.user,
        pwd: sha256(this.loginForm.password),
      }, (res) => {
        if (res.data.result_code === 'success') {
          const expireDays = 1000 * 60 * 60 * 24 * 7;
          this.setCookie('session', res.data.session, expireDays);
          this.$forceUpdate();
          this.$store.commit('updateUserInfo', res.data.data);
          this.$router.addRoutes(this.$store.getters.routes);
          this.$router.replace('/');
        } else {
          this.$Message.error('登录失败，请输入正确密码。');
        }
      });
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  $bg:#515a6e;
  $light_gray:#eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 300px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
      text-align: center;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  }
</style>
