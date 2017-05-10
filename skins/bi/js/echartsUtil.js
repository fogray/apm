/**
 * Echarts封转方法：
 * 1、引入JS：<script src="${ctx}/skins/itmq/js/echartsUtil.js"></script>
 * 2、初始化echarts对象：var myEcharts = new MyEcharts(obj, config, callback);
 * 
 */

var preDate1 = '';
var preHour1 = '';
var preDate2 = '';
var preHour2 = '';
var DefaultOption = {
    line: {
            option: {
                tooltip: {trigger: 'axis'},
                legend:{data:[''], textStyle:{color:'#fff'}, y:'bottom'},
                grid: {borderWidth:0, x:70,x2:10,y:10,y2:60},
                xAxis: [{type: "category",
                         data:[0],
                         axisTick: {show: true, length:2},
                         splitLine: {show: false},
                         axisLine: {show: true},
                         axisLabel: {show:true,clickable: true,interval:function(index, value){
                            if (index%5==0) return true;
                            return false;
                         },rotate: 0, textStyle:{color:'#ffffff'}}
                }],
                yAxis: [{
                           type: "value",
                           min: 0,
                           axisLine: {show: false},
                           axisTick: {show: false,length:2},
                           splitNumber: 4,
                           splitLine: {show: true, lineStyle: {type: "dashed",color:'#12486e'}},
                           axisLabel: {show:true, textStyle:{color:'#ffffff'}
                                         , formatter: function(v){
                                              if (isNaN(v)) return v;
                                              return parseInt(v);
                                          }}
                       }],
                series:[{type:'line',data:[0]}]
            }
       },
       time: {
           option: {
               tooltip: {show:true,trigger: 'axis'
                            , formatter: function(params){
                                 var len = params.length;
                                 var seriesName = params[0].name;
                                 var r = seriesName;
                                 for (var i = 0; i < len; i++) {
                                     var l = params[i].seriesName, v = (params[i].data != undefined && params[i].data.value != undefined) ? params[i].data.value[1] : '';
                                     r += '<br/>' + l+': '+v;
                                 }
                                 return r;
                             }},
               legend:{data:[''], y:'bottom',
                   itemWidth: 10,
                   textStyle: {
                       fontSize: 12,
                       color:'#fff'
                   },
                   itemGap: 3,
                   padding: 0
               },
               grid: {borderWidth:0, y:10,y2:60},
               xAxis: [{type: "time",
                        axisTick: {show: true, length:2},
                        splitLine: {show: false},
                        axisLine: {show: true},
                        axisLabel: {show:true,clickable: true,rotate: 0, textStyle:{color:'#ffffff'}
                                    , formatter: function(v, index){
                                        var date = DateTool.parseToStr(new Date(v), 'yyyyMMdd hh:mm');
                                        var md = date.substring(4, 8), hm = date.substring(9);
                                        if (index == 0) return md+' '+hm;
                                        return hm;
                                    }}
               }],
               yAxis: [{
                          type: "value",
                          min: 0,
                          axisLine: {show: false},
                          axisTick: {show: false,length:2},
                          splitLine: {show: true, lineStyle: {type: "dashed",color:'#12486e'}},
                          axisLabel: {show:true, textStyle:{color:'#ffffff'}}
                      }],
               series:[{type:'line',showAllSymbol: true,data:[[new Date(),0]]}]
           }
      },
    bar: {
        option: {
            tooltip: {trigger: 'axis'},
            legend:{data:[''],textStyle:{color:'#fff'}, y:'bottom'},
            grid: {borderWidth:0, x:70,x2:10,y:10,y2:60},
            xAxis: [{type: "category",
                      data:[0],
                      axisTick: {show: true, length:2},
                     splitLine: {show: false},
                     axisLine: {show: false},
                     axisLabel: {show:true,clickable: true,interval: 0,rotate: 0, textStyle:{color:'#ffffff',fontSize:13}}
            }],
            yAxis: [{
                       type: "value",
                       min: 0,
                       axisLine: {show: false},
                       axisTick: {show: false,length:2},
                       splitNumber: 4,
                       splitLine: {show: true, lineStyle: {type: "dashed", color:'#12486e'}},
                       axisLabel: {show:true, textStyle:{color:'#ffffff'}
                                     , formatter: function(v){
                                          if (isNaN(v)) return v;
                                          return parseInt(v);
                                      }}
                   }],
            series:[{type:'bar',barMaxWidth: 30,data:[0]}]
        }
    },
    pie: {
        option: {
            tooltip: {trigger: 'axis', formatter: "{a} <br/>{b} : {c}"},
            legend:{orient: "vertical", x: "right", data:[''], textStyle:{color:'#fff'}},
            calculable: true,
            series:[{type:'pie', 
                     radius: [0,'75%'], 
                     itemStyle: {normal:{label:{show:false},labelLine:{show:false}}
                                 ,emphasis:{label:{show:false},labelLine:{show:false}}},
                     data:[0]}]
        }
    },
    map: {
        option: {
            tooltip: {trigger: 'item', formatter: "{a} <br/>{b} : {c}"},
            grid: {borderWidth:0, x:10,x2:10,y:0,y2:0},
            series:[{type:'map', 
                     mapType: 'china', 
                     selectedMode: 'single'
                    , itemStyle:{normal:{label:{show:true, textStyle:{color:'#313231'}}}
                                 ,emphasis:{label:{show:true}}}
                    , data:[]}]
        }
    },
    gauge: {
        option: {
            tooltip: {formatter: "{c}%"},
            series: [{type: 'gauge', min: 0, max: 100, splitNumber: 1, radius : '50%'
                      , axisLine: {show:true, lineStyle: {color: [[0.3, 'lime'],[0.7, '#1e90ff'],[1, '#ff4500']],width: 3}}
                      , axisLabel: {textStyle: {fontWeight: 'bolder', color: '#fff'}}
                      , axisTick: {length :15}
                      , splitLine: {length :25, lineStyle: {width:3, color: '#fff'}}
                      , pointer: {shadowColor : '#fff', shadowBlur: 5, length: '60%', width: 10}
                      , title : {
                          textStyle: {fontWeight: 'bolder', fontSize: 20, color: '#fff'}
                        }
                      , data: [{value:0}]
                      }]
        }
    },
    radar: {
        option: {
            tooltip: {formatter: function (params) {
                if (isNaN(params.percent)) return params.name;
                return params.name+': '+ params.value[params.percent];
            }},
            polar: [{ indicator: [{text: '1', max: 1}]
                        , name:{show:true, textStyle:{color:'#fff'}} 
                    }],
            series: [{type: 'radar'
                      , data: [{value: [0], name:''}]
                      }]
        }
    }
};
/**
 * echarts图表配置
 * {type:'line'/'bar'/'pie'/'radius'/'map'/'gauge', mapType:'china'/'山东'...,option:参照echarts官方option设置}
 */
