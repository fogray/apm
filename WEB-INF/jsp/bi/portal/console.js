$(function(){

    $('#dtSelector ul li a').click(function(){
        var time_region = $(this).attr('value');
        refresh(time_region);
    });
});
//刷新
function refresh(timeregion){
    //加载性能区间趋势图
    loadPerfSection(timeregion);
    
    //加载Apdex用户体验满意度趋势图
    loadApdexTrend(timeregion);
    
    //加载脚本错误统计趋势图
    loadScriptErrorTrend(timeregion);
    
    //加载页面浏览量和响应时间趋势图
    loadPerfTrend(timeregion);
    
    //加载异步请求次数和响应时间趋势图
    loadXhrTrend(timeregion);
    
    //加载平均响应时间-中国地图
    loadAreaPerf(timeregion);
    
    //记载各运营商性能统计
    loadOperatorPerf(timeregion);
    
    //加载各浏览器性能统计
    loadBrowserPerf(timeregion);
    
    //加载慢事务追踪
    loadSlowPagePerf(timeregion);
}
//加载性能区间趋势图
function loadPerfSection(time_region){
    var $wrapObj = $('#perfSectionChart');
    $wrapObj.html('');
    $.ajax({
        url: webPath + '/bi/perf/getPerfSection',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载性能区间数据出错!");
        },
        success: function(data){
            var json = eval(data);
            ajaxSuccess(json, $wrapObj, '没有页面请求数据', function(){
                var len = json.length, x_axis = [], queue_arr = [], request_arr = [], response_arr=[], domparse_arr=[], resource_arr=[];
                var max = 0;
                for (var i = 0; i < len; i++) {
                    x_axis.push(json[i].SNAPSHOT_DATE);
                    var date = DateTool.parseToDate(json[i].SNAPSHOT_DATE);
                    queue_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].QUEUEN_TIME]});
                    request_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].REQUEST_TIME]});
                    response_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].RESPONSE_TIME]});
                    domparse_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].DOM_PARSE_TIME]});
                    resource_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].RESOURCE_TIME]});
                    var t = json[i].QUEUEN_TIME + json[i].REQUEST_TIME + json[i].RESPONSE_TIME + json[i].DOM_PARSE_TIME + json[i].RESOURCE_TIME;
                    if (t > max) max = t;
                }
                var legend = [{name:'请求排队',icon:'circle'},{name:'后端处理',icon:'roundRect'},{name:'响应返回',icon:'triangle'},{name:'DOM解析',icon:'diamond'}, {name:'资源加载',icon:'rect'}];
                var xAxis = [{type: 'time'}];
                var yAxis = [{type: 'value', axisLabel:{show: true, formatter: '{value} ms'}, splitNumber: max >= 4 ? 4:1}];
                var series = [{type:'line',name:'请求排队',smooth: true, stack:'总时间',itemStyle: {normal: {areaStyle: {type: "default"}}},data: queue_arr}
                                ,{type:'line',name:'后端处理',smooth: true, stack:'总时间',itemStyle: {normal: {areaStyle: {type: "default"}}},data: request_arr}
                                ,{type:'line',name:'响应返回',smooth: true, stack:'总时间',itemStyle: {normal: {areaStyle: {type: "default"}}},data: response_arr}
                                ,{type:'line',name:'DOM解析',smooth: true, stack:'总时间',itemStyle: {normal: {areaStyle: {type: "default"}}},data: domparse_arr}
                                ,{type:'line',name:'资源加载',smooth: true, stack:'总时间',itemStyle: {normal: {areaStyle: {type: "default"}}},data: resource_arr}];
                new MyEcharts($wrapObj[0], {type:'time', option:{legend: {data:legend}, yAxis:yAxis, xAxis:xAxis,series:series}});
            });
        }
    });
}

