<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript" src="${ctx }/jsp/ai/jvms/memory.js"></script>
<input type="hidden" name="app_id" value="${APP.APP_ID }" />
<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">JVM
            <small>JVM 性能(${RES_NAME})</small>
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
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">Heap memory usage (MB)</div>
            </div>
            <div class="portlet-body">
                <div id="heapMemoryChart" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">Non Heap memory usage (MB)</div>
            </div>
            <div class="portlet-body">
                <div id="nonHeapMemoryChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">Garbage collection</div>
            </div>
            <div class="portlet-body">
                <div id="gcChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">Class count</div>
            </div>
            <div class="portlet-body">
                <div id="classCountChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
</div>