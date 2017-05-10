<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>
<head>
<title>灰度环境资源管理</title>

</head>

<% String path = request.getContextPath(); %>

<script type="text/javascript">
$(document).ready(function(){
//查询
$("#searchbtn").click(function() {
	forSearchForm.submit();
});

//转到新增页面
$("#forInsertBtn").click(function() {
	window.location.href="forinsert";
});
//转到更新页面
$("#forUpdateBtn").click(function() {
	var checkRadio = $('input[name="RES_ID"]:checked');
	if(checkRadio.length>0){
		var methodStr =checkRadio.val();
		var $tr=$("input[value="+"'"+methodStr+"'"+"]").closest("tr");
		if($tr.hasClass("danger")){
            toastr['warning']('', '此任务已被删除');
			return;
		}
		window.location.href="forupdate?methodStr="+methodStr;
	}else{
        toastr['warning']('', '请至少选择一条记录');
	}
});


//删除一条纪录
$("#toDeleteBtn").click(function() {
	var checkRadio = $('input[name="RES_ID"]:checked');
	var methodStr =checkRadio.val();
	var $tr=$("input[value="+"'"+methodStr+"'"+"]").closest("tr");
	if($tr.hasClass("danger")){
        toastr['warning']('', '此任务已被删除');
		return;
	}
	if(methodStr){
		if(confirm("您确定要删除选中的纪录吗？ 删除操作不可恢复！")){
		$.post("delete?methodStr="+methodStr,function(data){
			if(data=="success"){
                toastr['success']('', '任务删除成功');
				$tr.addClass("danger");
			}else{
                toastr['warning']('', '删除失败，请联系系统管理员');
			}
		},"text");
		}
	}else{
        toastr['warning']('', '请至少选择一条记录');
	}
	
});

//测试连接
$("#testConnBtn").click(function() {
	var checkRadio = $('input[name="RES_ID"]:checked');
	var methodStr =checkRadio.val();
	if(methodStr){
		$.post("testConn?methodStr="+methodStr,function(data){
			if(data=="success"){
                toastr['success']('', '测试连接成功');
			}else{
                toastr['warning']('', '测试连接失败 ');
			}
		},"text");
	}else{
        toastr['warning']('', '请选择一条记录');
	}
});


//前台查询框
$("#flexme1").dataTable({
    "tableTools":{
        "aButtons":[]
    }
});


});
//转到明细页面
function forDetail(methodStr){
	window.location.href = "detail?methodStr="+methodStr;
}
</script>
<div class="row margin-top-20">
    <div class="col-md-12">
        <div class="light bordered">
        	<div class="portlet-title">
                <div class="caption">
                    <i class="icon-settings font-dark"></i>
                    <span class="caption-subject bold" style="font-size:26px;">灰度环境资源管理</span>
                </div>
		       	<button id="toDeleteBtn" class="btn btn-primary pull-right margin-right-10" type="button">删除</button>
				<button id="forUpdateBtn" class="btn btn-primary pull-right margin-right-10" type="button">编辑</button>
				<button id="forInsertBtn" class="btn btn-primary pull-right margin-right-10" type="button">新增</button>
				<button id="testConnBtn" class="btn btn-primary pull-right margin-right-10" type="button">测试连接</button>
            </div>

	<div class="portlet-body">
		<table id="flexme1"
			class="table table-striped table-bordered table-hover"
			style="table-layout: fixed; cellspacing: 0; width: 85%">
			<thead>
				<tr>
					<th width="5%" style="text-align: center;" index="true">选择</th>
					<th width="15%" style="text-align: center;" index="true">资源名称</th>
					<th width="15%" style="text-align: center;" index="true">IP</th>
					<th width="6%" style="text-align: center;">端口</th>
					<th width="8%" style="text-align: center;">环境类型</th>
					<th width="10%" style="text-align: center;">所属灰度</th>
					<th width="5%" style="text-align: center;">组号</th>
					<th width="23%" style="text-align: center;">Tomcat路径</th>
					<th width="10%" style="text-align: center;">应用上下文</th>
				</tr>
			</thead>

			<tbody class="dno">
				<c:forEach items="${cmdbList}" var="listObj" varStatus="i">
					<tr>
						<c:set var="pkvalue"
							value="${listObj.RES_ID}" />
						<td style="text-align:center"><input name="RES_ID"
							type="radio" id="${pkvalue}" value="${pkvalue}"></input></td>
						<td style="text-align: center"><a style="cursor: pointer;color:#ffffff" onclick='forDetail("${pkvalue}")'>${listObj.RES_NAME}</a>
						</td>
						<td style="text-align: center">${listObj.IP}</td>
						<td style="text-align: center">${listObj.PORT}</td>
						<td style="text-align: center">
						    <c:if test="${listObj.IS_GRAY eq '1' }">灰度</c:if>
							<c:if test="${listObj.IS_GRAY eq '2' }">生产</c:if>
						</td>
						<td style="text-align: center">${listObj.GRAY_NAME}</td>
						<td style="text-align: center">${listObj.GROUP_NO}</td>
						<td style="text-align: center">${listObj.TOMCAT_BASEDIR}</td>
						<td style="text-align: center">${listObj.CONTEXT}</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		</div>

        </div>
    </div>
</div>