<template>
  <div class="sub_register">
    <!-- 注册对话框 -->
    <el-dialog :visible.sync="visible" width="30%" center class="dialog" show-close>
      <!-- 标题 -->
      <div class="tltle" slot="title">新增学科</div>
      <!-- 表单 -->
      <el-form label-width="80px">
        <el-form-item label="学科编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="学科简称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="学科简介">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="学科备注">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 注册框显示隐藏
      visible: false
    };
  }
};
</script>

<style lang="less">
.sub_register {
  .el-dialog__header {
    padding: 0px;
    .tltle {
      text-align: center;
      height: 53px;
      line-height: 53px;
      color: #fff;
      background: linear-gradient(45deg, #00c5fe, #1b95f4);
    }

    .el-dialog__close {
      color: #fff;
    }
  }
}
</style>