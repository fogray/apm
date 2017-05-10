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

<!-- 信息提示-->
<lambo:script path="${ctx}/skins/portal/md5/md5.js" />
<!-- 校验插件 -->
<lambo:script path="${ctx}/skins/global/plugins/jquery-validation/js/jquery.validate.min.js" />
<script>
	$(document).ready(function(){
		var salt = "@w2?%#uy39m.xew*1";
		$("#save,#saveAndContinue").on("click",function(){
			if($(this).attr("id")=="saveAndContinue"){
				$("#operateType").val("saveAndContinue");
			}else{
				$("#operateType").val("save");
			}
			$("#user-form").submit();
		});

		//表单校验
		$('#user-form').validate({
             rules: {
             	USERID: {
                     minlength: 2,
                     required: true,
                     remote:"${ctx}/uc/user/checkUserIdRepeat"
                 },
                 USERNAME: {
                     required: true,
                     minlength: 2
                 },
                 PASSWORD: {
                     required: true
                 },
                 PASSWORD2: {
                     required: true,
                     equalTo:"#password"
                 },
                 EMAIL: {
                     email: true
                 },
                 GROUPIN: {
                     required: true
                 }
             },
             messages:{
         		USERID:{       
         			remote:"用户名重复，请重新输入"
         		}
         	 },
         	 submitHandler:function(form){
         		var password=$("#password").val();
				var password_md5=hex_md5(password+salt);
				$("#password").val(password_md5);
				$("#password2").val(password_md5);
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
			<div class="portlet borderd portlet-fit portlet-form">
				<div class="portlet-title">
					<div class="caption">
						<i class="icon-settings font-white"></i>
						<span class="caption-subject bold">用户信息维护</span>
					</div>
					<button id="goback" class="btn btn-primary pull-right" type="button">返回</button>
				</div>
				<div class="portlet-body">
					<form action="${ctx}/uc/user/saveNewUser" id="user-form" class="form-horizontal" method="post">
						<div class="form-body">
							<input type="hidden" name="OPERATE_TYPE" id="operateType" value=""/>
							<div class="form-group">
		                         <label class="control-label col-md-3">用户ID
		                             <span class="required"> * </span>
		                         </label>
		                         <div class="col-md-4">
		                             <input type="text" name="USERID" id="userId" class="form-control" />
		                             <span class="help-block">使用英文或数字</span> 
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">用户名称
		                             <span class="required"> * </span>
		                         </label>
		                         <div class="col-md-4">
		                             <input name="USERNAME" type="text" class="form-control" />
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">用户密码
		                             <span class="required"> * </span>
		                         </label>
		                         <div class="col-md-4">
		                             <input name="PASSWORD" type="password" id="password" class="form-control" />
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">重复用户密码
		                             <span class="required"> * </span>
		                         </label>
		                         <div class="col-md-4">
		                             <input name="PASSWORD2" type="password" id="password2" class="form-control" />
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">电子邮箱
		                         </label>
		                         <div class="col-md-4">
		                             <input name="EMAIL" type="text" class="form-control" />
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">移动电话
		                         </label>
		                         <div class="col-md-4">
		                             <input name="MOBILE" type="text" class="form-control" />
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">QQ</label>
		                         <div class="col-md-4">
		                             <input name="QQ" type="text" class="form-control" />
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">用户组
		                             <span class="required"> * </span>
		                         </label>
		                         <div class="col-md-4">
		                             <select class="form-control" name="GROUPIN">
		                                <c:forEach items="${groupEnum}" var="entry">
						              		<option value="${entry.key}" >${entry.value}</option>
						              	</c:forEach>
		                             </select>
		                         </div>
		                     </div>
		                     <div class="form-group">
		                         <label class="control-label col-md-3">备注
		                         </label>
		                         <div class="col-md-4">
		                             <textarea name="MOTTO" class="form-control" rows="3"></textarea>
		                         </div>
		                     </div>
						</div>
						<div class="form-actions">
							<div class="row">
								<div class="col-md-offset-3 col-md-9">
									<button id="save" type="button" class="btn btn-primary">保存</button>
									<button id="saveAndContinue" type="button" class="btn btn-primary">保存并继续</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		
	</div>
	
</body>