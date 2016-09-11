function myhelp() {
	popHelp("wdsSettings");
}
var arrWdsList = new Array();
var tg = new myGrid('tg');

function onSearch() {
	var keyWords = $("#text_keywords").val();
	tg.pageview_search( $("#sel_search_item").val(), keyWords );
}

/* root ap uplist */
function loadWdsList() {
	var wds = jsWds.pkg_wlan_wds;
	var page = getQueryString("page");
	arrWdsList.length = 0;
	for ( var i = 0; i < wds.length; i++ ) {
		if ( wds[i].sect_name == "wds_rooter" ) {
			var uplist = wds[i].uplist;
			if ( typeof(uplist) == "undefined" )
				break;
			for ( var j = 0; j < uplist.length; j++ ) {
				/* format: aa:aa:aa:aa:aa:aa/bb:bb:bb:bb:bb:bb */
				var arr = uplist[j].uplist.split("/");
				
				arrWdsList[j]  = arr[0] + ";" + arr[1];
			}
			break;
		}
	}

	tg.pageview_init(arrWdsList, 10, 'list_wds', page);
}

function init() {
	setNavigationBar("无线设置>WDS配置");

	tg.pageview_add('Repeater MAC', 0, '48%', MG_SORT_ASCII);
	tg.pageview_add('Uplink MAC', 1, '47%', MG_SORT_ASCII);
	tg.pageview_set_OPwidth("5%");
	tg.pageview_add_btn("删除", delRepeaterUplink );

	/* generate acl select element */
	for ( var i = 0; i < jsAcl.pkg_wlan_acl.length; i++ ) {
		var temp = jsAcl.pkg_wlan_acl[i];
		$("#sel_acl_scheme").append("<option value=\""+temp.sect_name+"\" >"+temp.sect_name+"</option>");
	}

	load();
}

function addRepeaterUplink() {
	var url = "wds_add_repeaterUplink.asp?UID="+parent.uid;
	pageJump(url);
}

function delRepeaterUplink( arrRow, indexRow ) {
	var repeaterAp = arrRow[0];
	var upLinkAp = arrRow[1];

	var url="setform/form_wds_del_repeaterUplink?UID="+parent.uid;
	var f = new myForm();
	f.add("repeaterMac", repeaterAp );
	f.add("uplinkMac", upLinkAp);
	f.submit( url, commitSuccess );
}

var sect_wds_role, sect_wds_rooter, sect_wds_repeater;
var jsWdsAcl;
var first = 1;
function load() {
	var sect_name;
	var role;
	if ( 1 == first ) {
		for ( var i = 0; i < jsWds.pkg_wlan_wds.length; i++ ) {
			sect_name = jsWds.pkg_wlan_wds[i].sect_name;
			if ( sect_name == "wds_role" ) {
				sect_wds_role = jsWds.pkg_wlan_wds[i];
			} else if ( sect_name == "wds_rooter" ) {
				sect_wds_rooter = jsWds.pkg_wlan_wds[i];
			} else if ( sect_name == "wds_repeater" ) {
				sect_wds_repeater = jsWds.pkg_wlan_wds[i];
			}
		}

		if ( typeof(sect_wds_rooter) == "undefined" )
			sect_wds_rooter = new Array();
		if ( typeof(sect_wds_repeater) == "undefined" )
			sect_wds_repeater = new Array();
	}

	if ( 1 == first ) {
		if ( typeof(sect_wds_role) != "undefined" )
			role = sect_wds_role.wds_role;
		load_wds_role( role );
	} else
		role = $("input[name='radio_wds_role']:checked").val();

	if ( role == "rootap" || role == "root" ) {
		loadRooter( sect_wds_rooter );
		loadAcl( sect_wds_rooter );
		loadWdsList();
	} else if ( role == "static_repeater" || role == "static" ) {
		loadAcl( sect_wds_repeater );
		loadStatic( sect_wds_repeater );
	} else if ( role == "auto_repeater" || role == "auto" ) {
		if ( typeof(sect_wds_role.netid) != "undefined" )
			$("#text_netid_auto").val( sect_wds_role.netid );
		else
			$("#text_netid_auto").val( "" );
	}
}

