<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>
<!-- 校验插件 -->
<script type="text/javascript" src="${ctx}/skins/global/plugins/jquery-validation/js/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx}/jsp/bi/portal/applist.js"></script>
<style>
<!--
#myModalLabel{
    color: #333;
}
-->
</style>
<h3 class="page-title">应用程序
    <small>最近1小时统计数据</small>
    <span class="pull-right">
        <button type="button" class="btn btn-warning" data-toggle="modal" onclick="btnAddAppClick(this)">添加应用</button>
    </span>
</h3>
<form id="appForm" method="POST" action="">
</form>
<div class="portlet box">
    <div id="apps" class="portlet-body">
        <c:set var="appsize" value="${fn:length(applist) }"></c:set>
        <c:forEach items="${applist }" var="app" varStatus="i">
            <c:if test="${i.count eq 1}">
                <div class="row app-list">
            </c:if>
            <div class="app-item col-md-2">
                <input type="hidden" name="app_id" value="${app.APP_ID }"/>
                <div class="app-portlet">
                    <div class="app-title">${app.APP_NAME }</div>
                    <div class="app-content">
                        <div class="row ind">
                            <div class="ind-title col-md-8 text-right">Apdex指数</div>
                            <div class="ind-content col-md-4 text-left"><em id="perfApdex"></em></div>
                        </div>
                        <div class="row ind">
                            <div class="ind-title col-md-8 text-right">页面响应时间</div>
                            <div class="ind-content col-md-4 text-left"><em id="perfTime"></em></div>
                        </div>
                        <div class="row ind">
                            <div class="ind-title col-md-8 text-right">页面访问量</div>
                            <div class="ind-content col-md-4 text-left"><em id="perfPv"></em></div>
                        </div>
                        <div class="row ind">
                            <div class="ind-title col-md-8 text-right">Ajax响应时间</div>
                            <div class="ind-content col-md-4 text-left"><em id="xhrTime"></em></div>
                        </div>
                        <div class="row ind">
                            <div class="ind-title col-md-8 text-right">JS错误数</div>
                            <div class="ind-content col-md-4 text-left"><em id="jserrCount"></em></div>
                        </div>
                    </div>
                </div>
            </div>
            <c:if test="${i.count mod 5 eq 0 }">
                </div><div class="row app-list">
            </c:if>
        </c:forEach>
        <c:if test="${appsize ne 0 }">
            </div>
        </c:if>
    </div>
</div>

<div class="modal fade" id="addAppModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">添加应用</h4>
      </div>
      <div class="modal-body">
          <form action="" id="app-form" class="form-horizontal" method="post">
              <div class="form-body">
                  <div class="form-group">
                      <div class="col-md-8">
                          <input type="text" name="APP_NAME" id="appName" placeholder="输入应用名称" maxlength="30" class="form-control" />
                      </div>
                      <div class="col-md-4"><span class="required"> * </span></div>
                  </div>
                  <div class="form-group">
                      <div class="col-md-8">
                          <input type="text" name="APP_DESC" id="appDesc" placeholder="应用名称描述" maxlength="50" class="form-control" />
                      </div>
                  </div>
              </div>
          </form>
          <div id="divSaved" class="alert alert-success" style="display: none;">
              <div class="row">
                  <div class="col-md-12">添加应用成功！！将下方javascript代码复制并粘贴到监控HTML页面的头部&lt;head&gt;标签的&lt;meta&gt;下方</div>
                  <div class="col-md-12">
                      &lt;script type="text/javascript"&gt;<br>
                          var INS_APM = window.INS_APM || {};<br>
                          INS_APM.info={appId:'<em id="appId"></em>'};<br>
                      &lt;/script&gt;<br>
                      &lt;script type="text/javascript" src="http://itm.inspursoft.com/apm-receiver/skins/bi/collector/collect.js"&gt;&lt;/script&gt;<br>
                      &lt;script type="text/javascript" src="http://itm.inspursoft.com/apm-receiver/skins/bi/collector/sender.js"&gt;&lt;/script&gt;<br>
                  </div>
              </div>
          </div>
      </div>
      <div class="modal-footer">
        <button id="saveApp" type="button" class="btn btn-primary btn-outline">保存</button>
        <button type="button" class="btn btn-primary btn-outline" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>
