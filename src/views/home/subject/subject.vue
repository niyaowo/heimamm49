<template>
  <div class="subject">
    <!-- 卡片数据 -->
    <el-card class="box-card">
      <!-- 行内表单 -->
      <el-form :inline="true" class="demo-form-inline" v-model="form" label-width="auto">
        <el-form-item label="学科编号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 下拉选项 -->
        <el-form-item label="状态">
          <el-select placeholder="请选择状态" v-model="form.tstatus">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮操作 -->
        <el-form-item class="search">
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">+添加学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table">
      <!-- 表格数据 -->
      <el-table :data="subjectList">
        <!-- 自定义表格 占位符 slot-scope="scope":声明私有变量 $当前的下标 row整行的数据 -->
        <el-table-column label="序号" width="60px">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="190px"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="190px"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="190px"></el-table-column>
        <el-table-column prop="username" label="创建者" width="190px"></el-table-column>
        <el-table-column prop="update_time" label="创建日期" width="190px"></el-table-column>
        <el-table-column label="状态" width="140px">
          <template slot-scope="scope">{{scope.row.status==1?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">禁用</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.cPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <subjectAdd ref="reg"></subjectAdd>
  </div>
</template>

<script>
import { getSubjectData } from "@/api/subject.js";
import subjectAdd from "./subjectAdd.vue";
export default {
  // 注册子组件
  components: {
    subjectAdd
  },
  data() {
    return {
      // 学科列表参数
      form: {
        username: "",
        name: "",
        rid: "",
        status: ""
      },
      // 表格数据
      subjectList: [],
      // 分页数据
      pagination: {
        // 当前页
        cPage: 1,
        // 显示的页数
        pageSize: 10,
        // 总页数
        total: 40
      }
    };
  },
  methods: {
    // 改变页码容量
    handleSizeChange(size) {
      this.pagination.pageSize = size;
    },
    // 改变当前页
    handleCurrentChange(page) {
      this.pagination.cPage = page;
    },
    // 点击显示添加学科
    add() {
      this.$refs.reg.visible = true;
    }
  },
  created() {
    getSubjectData().then(res => {
      console.log(res);
      this.subjectList = res.data.items;
      console.log(this.subjectList);
    });
  }
};
</script>

<style lang="less">
.subject {
  .search {
    margin-left: 20px;
  }

  .table {
    margin-top: 20px;
  }

  .page {
    height: 60px;
    margin-top: 30px;
    text-align: center;
    background: #fff;
  }
}
</style>