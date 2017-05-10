/**helpId:帮助框id， relHidden：用来存放id隐藏域的值，where：查询条件，callBack:回调函数，
 * options：{
 *           multiSelect-是否多选-true（默认）/false
 *           model-调用模式-button/default（默认）
 *          }
 **/
$(function(){
	var ctx = $("#ctx").val();
	$.fn.commonHelp=function(options){
		var opts = $.extend({}, $.fn.commonHelp.defaults, options);
		var helpId = opts.helpId;
		var relHidden = opts.resultInput;
		var where = opts.helpWhere;
		var callBack = opts.callBack;
		var $this=$(this);
		$.ajax({
			type:'post',
			dataType:'json',
			url:ctx+'/system/commonhelp/queryPubCommonHelp',
			data:{helpId:helpId},
			success:function(base){
				var triggerBtn = $this;
				$this.each(function(){
				   //整理dom
			       if(opts.model=="default"){
				 	   $(this).find(".arrow").remove();
					   $(this).find(".result").remove();
					   $(this).find(".ac_input").val("");
					   $(this).append("<span class='input-group-btn'><button class='btn arrow' type='button'><i class='fa fa-reorder'></i></button></span><div class='result'><div class='content'></div></div>");
					   var $input=$(this).find("input.text");
					   if(!$input.attr("name")){
						   $input.attr("name",Math.floor(Math.random()*10000000));
					   }
					   //$(this).width(Math.abs($input.width())+38);				
				       triggerBtn = $(".arrow",$this);
			       }else if(opts.model=="change"||opts.model=="button"){
					   var $input=$(this).find("input.text");
					   if(!$input.attr("name")){
						   $input.attr("name",Math.floor(Math.random()*10000000));
					   }
					  // $(this).width(Math.abs($input.width())+16);				
			       }
			       
			       
				   
				   if(opts.model=="change"){
					   var resultBox=ResultBox($this,helpId,relHidden,where,opts,callBack,base);
					   //resultBox.init();
					
				       var helpList=HelpList(resultBox,$this,helpId,where,opts,base);
					   if(!window.commonHelpDomReady){
						   helpList.domInit();
					   }
					   if(opts.beforeShow()){
						   var page=1;
						   App.startPageLoading({animate: true});
						   helpList.setLastResult();
						   helpList.getData(page,function(count){
							   
							   ResultSearch(helpList);
							   helpList.layerShow();
							   Pagination(count,helpList);//初始化分页控制按钮
							   App.stopPageLoading();
						   }); 
					   }
				   }else{
					   
					   var resultBox=ResultBox($this,helpId,relHidden,where,opts,callBack,base);
					   resultBox.init();
					
				       var helpList=HelpList(resultBox,$this,helpId,where,opts,base);
					   if(!window.commonHelpDomReady){
						   helpList.domInit();
					   }
					   
					   $this.find("input.text").chAutoComplete(resultBox,helpId,relHidden,where,opts,base);
					   triggerBtn.unbind("click");
					   triggerBtn.click(function(){
						   if(opts.beforeShow()){
							   var page=1;
							   App.startPageLoading({animate: true});
							   helpList.setLastResult();
							   helpList.getData(page,function(count){
								   ResultSearch(helpList);
								   helpList.layerShow();   
								   Pagination(count,helpList);//初始化分页控制按钮
								   App.stopPageLoading();
							   }); 
						   }
					  }) 
					  if(opts.showHelpListImmediately){
						 triggerBtn.click();
					  }
					 
				 }
			})
		}
		})
		return $this;
		
	}
	/**
	 * 默认参数
	 */
	$.fn.commonHelp.defaults={
			multiSelect:true,
			model:"default",
			beforeShow:function(){
				return true;
			},
			showHelpListImmediately:false
		}
	/**
	 *快捷结果
	**/
	var ResultBox=function(box,helpId,relHidden,where,opts,callBack,base){
		
		var container=$(".result",box),
		$helpText=$(".text",box),
		$relHidden=$(relHidden),
		idStr=$relHidden.val(),
		idArr=[],
		nameArr=[],
		resultArr=[],
		t;	
		
		if(opts.model=="change"){
			$relHidden=$(relHidden,box);
		}
		
		function showAndHide(){
			if(resultArr.length>0){
				container.show();
				t=setTimeout(function(){
					container.hide();
				},2000)
			}
		}

		function setHelpText(n){
			if(n==0){
				$helpText.val("");
			}else if(n==1){
				var itemData = resultArr[0];
				$helpText.val(itemData[sName(base.nameField)]);
			}else{
				$helpText.val("已选中"+n+"个记录");
			}
		}

		function addItems(items,action){
			if(items.length==0){
				clearResults();
			}
			for(var i=0;i<items.length;i++){
				var itemData=items[i];
				var itemId=itemData[sName(base.idField)];
				if(idArr.in_array(itemId)==false){
					resultArr.push(itemData);
					idArr.push(itemId);
					idStr=idArr.join(",");
					$relHidden.val(idStr);
                    
					//当有一些列没有获取到内容时，oracle下返回的值里面不会有相应的key，此时从数组里面取值是 undefined，此变量为了将undefined变为 ''显示
					var nameField ='';
					nameField  = itemData[sName(base.nameField)];
					var html="";
					html+="<div class='item' itemId='"+itemData[sName(base.idField)]+"'>";
					html+="<span class='item-text'>"+itemData[sName(base.codeField)]+"#"+(nameField===undefined?'':nameField)+"</span>";
					html+="<div class='remove'></div>";
					html+="</div>";
					$(".content",container).append($(html).data("data",itemData));
					setHelpText(idArr.length);
				}
			}
			//showAndHide();
			if(callBack){
				if(action == "init"){
					callBack(resultArr,box,"init");
				}else if(resultArr.length == "0"){
					callBack(resultArr,box,"clear");
				}else{
					callBack(resultArr,box,"update");
				}
				
			}
			
		}
		
		function deleteItem(itemData){
			var itemId=itemData[sName(base.idField)];
			for(var i=0;i<idArr.length;i++){
				if(itemId==idArr[i]){
					idArr.splice(i,1);
					resultArr.splice(i,1);
					idStr=idArr.join(",");
					$relHidden.val(idStr);
					$(".item[itemId='"+itemId+"']",container).remove();
				}
			}
			setHelpText(idArr.length);
			if(callBack){
				if(resultArr.length == 0){
					callBack(resultArr,box,"clear");
				}else{
					callBack(resultArr,box,"update");
				}
				
			}
		}
		//点击清除按钮，执行回调函数
		function clearItemsCall(){		
			if(callBack){
				callBack(resultArr,box,"clear");
		  }
		}
		
		function clearResults(){
			resultArr=[];
			idArr=[];
			nameArr=[];
			idStr="";
			$relHidden.val("");
			container.hide().find(".content").html("");
			setHelpText(0);
		}
		
		
		var Events={
			remove:function(){
				$(container).on("click",".remove",function(){
					var $item=$(this).closest(".item");
					var itemData=$item.data("data");
					deleteItem(itemData);
				})
			},
			hover:function(){
				box.hover(function() {
					clearTimeout(t);
					if(resultArr.length>0){
//						if($helpText.val().indexOf("已选中")>-1){
//							container.show();
//						}
						container.show();
					}
				},function(){
					t=setTimeout(function(){
						container.hide();
					},500)
				});
			},
			keyDown:function(){
				$helpText.keyup(function(){
					if($helpText.val().length>0){
							container.hide();
					}
				})
			},
			helpText:function(){
				var helpTextCache="";
				$helpText.focus(function() {
					var $this=$(this);
					if ($this.val().indexOf("已选中")>-1) {
						$this.val("").addClass("active");
					}
					helpTextCache = $this.val();
				});
				$helpText.blur(function() {
					var $this=$(this);
					var idLen = idArr.length;
					if(idLen>1){
						setHelpText(idArr.length);	
					}else{
						$this.val(helpTextCache);
					}
					$this.removeClass("active");
				});
			}
			
			
		}
		return {
			init:function(){
				for(one in Events){
					Events[one]();
				}
				if(idStr==""){
					if(callBack){
						callBack(resultArr,box,"init");
					}
					return ;
				}
				
				var whereL = where.substring(0,where.indexOf("="));
				var whereR = where.substring(where.indexOf("=")+1,where.length);
				
				var dataP = {helpId:helpId,idStr:idStr};
				dataP[whereL]=whereR;
				
				$.ajax({
					type:'post',
					dataType:'json',
					url:ctx+'/system/commonhelp/queryDataById',
					data:dataP,
					beforeSend:function(){},
					success:function(obj){
						addItems(obj,"init");
					}
				})
			},
			show:function(){
				showAndHide();
			},
			hide:function(){
				container.hide();
			},
			addItems:function(items){
				addItems(items);
			},
			deleteItems:function(itemData){
				deleteOneItem(itemData);
			},
			clearItemsCall:function(){
				clearItemsCall();
			},
			clearResults:function(){
				clearResults();
			},
			getResultArr:function(){
				return resultArr;
			},
			getIdArr:function(){
				return idArr;
			},
			getIdStr:function(){
				return idStr;
			}
		}
	}
	/**
	 *弹出框
	**/
	var HelpList=function(resultBox,box,helpId,where,opts,base){
		var Events={
			helplistKeyDown:function(){
				$("#helplist").keyup(function(event){
					if(event.keyCode == 13){
						event.preventDefault();
						if(document.activeElement != $('#helplist .search-text')[0]){
							$("#helplist .title .confirm").click();
						}
					}
				})
			},
			itemRemove:function(){
				$("#helplist .result").on("click",".remove",function(){
					var item=$(this).closest(".item");
					var itemId=item.attr("itemId");
					item.remove();
					$("#"+itemId,"#helplist").attr("checked",false);
				})
			},
			clear:function(){
				$("#helplist .title .clear").click(function(event){
					/*
					 * 为了兼容巨坑ie浏览器，不得不将$("#helplist .result")高度先设置为0，稍后再改为auto
					 */
					$("#helplist .result").height(0).html("");             
					$("#helplist .checkbox").attr("checked",false);
					resultBox.clearResults();					
					//点击清楚按钮，也要判断一下回调函数
					resultBox.clearItemsCall();
					$("#helplist .result").height("auto");
					
				})
			},
			close:function(){
				$("#helplist .title .close").click(function(e){   
					$(this).closest("#helplist").modal("destroy").unbind().find("*").unbind();
				})
			},
			confirm:function(){
				$("#helplist .title .confirm").click(function(event){
					var datas=[];
					var items=$("#helplist .result .item");
					for(var i=0;i<items.length;i++){
						var item=items[i];
						datas.push($(item).data("data"));
					}
					resultBox.clearResults();
					resultBox.addItems(datas);
					$("#helplist").modal("destroy").unbind().find("*").unbind();
				})
			
			},
			searchText:function(){
				var vdefault = "按名称或编码查询";
				var $searchText=$('#helplist .search-text').val(vdefault).removeClass("active");
				$searchText.focus(function() {
					if ($(this).val() == vdefault) {
						$(this).val("").addClass("active");
					}
				});
				$searchText.blur(function() {
					if ($(this).val()== "") {
						$(this).val(vdefault).removeClass("active");
					}
				});
			}
			
		}
		
		function initTableHead(){
			var showName=base.showName;
			var showNameArr=showName.split(",");
			var tHeadStr="<tr>";
			if(opts.multiSelect){
			   tHeadStr+="<th class='indexTh' > <input type='checkbox' class='v6help-check-all' name='help-index'  /> </th>";
			}else{
				tHeadStr+="<th class='indexTh' > <input disabled='true' type='radio' name='help-index'  /> </th>";
			}
			for(var i=0;i<showNameArr.length;i++){
				var confArr=showNameArr[i].split("#");
				tHeadStr+="<th orderBy='"+confArr[0]+"'>"+confArr[1]+"</th>";
			}
			tHeadStr+="</tr>";
			$("#helplist thead").html(tHeadStr);
			
			
			var helpTitle=base.helpTitle;
			$("#helplist .title .text").text(helpTitle);
		}
		function initTableBody(datas){
			var tBodyStr="";
			var idArr=[];
			var tdStr='';
			$("#helplist .result .item").each(function(){
				idArr.push($(this).attr("itemId"));
			})
			var showNameArr=base.showName.split(",");
			for(var i=0;i<datas.length;i++){
				var checked="";
				var id=datas[i][sName(base.idField)];
				if(idArr.in_array(id)){
					checked="checked"
				}
				tBodyStr+="<tr>";
				tBodyStr+="<td>";
				if(opts.multiSelect){
					tBodyStr+="<input id='"+id+"' "+checked+" type='checkbox' class='checkbox' name='sunzhen' index='"+i+"'/>";
				}else{
					tBodyStr+="<input id='"+id+"' "+checked+" type='radio' class='checkbox' name='sunzhen'  index='"+i+"'/>";
				}
				
				tBodyStr+="</td>";
				for(var j=0;j<showNameArr.length;j++){
					 //当有一些列没有获取到内容时，oracle下返回的值里面不会有相应的key，此时从数组里面取值是 undefined，此变量为了将undefined变为 ''显示
					 tdStr = datas[i][sName(showNameArr[j].split("#")[0]).trim()];
					 
					 tBodyStr+="<td>"+(tdStr===undefined?'':tdStr)+"</td>";
				}
			}
			$("#helplist tbody")
			.html(tBodyStr)
			.find(".checkbox").each(function(i){
				var $this=$(this)
				var index=$this.attr("index");
				$this.data("data",datas[index]);
				
			})
		}
		function addOneItem(item){	 
			//当有一些列没有获取到内容时，oracle下返回的值里面不会有相应的key，此时从数组里面取值是 undefined，此变量为了将undefined变为 ''显示
			var itemField = item[sName(base.nameField)];
			
			var html="<div class='item' itemId='"+item[sName(base.idField)]+"'>";
			var text=item[sName(base.codeField)]+"#"+(itemField===undefined?'':itemField);
			html+="<span class='item-text' title='"+text+"'>"+text+"</span>";
			html+="<div class='remove'></div>";
			html+="</div>";
			if(opts.multiSelect==false){
				$("#helplist .result .item").remove();
			}
			$("#helplist .result ").append($(html).data("data",item))
		}
		return {
			domInit:function(){
				var html="<div id='helplist' class='modal fade in' tabindex='-1'>";
				html+="<div class='title modal-header'>";
				html+="<div class='text'>选择帮助</div>";
				html+="<div class='close'>&nbsp;&nbsp;&nbsp;</div>";
				html+="<button class='btn btn-sm yellow  btn-border clear v6-commonhelp-btn pull-right' type='button'>清除</button>";
				html+="<button class='btn btn-sm btn-primary  btn-border confirm v6-commonhelp-btn pull-right'  type='button'>确定</button>";
				html+="</div>";
				html+="<div class='search'>";
				html+="<input type='text' class='search-text'  onkeydown='if(event.keyCode == 13){event.preventDefault(); return false;}'       value='' />";
				html+="</div>";
				html+="<div class='content modal-body'>";
				html+="<div class='result'>";
				html+="<div style='clear:both'></div>";
				html+="</div>";
				html+="<table class='table table-striped table-bordered table-hover'>";
				html+="<thead>";
				html+="</thead>";
				html+="<tbody>";
				html+="</tbody>";
				html+="</table>";
				html+="</div>";
				html+="</div>";
				
				window.commonHelpDomReady=true;
				
				$("body").append(html);
			},
			getData:function(page,refCallBack,q){
				
				var firstRow=page*10-10;
				var maxRow=10;
				var count=0;
				
				
				var whereL = where.substring(0,where.indexOf("="));
				var whereR = where.substring(where.indexOf("=")+1,where.length);
				var dataP = {helpId:helpId,firstRow:firstRow,maxRow:maxRow};
				dataP[whereL]=whereR;
				if(q!=undefined&&q!=""){					
					dataP.q=q;
				}
				
				var loadT;
				$.ajax({
					type:'post',
					dataType:'json',
					//url:'v6pubCommonHelpCmd.cmd?method=queryTableData',
					url:ctx+'/system/commonhelp/queryTableData',
					data:dataP,
					beforeSend:function(){
						//loadT = layer.load(0,0); 
					},
					success:function(obj){
						initTableHead();
						initTableBody(obj.datas);
						//layer.close(loadT);
						count=obj.count;
						if(refCallBack){
							refCallBack(count);
						}
					},
					complete:function(){
                        //tr绑定事件
						$("#helplist tr").slice(1).each(function(){
							var p = this;
							$(this).children().slice(1).click(function(){
								$($(p).children()[0]).children().each(function(){
									if(this.type=="checkbox"||this.type=="radio"){	
										$(this).click();
										if($.browser.msie&&parseInt($.browser.version)<9){
											$(this).change();
										}
									}
								});
							});
						});
						//每行checkbox绑定事件
						$("#helplist .checkbox").change(function(){
							var $this=$(this);
							var itemId=$this.attr("id");
							if($this[0].checked){
								addOneItem($this.data("data"));
							}else{
								$("#helplist .result .item[itemId='"+itemId+"']").remove();
							}
						});
						
						//多选全选绑定事件 ,如果ie当前版本是ie8浏览器，手动触发一下change事件
						var ieVersion8 = false;
						$("#helplist .v6help-check-all").click(function(){
							if($.browser.msie&&$.browser.version=="8.0"){
								ieVersion8=true;
							}
							if($(this).get(0).checked==true){
							   $("#helplist .checkbox").each(function(){
								 if($(this).get(0).checked!=true){
									 $(this).click();
									  if(ieVersion8){
										 $(this).trigger('change');
									  }
								 }
							   });
							}else{
							  $("#helplist .checkbox").each(function(){
								 if($(this).get(0).checked==true){
									$(this).click();
									if(ieVersion8){
										 $(this).trigger('change');
									 }
								 }
							  });
							}
						});
					}
				})
			},
			setLastResult:function(){
				$("#helplist .result").html("");
				var resultArr=resultBox.getResultArr();
				for(var i=0;i<resultArr.length;i++){
					addOneItem(resultArr[i]);
				}
			},
			layerShow:function(){
				$("#helplist").modal({
					"width":"650px"
				});
				
				for(var one in Events){
					Events[one]();
				}
			}
		}
	}
	
	var Pagination=function(count,helpList){
		$("#helplist .pagination").remove();
		var html="";
		html+="<div class='pagination'>";
		html+="<a href='#' class='last' data-action='last'>&raquo;</a>";
		html+="<a href='#' class='next' data-action='next'>&rsaquo;</a>";
		html+="<input type='text' readonly='readonly' />";				
		html+="<a href='#' class='previous' data-action='previous'>&lsaquo;</a>";
		html+="<a href='#' class='first' data-action='first'>&laquo;</a>";
		html+="</div>";
		$("#helplist>.content").append(html);
		var $target=$("#helplist .pagination");
		var maxPage=Math.ceil(count/10);
		
		var searchQ = "";
		if($('#helplist .search-text').hasClass("active")){
			searchQ=$('#helplist .search-text').val()
		};
		$target.jqPagination({
			max_page:maxPage,
			paged:function(page){
				helpList.getData(page,"",searchQ);
			}
		});
	}
	
	var ResultSearch=function(helpList){
		var timer;
		$('#helplist .search-text').keyup(function(){
			clearTimeout(timer);
			var $this=$(this);
			var text=encodeURIComponent($this.val());
			timer=setTimeout(function(){
				helpList.getData(1,function(count){
					Pagination(count,helpList)
				},text);
			},600);
		})
		try{
	 // 获取要监听的 input 或 textarea 
	    var content = $('#helplist .search-text').get(0);
		content.onpaste = function(){
			clearTimeout(timer);			
			timer=setTimeout(function(){
				var text=encodeURIComponent($('#helplist .search-text').val());
				helpList.getData(1,function(count){
					Pagination(count,helpList)
				},text);
			},600);		
		}
		}catch(e){
			
		}
	}
	
	function sName(fName){
		return fName.indexOf(".")>-1?fName.split(".")[1]:fName;
	}
	String.prototype.trim=function(){
　　    	return this.replace(/(^\s*)|(\s*$)/g, "");
　　 }
	Array.prototype.in_array = function(e){
		for(i=0;i<this.length;i++){
			if(this[i] == e){
				return true;
			}
		}
		return false;
	}
	if(!Array.indexOf){
	    Array.prototype.indexOf = function(obj){
	        for(var i=0; i<this.length; i++){
	            if(this[i]==obj){
	                return i;
	            }
	        }
	        return -1;
	    }
	}
}); 

