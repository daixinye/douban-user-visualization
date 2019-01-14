var TOTAL = 15174;
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
          // text: "基于「常居地」的用户分布",
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
          calculable: true,
          inRange: {
            color: ["#50a3ba", "#eac736", "#d94e5d"]
          },
          textStyle: {
            color: "#333"
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

  $.get("./data/location:country.json", function(json) {
    data = json;

    option = {
      series: {
        type: "sunburst",
        data: data,
        radius: [0, "90%"],
        label: {
          rotate: "radial"
        }
      }
    };
    myChart.setOption(option);
  });
})("location:country");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/location:map_data.json", function(data) {
    data = data
      .sort(function(a, b) {
        return b.value - a.value;
      })
      .filter(function(a) {
        return a.value > 200;
      });

    var result = [];
    data.forEach(function(item) {
      result.push([item.name, item.value]);
    });
    result.sort(function(a, b) {
      return a[1] - b[1];
    });
    result.unshift(["city", "num"]);
    var option = {
      dataset: {
        source: result
      },
      grid: { containLabel: true },
      xAxis: { name: "用户数" },
      yAxis: { type: "category" },
      series: [
        {
          type: "bar",
          encode: {
            // Map the "amount" column to X axis.
            x: "num",
            // Map the "product" column to Y axis
            y: "city"
          }
        }
      ],
      visualMap: {
        orient: "horizontal",
        left: "center",
        min: 200,
        max: 3000,
        // text: ["High Score", "Low Score"],
        // Map the score column to color
        dimension: 1,
        inRange: {
          color: ["#D7DA8B", "#E15457"]
        }
      }
    };

    myChart.setOption(option);
  });
})("location:sort");

// 加入时间
void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/time:number_year.json", function(data) {
    var result = [];
    data.forEach(function(item) {
      result.push([item.create_year + " 年", item.number]);
    });
    result = result.sort(function(a, b) {
      return a[1] - b[1];
    });
    result.unshift(["year", "num"]);
    var option = {
      dataset: {
        source: result
      },
      grid: { containLabel: true },
      xAxis: { name: "用户数" },
      yAxis: { type: "category" },
      series: [
        {
          type: "bar",
          encode: {
            // Map the "amount" column to X axis.
            x: "num",
            // Map the "product" column to Y axis
            y: "year"
          }
        }
      ],
      visualMap: {
        orient: "horizontal",
        left: "center",
        min: 0,
        max: 2000,
        // text: ["High Score", "Low Score"],
        // Map the score column to color
        dimension: 1,
        inRange: {
          color: ["#D7DA8B", "#E15457"]
        }
      }
    };

    myChart.setOption(option);
  });
})("time:year_sort");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/time:number_month.json", function(data) {
    var result = [];
    data.forEach(function(item) {
      result.push([item.create_month + " 月", item.number]);
    });
    result = result.sort(function(a, b) {
      return a[1] - b[1];
    });
    result.unshift(["month", "num"]);
    var option = {
      dataset: {
        source: result
      },
      grid: { containLabel: true },
      xAxis: { name: "用户数" },
      yAxis: { type: "category" },
      series: [
        {
          type: "bar",
          encode: {
            // Map the "amount" column to X axis.
            x: "num",
            // Map the "product" column to Y axis
            y: "month"
          }
        }
      ],
      visualMap: {
        orient: "horizontal",
        left: "center",
        min: 900,
        max: 1500,
        // text: ["High Score", "Low Score"],
        // Map the score column to color
        dimension: 1,
        inRange: {
          color: ["#D7DA8B", "#E15457"]
        }
      }
    };

    myChart.setOption(option);
  });
})("time:month_sort");

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
        // text: "「加入年份」"
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
        // text: "「加入月份」"
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

