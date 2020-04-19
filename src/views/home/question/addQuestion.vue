<template>
  <div class="addQuestion">
    <el-dialog :visible.sync="dialogVisible" width="30%" :fullscreen="true" center>
      <!-- 标题 -->
      <div class="title" slot="title">{{mode=="add"?"新增题库":"编辑题库"}}</div>
      <!-- 表单主要内容 -->
      <el-form label-width="80px" class="form" :model="form" :rules="rules" ref="form">
        <el-form-item label="学科:" prop="subject">
          <el-select placeholder="请选择学科" v-model="form.subject">
            <el-option v-for="(v,key, index) in subject" :key="index" :value="v.id" :label="v.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="阶段:" prop="step">
          <el-select placeholder="请选择阶段" v-model="form.step">
            <el-option
              v-for="(value,key, index) in stepObj"
              :key="index"
              :label="value"
              :value="+key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业:" prop="enterprise">
          <el-select placeholder="请选择企业" v-model="form.enterprise">
            <el-option v-for="(v, index) in business" :key="index" :value="v.id" :label="v.name"></el-option>
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
            <el-radio v-for="(value,key, index) in typeObj" :key="index" :label="+key">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度:" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio
              v-for="(value,key, index) in difficultyObj"
              :key="index"
              :label="+key"
            >{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <hr />
        <br />
        <!-- 使用富文本 -->
        <el-form-item label="试题标题" class="txt" prop="title">
          <quillEditor
            v-model="form.title"
            @change="editChange('title')"
            :options="{placeholder:'请输入内容...'}"
          ></quillEditor>
        </el-form-item>
        <br />
        <!-- 选项题型 -->
        <el-form-item
          :label="typeObj[form.type]"
          :prop="{1:'single_select_answer',
          2:'multiple_select_answer',
          3:'short_answer'}[form.type]"
        >
          <radioType :form="form" @change="selectChange"></radioType>
        </el-form-item>
        <br />
        <hr />
        <br />
        <br />
        <!-- 上传视频 -->
        <el-form-item label="解析视频" prop="video">
          <upload v-model="form.video" controls type="video"></upload>
        </el-form-item>
        <hr />
        <br />
        <br />
        <!-- 答案解析 -->
        <el-form-item label="答案解析" class="txt" prop="answer_analyze">
          <quillEditor
            v-model="form.answer_analyze"
            @change="editChange('answer_analyze')"
            :options="{placeholder:'请输入内容...'}"
          ></quillEditor>
        </el-form-item>
        <br />
        <hr />
        <br />
        <br />
        <!-- 试题备注 -->
        <el-form-item label="试题备注" prop="remark">
          <el-input class="testRemark" v-model="form.remark"></el-input>
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
import { addQuestion, editQuestion } from "@/api/qusetion.js";
// 导入省市区 三级联动数据  下载：element-china-area-data  用法element都有
import { regionData } from "element-china-area-data";
import radioType from "./radioType.vue";
import upload from "./upload.vue";
// 导入vue 富文本编辑器组件  下载：npm i vue-quill-editor
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  // 注册富文本
  components: { quillEditor, radioType, upload },
  props: ["mode", "subject", "business", "typeObj", "stepObj", "difficultyObj"],
  data() {
    return {
      dialogVisible: false,
      form: {
        subject: "",
        step: "",
        enterprise: "",
        city: "",
        type: 1,
        difficulty: 1,
        title: "",
        single_select_answer: "", //单选
        multiple_select_answer: [], //多选
        short_answer: "", // 简答
        video: "", // 视频地址
        answer_analyze: "", // 答案解析
        remark: "", // 答案备注
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ] // 选项介绍
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
      } else {
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
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
          } else {
            let _query = JSON.parse(JSON.stringify(this.form));
            _query.city = _query.city.join(",");
            editQuestion(_query).then(() => {
              this.$parent.search();
              this.$message.success("编辑成功");
              this.dialogVisible = false;
            });
          }
        }
      });
    },
    // 富文本校验事件
    editChange(res) {
      this.$refs.form.validateField(res);
    },
    // 选择填空表单验证
    selectChange() {
      this.$refs.form.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" >
.addQuestion {
  .testRemark .el-input__inner {
    margin-top: 40px;
  }
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
      .el-form-item__content {
        margin-left: 0px !important;
        margin-top: 60px;
      }
    }
    .el-form-item__label {
      text-align: left;
    }
  }
}
</style>