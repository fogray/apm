<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%> 
<%@ page import="java.lang.Exception"%>  
<div id="content-header">
  <h1>系统出错</h1>
</div>
<div id="content-container">
	<div class="row">
		<div class="col-md-12">
			<blockquote>
			  <p>对不起，系统出现了未知的异常，请稍候再试，或者联系系统管理员</p>
			  <small>此次访问已作为异常情况被系统记录</small>
			</blockquote>
		</div>
	</div>
	<% 
	response.setStatus(200);
	%> 
</div>