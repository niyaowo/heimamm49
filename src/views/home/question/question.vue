<template>
  <div class="question">
    <!-- 头部 -->
    <el-card class="head">
      <el-form :inline="true" :model="form" ref="form" label-width="60px" class="demo-form-inline">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学科:" prop="subject">
              <el-select placeholder="请选择学科" v-model="form.subject">
                <el-option
                  v-for="(v, index) in this.subjectList"
                  :key="index"
                  :value="v.id"
                  :label="v.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业:" prop="enterprise">
              <el-select placeholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(v, index) in this.businessList"
                  :key="index"
                  :value="v.id"
                  :label="v.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型:" prop="type">
              <el-select placeholder="请选择题型" v-model="form.type">
                <el-option
                  v-for="(value,key, index) in typeObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label="难度:" prop="difficulty">
              <el-select placeholder="请选择难度" v-model="form.difficulty">
                <el-option
                  v-for="(value,key, index) in difficultyObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者:" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态:" prop="status">
              <el-select placeholder="请选择状态" v-model="form.status">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期:" prop="create_date">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="标题:" prop="title">
              <el-input class="inputTitle" v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="btn">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="reset">删除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br />
    <!-- 主体表格部分 -->
    <el-card>
      <el-table :data="questionData" style="width: 100%" :border="true">
        <el-table-column label="序号" width="160" align="center">
          <template slot-scope="scope">
            <!-- 当前页=(当前页-1)*页面条数+$index+1 -->
            {{ (pageData.cPage-1)*pageData.pageSize+scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="题目" width="160" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="学科阶段" width="160">
          <template slot-scope="scope">{{scope.row.subject_name +':'+stepObj[scope.row.step] }}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型" width="160">
          <template slot-scope="scope">{{ typeObj[scope.row.type] }}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业" width="160"></el-table-column>
        <el-table-column prop="username" label="创建者" width="160"></el-table-column>
        <el-table-column prop="status" label="状态" width="160">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?"启用":"禁用"}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量" width="160"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setStatus(scope.row.id)"
              :type="scope.row.status==0?'success':'info'"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <!-- 分页 -->
      <div id="page">
        <el-pagination
          :model="pageData"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.cPage"
          :page-sizes="pageData.pageSizeArr"
          :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.totalPage"
        ></el-pagination>
      </div>
    </el-card>
    <addQuestion
      ref="question"
      :mode="mode"
      :subject="subjectList"
      :business="businessList"
      :typeObj="typeObj"
      :stepObj="stepObj"
      :difficultyObj="difficultyObj"
    ></addQuestion>
  </div>
</template>

<script>
import {
  getQusetionData,
  setStatus,
  removeQuestionData
} from "@/api/qusetion.js";
import { getSubjectData } from "@/api/subject.js";
import { getBusinessData } from "@/api/business.js";
import addQuestion from "./addQuestion.vue";
export default {
  components: {
    addQuestion
  },
  data() {
    return {
      mode: "add",
      // 行内表单
      form: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: ""
      },
      // 题库列表
      questionData: [],
      // 学科列表
      subjectList: [],
      // 企业列表
      businessList: [],
      // 题型
      typeObj: { 1: "单选", 2: "多选", 3: "简答" },
      // 阶段
      stepObj: { 1: "初级", 2: "中级", 3: "高级" },
      // 难度
      difficultyObj: { 1: "学渣", 2: "学霸", 3: "大神" },
      // 分页器
      pageData: {
        cPage: 1,
        pageSize: 5,
        pageSizeArr: [5, 10, 15, 20, 100],
        totalPage: 10
      }
    };
  },
  methods: {
    // 获取题库信息列表
    getData() {
      let _params = {
        page: this.pageData.cPage,
        limit: this.pageData.pageSize,
        ...this.form
      };
      getQusetionData(_params).then(res => {
        this.questionData = res.data.items;
        // 城市信息转数组
        this.questionData.forEach(item => {
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });
        // 分页总数
        this.pageData.totalPage = res.data.pagination.total;
      });
    },
    // 搜索题库
    search() {
      // 刷新当前页 并 设置 回到第一页
      this.pageData.cPage = 1;
      this.getData();
    },
    // 分页器方法
    handleSizeChange(size) {
      this.pageData.pageSize = size;
      this.search();
    },
    handleCurrentChange(page) {
      // 刷新当前页内容
      this.pageData.cPage = page;
      this.getData();
    },
    // 重置表单
    reset() {
      // 使用resetFields() 方法 需要配合 prop属性使用
      this.$refs.form.resetFields();
      this.search();
    },
    // 设置状态
    setStatus(id) {
      setStatus({ id }).then(() => {
        this.search();
        this.$message.success("设置成功");
      });
    },
    // 删除题库
    remove(id) {
      this.$confirm("此操作将永久删除题库信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeQuestionData({ id }).then(() => {
          this.search();
          this.$message.success("删除成功");
        });
      });
    },
    // 新增题库
    add() {
      this.mode = "add";
      this.$refs.question.dialogVisible = true;
      // 清空表单
      this.$refs.question.form = {
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
      };
    },
    // 编辑题库
    edit(row) {
      this.$refs.question.dialogVisible = true;
      this.mode = "edit";
      this.$refs.question.form = JSON.parse(JSON.stringify(row));
    }
  },
  created() {
    this.getData();
    // 获取学科列表
    getSubjectData().then(res => {
      this.subjectList = res.data.items;
    });
    // 获取企业列表
    getBusinessData().then(res => {
      this.businessList = res.data.items;
    });
  }
};
</script>

<style lang="less">
.question {
  .head {
    .el-form-item__label {
      margin-right: 20px;
    }
    .el-input__inner {
      width: 217px;
    }
  }

  .inputTitle .el-input__inner {
    width: 552px;
  }
  .btn {
    padding-left: 20px;
  }
  // 分页器样式
  #page {
    text-align: center;
    // .el-input__inner {
    //   width: 100%;
    // }
  }
  .red {
    color: red;
  }
}
</style>