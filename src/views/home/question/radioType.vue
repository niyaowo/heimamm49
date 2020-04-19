<template>
  <div class="radioType">
    <!-- 单选框 -->
    <div v-if="form.type==1">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-radio
          class="radio"
          v-model="form.single_select_answer"
          :label="item.label"
          @change="change"
        >{{item.label}}</el-radio>
        <el-input class="inp" v-model="item.text"></el-input>
        <div class="img">
          <upload v-model="item.image"></upload>
        </div>
      </div>
    </div>
    <!-- 多选框 -->
    <div v-else-if="form.type==2">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-checkbox
          class="checkbox"
          v-model="form.multiple_select_answer"
          :label="item.label"
        >{{item.label}}</el-checkbox>
        <el-input class="inp" v-model="item.text"></el-input>
        <div class="img">
          <upload v-model="item.image"></upload>
        </div>
      </div>
    </div>
    <!-- 文本框 -->
    <div v-else>
      <el-input type="textarea" v-model="form.short_answer" palceholder="请输入简答内容" rows="6"></el-input>
    </div>
  </div>
</template>

<script>
import upload from "./upload";
export default {
  props: ["form"],
  components: { upload },
  methods: {
    // 子调用父方法 选择填空 表单验证
    change() {
      this.$emit("change");
    }
  }
};
</script>

<style lang="less">
.radioType {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .inp {
      margin-right: 15px;
      .el-input__inner {
        border-color: #dcdfe6;
      }
    }
  }
}
</style>