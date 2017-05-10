(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;
var _instCounter = 0;

/**
 * @description
 * 将datatables导出为excel
 * 调用方式：1、new $.fn.dataTable.ExportExcel( datatable对象, {title:""});第二个条件可选
 * 			2、datatable对象.exportExcel({title:""})参数可选
 * 
 */
var ExportExcel = function ( dt, config ) {

	dt = new DataTable.Api( dt );

	this.c = $.extend( true, {}, ExportExcel.defaults, config );
	
	this.dom = {
		thead: $(dt.table().header()),
		tbody: $(dt.table().body()),
		tfoot: $(dt.table().footer()),
	};
	this.dt = dt;
	this.params = dt.ajax.params();
	this.totals = dt.context[0].jqXHR.responseJSON.recordsTotal;
	this.url = dt.ajax.url();
	this.columns = dt.context[0].aoColumns;
	
	this.ajaxToForm = {
		start : "start",  	//开始行
		length : "length",	//查询行数
		columns : "columns",//列参数
		order : "order",	//排序参数
		search : "search"	//查询条件
	}
    
	/*var dtSettings = dt.settings()[0];
	if ( dtSettings._fixedHeader ) {
		throw "FixedHeader already initialised on table "+dtSettings.nTable.id;
	}

	dtSettings._fixedHeader = this;*/
	
	this._constructor();
	
	
};


/*
 * Variable: 、ExportExcel
 * Purpose:  Prototype for ExportExcel
 * Scope:    global
 */
$.extend( ExportExcel.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */
	
	/**
	 * ExportExcel constructor - adding the required event listeners and
	 * simple initialisation
	 *
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.dt;

		
		var $form = this._creatDom(this.params,this.totals);
		var str = this._exportData(this.columns);
		this._exportSubmit($form[0],str,dt.ajax.url());
	},
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * @private
	 */
	
	/**
	 * 将ajax查询表格需要的参数转换为form提交需要参数
	 */
	_creatDom : function(params,totals){
		var ajaxToForm = this.ajaxToForm;
		$("form.lambo-dataTable-excel-form").remove();
		var $form = $("<form class='lambo-dataTable-excel-form'></form>");
		var $head = $("<input type='hidden' name='thead' />"),
			$excel = $("<input type='hidden' name='_excel' value='1' />");
		var $title = $("<input type='hidden' name='ttitle' value='' />");
		if(this.c.title){
			$title.val(this.c.title);
		}
		
		$form.append($head);
		$form.append($excel);
		$form.append($title);
		
		for(var one in params){
			
			if( one == ajaxToForm.start ){
				$form.append($("<input type='hidden' name='start' value='0' />"));
				continue;
			}
			if( one == ajaxToForm.length ){
				$form.append($("<input type='hidden' name='length' value='"+totals+"' />"));
				continue;
			}
			if( one == ajaxToForm.columns ){
				var columns = params[one];
				if(columns instanceof Array){
					for(var i=0,j=columns.length;i<j;i++){
						$form.append($("<input type='hidden' name='columns["+i+"][data]' value='"+columns[i].data+"' />"));
						$form.append($("<input type='hidden' name='columns["+i+"][name]' value='"+columns[i].name+"' />"));
						$form.append($("<input type='hidden' name='columns["+i+"][searchable]' value='"+columns[i].searchable+"' />"));
						$form.append($("<input type='hidden' name='columns["+i+"][orderable]' value='"+columns[i].orderable+"' />"));
						$form.append($("<input type='hidden' name='columns["+i+"][search][value]' value='"+columns[i].search.value+"' />"));
						$form.append($("<input type='hidden' name='columns["+i+"][search][regex]' value='"+columns[i].search.regex+"' />"));
					}
				}
				continue;
			}
			if( one == ajaxToForm.order ){
				var order = params[one];
				if(order instanceof Array){
					for(var i=0,j=order.length;i<j;i++){
						$form.append($("<input type='hidden' name='order["+i+"][column]' value='"+order[i].column+"' />"));
						$form.append($("<input type='hidden' name='order["+i+"][dir]' value='"+order[i].dir+"' />"));
					}
				}
				continue;
			}
			if( one == ajaxToForm.search ){
				var search = params[one];
				$form.append($("<input type='hidden' name='search[value]' value='"+search.value+"' />"));
				$form.append($("<input type='hidden' name='search[regex]' value='"+search.regex+"' />"));
				continue;
			}
			
			$form.append($("<input type='hidden' name='"+one+"' value='"+params[one]+"' />"));
		}
		
		$("body").append($form);
		return $form;
	},
	_exportData : function(columns){
		var  pattern=/(码|电话|编号|日期|账号|证|证号)$/;
		var str = "[";
		for(var i=0,j=columns.length;i<j;i++){
			var one = columns[i];
			if(one.visible == undefined || one.visible == true){
				str+="{";
				var name=one.sTitle.replace(/[ \r\n]/g,"");//去掉空格、回车、换行
				str+="\"name\":\""+name+"\",";
				str+="\"data\":\""+one.data+"\",";
				str+="\"width\":\""+parseInt(one.sWidth)+"\",";
				if(pattern.test(name)){
					str+="\"dimColumn\":\""+1+"\"";
				}else{
					str+="\"dimColumn\":\""+0+"\"";
				}
				str+="}";
				if(i != j-1){
					str+=",";
				}
			}
		}
		str+="]";
		return str;
	},
	_exportSubmit : function(form,headStr,url){
		$("input[name='thead']",form).val(headStr);
		form.action = url;
		form.method = "POST";
		form.submit();
	}
	
});


/**
 * Version
 * @type {String}
 * @static
 */
ExportExcel.version = "3.1.0";

/**
 * Defaults
 * @type {Object}
 * @static
 */
ExportExcel.defaults = {
		filename: '表格',
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interfaces
 */

// Attach for constructor access
$.fn.dataTable.ExportExcel = ExportExcel;
$.fn.DataTable.ExportExcel = ExportExcel;


// DataTables creation - check if the FixedHeader option has been defined on the
// table and if so, initialise
$(document).on( 'init.dt.dtb', function (e, settings, json) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var opts = settings.oInit.exportExcel || DataTable.defaults.exportExcel;

	if ( opts && ! settings._exportExcel ) {
		new ExportExcel( settings, opts );
	}
} );

// DataTables API methods
DataTable.Api.register( 'exportExcel()', function (settings) {
	new $.fn.dataTable.ExportExcel(this,settings);
});

return ExportExcel;
}));