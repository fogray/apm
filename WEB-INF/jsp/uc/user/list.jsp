<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="lambo" uri="/lambo/tag"%> 
<%@ taglib uri="/lambo/fn" prefix="lambofn"%>
<!DOCTYPE html>
<html>
<head>
<title>用户列表</title>
<script>
$(document).ready(function(){

    var userTable = $("#user-query-table").DataTable({
        "processing":true,
        "serverSide":true,
        "ajax":{
            "url":"${ctx}/uc/user/getUserListData",
            "type":"post",
            "data": function ( parms ) {
                parms.USERNAME = $('[name="USERNAME"]').val();
                parms.EMAIL = $('[name="EMAIL"]').val();
                parms.GROUPIN = $('[name="GROUPIN"]').val();
                console.log(parms);
            },
            "dataSrc":function(json){
                return json.datas;
            }
        },
        "columns":[
            {"data":"USERID","className":"text-align-center"},
            {"data":"USERID"},
            {"data":"USERNAME"},
            {"data":"GROUP_NAME"},
            {"data":"EMAIL"},
            {"data":"MOBILE"},
            {"data":"QQ"}
        ],
        "columnDefs": [{
              "targets": [0],
              "data": "USERID",
              "orderable":false,
              "render": function ( data, type, full ) {
                return "<input type='radio' name='userSelect' class='icheck' id='"+data+"' value='"+data+"'/>";
              }
        }]
    });

    $("#forInsertBtn").click(function(){
        window.location.href="new";
    });
    
    $("#forUpdateBtn").click(function(){
        var checkRadio = $("[name='userSelect']:checked");
        if(checkRadio.length>0){
            var userId =checkRadio.val();
            window.location.href="update?userId="+userId;
        }else{
            toastr["warning"]("", "请选择一条记录");
        }
    });
    $("#deleteBtn").click(function(){
        var userId=$("[name='userSelect']:checked").val();
        if(userId){
            $.post("delete?userId="+userId,function(data){
                if(data=="success"){
                    var $tr=$("#"+userId).closest("tr");
                    userTable.row($tr).remove().draw();
                    toastr["success"]("", "删除成功");
                }else{
                    toastr["error"]("", "删除失败，请联系系统管理员");
                }
            },"text");
        }else{
            toastr["warning"]("", "请选择一条记录");
        }
    });
    
    $("#userListQueryBtn").on("click",function(){
        userTable.ajax.reload();
    })
    
    var message = $("#message").val();
    if(message!=""){
        toastr["success"]("", message);
    }
});
</script>
</head>
<body>
    <input type="hidden" id="message" value="${message}" />
    <div class="row margin-top-20">
        <div class="col-md-12">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="icon-settings font-white"></i>
                        <span class="caption-subject bold">用户列表</span>
                    </div>
                    <button id="forUpdateBtn" class="btn btn-primary pull-right margin-right-10" type="button">修改</button>
                    <button id="forInsertBtn" class="btn btn-primary pull-right margin-right-10" type="button">新增</button>
                </div>
                <div class="portlet-body">
                    <div class="row">
                        <div class="col-sm-3">
                            <label>用户名称</label>
                            <input name="USERNAME" class="form-control" type="text" value="${USERNAME}"/>
                        </div>
                        <div class="col-sm-3">
                            <label>电子邮箱</label>
                            <input name="EMAIL" class="form-control" type="text" value="${EMAIL}"/>
                        </div>
                        <div class="col-sm-3">
                            <label for="GROUPIN">用户组</label>
                            <select class="form-control" name="GROUPIN">
                                <option value="">请选择</option>
                                <c:forEach items="${groupEnum}" var="entry">
                                    <option value="${entry.key}" <c:if test="${entry.key == GROUP}">selected</c:if> >${entry.value}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="col-sm-3" style="padding-top:22px">
                            <button id="userListQueryBtn" class="btn btn-default" type="submit"><i class="fa fa-search"></i> 查询</button>
                        </div>
                    </div>
                    <table id="user-query-table" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>选择</th>
                                <th>用户ID</th>
                                <th>用户名称</th>
                                <th>用户组</th>
                                <th>电子邮箱</th>
                                <th>移动电话</th>
                                <th>QQ</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>