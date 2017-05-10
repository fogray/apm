<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>
<style>
<!--
    .script-table tbody tr td.text-right{
        width: 15%;
    }
    .script-table tbody tr td.text-left{
        width: 35%;
    }
-->
</style>
<script type="text/javascript" src="${ctx }/jsp/bi/script/console.js"></script>
<input type="hidden" name="app_id" value="${APP.APP_ID }" />
<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">脚本错误
        <small>js错误分析</small>
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
            <div class="portlet-title tabbable-line">
                <ul class="nav nav-tabs pull-left" id="scriptListTab">
                    <li class="active">
                        <a href="#tab_errList" data-toggle="tab">错误信息</a>
                    </li>
                    <li>
                        <a href="#tab_errPage" data-toggle="tab">出错页面</a>
                    </li>
                </ul>
            </div>
            <div class="portlet-body">
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_errList">
                        <div class="items" id="errorMsgList">
                        </div>
                    </div>
                    <div class="tab-pane" id="tab_errPage">
                        <div class="items" id="errorPageList">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-9">
        <div class="portlet">
            <div class="portlet-title">
                <div class="caption" id="detail_title">
                </div>
            </div>
            <div class="portlet-body" id="detail_list">
            </div>
        </div>
    </div>
</div>
