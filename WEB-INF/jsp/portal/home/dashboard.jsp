<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>


<link href="${ctx }/jsp/portal/home/dashboard.css" rel="stylesheet">
<script type="text/javascript" src="${ctx}/jsp/portal/home/dashboard.js"></script>

<h3 class="page-title">
</h3>
<form id="appForm" method="POST" action="">
</form>
<div class="row dashboard components">
    <div class="col-md-10" style="float: none;margin-left:auto;margin-right:auto;">
        
        <!-- AI start -->
        <div class="component col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="portlet portlet-fit">
                <div class="portlet-body">
                    <a href="${ctx }/ai/portal/listServer">
                        <div class="row">
                            <div class="col-md-12 component-up">
                                <div class="col-md-7 ai-icon"></div>
                                <div class="col-md-5 ai-desc">应用监控</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 component-down">
                                <p class="desp">监控和优化应用程序的代码性能、错误及SQL语句性能</p>
                                <p class="name">目前仅支持Java在Tomcat的部署应用</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <!-- AI end -->
        
        <!-- BI start -->
        <div class="component col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="portlet portlet-fit">
                <div class="portlet-body">
                    <a href="${ctx }/bi/portal/listApp">
                        <div class="row">
	                        <div class="col-md-12 component-up">
	                            <div class="col-md-7 bi-icon"></div>
	                            <div class="col-md-5 bi-desc">用户真实体验监控</div>
	                        </div>
                        </div>
                        <div class="row">
	                        <div class="col-md-12 component-down">
	                            <p class="desp">实时分析真实用户用浏览器访问业务系统的性能</p>
	                            <p class="name">支持Ajax，用户访问轨迹，页面加载分析</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <!-- BI end -->
    </div>
</div>