function loadRooter( sect ) {
	if ( typeof ( sect.netid ) != "undefined" )
		$("#text_netid").val( sect.netid);
	else
		$("#text_netid").val( "CommSky_WDS" );

	if ( typeof ( sect.default_downlink ) != "undefined" )
		$("#sel_backhaul_root").val( sect.default_downlink );
	else
		$("#sel_backhaul_root").val( "5G" );

	if ( typeof ( sect.max_level ) != "undefined" )
		$("#sel_max_level").val( sect.max_level );
	else
		$("#sel_max_level").val( "2" );

	if ( typeof ( sect.discover_enable ) != "undefined" )
		$("#sel_discovery").val( sect.discover_enable );
	else
		$("#sel_discovery").val( "enable" );

	/*todo: link secure */
	loadLinkSecure( sect );
	
}

function loadLinkSecure( sect ) {
	if ( typeof ( sect.key_crypt) != "undefined"
			&& typeof( sect.key_value ) != "undefined"
	) {
		$("#sel_auth").val("WPA-PSK");
		display_psk_key( true );
	} else {
		$("#sel_auth").val("None");
		display_psk_key( false );
	}
	changeAuth();
}

function display_psk_key( isDisplay ) {
	if ( isDisplay ) {
		$("#text_wpa_psk_h").val("********");
		$("#text_wpa_psk_h").css('display','inline');
		$("#text_wpa_psk").css('display','none');
	} else {
		//todo: need empty wpa psk ?
		$("#text_wpa_psk_h").css('display','none');
		$("#text_wpa_psk").css('display','inline');
	}
}

function loadStatic( sect ) {
	if ( typeof ( sect.netid ) != "undefined" )
		$("#text_netid").val( sect.netid);
	else
		$("#text_netid").val( "CommSky_WDS" );

	if ( typeof ( sect.downlink ) != "undefined" )
		$("#sel_backhaul_static").val( sect.downlink );
	else
		$("#sel_backhaul_static").val( "none" );

	if ( typeof ( sect.apmac ) != "undefined" )
		$("#text_uplink_bind_mac").val( sect.apmac );
	else
		$("#text_uplink_bind_mac").val( "" );


	/*todo: link secure */
	loadLinkSecure( sect );
}

function changeAuth(){
	if ( $("#sel_auth").val() == "WPA-PSK" ) {
		$(".noRadius").css('display','table-row');
	}
	else {
		$(".noRadius").css('display','none');
	}
}

$("document").ready( function() {
	$("input[name='radio_wds_role']").change( wds_role_changed );
	$("#chk_acl_enable").change( changeAclEnabled );
	$("#sel_auth").change( changeAuth );
});

function loadAcl( sect ) {
	var aclScheme;
	if ( typeof(sect) != "undefined" )
		aclScheme = sect.acl;

	if ( typeof(aclScheme) != "undefined" ) {
		$("#sel_acl_scheme").val(sect.acl);
		$("#chk_acl_enable").attr("checked", true );
		$("#sel_acl_scheme").css("display", "inline");
	} else {
		$("#sel_acl_scheme").val("");
		$("#chk_acl_enable").attr("checked", false);
		$("#sel_acl_scheme").css("display", "none");
	}
}

function load_wds_role( role ) {
	if ( role == "rootap" )
		$("input[name='radio_wds_role'][value='root']").attr("checked", true);
	else if ( role == "auto_repeater" )
		$("input[name='radio_wds_role'][value='auto']").attr("checked", true);
	else if ( role == "static_repeater" )
		$("input[name='radio_wds_role'][value='static']").attr("checked", true);
	else
		$("input[name='radio_wds_role'][value='none']").attr("checked", true);

	wds_role_changed();
}

