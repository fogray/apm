<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript" src="${ctx }/jsp/bi/perf/console.js"></script>
<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">${APP.APP_NAME }访问页面
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
    <div class="row">
        <div class="col-md-3">
            <div class="portlet box blue-hoki">
                <div class="portlet-title">
                    <div class="caption">平均时间
                    </div>
                    <div class="actions">
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="items" id="perfPages">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="portlet tabbable-line">
                <ul class="nav nav-tabs" id="pageTab">
                    <li class="active">
                        <a href="#tab_trend" data-toggle="tab">性能趋势</a>
                    </li>
                    <li>
                        <a href="#tab_slow" data-toggle="tab">慢加载追踪</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_trend">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="portlet box blue-hoki">
                                    <div class="portlet-title">
                                        <div class="caption">性能区间</div>
                                    </div>
                                    <div class="portlet-body">
                                        <div id="perfSectionChart" style="width: 100%; height: 350px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="portlet box blue-hoki">
                                    <div class="portlet-title">
                                        <div class="caption">访问页面性能趋势</div>
                                    </div>
                                    <div class="portlet-body">
                                        <div id="perfTrendChart" style="width: 100%; height: 350px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab_slow">
                        <div class="portlet box blue-hoki">
                            <div class="portlet-body">
                                <table class="table" id="tblSlowList">
                                    <thead>
                                        <tr>
                                            <td>序号</td>
                                            <td>访问时间</td>
                                            <td>浏览器</td>
                                            <td>响应时间</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>