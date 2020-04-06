<template>
  <div class="login">
    <div class="left">
      <!-- 登录页标题 -->
      <div class="title">
        <img src="@/assets/img/01-M-log.png" alt />
        <span class="heima">黑马梅梅</span>
        <span class="icon">|</span>
        <span class="user">用户登陆</span>
      </div>
      <!-- 登入页输入表单 -->
      <el-form label-width="0px" class="loginForm" v-model="form">
        <!-- 用户名 -->
        <el-form-item>
          <el-input prefix-icon="el-icon-user-solid" v-model="form.userName"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <el-row>
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="6">
              <span></span>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议书 -->
        <el-checkbox v-model="checked">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私政策</el-link>
        </el-checkbox>
        <!-- 登入按钮 -->
        <el-button size="medium" class="enter">登录</el-button>
        <!-- 注册按钮 -->
        <el-button size="medium" class="sing">注册</el-button>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: ""
      }
    };
  }
};
</script>

<style lang="less">
.login {
  display: flex;
  height: 100%;
  // 水平布局
  justify-content: space-around;
  // 垂直布局
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);

    .title {
      margin-top: 44px;
      padding-left: 48px;

      .heima,
      .user {
        background: rgba(245, 245, 245, 1);
        margin: 0 17px;
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
      }

      .icon {
        font-size: 22px;
        color: #ccc;
      }
    }

    .loginForm {
      margin-top: 29px;
      padding: 0px 43px;
    }

    .enter,
    .sing {
      width: 100%;
      background: rgba(20, 147, 250, 1);
      margin-top: 28px;
      color: #fff;
      margin-left: 0px;
    }
  }
}
</style>