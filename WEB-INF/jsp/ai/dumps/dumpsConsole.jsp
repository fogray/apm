<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<script type = "text/javascript" src="${ctx}/skins/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js"></script>
<script type="text/javascript" src="${ctx }/jsp/ai/dumps/dumpsConsole.js"></script>
<input type="hidden" id = "server_id" value="${serverId}" />
<div class="row">
    <div class="col-md-8">
        <h3 class="page-title">Dump文件
            <small>线程dump及生成heap Dump(${RES_NAME})</small>
        </h3>
    </div>
        <div class="col-md-4" style = "text-align:right">
            <button id = "btn-thread" type="button" style ="color: #ffffff;background-color: #1ca8dd;border-color: #0076a6; padding:5px 10px;font-size: 12px;">线程 Dump</button>
            <button id = "btn-heap" type="button" style ="color: #ffffff;background-color: #1ca8dd;border-color: #0076a6; padding:5px 10px;font-size: 12px;"  data-original-title = "确定生成Heap Dump文件吗 ?可能会生成几个G的大文件。" data-toggle = "confirmation" data-placement="bottom">生成Heap Dump</button>
       </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box blue-hoki">
            <div class="portlet-body">
                <div id="gcChart1" class="main" style="_height:200px; min-height:200px;">
                    <div id = "threadId" style="width: 30%;height: 100%;">

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>





