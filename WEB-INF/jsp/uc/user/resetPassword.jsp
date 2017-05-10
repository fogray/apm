<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>
<script src="${ctx}/skins/portal/md5/md5.js"></script>
<script>
	$(document).ready(function(){
		$("#updatePasswordBtn").on("click",function(){
			var salt = "@w2?%#uy39m.xew*1";
			$.post("checkPasswordIsCorrect",{"password":hex_md5($("input[name='oldpassword']").val()+salt)},function(data){
				if(data=="true"){
					//if($('#resetPasswordForm').parsley().validate()){
						$("input[name='oldpassword']").val(hex_md5($("input[name='oldpassword']").val()+salt));
						$("input[name='newpassword']").val(hex_md5($("input[name='newpassword']").val()+salt));
						$("input[name='newpassword2']").val(hex_md5($("input[name='newpassword2']").val()+salt));
						$('#resetPasswordForm').submit();
					//}
				}else{
					//var parIns=$('#oldpassword').parsley();
					window.ParsleyUI.addError(parIns, "passwordIsIncorrect", "用户密码不正确");
				}
			},"text");
			
			$("#oldpassword").on("focus",function(){
				//var parIns=$('#oldpassword').parsley();
				window.ParsleyUI.removeError(parIns, "passwordIsIncorrect");
			})
			
		});
		
		var message = $("#message").val();
		if(message!=""){
	        toastr['warning']('', message);
		}
	})
</script>
<div id="content-header">
	<h1>修改密码</h1>
</div>
<div id="content-container">
	<input id="message" type="hidden" value="${message}" />
	<form id="resetPasswordForm" action="updatePassword" method="post" data-parsley-validate>
		<div class="col-md-7">
			<div class="form-group">
				<label> 原密码 </label>
				<input id="oldpassword" type="password" class="form-control" name="oldpassword" data-parsley-required />
			</div>

			<div class="form-group">
				<label> 新密码 </label>
				<input id="password" type="password" class="form-control" name="newpassword" data-parsley-required />
			</div>

			<div class="form-group">
				<label> 重复新密码 </label>
				<input type="password" class="form-control" name="newpassword2" data-parsley-required data-parsley-equalto="#password" />
			</div>
			<br />
			<div class="form-group">
				<button id="updatePasswordBtn" class="btn btn-primary" type="button">修改密码</button>
			</div>
		</div>
	</form>
</div>