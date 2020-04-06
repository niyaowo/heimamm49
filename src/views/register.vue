<template>
  <el-dialog :visible.sync="showRegiter" :show-close="false" width="30%" center>
    <div class="user" slot="title">用户注册</div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="showRegiter = false">取 消</el-button>
      <el-button type="primary" @click="showRegiter = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      showRegiter: false
    };
  }
};
</script>

<style lang="less" scope>
.user {
  height: 53px;
  width: 100%;
  background: linear-gradient(to right, #02c6fc, #1394fc);
  line-height: 53px;
  padding: 0px !important;
}
</style>