//加载用户Apdex趋势图
function loadApdexTrend(time_region){
    var $wrapObj = $('#apdexChart');
    $wrapObj.html('');
    $.ajax({
        url: webPath + '/bi/perf/getApdexTrend',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载用户Apdex数据出错!");
        },
        success: function(data){
            var json = eval(data);
            ajaxSuccess(json, $wrapObj, '没有用户Apdex数据', function(){
                var len = json.length, x_axis = [], data = [];
                for (var i = 0; i < len; i++) {
                    x_axis.push(json[i].SNAPSHOT_DATE);
                    var date = DateTool.parseToDate(json[i].SNAPSHOT_DATE);
                    data.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].APDEX], satis: json[i].SATISFIED_COUNT, tolerate: json[i].TOLERATE_COUNT, dis_satis: json[i].DIS_SATISFIED_COUNT});
                    //data.push({value:json[i].APDEX, satis: json[i].SATISFIED_COUNT, tolerate: json[i].TOLERATE_COUNT, dis_satis: json[i].DIS_SATISFIED_COUNT});
                }
                var legend = ['Apdex'];
                var tooltip = {formatter: function(params){
                    var xaxis = params[0].name, v=0, s=0, t=0, d=0;
                    if (params[0].data && 'value' in params[0].data){
                        v = params[0].data.value[1];
                        s = params[0].data.satis;
                        t = params[0].data.tolerate;
                        d = params[0].data.dis_satis;
                    }
                    return xaxis + '<br/>Apdex：' + v + '<br/>满意次数：'+ s + '<br/>可容忍次数：'+ t + '<br/>不满意次数：'+ d;
                }};
                var yAxis = [{type: 'value', splitNumber: 4, max: 1
                                ,axisLabel: {show:true, textStyle:{color:'#ffffff'}
                                , formatter: function(v){
                                    return Math.round(v*100)/100;
                                    }
                            }}];
                var series = [{type:'line',name:'Apdex',smooth: true,data: data}];
                new MyEcharts($wrapObj[0], {type:'time', option:{legend: {data:legend}, grid:{x:30,x2:10}, tooltip:tooltip, yAxis:yAxis, xAxis:[{data:x_axis}],series:series}});
            });
        }
    });
}
//加载脚本错误统计趋势图
function loadScriptErrorTrend(time_region){
    var $wrapObj = $('#scriptErrChart');
    $wrapObj.html('');
    $.ajax({
        url: webPath + '/bi/script/getErrorMsgList',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载脚本错误数据出错!");
        },
        success: function(data){
            var json = eval(data);
            ajaxSuccess(json, $wrapObj, '没有脚本错误数据', function(){
                var len = json.length, x_axis = [], legend_data=[], series=[];
                for (var i = 0; i < len; i++) {
                    var errMsg = json[i].ERROR_MSG;
                    legend_data.push(errMsg);
                    x_axis.push(errMsg);
                    series.push({type:'bar',name: errMsg, barMaxWidth: 30, data: [parseInt(json[i].ERR_COUNT, 10)]});
                }
                var legend = {show:true, data:legend_data, formatter:function(v,index){
                    if (v.length > 10) return v.substring(v.length-10);
                    return v;
                }};
                var tooltip = {trigger:'item', formatter: function(p){
                    return p.seriesName +': ' + p.value;
                }};
                var xAxis = [{
                    data: [''],axisLabel:{formatter: function(v,index){
                        if (v.length > 10) return v.substring(v.length-10);
                        return v;
                    }}
                }];
                var yAxis = [{splitNumber: 4}];
                new MyEcharts($wrapObj[0], {type: 'bar', option:{unit: '', tooltip:tooltip,legend:legend, xAxis: xAxis, yAxis: yAxis, series:series}});
            });
        }
    });
}

