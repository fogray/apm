<%@ page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page isELIgnored="false"%>

<title>新增资源</title>

<script type="text/javascript" src="${ctx}/skins/global/plugins/jquery-validation/js/jquery.validate.min.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	securityChange();
	grayChange();
    //保存
    $("#save,#saveAndContinue").on("click",function(){
        if($(this).attr("id")=="saveAndContinue"){
            $("#operateType").val("saveAndContinue");
        }else{
            $("#operateType").val("save");
        }
        $('#cmdbInfoForm').submit();
    });
    
    //返回
    $("#forReturn").on("click",function(){
        window.location.href="listCmdb";
    });
    
    //IP和端口已存在时提示
    var pk = $("input[name='ALAmsg']").val(); 
    if(pk!=null&&pk!=""){
         toastr['warning']('', pk);
    }
    
    //表单校验
    $('#cmdbInfoForm').validate({
         rules: {
        	 RES_NAME: {
                 maxlength: 50,
                 required: true
             },
             IP: {
                 required: true,
                 maxlength: 40
             },
             PORT: {
                 required: true,
                 maxlength: 6
             },
             ACCESS_NAME: {
                 required: true
             },
             ACCESS_PWD: {
                 required: true
             },
             GROUP_NO: {
                 required: true
             }
         },
         submitHandler:function(form){
            form.submit();
         }
     });
});


//是否启用安全性
function securityChange() {
    var value = $('input[name="IS_START_SECURITY"]:checked').val();  //取单选值
       if (value == '0') {
           $("input[name='ACCESS_NAME']").val("");
           $("input[name='ACCESS_PWD']").val("");  
           $("#userDiv").css("display", "none");
           $("#passwdDiv").css("display", "none");
       } else if (value == '1'){
           $("#userDiv").css("display", "");
           $("#passwdDiv").css("display", "");
       }
     }
     
//环境类型选择  灰度/生产
function grayChange() {
    var value = $('input[name="IS_GRAY"]:checked').val();  //取单选值
       if (value == '1') {
    	   //灰度环境
           $("input[name='GROUP_NO']").attr("disabled",true);
           $("#GRAY_ID").empty(); 
           $("#grayidDiv").css("display", "none");
           $("#groupidDiv").css("display", "none");
       } else if (value == '2'){
    	   //生产环境
    	    $("input[name='GROUP_NO']").attr("disabled",false);
           $("#grayidDiv").css("display", "");
           $("#groupidDiv").css("display", "");
           //ajax请求获取所属灰度Select下拉
           $.ajax({
               url: webPath + '/gray/cmdb/getGrayList',
               method: 'POST',
               error: function(e, h, r){
                   toastr['warning'](e, "加载灰度下拉列表信息出错!");
               },
               success: function(data){
            	 $("#GRAY_ID").empty();
            	   var json = eval(data);
                   var len = json.length;
                   for (var i = 0; i < len; i++) {
                	   $("#GRAY_ID").append("<option value='"+json[i].RES_ID+"'>"+json[i].RES_NAME+"</option>");
                   }
               }
           });
       }
     }

</script>

<!-- 顶部菜单区域 -->
<div id="content-header">
         <h1>新增资源</h1>
         <div id="page-btn-container" class="page-btn-container">
          <button id="save" type="button"  class="btn btn-primary">保存</button>
          <button id="saveAndContinue"  type="button"  class="btn btn-primary">保存并继续</button>
          <button id="forReturn" type="button" class="btn btn-primary">返回</button>
      </div>
          
