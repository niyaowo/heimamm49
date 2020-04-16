<template>
  <div class="addUser">
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <!-- 标题 -->
      <div class="title" slot="title">{{mode=="add"?"新增用户":"编辑用户"}}</div>
      <!-- 表单主要内容 -->
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="role_id">
          <el-select placeholder="请选择角色" v-model="form.role_id">
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :label="value"
              :value="+key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注:" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, editUser } from "@/api/user.js";
export default {
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        phone: [
          { required: true, message: "请输入手机号" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号");
              }
            },
            triger: "change"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱");
              }
            },
            triger: "change"
          }
        ],
        role_id: [{ required: true, message: "请输入角色" }]
      }
    };
  },
  watch: {
    dialogVisible(newval) {
      if (newval == false) {
        this.$refs.form.resetFields();
      }
    }
  },
  methods: {
    // 添加用户
    add() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addUser(this.form).then(() => {
              this.$parent.search();
              this.$message.success("添加成功");
              this.dialogVisible = false;
            });
          } else {
            editUser(this.form).then(() => {
              this.$parent.search();
              this.$message.success("编辑成功");
              this.dialogVisible = false;
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addUser {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    line-height: 53px;
    color: #fff;
    background: linear-gradient(45deg, #01c4fa, #1295fa);
  }
}
</style>