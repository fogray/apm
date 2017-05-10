<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<title>资源明细</title>

<% String path = request.getContextPath(); %>
<script type="text/javascript">
$(document).ready(function(){
	securityChange();
	//转到更新页面
	$("#forUpdateBtn").on("click",function(){
		var primkeyObj = $("#PRIMKEY");
		var methodStr =primkeyObj.val();
		window.location.href="forupdate?methodStr="+methodStr;
	});
	//返回
	$("#forReturnbtn").on("click",function(){
		window.location.href="listCmdb";
	});
	//测试连接
	$("#testConnBtn").on("click",function(){
		var primkeyObj = $("#PRIMKEY");
		var methodStr =primkeyObj.val();
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
	securityChange();
});


//是否启用安全性
function securityChange() {
    var value = $('input[name="IS_START_SECURITY"]:checked').val();  //取单选值
       if (value == '0') {
           $("input[name='ACCESS_NAME']").val("");
           $("input[name='ACCESS_PWD']").val("");  
           $("#userDiv").css("display", "none");
           $("#passwdDiv").css("display", "none");
       } else if (value == '1'){
           $("#userDiv").css("display", "");
           $("#passwdDiv").css("display", "");
       }
     }
</script>
<div id="content-header">
		<h1>资源明细</h1>
		<div id="page-btn-container" class="page-btn-container">
		   <button id="testConnBtn" type="button"  class="btn btn-primary">测试连接</button>
		   <button id="forUpdateBtn" type="button"  class="btn btn-primary">编辑</button>
	       <button id="forReturnbtn" type="button"  class="btn btn-primary">返回</button>
		</div>
</div>

	<div id="content-container">
	<div class="row">
		<div class="col-sm-8">
		<form id="cmdbInfoForm"  method="post" action="update" class="form sl_table" data-parsley-validate>
		   <div class="form-group">
	              <label>Tomcat资源名称：</label>
	              <input name="RES_NAME" disabled class="form-control" type="text" value="${quartzLine.RES_NAME}"  data-parsley-required />
	              <input type="hidden"  class="required" name="RES_ID" id="PRIMKEY" maxlength="40" style="width: 30%;"  value="${quartzLine.RES_ID}" />
	      </div>
		   <div class="form-group">
	              <label>IP：</label>
	              <input name="IP" disabled class="form-control" type="text" value="${quartzLine.IP}" readonly data-parsley-required />
	      </div>
		   <div class="form-group">
	              <label>端口：</label>
	              <input name="PORT" disabled class="form-control" type="text" value="${quartzLine.PORT}" readonly data-parsley-required />
	      </div>
		   <div class="form-group">
	              <label>是否启用安全性：</label>
	              <br>
	              <input type="radio" disabled name="IS_START_SECURITY" value="1" <c:if test="${quartzLine.IS_START_SECURITY eq '1' }">checked</c:if> onclick="securityChange()" />是
     			  <input type="radio" disabled  name="IS_START_SECURITY" value="0" <c:if test="${quartzLine.IS_START_SECURITY eq '0' }">checked</c:if> onclick="securityChange()" />否
	      </div>
		   <div class="form-group"  id="userDiv">
	              <label>用户名：</label>
	              <input name="ACCESS_NAME" disabled class="form-control" type="text" value="${quartzLine.ACCESS_NAME}"  data-parsley-required />
	      </div>			
		   <div class="form-group"  id="passwdDiv">
	              <label>密码：</label>
	              <input name="ACCESS_PWD" disabled class="form-control" type="password" value="${quartzLine.ACCESS_PWD}"/>
	      </div>
	       <div class="form-group">
	              <label>是否监控：</label>
	              <br>
	              <input type="radio" disabled name="IS_MONITOR" value="1" <c:if test="${quartzLine.IS_MONITOR eq '1' }">checked</c:if> />是
     			  <input type="radio" disabled  name="IS_MONITOR" value="0" <c:if test="${quartzLine.IS_MONITOR eq '0' }">checked</c:if> />否
	      </div>

		</form>
		</div>
		<div class="col-sm-4">
			<div id="helpPortlet" class="portlet">
				<div class="portlet-header">
					<h4>使用帮助</h4>
				</div> 
				<div class="portlet-content" style="max-height:480px">
					<p>无</p>
				</div> 
			</div>
		</div>
	</div>
</div>