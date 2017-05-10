$(function(){
    $('#btn-thread').click(function(){
        var server_id = $("#server_id").attr('value');
        loadThreadInfos(server_id);
    });
    $('#btn-heap').click(function(){
    	 var server_id = $("#server_id").attr('value');
         createHeapDump(server_id);
    });
});


//加载JVM线程信息到页面中
function loadThreadInfos(server_id){
    $.ajax({
        url: webPath + '/ai/dumps/getThreadInfos',
        method: 'POST',
        data: {server_id: server_id},
        error: function(e, h, r){
            toastr['warning'](e, "加载性能区间数据出错!");
        },
        success: function(data){
            var json = eval(data);
            var len = json.length;
            var str = '';
            for (var i = 0; i < len; i++) {
            	str += json[i] + '<br>';
            }
            $('#threadId').html(str);
        }
    });
}

//在被监控tomcat中生成Heap Dump文件
function createHeapDump(server_id){
    $.ajax({
        url: webPath + '/ai/dumps/getHeapdumpStatus',
        method: 'POST',
        data: {server_id: server_id},
        error: function(e, h, r){
            toastr['warning'](e, "加载性能区间数据出错!");
        },
        success: function(data){
            var json = eval(data);
            alert(json[0].status);
        }
    });
}

