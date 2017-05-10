<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" buffer="none"%>
<%@ taglib prefix="lambo" uri="/lambo/tag"%>
<%@ page import="java.util.*"%>
<%@ page import="com.inspur.lambo.framework.interceptor.monitor.*"%>
<!DOCTYPE html>
<html>
<title>SQL在线跟踪</title>

<%
	String app=request.getContextPath();
	app=app.substring(1,app.length());
	String enable=request.getParameter("enable");
	if(enable==null) enable="true";
	SqlMonitorPlugin.setEnable(enable);
%>
<style>
<!--

.atn {
	color: #606;
}

#fix{
    width:30px;
    height:70px;
    position:fixed;
    right:30px;
    bottom:50px;
    background-color: #BFFFBF;
}
.highlight{
	margin-bottom:20px;
}
-->
</style>
<script type="text/javascript">
var app="<%=app%>";
$(function() {
	
	var UA = navigator.userAgent.toLowerCase();
	var iswebkit=UA.match("webkit");
	var islikechrome=UA.match("chrome");
	
	if(null==iswebkit && null==islikechrome){
		$("#result").append("<h2>非webkit浏览器不支持服务器监听事件，试试webkit内核的浏览器吧!下载地址：http://pan.baidu.com/s/1jGxgTCU</h2>");
	}else{
		$("#result").append("<div class='highlight'>点击业务功能后，返回本页面查看sql跟踪结果~ </div>");
	}
	
	if (typeof (EventSource) !== "undefined") {
		var source = new EventSource("${ctx}/system/sqlmonitor/getSql");
		source.onmessage = function(event) {
			if("1"!=event.data) {
				
				$("#result").append(event.data);
			}
			
		};
	}
	
});
</script>
<%
String sessionId = request.getSession().getId();
SqlMonitorPlugin.createLocalSessionMap(sessionId);
%>
<input type="hidden" name="sessionId" value="<%=sessionId%>"/>
<h3 class="page-title"> 
	SQL监控
    <small>用于对会话相关的SQL进行跟踪的功能</small>
</h3>

<div class="alert alert-info">
   当前使用应用为:<strong><%=app%></strong>
</div>
<div class="portlet light bordered">
    <div class="portlet-title">
        <div class="caption">
            <i class="icon-speech"></i>
            <span class="caption-subject bold uppercase"> SQL监控结果</span>
            <span class="caption-helper"></span>
        </div>
    </div>
    <div class="portlet-body">
		<div id="result">
			
		</div>
    </div>
</div>

</html>