var time_region = null;
$(function(){

    $('#dtSelector ul li a').click(function(){
        time_region = $(this).attr('value');
        refresh();
    });
});

//刷新
function refresh(timeregion){
    loadXhrList();
}
//加载异步请求列表
function loadXhrList(){
    var $wrapObj = $('#xhrList');
    $wrapObj.html('');
    $('#xhrTimelineChart').html('');
    $('#tblXhrPage tbody').html('');
    $.ajax({
        url: webPath + '/bi/xhr/getXhrList',
        method: 'POST',
        data: {time_region: time_region},
        error: function(e, h, r){
            toastr['warning'](e, "加载异步请求列表出错!");
        },
        success: function(data){
            var json = eval(data);
            ajaxSuccess(json, $wrapObj, '没有异步请求数据', function(){
                var len = json.length, div = '';
                var sw = parseFloat($wrapObj.css('width')), st = 1;
                for (var i = 0; i < len; i++) {
                    var t = parseInt(json[i].AVG_TIME, 10);
                    if (i == 0) st = t;
                    var w = (sw-40)*(t/st), domain=json[i].DOMAIN, respUrl = json[i].RESP_URL;
                    div += PropgressTool.init(w, respUrl, (t >= 100 ? Math.round(t/10)/100 + 's' : t + 'ms'), domain+respUrl, {'data-domain':domain, 'data-respurl': respUrl});
                }
                $wrapObj.html(div);
                
                //默认加载时间消耗最大的访问页面性能趋势信息：性能区间趋势图、访问量以及响应时间趋势图
                if ($('.pages', $wrapObj).length > 0) {
                    //访问页面列表
                    $('.pages').each(function(){
                        $(this).click(function(){
                            $('.pages', $(this).parent()).removeClass('selected');
                            $(this).addClass('selected');
                            var d = $(this).attr('data-domain'), r = $(this).attr('data-respurl');
                            forXhrInfo(d, r);
                        });
                    });
                    $($('.pages', $wrapObj)[0]).click();
                }
            });
        }
    });
}

//左侧异步请求列表单击事件
function forXhrInfo(domain, respUrl){
    loadXhrTimeTrend(domain, respUrl);
    loadXhrPages(domain, respUrl);
        
}

//加载异步请求消耗时间和访问量
function loadXhrTimeTrend(domain, respUrl){
    var $wrapObj = $('#xhrTimelineChart');
    if (echarts.getInstanceByDom($wrapObj[0])) {
            echarts.dispose($wrapObj[0]);
    }
    $wrapObj.html('');
    $.ajax({
        url: webPath + '/bi/xhr/getXhrTrend',
        method: 'POST',
        data: {time_region: time_region, domain:domain, resp_url: respUrl},
        error: function(e, h, r){
                toastr['warning'](e, "加载异步请求性能数据出错!");
        },
        success: function(data){
            var json = eval(data);
            var len = json.length;
            var x_axis = [],pv_data = [],time_data=[], max1=0, max2=0;
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
                        return d+' '+v.substring(9,14);
                    }
                    if (h != preH) {
                        preH = h;
                        return v.substring(9, 14);
                    }
                    return '';
                    
            }}}];
            var series = [{type:'bar',barMaxWidth:30,yAxisIndex:1,name:'PV',data: pv_data},{type:'line',name:'响应时间',yAxisIndex:0,smooth: true,data: time_data},];
            new MyEcharts($wrapObj[0], {type:'line', option:{legend: {data:legend},grid: {x:60,x2:40,y:10,y2:60}, xAxis:xAxis,yAxis:yAxis,series:series}});
        }
    });
}

//加载异步请求调用页面列表
function loadXhrPages(domain, respUrl){
    var $tblXhrPage = $('#tblXhrPage tbody');
    $tblXhrPage.html('');
    $.ajax({
        url: webPath+'/bi/xhr/getXhrPages',
        data: {domain: domain, resp_url: respUrl},
        error: function(e, h, r) {
            toastr['warning'](e, '加载异步请求调用页面出错');
        },
        success: function(data){
            var jsonData = eval(data), len = jsonData.length;
            for(var i = 0; i < len; i++) {
                var tr = '<tr>'
                            + '<td>' +(i+1)+ '</td>'
                            + '<td>' +jsonData[i].PAGE_URL+ '</td>'
                            + '<td>' +jsonData[i].AVG_TIME+ '</td>'
                            + '<td>' +jsonData[i].PPM+ '</td>'
                            + '<td>' +jsonData[i].REQ_COUNT+ '</td>'
                        + '</tr>';
                $tblXhrPage.append(tr);
            }
        }
    });
}