function myhelp() {
	if ( $(".part_client").css("display") == "block" ) {
		popHelp("dhcpd_clientlist");
	} else if ( $(".part_dynamic").css("display") == "block" ) {
		popHelp("dhcpd_dynamic");
	} else if ( $(".part_static").css("display") == "block" ) {
		popHelp("dhcpd_static");
	}
}
/* dhcpd static bind settings */
function dhcpd_del_static_bind(arrRow, indexRow) {
	var url="setform/form_dhcpd_del_static_bind?UID="+parent.uid;
	var f = new myForm();
	f.add("mac", arrRow[0]);
	f.add("ip", arrRow[1]);
	f.submit( url, dhcpd_del_static_bind_success );
}

function dhcpd_del_static_bind_success( data ) {
	refreshStaticSuccess( data );
}

function dhcpd_add_static_bind() {
	var url = "dhcpd_add_static_bind.asp?UID=" + parent.uid;
	pageJump(url);
}
/* dhcpd static bind settings, end */

function delPoolSuccess( data ) {
	jsDhcpd_pool = eval("("+data+")");
	load();
}

function pool_del(arrRow, indexRow) {
	var name = arrRow[0];
	var url = "setform/form_pool_del?UID=" + parent.uid;
	var f = new myForm();
	f.add("name", name);
	f.submit( url, delPoolSuccess );
}

function pool_edit(arrRow, indexRow) {
	var name = arrRow[0];
	var url = "dhcpd_edit.asp?UID=" + parent.uid + "&name=" + name + "&page=" + tg.getCurrentPage();
	pageJump(url);
}

function enabled() {
	var url="setform/form_dhcpd_enable?UID="+parent.uid;
	var f = new myForm();
	if ( $("#sel_enabled").val() == "enabled" ) 
		f.add("enabled", "1" );
	else
		f.add("enabled", "0" );
	f.submit( url, done );
}

function getLeases() {
	var url="setform/form_dhcpd_get_leases?UID="+parent.uid;
	var f = new myForm();
	if ( $("#sel_enabled").val() == "enabled" ) 
		f.add("enabled", "1" );
	else
		f.add("enabled", "0" );
	f.submit( url, done );
}

function done() {
	alert("ok!");
}

function pool_add() {
	var url = "dhcpd_add.asp?UID=" + parent.uid;
	pageJump(url);
}

function release_lease(arrRow, indexRow) {
	var url="setform/form_dhcpd_release_lease?UID="+parent.uid;
	var f = new myForm();
	f.add("ip", arrRow[2]);
	f.add("mac", arrRow[3]);
	f.submit( url, refreshClientList);
}

var arrListClient = new Array();
function refreshClientListSuccess( data ) {
	var jsLeases = eval("("+data+")");
	var i;
	var lease;

	arrListClient.length = 0;
	for ( i = 0; i < jsLeases.leases.length; i++ ) {
		lease = jsLeases.leases[i];
		arrListClient[i] = lease.hostname + ";";
		arrListClient[i] += lease.interface + ";";
		arrListClient[i] += lease.ip + ";";
		arrListClient[i] += lease.mac + ";";
		//arrListClient[i] += lease.start + ";";
		arrListClient[i] += lease.time;
	}

	var page = getQueryString("page");
	if ( page != null )
		tgClient.pageview_init(arrListClient, 10, 'list_client', page);
	else
		tgClient.pageview_init(arrListClient, 10, 'list_client');

}

function load() {
	var i;
	var tmp;
	for ( i = 0; i < jsDhcpd.pkg_dhcpd.length; i++ ) {
		tmp = jsDhcpd.pkg_dhcpd[i];
		if ( tmp.sect_name == "global") {
			if ( tmp.enabled == "1")
				$("#sel_enabled").val("enabled");
			else
				$("#sel_enabled").val("disabled");
		}
	}

	var temp = jsDhcpd_pool.pkg_dhcpd_pool;
	arrPool.length = 0;
	for (i = 0; i< temp.length; i++) {
		arrPool[i] = temp[i].sect_name;
		arrPool[i] += ";";
		if ( typeof(temp[i].net) == "undefined" 
					|| typeof(temp[i].netmask) == "undefined" ) {
			arrPool[i] += ";";
		} else {
			arrPool[i] += temp[i].net + "/" + temp[i].netmask + ";";
		}

		if ( typeof(temp[i].low) == "undefined" 
					|| typeof(temp[i].high) == "undefined" ) {
			arrPool[i] += "";
		} else {
			arrPool[i] += temp[i].low + " - " + temp[i].high;
		}
	}

	var page = getQueryString("page");
	if ( page != null )
		tg.pageview_init(arrPool, 10, 'list_dynamic_pool', page);
	else
		tg.pageview_init(arrPool, 10, 'list_dynamic_pool');
}