var EchartsConfig = {
    type: 'line',
    mapType: 'china',
    option: DefaultOption['line']
};

function copyOption(o1, o2){
    for(var key in o1) {
        var kv1 = o1[key];
        if (key in o2 && o2[key]+'' != '[]' && o2[key]+'' != '{}') {
            if(typeof(kv1) == 'object') {
                copyOption(kv1, o2[key]);
            } else if(typeof(kv1) == '[object, object]'){
                for (var i = 0; i < kv1.length; i++) {
                    copyOption(kv1[i], o2[key][i]);
                }
            }
        } else {
            o2[key] = kv1;
        }
    }
    return o2;
}
/**
 * echarts对象
 * @param obj  图表的dom对象
 * @param config EchartsConfig对象
 * @param callback 回调函数，必须指定，参数为echart（echarts对象，用于操作图表）
 * @returns
 */
var MyEcharts = function(obj, config, callback) {

    var type = this.type = config.type ? config.type : EchartsConfig.type;

    if (type == 'radius') {
        type = this.type = 'pie';
        this.option = DefaultOption['pie'].option;
        this.option.series[0].radius = ['50%', '70%'];
    } else {
        this.option = DefaultOption[type].option;
    }
    
    var option = this.option;
    if (config.option) {
        option = copyOption(this.option, config.option);
        if (config.option.yAxis && config.option.yAxis.length > 1){
            for (var i=0; i <config.option.yAxis.length-1; i++) {
                config.option.yAxis[i+1] = copyOption(config.option.yAxis[i],config.option.yAxis[i+1]);
            }
        }
    }
    if (!('color' in option) && !option.color) {
        option.color = ['rgb(0, 255, 255)', 'rgb(0, 127, 127)', 'rgb(0, 191, 0)', 'rgb(255, 255, 0)', 'rgb(255, 170, 86)', 'rgb(191, 95, 0)', 'rgb(255, 86, 86)', 'rgb(170, 255, 170)', '#ffa500', '#40e0d0', '#1e90ff'];
    }
    // 使用
      var chart = echarts.init(obj);
      chart.setOption(option);
      if (callback) callback(chart);
};

/**
 * EchartsUtil通用工具
 * 
 */
var EchartUtil = {
    /**
     * bindEvent：用于图表绑定事件
     * @param echart
     * @param type 事件类型，'click'/'mapSelected'
     * @param callback
     */
    bindEvent: function(echart, type, callback){
        echart.on(type, callback);
    },
    /**
     * 封转echarts的setOption方法
     * @param echart
     * @param option EchartsConfig.option
     */
    setOption: function(echart, option) {
        echart.setOption(option);
        if (option.unit) {
            var coption = echart.getOption();
            echart.setOption({tooltip:{formatter:coption.tooltip.formatter+option.unit}});
        }
        echart.resize();
        
        echart.hideLoading();
    },
    /**
     * 封转echarts的setSeries方法
     * @param echart
     * @param series EchartsConfig.option.series
     */
    setSeries: function(echart, series) {
        echart.setSeries(series);
        echart.resize();
        echart.hideLoading();
    },
    /**
     * Map地图设置选中省级单位
     * @param echart
     * @param areaName
     */
    setMapSelected: function(echart, areaName) {
        var md = echart.getSeries()[0].data;
        for (var i = 0; i < md.length; i++) {
            if (md[i].name == areaName) md[i].selected=true;
            else md[i].selected=false;
        }
        echart.setSeries([{data: md}]);
        echart.restore();
    },
    /**
     * Map地图清除选中
     * @param echart
     */
    clearMapSelected: function(echart) {
        var md = echart.getSeries()[0].data;
        for (var i = 0; i < md.length; i++) {
            if (md[i].selected) md[i].selected=false;
        }
        echart.setSeries([{data: md}]);
        echart.restore();
    },
    setTheme: function(echart, name){
        require(['echarts/theme/'+name], function(tarTheme){
            echart.setTheme(tarTheme);
        });
    },
    /**
     * 封装echarts数据加载效果
     * @param echart
     * @param text
     */
    showLoading : function(echart, text){
        echart.showLoading({
          text : text ? text : '数据加载中...',
          effect : 'whirling',
          textStyle : {
              fontSize : 20
          }
      });
    }
};