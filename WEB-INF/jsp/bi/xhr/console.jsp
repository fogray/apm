<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript" src="${ctx }/jsp/bi/xhr/console.js"></script>
<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">异步请求<small>ajax请求</small>
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
    <div class="col-md-3">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-gift"></i>平均时间
                </div>
                <div class="actions">
                </div>
            </div>
            <div class="portlet-body">
                <div class="items" id="xhrList">
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-9">
        <div class="portlet">
            <div class="portlet-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="portlet box blue-hoki">
                            <div class="portlet-title">
                                <div class="caption">性能趋势</div>
                            </div>
                            <div class="portlet-body">
                                <div id="xhrTimelineChart" style="width: 100%; height: 350px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="portlet box blue-hoki">
                            <div class="portlet-title">
                                <div class="caption">异步调用页面</div>
                            </div>
                            <div class="portlet-body">
                                <table class="table light" id="tblXhrPage">
                                    <thead>
                                        <tr>
                                            <td style="width: 6%;">序号</td>
                                            <td style="width: 34%;">访问页面</td>
                                            <td style="width: 20%;">平均响应时间(ms)</td>
                                            <td style="width: 20%;">吞吐量(ppm)</td>
                                            <td style="width: 20%;">调用次数</td>
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
