<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<link href="${ctx }/jsp/bi/app/console.css" rel="stylesheet"></link>
<script type="text/javascript" src="${ctx }/jsp/bi/app/console.js"></script>

<div class="row">
    <div class="col-md-10">
        <h3 class="page-title">应用设置</h3>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box light">
            <div class="portlet-body form">
                <form class="form-inline" role="form" id="appset-form">
                    <div class="form-body">
                        <h3 class="form-section">基本信息
                            <span class="pull-right">
                                <a class="btn btn-success btn-xs btn-save hidden" >保存</a>
                                <a class="btn btn-success btn-xs btn-cancel hidden" >取消</a>
                                <a class="btn btn-success btn-xs btn-modify">修改</a>
                            </span>
                        </h3>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group col-md-12">
                                    <label class="col-sm-4 control-label" for="appId">应用ID:</label>
                                    <div class="col-sm-8">
                                        <label class=""> ${APP.APP_ID } </label>
                                    </div>
                                </div>
                            </div>
                            <!--/span-->
                            <div class="col-md-6">
                                <div class="form-group col-md-12">
                                    <label class="col-sm-4 control-label" for="appName">应用名称:</label>
                                    <div class="col-sm-8">
                                        <input type="text" name="APP_NAME" maxlength="30" class="form-control" id="appName" disabled value="${APP.APP_NAME }"/>
                                    </div>
                                </div>
                            </div>
                            <!--/span-->
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group col-md-12">
                                    <label class="col-sm-2 control-label" for="appDesc">应用描述信息:</label>
                                    <div class="col-sm-10">
                                        <input type="text" name="APP_DESC" maxlength="50" class="form-control" id="appDesc" disabled value="${APP.APP_DESC }"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h3 class="form-section">阈值设置</h3>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-5 control-label" for="slowPageTime">慢查询超时时间:</label>
                                    <div class="col-sm-6">
	                                    <input type="number" name="SLOW_PAGE_TIME" class="form-control number" id="slowPageTime" disabled value="${APP.SLOW_PAGE_TIME }"/>
                                    </div>
                                    <div class="col-sm-1">
                                        <em>ms</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-5 control-label" for="apdexSatis">Apdex满意时间:</label>
                                    <div class="col-sm-6">
	                                    <input type="number" name="APDEX_SATIS_BOUND" class="form-control number" id="apdexSatis" disabled value="${APP.APDEX_SATIS_BOUND }"/>
                                    </div>
                                    <div class="col-sm-1">
                                        <em>ms</em>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-5 control-label" for="apdexTolerate">Apdex可容忍时间:</label>
                                    <div class="col-sm-6">
	                                    <input type="number" name="APDEX_TOLERATE_BOUND" class="form-control number" id="apdexTolerate" disabled value="${APP.APDEX_TOLERATE_BOUND }"/>
                                    </div>
                                    <div class="col-sm-1">
                                        <em>ms</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
