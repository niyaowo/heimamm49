<template>
  <div class="pagination">
    <!-- 头部 -->
    <el-card>
      <el-form :inline="true" :model="form" ref="form" class="form">
        <el-form-item label="企业编号:" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者:" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset()">清除</el-button>
          <el-button type="primary" @click="add">+ 新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <!-- 表格 -->
    <el-card>
      <el-table style="width: 100%" :data="businessList">
        <el-table-column label="序号" width="120">
          <template slot-scope="scope">{{ (pageData.cPage-1)*pageData.pageSize+scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态" width="130">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?"启用":"禁用"}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setStatus(scope.row.id)"
              :type="scope.row.status==1?'info':'success'"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button type="danger" @click="remove(scope.row.id)" v-if="$store.state.role!='老师'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <!-- 分页 -->
      <div class="pagination">
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
    <!-- 新增/编辑页面 -->
    <addBusiness ref="addB" :mode="mode"></addBusiness>
  </div>
</template>

<script>
import { getBusinessData, setStatus, removeBusiness } from "@/api/business.js";
import addBusiness from "./addBusiness.vue";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      mode: "add",
      // 头部行内表单数据
      form: {
        name: "",
        eid: "",
        username: "",
        status: ""
      },
      // 企业列表
      businessList: [],
      // 分页数据
      pageData: {
        cPage: 1,
        pageSize: 1,
        totalPage: 10,
        pageSizeArr: [1, 2, 3, 4, 5]
      }
    };
  },
  methods: {
    // 获取企业数据列表
    getData() {
      let _params = {
        page: this.pageData.cPage,
        limit: this.pageData.pageSize,
        ...this.form
      };
      getBusinessData(_params).then(res => {
        this.businessList = res.data.items;
        this.pageData.totalPage = res.data.pagination.total;
      });
    },
    // 搜索按钮事件
    search() {
      this.pageData.cPage = 1;
      this.getData();
    },
    // 改变页面容量的回调函数
    handleSizeChange(size) {
      this.pageData.pageSize = size;
      this.search();
    },
    // 改变当前页
    handleCurrentChange(page) {
      this.pageData.cPage = page;
      this.getData();
    },
    // 设置状态码
    setStatus(id) {
      setStatus({ id }).then(() => {
        this.search();
        this.$message.success("设置成功");
      });
    },
    // 清空行内表单
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 移除企业
    remove(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeBusiness({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    // 新增企业
    add() {
      this.mode = "add";
      this.$refs.addB.form = {
        name: "",
        short_name: "",
        eid: "",
        intro: "",
        remark: ""
      };
      this.$refs.addB.dialogVisible = true;
    },
    // 编辑企业
    edit(row) {
      // 传值给子组件
      this.mode = "edit";
      this.$refs.addB.form = JSON.parse(JSON.stringify(row));
      this.$refs.addB.dialogVisible = true;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.pagination {
  .pagination {
    text-align: center;
  }
  .red {
    color: red;
  }
}
</style>