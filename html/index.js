void (function(id) {
  var mapChart = echarts.init(document.getElementById(id));

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
          text: "基于「常居地」的用户分布",
          // subtext: "data from douban",
          // sublink: "http://www.douban.com",
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
})("location:map");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/time:number_year.json", function(data) {
    var xAxis = [];
    var seriesData = [];

    data.forEach(function(item) {
      xAxis.push(item.create_year);
      seriesData.push(item.number);
    });

    var option = {
      title: {
        text: "基于「加入年份」的用户分布"
      },
      tooltip: {},
      legend: {
        data: ["年份"]
      },
      xAxis: {
        data: xAxis
      },
      yAxis: {},
      series: [
        {
          name: "年份",
          type: "bar",
          data: seriesData
        }
      ]
    };

    myChart.setOption(option);
  });
})("time:year");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/time:number_month.json", function(data) {
    var xAxis = [];
    var seriesData = [];

    data.forEach(function(item) {
      xAxis.push(item.create_month);
      seriesData.push(item.number);
    });

    var option = {
      title: {
        text: "基于「加入月份」的用户分布"
      },
      tooltip: {},
      legend: {
        data: ["月份"]
      },
      xAxis: {
        data: xAxis
      },
      yAxis: {},
      series: [
        {
          name: "月份",
          type: "bar",
          data: seriesData
        }
      ]
    };

    myChart.setOption(option);
  });
})("time:month");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/time:number.json", function(json) {
    function getVirtulData(year) {
      year = year || "2017";
      var date = +echarts.number.parseDate(year + "-01-01");
      var end = +echarts.number.parseDate(+year + 1 + "-01-01");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        var _date = echarts.format.formatTime("yyyy-MM-dd", time);
        data.push([
          _date,
          // Math.floor(Math.random() * 1000)
          json[_date]
        ]);
      }
      return data;
    }

    option = {
      tooltip: {
        position: "top"
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: "horizontal",
        left: "center",
        top: "top"
      },

      calendar: [
        {
          range: "2018",
          cellSize: ["auto", 10]
        },
        {
          top: 150,
          range: "2017",
          cellSize: ["auto", 10]
        },
        {
          top: 240,
          range: "2016",
          cellSize: ["auto", 10],
          right: 5
        },
        {
          top: 330,
          range: "2015",
          cellSize: ["auto", 10],
          right: 5
        },
        {
          top: 420,
          range: "2014",
          cellSize: ["auto", 10],
          right: 5
        },
        {
          top: 510,
          range: "2013",
          cellSize: ["auto", 10],
          right: 5
        },
        {
          top: 600,
          range: "2012",
          cellSize: ["auto", 10],
          right: 5
        }
      ],

      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          data: getVirtulData(2018)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 1,
          data: getVirtulData(2017)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 2,
          data: getVirtulData(2016)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 3,
          data: getVirtulData(2015)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 4,
          data: getVirtulData(2014)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 5,
          data: getVirtulData(2013)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 6,
          data: getVirtulData(2012)
        }
      ]
    };

    myChart.setOption(option);
  });
})("time:all_1");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/time:number.json", function(json) {
    function getVirtulData(year) {
      year = year || "2017";
      var date = +echarts.number.parseDate(year + "-01-01");
      var end = +echarts.number.parseDate(+year + 1 + "-01-01");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        var _date = echarts.format.formatTime("yyyy-MM-dd", time);
        data.push([_date, json[_date]]);
      }
      return data;
    }

    option = {
      tooltip: {
        position: "top"
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: "horizontal",
        left: "center",
        top: "top"
      },

      calendar: [
        {
          range: "2011",
          cellSize: ["auto", 10]
        },
        {
          top: 150,
          range: "2010",
          cellSize: ["auto", 10]
        },
        {
          top: 240,
          range: "2009",
          cellSize: ["auto", 10],
          right: 5
        },
        {
          top: 330,
          range: "2008",
          cellSize: ["auto", 10],
          right: 5
        },
        {
          top: 420,
          range: "2007",
          cellSize: ["auto", 10],
          right: 5
        },
        {
          top: 510,
          range: "2006",
          cellSize: ["auto", 10],
          right: 5
        },
        {
          top: 600,
          range: "2005",
          cellSize: ["auto", 10],
          right: 5
        }
      ],

      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          data: getVirtulData(2011)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 1,
          data: getVirtulData(2010)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 2,
          data: getVirtulData(2009)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 3,
          data: getVirtulData(2008)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 4,
          data: getVirtulData(2007)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 5,
          data: getVirtulData(2006)
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 6,
          data: getVirtulData(2005)
        }
      ]
    };

    myChart.setOption(option);
  });
})("time:all_2");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));
  $.get("./data/movie.json", function(json) {
    option = {
      title: {
        text: "电影「想看、在看、看过」"
        // subtext: "纯属虚构"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["想看", "在看", "看过"]
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: json.category
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "在看",
          type: "bar",
          data: json.do
          //   markPoint: {
          //     data: [
          //       { type: "max", name: "最大值" },
          //       { type: "min", name: "最小值" }
          //     ]
          //   },
          //   markLine: {
          //     data: [{ type: "average", name: "平均值" }]
          //   }
        },
        {
          name: "看过",
          type: "bar",
          data: json.collect
          //   markPoint: {
          //     data: [
          //       { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
          //       { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
          //     ]
          //   },
          //   markLine: {
          //     data: [{ type: "average", name: "平均值" }]
          //   }
        },
        {
          name: "想看",
          type: "bar",
          data: json.wish
        }
      ]
    };

    myChart.setOption(option);
  });
})("movie");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));
  $.get("./data/contact.json", function(json) {
    // console.log(json);

    var builderJson = {
      all: 10887,
      charts: {
        map: 3237,
        lines: 2164,
        bar: 7561,
        line: 7778,
        pie: 7355,
        scatter: 2405,
        candlestick: 1842,
        radar: 2090,
        heatmap: 1762,
        treemap: 1593,
        graph: 2060,
        boxplot: 1537,
        parallel: 1908,
        gauge: 2107,
        funnel: 1692,
        sankey: 1568
      },
      components: {
        geo: 2788,
        title: 9575,
        legend: 9400,
        tooltip: 9466,
        grid: 9266,
        markPoint: 3419,
        markLine: 2984,
        timeline: 2739,
        dataZoom: 2744,
        visualMap: 2466,
        toolbox: 3034,
        polar: 1945
      },
      ie: 9743
    };

    var downloadJson = {
      "echarts.min.js": 17365,
      "echarts.simple.min.js": 4079,
      "echarts.common.min.js": 6929,
      "echarts.js": 14890
    };

    var themeJson = {
      "dark.js": 1594,
      "infographic.js": 925,
      "shine.js": 1608,
      "roma.js": 721,
      "macarons.js": 2179,
      "vintage.js": 1982
    };

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = 100;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.08;
    ctx.font = "20px Microsoft Yahei";
    ctx.translate(50, 50);
    ctx.rotate(-Math.PI / 4);

    option = {
      backgroundColor: {
        type: "pattern",
        image: canvas,
        repeat: "repeat"
      },
      tooltip: {},
      title: [
        {
          text: "基于「关注数、被关注数」的用户分布",
          // subtext: "关注数",
          x: "25%",
          textAlign: "center"
        }
        // {
        //   text: "各版本下载",
        //   subtext:
        //     "总计 " +
        //     Object.keys(downloadJson).reduce(function(all, key) {
        //       return all + downloadJson[key];
        //     }, 0),
        //   x: "75%",
        //   textAlign: "center"
        // },
        // {
        //   text: "主题下载",
        //   subtext:
        //     "总计 " +
        //     Object.keys(themeJson).reduce(function(all, key) {
        //       return all + themeJson[key];
        //     }, 0),
        //   x: "75%",
        //   y: "50%",
        //   textAlign: "center"
        // }
      ],
      grid: [
        {
          top: 50,
          width: "50%",
          bottom: "45%",
          height: "40%",
          left: 10,
          containLabel: true
        },
        {
          top: "55%",
          width: "50%",
          height: "45%",
          bottom: 0,
          left: 10,
          containLabel: true
        }
      ],
      xAxis: [
        {
          type: "value",
          max: 3200,
          splitLine: {
            show: false
          }
        },
        {
          type: "value",
          max: 3500,
          gridIndex: 1,
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: "category",
          data: json.contact.key,
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        },
        {
          gridIndex: 1,
          type: "category",
          data: json.contactRev.key,
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          type: "bar",
          stack: "chart",
          z: 3,
          label: {
            normal: {
              position: "right",
              show: true
            }
          },
          data: json.contact.value
        },
        {
          type: "bar",
          stack: "component",
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: 3,
          label: {
            normal: {
              position: "right",
              show: true
            }
          },
          data: json.contactRev.value
        },
        {
          type: "pie",
          radius: [0, "30%"],
          center: ["80%", "30%"],
          roseType: true,
          data: json.contact.key
            .map(function(item, index) {
              return {
                name: item,
                value: json.contact.value[index]
              };
            })
            .sort(function(a, b) {
              return b.value - a.value;
            })
        },
        {
          type: "pie",
          radius: [0, "30%"],
          center: ["80%", "80%"],
          roseType: true,
          data: json.contactRev.key
            .map(function(item, index) {
              return {
                name: item,
                value: json.contact.value[index]
              };
            })
            .sort(function(a, b) {
              return b.value - a.value;
            })
        }
      ]
    };
    myChart.setOption(option);
  });
})("contact:all");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/username:wordsList.json", function(json) {
    json = json.filter(function(item) {
      return item.value > 25 && item.name.search(/[a-zA-Z]/g) === -1
    });
    var legendData = [];
    var selected = {};
    var seriesData = null;
    json.forEach(function(item,index) {
      legendData.push(item.name);
      selected[item.name] = index > 10 ? false : true;
    });
    seriesData = json;

    option = {
      title: {
        text: "用户昵称「最常用字」",
        // subtext: "纯属虚构",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: legendData,

        selected: selected
      },
      series: [
        {
          name: "姓名",
          type: "pie",
          radius: "55%",
          center: ["40%", "50%"],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  });
})("username");