// 电影
void (function(id) {
  var myChart = echarts.init(document.getElementById(id));
  $.get("./data/movie.json", function(json) {
    option = {
      title: {
        text: "电影"
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
  $.get("./data/book.json", function(json) {
    option = {
      title: {
        text: "阅读"
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
})("book");

// 关注以及被关注
void (function(id) {
  var myChart = echarts.init(document.getElementById(id));
  $.get("./data/contact.json", function(json) {
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
          // text: "基于「关注数、被关注数」的用户分布",
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
          radius: ["20%", "30%"],
          center: ["75%", "30%"],
          // roseType: true,
          data: json.contact.key
            .map(function(item, index) {
              return {
                name: item,
                value: ((json.contact.value[index] * 100) / TOTAL).toFixed(2)
              };
            })
            .sort(function(a, b) {
              return b.value - a.value;
            })
        },
        {
          type: "pie",
          radius: ["20%", "30%"],
          center: ["75%", "80%"],
          // roseType: true,
          data: json.contactRev.key
            .map(function(item, index) {
              return {
                name: item,
                value: ((json.contactRev.value[index] * 100) / TOTAL).toFixed(2)
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

// 用户名
void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/username:wordsList.json", function(json) {
    json = json.filter(function(item) {
      return item.value > 25 && item.name.search(/[a-zA-Z1-9]/g) === -1;
    });
    var legendData = [];
    var selected = {};
    var seriesData = null;
    json.forEach(function(item, index) {
      legendData.push(item.name);
      selected[item.name] = index > 1000 ? false : true;
    });
    seriesData = json;

    option = {
      title: {
        // text: "「最常用字」",
        // subtext: "中文字符",
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
          name: "用户名",
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
})("user:username");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/username:wordsList.json", function(json) {
    json = json.filter(function(item) {
      return item.value > 25 && item.name.search(/[a-zA-Z]/g) === 0;
    });
    var legendData = [];
    var selected = {};
    var seriesData = null;
    json.forEach(function(item, index) {
      legendData.push(item.name);
      selected[item.name] = index > 1000 ? false : true;
    });
    seriesData = json;

    option = {
      title: {
        // text: "「最常用字」",
        // subtext: "英文字符",
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
          name: "用户名",
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
})("user:username_en");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/id:category.json", function(json) {
    option = {
      title: {
        // text: "「ID」",
        // subtext: '虚构数据',
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: "center",
        data: ["自定义ID", "未自定义ID"]
      },
      series: [
        {
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: [
            { value: json[0].value, name: "自定义ID" },
            { value: json[1].value, name: "未自定义ID" }
          ],
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
})("user:id");

// 更多
// void (function(id) {
//   var myChart = echarts.init(document.getElementById(id));

//   $.get("./data/more:dur_rev_contact_final.json", function(json) {
//     // var data = json.slice(0, 10000);

//     var schema = [
//       { name: "关注数", index: 1, text: "关注数" },
//       { name: "被关注数", index: 1, text: "被关注数" },
//       { name: "加入时长", index: 2, text: "加入时长" }
//     ];

//     var citys = [ '上海', '北京', '南京', '广州', '成都', '杭州', '武汉', '深圳', '西安', '重庆' ],
//     // var itemStyle =

//     option = {
//       backgroundColor: "#404a59",
//       color: ["#dd4444", "#fec42c", "#80F1BE"],
//       legend: {
//         y: "top",
//         data: citys,
//         textStyle: {
//           color: "#fff",
//           fontSize: 16
//         }
//       },
//       grid: {
//         x: "10%",
//         x2: 150,
//         y: "18%",
//         y2: "10%"
//       },
//       tooltip: {
//         padding: 10,
//         backgroundColor: "#222",
//         borderColor: "#777",
//         borderWidth: 1,
//         formatter: function(obj) {
//           var value = obj.value;
//           return (
//             '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
//             "基本信息：" +
//             "</div>" +
//             schema[0].text +
//             "：" +
//             value[0] +
//             "<br>" +
//             schema[1].text +
//             "：" +
//             value[1] +
//             "<br>" +
//             schema[2].text +
//             "：" +
//             value[2] +
//             "<br>"
//           );
//         }
//       },
//       xAxis: {
//         type: "value",
//         name: "关注数",
//         nameGap: 16,
//         nameTextStyle: {
//           color: "#fff",
//           fontSize: 14
//         },
//         max: 2500,
//         splitLine: {
//           show: false
//         },
//         axisLine: {
//           lineStyle: {
//             color: "#eee"
//           }
//         }
//       },
//       yAxis: {
//         type: "value",
//         name: "被关注数",
//         nameLocation: "end",
//         nameGap: 20,
//         nameTextStyle: {
//           color: "#fff",
//           fontSize: 16
//         },
//         max: 15000,
//         axisLine: {
//           lineStyle: {
//             color: "#eee"
//           }
//         },
//         splitLine: {
//           show: false
//         }
//       },
//       visualMap: [
//         // {
//         //     left: 'right',
//         //     top: '10%',
//         //     dimension: 2,
//         //     min: 0,
//         //     max: 20000,
//         //     itemWidth: 30,
//         //     itemHeight: 120,
//         //     calculable: true,
//         //     precision: 0.1,
//         //     text: ['圆形大小：PM2.5'],
//         //     textGap: 30,
//         //     textStyle: {
//         //         color: '#fff'
//         //     },
//         //     inRange: {
//         //         symbolSize: [10, 70]
//         //     },
//         //     outOfRange: {
//         //         symbolSize: [10, 70],
//         //         color: ['rgba(255,255,255,.2)']
//         //     },
//         //     controller: {
//         //         inRange: {
//         //             color: ['#c23531']
//         //         },
//         //         outOfRange: {
//         //             color: ['#444']
//         //         }
//         //     }
//         // },
//         {
//           left: "right",
//           bottom: "5%",
//           dimension: 2,
//           min: 0,
//           max: 5000,
//           itemHeight: 120,
//           calculable: false,
//           precision: 0.1,
//           text: ["加入时长"],
//           textGap: 30,
//           textStyle: {
//             color: "#fff"
//           },
//           inRange: {
//             colorLightness: [1, 0.5]
//           },
//           outOfRange: {
//             color: ["rgba(255,255,255,.2)"]
//           },
//           controller: {
//             inRange: {
//               color: ["#c23531"]
//             },
//             outOfRange: {
//               color: ["#444"]
//             }
//           }
//         }
//       ],
//       series: [1,2,3,4,5,6,7,8,9,10].map(function(v,i){
//         return {
//           name: citys[i],
//           type: "scatter",
//           itemStyle: {
//             normal: {
//               opacity: 0.8,
//               shadowBlur: 10,
//               shadowOffsetX: 0,
//               shadowOffsetY: 0,
//               shadowColor: "rgba(0, 0, 0, 0.5)"
//             }
//           },
//           data: json[citys[i]]
//         }
//       }),

//     };
//     console.log(option)
//     myChart.setOption(option);
//   });
// })("more:dur_rev_contact");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/more:year_avg.json", function(json) {
    var result = [];
    json[0].value.forEach(function(name, index) {
      result.push({
        name: name,
        value: [
          json[1].value[index],
          json[2].value[index],
          json[3].value[index],
          json[4].value[index],
          json[5].value[index],
          json[6].value[index]
        ]
      });
    });
    option = {
      title: {
        // text: '「加入年份」&「各项均值」'
      },
      tooltip: {},
      legend: {
        data: json[0].value.sort()
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: "#fff",
            backgroundColor: "#999",
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: "平均关注数", max: 500 },
          { name: "平均被关注数", max: 6000 },
          { name: "平均加入小组数", max: 120 },
          { name: "平均评论数", max: 50 },
          { name: "平均电影数", max: 2500 },
          { name: "平均阅读数", max: 1200 }
        ]
      },
      series: [
        {
          // name: "预算 vs 开销（Budget vs spending）",
          type: "radar",
          // areaStyle: {normal: {}},
          data: result
        }
      ]
    };
    myChart.setOption(option);
  });
})("more:year_average");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/more:city_avg.json", function(json) {
    var result = [];
    json[0].value.forEach(function(name, index) {
      result.push({
        name: name,
        value: [
          json[1].value[index],
          json[2].value[index],
          json[3].value[index],
          json[4].value[index],
          json[5].value[index],
          json[6].value[index]
        ]
      });
    });
    option = {
      title: {
        // text: '「加入年份」&「各项均值」'
      },
      tooltip: {},
      legend: {
        data: json[0].value.sort()
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: "#fff",
            backgroundColor: "#999",
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: "平均关注数", max: 200 },
          { name: "平均被关注数", max: 2500 },
          { name: "平均加入小组数", max: 80 },
          { name: "平均评论数", max: 30 },
          { name: "平均电影数", max: 2500 },
          { name: "平均阅读数", max: 1200 }
        ]
      },
      series: [
        {
          name: "",
          type: "radar",
          // areaStyle: {normal: {}},
          data: result
        }
      ]
    };
    myChart.setOption(option);
  });
})("more:city_average");

void (function(id) {
  var myChart = echarts.init(document.getElementById(id));

  $.get("./data/more:city_movie.json", function(json) {
    option = {
      angleAxis: {
        type: "category",
        data: json[0].value,
        z: 10
      },
      radiusAxis: {},
      polar: {},
      series: [
        {
          type: "bar",
          data: json[3].value,
          coordinateSystem: "polar",
          name: "看过",
          stack: "a"
        },
        {
          type: "bar",
          data: json[2].value,
          coordinateSystem: "polar",
          name: "想看",
          stack: "a"
        },
        {
          type: "bar",
          data: json[1].value,
          coordinateSystem: "polar",
          name: "在看",
          stack: "a"
        }
      ],
      legend: {
        show: true,
        data: ["看过", "想看", "在看"]
      }
    };

    myChart.setOption(option);
  });
})("more:city_movie");