function formatTime(arrayRow, index){
	var str = "";
	var nSec = parseInt( arrayRow[index] );
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	hours = parseInt( nSec / 3600 )
	minutes = parseInt( (nSec % 3600) / 60 );
	seconds =  nSec % 60;
	if ( hours < 10 )
		str += "0" + hours + ":";
	else
		str += hours + ":";

	if ( minutes < 10 )
		str += "0" + minutes + ":";
	else
		str += minutes + ":";

	if ( seconds < 10 )
		str += "0" + seconds;
	else
		str += seconds;

	return str;
}

function tabmenuHL(){
	var tabMenu = getQueryString("tabMenu");
	if ( tabMenu == null || tabMenu == "" || tabMenu == "client")
		tabMenu = "客户端列表";
	else if ( tabMenu == "dynamic") {
		tabMenu = "动态绑定";
	} else if ( tabMenu == "static" ) {
		tabMenu = "静态绑定";
	} else {
		tabMenu = "客户端列表";
	}
	var arrDom = $(".tabmenu a");
	for (i = 0; i < arrDom.length; i++){
		tmp = $(arrDom[i]);
		if (tmp.html() == tabMenu){
			tmp.click();
			break;
		}
	}
}

var tg = new myGrid('tg');
var tgClient = new myGrid("tgClient");
var tgStatic = new myGrid('tgStatic');
function init() {
	tg.pageview_add('地址池名称', 0, '27%', MG_SORT_ASCII);
	tg.pageview_add('IP/子网掩码', 1, '30%', MG_SORT_ASCII);
	tg.pageview_add('地址池范围', 2, '30%', MG_SORT_ASCII);
	tg.pageview_add_btn("编辑", pool_edit);
	tg.pageview_add_btn("删除", pool_del);
	tg.pageview_set_OPwidth("13%");

	tgClient.pageview_add('客户端名称', 0, '20%', MG_SORT_ASCII);
	tgClient.pageview_add('接口', 1, '15%', MG_SORT_ASCII);
	tgClient.pageview_add('IP地址', 2, '15%', MG_SORT_ASCII);
	tgClient.pageview_add('MAC地址', 3, '15%', MG_SORT_ASCII);
	tgClient.pageview_add('租期剩余时间', 4, '15%', MG_SORT_NUM, null, formatTime);
	tgClient.pageview_add_btn("删除", release_lease);
	tgClient.pageview_set_OPwidth("10%");

	tgStatic.pageview_add('MAC地址', 0, '43%', MG_SORT_ASCII);
	tgStatic.pageview_add('IP地址', 1, '44%', MG_SORT_ASCII);
	tgStatic.pageview_add_btn("删除", dhcpd_del_static_bind);
	tgStatic.pageview_set_OPwidth("13%");

	//loadClientList();
	tabmenuHL();

	/*defalt export tech_support.tar method: Local*/
	var arrJqObj = $(".radio_method");
	for (i = 0; i < arrJqObj.length; i++) {
		if ( $( arrJqObj[i] ).val() == "Local" ){
			$( arrJqObj[i] ).click();
		}
	}
}

function form_dhcpd_export_static_step_1() {
	var url = "setform/form_dhcpd_export_static_step_1?UID=" + parent.uid;
	var f = new myForm();
	f.add( "needOne", "needOne" );
	f.submit( url, form_dhcpd_export_static_step_2 );
}

