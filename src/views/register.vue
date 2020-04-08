<template>
  <el-dialog :visible.sync="showRegiter" :show-close="false" width="30%" center class="register">
    <!-- 标题 -->
    <div class="user" slot="title">用户注册</div>
    <!-- 表单内容 -->
    <el-form label-width="100px" :model="form" :rules="rules" ref="form" :status-icon="true">
      <!-- 头像 -->
      <el-form-item label="头像" prop="avatar">
        <!-- on-success 文件上传成功时执行的钩子函数 -->
        <!-- before-upload 文件上传之前执行的钩子函数 -->
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item label="昵称" prop="userName">
        <el-input placeholder="请输入用户名" v-model="form.userName" clearable></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入邮箱" v-model="form.email" clearable></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入手机号" v-model="form.phone" type="number"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="passworld">
        <el-input placeholder="请输入密码" v-model="form.passworld" :show-password="true"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input placeholder="请输入密码" v-model="form.code" show></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img :src="codeUrl" alt class="codeImg" @click="getCodeUrl" />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input placeholder="请输入验证码" v-model="form.rcode" show></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getRcode">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="showRegiter = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// 导入获取短信api
import rcodeClick from "@/api/register.js";
export default {
  data() {
    return {
      // 注册组件显示与否
      showRegiter: false,
      // 文件上传地址
      imageUrl: "",
      // 基地址
      baseUrl: process.env.VUE_APP_URL,
      // 图形验证码地址
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 表单校验对象
      form: {
        // 头像地址
        avatar: "",
        // 用户名称
        userName: "",
        // 邮箱
        email: "",
        // 手机号
        phone: "",
        // 密码
        passworld: "",
        // 图形码地址
        code: "",
        // 验证码
        rcode: ""
      },
      // 验证规则
      rules: {
        // 头像校验
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        // 用户名校验
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "字符在3~6个字段哦", trigger: "blur" }
        ],
        // 邮箱校验
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请输入正确邮箱!");
              }
            },
            trigger: "change"
          }
        ],
        // 手机号校验
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("手机号有误!");
              }
            },
            trigger: "blur"
          }
        ],
        // 密码校验
        passworld: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "请输入正确的密码", trigger: "blur" }
        ],
        // 图形码校验
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入正确的验证码", trigger: "blur" }
        ],
        // 验证码校验
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    handleAvatarSuccess(res, file) {
      // 图片地址/路径
      this.imageUrl = URL.createObjectURL(file.raw);
      // 图片上传校验规则
      this.form.avatar = res.data.file_path;
      // 主动触发表单校验 对部分表单进行校验
      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      // 图片格式设置
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      // 图片大小设置
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 表单提交按钮事件 校验全局表单内容
    submit() {
      this.$refs.form.validate();
    },
    // 图形码地址获取
    getCodeUrl() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取短信验证码 并 对某些输入框进行校验
    getRcode() {
      // 对手机and图形码进行校验
      let _data = true;
      this.$refs.form.validateField(["code", "phone"], error => {
        if (error != "") {
          _data = false;
        }
      });
      if (_data === false) {
        return;
      } else {
        rcodeClick({ code: this.form.code, phone: this.form.phone });
      }
    }
  }
};
</script>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0px;
  }
  .user {
    height: 53px;
    background: linear-gradient(to right, #02c6fc, #1394fc);
    line-height: 53px;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .codeImg {
    width: 100%;
    height: 40px;
    border: 1px dashed #000;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
}
</style>