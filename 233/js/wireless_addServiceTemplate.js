//加密方式更改
function myhelp() {
	popHelp("wirelessAdd");
}

function change(){
	if ( $("#sel_auth").val() == "WEP" ){
		$(".wep").css('display','table-row');
	}
	else {
		$(".wep").css('display','none');
	}
		
	if ( $("#sel_auth").val() == "WPA-PSK" || $("#sel_auth").val() == "WPA-1X") {
		$(".WPAorWPA2").css('display','table-row');
		radiusSupportChange();
	}
	else {
		$(".radius").css('display','none');
		$(".noRadius").css('display','none');
		$(".WPAorWPA2").css('display','none');
		$(".WPAMODE").css('display','none');
	}
}

function radiusSupportChange() {
	if( $("#sel_auth").val() == "WPA-1X" ){
		$(".radius").css('display','table-row');
		$(".noRadius").css('display','none');
		$(".WPAMODE").css('display','none');
	}
	else {
		$(".radius").css('display','none');
		$(".noRadius").css('display','table-row');
		$(".WPAMODE").css('display','table-row');
	}
}

/*
function changePassphase() {
	if( $("#sel_passphase_hex").val() == "passphase" ){
		$("#span_passphase").css('display','inline');
		$("#span_hex").css('display','none');
	}
	else {
		$("#span_passphase").css('display','none');
		$("#span_hex").css('display','inline');
	}
}*/

/*
function enableVLAN() {
	if ( $("#chk_enableVLAN").attr("checked")=="checked" )
		$(".ENABLE_VLAN").css("display", "table-row");
	else
		$(".ENABLE_VLAN").css("display", "none");
}
*/

function enable_gtk() {
	if ( $("#chk_gtk_enable").attr("checked")=="checked" )
		$(".part_enable_gtk").css("display", "inline");
	else
		$(".part_enable_gtk").css("display", "none");
}

function enable_ptk() {
	if ( $("#chk_ptk_enable").attr("checked")=="checked" )
		$(".part_enable_ptk").css("display", "inline");
	else
		$(".part_enable_ptk").css("display", "none");
}


function goBack() {
	pageJump("wireless_servers.asp?UID="+parent.uid);
}

function addApServiceSuccess(data) {
	pageJump("wireless_servers.asp?UID="+parent.uid);
}

function getAuth() {
	if ( $("#sel_auth").val() == "None" ) {
		return "open";
	} else if ( $("#sel_auth").val() == "WEP" ) {
		//open or shared
		return  $("input[name='radio_wep_auth']:checked").val();
	} else if ( $("#sel_auth").val() == "WPA-PSK" ) {
		//wpa, wpa2 or wpa_mix
		return  $("input[name='radio_wpa_auth']:checked").val();
	} else {
		return "wpa2-radius";	
	}
}

function getCipher( auth ) {
	if ( auth == "open" && $("#sel_auth").val() != "WEP" ) {
		return "none";
	} else if ( auth == "open" || auth == "shared" ) {
		var key = $("#text_wep_key").val();
		//myAlert( "key:"+key);
		if ( key.length == 5 || key.length == 10 )
			return "wep40";
		else if ( key.length == 13 || key.length == 26 ) {
			return "wep104";
		} else
			myAlert("error: never reach here!");
		
	} else if ( auth == "wpa-psk" || auth == "wpa2-psk" || auth == "wpa-mixed-psk" || auth == "wpa2-radius") {
		return  $("input[name='radio_wpa_cipher']:checked").val();
	} else
		myAlert("error: never reach here!");
}

