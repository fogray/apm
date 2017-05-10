<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<title>资源编辑</title>

<script type="text/javascript" src="${ctx}/skins/global/plugins/jquery-validation/js/jquery.validate.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	securityChange();
	//保存修改后的资源
	$("#savebtn").on("click",function(){
			$('#cmdbInfoForm').submit();
	});
	
	//返回
	$("#forReturn").on("click",function(){
		window.location.href="listCmdb";
	});
	
    //表单校验
    $('#cmdbInfoForm').validate({
         rules: {
        	 RES_NAME: {
                 maxlength: 50,
                 required: true
             },
             IP: {
                 required: true,
                 maxlength: 40
             },
             PORT: {
                 required: true,
                 maxlength: 6
             },
             ACCESS_NAME: {
                 required: true
             },
             ACCESS_PWD: {
                 required: true
             }
         },
         submitHandler:function(form){
            form.submit();
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
		<h1>资源编辑</h1>
		<div id="page-btn-container" class="page-btn-container">
		   <button  id="savebtn" type="button"  class="btn btn-primary">保存</button>
	       <button  id="forReturn" type="button"   class="btn btn-primary">返回</button>
	    </div>
</div>
<div id="content-container">
	<div class="row">
		<div class="col-sm-8">
		<form id="cmdbInfoForm"  method="post" action="update" class="form sl_table" data-parsley-validate>
		   <div class="form-group">
	              <label>Tomcat资源名称：</label>
	              <input name="RES_NAME" class="form-control" type="text" value="${quartzLine.RES_NAME}"  data-parsley-required />
	              <input type="hidden"  class="required" name="RES_ID" maxlength="40" style="width: 30%;"  value="${quartzLine.RES_ID}" />
	      </div>
		   <div class="form-group">
	              <label>IP：</label>
	              <input name="IP" class="form-control" type="text" value="${quartzLine.IP}" readonly data-parsley-required />
	      </div>
		   <div class="form-group">
	              <label>端口：</label>
	              <input name="PORT" class="form-control" type="text" value="${quartzLine.PORT}" readonly data-parsley-required />
	      </div>
		   <div class="form-group">
	              <label>是否启用安全性：</label>
	              <br>
	              <input type="radio" name="IS_START_SECURITY" value="1" <c:if test="${quartzLine.IS_START_SECURITY eq '1' }">checked</c:if> onclick="securityChange()" />是
     			  <input type="radio"  name="IS_START_SECURITY" value="0" <c:if test="${quartzLine.IS_START_SECURITY eq '0' }">checked</c:if> onclick="securityChange()" />否
	      </div>
		   <div class="form-group"  id="userDiv">
	              <label>用户名：</label>
	              <input name="ACCESS_NAME" class="form-control" type="text" value="${quartzLine.ACCESS_NAME}"  data-parsley-required />
	      </div>			
		   <div class="form-group"  id="passwdDiv">
	              <label>密码：</label>
	              <input name="ACCESS_PWD" class="form-control" type="password" value="${quartzLine.ACCESS_PWD}"/>
	      </div>
	       <div class="form-group">
	              <label>是否监控：</label>
	              <br>
	              <input type="radio" name="IS_MONITOR" value="1" <c:if test="${quartzLine.IS_MONITOR eq '1' }">checked</c:if> />是
     			  <input type="radio"  name="IS_MONITOR" value="0" <c:if test="${quartzLine.IS_MONITOR eq '0' }">checked</c:if> />否
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