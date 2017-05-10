<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript" src="${ctx }/jsp/ai/portal/console.js"></script>
<input type="hidden" name="app_id" value="${APP.APP_ID }" />
<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">监控台
            <small>性能总览(${RES_NAME})</small>
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
    <div class="col-md-8">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">Web事务(每5分钟)</div>
            </div>
            <div class="portlet-body">
                <div id="perfSectionChart" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">吞吐量(请求数/分钟)</div>
            </div>
            <div class="portlet-body">
                <div id="cpmChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">错误率(每5分钟)</div>
            </div>
            <div class="portlet-body">
                <div id="errChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">慢事务</div>
            </div>
            <div class="portlet-body">
                <div id="slowChart" class="main" style="width: 100%;height: 250px;"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="portlet box blue-hoki">
            <div class="portlet-title">
                <div class="caption">错误信息详情
                </div>
            </div>
            <div class="portlet-body">
		        <table id="error-detail-table" class="table table-striped dataTable" style="table-layout:fixed;cellspacing:0; width:100%">
					<thead>
						<tr>
							<th style="width:15%;">第一次出现时间</th>
							<th style="width:15%;">最后一次出现时间</th>
		                    <th style="width:40%;">请求地址</th>
		                    <th style="width:15%;">状态码</th>
		                    <th style="width:15%;">出现次数</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
            </div>
        </div>
    </div>
</div>