function isInputValid_WepKey() {
	var key = $("#text_wep_key").val();
	
	if ( key.length == 5 || key.length == 13 ) {
		if ( !check_wep_key_ascii(key) ) {
			myAlert("WEP key不能包含? \" ' ;和空格！", "text_wep_key");
			return false;
		}
	} else if ( key.length == 10 || key.length == 26 ) {
		if ( !isHexString(key) ) {
			myAlert("WEP key不正确，其值应为5或13个字符，10或26个十六进制字符！", "text_wep_key");
			return false;
		}
	} else {
		myAlert("WEP key不正确，其值应为5或13个字符，10或26个十六进制字符！", "text_wep_key");
		return false;
	}
	
	return true;
}

function isInputValid_wpa_psk() {
	var key = $("#text_wpa_psk").val();

	if ( key.length < 64 ) {
		if ( !checkStringLen( key, 8, 63 ) ) {
			myAlert("共享密钥长度不正确，应为8-63个字符！", "text_wpa_psk");
			return false;
		}
		if ( !check_psk_ascii(key) ) {
			myAlert("共享密钥不能包含? \" ' ;和空格！", "text_wpa_psk");
			return false;
		}
	} else {
		if ( !checkStringLen( key, 64, 64 ) ) {
			myAlert("共享密钥长度不正确，应为64个十六进制字符！", "text_wpa_psk");
			return false;
		}
		if ( isHexString( key ) == false ) {
			myAlert("共享密钥格式不正确，应为十六进制字符！", "text_wpa_psk");
			return false;
		}

	}

	return true;
}

function isInputValid_wpa_EAP() {
	if ( $("#sel_radius_scheme").val() == "" ) {
		myAlert("请选择AAA方案", "sel_radius_scheme");
		return false;
	}
	return true;
}

function isInputValid_gtk_and_ptk() {
	if ( $("#chk_gtk_enable").attr("checked") == "checked" ) {
		if ( !checkNumberRang( $("#text_gtk_lifttime").val(), 600, 604800 )	) {
			myAlert("非法的GTK-lifetime！", "text_gtk_lifttime" );
			return false;
		}
	}

	if ( $("#chk_ptk_enable").attr("checked") == "checked" ) {
		if ( !checkNumberRang( $("#text_ptk_lifttime").val(), 300, 604800 ) ) {
			myAlert( "非法的PTK-lifetime！", "text_ptk_lifttime" );
			return false;
		}
	}
	return true;
}

function isInputValid() {
	/* check ssid */
	var ssid = $("#text_ssid").val();
	var arrRet = checkSSID( ssid );
	if ( !arrRet[0] ) {
		myAlert(arrRet[1], "text_ssid");
		return false;
	}
	/* check ssid, end */

	if ( checkNumberRang( $("#text_max_client").val(), 1, 127) == false ){
		myAlert("最大客户端接入数量不正确，其值应为1-127之间整数！", "text_max_client");
		return false;
	}

	if ( $("#sel_rateLimitUpEnable").val() == "enable" ) {
		if ( checkNumberRang( $("#text_rateLimitUp").val(), 100, 300000) == false ) {
			myAlert("上行带宽不正确，其值应为100-300000之间整数！", "text_rateLimitUp");
			return false;
		}
	}
	if ( $("#sel_rateLimitDownEnable").val() == "enable" ) {
		if ( checkNumberRang( $("#text_rateLimitDown").val(), 100, 300000) == false ) {
			myAlert("下行带宽不正确，其值应为100-300000之间整数！", "text_rateLimitDown");
			return false;
		}
	}

	if ( $("#chk_portal_enable").attr("checked") == "checked" && $("#sel_portal_scheme").val() == "" ) {
		myAlert("请选择Portal方案", "sel_portal_scheme");
		return false;
	}

	if ( $("#chk_acl_enable").attr("checked") == "checked" && $("#sel_acl_scheme").val() == "" ) {
		myAlert("请选择ACL方案", "sel_acl_scheme");
		return false;
	}

	/* time_acl */
	if ( $("#chk_time_acl_enable").attr("checked") == "checked" 
			&& $("#sel_time_acl_scheme").val() == "" ) {
		myAlert("请选择时段方案", "sel_time_acl_scheme");
		return false;
	}
	/* time_acl, end */

	for ( var i = 0; i < jsSpec.spec.radios.length; i++ ) {
		if ( $("#chk_radio_" + i).attr("checked") == "checked") {
			if ( !checkNumberRang( $("#text_pvid_" + i ).val(), 1, 4094) ){
				myAlert("端口Vlan不正确，其值应为1-4094之间整数！", "text_pvid_" + i );
				return false;
			}
		}
	}

	if ( $("#sel_auth").val() == "WEP" ) {
		if ( !isInputValid_WepKey() ) {
			return false;
		}
	} else if ( $("#sel_auth").val() == "WPA-PSK" || $("#sel_auth").val() == "WPA-1X" ) {
		if ( $("#sel_auth").val() == "WPA-PSK"  ){
			if ( !isInputValid_wpa_psk() )
				return false;
		} else if ( $("#sel_auth").val() == "WPA-1X" ) {
			if ( !isInputValid_wpa_EAP() )
				return false;
		}
		
		if ( !isInputValid_gtk_and_ptk() ) {
			return false;
		}

	}
	
	//if ( !checkInputText() )
//		return false;
	if ( !isInputValid_11ac_cipher() ) {
		return false;
	}

	return true;
}

