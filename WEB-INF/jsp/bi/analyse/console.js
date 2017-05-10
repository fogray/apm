var time_region = null;
$(function(){
	
    $('#dtSelector ul li a').click(function(){
        time_region = $(this).attr('value');
        refresh();
    });
	
});

function refresh(){

	loadApdexChart();
	loadPerfSectionGraph();

	loadOsPie();
	loadIspPie();
	loadBrowserTypePie();
	loadTopPagePie();
}

//加载默认用户体验Apdex统计分析柱状图
function loadApdexChart(){
	var $chartObj = $('#apdexChart');
	$chartObj.html('');
	$.ajax({
		url: webPath + '/bi/analyse/getApdexStat',
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, "加载Apdex满意度统计数据出错!");
		},
		success: function(data){
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $chartObj, '没有Apadex统计数据', function(){
            	var len = jsonData.length;
				var statis_count = parseInt(jsonData[0].SATISFIED_COUNT,10), toler_count = parseInt(jsonData[0].TOLERATE_COUNT,10)
				, dis_statis_count = parseInt(jsonData[0].DIS_SATISFIED_COUNT,10);
				var max = statis_count > toler_count ? statis_count : toler_count, max = max < dis_statis_count ? dis_statis_count: max;
				var tooltip = {trigger:'axis', formatter: function(param){
					var len = param.length, text = '';
					for (var i = 0; i < len; i++) {
						text += (i == 0?'':'<br>') + param[i].seriesName + ': ' + param[i].value +'次';
					}
					return text;
				}};
				new MyEcharts($chartObj[0], {type:'bar'
											 , option:{legend:{data:['满意','可容忍','不满意']}
											 , tooltip: tooltip
											 , xAxis:[{show:false,data:['满意','可容忍','不满意']}]
											 , yAxis:[{splitNumber: max >= 4 ? 4 : 1}]
											 , series:[{name:'满意',type:'bar',barMaxWidth:60,data:[statis_count]}
														,{name:'可容忍',type:'bar',barMaxWidth:60,data:[toler_count]}
														,{name:'不满意',type:'bar',barMaxWidth:60,data:[dis_statis_count]}]}});
			});
		}
	});
}

//加载性能区间分布图
function loadPerfSectionGraph(){
	var $chartObj = $('#perfSecGraphChart');
	$chartObj.html('');
	$.ajax({
		url: webPath + '/bi/analyse/getPerfSectionGraph',
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, "加载性能区间统计数据出错!");
		},
		success: function(data){
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $chartObj, '没有页面性能统计数据', function(){
				var series = [], len = jsonData.length;
				for (var i = 0; i < len; i++) {
					series.push({name:'请求排队',type:'bar',barWidth:60,stack:'-',data:[parseInt(jsonData[i].QUEUEN_TIME, 10)]});
					series.push({name:'后端处理',type:'bar',barWidth:60,stack:'-',data:[parseInt(jsonData[i].REQUEST_TIME, 10)]});
					series.push({name:'响应返回',type:'bar',barWidth:60,stack:'-',data:[parseInt(jsonData[i].RESPONSE_TIME, 10)]});
					series.push({name:'DOM解析',type:'bar',barWidth:60,stack:'-',data:[parseInt(jsonData[i].DOM_PARSE_TIME, 10)]});
					series.push({name:'资源加载',type:'bar',barWidth:60,stack:'-',data:[parseInt(jsonData[i].RESOURCE_TIME, 10)]});
				}
				var legend = ['请求排队','后端处理','响应返回','DOM解析','资源加载'];
				var xAxis = [{type:'value'}], yAxis = [{type:'category',axisLabel:{show:false},data:['耗时']}];
				var tooltip = {trigger: 'item', formatter: function(param){
					var seriesName = param.seriesName, name = param.name, value = param.value;
					return seriesName + '<br/>' + name + ': ' + value + ' ms';
				}};
				new MyEcharts($chartObj[0], {type:'bar', option:{tooltip:tooltip,legend:{data:legend},grid:{x:10,y:10,x2:10,y2:50},xAxis: xAxis, yAxis: yAxis, series: series}});
			});
		}
	});
}

