<template>
  <div class="user">
    <!-- 头部 -->
    <el-card class="head">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <el-form-item label="用户名称:" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱:" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="role_id">
          <el-select placeholder="请选择状态" v-model="form.role_id">
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :label="value"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">删除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <!-- 主体表格部分 -->
    <el-card>
      <el-table :data="userData" style="width: 100%">
        <el-table-column label="序号" width="100">
          <template slot-scope="scope">
            <!-- 当前页=(当前页-1)*页面条数+$index+1 -->
            {{ (pageData.cPage-1)*pageData.pageSize+scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?"启用":"禁用"}}</div>
          </template>
        </el-table-column>
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
    <addList ref="user" :mode="mode"></addList>
  </div>
</template>

<script>
import { getUserData, setStatus, removeUser } from "@/api/user.js";
import addList from "./addUser.vue";
export default {
  components: {
    addList
  },
  data() {
    return {
      mode: "add",
      // 行内表单
      form: {
        username: "",
        email: "",
        role_id: ""
      },
      // 表格数据
      userData: [],
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
    // 获取用户信息列表
    getData() {
      let _params = {
        page: this.pageData.cPage,
        limit: this.pageData.pageSize,
        ...this.form
      };
      getUserData(_params).then(res => {
        this.userData = res.data.items;
        this.pageData.totalPage = res.data.pagination.total;
      });
    },
    // 搜索用户
    search() {
      // 刷新当前页 并 设置 页面容量为 1
      this.pageData.cPage = 1;
      this.getData();
    },
    // 分页器方法
    handleSizeChange(size) {
      this.pageData.pageSize = size;
      this.search();
    },
    handleCurrentChange(page) {
      this.pageData.cPage = page;
      this.getData();
    },
    // 重置表单
    reset() {
      // 使用resetFields() 方法 需要配合 prop属性使用
      this.$refs.form.resetFields();
      // this.form = {
      //   username: "",
      //   email: "",
      //   role_id: ""
      // };
      this.search();
      console.log("11");
    },
    // 设置状态
    setStatus(id) {
      setStatus({ id }).then(() => {
        this.search();
        this.$message.success("设置成功");
      });
    },
    // 删除用户
    remove(id) {
      this.$confirm("此操作将永久删除用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeUser({ id }).then(res => {
          console.log(res);
          this.search();
          this.$message.success("删除成功");
        });
      });
    },
    // 新增用户
    add() {
      this.mode = "add";
      this.$refs.user.dialogVisible = true;
    },
    // 编辑用户
    edit(row) {
      this.$refs.user.dialogVisible = true;
      this.mode = "edit";
      this.$refs.user.form = JSON.parse(JSON.stringify(row));
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.user {
  // 分页器样式
  #page {
    text-align: center;
  }
  .red {
    color: red;
  }
}
</style>