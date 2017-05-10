var time_region = null;
$(function(){
	
    $('#dtSelector ul li a').click(function(){
        time_region = $(this).attr('value');
        refresh();
    });
	
});

function refresh(){
	loadBrowserTrendData();
	loadBrowserStat();
	loadClientRatioStat();
}

function loadBrowserTrendData(){
	var $wrapObj = $('#browserTrendChart');
	$wrapObj.html('');
	var url = webPath + '/bi/analyse/client/getBrowserTrendData';
	$.ajax({
		url: url,
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, '加载浏览器类型趋势数据失败');
		},
		success: function(data) {
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $wrapObj, '无浏览器统计数据', function(){
				var len = jsonData.length, series=[], xAxis=[], legend=[], preBroName='',max=0;
				for( var i = 0; i < len; i++) {
					var curBroName = jsonData[i].BROWSER_NAME, avgTime = parseInt(jsonData[i].AVG_TIME,10);
					if (preBroName != curBroName) {
						series.push({name:curBroName, type:'line',stack:'-',itemStyle: {normal: {areaStyle: {type: "default"}}},data:[]})
						preBroName = curBroName;
						legend.push({name: curBroName, icon:'circle'});
					}
                	var date = DateTool.parseToDate(jsonData[i].SNAPSHOT_DATE+':00');
					series[series.length-1].data.push({name: jsonData[i].SNAPSHOT_DATE, value:[date, avgTime]});
					max = max < avgTime ? avgTime : max;
				}
				var xAxis = [{type:'time'}],
				yAxis = [{type:'value', axisLabel:{show: true, formatter: '{value} ms'}, splitNumber: max >= 4 ? 4:1}];
				new MyEcharts($wrapObj[0], {type:'time', option:{xAxis:xAxis, legend:{data:legend}, yAxis:yAxis, series: series}});
			});
		}
	});
}

function loadBrowserStat(){
	var $wrapObj = $('#broTypeChart');
	$wrapObj.html('');
	var url = webPath + '/bi/analyse/client/getBrowserStat';
	$.ajax({
		url: url,
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, '加载浏览器统计数据失败');
		},
		success: function(data) {
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $wrapObj, '无浏览器统计数据', function(){
				var len = jsonData.length, series_data=[], y_category=[], legend=[], preBroName='',max=0;
				for( var i = 0; i < len; i++) {
					var broName = jsonData[i].BROWSER_NAME, broVer = jsonData[i].BROWSER_VERSION, v = jsonData[i].REQ_COUNT;
					var bro = broName + ' ' + broVer;
					y_category.push(bro);
					series_data.push(parseInt(v, 10));
				}
				max = Math.max.apply(null, series_data);
				var tooltip = {trigger:'item', formatter: function(param){
					return param.name + ': ' + param.value + '次';
				}}
				,xAxis = [{type:'value',position:'top', splitNumber: max >= 4 ? 4 : max}]
				,yAxis = [{type:'category', data: y_category}];
				new MyEcharts($wrapObj[0], {type:'bar', option:{tooltip:tooltip,grid:{x:70,y:40,x2:10,y2:10}, xAxis:xAxis, yAxis:yAxis, series:[{type:'bar',data: series_data}]}})
			});
		}
	});
}

function loadClientRatioStat(){
	var $wrapObj = $('#clientRatioChart');
	$wrapObj.html('');
	var url = webPath + '/bi/analyse/client/getClientRatioStat';
	$.ajax({
		url: url,
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, '加载客户端分辨率数据失败');
		},
		success: function(data) {
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $wrapObj, '无客户端分辨率统计数据', function(){
				var len = jsonData.length, series_data=[], y_category=[], legend=[], preBroName='',max=0;
				for( var i = 0; i < len; i++) {
					var scr_w = jsonData[i].SCR_WIDTH, scr_h = jsonData[i].SCR_HEIGHT, v = jsonData[i].REQ_COUNT;
					var scr = scr_w + 'x' + scr_h;
					y_category.push(scr);
					series_data.push(parseInt(v, 10));
				}
				max = Math.max.apply(null, series_data);
				var tooltip = {trigger:'item', formatter: function(param){
					return param.name + ': ' + param.value + '次';
				}}
				,xAxis = [{type:'value',position:'top', splitNumber: max >= 4 ? 4 : max}]
				,yAxis = [{type:'category', data: y_category}];
				new MyEcharts($wrapObj[0], {type:'bar', option:{tooltip:tooltip,grid:{x:70,y:40,x2:10,y2:10}, xAxis:xAxis, yAxis:yAxis, series:[{type:'bar',data: series_data}]}})
			});
		}
	});
}