function wds_role_changed() {
	var role = $("input[name='radio_wds_role']:checked").val();
	if ( role == "root" ) {
		 $(".part_auto").css("display","none");
		 $(".part_static").css("display","none");
		 $(".part_root").css("display","table-row");
		 $(".part_root_block").css("display","block");
	} else if ( role == "auto" ) {
		 $(".part_root").css("display","none");
		 $(".part_static").css("display","none");
		 $(".part_auto").css("display","table-row");
		 $(".part_root_block").css("display","none");
	} else if ( role == "static" ) {
		 $(".part_root").css("display","none");
		 $(".part_auto").css("display","none");
		 $(".part_static").css("display","table-row");
		 $(".part_root_block").css("display","none");
	} else {
		 $(".part_root").css("display","none");
		 $(".part_auto").css("display","none");
		 $(".part_static").css("display","none");
		 $(".part_root_block").css("display","none");
	}

	if ( jsSpec.spec.radios.length == 1 )
		 $(".part_backhaul").css("display","none");


	if ( 1 != first ) {
		load();
	} else
		first = 0;
}

function commitSuccess( data ) {
	var jsonData = eval("("+data+")");
	jsWds.pkg_wlan_wds = jsonData.pkg_wlan_wds;
	jsAcl.pkg_wlan_acl = jsonData.pkg_wlan_acl;
	first = 1;
	load();
}