//加载访问页面性能趋势图
function loadPerfTrend(time_region){
    var $wrapObj = $('#perfTrendChart');
    $wrapObj.html('');
  $.ajax({
      url: webPath + '/bi/perf/getPerfTrend',
      method: 'POST',
      data: {time_region: time_region},
      error: function(e, h, r){
          toastr['warning'](e, "加载页面性能趋势数据出错!");
      },
      success: function(data){
          var json = eval(data);
          ajaxSuccess(json, $wrapObj, '没有页面请求数据', function(){
              var len = json.length, x_axis = [],pv_data = [],time_data=[], max1=0, max2=0;
              for (var i = 0; i < len; i++) {
                  var c = parseInt(json[i].REQ_COUNT, 10),
                  t = Math.round(100*(parseInt(json[i].AVG_TIME, 10)/1000))/100;
                  x_axis.push(json[i].SNAPSHOT_DATE);
                  pv_data.push(c);
                  time_data.push(t);
              }
              max1 = Math.max.apply(null, time_data);
              max2 = Math.max.apply(null, pv_data);
              var legend = ['响应时间', 'PV'];
              var yAxis = [{type: 'value', axisLabel:{formatter: '{value} s'}, splitNumber: max1 >= 4 ? 4:1}
                              ,{type: 'value', axisLabel:{formatter: '{value}'}, splitNumber: max2 >= 4 ? 4:1}];
              var preD='', preH='';
              var xAxis = [{data:x_axis, axisLabel:{formatter:function(v){
                  var d = (v+'').substring(4, 8), h = (v+'').substring(9, 11);
                  if (d != preD) {
                      preD = d;
                      preH = h;
                      return d+' '+h;
                  }
                  if (h != preH) {
                      preH = h;
                      return h;
                  }
                  return '';}
              }}];
              var series = [{type:'bar',name:'PV',yAxisIndex:1,data: pv_data},{type:'line',name:'响应时间',yAxisIndex:0,smooth: true,data: time_data}];
              new MyEcharts($wrapObj[0], {type:'bar', option:{legend: {data:legend},grid: {x:40,x2:40,y:10,y2:60}, xAxis:xAxis,yAxis:yAxis,series:series}});
          });
      }
  });
}

//加载异步请求性能趋势图
function loadXhrTrend(time_region){
    var $wrapObj = $('#xhrTrendChart');
    $wrapObj.html('');
    $.ajax({
        url: webPath + '/bi/xhr/getXhrTrend',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载异步请求性能趋势数据出错!");
        },
        success: function(data){
            var json = eval(data);
            ajaxSuccess(json, $wrapObj, '没有异步请求数据', function(){
                var len = json.length, x_axis = [],pv_data = [],time_data=[], max1=0, max2=0;
                for (var i = 0; i < len; i++) {
                    var c = parseInt(json[i].REQ_COUNT, 10),
                    t = parseInt(json[i].AVG_TIME, 10);
                    x_axis.push(json[i].SNAPSHOT_DATE);
                    pv_data.push(c);
                    time_data.push(t);
                }
                max1 = Math.max.apply(null, time_data);
                max2 = Math.max.apply(null, pv_data);
                var legend = ['响应时间', 'PV'];
                var yAxis = [{type: 'value', axisLabel:{formatter: '{value} ms'}, splitNumber: max1 >= 4 ? 4:1}
                                ,{type: 'value', axisLabel:{formatter: '{value}'}, splitNumber: max2 >= 4 ? 4:1}];
                var preD='', preH='';
                var xAxis = [{data:x_axis, axisLabel:{formatter:function(v){
                    var d = (v+'').substring(4, 8), h = (v+'').substring(9, 11);
                    if (d != preD) {
                        preD = d;
                        preH = h;
                        return d+' '+h;
                    }
                    if (h != preH) {
                        preH = h;
                        return h;
                    }
                    return '';
                    
                }}}];
                var series = [{type:'bar',name:'PV',yAxisIndex:1,data: pv_data},{type:'line',name:'响应时间',yAxisIndex:0,smooth: true,data: time_data}];
                new MyEcharts($wrapObj[0], {type:'bar', option:{legend: {data:legend},grid: {x:60,x2:40,y:10,y2:60}, xAxis:xAxis,yAxis:yAxis,series:series}});
            });
        }
    });
}

