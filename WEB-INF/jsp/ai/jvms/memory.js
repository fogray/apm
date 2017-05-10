$(function(){

    $('#dtSelector ul li a').click(function(){
        var time_region = $(this).attr('value');
        loadMemorySnap(time_region);
    });
    $('#dtSelector ul li a')[0].click();
});


//加载Tomcat内存情况趋势图
function loadMemorySnap(time_region){
    $.ajax({
        url: webPath + '/ai/jvms/getJvmSnap',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载性能区间数据出错!");
        },
        success: function(data){
            var json = eval(data);
            var len = json.length;
            var x_axis = [];
            var hUse_arr = [], hCommitted_arr = [], hMax_arr = [];
            var use_arr = [], committed_arr = [], max_arr = [];
            var gcAll_arr = [], gcPart_arr = [];
            var classCount_arr = [];
            
            var max = 0;
            for (var i = 0; i < len; i++) {
                x_axis.push(json[i].SNAPSHOT_DATE);
                var date = DateTool.parseToDate(json[i].SNAPSHOT_DATE+':00');
                //heap
                hUse_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].HEAP_USED]});
                hCommitted_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].HEAP_COMMITTED]});
                hMax_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].HEAP_MAX]});
                //nonHeap
                use_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].NONHEAP_USED]});
                committed_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].NONHEAP_COMMITTED]});
                max_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].NONHEAP_MAX]});
                //GC
                gcAll_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].GC_MARKSWEEP]});
                gcPart_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].GC_SCAVENGE]});
                //loadClass
                classCount_arr.push({name: json[i].SNAPSHOT_DATE, value:[date, json[i].LOADEDCLASS]});
                
                var t = json[i].AVG_TIME + json[i].REQ_COUNT;
                if (t > max) max = t;
            }
            //Heap memory趋势
            var legend_heap = ['Used','Committed','Max'];
            var xAxis_heap = [{type: 'time'}];
            var yAxis_heap = [{type: 'value', axisLabel:{show: true, formatter: '{value}'}, splitNumber: max >= 4 ? 4:1}];
            var series_heap = [{type:'line',name:'Used',smooth: true, stack:'总时间',data: hUse_arr}
                             ,{type:'line',name:'Committed',smooth: true, stack:'总时间',data: hCommitted_arr}
                            ,{type:'line',name:'Max',smooth: true, stack:'总时间',data: hMax_arr}];
            new MyEcharts($('#heapMemoryChart')[0], {type:'time', option:{legend: {data:legend_heap}, yAxis:yAxis_heap, xAxis:xAxis_heap,series:series_heap}});
           //nonHeap memory趋势
            var legend_nonheap = ['Used','Committed','Max'];
            var xAxis_nonheap = [{type: 'time'}];
            var yAxis_nonheap = [{type: 'value', axisLabel:{show: true, formatter: '{value}'}, splitNumber: max >= 4 ? 4:1}];
            var series_nonheap = [{type:'line',name:'Used',smooth: true, stack:'总时间',data: use_arr}
                             ,{type:'line',name:'Committed',smooth: true, stack:'总时间',data: committed_arr}
                            ,{type:'line',name:'Max',smooth: true, stack:'总时间',data: max_arr}];
            new MyEcharts($('#nonHeapMemoryChart')[0], {type:'time', option:{legend: {data:legend_nonheap}, yAxis:yAxis_nonheap, xAxis:xAxis_nonheap,series:series_nonheap}});
            //GC趋势(全收集和半收集)
            var legend_gc = ['GC_MARKSWEEP(全)','GC_SCAVENGE(半)'];
            var xAxis_gc = [{type: 'time'}];
            var yAxis_gc = [{type: 'value', axisLabel:{show: true, formatter: '{value}'}, splitNumber: max >= 4 ? 4:1}];
            var series_gc = [{type:'line',name:'GC_MARKSWEEP(全)',smooth: true, stack:'总时间',data: gcAll_arr}
                            ,{type:'line',name:'GC_SCAVENGE(半)',smooth: true, stack:'总时间',data: gcPart_arr}];
            new MyEcharts($('#gcChart')[0], {type:'time', option:{legend: {data:legend_gc}, yAxis:yAxis_gc, xAxis:xAxis_gc,series:series_gc}});
            //class Count
            var legend_classCount = ['类个数'];
            var xAxis_classCount = [{type: 'time'}];
            var yAxis_classCount = [{type: 'value', axisLabel:{show: true, formatter: '{value}'}, splitNumber: max >= 4 ? 4:1}];
            var series_classCount = [{type:'line',name:'类个数',smooth: true, stack:'总时间',data: classCount_arr}];
            new MyEcharts($('#classCountChart')[0], {type:'time', option:{legend: {data:legend_classCount}, yAxis:yAxis_classCount, xAxis:xAxis_classCount,series:series_classCount}});
        }
    });
}


