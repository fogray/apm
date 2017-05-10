<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="lambo" uri="/lambo/tag"%> 
<%@ taglib uri="/lambo/fn" prefix="lambofn"%>
<!DOCTYPE html>
<html>
<head>
<title>新增用户</title>

<lambo:script path="${ctx}/skins/portal/md5/md5.js" />
<!-- 校验插件 -->
<lambo:script path="${ctx}/skins/global/plugins/jquery-validation/js/jquery.validate.min.js" />
<script>
	$(document).ready(function(){
		$("#save").on("click",function(){
			$("#user-form").submit();
		});

		//表单校验
		$('#user-form').validate({
             rules: {
                 USERNAME: {
                     required: true,
                     minlength: 2
                 },
                 EMAIL: {
                     email: true
                 },
                 GROUPIN: {
                     required: true
                 }
             },
         	 submitHandler:function(form){
				form.submit();
         	 }
         });
		
		var message = $("#message").val();
		if(message!=""){
			toastr["success"]("", message);
		}
		
		$("#goback").on("click",function(){
			window.location.href="list";
		})
	});
</script>
</head>
<body>
	<input type="hidden" id="message" value="${message}" />
	<div class="row margin-top-20">
		<div class="col-md-12">
			<div class="portlet bordered portlet-fit portlet-form">
				<div class="portlet-title">
					<div class="caption">
						<i class="icon-settings font-white"></i>
						<span class="caption-subject bold">用户信息维护</span>
					</div>
					<button id="goback" class="btn btn-primary pull-right" type="button">返回</button>
				</div>
				<div class="portlet-body">
					<form action="${ctx}/uc/user/updateUser" id="user-form" class="form-horizontal" method="post">
						<div class="form-body">
							<input type="hidden" name="OPERATE_TYPE" id="operateType" value=""/>
							<div class="form-group">
		                         <label class="control-label col-md-3">用户ID
		                             <span class="required"> * </span>
		                         </label>
		                         <div class="col-md-4">
		                             <input type="text" name="USERID" id="userId" class="form-control" value="${USER.USERID}" readonly/>
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">用户名称
		                             <span class="required"> * </span>
		                         </label>
		                         <div class="col-md-4">
		                             <input name="USERNAME" type="text" class="form-control" value="${USER.USERNAME}"/>
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">电子邮箱
		                         </label>
		                         <div class="col-md-4">
		                             <input name="EMAIL" type="text" class="form-control" value="${USER.EMAIL}"/>
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">移动电话
		                         </label>
		                         <div class="col-md-4">
		                             <input name="MOBILE" type="text" class="form-control" value="${USER.MOBILE}"/>
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">QQ</label>
		                         <div class="col-md-4">
		                             <input name="QQ" type="text" class="form-control" value="${USER.QQ}"/>
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">用户组
		                             <span class="required"> * </span>
		                         </label>
		                         <div class="col-md-4">
		                             <select class="form-control" name="GROUPIN" value="${USER.GROUPIN}">
		                                <c:forEach items="${groupEnum}" var="entry">
						              		<option value="${entry.key}" <c:if test="${entry.key == USER.GROUPIN}">selected</c:if>>${entry.value}</option>
						              	</c:forEach>
		                             </select>
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">备注
		                         </label>
		                         <div class="col-md-4">
		                             <textarea name="MOTTO" class="form-control" rows="3">${USER.MOTTO}</textarea>
		                         </div>
		                     </div>
						</div>
						<div class="form-actions">
							<div class="row">
								<div class="col-md-offset-3 col-md-9">
									<button id="save" type="button" class="btn btn-primary">保存</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		
	</div>
	
</body>