function isInputValid_11ac_cipher() {
	var b_11ac_cipher_check = 0;
	for ( var i = 0; i < jsSpec.spec.radios.length; i++ ) {
		if ( $("#chk_radio_" + i ).attr("checked") == "checked" ) {
			if ( jsRadio.pkg_wlan_radio[i].mode.indexOf("ac") != -1 ) {
				b_11ac_cipher_check = 1;
				break;
			}
		}
	}

	if ( b_11ac_cipher_check == 1 ) {
		var auth = $("#sel_auth").val();
		var cipher;
		if ( auth == "WEP" ) {
			myAlert("11AC模式下不支持WEP认证！");
			return false;
		} else if ( auth == "WPA-PSK" || auth == "WPA-1X" ) {
			cipher = $("input[name='radio_wpa_cipher']:checked").val();
			if ( cipher == "TKIP" || cipher == "TKIP_CCMP" ) {
				myAlert("11AC模式下不支持TKIP和Auto加密方式！");
				return false;
			}
		} 
	}

	return true;
}

function changeRateLimitEnable() {
	if ( $("#sel_rateLimitUpEnable").val() == "enable" ) {
		$(".part_rateLimitUpEnable").css("display", "table-row");
	} else {
		$(".part_rateLimitUpEnable").css("display", "none");
	}

	if ( $("#sel_rateLimitDownEnable").val() == "enable" ) {
		$(".part_rateLimitDownEnable").css("display", "table-row");
	} else {
		$(".part_rateLimitDownEnable").css("display", "none");
	}
}

$("document").ready( function(){
	$("#sel_rateLimitUpEnable").change( changeRateLimitEnable );
	$("#sel_rateLimitDownEnable").change( changeRateLimitEnable );
	$("#sel_auth").change( change );

	$("#chk_portal_enable").change( changePortalEnabled );
	$("#chk_acl_enable").change( changeAclEnabled );
	/* time_acl */
	$("#chk_time_acl_enable").change( changeTimeAclEnabled );
	/* time_acl, end */
});

