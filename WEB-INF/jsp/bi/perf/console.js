var time_region = null;
$(function(){
    
    $('#dtSelector ul li a').click(function(){
        time_region = $(this).attr('value');
        refresh();
    });
    
    $('#pageTab>li>a').click(function(){
        var h = $(this).attr('href').substring(1);
        var $selPage = $('#perfPages .pages.selected');
        var d = $selPage.attr('data-domain'), p = $selPage.attr('data-pageurl');
        switch(h) {
            case 'tab_trend': forPageInfo(d, p); break;
            case 'tab_slow': loadSlowPageList(d, p); break;
        }
    });
});

//刷新
function refresh(){
    //加载访问页面列表，按照时间消耗从大到小排列
    loadPerfPages();
}
//加载访问页面列表
function loadPerfPages(){
    var $wrapObj = $('#perfPages');
    $wrapObj.html('');
    $.ajax({
      url: webPath + '/bi/perf/getPerfPages',
      method: 'POST',
      data: {time_region: time_region},
      error: function(e, h, r){
          toastr['warning'](e, "加载访问页面列表出错!");
      },
      success: function(data){
          var json = eval(data);
          ajaxSuccess(json, $wrapObj, '没有页面请求数据', function(){
              var len = json.length, div = '';
              var sw = parseFloat($wrapObj.css('width')), st = 1;
              for (var i = 0; i < len; i++) {
                  var t = Math.round(10*parseInt(json[i].AVG_TIME, 10)/1000)/10;
                  if (i == 0) st = t;
                  var w = (sw-40)*(t/st), pageUrl = json[i].PAGE_URL, domain=json[i].DOMAIN;
                  div += PropgressTool.init(w, pageUrl, t+'s', (domain+pageUrl), {'data-domain':domain, 'data-pageurl':pageUrl});
              }
              $wrapObj.html(div);
              
              //默认加载时间消耗最大的访问页面性能趋势信息：性能区间趋势图、访问量以及响应时间趋势图
              if ($('.pages', $wrapObj).length > 0) {
                  //访问页面列表
                  $('.pages').each(function(){
                      $(this).click(function(){
                          $('.pages', $(this).parent()).removeClass('selected');
                          $(this).addClass('selected');
                          var d = $(this).attr('data-domain'), p = $(this).attr('data-pageurl');
    //                      forPageInfo(d, p);
                          $($('#pageTab>li>a')[0]).click();
                      });
                  });
                $($('.pages', $wrapObj)[0]).click();
              } else {
                  $('#perfSectionChart').html('');
                  $('#perfTrendChart').html('');
              }
          });
      }
    });
}

//左侧访问页面列表单击事件
function forPageInfo(domain, pageUrl){
    loadPerfSection(domain, pageUrl);
    loadPerfTrend(domain, pageUrl);
    
}

//加载性能区间
function loadPerfSection(domain, pageUrl){
  var $wrapObj = $('#perfSectionChart');
  if (echarts.getInstanceByDom($wrapObj[0])) {
      echarts.dispose($wrapObj[0]);
  }
  $wrapObj.html('');
  $.ajax({
    url: webPath + '/bi/perf/getPerfSection',
    method: 'POST',
    data: {time_region: time_region, domain:domain, page_url: pageUrl},
    error: function(e, h, r){
        toastr['warning'](e, "加载性能区间出错!");
    },
    success: function(data){
        var json = eval(data);
        var len = json.length;
        if (len > 0) {
            var queue_arr = [], request_arr = [], response_arr=[], domparse_arr=[], resource_arr=[];
            var max = 0;
            for (var i = 0; i < len; i++) {
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
        }
    }
  });
}

//加载访问页面性能趋势图
function loadPerfTrend(domain, pageUrl){
    var $wrapObj = $('#perfTrendChart');
    if (echarts.getInstanceByDom($wrapObj[0])) {
        echarts.dispose($wrapObj[0]);
    }
    $wrapObj.html('');
    $.ajax({
        url: webPath + '/bi/perf/getPerfTrend',
        method: 'POST',
        data: {time_region: time_region, domain: domain, page_url: pageUrl},
        error: function(e, h, r){
            toastr['warning'](e, "加载页面性能趋势数据出错!");
        },
        success: function(data){
            var json = eval(data);
            var len = json.length;
            if (len > 0) {
                var x_axis = [],pv_data = [],time_data=[], max1=0, max2=0;
                for (var i = 0; i < len; i++) {
                    var c = parseInt(json[i].REQ_COUNT, 10),
                    t = Math.round(100*(parseInt(json[i].AVG_TIME, 10)/1000))/100;
                    x_axis.push(json[i].SNAPSHOT_DATE);
                    pv_data.push(c);
                    time_data.push(t);
                }
                max1 = Math.max.apply(null, pv_data);
                max2 = Math.max.apply(null, time_data);
                var legend = ['响应时间', 'PV'];
                var yAxis = [{type: 'value', axisLabel:{formatter: '{value} s'}, splitNumber: max1 >= 4 ? 4:1}
                                ,{type: 'value', axisLabel:{formatter: '{value}'}, splitNumber: max2 >= 4 ? 4:1}];
                var preD='', preH='';
                var xAxis = [{data:x_axis, axisLabel:{formatter:function(v){
                    var d = (v+'').substring(4, 8), h = (v+'').substring(9, 11);
                    if (d != preD) {
                        preD = d;
                        return d+' '+v.substring(9, 14);
                    }
                    if (h != preH) {
                        preH = h;
                        return v.substring(9, 14);
                    }
                    return '';
                    
                }}}];
                var series = [{type:'bar',name:'PV',yAxisIndex:1,data: pv_data},{type:'line',name:'响应时间',yAxisIndex:0,smooth: true,data: time_data}];
                new MyEcharts($wrapObj[0], {type:'bar', option:{legend: {data:legend},grid: {x:40,x2:40,y:10,y2:60}, xAxis:xAxis,yAxis:yAxis,series:series}});
            }
        }
    });
}

//加载慢加载列表
function loadSlowPageList(domain, pageUrl){
  var $tbody = $('#tblSlowList tbody');
  $tbody.html('');
  $.ajax({
      url: webPath + '/bi/perf/getSlowPageList',
      method: 'POST',
      data: {time_region: time_region, domain: domain, page_url: pageUrl},
      error: function(e, h, r){
          toastr['warning'](e, "加载慢加载列表出错!");
      },
      success: function(data){
          var json = eval(data);
          var len = json.length;
          for (var i = 0; i < len; i++) {
              var tr = '<tr>'
                          + '<td>'+(i+1)+'</td>'
                          + '<td>'+json[i].SNAPSHOT_DATE+'</td>'
                          + '<td>'+json[i].BROWSER_NAME+'</td>'
                          + '<td><a class="btn sbold btnlink" onclick="forSlowDetail(\''+json[i].REQ_ID+'\')">'+json[i].TOTAL_TIME+'</a></td>'
                          +'</tr>';
              $tbody.append(tr);
          }
      }
  });
}
function forSlowDetail(req_id){
    var url = webPath + '/bi/perf/popup/forSlowPageDetail?req_id='+req_id;
    PopWinUtil.showPopWin(url, {showTitle: 'Yes'}, $(document.body));
}