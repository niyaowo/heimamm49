<template>
  <div class="question">
    <!-- 头部 -->
    <el-card class="head">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
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
        <el-form-item label="阶段:" prop="step">
          <el-select placeholder="请选择阶段" v-model="form.step">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="题型:" prop="type">
          <el-select placeholder="请选择题型" v-model="form.type">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度:" prop="difficulty">
          <el-select placeholder="请选择难度" v-model="form.difficulty">
            <el-option label="学渣" :value="1"></el-option>
            <el-option label="学霸" :value="2"></el-option>
            <el-option label="大神" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者:" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:" prop="create_date">
          <el-input v-model="form.create_date"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="标题:" prop="title">
          <el-input class="inputTitle" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">删除</el-button>
          <el-button type="primary" @click="add">+新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <!-- 主体表格部分 -->
    <el-card>
      <el-table :data="questionData" style="width: 100%" :border="true">
        <el-table-column label="序号" width="160">
          <template slot-scope="scope">
            <!-- 当前页=(当前页-1)*页面条数+$index+1 -->
            {{ (pageData.cPage-1)*pageData.pageSize+scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="题目" width="160">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="学科阶段" width="160">
          <template
            slot-scope="scope"
          >{{scope.row.subject_name+':'+{1:"初级",2:"中级",3:"高级"}[scope.row.step] }}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型" width="160">
          <template slot-scope="scope">{{ {1:"单选",2:"多选",3:"简答"}[scope.row.type] }}</template>
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
    <addQuestion ref="question" :mode="mode" :subject="subjectList" :business="businessList"></addQuestion>
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
    getSubjectData({}).then(res => {
      this.subjectList = res.data.items;
    });
    // 获取企业列表
    getBusinessData({}).then(res => {
      this.businessList = res.data.items;
    });
  }
};
</script>

<style lang="less">
.question {
  .head {
    .el-form-item__label {
      margin-right: 31px;
      margin-left: 21px;
    }
    .el-input__inner {
      width: 217px;
    }
  }

  .inputTitle .el-input__inner {
    width: 388px;
  }
  // 分页器样式
  #page {
    text-align: center;
    .el-input__inner {
      width: 100%;
    }
  }
  .red {
    color: red;
  }
}
</style>