<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li class="item">
          <div class="itemContent color1">{{data.increment_users}}</div>
          <p>今日新增用户</p>
        </li>
        <li class="item">
          <div class="itemContent color1">{{data.total_users}}</div>
          <p>总用户量</p>
        </li>
        <li class="item">
          <div class="itemContent color2">{{data.increment_questions}}</div>
          <p>新增试题</p>
        </li>
        <li class="item">
          <div class="itemContent color2">{{data.total_questions}}</div>
          <p>总试题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">{{data.total_done_questions}}</div>
          <p>总刷题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">{{data.personal_questions}}</div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card class="echartsData">
      <div class="echarts" ref="chart"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { getDataTitle, getStatistics } from "@/api/chart";
export default {
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    var myChart = echarts.init(this.$refs.chart);
    getStatistics().then(res => {
      let _data = res.data.map(item => {
        return item.name;
      });
      let option = {
        title: {
          text: "整体数据",
          left: "120",
          top: "20",
          textStyle: {
            color: "#666",
            fontSize: "22"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 120,
          data: _data
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            data: res.data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
  created() {
    getDataTitle().then(res => {
      this.data = res.data;
    });
  }
};
</script>

<style lang="less">
.chart {
  .list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    .color1 {
      border: 2px solid #0086fa;
      color: #0086fa;
    }
    .color2 {
      border: 2px solid #f76137;
      color: #f76137;
    }
    .color3 {
      border: 2px solid #55cd78;
      color: #55cd78;
    }
    .itemContent {
      width: 99px;
      height: 99px;
      margin-bottom: 12px;
      border-radius: 50%;
      line-height: 99px;
      font-size: 35px;
    }
  }
  .echartsData {
    margin-top: 15px;
  }
  .echarts {
    height: 400px;
  }
}
</style>