function isInputValid_wpa_psk() {
	var key = $("#text_wpa_psk").val();
	var key_h = $("#text_wpa_psk_h").val();
	if ( key == "" && key_h != "" )
		return true;
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

function checkNetid( netid, canEmpty, elemID ) {
	if ( netid == "" && !canEmpty ) {
		myAlert("Net ID不能为空！", elemID);
		return false;
	}

	//todo 特殊字符检查
	return true;
}

function isInputValid_root() {
	//todo: check netid
	if ( !checkNetid( $("#text_netid").val(), false, "text_netid") )
		return false;

	if ( $("#sel_auth").val() == "WPA-PSK" 
			&& isInputValid_wpa_psk() == false )
		return false;

	if ( $("#chk_acl_enable").attr("checked") == "checked" 
			&& $("#sel_acl_scheme").val() == "" ) {
		myAlert("请选择ACL方案", "sel_acl_scheme");
		return false;
	}

	return true;
}

function isInputValid_static() {
	var upLinkBindMac = $("#text_uplink_bind_mac").val();
	//todo: check netid
	if ( !checkNetid( $("#text_netid").val(), false, "text_netid") )
		return false;

	if ( $("#chk_acl_enable").attr("checked") == "checked" 
			&& $("#sel_acl_scheme").val() == "" ) {
		myAlert("请选择ACL方案", "sel_acl_scheme");
		return false;
	}

	//todo: check uplink mac bind
	if ( upLinkBindMac != "" ) {
		if (!isMacValid( upLinkBindMac ) )
			return false;
	}

	return true;
}

function isInputValid_auto() {
	//todo: check netid
	if ( !checkNetid( $("#text_netid_auto").val(), true, "text_netid_auto") )
		return flase;

	return true;
}

function root_ap_commit() {

	if ( !isInputValid_root() ) {
		return;
	}

	var url="setform/form_wds_root_set?UID="+parent.uid;
	var f = new myForm();
	f.add("netid", $("#text_netid").val());
	if ( jsSpec.spec.radios.length == 2 ) {
		f.add("backhaul", $("#sel_backhaul_root").val());
	} else if ( jsSpec.spec.radios.length == 1 
		&& jsSpeck.spec.radios[0].name == "2.4G" ) {
		f.add("backhaul", "2G");
	} else if ( jsSpec.spec.radios.length == 1 
		&& jsSpeck.spec.radios[0].name == "5G" ) {
		f.add("backhaul", "5G");
	}

	f.add("maxLevel", $("#sel_max_level").val());
	f.add("discovery", $("#sel_discovery").val());

	if ($("#chk_acl_enable").attr("checked") == "checked") {
		f.add("aclEnable", "enabled");
		f.add("aclScheme", $("#sel_acl_scheme").val());
	} else {
		f.add("aclEnable", "disabled");
	}

	if ( $("#sel_auth").val() == "WPA-PSK" ) {
		f.add( "auth", "wpa" );
		if ( $("#text_wpa_psk").val().length < 64 )
			f.add("passphase_or_hex", "passphase" );
		else
			f.add("passphase_or_hex", "hex" );
		f.add("wpa_key", $("#text_wpa_psk").val() );

	} else {
		f.add( "auth", "none" );
	}
	
	f.submit( url, commitSuccess );
}

function auto_repeater_commit() {
	var url="setform/form_wds_auto_set?UID="+parent.uid;
	var f = new myForm();
	f.add("netid", $("#text_netid_auto").val());
	f.submit( url, commitSuccess );
}
function static_repeater_commit() {
	if ( !isInputValid_static() ) {
		return;
	}

	var url="setform/form_wds_static_set?UID="+parent.uid;
	var f = new myForm();
	f.add("netid", $("#text_netid").val());
	f.add("backhaul", $("#sel_backhaul_static").val());

	if ($("#chk_acl_enable").attr("checked") == "checked") {
		f.add("aclEnable", "enabled");
		f.add("aclScheme", $("#sel_acl_scheme").val());
	} else {
		f.add("aclEnable", "disabled");
	}

	if ( $("#sel_auth").val() == "WPA-PSK" ) {
		f.add( "auth", "wpa" );
		if ( $("#text_wpa_psk").val().length < 64 )
			f.add("passphase_or_hex", "passphase" );
		else
			f.add("passphase_or_hex", "hex" );
		f.add("wpa_key", $("#text_wpa_psk").val() );

	} else {
		f.add( "auth", "none" );
	}

	f.add( "upBindMac", $("#text_uplink_bind_mac").val() );
	
	f.submit( url, commitSuccess );
}
function disable_wds_commit() {
	var url="setform/form_wds_disable_set?UID="+parent.uid;
	var f = new myForm();
	f.add("test", "test");
	f.submit( url, commitSuccess );
}

function ok() {
	var role = $("input[name='radio_wds_role']:checked").val();
	if ( role == "root" ) {
		root_ap_commit();
	} else if ( role == "auto" ) {
		auto_repeater_commit();
	} else if ( role == "static" ) {
		static_repeater_commit();
	} else
		disable_wds_commit();
}

function cancel() {
	first = 1;
	load();
}

function changeAclEnabled() {
	if ( $("#chk_acl_enable").attr("checked") == "checked") {
		$("#sel_acl_scheme").css("display", "inline");
	} else {
		$("#sel_acl_scheme").css("display", "none");
	}
}

function doclick(nindex){
	if (nindex==1) {
		$("#text_wep_key_h").css('display','none');
		$("#text_wep_key").css('display','inline');
		$("#text_wep_key").focus().select();
	} else if(nindex==2) {
		$("#text_wpa_psk_h").css('display','none');
		$("#text_wpa_psk").css('display','inline');
		$("#text_wpa_psk").focus().select();
	} 
}

function doblur(nindex){
	if (nindex==1) {
		if ($("#text_wep_key_h").val()!="" && !$("#text_wep_key").val()) {
			$("#text_wep_key_h").css('display','inline');
			$("#text_wep_key").css('display','none');
		}
	} else if(nindex==2) {
		if ($("#text_wpa_psk_h").val()!="" && !$("#text_wpa_psk").val()) {
			$("#text_wpa_psk_h").css('display','inline');
			$("#text_wpa_psk").css('display','none');
		}
	} 
}
