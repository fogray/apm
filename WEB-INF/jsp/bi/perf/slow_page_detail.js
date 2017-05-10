$(function(){
    var domain = $('input[name="domain"]').val();
    var pageUrl = $('input[name="page_url"]').val();
    $('#popup-win .modal-title',$(window.parent.document)).html('<span>域名：</span><em>'+domain+'</em><span>访问页面：</span><em>'+pageUrl+'</em>');
    
    drawPageTimeline();
    loadResourceType();
    loadResourceDomain();
    loadResourceTbl();
});

function drawPageTimeline(){
    var tooltip = {formatter:function(params){
        var tar = params[1];
        return tar.name + '<br/>' +tar.seriesName+': '+tar.value + ' ms';
    }};
    var xAxis = {type: 'value', axisLabel:{textStyle:{color:'#ffffff'}}};
    var yAxis = {type: 'category', splitLine:{show: true}, axisLabel:{textStyle:{color:'#ffffff'}}
                , data:['Load Event', 'Resource', 'Dom', 'Response', 'Request', 'Connect', 'DNS', 'Cache', 'Redirect']};
    var rd = parseInt($('#redirectTime').val(), 10), cache = parseInt($('#cacheTime').val(), 10)
        , dns = parseInt($('#dnsTime').val(), 10), cn = parseInt($('#connectTime').val(), 10), req = parseInt($('#requestTime').val(), 10)
        , rep = parseInt($('#responseTime').val(), 10), dom = parseInt($('#domParseTime').val(), 10)
        , res = parseInt($('#resourceTime').val(), 10), le = parseInt($('#loadEventTime').val(), 10);
    var series = [{name:'',type:'bar', stack:'耗时'
                    ,itemStyle:{normal:{barBorderColor:'rgba(0,0,0,0)',color:'rgba(0,0,0,0)'},emphasis:{barBorderColor:'rgba(0,0,0,0)',color:'rgba(0,0,0,0)'}}
                    ,data:[rd+cache+dns+cn+req+rep+dom+res, rd+cache+dns+cn+req+rep+dom, rd+cache+dns+cn+req+rep, rd+cache+dns+cn+req, rd+cache+dns+cn, rd+cache+dns, rd+cache, rd, 0]}
                  ,{name:'耗时',type:'bar', stack:'耗时'
                    ,itemStyle:{normal:{color:'#0FE1DF', label:{show:true,position: 'right'}},emphasis:{color:'#0BF6F3'}}
                      ,data:[le,res,dom,rep,req,cn,dns,cache,rd]}];
    var toolbox = {show:true,feature:{dataView:{show:true}}};
    new MyEcharts($('#perfTimeLineChart')[0], {type:'bar', option:{tooltip: tooltip,toolbox:toolbox, xAxis: xAxis, yAxis: yAxis, series: series}});
}

//按照标签类型统计性能
function loadResourceType(){
    var url = webPath + '/bi/perf/getResTypeStat';
    $.ajax({
        url: url,
        data: {req_id: $('input[name="req_id"]').val()},
        error: function(e, h, r){
            toastr['warning'](e, "加载标签类型统计数据出错!");
        },
        success: function(data){
            var jsonData = eval(data), len = jsonData.length, legend = [], series = [];
            for (var i = 0; i < len; i++) {
                legend.push(jsonData[i].INDICATOR_TYPE);
                series.push({name: jsonData[i].INDICATOR_TYPE, type: 'bar',barMaxWidth:30, data:[parseInt(jsonData[i].AVG_TIME, 10)]});
            }
            new MyEcharts($('#indTypeChart')[0], {type: 'bar', option:{legend:{data: legend}, xAxis: [{axisLabel:{show: false}}], yAxis:[{splitNumber:4,axisLabel:{formatter:'{value} ms'}}], series:series}});
        }
    });
}

//按照域名统计性能
function loadResourceDomain(){
    var url = webPath + '/bi/perf/getResDomainStat';
    $.ajax({
        url: url,
        data: {req_id: $('input[name="req_id"]').val()},
        error: function(e, h, r){
            toastr['warning'](e, "加载域名统计数据出错!");
        },
        success: function(data){
            var jsonData = eval(data), len = jsonData.length, legend = [], series = [];
            for (var i = 0; i < len; i++) {
                legend.push(jsonData[i].DOMAIN);
                series.push({name: jsonData[i].DOMAIN, type: 'bar',barMaxWidth:30, data:[parseInt(jsonData[i].AVG_TIME, 10)]});
            }
            new MyEcharts($('#domainChart')[0], {type: 'bar', option:{legend:{data: legend}, xAxis: [{axisLabel:{show: false}}], yAxis:[{splitNumber:4,axisLabel:{formatter:'{value} ms'}}], series:series}});
        }
    });
}

//加载资源列表
function loadResourceTbl(){
    var url = webPath + '/bi/perf/getResourceList';
    var $tbody = $('#tblResource tbody');
    $tbody.html('');
    $.ajax({
        url: url,
        data: {req_id: $('input[name="req_id"]').val()},
        error: function(e, h, r){
            toastr['warning'](e, "加载资源列表出错!");
        },
        success: function(data){
            var jsonData = eval(data), len = jsonData.length;
            for (var i = 0; i < len; i++) {
                var tr = '<tr>'
                            + '<td>'+(i+1)+'</td>'
                            + '<td>'+jsonData[i].ENTRY_NAME+'</td>'
                            + '<td>'+jsonData[i].TOTAL_TIME+'</td>'
                            + '<td>'+jsonData[i].INDICATOR_TYPE+'</td>'
                            + '</tr>';
                $tbody.append(tr);
            }
        }
    });
}