//加载用户特性饼状图：系统
function loadOsPie(){
	var $wrapObj = $('#osStatChart');
	$wrapObj.html('');
	$.ajax({
		url: webPath + '/bi/analyse/getOsStat',
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, "加载操作系统统计数据出错!");
		},
		success: function(data){
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $wrapObj, '无操作系统统计数据', function(){
				var data = [] ,legend= [], len = jsonData.length;
				for (var i = 0; i < len; i++) {
					var os = jsonData[i].OS_NAME + ' ' + jsonData[i].OS_VERSION;
					legend.push(os);
					data.push({name: os, value: parseInt(jsonData[i].REQ_COUNT)});	 
				}
				var tooltip = {trigger:'item', formatter:function(param) {
					var name = param.name, value = param.value;
					return name+'<br/>'+'访问次数: '+value;
				}};
				new MyEcharts($wrapObj[0], {type:'pie', option:{tooltip:tooltip,legend:{data:legend}, series:[{data:data}]}});
			});
		}
	});
}

//加载用户特性饼状图：运营商
function loadIspPie(){
	var $wrapObj = $('#ispStatChart');
	$wrapObj.html('');
	$.ajax({
		url: webPath + '/bi/analyse/getIspStat',
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, "加载运营商统计数据出错!");
		},
		success: function(data){
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $wrapObj, '无运营商统计数据', function(){
				var data = [] ,legend= [], len = jsonData.length;
				for (var i = 0; i < len; i++) {
					var isp = jsonData[i].OPERATOR_NAME;
					legend.push(isp);
					data.push({name: isp, value: parseInt(jsonData[i].REQ_COUNT)});	 
				}
				var tooltip = {trigger:'item', formatter:function(param) {
					var name = param.name, value = param.value;
					return name+'<br/>'+'访问次数: '+value;
				}};
				new MyEcharts($wrapObj[0], {type:'pie', option:{tooltip:tooltip,legend:{data:legend}, series:[{data:data}]}});
			});
		}
	});
}

//加载用户特性饼状图：浏览器
function loadBrowserTypePie(){
	var $wrapObj = $('#browserStatChart');
	$wrapObj.html('');
	$.ajax({
		url: webPath + '/bi/analyse/getBrowserTypeStat',
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, "加载浏览器统计数据出错!");
		},
		success: function(data){
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $wrapObj, '无浏览器统计数据', function(){
				var data = [] ,legend= [], len = jsonData.length;
				for (var i = 0; i < len; i++) {
					var bro_name = jsonData[i].BROWSER_NAME;
					legend.push(bro_name);
					data.push({name: bro_name, value: parseInt(jsonData[i].REQ_COUNT)});	 
				}
				var tooltip = {trigger:'item', formatter:function(param) {
					var name = param.name, value = param.value;
					return name+'<br/>'+'访问次数: '+value;
				}};
				new MyEcharts($wrapObj[0], {type:'pie', option:{tooltip:tooltip,legend:{data:legend}, series:[{data:data}]}});
			});
		}
	});
}

//加载用户特性饼状图：访问页面访问次数TOP5
function loadTopPagePie(){
	var $wrapObj = $('#topPageStatChart');
	$wrapObj.html('');
	$.ajax({
		url: webPath + '/bi/analyse/getTopPageStat',
		data: {time_region: time_region},
		error: function(e, h, r) {
			toastr['warning'](e, "加载访问页面TOP统计数据出错!");
		},
		success: function(data){
			var jsonData = eval(data);
            ajaxSuccess(jsonData, $wrapObj, '无页面请求统计数据', function(){
				var data = [] ,legend= [], len = jsonData.length;
				for (var i = 0; i < len; i++) {
					var page_url = jsonData[i].PAGE_URL;
					legend.push(page_url);
					data.push({name: page_url, value: parseInt(jsonData[i].REQ_COUNT)});	 
				}
				var tooltip = {trigger:'item', formatter:function(param) {
					var name = param.name, value = param.value;
					return name+'<br/>'+'访问次数: '+value;
				}};
				new MyEcharts($wrapObj[0], {type:'pie', option:{tooltip:tooltip,legend:{data:legend}, series:[{data:data}]}});
			});
		}
	});
}

