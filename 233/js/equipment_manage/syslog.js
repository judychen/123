function myhelp() {
	if ( $(".log_part_display").css("display") == "block" ) {
		popHelp("syslogDisplay");
	} else if ( $(".log_part_setting").css("display") == "block" ) {
		popHelp("syslogSettings");
	} else if ( $(".log_part_export").css("display") == "block" ) {
		popHelp("syslogExport");
	}
}

function exportCfgSuccess( data ) {
	myAlert("日志导出成功！");
}

function load() {
	var infoEnable = jsLogInfo.infoCenter_enable;	//infocenter enable
	var hostlevel = jsLogInfo.host_level;
	var hostIP = jsLogInfo.host_ip;
	var bufferEnable = jsLogInfo.buff_enable;
	var bufferLevel = jsLogInfo.buff_level;

	$("#option_infocenterEnable").val(infoEnable);
	$("#option_hostLevel").val(hostlevel);
	if( hostIP == "0.0.0.0" )
		$("#sel_syslog_service").val(0);
	else 
		$("#sel_syslog_service").val(1);
		
	$("#text_hostip").val(hostIP);
	$("#option_hostLevel").val(hostlevel);
	$("#option_bufferEnable").val(bufferEnable);
	$("#option_bufferLevel").val(bufferLevel);

	changeSyslogServ();
}

function ajaxDone( data ) {
	jsLogInfo = eval("("+data+")");
	load();
}

function isInputValid_ftp() {
	if ( $("#text_ftp_server").val() == "" ) {
		myAlert("FTP服务器不能为空！", "text_ftp_server");
		return false;
	}

	if ( $("#text_ftp_cfgName").val() == "" ) {
		myAlert("文件名不能为空！", "text_ftp_cfgName");
		return false;
	}

	if ( !isConfigNameValid($("#text_ftp_cfgName").val() ) ) {
		myAlert( "文件名只能包含_.字母和数字！", "text_ftp_cfgName");
		return false;
	}
	
	if ( isHasChinese( $("#text_ftp_cfgName").val() ) ) {
		myAlert("文件名不能包含中文！", "text_ftp_cfgName");
		return false;
	}

	return true;
}

function isInputValid_tftp() {
	if ( $("#text_tftp_server").val() == "" ) {
		myAlert("TFTP服务器不能为空！", "text_tftp_server");
		return false;
	}

	if ( $("#text_tftp_cfgName").val() == "" ) {
		myAlert("文件名不能为空！", "text_tftp_cfgName");
		return false;
	}
	if ( !isConfigNameValid($("#text_tftp_cfgName").val()) ) {
		myAlert( "文件名只能包含_.字母和数字！", "text_tftp_cfgName");
		return false;
	}
	if ( isHasChinese( $("#text_tftp_cfgName").val() ) ) {
		myAlert("文件名不能包含中文！", "text_tftp_cfgName");
		return false;
	}
	/*
	if ( checkStringLen($("#text_tftp_cfgName").val(), 1, 32) == false ){
		myAlert("文件名不正确，文件名应为1-32个字符！", "text_tftp_cfgName");
		return false;
	}*/
	return true;
}
	
function form_cfg_export_local_download() {
	var url="setform/syslog.log?UID="+parent.uid;
	pageJump( url );
}

function form_cfg_export_local() {
	var url="setform/form_log_export_local?UID="+parent.uid;
	var f = new myForm();
	f.add( "test", "test" );
	f.submit( url, form_cfg_export_local_download );
}

function form_cfg_export_ftp() {
	if ( isInputValid_ftp() == false )	
		return;

	var url="setform/form_log_export_ftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "ftpServer", $("#text_ftp_server").val() );
	f.add( "ftpCfgName", $("#text_ftp_cfgName").val() );
	f.add( "ftpUserName", $("#text_ftp_username").val() );
	f.add( "ftpPassword", $("#text_ftp_password").val() );
	f.submit( url, exportCfgSuccess );
}

function form_cfg_export_tftp() {
	if ( isInputValid_tftp() == false )	
		return;

	var url="setform/form_log_export_tftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "tftpServer", $("#text_tftp_server").val() );
	f.add( "tftpCfgName", $("#text_tftp_cfgName").val() );
	f.submit( url, exportCfgSuccess );
}

function exportCfg() {
	var arrJqObj = $(".radio_method");
	for(i = 0; i < arrJqObj.length; i++) {
		var tmp = $( arrJqObj[i] );
		if ( tmp.attr("checked") == "checked" ){
			if ( tmp.val() == "Local" ) {
				form_cfg_export_local();
			} else if ( tmp.val() == "FTP" ) {
				form_cfg_export_ftp();
			} else {
				form_cfg_export_tftp();
			}
		}
	}
}

