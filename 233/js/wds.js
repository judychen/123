function loadWds() {
	var chooseStpl = new Array();
	chooseStpl.idx = -1;
	for ( var i = 0; i < jsServTpl.pkg_wlan_service_template.length; i++ ) {
		var servTpl = jsServTpl.pkg_wlan_service_template[i];	
		var servTplIndex = servTpl.sect_name.slice(15);
		$("#sel_wds_ssid").append("<option value=\""+ servTplIndex +"\" >"+ servTpl.ssid +"</option>");
		if ( typeof( servTpl.manage_template ) != "undefined" 
				&& servTpl.manage_template == "enable" ) {
			chooseStpl.idx = servTplIndex;
			chooseStpl.ip = servTpl.manage_ip;
			chooseStpl.netmask = servTpl.manage_mask;
		}
	}

	return chooseStpl;
}

function isInputValid_wds() {
	if ( $("#sel_wds_enable").val() == "disable" )
		return true;

	if ( $("#sel_wds_ssid").val() == "" ) {
		myAlert("请选择SSID", "sel_acl_scheme");
		return false;
	}

	if ( $("#text_wds_ip").val() == "" ) {
		myAlert("IP地址不能为空！", "text_wds_ip");
		return false;
	}
	
	if ( $("#text_wds_netmask").val() == "" ) {
		myAlert("子网掩码不能为空！", "text_wds_netmask");
		return false;
	}

	if ( !checkIP( $("#text_wds_ip").val() ) ) {
		myAlert("IP地址格式不正确!", "text_wds_ip");
		return false;
	}

	if ( !checkMask( $("#text_wds_netmask").val() )) {
		myAlert("子网掩码格式不正确!", "text_wds_netmask");
		return false;
	}

	return true;
}

function ok_wds() {
	if ( !isInputValid_wds() )
		return;
	
	var url = "setform/form_wds_maintenance?UID=" + parent.uid;
	var f = new myForm();
	f.add( "wds_enable", $("#sel_wds_enable").val() );
	f.add( "wds_stid", $("#sel_wds_ssid").val() );
	f.add( "wds_ip", $("#text_wds_ip").val());
	f.add( "wds_netmask", netmask_dotteQuad2num($("#text_wds_netmask").val()) );
	
	f.submit( url, changedWdsSuccess );
}

function changedWdsSuccess(data) {
	var jsonData = eval("("+data+")");
	jsServTpl.pkg_wlan_service_template = jsonData.pkg_wlan_service_template;

	init_sel_wds_ssid();
	var chooseStpl = loadWds();	
	if ( chooseStpl.idx != -1 ) {
		$("#sel_wds_ssid").val( chooseStpl.idx );
		$("#text_wds_ip").val( chooseStpl.ip );
		$("#text_wds_netmask").val( netmask_num2dottedQuad(chooseStpl.netmask) );
		$("#sel_wds_enable").val("enable");
	} else {
		$("#sel_wds_enable").val("disable");
	} 
	changeWdsEnable();
}

function init_sel_wds_ssid() {
	$("#sel_wds_ssid").html("<option value=\"\" >请选择SSID</option>"); 
}

function cancel_wds() {
	init_sel_wds_ssid();
	var chooseStpl = loadWds();	
	if ( chooseStpl.idx != -1 ) {
		$("#sel_wds_ssid").val( chooseStpl.idx );
		$("#text_wds_ip").val( chooseStpl.ip );
		$("#text_wds_netmask").val( netmask_num2dottedQuad(chooseStpl.netmask) );
		$("#sel_wds_enable").val("enable");
	} else {
		$("#sel_wds_enable").val("disable");
	} 
	changeWdsEnable();
}

function changeWdsEnable() {
	if ( $("#sel_wds_enable").val() == "enable" ) {
		$(".part_tr_wds_enable").css("display", "table-row");
	} else {
		$(".part_tr_wds_enable").css("display", "none");
	}
}
