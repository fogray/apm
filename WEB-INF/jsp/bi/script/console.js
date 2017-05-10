var time_region = null;
$(function(){

    $('#scriptListTab>li>a').click(function(){
        var h = $(this).attr('href').substring(1);
        switch(h) {
            case 'tab_errList': loadErrorMsgList(); break;
            case 'tab_errPage': loadErrorPageList(); break;
        }
    });

    $('#dtSelector ul li a').click(function(){
        time_region = $(this).attr('value');
        //加载错误信息列表，按照发生次数从大到小的顺序
        $('#scriptListTab>li>a')[0].click();
    });
});

//加载错误信息列表
function loadErrorMsgList(){
    var $errMsglist = $('#errorMsgList');
    $errMsglist.html('');
    $.ajax({
      url: webPath + '/bi/script/getErrorMsgList',
      method: 'POST',
      data: {time_region: time_region},
      error: function(e, h, r){
          toastr['warning'](e, "加载错误信息列表出错!");
      },
      success: function(data){
          var json = eval(data);
          ajaxSuccess(json, $errMsglist, '没有脚本错误数据', function(){
              var len = json.length, div = '';
              var sw = parseFloat($errMsglist.css('width')), st = 1;
              for (var i = 0; i < len; i++) {
                  var c = parseInt(json[i].ERR_COUNT, 10);
                  if (i == 0) st = c;
                  var w = (sw-40)*(c/st), errorMsg = json[i].ERROR_MSG;
                  div += PropgressTool.init(w, errorMsg, c, null, {'data-errormsg': encodeURI(errorMsg)});
              }
              $errMsglist.html(div);
              
              //默认发生次数最多的错误信息的详细
              if ($('.pages', $errMsglist).length > 0) {
                  //访问页面列表
                  $('.pages').each(function(){
                      $(this).click(function(){
                          $('.pages', $(this).parent()).removeClass('selected');
                          $(this).addClass('selected');
                          var errorMsg= $(this).attr('data-errormsg');
                          forErrorDetail(1, errorMsg);
                      });
                  });
                $($('.pages', $errMsglist)[0]).click();
              }
          });
      }
    });
}

//加载出错页面列表
function loadErrorPageList(){
    var $errPagelist = $('#errorPageList');
    $errPagelist.html('');
    $.ajax({
      url: webPath + '/bi/script/getErrorPageList',
      method: 'POST',
      data: {time_region: time_region},
      error: function(e, h, r){
          toastr['warning'](e, "加载出错页面列表出错!");
      },
      success: function(data){
          var json = eval(data);
          var len = json.length, div = '';
          var sw = parseFloat($errPagelist.css('width')), st = 1;
          for (var i = 0; i < len; i++) {
              var c = parseInt(json[i].ERR_COUNT, 10);
              if (i == 0) st = c;
              var w = (sw-40)*(c/st), errorPage = json[i].PAGE_URL;
              div += PropgressTool.init(w, errorPage, c, null, {'data-errorpage': errorPage});
          }
          $errPagelist.html(div);
          
          //默认发生次数最多的页面的脚本错误详细
          if ($('.pages', $errPagelist).length > 0) {
              //访问页面列表
              $('.pages').each(function(){
                  $(this).click(function(){
                      $('.pages', $(this).parent()).removeClass('selected');
                      $(this).addClass('selected');
                      var errorPage= $(this).attr('data-errorpage');
                      forErrorDetail(2, errorPage);
                  });
              });
            $($('.pages', $errPagelist)[0]).click();
          }
      }
    });
}
//加载脚本错误详细
function forErrorDetail(tabType, paramV){
    $('#detail_title').html(decodeURI(paramV));
    var $detailList = $('#detail_list');
    $detailList.html('');
    $.ajax({
      url: webPath + '/bi/script/getScriptErrInfo',
      method: 'POST',
      data: {time_region: time_region, page_url: (tabType == 2?paramV:''), error_msg: (tabType == 1?paramV:'')},
      error: function(e, h, r){
          toastr['warning'](e, "加载脚本错误详细出错!");
      },
      success: function(data){
          var json = eval(data);
          var len = json.length;
          for (var i = 0; i < len; i++) {
              var row = '<div class="row">'
                           + '<div class="col-md-12">'
                                + '<div class="portlet box blue-hoki">'
                                    + '<div class="portlet-title">'
                                        + '<div class="caption">访问页面：<em>'+json[i].PAGE_URL+'</em></div>'
                                    + '</div>'
                                    + '<div class="portlet-body">'
                                        + '<table class="table table-nobordered table-fixed script-table">'
                                            + '<tbody>'
                                                + '<tr>'
                                                    + '<td class="text-right">发生时间：</td><td>'+json[i].SNAPSHOT_DATE+'</td>'
                                                    + '<td class="text-right">操作系统：</td><td>'+json[i].OS_NAME+' '+json[i].OS_VERSION+'</td>'
                                                + '</tr>'
                                                + '<tr>'
                                                    + '<td class="text-right">浏览器：</td><td>'+json[i].BROWSER_NAME+'</td>'
                                                    + '<td class="text-right">浏览器版本：</td><td>'+json[i].BROWSER_VERSION+'</td>'
                                                + '</tr>'
                                                + '<tr>'
                                                + '<td class="text-right">脚本文件：</td><td>'+json[i].ERROR_FILE+'</td>'
                                                + '<td class="text-right">行号：</td><td>'+json[i].ERROR_LINE+'</td>'
                                            + '</tr>'
                                                + '<tr>'
                                                    + '<td class="text-right">错误次数：</td><td>'+json[i].ERR_COUNT+'</td>'
                                                    + '<td class="text-right">错误信息：</td><td>'+json[i].ERROR_MSG+'</td>'
                                                + '</tr>'
                                            + '</tbody>'
                                        + '</table>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                        + '</div>';
              $detailList.append(row);
          }
      }
    });
}