function changeMethod(obj) {
	$obj = $(obj);

	if ( $(obj).val()=="Local" ){
		$(".tr_local").css("display", "table-row");
		$(".tr_ftp").css("display", "none");
		$(".tr_tftp").css("display", "none");
	} else if ($(obj).val()=="FTP"){
		$(".tr_local").css("display", "none");
		$(".tr_ftp").css("display", "table-row");
		$(".tr_tftp").css("display", "none");
	} else {
		$(".tr_local").css("display", "none");
		$(".tr_ftp").css("display", "none");
		$(".tr_tftp").css("display", "table-row");
	}
}

function inputCheckValid() {
	if ( $("#sel_syslog_service").val() == 0 )
		return true;

	var ip = $("#text_hostip").val();
	if ( checkIP( ip ) ) {
		if ( ip == "0.0.0.0" ) {
			myAlert("日志服务器IP地址不能为0.0.0.0！", "text_hostip");
			return false;
		} else if ( ip == "255.255.255.255" ) {
			myAlert("日志服务器IP地址不能为255.255.255.255！", "text_hostip");
			return false;
		}
		if ( is_ip_loopback_address( ip) ) {
			myAlert("日志服务器IP地址不能为回环地址!", "text_hostip");
			return false;
		}

		if ( is_ip_multicast_address( ip ) ) {
			myAlert("日志服务器IP地址不能为组播地址!", "text_hostip");
			return false;
		}
		
		if ( is_ip_reserved( $("#text_hostip").val() ) ) {
			myAlert("日志服务器IP地址非法!", "text_hostip");
			return false;
		}
		
		return true;
	} else {
		myAlert("日志服务器IP地址格式不正确！", "text_hostip");
		return false;
	}
}

function getBufferLogsSuccess(data){
	var jsonData = eval("("+data+")");
	//var index = jsonData.data.indexOf(";");
	//var status = data.substr(0, index);
	//if (status == "ok"){
	//var	str = data.substr(index, data.length-index); 
	datas.length = 0;
	datas = jsonData.data;
	//eval("datas = new Array("+str+")");
	tg.pageview_init(datas, 100, 'list_log');
	//}
	/*
	else if (status == "error") {
		str = data.substr(index+1, data.length-index-1); 
		showError(true, str);
	}*/
	/*
	var index = data.indexOf(";");
	var status = data.substr(0, index);
	if (status == "ok"){
		str = data.substr(index+1, data.length-index-1); 
		datas.length = 0;
		eval("datas = new Array("+str+")");
		tg.pageview_init(datas, 100, 'list_log');
	}
	else if (status == "error") {
		str = data.substr(index+1, data.length-index-1); 
		showError(true, str);
	}
	*/
}

function logClear(){
	var f = new myForm();
	var url="setform/form_log_clear?UID="+parent.uid;
	f.add( "test", "test" );
	f.submit( url, getBufferLogsSuccess);
	/*
	showWaitConfig(true);
	var url="setform/form_log_clear?UID="+parent.uid;
	$("#myForm").html("");
	$("#myForm").append("<input type=\"hidden\" name=\"test\" value=\"test\" />");
	$("#myForm").attr("action", url);
	var ajaxEvent = $.ajax({
		cache: true,
		type: "POST",
		url: url,
		data:$("#myForm").serialize(),
		timeout:4000,//ms
		async: true,
		success: function(data) {
			showWaitConfig(false);
			getBufferLogsSuccess(data);
		},
		complete: function(XMLHttpRequest, status){
			if ( status == "timeout"){//status还有success,error等
				ajaxEvent.abort();				
				showError(true, "响应超时，请检查网络！");
			} else if ( status == "error"){
				showError(true);
			}
		}
	});
	*/
}

function logRefresh() {
	var f = new myForm();
	var url="goform/form_log_refresh?UID="+parent.uid;
	f.add( "test", "test" );
	f.submit( url, getBufferLogsSuccess);
	/*
	showWaitConfig(true);
	var url="goform/form_log_refresh?UID="+parent.uid;
	$("#myForm").html("");
	$("#myForm").append("<input type=\"hidden\" name=\"test\" value=\"test\" />");
	$("#myForm").attr("action", url);
	var ajaxEvent = $.ajax({
		cache: true,
		type: "POST",
		url: url,
		data:$("#myForm").serialize(),
		timeout:4000,//ms
		async: true,
		success: function(data) {
			showWaitConfig(false);
			getBufferLogsSuccess(data);
		},
		complete: function(XMLHttpRequest, status){
			if ( status == "timeout"){//status还有success,error等
				ajaxEvent.abort();				
				showError(true, "响应超时，请检查网络！");
			} else if ( status == "error"){
				showError(true);
			}
		}
	});
	*/
}

function ok() {
	if ( !inputCheckValid() ) {
		return;
	}

	var f = new myForm();
	var url="setform/form_log_set_infocenter?UID="+parent.uid;
	f.add( "infocenterEnable", $("#option_infocenterEnable").val() );
	
	var sysloghostip;
	if ( $("#sel_syslog_service").val() == 0 )
		sysloghostip = "0.0.0.0";
	else
		sysloghostip = $("#text_hostip").val();
	
	f.add( "hostIP", sysloghostip );
	f.add( "hostLevel", $("#option_hostLevel").val() );
	
	f.add( "buffEnable", $("#option_bufferEnable").val() );
	f.add( "buffLevel", $("#option_bufferLevel").val() );
	
	f.submit( url, ajaxDone );
}

