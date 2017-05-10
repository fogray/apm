$(function(){

    $('#dtSelector ul li a').click(function(){
        var time_region = $(this).attr('value');
        loadThreadSnap(time_region);
    });
    $('#dtSelector ul li a')[0].click();
});


//加载Tomcat线程和会话情况趋势图
function loadThreadSnap(time_region){
    $.ajax({
        url: webPath + '/ai/jvms/getThreadSnap',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载性能区间数据出错!");
        },
        success: function(data){
            var json = eval(data);
            var len = json.length;
            var x_axis = [];
            var busy_arr = [], current_arr = [], max_arr = [];
            var threadCount_arr = [];
            var sessionCount_arr = [];
            
            var max = 0;
            for (var i = 0; i < len; i++) {
                x_axis.push(json[i].SNAPSHOT_DATE);
                var date = DateTool.parseToDate(json[i].SNAPSHOT_DATE+':00');
                //ThreadPool
                busy_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].THREAD_BUSY]});
                current_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].THREAD_CURRENT]});
                max_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].THREAD_MAX]});
                //thread Count
                threadCount_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].THREAD_COUNT]});
                //session Conut
                sessionCount_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].SESSIONS_ACTIVE]});
                
                var t = json[i].AVG_TIME + json[i].REQ_COUNT;
                if (t > max) max = t;
            }

           //web线程池
            var legend_pool = ['忙碌','当前','最大'];
            var xAxis_pool = [{type: 'time'}];
            var yAxis_pool = [{type: 'value', axisLabel:{show: true, formatter: '{value}'}, splitNumber: max >= 4 ? 4:1}];
            var series_pool = [{type:'line',name:'忙碌',smooth: true, stack:'总时间',data: busy_arr}
                             ,{type:'line',name:'当前',smooth: true, stack:'总时间',data: current_arr}
                            ,{type:'line',name:'最大',smooth: true, stack:'总时间',data: max_arr}];
            new MyEcharts($('#threadPoolChart')[0], {type:'time', option:{legend: {data:legend_pool}, yAxis:yAxis_pool, xAxis:xAxis_pool,series:series_pool}});
            //JVM总线程数
            var legend_thCount = ['JVM线程个数'];
            var xAxis_thCount = [{type: 'time'}];
            var yAxis_thCount = [{type: 'value', axisLabel:{show: true, formatter: '{value}'}, splitNumber: max >= 4 ? 4:1}];
            var series_thCount = [{type:'line',name:'JVM线程个数',smooth: true, stack:'总时间',data: threadCount_arr}];
            new MyEcharts($('#threadCountChart')[0], {type:'time', option:{legend: {data:legend_thCount}, yAxis:yAxis_thCount, xAxis:xAxis_thCount,series:series_thCount}});
            //容器总活动会话数
            var legend_session = ['活动会话数'];
            var xAxis_session  = [{type: 'time'}];
            var yAxis_session  = [{type: 'value', axisLabel:{show: true, formatter: '{value}'}, splitNumber: max >= 4 ? 4:1}];
            var series_session  = [{type:'line',name:'活动会话数',smooth: true, stack:'总时间',data: sessionCount_arr}];
            new MyEcharts($('#sessionChart')[0], {type:'time', option:{legend: {data:legend_session}, yAxis:yAxis_session, xAxis:xAxis_session,series:series_session}});
        }
    });
}