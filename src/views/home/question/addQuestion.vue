<template>
  <div class="addQuestion">
    <el-dialog :visible.sync="dialogVisible" width="30%" :fullscreen="true" center>
      <!-- 标题 -->
      <div class="title" slot="title">{{mode=="add"?"新增题库":"编辑题库"}}</div>
      <!-- 表单主要内容 -->
      <el-form label-width="80px" class="form" :model="form" :rules="rules" ref="form">
        <el-form-item label="学科:" prop="subject">
          <el-select placeholder="请选择学科" v-model="form.subject">
            <el-option v-for="(v, index) in subject" :key="index" :value="v.id" :label="v.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="阶段:" prop="step">
          <el-select placeholder="请选择阶段" v-model="form.step">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="1"></el-option>
            <el-option label="高级" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业:" prop="enterprise">
          <el-select placeholder="请选择企业">
            <el-option
              v-for="(v, index) in business"
              :key="index"
              :value="v.id"
              :label="v.name"
              v-model="form.enterprise"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市:" prop="city">
          <el-cascader
            v-model="form.city"
            size="large"
            :props="{value:'label'}"
            :options="options"
            @change="handleChange"
            clearabel
            filterable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="题型:" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度:" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <hr />
        <br />
        <br />
        <br />
        <!-- 使用富文本 -->
        <el-form-item label="试题标题" class="txt" prop="title">
          <quillEditor v-model="form.title"></quillEditor>
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
import { addQuestion } from "@/api/qusetion.js";
// 导入省市区 三级联动数据  下载：element-china-area-data  用法element都有
import { regionData } from "element-china-area-data";
// 导入vue 富文本编辑器组件  下载：npm i vue-quill-editor
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  // 注册富文本
  components: { quillEditor },
  props: ["mode", "subject", "business"],
  data() {
    return {
      dialogVisible: false,
      form: {
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: "",
        difficulty: "",
        title: "",
        single_select_answer: "", //单选
        multiple_select_answer: [], //多选
        short_answer: "", // 简答
        video: "", // 视频地址
        answer_analyze: "", // 答案解析
        remark: "", // 答案备注
        select_options: [] // 选项介绍
      },
      rules: {
        subject: [{ required: true, message: "请输入科目" }],
        step: [{ required: true, message: "请输入阶段" }],
        enterprise: [{ required: true, message: "请输入企业" }],
        city: [{ required: true, message: "请输入城市" }],
        type: [{ required: true, message: "请选择类型" }],
        difficulty: [{ required: true, message: "请选择难度" }],
        title: [{ required: true, message: "请输入标题" }],
        single_select_answer: [{ required: true, message: "请选择答案" }],
        multiple_select_answer: [{ required: true, message: "请选择答案" }],
        short_answer: [{ required: true, message: "请输入简答" }],
        answer_analyze: [{ required: true, message: "请输入答案解析" }],
        remark: [{ required: true, message: "请输入备注" }]
        // select_options:[
        //   {required:true,message:"请输入科目"}
        // ],
      },
      // 省市区三级联动数据
      options: regionData
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
    // 添加题库
    add() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addQuestion(this.form).then(() => {
              this.$parent.search();
              this.$message.success("添加成功");
              this.dialogVisible = false;
            });
          }
          // else {
          //   editUser(this.form).then(() => {
          //     this.$parent.search();
          //     this.$message.success("编辑成功");
          //     this.dialogVisible = false;
          //   });
          // }
        }
      });
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" >
.addQuestion {
  .el-input--suffix .el-input__inner {
    width: 364px;
  }
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
  .form {
    width: 835px;
    margin: 0 auto;

    .txt {
      .addQuestion .form .txt .el-form-item__label {
        display: block;
      }
    }
  }
}
</style>