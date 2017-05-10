<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script>
var webPath;
var paths = document.location.pathname.split("/");
if (paths[0] == '') {
    webPath = "/" + paths[1];
} else {
    webPath = "/" + paths[0];
}
$(function(){
	loadGrayTable();
	loadRuntimeTable();
});

//加载灰度监控table
function loadGrayTable(){
    $("#server-gray-table").dataTable({
        "searching":false,
        "processing": false,
        "serverSide": false,
        "bDestroy": true,
        "tableTools":{
            "aButtons":[]
        },
        "ajax": {
        	 "url": "${ctx}/gray/portal/queryGray?IS_GRAY=" + "1",
        	 "type": "POST",
        	 "dataSrc": function(json) {
                 return json.datas;
             },
        },
        "columns":[{"data":"RES_ID"},
                   {"data":"RES_NAME"},
                   {"data":"IP"},
                   {"data":"PORT"},
                   {"data":"RSP_TIME"},
                   {"data":"CPM"},
                   {"data":"SESSION"},
                   {"data":"ERR_RATIO"}
                   ],
       "columnDefs": [
                       {
                           "targets": [0],
                           "class":"row_no align-center",
                           "orderable":false,
                           "render": function ( data, type, full ) {
                        	return '<input type="radio" name="grayPriKey" onclick="grayChange()" value="'+data+'" />';
                             }
                       }] 
    });
}

//加载生产监控table
function loadRuntimeTable(grayId){
    $("#server-runtime-table").dataTable({
        "searching":false,
        "processing": false,
        "serverSide": false,
        "bDestroy": true,
        "tableTools":{
            "aButtons":[]
        },
        "ajax": {
        	 "url": "${ctx}/gray/portal/queryGray?IS_GRAY=" + "2",
        	 "type": "POST",
        	 "data": {GRAY_ID: grayId},
        	 "dataSrc": function(json) {
                 return json.datas;
             },
        },
        "columns":[{"data":"RES_ID"},
                   {"data":"RES_NAME"},
                   {"data":"IP"},
                   {"data":"PORT"},
                   {"data":"RSP_TIME"},
                   {"data":"CPM"},
                   {"data":"SESSION"},
                   {"data":"ERR_RATIO"}
                   ],
       "columnDefs": [
                       {
                           "targets": [0],
                           "class":"row_no align-center",
                           "orderable":false,
                           "render": function ( data, type, full ) {
                        	return '<input type="radio" name="runtimePriKey" value="'+data+'" />';
                             }
                       }] 
    });
}


//勾选某条灰度环境
function grayChange() {
    var value = $('input[name="grayPriKey"]:checked').val();  //获取某条资源的RES_ID
    loadRuntimeTable(value);
     }

//跳转到CMDB资源管理_blank页面
function toCmdbManager(){
    var url = webPath + '/gray/cmdb/listCmdb';
    window.open(url, 'RES_LIST');
}

//跳转到某条灰度资源的发布页面
function toPublish(){
	var value = $('input[name="grayPriKey"]:checked').val();  //获取某条资源的RES_ID
    if(value==null){
    	toastr['warning']('', '请选择一条待发布的灰度资源');
    }else{
    	//跳转到灰度发布页面
    //	alert(value+"发布到.....");
    	var url = webPath + '/gray/publish/list?RES_ID=' + value;
    	window.open(url, 'PUBLISH_LIST');
    }
}

//某条资源的Apm监控详情页面--灰度
function toApmDetailG(){
	var value = $('input[name="grayPriKey"]:checked').val();  //获取某条--灰度--资源的RES_ID
    if(value==null){
    	toastr['warning']('', '请选择一条需监控的灰度资源');
    }else{
    	//跳转到灰度APM监控页面
        var url = webPath + '/ai/portal/serverconsole?server_id=' + value;
        window.open(url, 'ALARM_LIST');
    }
}

//某条资源的Apm监控详情页面--生产
function toApmDetailR(){
	var value = $('input[name="runtimePriKey"]:checked').val();  //获取某条 --生产--资源的RES_ID
    if(value==null){
    	toastr['warning']('', '请选择一条需监控的生产环境资源');
    }else{
    	//跳转到生产APM监控页面
        var url = webPath + '/ai/portal/serverconsole?server_id=' + value;
        window.open(url, 'ALARM_LIST');
    }
}

</script>
<div class="portlet-title">
	 <div>
		<h3>灰度环境</h3>
	</div>
    <div  style="al">
    	<button  class="btn btn-primary pull-right margin-right-10" type="button" onclick="toCmdbManager()">资源管理</button>
		<button  class="btn btn-primary pull-right margin-right-10" type="button" onclick="toApmDetailG()">监控</button>
		<button  class="btn btn-primary pull-right margin-right-10" type="button" onclick="toPublish()">发布到</button>
	</div>
</div>

<div id="content-container">
	<div class="row">
		<table id="server-gray-table" class="table table-striped table-bordered table-hover" style="table-layout:fixed;cellspacing:0; width:85%">
			<thead>
				<tr>
				    <th style="width:5%;text-align:center;">选择</th>
					<th style="width:10%;">服务名称</th>
					<th style="width:15%;">IP</th>
                    <th style="width:7%;">端口</th>
                    <th style="width:13%;">响应时间(ms)</th>
                    <th style="width:13%;">吞吐量</th>
                    <th style="width:13%;">会话数</th>
                    <th style="width:13%;">错误率</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>

<div>
	<div>
		<h3>生产环境</h3>
	</div>
	<div  style="al">
		<button  class="btn btn-primary pull-right margin-right-10" type="button" onclick="toApmDetailR()">监控</button>
	</div>
</div>

<div id="content-container">
	<div class="row">
		<table id="server-runtime-table" class="table table-striped table-bordered table-hover" style="table-layout:fixed;cellspacing:0; width:85%">
			<thead>
				<tr>
				    <th style="width:5%;text-align:center;">选择</th>
					<th style="width:10%;">服务名称</th>
					<th style="width:15%;">IP</th>
                    <th style="width:7%;">端口</th>
                    <th style="width:13%;">响应时间(ms)</th>
                    <th style="width:13%;">吞吐量</th>
                    <th style="width:13%;">会话数</th>
                    <th style="width:13%;">错误率</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>

