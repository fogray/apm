$(function(){
    $('#dtSelector ul li a').click(function(){
        var time_region = $(this).attr('value');
        refresh(time_region);
    });
    $('#dtSelector ul li a')[0].click();
});
//刷新
function refresh(timeregion){
    //加载性能区间趋势图
    loadPerfSection(timeregion);
    //获取某个Tomcat上某时间之后的慢事务图
    loadSlowReq(timeregion);
    //获取某个Tomcat上某时间之后的错误请求统计信息
    loadScriptErrorTrend(timeregion);
}
//1、加载性能区间趋势图
function loadPerfSection(time_region){
    $.ajax({
        url: webPath + '/ai/perf/getPerfSection',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载性能区间数据出错!");
        },
        success: function(data){
            var json = eval(data);
            var len = json.length;
            var x_axis = [], resptime_arr = [], reqcount_arr = [], cpm_arr = [], errorcount_arr = [];
            var max = 0;
            for (var i = 0; i < len; i++) {
                x_axis.push(json[i].SNAPSHOT_DATE);
                var date = DateTool.parseToDate(json[i].SNAPSHOT_DATE+':00');
                resptime_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].AVG_TIME]});
                reqcount_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].REQ_COUNT]});
                cpm_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].REQ_COUNT/5]});
                errorcount_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].ERROR_COUNT],reqcount:json[i].REQ_COUNT});
                var t = json[i].AVG_TIME + json[i].REQ_COUNT;
                if (t > max) max = t;
            }
            //Web事务 event
            var legend_event = ['平均响应时间','请求次数'];
            var xAxis_event = [{type: 'time'}];
            var yAxis_event = [{type: 'value', axisLabel:{show: true, formatter: '{value} ms'}, splitNumber: max >= 4 ? 4:1}];
            var series_event = [{type:'line',name:'平均响应时间',smooth: true, stack:'总时间',itemStyle: {normal: {areaStyle: {type: "default"}}},data: resptime_arr}
                            ,{type:'line',name:'请求次数',smooth: true, stack:'总时间',itemStyle: {normal: {areaStyle: {type: "default"}}},data: reqcount_arr}];
            new MyEcharts($('#perfSectionChart')[0], {type:'time', option:{legend: {data:legend_event}, yAxis:yAxis_event, xAxis:xAxis_event,series:series_event}});
            //吞吐量 cpm
            var legend_cpm = ['吞吐量'];
            var tooltip_cpm = {formatter: function(params){
                return params[0].data.name + '<br/>请求/分钟：'+ params[0].data.value[1].toFixed(1);
            }};
            var yAxis_cpm = [{type: 'value', axisLabel:{show: true, formatter: '{value}'}, splitNumber: max >= 4 ? 4:1}];
            var series_cpm = [{type:'line',name:'吞吐量',smooth: true,data: cpm_arr}];
            new MyEcharts($('#cpmChart')[0], {type:'time', option:{legend: {data:legend_cpm}, grid:{x:30,x2:10}, tooltip:tooltip_cpm,yAxis:yAxis_cpm, xAxis:[{data:x_axis}],series:series_cpm}});
            
            //错误率 err
            var legend_err = ['错误率'];
            var tooltip_err = {formatter: function(params){
            	var ratio =( params[0].data.reqcount == 0||params[0].data.reqcount == undefined) ? 0:(params[0].data.value[1]/params[0].data.reqcount);
                return params[0].data.name + '<br/>错误率：'+ (100*ratio).toFixed(2) + '%' + '<br/>错误次数：'+params[0].data.value[1] + '<br/>总次数：'+ params[0].data.reqcount;
            }};
            var yAxis_err = [{type: 'value', axisLabel:{show: true, formatter: '{value}%'}, splitNumber: max >= 4 ? 4:1}];
            var series_err = [{type:'line',name:'错误率',smooth: true,data: errorcount_arr}];
            new MyEcharts($('#errChart')[0], {type:'time', option:{legend: {data:legend_cpm}, grid:{x:30,x2:10}, tooltip:tooltip_err,yAxis:yAxis_err, xAxis:[{data:x_axis}],series:series_err}});
        }
    });
}

//2、加载某个Tomcat上某时间之后的慢事务数据
function loadSlowReq(time_region){
    $.ajax({
        url: webPath + '/ai/perf/getSlowReq',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载慢事务数据出错!");
        },
        success: function(data){
            var json = eval(data);
            var len = json.length;
            var x_axis = [], data = [],url_arr = [],avgTime_arr = [],reqCount_arr = [];
            for (var i = 0; i < len; i++) {
                x_axis.push(json[i].SNAPSHOT_DATE);
                data.push({url:json[i].URL, avgTime: json[i].AVG_TIME, reqCount: json[i].REQ_COUNT});
                url_arr.push(json[i].URL);
                avgTime_arr.push({url:json[i].URL,value:json[i].AVG_TIME,count:json[i].REQ_COUNT});
                reqCount_arr.push(json[i].REQ_COUNT);
            }
            var legend_slow = ['慢事务'];
            var tooltip_slow =  {formatter: function(params){
                return params[0].data.url + '<br/>平均处理时间：'+ params[0].data.value + 'ms' + '<br/>请求次数：' + params[0].data.count;
            }};
            
            var xAxis_slow = [{type: 'value',axisLabel:{show: true, formatter: '{value} ms'},boundaryGap: [0, 0.01]}];
            var yAxis_slow = [{type: 'category',nameTruncateLength: 1,data:reqCount_arr}];
           // var series = [{type:'line',name:'慢事务',smooth: true,data: data}];
            
            var series_slow = [{type: 'bar',label: {normal: {show: true,position: 'insideRight'}},data:avgTime_arr}];
            //慢事务slowChart
            new MyEcharts($('#slowChart')[0], {type:'bar', option:{legend: {data:legend_slow}, grid:{x:30,x2:10}, tooltip:tooltip_slow,yAxis:yAxis_slow, xAxis:xAxis_slow,series:series_slow}});
        }
    });
}
//3、加载脚本错误统计趋势图
function loadScriptErrorTrend(time_region){
    $("#error-detail-table").dataTable({
        "searching":false,
        "processing": true,
        "serverSide": false,
        "bDestroy": true,
        "tableTools":{
            "aButtons":[]
        },
        "ajax": {
        	 "url": webPath + '/ai/perf/getErrDetailReq',
        	 "type": "POST",
        	 "data": {time_region: time_region},
        	 "dataSrc": function(json) {
                 return json.datas;
             },
        },
        "columns":[{"data":"FST"},
                   {"data":"LST"},
                   {"data":"ERROR_URL"},
                   {"data":"STATUS_CODE"},
                   {"data":"ERROR_COUNT"}],
       "columnDefs": [
                       {
                           "targets": [0],
                           "orderable":false,
                           "render": function ( data, type, full ) {
                        	return new Date(data).toLocaleString();
                             }
                       },
                       {
                           "targets": [1],
                           "orderable":false,
                           "render": function ( data, type, full ) {
                        	  return new Date(data).toLocaleString();
                             }
                       }
                       ] 
    });
}