//name, page(url)
var arr_nat_wizard_items = new Array(
	["工作模式", "wizard_link_mode"],
	["WAN设置", "wizard_wan_settings"],
	["LAN设置", "wizard_lan_settings"],
	["用户密码", "wizard_admin_pwd"],
	["无线设置", "wizard_wireless_settings"],
	["配置总览", "wizard_nat_summary"]
);

var arr_bridge_wizard_items = new Array(
	["工作模式", "wizard_link_mode"],
	["IP地址",	 "wizard_ip_settings"],
	["用户密码", "wizard_admin_pwd"],
	["无线设置", "wizard_wireless_settings"],
	["配置总览", "wizard_summary"]
)

var arr_wizard_items = new Array(
	["IP地址",	 "wizard_ip_settings"],
	["用户密码", "wizard_admin_pwd"],
	["无线设置", "wizard_wireless_settings"],
	["配置总览", "wizard_summary"]
)

/* nat or bridge */
function link_mode_changed( type ) {
	if ( type == "nat" ) {
		top.arr_wizard_items = arr_nat_wizard_items;
	} else {
		top.arr_wizard_items = arr_bridge_wizard_items;
	}
}

/*
var arr_wizard_items = new Array(
	["IP地址",	  "wizard_ip_settings"],
//	["时间设置", "wizard_time_settings"],
	["用户密码", "wizard_admin_pwd"],
	["无线设置", "wizard_wireless_settings"],
//	["无线名称", "wizard_wireless_ssid"],
//	["无线安全", "wizard_wireless_security"]
//	["射频参数", "wizard_wireless_radio"]
	["配置总览", "wizard_summary"]
)
*/
	
var g_wizard_hash;
function _wizard_click( url ) {
	if ( typeof(ok) != "undefined" )
		ok();

	pageJump( url );
}

function wizard_click( i ) {
	if ( top.wizard[i].status != "ok" )
		return;

	if ( typeof(isInputValid) != "undefined" ) {
		if ( !isInputValid() ) {
			return;
		} else {
			g_wizard_hash.status = "ok";
		}
	} else {
		g_wizard_hash.status = "ok";
	}

	var url = top.arr_wizard_items[i][1] + ".asp?UID=" + parent.uid;
	if ( typeof(needConfirm) != "undefined") {
		needConfirm( _wizard_click( url ) );
	} else {
		_wizard_click( url );
	}

	//pageJump( url );
}
	
function isFirst() {
	if ( top.arr_wizard_items[0][1] == g_wizard_hash.currentPage )
		return true;
	else
		return false;
}

function isLast() {
	if ( top.arr_wizard_items[top.arr_wizard_items.length - 1][1] == g_wizard_hash.currentPage )
		return true;
	else
		return false;
}

function isCurrent( currentPage ) {
	if ( g_wizard_hash.currentPage == currentPage )
		return true;
	else
		return false;
}

function getCurrentIndex( currentPage ) {
	for ( var i = 0; i < top.arr_wizard_items.length; i++ ) {
		if ( top.arr_wizard_items[i][1] == currentPage )
			return i;
	}
	return -1;
}
	
function generateWizardNavigationBar() {
	var str = "";
	for ( var i = 0; i < top.arr_wizard_items.length; i++ ) {
		var finish_class = "";
		if ( top.wizard[i].status == "ok" )
			finish_class = "finish";

		//str = "<div class=\"step head " + finish_class + "\">" + (i+1) + "</div>";
		str += "<div class=\"step head " + finish_class + "\">" + (i+1) + "</div>";

		if ( isCurrent( top.arr_wizard_items[i][1] ) )
			str += "<a ><div class=\"step body current"; 
		else
			str += "<a onclick=\"wizard_click("+i+");\"><div class=\"step body " + finish_class; 

		str += "\">"+top.arr_wizard_items[i][0]+"</div></a>";
		//alert(str);
		//$("#wizard_div").append(str);
	}
	$("#wizard_div").html(str);
}

