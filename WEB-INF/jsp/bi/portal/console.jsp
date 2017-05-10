<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript" src="${ctx }/jsp/bi/portal/console.js"></script>
<input type="hidden" name="app_id" value="${APP.APP_ID }" />
<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">监控台
            <small>总览浏览器端性能</small>
        </h3>
    </div>
    <div class="col-md-2">
        <div class="btn-group" id="dtSelector">
            <button id="dtLabel" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"></button>
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu" role="menu" sel="${htmldata.time_region }">
                <li><a href="javascript:;" value="30">30分钟</a></li>
                <li><a href="javascript:;" value="60">1小时</a></li>
                <li><a href="javascript:;" value="720">12小时</a></li>
                <li><a href="javascript:;" value="1440">1天</a></li>
                <li><a href="javascript:;" value="4320">3天</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-8">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">性能区间</div>
            </div>
            <div class="portlet-body">
                <div id="perfSectionChart" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">Apdex</div>
            </div>
            <div class="portlet-body">
                <div id="apdexChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-4">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">脚本错误</div>
            </div>
            <div class="portlet-body">
                <div id="scriptErrChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">页面性能趋势</div>
            </div>
            <div class="portlet-body">
                <div id="perfTrendChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">异步请求性能趋势</div>
            </div>
            <div class="portlet-body">
                <div id="xhrTrendChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">平均加载时间
                </div>
            </div>
            <div class="portlet-body">
                <div id="chinaChart" class="main" style="width: 100%;height: 400px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="row" style="height:50%;">
            <div class="col-md-6">
                <div class="portlet box blue-hoki">
                    <div class="portlet-title">
                        <div class="caption">运营商</div>
                    </div>
                    <div class="portlet-body">
                        <div id="operator_bar" class="bar-margin"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="portlet box blue-hoki">
                    <div class="portlet-title">
                        <div class="caption">浏览器</div>
                    </div>
                    <div class="portlet-body">
                        <div id="browser_bar" class="bar-margin"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="height:50%;">
            <div class="col-md-12">
                <div class="portlet box blue-hoki">
                    <div class="portlet-title">
                        <div class="caption">慢事务追踪</div>
                    </div>
                    <div class="portlet-body">
                        <div id="slow_perf_bar" class="bar-margin"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
