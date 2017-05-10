<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	String skin=request.getParameter("skin");
	if(skin==null){
		Cookie[] cookies = request.getCookies();
		if(null!=cookies){
			for(int i=0;i<cookies.length;i++){
				Cookie cookie=cookies[i];
	            if(cookie.getName().equals("dlskin")){
	            	skin=cookie.getValue();
	            }
	        }
		}
	}
	if(skin==null){
		skin="skin2";
		Cookie cookie = new Cookie("dlskin",skin);
		cookie.setMaxAge(2*365*24*60*60);
		response.addCookie(cookie);
	}
%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>登录</title>

    <link href="/theme/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="${ctx}/skins/portal/login/login.css" rel="stylesheet">

	<script src="/theme/assets/global/plugins/jquery.min.js"></script>
	<script src="${ctx}/skins/portal/md5/md5-xsm.js"></script>
	<script>
	
		var _ST = "http://10.10.10.90/st";
	
		$(document).ready(function(){
			var $username = $("#userId");
			var $password = $("#password");
			var $valcode = $("#valcode");
			
			$("#loginBtn").on("click",function(){
				if(!xssDefense()){
					return false;
				}
				var username = $.trim($username.val());
				var password = $.trim($password.val());
				var valc = $.trim($valcode.val());
				if (username == "") {
					alert("请输入用户名！");
					$username.focus();
					return false;
				}
				if (password == "") {
					alert("请输入密码！");
					$password.focus();
					return false;
				}
				if($(".valcode-area").hasClass("valcodeHide")){}else{
					if (valc == "") {
						alert("请输入验证码！");
						$valcode.focus();
						return false;
					}
				}
				password = hex_md5(password);
				password = hex_md5(password + valc.toUpperCase());
				
				var data = new Object();
				data.j_username = username;
				data.j_password = password;
				data.j_valcode = valc;

				$.ajax({
					url: _ST + "/users/dologin/up",
					type: "post",
					dataType : "jsonp",
					jsonp : "jsonp",
					data: data, 
					success: loginComplete,
					error: loginError
				});
				return false;
				
			});
			
			function loginComplete(data){
				
				var str = decodeURIComponent(data);
				if (typeof (str) == "string") {
					var xml;
					if (/msie/.test(navigator.userAgent.toLowerCase())) { // IE浏览器
						xml = new ActiveXObject("Microsoft.XMLDOM");
						xml.async = false;
						xml.loadXML(str);
					} else { // 其他浏览器
						xml = new DOMParser().parseFromString(str, "text/xml");
					}
					str = xml;
					if (!str.documentElement || str.documentElement.nodeName != "xsm") {
						str = data.replace(/\n/g, "");// 去掉空格
						if (str.indexOf("<xml>") == -1 || str.indexOf("</xml>") == -1) {
							str = str.replace("<xsm ", "<xml><xsm ");
							str = str.replace("</xsm>", "</xsm></xml>");
						}
					}
				}
				var rstXml = $(str);
				rstXml = rstXml.find("xsm");
				if (rstXml[0] == null) {
					loginFailed("服务器返回数据错误，请与管理员联系");
					return;
				}
				
				var retCode = rstXml.attr("code");
				var msg = rstXml.attr("msg");
				if (retCode == "0000") {
					if (msg == "密码已过期") {
						alert("您的密码距上次修改已超过90天，请尽快修改！");
					}
					window.location.replace("stlogin/gohomepage");
				} else {

					if (msg){
						loginFailed(msg);
					}else{
						loginFailed("数据错误：" + str);
					}
				}

			}
			
			function loginError(xhr, status) {
				loginFailed("登陆失败，无法连接到登陆服务器，请检查您的网络或与管理员联系。");
			}
			function loginFailed(msg) {
				var str = "";
				if (typeof msg == "object") {
					for ( var x in msg) {
						str += x + ":" + msg[x] + "\n";
					}
				} else {
					str = msg;
				}
				$("#valcode").val("");
				refcode();
				showError(str);
			}
			function showError(msg) {
				$("#message-alert").removeClass("hidden").find(".text").text(msg);
			}
			
			if($("#message-alert .text").text() != ""){
				$("#message-alert").removeClass("hidden");
			}
			$("#message-alert .close").on("click",function(){
				$("#message-alert").addClass("hidden");
			})
			
			
			document.onkeydown = function(e){ 
			    var ev = document.all ? window.event : e;
			    if(ev.keyCode==13) {
			    	$("#loginBtn").click();
			    }
			}
			
			
			function xssDefense(){
				var userId=$("#userId").val().toUpperCase();
				var password=$("#password").val().toUpperCase();
				if(userId.indexOf("SCRIPT")>-1 || userId.indexOf("SRC")>-1 || userId.indexOf("IFRAME")>-1){
					alert("用户名不符合规范");
					return false;
				}
				if(password.indexOf("SCRIPT")>-1 || userId.indexOf("SRC")>-1 || userId.indexOf("IFRAME")>-1){
					alert("密码不符合规范");
					return false;
				}
				return true;
			}
			
			//控制主页在没有hash的情况下，左侧菜单的展开位置
			sessionStorage.menuHash = "1";
			
			// 刷新验证码
			function refcode() {
				$("#valcodeimg").attr("src", _ST + "/users/forlogin/img?width=80&height=30&" + new Date().getTime());
			}
			
			function checkKeyCode(keycode, arr) {
				if (keycode == 13 || keycode == 8 || keycode == 9)
					return true;
				var b = false;
				for ( var i = 0; i < arr.length; i++) {
					if (keycode >= arr[i][0] && keycode <= arr[i][1]) {
						b = true;
						break;
					}
				}
				return b;
			}
			
			// 验证码只能输入数字
			$("#valcode").keypress(function(event) {
				var code = event.keyCode || event.which || event.charCode;
				return checkKeyCode(code, [ [ 48, 57 ] ]);
			});
			
			$("#valcodeimg").click(function(){
				refcode();
			});
		});
	</script>
  </head>

  <body>
    <div class="container">
	  <div class="content">
	  	<div class="logo"></div>
	  	<div id="message-alert" class="alert alert-danger hidden">
			<a class="close" href="#">×</a>
			<div class="text">${message}</div>
		</div>
	  	<form id="form-signin" class="form-signin big" >
		    <div class="form-group">
			    <label for="userId">用户名</label>
			    <input type="text" class="form-control" id="userId" name="userId" value="610202100358"  required autofocus>
			</div>
			
			<div class="form-group">
			    <label for="password">密码</label>
			    <input type="password" class="form-control" id="password" name="password" autocomplete="off"  required>
			</div>
			
			<div class="form-group">
			    <label for="valcode">验证码</label>
			    <div class="valcode-area" style="overflow:hidden">
				    <input type="text" class="form-control" id="valcode" name="valcode" autocomplete="off" style="width:236px;float:left" required>
				    <img id="valcodeimg" alt="点击刷新验证码" title="点击刷新验证码" width="80" height="31" style="float:left;margin-left:25px;margin-top:5px;" src="#">
			    </div>
			    
			     
			</div>
			
	        <div class="checkbox">
	          <label>
	          	<!--  
	            <input type="checkbox" value="remember-me"> 记住密码
	            -->
	          </label>
	        </div>
	        
	        <button id="loginBtn" class="btn btn-lg btn-primary btn-block" type="button">登录</button>
	      </form>
	  </div>	
      

    </div> <!-- /container -->
    <script>
    	document.getElementById("valcodeimg").src = _ST + "/users/forlogin/img?width=80&height=30&" + new Date().getTime();
    </script>
  </body>
</html>
