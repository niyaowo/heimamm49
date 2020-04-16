<template>
  <div class="addBusiness">
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <!-- 标题 -->
      <div class="title" slot="title">{{mode=="add"?"企业新增":"企业编辑"}}</div>
      <!-- 主体表单 -->
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addBusiness, editBusiness } from "@/api/business.js";
export default {
  // 编辑/新增
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      // 对话框显示与否
      dialogVisible: false,
      // 表单数据
      form: {
        name: "",
        short_name: "",
        eid: "",
        intro: "",
        remark: ""
      },
      // 表单校验规则
      rules: {
        name: [{ required: true, message: "请输入企业名称" }],
        short_name: [{ required: true, message: "请输入企业简称" }],
        eid: [{ required: true, message: "请输入企业编号" }],
        intro: [{ required: true, message: "请输入企业简介" }]
      }
    };
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
      }
    }
  },
  methods: {
    // 新增企业
    add() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addBusiness(this.form).then(() => {
              this.dialogVisible = false;
              this.$message.success("新增成功");
              this.$parent.search();
            });
          } else {
            editBusiness(this.form).then(() => {
              this.dialogVisible = false;
              this.$message.success("编辑成功");
              this.$parent.search();
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addBusiness {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    line-height: 53px;
    background: linear-gradient(45deg, #01c5fa, #1395fa);
    color: #fff;
  }
}
</style>