/**
 * 图表指令
 */

export function EchartsDirective () {

  let directive = {
    replace: true,
    scope: {data: '='},
    template: '<div style="width:800px; height:400px;"></div>',
    link: (scope, element, attrs) => {
      let width = element.parent().width();
      let height = element.parent().height();
      element.width(width).height(height);

      // 基于准备好的dom，初始化echarts实例
      var myChart = window.echarts.init(element[0]);

      scope.$watch('data', (data) => {
        if (!data) { return; }

        let option = parseChartData(data);
        myChart.setOption(option, true);
      });

      function parseChartData(data) {

        return {
          title: {text: data.title || '标题', left: '20%'},
          tooltip: {trigger: 'axis'},
          legend: {top: '20', itemGap: 4, left: 'left',
            itemWidth: 20, orient: 'vertical', data: data.legend
          },
          grid: {left: '22%', right: '2%', bottom: '5%'}, // containLabel: true
          xAxis : [{data : data.dateNodes}],
          yAxis : [{type : 'value', min: 0.01}],
          series : data.series
        };
      }


        //       let test = {
        //   legend: ['a', 'b', 'c'],
        //   series: [{
        //     name: 'a',
        //     type: 'line',
        //     data:[100, 200, 1]
        //   }, {
        //     name: 'b',
        //     type: 'line',
        //     data:[200, 100, 1]
        //   }, {
        //     name: 'c',
        //     type: 'line',
        //     data:[99, 100, 102]
        //   }],
        //   dateNodes: ['A1', 'B2', 'C3']
        // };



      // let option = {
      //     title: {
      //         text: '堆叠区域图'
      //     },
      //     tooltip : {
      //         trigger: 'axis'
      //     },
      //     legend: {
      //         data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      //     },
      //     toolbox: {
      //         feature: {
      //             saveAsImage: {}
      //         }
      //     },
      //     grid: {
      //         left: '3%',
      //         right: '4%',
      //         bottom: '3%',
      //         containLabel: true
      //     },
      //     xAxis : [
      //         {
      //             type : 'category',
      //             boundaryGap : false,
      //             data : ['2016年1月','2016年2月']
      //         }
      //     ],
      //     yAxis : [
      //         {
      //             type : 'value'
      //         }
      //     ],
      //     series : [
      //         {
      //             name:'邮件营销',
      //             type:'line',
      //             stack: '总量',
      //             areaStyle: {normal: {}},
      //             data:[120, 132, 101, 134, 90, 230, 210]
      //         },
      //         {
      //             name:'联盟广告',
      //             type:'line',
      //             stack: '总量',
      //             areaStyle: {normal: {}},
      //             data:[220, 182, 191, 234, 290, 330, 310]
      //         },
      //         {
      //             name:'视频广告',
      //             type:'line',
      //             stack: '总量',
      //             areaStyle: {normal: {}},
      //             data:[150, 232, 201, 154, 190, 330, 410]
      //         },
      //         {
      //             name:'直接访问',
      //             type:'line',
      //             stack: '总量',
      //             areaStyle: {normal: {}},
      //             data:[320, 332, 301, 334, 390, 330, 320]
      //         },
      //         {
      //             name:'搜索引擎',
      //             type:'line',
      //             stack: '总量',
      //             label: {
      //                 normal: {
      //                     show: true,
      //                     position: 'top'
      //                 }
      //             },
      //             areaStyle: {normal: {}},
      //             data:[820, 932, 901, 934, 1290, 1330, 1320]
      //         }
      //     ]
      // };


      // 指定图表的配置项和数据
      // var option = {
      //     title: {
      //         text: 'XXX CCC'
      //     },
      //     // tooltip: {},
      //     // legend: {
      //     //     data:['销量']
      //     // },
      //     // xAxis: {
      //     //     data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      //     // },
      //     // yAxis: {},
      //     itemStyle: {
      //         normal: {
      //             // 阴影的大小
      //             shadowBlur: 200,
      //             // 阴影水平方向上的偏移
      //             shadowOffsetX: 0,
      //             // 阴影垂直方向上的偏移
      //             shadowOffsetY: 0,
      //             // 阴影颜色
      //             shadowColor: 'rgba(0, 0, 0, 0.5)'
      //         }
      //     },
      //     backgroundColor: '#2c343c',
      //     textStyle: {
      //             color: 'rgba(255, 255, 255, 0.3)'
      //         },
      //     label: {
      //         normal: {
      //             textStyle: {
      //                 color: 'rgba(255, 255, 255, 0.3)'
      //             }
      //         }
      //     },
      //     series : [
      //            {
      //                name: '访问来源',
      //                type: 'pie',
      //                radius: '55%',
      //                roseType: 'angle',
      //                data:[
      //                    {value:400, name:'搜索引擎'},
      //                    {value:335, name:'直接访问'},
      //                    {value:310, name:'邮件营销'},
      //                    {value:274, name:'联盟广告'},
      //                    {value:235, name:'视频广告'}
      //                ]
      //            }
      //        ]
      // };

      


      // // 使用刚指定的配置项和数据显示图表。
      // myChart.setOption(option);
      // 
      // 
      //         let option = {
        //   title: {text: 'x'},
        //   tooltip: {trigger: 'axis'},
        //   legend: {data: ['a', 'b', 'c']},
        //   xAxis: [{data: ['A1', 'B2', 'C3']}],
        //   yAxis: [{type: 'value'}],
        //   series: [{
        //     name: 'a',
        //     type: 'line',
        //     data:[100, 200, 1]
        //   }, {
        //     name: 'b',
        //     type: 'line',
        //     data:[200, 100, 1]
        //   }, {
        //     name: 'c',
        //     type: 'line',
        //     data:[99, 100, 102]
        //   }]
        // };
    }
  };

  return directive;
}