/**
 * 联想功能
 */
(function ($) {
	jQuery.extend({
		browser: function() 
		{
			var
		    rwebkit = /(webkit)\/([\w.]+)/,
		    ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
		    rmsie = /(msie) ([\w.]+)/,
		    rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,    
		    browser = {},
		    ua = window.navigator.userAgent,
		    browserMatch = uaMatch(ua);

		    if (browserMatch.browser) {
		        browser[browserMatch.browser] = true;
		        browser.version = browserMatch.version;
		    }
		    return { browser: browser };
		},
	});

	function uaMatch(ua){
	        ua = ua.toLowerCase();

	        var match = rwebkit.exec(ua)
	                    || ropera.exec(ua)
	                    || rmsie.exec(ua)
	                    || ua.indexOf("compatible") < 0 && rmozilla.exec(ua)
	                    || [];

	        return {
	            browser : match[1] || "",
	            version : match[2] || "0"
	        };
	}
	$.fn.chAutoComplete=function(resultBox,helpId,relHidden,where,options,base){
		var a=base.codeField;
		
		var whereL = where.substring(0,where.indexOf("="));
		var whereR = where.substring(where.indexOf("=")+1,where.length);
		var dataP = {};
		dataP[whereL]=whereR;
		
		var $input =$(this);
		
		var defaults = {
				max: 12, 
				minChars: 1,
				scrollHeight: 365,
				matchContains: true,
				width:$input.closest(".helpbox").width(),
				autoFill: false,
				multiSelect:false,
				formatItem: function (row, i, max) {
	                return  row[sName(base.codeField)]+"#"+row[sName(base.nameField)];
	            },
	            extraParams:dataP
		};
		var ctx = $("#ctx").val();
		var opts = $.extend({},defaults, options); 
		var url=ctx+'/system/commonhelp/autoComplete';
		url+="?helpId="+helpId;
		
		$(this).unautocomplete().autocomplete(url, opts)
		.result(function (event, row, formatted) {  
			$(this).blur();
			if(opts.multiSelect){
				resultBox.addItems(row);
			}else{
				resultBox.clearResults();
				resultBox.addItems([row]);
			}
			
		});	
		
		function sName(fName){
			return fName.indexOf(".")>-1?fName.split(".")[1]:fName;
		}
	}
	

	
	$.fn.extend({
		autocomplete: function(urlOrData, options) {
			var isUrl = typeof urlOrData == "string";
			options = $.extend({}, $.Autocompleter.defaults, {
				url: isUrl ? urlOrData : null,
				data: isUrl ? null : urlOrData,
				delay: isUrl ? $.Autocompleter.defaults.delay : 10,
				max: options && !options.scroll ? 10 : 150
			}, options);
			
			// if highlight is set to false, replace it with a do-nothing function
			options.highlight = options.highlight || function(value) { return value; };
			
			// if the formatMatch option is not specified, then use formatItem for backwards compatibility
			options.formatMatch = options.formatMatch || options.formatItem;
			
			options.parse=isUrl?options.parse:null;

			return this.each(function() {
				new $.Autocompleter(this, options);
			});
		},
		result: function(handler) {
			return this.bind("result", handler);
		},
		search: function(handler) {
			return this.trigger("search", [handler]);
		},
		flushCache: function() {
			return this.trigger("flushCache");
		},
		setOptions: function(options){
			return this.trigger("setOptions", [options]);
		},
		unautocomplete: function() {
			return this.trigger("unautocomplete");
		}
	});
	$.Autocompleter = function(input, options) {

		var KEY = {
			UP: 38,
			DOWN: 40,
			DEL: 46,
			TAB: 9,
			RETURN: 13,
			ESC: 27,
			COMMA: 188,
			PAGEUP: 33,
			PAGEDOWN: 34,
			BACKSPACE: 8
		};

		// Create $ object for input element
		var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

		var timeout;
		var previousValue = "";
		var hasFocus = 0;
		var lastKeyPressCode;
		var config = {
			mouseDownOnSelect: false
		};
		var select = $.Autocompleter.Select(options, input, selectCurrent, config);
		
		var blockSubmit;
		
		var multiResult=[];
		
		// prevent form submit in opera when selecting with return key
		$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
			if (blockSubmit) {
				blockSubmit = false;
				return false;
			}
		});
		
		// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
		$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
			// a keypress means the input has focus
			// avoids issue where input had focus before the autocomplete was applied
			hasFocus = 1;
			// track last key pressed
			lastKeyPressCode = event.keyCode;
			switch(event.keyCode) {
			
				case KEY.UP:
					event.preventDefault();
					if ( select.visible() ) {
						select.prev();
					} else {
						onChange(0, true);
					}
					break;
					
				case KEY.DOWN:
					event.preventDefault();
					if ( select.visible() ) {
						select.next();
					} else {
						onChange(0, true);
					}
					break;
					
				case KEY.PAGEUP:
					event.preventDefault();
					if ( select.visible() ) {
						select.pageUp();
					} else {
						onChange(0, true);
					}
					break;
					
				case KEY.PAGEDOWN:
					event.preventDefault();
					if ( select.visible() ) {
						select.pageDown();
					} else {
						onChange(0, true);
					}
					break;
				
				// matches also semicolon
				case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
				case KEY.TAB:
				case KEY.RETURN:
					if( selectCurrent() ) {
						// stop default to prevent a form submit, Opera needs special handling
						event.preventDefault();
						blockSubmit = true;
						return false;
					}
					break;
				case KEY.ESC:
					select.hide();
					break;
					
				default:
					clearTimeout(timeout);
					timeout = setTimeout(onChange, options.delay);
					break;
			}
			event.stopPropagation();
		}).focus(function(){
			// track whether the field has focus, we shouldn't process any
			// results if the field no longer has focus
			hasFocus++;
		}).blur(function() {
			hasFocus = 0;
			if (!config.mouseDownOnSelect) {
				hideResults();
			}
		}).click(function() {
			// show select when clicking in a focused field
			if ( hasFocus++ > 1 && !select.visible() ) {
				onChange(0, true);
			}
		}).bind("search", function() {
			// TODO why not just specifying both arguments?
			var fn = (arguments.length > 1) ? arguments[1] : null;
			function findValueCallback(q, data) {
				var result;
				if( data && data.length ) {
					for (var i=0; i < data.length; i++) {
						if( data[i].result.toLowerCase() == q.toLowerCase() ) {
							result = data[i];
							break;
						}
					}
				}
				if( typeof fn == "function" ) fn(result);
				else $input.trigger("result", result && [result.data, result.value]);
			}
			$.each(trimWords($input.val()), function(i, value) {
				request(value, findValueCallback, findValueCallback);
			});
		}).bind("setOptions", function() {
			$.extend(options, arguments[1]);
		}).bind("unautocomplete", function() {
			select.unbind();
			$input.unbind();
			$(input.form).unbind(".autocomplete");
		});
		
		
		var inputName=$input.attr("name");
		$('body').on("click",".ac-ok-"+inputName,function(){
			hideResultsNow();
			$input.trigger("result", [multiResult]);
		})
		$('body').on("click",".ac-close-"+inputName,function(){
			hideResultsNow();
		})
		
		
		function selectCurrent(index) {
			var selected = select.selected();
			if( !selected )
				return false;
			
			var v = selected.result;
			previousValue = v;
			
			if ( options.multiple ) {
				var words = trimWords($input.val());
				if ( words.length > 1 ) {
					var seperator = options.multipleSeparator.length;
					var cursorAt = $(input).selection().start;
					var wordAt, progress = 0;
					$.each(words, function(i, word) {
						progress += word.length;
						if (cursorAt <= progress) {
							wordAt = i;
							return false;
						}
						progress += seperator;
					});
					words[wordAt] = v;
					// TODO this should set the cursor to the right position, but it gets overriden somewhere
					//$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
					v = words.join( options.multipleSeparator );
				}
				v += options.multipleSeparator;
			}
			if(options.multiSelect){
				multiResult=selected;
			}else{
				hideResultsNow();
				$input.trigger("result", [selected.data]);
			}
			
			return true;
		}
		
		function onChange(crap, skipPrevCheck) {
			multiResult=[];
			
			if( lastKeyPressCode == KEY.DEL ) {
				select.hide();
				return;
			}
			
			var currentValue = $input.val();
			
			if ( !skipPrevCheck && currentValue == previousValue )
				return;
			
			previousValue = currentValue;
			
			currentValue = lastWord(currentValue);
			if ( currentValue.length >= options.minChars) {
				$input.addClass(options.loadingClass);
				if (!options.matchCase)
					currentValue = currentValue.toLowerCase();
				request(currentValue, receiveData, hideResultsNow);
			} else {
				stopLoading();
				select.hide();
			}
		};
		
		function trimWords(value) {
			if (!value)
				return [""];
			if (!options.multiple)
				return [$.trim(value)];
			return $.map(value.split(options.multipleSeparator), function(word) {
				return $.trim(value).length ? $.trim(word) : null;
			});
		}
		
		function lastWord(value) {
			if ( !options.multiple )
				return value;
			var words = trimWords(value);
			if (words.length == 1) 
				return words[0];
			var cursorAt = $(input).selection().start;
			if (cursorAt == value.length) {
				words = trimWords(value)
			} else {
				words = trimWords(value.replace(value.substring(cursorAt), ""));
			}
			return words[words.length - 1];
		}
		
		// fills in the input box w/the first match (assumed to be the best match)
		// q: the term entered
		// sValue: the first matching result
		function autoFill(q, sValue){
			// autofill in the complete box w/the first match as long as the user hasn't entered in more data
			// if the last user key pressed was backspace, don't autofill
			if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
				// fill in the value (keep the case the user has typed)
				$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
				// select the portion of the value not typed by the user (so the next character will erase)
				$(input).selection(previousValue.length, previousValue.length + sValue.length);
			}
		};

		function hideResults() {
			clearTimeout(timeout);
			timeout = setTimeout(hideResultsNow, 200);
		};

		function hideResultsNow() {
			var wasVisible = select.visible();
			select.hide();
			clearTimeout(timeout);
			stopLoading();
			if (options.mustMatch) {
				// call search and run callback
				$input.search(
					function (result){
						// if no value found, clear the input box
						if( !result ) {
							if (options.multiple) {
								var words = trimWords($input.val()).slice(0, -1);
								$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
							}
							else {
								$input.val( "" );
								$input.trigger("result", null);
							}
						}
					}
				);
			}
		};

		function receiveData(q, data) {
			if ( data && data.length && hasFocus ) {
				stopLoading();
				select.display(data, q);
				autoFill(q, data[0].value);
				select.show();
			} else {
				hideResultsNow();
			}
		};

		function request(term, success, failure) {
			if (!options.matchCase){
				term = term.toLowerCase();
			}
			if((typeof options.url == "string") && (options.url.length > 0) ){
				
				var extraParams = {
					timestamp: +new Date()
				};
				$.each(options.extraParams, function(key, param) {
					extraParams[key] = typeof param == "function" ? param() : param;
				});
				
				$.ajax({
					// try to leverage ajaxQueue plugin to abort previous requests
					mode: "abort",
					type:"post",
					// limit abortion to this input
					port: "autocomplete" + input.name,
					dataType: options.dataType,
					url: options.url,
					data: $.extend({
						q: encodeURI(lastWord(term)),
						limit: options.max
					}, extraParams),
					success: function(data) {
						var parsed = options.parse && options.parse(data) || parse(data);
						success(term, parsed);
					}
				});
			} else {
				// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
				select.emptyList();
				failure(term);
			}
		};
		
		function parse(data) {
			var parsed = [];
			var rows = data.split("\n");
			for (var i=0; i < rows.length; i++) {
				var row = $.trim(rows[i]);
				if (row) {
					row = row.split("|");
					parsed[parsed.length] = {
						data: row,
						value: row[0],
						result: options.formatResult && options.formatResult(row, row[0]) || row[0]
					};
				}
			}
			return parsed;
		};

		function stopLoading() {
			$input.removeClass(options.loadingClass);
		};

	};

	$.Autocompleter.defaults = {
		inputClass: "ac_input",
		resultsClass: "ac_results",
		loadingClass: "ac_loading",
		minChars: 1,
		delay: 400,
		matchCase: false,
		matchSubset: false,
		matchContains: false,
		cacheLength: 10,
		max: 100,
		mustMatch: false,
		extraParams: {},
		selectFirst: true,
		formatItem: function(row) { return row[0]; },
		formatMatch: null,
		autoFill: false,
		width: 0,
		multiple: false,
		multipleSeparator: ", ",
		multiSelect:false,//控制是否多选
		highlight: function(value, term) {
			return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
		},
	    scroll: true,
	    scrollHeight: 180,
	    parse:function(json){
	    	return $.map(json,function(row){
	    		return {
	    			data: row
	    		}
	    	})
	    }
	};


	$.Autocompleter.Select = function (options, input, select, config) {
		var CLASSES = {
			ACTIVE: "ac_active",
			HOVER:"ac_over"
		};
		
		var listItems,
			active = -1,
			data,
			term = "",
			needsInit = true,
			element,
			btns,
			list;
		
		// Create results
		function init() {
			if (!needsInit)
				return;
			element = $("<div/>")
			.hide()
			.addClass(options.resultsClass)
			.css("position", "absolute")
			.appendTo(document.body);
		
			list = $("<ul/>").appendTo(element).mouseover( function(event) {
				if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
					active = $("li", list).removeClass(CLASSES.HOVER).index(target(event));
				    $(target(event)).addClass(CLASSES.HOVER);           
		        }
			})
			.mouseout(function(){
				$("li", list).removeClass(CLASSES.HOVER);
			})
			.click(function(event) {
				if(options.multiSelect){
					$(target(event)).toggleClass(CLASSES.ACTIVE);
					select($(target(event)).index());
				}else{
					$(target(event)).addClass(CLASSES.ACTIVE);
					select();
					// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
					//input.focus();
				}
				
				return false;
			}).mousedown(function() {
				config.mouseDownOnSelect = true;
			}).mouseup(function() {
				config.mouseDownOnSelect = false;
			});
			
			if(options.multiSelect){
				var inputName=$(input).attr("name");
				btns=$("<div class='buttonRightContainer'></div>")
				.css("position","absolute")
				.append("<input class='btn btn-sm blue ac-ok-"+inputName+"' style='margin-right:5px' type='button' value='确定'/>")
				.append("<input class='btn btn-sm yellow ac-close-"+inputName+"' type='button' value='关闭'/>")
				.appendTo(document.body);
			}
			
			if( options.width > 0 ){
				element.css("width", options.width);
			}
				
			needsInit = false;
		} 
		
		function target(event) {
			var element = event.target;
			while(element && element.tagName != "LI")
				element = element.parentNode;
			// more fun with IE, sometimes event.target is empty, just ignore it then
			if(!element)
				return [];
			return element;
		}

		function moveSelect(step) {
			listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
			movePosition(step);
	        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
	        if(options.scroll) {
	            var offset = 0;
	            listItems.slice(0, active).each(function() {
					offset += this.offsetHeight;
				});
	            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
	                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
	            } else if(offset < list.scrollTop()) {
	                list.scrollTop(offset);
	            }
	        }
		};
		
		function movePosition(step) {
			active += step;
			if (active < 0) {
				active = listItems.size() - 1;
			} else if (active >= listItems.size()) {
				active = 0;
			}
		}
		
		function limitNumberOfItems(available) {
			return options.max && options.max < available
				? options.max
				: available;
		}
		
		function fillList() {
			list.empty();
			var max = limitNumberOfItems(data.length);
			for (var i=0; i < max; i++) {
				if (!data[i])
					continue;
				var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
				if ( formatted === false )
					continue;
				var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
				$.data(li, "ac_data", data[i]);
			}
			listItems = list.find("li");
			if ( options.selectFirst ) {
				if(!options.multiSelect){
					listItems.slice(0, 1).addClass(CLASSES.HOVER);
					active = 0;
				}
				
			}
			// apply bgiframe if available
			if ( $.fn.bgiframe )
				list.bgiframe();
		}
		
		return {
			display: function(d, q) {
				init();
				data = d;
				term = q;
				fillList();
			},
			next: function() {
				moveSelect(1);
			},
			prev: function() {
				moveSelect(-1);
			},
			pageUp: function() {
				if (active != 0 && active - 8 < 0) {
					moveSelect( -active );
				} else {
					moveSelect(-8);
				}
			},
			pageDown: function() {
				if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
					moveSelect( listItems.size() - 1 - active );
				} else {
					moveSelect(8);
				}
			},
			hide: function() {
				element && element.hide();
				btns && btns.hide();
				listItems && listItems.removeClass(CLASSES.ACTIVE);
				active = -1;
			},
			visible : function() {
				return element && element.is(":visible");
			},
			current: function() {
				return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
			},
			show: function() {
				var offset = $(input).offset();
				element.css({
					width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
					top: offset.top + input.offsetHeight+1,
					left: offset.left
				}).show();
	            if(options.scroll) {
	                list.scrollTop(0);
	                list.css({
						maxHeight: options.scrollHeight,
						overflow: 'auto'
					});
					
	                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
						var listHeight = 0;
						listItems.each(function() {
							listHeight += this.offsetHeight;
						});
						var scrollbarsVisible = listHeight > options.scrollHeight;
	                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
						if (!scrollbarsVisible) {
							// IE doesn't recalculate width when scrollbar disappears
							listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
						}
	                }
	            }
	            if(options.multiSelect){
	            	var listHeight=$(list).height();
	            	var listWidth=$(list).width();
	            	var btnsWidth=$(btns).width();
	            	btns.css({
	            		"top":listHeight+ offset.top + $(input).height()+20,
	            		"left":offset.left+(listWidth-btnsWidth)
	            	}).show();
	            }
			},
			selected: function() {
				var selected;
				if(options.multiSelect){
					selected = listItems.filter("." + CLASSES.ACTIVE);
					var resultArr=[];
					for(var i=0;i<selected.length;i++){
						resultArr.push($.data(selected[i], "ac_data").data);
					}
					return resultArr;
				}else{
					selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
					return selected && selected.length && $.data(selected[0], "ac_data");
				}
			},
			emptyList: function (){
				list && list.empty();
			},
			unbind: function() {
				element && element.remove();
			}
		};
	};

	$.fn.selection = function(start, end) {
		if (start !== undefined) {
			return this.each(function() {
				if( this.createTextRange ){
					var selRange = this.createTextRange();
					if (end === undefined || start == end) {
						selRange.move("character", start);
						selRange.select();
					} else {
						selRange.collapse(true);
						selRange.moveStart("character", start);
						selRange.moveEnd("character", end);
						selRange.select();
					}
				} else if( this.setSelectionRange ){
					this.setSelectionRange(start, end);
				} else if( this.selectionStart ){
					this.selectionStart = start;
					this.selectionEnd = end;
				}
			});
		}
		var field = this[0];
		if ( field.createTextRange ) {
			var range = document.selection.createRange(),
				orig = field.value,
				teststring = "<->",
				textLength = range.text.length;
			range.text = teststring;
			var caretAt = field.value.indexOf(teststring);
			field.value = orig;
			this.selection(caretAt, caretAt + textLength);
			return {
				start: caretAt,
				end: caretAt + textLength
			}
		} else if( field.selectionStart !== undefined ){
			return {
				start: field.selectionStart,
				end: field.selectionEnd
			}
		}
	};
})(jQuery);

