var webPath;
var paths = document.location.pathname.split("/");
if (paths[0] == '') {
    webPath = "/" + paths[1];
} else {
    webPath = "/" + paths[0];
}
$(function(){
    //日期范围选择下拉框
    $('#dtSelector ul li a').click(function(){
        $('ul li', $(this).parents('#dtSelector')).removeClass('select');
        var text = $(this).text();
        $('#dtLabel', $(this).parents('#dtSelector')).html('最新'+text);
        $(this).parent('li').addClass('select');
    });
    if($('#dtSelector ul li').length > 0 && $('#dtSelector ul li.select').length == 0) 
        $('#dtSelector ul li a')[0].click();
    
    $('.bi-select>ul>li>a').click(function(){
        $('ul li', $(this).parents('.bi-select')).removeClass('select');
        var text = $(this).text();
        $('.label', $(this).parents('.bi-select')).html(text);
        $(this).parent('li').addClass('select');
    });
    $('.bi-select>ul>li.select').each(function(){
        var text = $(this).text();
        $('.label', $(this).parents('.bi-select')).html(text);
    });
});

/**
 * yyyyMMdd HH:MI:SS字符串转换成日期
 * @param str
 */
var DateTool = {
    /**
     * 字符串转换日期
     * @param str
     * @returns {Date}
     */
    parseToDate : function(str){
        var year = str.substring(0, 4);
        var month = str.substring(4, 6);
        var day = str.substring(6, 8);
        var time = str.substring(9, 16);
        return new Date(year+'/'+month+'/'+day+' '+time);
    },
    /**
     * 日期转换字符串
     * @param date
     * @param formatStr：yyyy:年、MM:月、dd:日、hh:小时、mm:分钟、ss:秒
     * @returns
     */
    parseToStr : function(date, formatStr) {
        var timeValues = function() {
        };
        timeValues.prototype = {
            year : function() {
                if (formatStr.indexOf("yyyy") >= 0) {
                    return date.getFullYear();
                } else {
                    return date.getFullYear().toString().substr(2);
                }
            },
            elseTime : function(val, formatVal) {
                return formatVal >= 0 ? (val < 10 ? "0" + val : val) : (val);
            },
            month : function() {
                return this.elseTime(date.getMonth() + 1, formatStr.indexOf("MM"));
            },
            day : function() {
                return this.elseTime(date.getDate(), formatStr.indexOf("dd"));
            },
            hour : function() {
                return this.elseTime(date.getHours(), formatStr.indexOf("hh"));
            },
            minute : function() {
                return this.elseTime(date.getMinutes(), formatStr.indexOf("mm"));
            },
            second : function() {
                return this.elseTime(date.getSeconds(), formatStr.indexOf("ss"));
            }
        };
        var tV = new timeValues();
        var replaceStr = {
            year : [ "yyyy", "yy" ],
            month : [ "MM", "M" ],
            day : [ "dd", "d" ],
            hour : [ "hh", "h" ],
            minute : [ "mm", "m" ],
            second : [ "ss", "s" ]
        };
        for ( var key in replaceStr) {
            formatStr = formatStr.replace(replaceStr[key][0], eval("tV." + key
                    + "()"));
            formatStr = formatStr.replace(replaceStr[key][1], eval("tV." + key
                    + "()"));
        }
        return formatStr;
    }
};

/**
 * Popup Window工具
 */
var PopWinUtil = {
    retCallback : null,
    showPopWin : function(url, params, wrapObj, returnCallback) {
        $('#popup-win').remove();
        var modalObj = $('#popup-win');
        if(modalObj.length == 0) {
            var m = '<div id="popup-win" role="dialog" class="modal fade" aria-labelledby="myModalLabel">'
                        +'<div class="modal-dialog" role="document">'
                            +'<div class="modal-header">'
                                +'<button type="button" class="close1" data-dismiss="modal" aria-hidden="true">×</button>';
            if (params && params.showTitle != 'No') {
                m += '<h3 class="modal-title popup-title"></h3>';
            }
            m += '</div>'
                +'<div class="modal-body" id="modal-body"> </div>'
                +'</div></div>';
            wrapObj.append(m);
            modalObj = $('#popup-win');
        }
        //设置初始化参数
        var title = '', w = '80%', h = '80%';
        if (params) {
            title = params.title;
            w = params.width ? params.width : w;
            h = params.height ? params.height : h;
        }
        $('.popup-title', modalObj).html(title);
        modalObj.css('width', w);
        modalObj.css('height', h);
        $('.close1', modalObj).click(function(){PopWinUtil.closePopWin(modalObj);});
        modalObj.css('display', 'block');
        
        $('#modal-body', modalObj).html('<iframe id="popupFrame" class="ifrm-detail" src=""></iframe>');
        //$('.popup-body', modalObj).css('height', $('.popup-content', modalObj)[0].clientHeight - $('.popup-header', modalObj)[0].clientHeight-$('.popup-footer', modalObj)[0].clientHeight);
        modalObj.modal({modalOverflow: true});
        $('#popupFrame', modalObj).attr('src', url);
        //回调函数
        if (returnCallback) {
            retCallback = returnCallback;
        }
    },
    closePopWin : function(obj) {
        var p = obj.parent('.modal-scrollable'), mask = p.next('.modal-backdrop');
        p.remove();mask.remove();obj.remove();
    }
};

var PropgressTool = {
    init: function(bw, label, value, title, data_params) {
        var dataStr = '';
        if (data_params) {
            for (var key in data_params) {
                dataStr += key + '="' + data_params[key]+'" ';
            }
        }
        return '<div class="row progress pages" '+dataStr+' title="'+(title ? title : label)+'">'
                    + '<div class="col-md-9 progress-content">'
                        + '<div class="progress-bar progress-bar-success" role="progressbar" style="width: '+bw+'px"></div>'
                      + '<span class="progress-label">'+label+'</span>'
                   + '</div>'
                   + '<div class="col-md-3 progress-value">'+value+'</div>'
               + '</div>';
    }
};
/**
 * ajax请求成功回调函数
 * 
 * @param jsonData 返回数据
 * @param wrapObj 外围div
 * @param noDataText 没有数据时显示的文字或执行的回调函数
 * @param dataCallback 有数据时，调用的回调函数
 * @returns
 */
var ajaxSuccess = function(jsonData, wrapObj, noDataText, dataCallback) {
    var len = jsonData.length;
    if (len > 0 && jsonData[0] != null) {
        if (typeof dataCallback == 'function') {
            dataCallback(jsonData);
        }
        if (typeof dataCallback == 'string') {
            eval(dataCallback+'('+jsonData+')');
        }
    } else {
        if (typeof noDataText == 'function') {
            noDataText;
        } else if (typeof noDataText == 'string') {
            $(wrapObj).html('<div class="no-record">'+noDataText+'</div>');
        }
        
    }
};