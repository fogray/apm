<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<input type="hidden" name="app_id" value="${APP.APP_ID }" />
<div class="row">
    <div class="col-md-12">
        <h3 class="page-title">服务器环境
            <small>(${RES_NAME})</small>
        </h3>
    </div>

</div>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box blue-hoki">
            <div class="portlet-body">
                <div id="gcChart1" class="main" style="width: 100%;height: 100px;">
                    <div style="width: 50%;height: 150px;  float: left;">
                    <font size="3" style="line-height:200%;font-weight:bold;">虚拟机：</font>${envsMap.VmName}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">供应商：</font>${envsMap.VmVendor}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">运行时间：</font>${envsMap.Uptime}
                    </div>
                    <div style="width: 50%;height: 150px;  float: right;">
                    <font size="3" style="line-height:200%;font-weight:bold;">JIT编译器：</font>${envsMap.compilerName}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">编译时间总计(ms)：</font>${envsMap.TotalCompilationTime}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box blue-hoki">
            <div class="portlet-body">
                <div id="gcChart2" class="main" style="width: 100%;height: 130px;">
                    <div style="width: 50%;height: 150px;  float: left;">
                    <font size="3" style="line-height:200%;font-weight:bold;">有效线程：</font>${envsMap.ThreadCount}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">高峰：</font>${envsMap.PeakThreadCount}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">守护程序线程：</font>${envsMap.DaemonThreadCount}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">已启动线程总数：</font>${envsMap.TotalStartedThreadCount}
                    </div>
                    <div style="width: 50%;height: 150px;  float: right;">
                    <font size="3" style="line-height:200%;font-weight:bold;">已装入当前类：</font>${envsMap.LoadedClassCount}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">已装入类的总数：</font>${envsMap.TotalLoadedClassCount}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">已卸载类的总数：</font>${envsMap.UnloadedClassCount}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box blue-hoki">
            <div class="portlet-body">
                <div id="gcChart3" class="main" style="width: 100%;height: 80px;">
                    <div style="width: 50%;height: 150px;  float: left;">
                    <font size="3" style="line-height:200%;font-weight:bold;">当前堆大小(Mb)：</font>${envsMap.currentHeap}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">最大堆大小(Mb)：</font>${envsMap.maxHeap}
                    </div>
                    <div style="width: 50%;height: 150px;  float: right;">
                    <font size="3" style="line-height:200%;font-weight:bold;">已分配内存(Mb)：</font>${envsMap.effectHeap}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">暂挂结束操作：</font>${envsMap.ObjectPendingFinalizationCount}个对象
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box blue-hoki">
            <div class="portlet-body">
                <div id="gcChart4" class="main" style="width: 100%;height: 280px;">
                    <font size="3" style="line-height:200%;font-weight:bold;">VM参数：</font>${envsMap.InputArguments}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">类路径：</font>${envsMap.ClassPath}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">库路径：</font>${envsMap.LibraryPath}<br>
                    <font size="3" style="line-height:200%;font-weight:bold;">引导类路径：</font>${envsMap.BootClassPath}
                </div>
            </div>
        </div>
    </div>
</div>




