<template>
  <div class="sub_register">
    <!-- 注册对话框 -->
    <el-dialog :visible.sync="visible" width="30%" center class="dialog" show-close>
      <!-- 标题 -->
      <div class="tltle" slot="title">{{mode=="add"?"新增标题":"编辑学科"}}</div>
      <!-- 表单 -->
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addSubject, editSubject } from "@/api/subject.js";
export default {
  // 父组件传值子组件
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      // 注册框显示隐藏
      visible: false,
      // 表单数据
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 表单校验
      rules: {
        rid: [{ required: true, message: "请输入学科编号", triger: "change" }],
        name: [{ required: true, message: "请输入学科名称" }]
      }
    };
  },
  // 侦听数据
  watch: {
    visible(newVal) {
      if (newVal == false) {
        // this.$refs.form.resetFields();
        this.form = {
          rid: "",
          name: "",
          short_name: "",
          intro: "",
          remark: ""
        };
      }
    }
  },
  methods: {
    add() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addSubject(this.form).then(res => {
              if (res.code == 200) {
                this.$message.success("新增成功");
                this.visible = false;
                // this.$parent.search();
                this.$emit("add");
              }
            });
          } else {
            editSubject(this.form).then(res => {
              if (res.code == 200) {
                this.$message.success("编辑成功");
                this.visible = false;
                // this.$parent.search();
                this.$emit("add");
              }
            });
          }
        }
      });
    }
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