<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold icon"></i>
        <img src="@/assets/img/indexLogin.png" class="img" alt />
        <span class="txt">黑马梅梅</span>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" class="userImg" alt />
        <span class="userName">{{userInfo.phone}}</span>
        <button class="btn" @click="loginOut">退出</button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入获取用户详情 api接口
import { getUserInfo } from "@/api/home.js";
import { getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      // 用户详情
      userInfo: ""
    };
  },
  methods: {
    loginOut() {
      this.$confirm("确定退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!"
        });
      });
    }
  },
  // 创建实例化vue对象执行
  created() {
    if (!getToken()) {
      this.$router.push("/");
      return;
    }
    getUserInfo().then(res => {
      console.log(res);
      this.userInfo = res.data;
      // 用户图片头像
      res.data.avatar = process.env.VUE_APP_URL + "/" + res.data.avatar;
    });
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  }
  .left {
    display: flex;
    align-items: center;
    .icon {
      font-size: 22px;
    }
    .img {
      width: 33px;
      height: 28px;
      margin: 0px 10px;
    }
    .txt {
      font-size: 22px;
      font-family: Microsoft YaHei;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    .userImg {
      width: 42px;
      height: 42px;
    }
    .userName {
      margin: 0px 10px;
      font-size: 14px;
      font-family: Microsoft YaHei;
    }
    .btn {
      width: 57px;
      height: 28px;
      background: rgba(64, 158, 255, 1);
      border: 1px solid rgba(54, 156, 255, 1);
      border-radius: 4px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      font-family: Microsoft YaHei;
    }
  }
  .aside {
    width: 201px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  }
}
</style>