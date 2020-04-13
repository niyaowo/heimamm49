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
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" show-password v-model="ruleForm.password"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img :src="code" class="comple" @click="getCode" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议书 -->
        <el-form-item prop="isCheck">
          <el-checkbox v-model="ruleForm.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私政策</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 登入按钮 -->
        <el-button size="medium" class="enter" @click="click">登录</el-button>
        <!-- 注册按钮 -->
        <el-button size="medium" class="sing" @click="sing">注册</el-button>
      </el-form>
      <!-- 注册表单 -->
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>

    <!-- 使用组件 -->
    <register ref="register"></register>
  </div>
</template>

<script>
// 导入子组件
import register from "@/views/login/register.vue";
// 导入登入请求API
import { toLogin } from "@/api/toLogin.js";
// 保存token
import { saveToken, getToken } from "@/utils/token.js";

export default {
  // 注册子组件
  components: {
    register
  },
  data() {
    return {
      // 登陆验证码
      code: process.env.VUE_APP_URL + "/captcha?type=login",

      ruleForm: {
        // 用户名
        phone: "",
        // 密码
        password: "",
        // 验证码
        code: "",
        // 复选框
        isCheck: ""
      },
      rules: {
        // 用户名校验
        phone: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 11,
            max: 11,
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机");
              }
            },
            trigger: "change"
          }
        ],
        // 密码校验
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "字符在 6 到 8 个字符", trigger: "change" }
        ],
        // 验证码校验
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为 4 的字符", trigger: "blur" }
        ],
        // 复选框校验
        isCheck: [
          { required: true, message: "请勾选协议", trigger: "change" },
          {
            validator: (relu, value, callback) => {
              if (value == true) {
                callback();
              } else {
                callback("请勾选协议");
              }
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    click() {
      // validate 校验整个表单数据
      this.$refs.ruleForm.validate(res => {
        if (res == true) {
          // 发送请求
          toLogin(this.ruleForm).then(res => {
            console.log(res);
            if (res.code == 200) {
              // 登入成功提示
              this.$message.success("登入成功!");
              // 保存token
              saveToken(res.data.token);
              this.$router.push("/home");
            }
          });
        }
      });
    },
    // 注册页显示
    sing() {
      this.$refs.register.showRegiter = true;
    },
    // 获取验证码
    getCode() {
      this.code =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    }
  },
  created() {
    if (getToken()) {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less" scope>
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
      border: 1px dashed #ddd;
    }
  }
}
</style>