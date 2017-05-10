$(function(){
    $('.app-list>.app-item').each(function(){
        var appId = $('input[name="app_id"]', $(this)).val();
        $(this).click(function(){
            if (appId){
                var url = webPath + '/bi/portal/appconsole?app_id='+appId;
                window.location.href = url;
            }
        });
        loadAppNewStatistics(this, appId);
    });
    $("#saveApp").on("click",function(){
        saveApp();
    });
});

function btnAddAppClick(obj) {
	$('#appName').val('');
	$('#appDesc').val('');
    $('#divSaved').css('display', 'none');
	$(obj).attr('data-target', '#addAppModal');
}

//保存添加的应用
function saveApp(){
    var appName = $('#appName').val();
    if (appName==null || appName == '') {
        toastr['warning'](null, "请输入应用名称!");
        return false;
    }
    $.ajax({
        url: webPath + '/bi/app/addApp',
        type: 'post',
        data: $('#app-form').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        error: function(e,h,r) {
            toastr['warning'](e, "添加应用失败!");
        },
        success: function(data) {
            try{
                var jsonData = eval(data), appId = jsonData.APP_ID;
                $('#appId').html(appId);
                $('#divSaved').css('display', 'block');
            }catch(e){
                toastr['warning'](e, "添加应用失败!");
            }
        }
    });
}

function loadAppNewStatistics(obj, appId){
    $.ajax({
        url: webPath + '/bi/portal/getNewStatisticData',
        data: {app_id: appId},
        error: function(e, h, r) {
            
        },
        success: function (data) {
            if (data!=null) {
                var json = eval(data);
                $('#perfApdex',$(obj)).html(json.APDEX);
                $('#perfTime',$(obj)).html(Math.round(100*parseFloat(json.PERF_AVG_TIME)/1000)/100 + 's');
                $('#perfPv',$(obj)).html(json.REQ_COUNT);
                $('#xhrTime',$(obj)).html(Math.round(100*parseFloat(json.XHR_AVG_TIME)/1000)/100 + 's');
                $('#jserrCount',$(obj)).html(json.ERR_COUNT);
            }
        }
    });
}