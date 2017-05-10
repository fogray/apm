<%@page import="java.util.Date"%>
<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript" src="${ctx }/jsp/bi/perf/slow_page_detail.js"></script>
<input type="hidden" name="req_id" value="${htmldata.REQ_ID }"/>
<input type="hidden" name="domain" value="${htmldata.DOMAIN }"/>
<input type="hidden" name="page_url" value="${htmldata.PAGE_URL }"/>
<input type="hidden" id="redirectTime" value="${htmldata.REDIRECT_TIME }"/>
<input type="hidden" id="cacheTime" value="${htmldata.CACHE_TIME }"/>
<input type="hidden" id="dnsTime" value="${htmldata.DNS_TIME }"/>
<input type="hidden" id="connectTime" value="${htmldata.CONNECT_TIME }"/>
<input type="hidden" id="requestTime" value="${htmldata.REQUEST_TIME }"/>
<input type="hidden" id="responseTime" value="${htmldata.RESPONSE_TIME }"/>
<input type="hidden" id="domParseTime" value="${htmldata.DOM_PARSE_TIME }"/>
<input type="hidden" id="resourceTime" value="${htmldata.RESOURCE_TIME }"/>
<input type="hidden" id="loadEventTime" value="${htmldata.LOAD_EVENT_TIME }"/>
<div class="row">
    <div class="col-md-12">
		<div class="row">
		    <div class="col-md-12">
		        <div class="portlet box blue-hoki">
		            <div class="portlet-body">
		                <table class="table light table-nobordered">
		                    <tbody>
		                        <tr>
		                            <td class="text-right">访问时间：</td>
		                            <td>${htmldata.SNAPSHOT_DATE }</td>
		                            <td class="text-right">总耗时：</td>
		                            <td>${htmldata.TOTAL_TIME }</td>
		                            <td class="text-right">服务器端耗时：</td>
		                            <td>${htmldata.REQUEST_TIME }</td>
		                        </tr>
		                        <tr>
		                            <td class="text-right">运营商：</td>
		                            <td>${htmldata.OPERATOR_NAME }</td>
		                            <td class="text-right">IP：</td>
		                            <td>${htmldata.IP }</td>
		                            <td class="text-right">地理位置：</td>
		                            <td>${htmldata.PROVINCE }</td>
		                        </tr>
		                        <tr>
		                            <td class="text-right">浏览器类型：</td>
		                            <td>${htmldata.BROWSER_NAME }</td>
		                            <td class="text-right">浏览器版本：</td>
		                            <td colspan="3">${htmldata.BROWSER_VERSION }</td>
		                        </tr>
		                    </tbody>
		                </table>
		            </div>
		        </div>
		    </div>
		</div>
		<div class="row">
		    <div class="col-md-12">
		        <div class="portlet box blue-hoki">
		            <div class="portlet-body">
		                <div id="perfTimeLineChart" style="width: 100%; height: 400px;"></div>
		            </div>
		        </div>
		    </div>
		</div>
		<div class="row">
		    <div class="col-md-5">
		        <div class="portlet box blue-hoki">
		            <div class="portlet-title">
		                <div class="caption">标签类型</div>
		            </div>
		            <div class="portlet-body">
		                <div id="indTypeChart" style="width: 100%; height: 200px;"></div>
		            </div>
		        </div>
		    </div>
		    <div class="col-md-7">
		        <div class="portlet box blue-hoki">
		            <div class="portlet-title">
		                <div class="caption">域名</div>
		            </div>
		            <div class="portlet-body">
		                <div id="domainChart" style="width: 100%; height: 200px;"></div>
		            </div>
		        </div>
		    </div>
		</div>
		<div class="row">
		    <div class="col-md-12">
		        <div class="portlet box blue-hoki">
		            <div class="portlet-title">
		                <div class="caption">资源列表 TOP10</div>
		            </div>
		            <div class="portlet-body">
		                <table class="table" id="tblResource">
		                    <thead>
		                        <tr>
		                            <td style="width: 6%;">序号</td>
		                            <td style="width: 64%;">URL</td>
		                            <td style="width: 15%;">耗时(ms)</td>
		                            <td style="width: 15%;">标签</td>
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