</div>
<div id="content-container">
    <div class="row">
        <div class="col-sm-8">
        <form id="cmdbInfoForm"  method="post" action="saveNewCmdb"  class="form sl_table" data-parsley-validate>
                <div class="form-group">
                 <label>Tomcat资源名称：</label>
                 <input type="text"  class="form-control" name="RES_NAME"  value="${quartzLine.RES_NAME}" data-parsley-required/>
                </div>
                <div class="form-group">
                  <label>IP：</label>
                 <input type="text"  class="form-control" name="IP"  value="${quartzLine.IP}" data-parsley-required/>
                </div>
                <div class="form-group">
                  <label>端口：</label>
                 <input type="text"  class="form-control" name="PORT"  value="${quartzLine.PORT}" data-parsley-required/>
                </div>
                <div class="form-group">
                 <label>是否启用安全性：</label>
                 <br>
                 <input type="radio"  name="IS_START_SECURITY"  value="0" <c:if test="${quartzLine.IS_START_SECURITY  eq '0' }">checked</c:if> onclick="securityChange()" data-parsley-required/>否
                 <input type="radio"   name="IS_START_SECURITY"  value="1" <c:if test="${quartzLine.IS_START_SECURITY  eq '1' || quartzLine.IS_START_SECURITY eq null}">checked</c:if> onclick="securityChange()"  data-parsley-required/>是
                </div>

                <div class="form-group" id="userDiv">
                  <label>用户名：</label>
                 <input type="text"  class="form-control" name="ACCESS_NAME"  value="${quartzLine.ACCESS_NAME}" data-parsley-required/>
                </div>
                <div class="form-group" id="passwdDiv">
                  <label>密码：</label>
                 <input type="password"  class="form-control" name="ACCESS_PWD"  value="${quartzLine.ACCESS_PWD}"/>
                </div>
                <div class="form-group">
                 <label>是否监控：</label>
                 <br>
                 <input type="radio"   name="IS_MONITOR"  value="1" <c:if test="${quartzLine.IS_MONITOR  eq '1' || quartzLine.IS_MONITOR eq null}">checked</c:if>  data-parsley-required/>是
                 <input type="radio"  name="IS_MONITOR"  value="0" <c:if test="${quartzLine.IS_MONITOR  eq '0' }">checked</c:if> data-parsley-required/>否
                </div>
                
                
                 <div class="form-group">
	                 <label>环境类型：</label>
	                 <br>
	                 <input type="radio"   name="IS_GRAY"  value="1" <c:if test="${quartzLine.IS_GRAY  eq '1' || quartzLine.IS_GRAY eq null}">checked</c:if> onclick="grayChange()"  data-parsley-required/>灰度
	                 <input type="radio"  name="IS_GRAY"  value="2" <c:if test="${quartzLine.IS_GRAY  eq '2' }">checked</c:if> onclick="grayChange()" data-parsley-required/>生产
	            </div>
	            <div class="form-group" id="grayidDiv" style="color:#F00">
	                 <label>所属灰度：</label>
	                 <br>
	                 <select id="GRAY_ID" name="GRAY_ID" style="width:200px;"></select>  
                </div>
                <div class="form-group" id="groupidDiv">
	                 <label>生产组号：</label>
	                 <br>
	                 <input type="radio"   name="GROUP_NO"  value="1" <c:if test="${quartzLine.GROUP_NO  eq '1' || quartzLine.GROUP_NO eq null}">checked</c:if> data-parsley-required/>组1
	                 <input type="radio"  name="GROUP_NO"  value="2" <c:if test="${quartzLine.GROUP_NO  eq '2' }">checked</c:if>  data-parsley-required/>组2
	                 <input type="radio"  name="GROUP_NO"  value="3" <c:if test="${quartzLine.GROUP_NO  eq '3' }">checked</c:if>  data-parsley-required/>组3
                </div>
                
        <input type="hidden" id="operateType" name="OPERATE_TYPE" value="save"/>
        </form>
    </div>
    <div class="col-sm-4">
            <div id="helpPortlet" class="portlet">
                <div class="portlet-header">
                    <h4>使用帮助</h4>
                </div> 
                <div class="portlet-content" style="max-height:480px">
                    <p>无</p>
                </div> 
            </div>
        </div>
    </div>
</div>