function cancel(){
	load();
}

function rowClick(obj){
	var $obj=$(obj) //DOM Object to Jquery Object
	
	if ( $obj.attr('class') != "rowSelected" ) {
		$(".rowSelected").attr('class', 'rowUnSelected');
		$obj.attr('class', "rowSelected");
	}
}
	
function generateSyslogTable(){
	;
}

function tabmenu_jump(page) {
	switch (page){
	case "日志信息":
		setNavigationBar("设备管理>日志管理>日志信息");
		$(".log_part_display").css('display','block'); 
		$(".log_part_setting").css('display','none'); 
		$(".log_part_export").css( "display", "none");
		break;
	case "日志设置":
		setNavigationBar("设备管理>日志管理>日志设置");
		$(".log_part_display").css('display','none'); 
		$(".log_part_setting").css('display','block'); 
		$(".log_part_export").css( "display", "none");
		break;
	case "日志导出":
		setNavigationBar("设备管理>日志管理>日志导出");
		$(".log_part_display").css('display','none'); 
		$(".log_part_setting").css('display','none'); 
		$(".log_part_export").css( "display", "block");
		break;
	default:
		myAlert("Unkown tab clicked!");
		break;
	}
}

$(document).ready(function() {
	tabMenu_init();
	generateSyslogTable();
	
	/* syslog表格鼠标划过事件处理 start */
	$(".rowUnSelected").mouseover(function(e){
		if ( e.currentTarget.className == 'rowUnSelected' )
		e.currentTarget.className = 'rowUnSelected rowHover';
	});
	
	$(".rowUnSelected").mouseout(function(e){
		if ( e.currentTarget.className == 'rowUnSelected rowHover' )
			e.currentTarget.className = 'rowUnSelected';
	});
	/* syslog表格鼠标划过事件处理 end */

});

function onSearchLog() {
	var keyWords = $("#text_keywords").val();
	tg.pageview_search( $("#search_item").val(), keyWords );
}

var tg = new myGrid('tg');

var tmp;
function parseLevel(data, index){
	tmp = data[index].split(".");	
	return tmp[1];
}
function parseModule(data, index){
	tmp = data[index].split(":");	
	return tmp[0];
}
function sortLevelAsc(a, b){
	arrA = a.split(";");
	arrB = b.split(";");
	arrSubA = arrA[2].split(".");
	arrSubB = arrB[2].split(".");
	if ( arrSubA[1] > arrSubB[1] ) return 1;
	if ( arrSubA[1] == arrSubB[1] ) return 0;
	if ( arrSubA[1] < arrSubB[1] ) return -1;
}
function sortLevelDsc(a, b){
	arrA = a.split(";");
	arrB = b.split(";");
	arrSubA = arrA[2].split(".");
	arrSubB = arrB[2].split(".");
	if ( arrSubA[1] > arrSubB[1] ) return -1;
	if ( arrSubA[1] == arrSubB[1] ) return 0;
	if ( arrSubA[1] < arrSubB[1] ) return 1;
}

var LINENUM_INDEX = 5;
function sortTimeAsc(a, b){
	if(a == '') return 1;
	if(b == '') return -1;
	var s1 = a.split(';');
	var s2 = b.split(';');
	return s1[LINENUM_INDEX] - s2[LINENUM_INDEX];
}

function sortTimeDsc(a, b){
	if(a == '') return -1;
	if(b == '') return 1;
	var s1 = a.split(';');
	var s2 = b.split(';');
	return s2[LINENUM_INDEX] - s1[LINENUM_INDEX];
}

function changeSyslogServ(){
	if ( $("#sel_syslog_service").val() == 0 )
			$(".part_syslog_serv").css('display', 'none');
	else 
			$(".part_syslog_serv").css('display', 'table-row');
}

function init() {
	tabmenu_jump("日志信息");
	load();

	setNavigationBar("设备管理>日志管理>日志信息");

	tg.pageview_add('时间/日期', 0, '144px', MG_SORT_SELF, null, null, sortTimeAsc, sortTimeDsc);
	tg.pageview_add('主机名', 1, '101px', MG_SORT_ASCII);
	tg.pageview_add('级别', 2, '56px', MG_SORT_SELF, null, parseLevel, sortLevelAsc, sortLevelDsc);
	tg.pageview_add('模块', 3, '105px', MG_SORT_ASCII, null, parseModule);
	tg.pageview_add('描述', 4, '405px', MG_SORT_ASCII, null, null);
	tg.pageview_separateHeadFoot(true);
	tg.pageview_init(datas, 100, 'list_log');

	var arrJqObj = $(".radio_method");
	for (i = 0; i < arrJqObj.length; i++) {
		if ( $( arrJqObj[i] ).val() == "Local" ){
			$( arrJqObj[i] ).click();
		}
	}
}