//加载地图数据
function loadAreaPerf(time_region){
    $.ajax({
        url: webPath + '/bi/perf/getAreaPerf',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载地图性能统计数据出错!");
        },
        success: function(data){
            var json = eval(data), len = json.length, data = [];
            for (var i = 0; i < len; i++) {
                var t = Math.round(10*parseInt(json[i].AVG_TIME, 10)/1000)/10;
                var province = json[i].PROVINCE;
                if (province.indexOf('省')>-1) {
                    province = province.substring(0,province.indexOf('省'));
                } else if (province.indexOf('市')>-1) {
                    province = province.substring(0,province.indexOf('市'));
                } else if (province.indexOf('宁夏')>-1) {
                    province = '宁夏';
                } else if (province.indexOf('新疆')>-1) {
                    province = '新疆';
                } else if (province.indexOf('内蒙古')>-1) {
                    province = '内蒙古';
                } else if (province.indexOf('西藏')>-1) {
                    province = '西藏';
                } else if (province.indexOf('广西')>-1) {
                    province = '广西';
                } 
                data.push({name: province, value: t});
            }
            var visualMap = {type:'piecewise'
                            , pieces:[{min: 8, label: '>=8 s', color:'#f00'}
                                     ,{min: 6, max:8, label: '6-8 s', color:'#FF7F27'}
                                     ,{min: 4, max:6, label: '4-6 s', color:'#FFF200'}
                                     ,{min: 2, max:4, label: '2-4 s', color:'#D1F000'}
                                     ,{min: 1, max:2, label: '1-2 s', color:'#ACDF10'}
                                     ,{max:1, label: '<1 s', color:'#0f0'}]
                            , min: 0, left: 'left', top:'bottom', calculable: true};
            var series = [{selectedMode:'',data:data}];
            var tooltip = {formatter: function(p){
                if (p.value) {
                    return p.name + ': ' + p.value + ' s';
                }
                return '';
            }};
            new MyEcharts($('#chinaChart')[0], {type:'map', option:{tooltip:tooltip, visualMap: visualMap, series:series}});
        }
    });
}

//加载运营商统计数据
function loadOperatorPerf(time_region){
  $.ajax({
      url: webPath + '/bi/perf/getOperatorPerf',
      method: 'POST',
      data: {time_region: time_region},
      error: function(e, h, r){
          toastr['warning'](e, "加载运营商性能统计数据出错!");
      },
      success: function(data){
          var json = eval(data), $wrapObj = $('#operator_bar');
          ajaxSuccess(json, $wrapObj, '没有运营商统计数据', function(){
              var len = json.length, div = '';
              var sw = parseFloat($wrapObj.css('width')), st = 1;
              for (var i = 0; i < len; i++) {
                  var t = Math.round(10*parseInt(json[i].AVG_TIME, 10)/1000)/10;
                  if (i == 0) st = t;
                  var w = (sw-40)*(t/st);
                  div += PropgressTool.init(w, json[i].OPERATOR_NAME, t+'s');
              }
              $wrapObj.html(div);
          });
      }
  });
}

//加载浏览器统计数据
function loadBrowserPerf(time_region){
    $.ajax({
        url: webPath + '/bi/perf/getBrowserPerf',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载浏览器性能统计数据出错!");
        },
        success: function(data){
            var json = eval(data), $wrapObj = $('#browser_bar');
            ajaxSuccess(json, $wrapObj, '没有浏览器统计数据', function(){
                var len = json.length, div = '';
                var sw = parseFloat($wrapObj.css('width')), st = 1;
                for (var i = 0; i < len; i++) {
                    var t = Math.round(10*parseInt(json[i].AVG_TIME, 10)/1000)/10;
                    if (i == 0) st = t;
                    var w = (sw-40)*(t/st);
                    div += PropgressTool.init(w, json[i].BROWSER_NAME, t+'s');
                }
                $wrapObj.html(div);
            });
        }
    });
}

//加载慢事务TOP5数据
function loadSlowPagePerf(time_region){
    $.ajax({
        url: webPath + '/bi/perf/getSlowPagePerf',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载慢事务性能数据出错!");
        },
        success: function(data){
            var json = eval(data), $wrapObj = $('#slow_perf_bar');
            ajaxSuccess(json, $wrapObj, '没有慢加载数据', function(){
                var len = json.length, div = '';
                var sw = parseFloat($wrapObj.css('width')), st = 1;
                for (var i = 0; i < len; i++) {
                    var t = Math.round(10*parseInt(json[i].TOTAL_TIME, 10)/1000)/10;
                    if (i == 0) st = t;
                    var w = (sw-40)*(t/st);
                    div += PropgressTool.init(w, json[i].PAGE_URL, t+'s');
                }
                $wrapObj.html(div);
            });
        }
    });
}