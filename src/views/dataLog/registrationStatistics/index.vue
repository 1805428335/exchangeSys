<template>
  <div ref="chart" style="width:100vw;height:calc(100% - 80px);"></div>

</template>

<script>
export default {
  name: 'registrationStatistics',
  data() {
    return {

    };
  },
  mounted() {
    const chart = this.$refs.chart;
    const echarts = require('echarts');
    console.log(echarts);

// 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(chart);
// 绘制图表
    myChart.setOption({
      title: {
        text: '注册用户统计'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
};
</script>

<style scoped>

</style>

