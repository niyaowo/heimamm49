<template>
  <div class="subject">
    <!-- 卡片数据 -->
    <el-card class="box-card">
      <!-- 行内表单 -->
      <el-form :inline="true" class="demo-form-inline" ref="form" :model="form" label-width="auto">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 下拉选项 -->
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮操作 -->
        <el-form-item class="search">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearForm">清除</el-button>
          <el-button type="primary" @click="add">+添加学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table">
      <!-- 表格数据 -->
      <el-table :data="subjectList">
        <!-- 自定义表格 占位符 slot-scope="scope":声明私有变量 $当前的下标 row整行的数据 -->
        <el-table-column label="序号" width="60px">
          <template slot-scope="scope">{{(pagination.cPage-1)*pagination.pageSize+scope.$index+1}}</template>
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
            <el-button size="mini" @click="editData(scope.row)">编辑</el-button>
            <el-button size="mini" @click="setStatus(scope.row.id)">禁用</el-button>
            <el-button size="mini" type="danger" @click="removeData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.cPage"
          :page-sizes="[3, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>

    <subjectAdd ref="reg" @add="search" :mode="mode"></subjectAdd>
  </div>
</template>

<script>
import { getSubjectData, status, removeSubjectData } from "@/api/subject.js";
import subjectAdd from "./subjectAdd.vue";
export default {
  // 注册子组件
  components: {
    subjectAdd
  },
  data() {
    return {
      // 新增/编辑
      mode: "add",
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
        // 显示的页面容量
        pageSize: 3,
        // 总页数
        total: undefined
      }
    };
  },
  methods: {
    // 获取数据
    getData() {
      let _params = {
        page: this.pagination.cPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getSubjectData(_params).then(res => {
        this.subjectList = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 改变页码容量
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.cPage = 1;
      this.getData();
    },
    // 改变当前页
    handleCurrentChange(page) {
      this.pagination.cPage = page;
      this.getData();
    },
    // 学科搜索
    search() {
      this.pagination.cPage = 1;
      this.getData();
    },
    // 清除数据
    clearForm() {
      this.$refs.form.resetFields();
      this.search();
      // (this.form = {
      //   username: "",
      //   name: "",
      //   rid: "",
      //   status: ""
      // }),
    },
    // 设置状态码
    setStatus(id) {
      status({ id: id }).then(() => {
        this.search();
        this.$message.success("设置成功");
      });
    },
    // 删除数据
    removeData(id) {
      this.$confirm("此操作将永久删除改数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeSubjectData({ id })
          .then(res => {
            if (res.code == 200) {
              this.getData();
              this.$message.success("删除成功");
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },
    // 点击显示添加学科
    add() {
      this.mode = "add";
      this.$refs.reg.visible = true;
    },
    // 编辑学科
    editData(row) {
      // 修改mode
      this.mode = "edit";
      // 访问到编辑页表单数据  JSON.stringify将数据转换成字符串  JSON.parse将数据转换成对象
      this.$refs.reg.form = JSON.parse(JSON.stringify(row));
      this.$refs.reg.visible = true;
    }
  },
  created() {
    // 页面刷新获取数据
    this.getData();
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