function isInputValid_ftp_tech() {
	if ( $("#text_ftp_server_tech").val() == "" ) {
		myAlert("FTP服务器不能为空！", "text_ftp_server_tech");
		return false;
	}
	
	if ( $("#text_ftp_cfgName_tech").val() == "" ) {
		myAlert("文件名不能为空！", "text_ftp_cfgName_tech");
		return false;
	}

	if ( !isConfigNameValid($("#text_ftp_cfgName_tech").val()) ) {
		myAlert( "文件名只能包含_.字母和数字！", "text_ftp_cfgName_tech");
		return false;
	}

	if ( isHasChinese( $("#text_ftp_cfgName_tech").val() ) ) {
		myAlert("文件名不能包含中文！", "text_ftp_cfgName_tech");
		return false;
	}
	
	return true;
}
function isInputValid_tftp_tech() {
if ( $("#text_tftp_server_tech").val() == "" ) {
	myAlert("TFTP服务器不能为空！", "text_tftp_server_tech");
	return false;
}

if ( $("#text_tftp_cfgName_tech").val() == "" ) {
	myAlert("文件名不能为空！", "text_tftp_cfgName_tech");
	return false;
}

if ( !isConfigNameValid($("#text_tftp_cfgName_tech").val() ) ) {
	myAlert( "文件名只能包含_.字母和数字！", "text_tftp_cfgName_tech");
	return false;
}

if ( isHasChinese( $("#text_tftp_cfgName_tech").val() ) ) {
	myAlert("文件名不能包含中文！", "text_tftp_cfgName_tech");
	return false;
}

return true;
}

function form_dhcpd_export_static_step_2() {
	url = "setform/dhcpd_static?UID=" + parent.uid;
	pageJump(url);
}

function form_cfg_export_ftp_tech(){
	if ( !isInputValid_ftp_tech() )	
		return;

	var url="setform/form_tech_support_export_ftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "ftpServer", $("#text_ftp_server_tech").val() );
	f.add( "ftpCfgName", $("#text_ftp_cfgName_tech").val() );
	f.add( "ftpUserName", $("#text_ftp_username_tech").val() );
	f.add( "ftpPassword", $("#text_ftp_password_tech").val() );
	f.submit( url, exportTechSupportSuccess );
}

function form_cfg_export_tftp_tech() {
	if ( !isInputValid_tftp_tech() )	
		return;

	var url="setform/form_tech_support_export_tftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "tftpServer", $("#text_tftp_server_tech").val() );
	f.add( "tftpCfgName", $("#text_tftp_cfgName_tech").val() );
	f.submit( url, exportTechSupportSuccess );
}

function exportTechSupport() {
	var arrJqObj = $(".radio_method");
	for( var i = 0; i < arrJqObj.length; i++) {
		var tmp = $( arrJqObj[i] );
		if ( tmp.attr("checked") == "checked" ) {
			if ( tmp.val() == "Local" ) {
				form_dhcpd_export_static_step_1();
			} else if ( tmp.val() == "FTP" ) {
				form_dhcpd_export_static_ftp();
			} else {
				form_dhcpd_export_static_tftp();
			}
		}
	}
}

function exportCfgSuccess( data ) {
	myAlert("配置导出成功！");
}

function form_dhcpd_export_static_ftp(){
	if ( !isInputValid_ftp() )	
		return;

	var url="setform/form_dhcpd_export_static_ftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "ftpServer", $("#text_ftp_server").val() );
	f.add( "ftpCfgName", $("#text_ftp_cfgName").val() );
	f.add( "ftpUserName", $("#text_ftp_username").val() );
	f.add( "ftpPassword", $("#text_ftp_password").val() );
	f.submit( url, exportCfgSuccess );
}

function form_dhcpd_export_static_tftp() {
	if ( !isInputValid_tftp() )	
		return;

	var url="setform/form_dhcpd_export_static_tftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "tftpServer", $("#text_tftp_server").val() );
	f.add( "tftpCfgName", $("#text_tftp_cfgName").val() );
	f.submit( url, exportCfgSuccess );
}

function isInputValid_local() {
	if ( $("#fileField").val() == "" ) {
		myAlert("请选择静态绑定导入文件！");
		return false;
	}
	return true;
}

function exportTechSupportSuccess( data ) {
	myAlert("导出成功！");
}