function generateWizardOptions() {
	var str = "";
	str += "<input type=\"button\" class=\"buttonL\" onClick=\"wizard_cancel();\" value=\" 返 回 \">";
	if ( !isFirst() )
		str += "<input type=\"button\" class=\"buttonL\" onClick=\"wizard_prev_step();\" value=\" 上一步 \">";
	if ( !isLast() )
		str += "<input type=\"button\" class=\"buttonL\" onClick=\"wizard_next_step();\" value=\" 下一步 \">";
	else
		str += "<input type=\"button\" class=\"buttonL\" onClick=\"wizard_ok();\" value=\" 完 成 \">";

	//$("#wizard_op").append(str);
	$("#wizard_op").html(str);
}

function initWizardDatas() {
	for ( var i = 0; i < top.arr_wizard_items.length; i++ ) {
		//eval( "top.wizard." + arr_wizard_items[i][1] + " = new Array()" );
		eval( "top.wizard[" + i + "] = new Array()" );
	}
}

function loadWizardProgress( currentPage, validFunc, okFunc ) {
	if ( typeof( top.wizard ) == "undefined" )
		top.wizard = new Array();

	if ( typeof(top.wizard) == "undefined" || top.wizard.length == 0 ) {
		initWizardDatas();
	}

	var index = getCurrentIndex( currentPage );
	g_wizard_hash = top.wizard[index];

	g_wizard_hash.currentPage = currentPage;
	g_wizard_hash.validFunc = validFunc;
	g_wizard_hash.okFunc = okFunc;

	//generate wizard navigation bar
	generateWizardNavigationBar();
	//generate op button
	generateWizardOptions();

	return g_wizard_hash;
}

/*
function _wizard_next_step() {
	if ( typeof(ok) != "undefined" )
		ok();

	var url;
	for ( var i = 0; i < top.arr_wizard_items.length - 1; i++ ) {
		if ( isCurrent( top.arr_wizard_items[i][1] ) ) {
			//get next page url
			url = top.arr_wizard_items[i+1][1] + ".asp?UID=" + parent.uid;
			pageJump( url );
			return;
		}
	}
	alert("error: end had reached!");
}
*/
	
function wizard_next_step() {
	if ( typeof(isInputValid) != "undefined" ) {
		if ( !isInputValid() ) {
			if ( typeof(g_wizard_hash.status) != "undefined" )
				g_wizard_hash.status = "error";
			return;
		} else {
			g_wizard_hash.status = "ok";
		}
	} else {
		g_wizard_hash.status = "ok";
	}

	var url;
	for ( var i = 0; i < top.arr_wizard_items.length - 1; i++ ) {
		if ( isCurrent( top.arr_wizard_items[i][1] ) ) {
			//get next page url
			url = top.arr_wizard_items[i+1][1] + ".asp?UID=" + parent.uid;
			//pageJump( url );
			//return;
		}
	}

	if ( typeof(needConfirm) != "undefined") {
		needConfirm( _wizard_click(url) );
	} else {
		_wizard_click( url );
	}
}

function wizard_prev_step() {
	if ( g_wizard_hash.status == "error" ) {
		g_wizard_hash.status = "ok";
	}

	var url;
	//get prev page url
	for ( var i = 1; i < top.arr_wizard_items.length; i++ ) {
		if ( isCurrent( top.arr_wizard_items[i][1] ) ) {
			url = top.arr_wizard_items[i-1][1] + ".asp?UID=" + parent.uid;
			pageJump( url );
			return;
		}
	}
	alert("error: begin had reached!");
}

function wizard_cancel() {
	var url = "index.asp?UID=" + parent.uid;
	window.parent.location.href = url;
}

function wizard_ok() {
	if ( typeof(isInputValid) != "undefined" ) {
		if ( !isInputValid() ) {
			return;
		} else {
			g_wizard_hash.status = "ok";
		}
	} else {
		g_wizard_hash.status = "ok";
	}

	for ( var i = 0; i < top.arr_wizard_items.length; i++ ) {
		if ( top.wizard[i].status != "ok" ) {
			myAlert( top.arr_wizard_items[i][0] + "配置未完成！");
			var url = top.arr_wizard_items[i][1] + ".asp?UID=" + parent.uid;
			pageJump( url );
			return;
		}
	}

	if ( typeof(finish) != "undefined" )
		finish();
}
