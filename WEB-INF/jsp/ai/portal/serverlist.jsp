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
    $("#server-query-table").dataTable({
        "searching":false,
        "processing": false,
        "serverSide": false,
        "bDestroy": false,
        "tableTools":{
            "aButtons":[]
        },
        "ajax": {
        	 "url": "${ctx}/ai/portal/queryServer",
        	 "type": "POST",
        	 "dataSrc": function(json) {
                 return json.datas;
             },
        },
        "columns":[{"data":"RES_NAME"},
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
                           "orderable":false,
                           "render": function ( data, type, full ) {
                        	return '<a style="color:#ffffff" onclick="forAlarmList(' + '\'' +full.RES_ID +'\'' + ')">'+ data +'</a>';
                             }
                       }] 
    });
    
});

function forAlarmList(resid){
    var url = webPath + '/ai/portal/serverconsole?server_id=' + resid;
    window.open(url, 'ALARM_LIST');
}

function resManager(){
    var url = webPath + '/ai/cmdb/listCmdb';
    window.open(url, 'RES_LIST');
}
</script>
<div class = "col-md-12">
		<div class = "col-md-10">
			<h3>Tomcat服务</h3>
		</div>
	    <div class = "col-md-2" style="al">
			<button  class="btn btn-primary pull-right margin-right-20" type="button" onclick="resManager()" >资源管理</button>
		</div>
</div>

<div id="content-container">
	<div class="row">
		<table id="server-query-table" class="table table-striped table-bordered table-hover" style="table-layout:fixed;cellspacing:0; width:99%">
			<thead>
				<tr>
					<th style="width:15%;">服务名称</th>
					<th style="width:15%;">IP</th>
                    <th style="width:8%;">端口</th>
                    <th style="width:12%;">平均响应时间(ms)</th>
                    <th style="width:12%;">每分请求数</th>
                    <th style="width:12%;">会话数</th>
                    <th style="width:12%;">错误率(%)</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>