function ok(){
	if ( isInputValid() == false ) 
		return;
	
	var url = "setform/form_wireless_ap_add_service?UID=" + parent.uid;
	var f = new myForm();

	f.add( "ssid", $("#text_ssid").val());

	for ( var i = 0; i < jsSpec.spec.radios.length; i++ ) {
		if ( $("#chk_radio_" + i ).attr("checked") == "checked" )
			f.add( "radio_" + i, "1");
		else
			f.add( "radio_" + i, "0");

		f.add( "pvid_bss_" + i , $("#text_pvid_" + i ).val() );
	}

	if ( $("#chk_enableService").attr("checked") == "checked")
		f.add( "enableService", "1");
	else
		f.add( "enableService", "0");
	if ( $("#chk_enableSSID").attr("checked") == "checked")
		f.add( "hideSSID", "0");
	else
		f.add( "hideSSID", "1");

	f.add( "max_client", $("#text_max_client").val() );

	/* set rate limit */
	if ( $("#sel_rateLimitUpEnable").val() == "enable" ) {
		f.add("rateLimitUpEnable", "enable");
		f.add("rateLimitUpMode", $("#sel_rateLimitModeUp").val() );
		f.add("rateLimitUp", $("#text_rateLimitUp").val() );
	} else {
		f.add("rateLimitUpEnable", "disable");
	}
	if ( $("#sel_rateLimitDownEnable").val() == "enable" ) {
		f.add("rateLimitDownEnable", "enable");
		f.add("rateLimitDownMode", $("#sel_rateLimitModeDown").val() );
		f.add("rateLimitDown", $("#text_rateLimitDown").val() );
	} else {
		f.add("rateLimitDownEnable", "disable");
	}
	/* set rate limit, end */

	/* set portal */
	if ($("#chk_portal_enable").attr("checked") == "checked") {
		f.add("portalEnable", "enabled");
		f.add("portalScheme", $("#sel_portal_scheme").val());
	} else {
		f.add("portalEnable", "disabled");
	}
	/* set portal, end */

	/* set ACL */
	if ($("#chk_acl_enable").attr("checked") == "checked") {
		f.add("aclEnable", "enabled");
		f.add("aclScheme", $("#sel_acl_scheme").val());
	} else {
		f.add("aclEnable", "disabled");
	}
	/* set ACL, end */

	/* time_acl */
	if ($("#chk_time_acl_enable").attr("checked") == "checked") {
		f.add("timeAclEnable", "enabled");
		f.add("timeAclScheme", $("#sel_time_acl_scheme").val());
	} else {
		f.add("timeAclEnable", "disabled");
	}
	/* time_acl, end */

	f.add("m2uEnable", $("#sel_m2u_enable").val() );

	var auth = getAuth();
	f.add("auth", auth );
	f.add("cipher", getCipher( auth ) );

	if ( $("#sel_auth").val() == "WEP" ) {
		f.add("wep_key", $("#text_wep_key").val() );
		f.add("wep_primary_key", "1");
	} else if ( $("#sel_auth").val() == "WPA-PSK" || $("#sel_auth").val() == "WPA-1X"  ) {
		if ( $("#chk_gtk_enable").attr("checked") == "checked" ) {
			f.add("gtk_enable", "1" );
			f.add("gtk_lifeTime", $("#text_gtk_lifttime").val() );
		} else {
			f.add("gtk_enable", "0" );
		}

		if ( $("#chk_ptk_enable").attr("checked") == "checked" ) {
			f.add("ptk_enable", "1" );
			f.add("ptk_lifeTime", $("#text_ptk_lifttime").val() );
		} else {
			f.add("ptk_enable", "0" );
		}

		if ( $("#sel_auth").val() == "WPA-PSK" ) {
			f.add( "psk_or_eap", "PSK" );
			if ( $("#text_wpa_psk").val().length < 64 )
				f.add("passphase_or_hex", "passphase" );
			else
				f.add("passphase_or_hex", "hex" );
			f.add("wpa_key", $("#text_wpa_psk").val() );
		} else if ( $("#sel_auth").val() == "WPA-1X" ) {
			f.add( "psk_or_eap", "EAP" );
			f.add("radius_scheme", $("#sel_radius_scheme").val() );
		}
	}

	f.submit( url, addApServiceSuccess );
}

function cancel(){
	;
}

