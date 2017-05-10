$(function(){
    $('.btn-modify').click(function(){
        var wrap = $(this).parent();
        $(this).addClass('hidden');
        $('.btn-save', wrap).removeClass('hidden');
        $('.btn-cancel', wrap).removeClass('hidden');
        $('#appset-form .form-group input[disabled]').attr('disabled',false);
    });
    $('.btn-cancel').click(function(){
        var wrap = $(this).parent();
        $(this).addClass('hidden');
        $('.btn-save', wrap).addClass('hidden');
        $('.btn-modify', wrap).removeClass('hidden');
        $('#appset-form .form-group input').attr('disabled',true);
    });
    $('.btn-save').click(function(){
        saveApp();
    });
});

function saveApp(){
    $.ajax({
        url: webPath + '/bi/app/updateApp',
        type: 'post',
        data: $('#appset-form').serialize(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'text',
        error: function(e, h, r){
            toastr['warning'](e, '更新应用信息出错');
        },
        success: function(msg){
            if (msg == 'success') {
                toastr['success']('', '更新应用信息成功');
                $('.btn-cancel').click();
            } else {
                toastr['warning']('', '更新应用信息出错');
            }
        }
        
    });
}