/**
 * 分页组件
 */
(function ($) {
	
	$.jqPagination = function (el, options) {
	
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
	
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// get input jQuery object
		base.$input = base.$el.find('input');

		// Add a reverse reference to the DOM object
		base.$el.data("jqPagination", base);

		base.init = function () {

			base.options = $.extend({}, $.jqPagination.defaultOptions, options);
			
			// if the user hasn't provided a max page number in the options try and find
			// the data attribute for it, if that cannot be found, use one as a max page number
			
			if (base.options.max_page === null) {
			
				if (base.$input.data('max-page') !== undefined) {
					base.options.max_page = base.$input.data('max-page');
				} else {
					base.options.max_page = 1;
				}
				
			}
			
			// if the current-page data attribute is specified this takes priority
			// over the options passed in, so long as it's a number
			
			if (base.$input.data('current-page') !== undefined && base.isNumber(base.$input.data('current-page'))) {
				base.options.current_page = base.$input.data('current-page');
			}
			
			// remove the readonly attribute as JavaScript must be working by now ;-)
			base.$input.removeAttr('readonly');
			
			// set the initial input value
			// pass true to prevent paged callback form being fired
			
			base.updateInput(true);

			
			 //***************
			// BIND EVENTS
			
			base.$input.on('focus.jqPagination mouseup.jqPagination', function (event) {

				// if event === focus, select all text...
				if (event.type === 'focus') {

					var current_page	= parseInt(base.options.current_page, 10);

					$(this).val(current_page).select();

				}
			
				// if event === mouse up, return false. Fixes Chrome bug
				if (event.type === 'mouseup') {
					return false;
				}
				
			});
			
			base.$input.on('blur.jqPagination keydown.jqPagination', function (event) {
				
				var $self			= $(this),
					current_page	= parseInt(base.options.current_page, 10);
				
				// if the user hits escape revert the input back to the original value
				if (event.keyCode === 27) {
					$self.val(current_page);
					$self.blur();
				}
				
				// if the user hits enter, trigger blur event but DO NOT set the page value
				if (event.keyCode === 13) {
					$self.blur();
				}

				// only set the page is the event is focusout.. aka blur
				if (event.type === 'blur') {
					base.setPage($self.val());
				}
				
			});
			
			base.$el.on('click.jqPagination', 'a', function (event) {
			
				var $self = $(this);

				// we don't want to do anything if we've clicked a disabled link
				// return false so we stop normal link action btu also drop out of this event
				
				if ($self.hasClass('disabled')) {
					return false;
				}

				// for mac + windows (read: other), maintain the cmd + ctrl click for new tab
				if (!event.metaKey && !event.ctrlKey) {
					event.preventDefault();
					base.setPage($self.data('action'));
				}
				
			});
			
		};
		
		base.setPage = function (page, prevent_paged) {
			
			// return current_page value if getting instead of setting
			if (page === undefined) {
				return base.options.current_page;
			}
		
			var current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);
							
			if (isNaN(parseInt(page, 10))) {
				
				switch (page) {
				
					case 'first':
						page = 1;
						break;
						
					case 'prev':
					case 'previous':
						page = current_page - 1;
						break;
						
					case 'next':
						page = current_page + 1;
						break;
						
					case 'last':
						page = max_page;
						break;
						
				}
				
			}
			
			page = parseInt(page, 10);
			
			// reject any invalid page requests
			if (isNaN(page) || page < 1 || page > max_page) {

				// update the input element
				base.setInputValue(current_page);
				
				return false;
				
			}
			
			// update current page options
			base.options.current_page = page;
			base.$input.data('current-page', page);
			
			// update the input element
			base.updateInput( prevent_paged );
			
		};
		
		base.setMaxPage = function (max_page, prevent_paged) {
			
			// return the max_page value if getting instead of setting
			if (max_page === undefined) {
				return base.options.max_page;
			}

			// ignore if max_page is not a number
			if (!base.isNumber(max_page)) {
				console.error('jqPagination: max_page is not a number');
				return false;
			}
			
			// ignore if max_page is less than the current_page
			if (max_page < base.options.current_page) {
				console.error('jqPagination: max_page lower than current_page');
				return false;
			}
			
			// set max_page options
			base.options.max_page = max_page;
			base.$input.data('max-page', max_page);
				
			// update the input element
			base.updateInput( prevent_paged );
			
		};
		
		// ATTN this isn't really the correct name is it?
		base.updateInput = function (prevent_paged) {
			
			var current_page = parseInt(base.options.current_page, 10);
							
			// set the input value
			base.setInputValue(current_page);
			
			// set the link href attributes
			base.setLinks(current_page);
			
			// we may want to prevent the paged callback from being fired
			if (prevent_paged !== true) {

				// fire the callback function with the current page
				base.options.paged(current_page);
			
			}
			
		};
		
		base.setInputValue = function (page) {
		
			var page_string	= base.options.page_string,
				max_page	= base.options.max_page;
	
			// this looks horrible :-(
			page_string = page_string
				.replace("{current_page}", page)
				.replace("{max_page}", max_page);
			
			base.$input.val(page_string);
		
		};
		
		base.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};
		
		base.setLinks = function (page) {
			
			var link_string		= base.options.link_string,
				current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);
			
			if (link_string !== '') {
				
				// set initial page numbers + make sure the page numbers aren't out of range
					
				var previous = current_page - 1;
				if (previous < 1) {
					previous = 1;
				}
				
				var next = current_page + 1;
				if (next > max_page) {
					next = max_page;
				}
				
				// apply each page number to the link string, set it back to the element href attribute
				base.$el.find('a.first').attr('href', link_string.replace('{page_number}', '1'));
				base.$el.find('a.prev, a.previous').attr('href', link_string.replace('{page_number}', previous));
				base.$el.find('a.next').attr('href', link_string.replace('{page_number}', next));
				base.$el.find('a.last').attr('href', link_string.replace('{page_number}', max_page));
				
			}

			// set disable class on appropriate links
			base.$el.find('a').removeClass('disabled');

			if (current_page === max_page) {
				base.$el.find('.next, .last').addClass('disabled');
			}

			if (current_page === 1) {
				base.$el.find('.previous, .first').addClass('disabled');
			}

		};
		
		base.callMethod = function (method, key, value) {

			switch (method.toLowerCase()) {

				case 'option':

					// set default object to trigger the paged event (legacy opperation)
					var options = {'trigger': true},
					result = false;

					// if the key passed in is an object
					if($.isPlainObject(key) && !value){
						$.extend(options, key)
					}
					else{ // make the key value pair part of the default object
						options[key] = value;
					}

					var prevent_paged = (options.trigger === false);

					// if max_page property is set call setMaxPage
					if(options.max_page !== undefined){
						result = base.setMaxPage(options.max_page, prevent_paged);
					}

					// if current_page property is set call setPage
					if(options.current_page !== undefined){
						result = base.setPage(options.current_page, prevent_paged);
					}

					// if we've not got a result fire an error and return false
					if( result === false ) console.error('jqPagination: cannot get / set option ' + key);
					return result;
					
					break;

				case 'destroy':

					base.$el
						.off('.jqPagination')
						.find('*')
							.off('.jqPagination');

					break;

				default:

					// the function name must not exist
					console.error('jqPagination: method "' + method + '" does not exist');
					return false;

			}

		};

		// Run initializer
		base.init();
		
	};

	$.jqPagination.defaultOptions = {
		current_page	: 1,
		link_string		: '',
		max_page		: null,
		page_string		: '当前页: {current_page}   总页数:{max_page}',
		paged			: function () {}
	};

	$.fn.jqPagination = function () {

		// get any function parameters
		var self = this,
			args = Array.prototype.slice.call(arguments),
			result = false;

		// if the first argument is a string call the desired function
		// note: we can only do this to a single element, and not a collection of elements

		if (typeof args[0] === 'string') {

			// if we're dealing with multiple elements, set for all
			$.each(self, function(){
				var $plugin = $(this).data('jqPagination');

				result = $plugin.callMethod(args[0], args[1], args[2]);
			});

			return result;
		}

		// if we're not dealing with a method, initialise plugin
		self.each(function () {
			(new $.jqPagination(this, args[0]));
		});
		
	};

})(jQuery);

