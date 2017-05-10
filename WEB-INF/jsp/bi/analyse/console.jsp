<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript" src="${ctx }/jsp/bi/analyse/console.js"></script>
<input type="hidden" name="app_id" value="${APP.APP_ID }" />
<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">系统分析
        <small>用户体验分析</small>
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
                <div class="caption">用户体验Apdex</div>
            </div>
            <div class="portlet-body">
                <div id="apdexChart" style="width: 100%; height: 200px;"></div>
            </div>
            <!-- tabbable-line
            <ul class="nav nav-tabs ">
                <li class="active">
                    <a href="#tab_apdex" data-toggle="tab">用户体验Apdex</a>
                </li>
                <li>
                    <a href="#tab_total" data-toggle="tab">整页加载完成</a>
                </li>
                <li>
                    <a href="#tab_web" data-toggle="tab">网页加载完成</a>
                </li>
                <li>
                    <a href="#tab_resource" data-toggle="tab">资源加载完成</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab_apdex">
                    <div id="apdexChart" style="width: 100%; height: 200px;"></div>
                </div>
                <div class="tab-pane" id="tab_total">
                    <div id="totalChart" style="width: 100%; height: 200px;">
                    </div>
                </div>
                <div class="tab-pane" id="tab_web">
                    <div id="webChart" style="width: 100%; height: 200px;">
                    </div>
                </div>
                <div class="tab-pane" id="tab_resource">
                    <div id="resourceChart" style="width: 100%; height: 200px;">
                    </div>
                </div>
            </div>
             -->
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">性能区间</div>
            </div>
            <div class="portlet-body">
                <div id="perfSecGraphChart" style="width: 100%; height: 100px;"></div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box">
            <div class="portlet-title">
                <div class="caption">用户特性</div>
            </div>
            <div class="portlet-body" style="background-color: transparent;">
                <div class="row">
                    <div class="col-md-6">
                        <div class="portlet box blue-hoki no-border">
                            <div class="portlet-title">
                                <div class="caption">系统</div>
                            </div>
                            <div class="portlet-body">
                                <div id="osStatChart" style="width: 100%; height: 200px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="portlet box blue-hoki no-border">
                            <div class="portlet-title">
                                <div class="caption">运营商</div>
                            </div>
                            <div class="portlet-body">
                                <div id="ispStatChart" style="width: 100%; height: 200px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="portlet box blue-hoki no-border">
                            <div class="portlet-title">
                                <div class="caption">事务</div>
                            </div>
                            <div class="portlet-body">
                                <div id="topPageStatChart" style="width: 100%; height: 200px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="portlet box blue-hoki no-border">
                            <div class="portlet-title">
                                <div class="caption">浏览器</div>
                            </div>
                            <div class="portlet-body">
                                <div id="browserStatChart" style="width: 100%; height: 200px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>