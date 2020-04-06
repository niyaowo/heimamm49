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
      <el-form label-width="0px" class="loginForm" :rules="rules" ref="ruleForm" :model="ruleForm">
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" show-password v-model="ruleForm.password"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="key">
          <el-row>
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="ruleForm.key"></el-input>
            </el-col>
            <el-col :span="6">
              <img src="@/assets/img/key.jpg" class="comple" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议书 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私政策</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 登入按钮 -->
        <el-button size="medium" class="enter" @click="click">登录</el-button>
        <!-- 注册按钮 -->
        <el-button size="medium" class="sing">注册</el-button>
      </el-form>
      <!-- 注册表单 -->
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
      ruleForm: {
        // 用户名
        userName: "",
        // 密码
        password: "",
        // 验证码
        key: "",
        // 复选框
        checked: ""
      },
      rules: {
        // 用户名校验
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        // 密码校验
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "字符在 6 到 8 个字符", trigger: "blur" }
        ],
        // 验证码校验
        key: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为 4 的字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    click() {
      // validate 校验整个表单数据
      this.$refs.ruleForm.validate(res => {
        this.$message.success(res + "");
      });
    }
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

    .comple {
      width: 100%;
      height: 40px;
    }
  }
}
</style>