function form_dhcpd_import_static_local() {
	showWaitConfig(true);
	$.ajaxFileUpload
	(
		{
			url: 'setform/form_dhcpd_import_static_local?UID='+parent.uid, //用于文件上传的服务器端请求地址
			secureuri: false, //一般设置为false
			fileElementId: 'fileField', //文件上传空间的id属性  <input type="file" id="file" name="file" />
			//dataType: 'json', //返回值类型 一般设置为json
			dataType: 'text',
			success: function (data, status)  //服务器成功响应处理函数
			{
				showWaitConfig(false);
				var jsonData = eval( "("+data+")" );
				//alert("___success:"+jsonData.status);
				if ( jsonData.status == "ok" ) {
					//upload_file_success();
					refreshStatic();
				} else if ( jsonData.status == "error" ){
					showError( true, jsonData.error);
				} else
					showError( true, "未知响应！" );	//never reach here

			},
			error: function (data, status, e)//服务器响应失败处理函数
			{
				alert(e);
			}
		}
	)
	return false;
}

function isInputValid_ftp() {
	if ( $("#text_ftp_server").val() == "") {
		myAlert("FTP服务器不能为空！", "text_ftp_server");
		return false;
	}

	if ( $("#text_ftp_cfgName").val() == "" ) {
		myAlert("文件名不能为空", "text_ftp_cfgName");
		return false;
	}

	if ( !isConfigNameValid($("#text_ftp_cfgName").val()) ) {
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
	if ( $("#text_tftp_server").val() == "") {
		myAlert("TFTP服务器不能为空！", "text_tftp_server");
		return false;
	}

	if ( $("#text_tftp_cfgName").val() == "" ) {
		myAlert("文件名不能为空！", "text_tftp_cfgName");
		return false;
	}	

	if ( !isConfigNameValid( $("#text_tftp_cfgName").val() ) ) {
		myAlert( "文件名只能包含_.字母和数字！", "text_tftp_cfgName");
		return false;
	}

	if ( isHasChinese( $("#text_tftp_cfgName").val() ) ) {
		myAlert("文件名不能包含中文！", "text_tftp_cfgName");
		return false;
	}
	
	return true;
}

function form_dhcpd_import_static_ftp() {
	if ( !isInputValid_ftp() )	
		return;

	var url="setform/form_dhcpd_import_static_ftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "ftpServer", $("#text_ftp_server").val() );
	f.add( "ftpCfgName", $("#text_ftp_cfgName").val() );
	f.add( "ftpUserName", $("#text_ftp_username").val() );
	f.add( "ftpPassword", $("#text_ftp_password").val() );
	f.submit( url, refreshStatic);
}

function importDhcpdStatic() {
	var arrJqObj = $(".radio_method");
	for (var i = 0; i < arrJqObj.length; i++) {
		var tmp = $( arrJqObj[i] );
		if ( tmp.attr("checked") == "checked" ) {
			if ( tmp.val() == "Local" ) {
				if ( !isInputValid_local() )
					return;
				form_dhcpd_import_static_local();
			} else if ( tmp.val() == "FTP" ) {
				if ( !isInputValid_ftp() )
					return;
				//myAlertSelect("设备升级完成后将自动重启,确定要升级吗？", form_dev_imageUpgrade_ftp);
				form_dhcpd_import_static_ftp();
			} else {
				if ( !isInputValid_tftp() )
					return;
				form_dhcpd_import_static_tftp();
				//myAlertSelect("设备升级完成后将自动重启,确定要升级吗？", form_dev_imageUpgrade_tftp);
			}
		}
	}
}

function form_dhcpd_import_static_tftp() {
	if ( !isInputValid_tftp() )	
		return;

	var url="setform/form_dhcpd_import_static_tftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "tftpServer", $("#text_tftp_server").val() );
	f.add( "tftpCfgName", $("#text_tftp_cfgName").val() );
	f.submit( url, refreshStatic);
}

function changeMethod_tech(obj) {
$obj = $(obj);
if ( $(obj).val()=="Local" ){
	$(".tr_local_tech").css("display", "table-row");
	$(".tr_ftp_tech").css("display", "none");
	$(".tr_tftp_tech").css("display", "none");
} else if ($(obj).val()=="FTP"){
	$(".tr_local_tech").css("display", "none");
	$(".tr_ftp_tech").css("display", "table-row");
	$(".tr_tftp_tech").css("display", "none");
} else {
	$(".tr_local_tech").css("display", "none");
	$(".tr_ftp_tech").css("display", "none");
	$(".tr_tftp_tech").css("display", "table-row");
}
}

function refreshDynamicSuccess(data) {
	jsDhcpd_pool = eval("("+data+")");
	load();
}

function refreshStaticSuccess(data) {
	jsDhcpd = eval("("+data+")");

	var i, j;
	var temp = jsDhcpd.pkg_dhcpd;
	arrPool.length = 0;
	for (i = 0; i < temp.length; i++) {
		if ( temp[i].sect_name != "static" )
			continue;

		if ( typeof(temp[i].bind) != "undefined" ) {
			for ( j = 0; j < temp[i].bind.length; j++ ) {
				var str =  temp[i].bind[j].bind;
				var arrBindElem = str.split("/");
				arrPool[j] = arrBindElem[0] + ";" + arrBindElem[1];
			}
		}
	}

	var page = getQueryString("page");
	if ( page != null )
		tgStatic.pageview_init(arrPool, 10, 'list_dhcpd_static_bind', page);
	else
		tgStatic.pageview_init(arrPool, 10, 'list_dhcpd_static_bind');

}

function refreshClientList() {
	var url = "goform/form_dhcpd_get_leases?UID=" + parent.uid;
	var f = new myForm();
	f.add("test", "test");
	f.submit( url, refreshClientListSuccess );
}

function refreshDynamic() {
	var url = "goform/form_dhcpd_get_dynamic_pools?UID=" + parent.uid;
	var f = new myForm();
	f.add("test", "test");
	f.submit( url, refreshDynamicSuccess);
}

function refreshStatic() {
	var url = "goform/form_dhcpd_get_static_bind?UID=" + parent.uid;
	var f = new myForm();
	f.add("test", "test");
	f.submit( url, refreshStaticSuccess);
}

function loadClientList() {
	setNavigationBar("网络设置>DHCP>客户端列表");
	$(".part_client").css('display','block'); 
	$(".part_dynamic").css('display','none'); 
	$(".part_static").css('display','none'); 
	refreshClientList();
}

function loadDynamic() {
	setNavigationBar("网络设置>DHCP>动态绑定");
	$(".part_client").css('display','none'); 
	$(".part_dynamic").css('display','block'); 
	$(".part_static").css('display','none'); 
	refreshDynamic();
}

function loadStatic() {
	setNavigationBar("网络设置>DHCP>静态绑定");
	$(".part_client").css('display','none'); 
	$(".part_dynamic").css('display','none'); 
	$(".part_static").css('display','block'); 
	refreshStatic();
}

function tabmenu_jump(page) {
	switch (page){
	case "客户端列表":
		loadClientList();
		break;
	case "动态绑定":
		loadDynamic();
		break;
	case "静态绑定":
		loadStatic();
		break;
	default:
		break;
	}
}

$("document").ready( function(){
	tabMenu_init();
});

function reset_leases() {
	var url="setform/form_dhcpd_release_leases_all?UID="+parent.uid;
	var f = new myForm();
	f.add("test", "test");
	f.submit( url, refreshClientList );
}

function reset_static_bind() {
	var url="setform/form_dhcpd_reset_static_bind?UID="+parent.uid;
	var f = new myForm();
	f.add("test", "test");
	f.submit( url, refreshStatic );
}

function onSearch_client() {
	var keyWords = $("#text_keywords_client").val();
	tgClient.pageview_search( $("#sel_search_item_client").val(), keyWords );
}
function onSearch_pool() {
	var keyWords = $("#text_keywords_pool").val();
	tg.pageview_search( $("#sel_search_item_pool").val(), keyWords );
}
function onSearch_static() {
	var keyWords = $("#text_keywords_static").val();
	tgStatic.pageview_search( $("#sel_search_item_static").val(), keyWords );
}
