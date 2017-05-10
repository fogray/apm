<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" buffer="none"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="lambofn" uri="/lambo/fn"%> 
<%@ page import="com.inspur.lambo.framework.util.EnumsUtil,com.inspur.lambo.plantform.service.support.uc.context.UcContext,java.util.List,java.util.Map,java.util.HashMap,com.inspur.apm.pub.Const"%>

<%
    String userName = UcContext.getLoginUserName();
    List<Map> apps = (List<Map>) session.getAttribute(Const.CACHEKEY_BI_APP_LIST);
    String appId = (String) session.getAttribute(Const.CACHEKEY_BI_CUR_APP);
%>
<%
    String com = request.getParameter("component");
%>
<!-- BEGIN TOP NAV -->
<div class="page-header navbar navbar-fixed-top">
    <div class="page-header-inner ">
        <div class="page-logo">
            <a href="${ctx }/portal/dashboard/forDashboard">
                <img src="${ctx}/skins/layouts/layout/img/logo.png" alt="logo" class="logo-default" />
            </a>
        </div>
        
        <div class="components">
            <ul>
              <li>
                <a class="" href="${ctx}/ai/portal/listServer" data-tip="监控应用程序的代码性能、错误" data-place="bottom">
                  <img src="${ctx}/skins/layouts/layout/img/ai_logo.png"></i>
                </a>
              </li>
              <li>
                <a class="active" href="${ctx}/bi/portal/listApp" data-tip="监控和分析真实用户用浏览器访问应用的性能" data-place="bottom">
                  <img src="${ctx}/skins/layouts/layout/img/bi_logo.png"></i>
                </a>
              </li>
            </ul>
        </div>
        <div class="top-menu">
            <c:if test="${param.component eq 'bi' }">
                <ul class="nav navbar-nav pull-left" style="line-height: 3;">|
                    <div id="bi-app-selector" class="bi-select dropdown btn-group">
                        <button type="button" class="label btn btn-primary dropdown-toggle no-border" style="line-height:1.9;min-width:100px;" data-toggle="dropdown"></button>
                        <button id="dropdown_app" type="button" class="btn btn-primary dropdown-toggle no-border" data-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-angle-down"></i>
                        </button>
                            <script type="text/javascript">
                                function forAppList(appId) {
                                    var url = '${ctx}/bi/portal/appconsole?app_id='+appId;
                                    $('#app-select-form')[0].action = url;
                                    $('#app-select-form').submit();
                                }
                            </script>
                            <form action="" method="post" id="app-select-form"></form>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown_app">
                            <c:set var="curApp" value="<%=appId %>"></c:set>
                            <c:forEach items="<%=apps %>" var="app">
                                <li class="<c:if test="${app.APP_ID eq curApp }">select</c:if>"> <a onclick="forAppList('${app.APP_ID }')">${app.APP_NAME }</a></li>
                            </c:forEach>
                        </ul>
                    </div>
                </ul>
            </c:if>
            <ul class="nav navbar-nav pull-right">
                <li class="dropdown dropdown-user">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <span class="username username-hide-on-mobile"><%=userName%></span>
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-default">
                        <c:if test="${lambofn:urlHasPermit('uc/user/list') }">
                            <li> <a href="${ctx}/uc/user/list" target="_blank"> <i class="fa fa-user"></i> &nbsp;&nbsp;用户维护</a> </li>
                            <li class="divider"></li>
                        </c:if>
                        <li> <a href="${ctx}/uc/user/resetpassword" target="_blank"> <i class="fa fa-user"></i> &nbsp;&nbsp;修改密码 </a> </li>
                        <li class="divider"></li>
                        <li>
                            <a href="${ctx}/logout">
                                <i class="icon-user"></i> 退出登录 </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<!-- END TOP NAV -->
