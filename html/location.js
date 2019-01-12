// main
void (function() {
  var myChart = echarts.init(document.getElementById("main"));

  var option = {
    title: {
      text: "ECharts 入门示例"
    },
    tooltip: {},
    legend: {
      data: ["销量"]
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };

  myChart.setOption(option);
})();

// location:map
void (function() {
  var mapChart = echarts.init(document.getElementById("location:map"));

  $.get("./data/location:map_geocoord.json", function(data) {
    var geoCoordMap = data;

    $.get("./data/location:map_data.json", function(data) {
      var seriesData = data;

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      option = {
        // backgroundColor: "#404a59",
        title: {
          text: "豆瓣用户分布",
          subtext: "data from douban",
          sublink: "http://www.douban.com",
          x: "center",
          textStyle: {
            color: "#333"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name + " : " + params.value[2];
          }
        },
        legend: {
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: ["用户数量"],
          textStyle: {
            color: "#333"
          }
        },
        visualMap: {
          min: 0,
          max: 500,
          calculable: false,
          inRange: {
            color: ["#50a3ba", "#eac736", "#d94e5d"]
          },
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#555",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: [
          {
            name: "用户数量",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(seriesData),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1
              }
            }
          }
        ]
      };

      mapChart.setOption(option);
    });
  });
})();