function closureChkChange( index ) {
	return function () {
		var domChk = $("#chk_radio_" + index);
		var domPvid = $( "#text_pvid_" + index );
		if ( domChk.attr("checked") == "checked" )
			domPvid.removeAttr("disabled", "disabled");
		else
			domPvid.attr("disabled", "disabled");
	}
}

function init() {
	setNavigationBar("无线设置>无线接入服务>新增无线服务");
	$("#sel_auth").val("None");

	for ( var i = 0; i < jsRadius.pkg_radius_scheme.length; i++ ){
		var temp = jsRadius.pkg_radius_scheme[i];
		$("#sel_radius_scheme").append("<option value=\""+temp.sect_name+"\" >"+temp.sect_name+"</option>");
	}

	for ( var i = 0; i < jsPortal.pkg_portal.length; i++ ) {
		var temp = jsPortal.pkg_portal[i];
		$("#sel_portal_scheme").append("<option value=\""+temp.sect_name+"\" >"+temp.sect_name+"</option>");
	}

	for ( var i = 0; i < jsAcl.pkg_wlan_acl.length; i++ ) {
		var temp = jsAcl.pkg_wlan_acl[i];
		$("#sel_acl_scheme").append("<option value=\""+temp.sect_name+"\" >"+temp.sect_name+"</option>");
	}

	/* time_acl */
	for ( var i = 0; i < jsTimeAcl.pkg_time_range.length; i++ ) {
		var temp = jsTimeAcl.pkg_time_range[i];
		$("#sel_time_acl_scheme").append("<option value=\""+temp.sect_name+"\" >"+temp.sect_name+"</option>");
	}
	/* time_acl, end */

	var str = "";
	for ( var i = 0; i < jsSpec.spec.radios.length; i++ ) {
		var radio = jsSpec.spec.radios[i];
		if ( i != 0 )
			str += " &nbsp;&nbsp;";
		str += radio.name + "&nbsp;<input type=\"text\" id=\"text_pvid_" + i + "\" value=\"1\" size=\"6\" />";
	}
	str += "（1-4094,默认为1）";
	$("#tr_bss_pvid").html( str );

	str = "";
	for ( var i = 0; i < jsSpec.spec.radios.length; i++ ) {
		var radio = jsSpec.spec.radios[i];
		if ( i != 0 )
			str += " &nbsp;&nbsp;";
		str += "<input type=\"checkbox\" id=\"chk_radio_" + i + "\" checked />" + radio.name;
	}
	$("#tr_radio_bind").html( str );
	for ( var i = 0; i < jsSpec.spec.radios.length; i++ ) {
		var radio = jsSpec.spec.radios[i];
		$("#chk_radio_" + i ).change( closureChkChange(i) );
	}

	/* init rate limit */
	$("#sel_rateLimitUpEnable").val("disable");
	$("#sel_rateLimitDownEnable").val("disable");
	changeRateLimitEnable();
	/* init rate limit, end */

	change();
	enable_gtk();
	enable_ptk();

	//enableVLAN();
}

function changePortalEnabled() {
	if ( $("#chk_portal_enable").attr("checked") == "checked") {
		//$("#sel_portal_scheme").css("display", "table-row");
		$("#sel_portal_scheme").css("display", "inline");
	} else {
		$("#sel_portal_scheme").css("display", "none");
	}
}

function changeAclEnabled() {
	if ( $("#chk_acl_enable").attr("checked") == "checked") {
		//$("#sel_acl_scheme").css("display", "table-row");
		$("#sel_acl_scheme").css("display", "inline");
	} else {
		$("#sel_acl_scheme").css("display", "none");
	}
}

/* time_acl */
function changeTimeAclEnabled() {
	if ( $("#chk_time_acl_enable").attr("checked") == "checked") {
		//$("#sel_time_acl_scheme").css("display", "table-row");
		$("#sel_time_acl_scheme").css("display", "inline");
	} else {
		$("#sel_time_acl_scheme").css("display", "none");
	}
}
/* time_acl, end */
