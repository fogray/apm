<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" buffer="none"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="lambo" uri="/lambo/tag"%> 
<%@ page import="com.inspur.lambo.framework.util.EnumsUtil,com.inspur.lambo.plantform.service.support.uc.context.UcContext,java.util.Map,java.util.HashMap,com.inspur.apm.pub.Const"%>

<!DOCTYPE html>

<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!--> <!--<![endif]-->
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>
            <sitemesh:write property='title' />
        </title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        
        <!-- 
        <script type="text/javascript">
            var INS_APM = window.INS_APM || {};
            INS_APM.info={appId:'1001'};
        </script>
        <script type="text/javascript" src="http://localhost:8080/apm/skins/bi/collector/collect.js"></script>
        <script type="text/javascript" src="http://localhost:8080/apm/skins/bi/collector/sender.js"></script>
         -->
        
        <link rel="shortcut icon" href="favicon.ico" />
        
        <!-- 全局样式 -->
        <lambo:link path="${ctx}/skins/global/plugins/font-awesome/css/font-awesome.min.css,
        ${ctx}/skins/global/plugins/simple-line-icons/simple-line-icons.min.css,
        ${ctx}/skins/global/plugins/bootstrap/css/bootstrap.min.css,
        ${ctx}/skins/global/plugins/uniform/css/uniform.default.min.css,
        ${ctx}/skins/global/css/components.min.css,
        ${ctx}/skins/layouts/layout/css/layout.min.css,
        ${ctx }/skins/global/plugins/bootstrap-toastr/toastr.min.css,
        ${ctx }/skins/global/plugins/datatables/datatables.min.css,
        ${ctx }/skins/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css,
        ${ctx}/skins/layouts/layout/css/custom.min.css,
        ${ctx}/skins/layouts/layout/css/themes/blue.css" />
        
        <!-- 基础库 -->
        <lambo:script path="${ctx}/skins/global/plugins/jquery.min.js,
        ${ctx}/skins/global/plugins/bootstrap/js/bootstrap.min.js,
        ${ctx}/skins/global/plugins/js.cookie.min.js,
        ${ctx }/skins/global/plugins/bootstrap-toastr/toastr.min.js,
        ${ctx }/skins/global/plugins/datatables/datatables.min.js,
        ${ctx }/skins/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js,
        ${ctx}/skins/global/scripts/app.min.js"/>
        
        <sitemesh:write property='head'/>
        
     </head>
     <!-- END HEAD -->
        
    <body class="page-sidebar-closed-hide-logo page-header-fixed page-sidebar-fixed">
        
        <input id="ctx" type="hidden" value="${ctx}" />
        <input id="component" type="hidden" value="uc" />
        <input id="homePageUrl" type="hidden" value="${homePageUrl}" />
        
        <jsp:include page="top_nav.jsp">
            <jsp:param value="bi" name="component"/>
        </jsp:include>
        
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
        
        <div class="clearfix"> </div>
        <div class="page-container">
            <div class="page-sidebar-wrapper">
                <div class="page-sidebar navbar-collapse collapse">
                    <ul id="page-menu" class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" 
                    data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
                    </ul>
                </div>
            </div>
            <div class="page-content-wrapper">
                <div class="page-content">
                    <sitemesh:write property='body'/>
                </div>
            </div>
        </div>
        <!--[if lt IE 9]>
        <lambo:script path="global/plugins/respond.min.js,global/plugins/excanvas.min.js" />
        <![endif]-->
        
        <!-- 全局javascirpt -->
        <lambo:script path="${ctx}/skins/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js,
            ${ctx}/skins/global/plugins/bootstrap-select/js/bootstrap-select.min.js,
            ${ctx }/skins/pages/scripts/components-bootstrap-select.min.js,
            ${ctx}/skins/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js"/>
        
        <lambo:script path="${ctx}/skins/global/plugins/jquery.blockui.min.js" />
        <lambo:script path="${ctx}/skins/global/plugins/uniform/jquery.uniform.min.js" />
        <lambo:script path="${ctx}/skins/layouts/layout/scripts/layout.min.js"/>
        <!--layouts/global/scripts/quick-sidebar.js-->
        <lambo:script path="${ctx}/skins/global/scripts/menu.js" />
        
        <lambo:link path="${ctx }/skins/global/plugins/bootstrap-select/css/bootstrap-select.min.css,
            ${ctx }/skins/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css, 
            ${ctx }/skins/global/plugins/bootstrap-modal/css/bootstrap-modal.css, 
            ${ctx}/skins/bi/css/form.css" />
        
        <lambo:link path="${ctx}/skins/global/plugins/bootstrap-select/css/bootstrap-select.min.css" />
        <lambo:script path="${ctx}/skins/global/plugins/jquery-ui/jquery-ui.min.js,
                    ${ctx}/skins/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js ,
                    ${ctx}/skins/global/plugins/bootstrap-modal/js/bootstrap-modal.js,
                    ${ctx}/skins/bi/js/echarts.min.js,
                    ${ctx}/skins/bi/js/map/china.js,
                    ${ctx}/skins/bi/js/form.js,
                    ${ctx}/skins/bi/js/echartsUtil.js " />
    </body>
</html>