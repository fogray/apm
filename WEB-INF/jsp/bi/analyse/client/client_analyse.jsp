<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript" src="${ctx }/jsp/bi/analyse/client/client_analyse.js"></script>
<input type="hidden" name="app_id" value="${APP.APP_ID }" />
<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">客户端
        <small>基于用户客户端分析</small>
        </h3>
    </div>
    <div class="col-md-2">
        <div class="btn-group" id="dtSelector">
            <button id="dtLabel" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"></button>
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu" role="menu">
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
    <div class="col-md-12">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">平均加载时间</div>
            </div>
            <div class="portlet-body">
                <div id="browserTrendChart" style="width: 100%; height:200px;"></div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">浏览器类型</div>
            </div>
            <div class="portlet-body">
                <div id="broTypeChart" style="width: 100%; height:200px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">分辨率</div>
            </div>
            <div class="portlet-body">
                <div id="clientRatioChart" style="width: 100%; height:200px;"></div>
            </div>
        </div>
    </div>
</div>
