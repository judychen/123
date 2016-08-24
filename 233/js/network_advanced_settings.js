function myhelp() {
	popHelp("network_advanced_settings");
}
var tg = new myGrid('tg');
var arrInterfaceList = new Array();

function isInputValid() {
	return true;
}

function cancel() {
	var url = "network_advanced_settings.asp?UID="+parent.uid;
	pageJump(url);
}

function ok() {
	if ( !isInputValid() )
		return; 

	var f = new myForm();
	var url = "";
	url = "setform/form_set_ip_forwarding_enable?UID="+parent.uid;

	/* alg settings */
	if ( $("#chk_alg_ftp_enable").attr("checked") == "checked" )
		f.add( "alg_ftp_enable", "enabled");
	else
		f.add( "alg_ftp_enable", "disabled");

	if ( $("#chk_alg_tftp_enable").attr("checked") == "checked" )
		f.add( "alg_tftp_enable", "enabled");
	else
		f.add( "alg_tftp_enable", "disabled");

	if ( $("#chk_alg_h323_enable").attr("checked") == "checked" )
		f.add( "alg_h323_enable", "enabled");
	else
		f.add( "alg_h323_enable", "disabled");

	if ( $("#chk_alg_irc_enable").attr("checked") == "checked" )
		f.add( "alg_irc_enable", "enabled");
	else
		f.add( "alg_irc_enable", "disabled");

	if ( $("#chk_alg_netbios_enable").attr("checked") == "checked" )
		f.add( "alg_netbios_enable", "enabled");
	else
		f.add( "alg_netbios_enable", "disabled");

	if ( $("#chk_alg_pptp_enable").attr("checked") == "checked" )
		f.add( "alg_pptp_enable", "enabled");
	else
		f.add( "alg_pptp_enable", "disabled");
		
	if ( $("#chk_alg_sip_enable").attr("checked") == "checked" )
		f.add( "alg_sip_enable", "enabled");
	else
		f.add( "alg_sip_enable", "disabled");

	if ( $("#chk_alg_snmp_enable").attr("checked") == "checked" )
		f.add( "alg_snmp_enable", "enabled");
	else
		f.add( "alg_snmp_enable", "disabled");
	/* alg settings, end */

	if ( $("#chk_ip_forwarding_enable").attr("checked") == "checked" )
		f.add( "ip_forwarding_enable", "enabled");
	else
		f.add( "ip_forwarding_enable", "disabled");

	f.submit( url, set_ip_forwarding_success );
}

function set_ip_forwarding_success( data ) {
	var url = "network_advanced_settings.asp?UID="+parent.uid;
	pageJump(url);
}

function editInterface( arrRow, indexRow ) {
	var ifName = arrRow[0];
	pageJump( "interface_L2L3_switch.asp?UID="+parent.uid+"&page="+tg.getCurrentPage() + "&if_name=" + ifName );
}

function load( firstRun ) {

	/* load ip forwarding */
	var t;
	var ip_forwarding = "disabled";
	for ( var i = 0; i < jsSystem.pkg_system.length; i++ ) {
		t = jsSystem.pkg_system[i];
		if ( t.sect_name == "route" ) {
			if ( typeof(t.forward) != "undefined" )
				ip_forwarding = t.forward;
			break;
		}
	}

	if ( ip_forwarding == "enabled" )
		$("#chk_ip_forwarding_enable").attr( "checked", true );
	else
		$("#chk_ip_forwarding_enable").attr( "checked", false );
	/* load ip forwarding, end */

	/* load alg */
	for ( var i = 0; i < jsAlg.pkg_alg.length; i++ ) {
		t = jsAlg.pkg_alg[i];
		if ( t.sect_name == "alg" ) {
			if ( t.ftp == "enabled" )
				$("#chk_alg_ftp_enable").attr( "checked", true );
			else
				$("#chk_alg_ftp_enable").attr( "checked", false );
			if ( t.tftp == "enabled" )
				$("#chk_alg_tftp_enable").attr( "checked", true );
			else
				$("#chk_alg_tftp_enable").attr( "checked", false );
			if ( t.pptp == "enabled" )
				$("#chk_alg_pptp_enable").attr( "checked", true );
			else
				$("#chk_alg_pptp_enable").attr( "checked", false );
			if ( t.h323 == "enabled" )
				$("#chk_alg_h323_enable").attr( "checked", true );
			else
				$("#chk_alg_h323_enable").attr( "checked", false );
			if ( t.sip == "enabled" )
				$("#chk_alg_sip_enable").attr( "checked", true );
			else
				$("#chk_alg_sip_enable").attr( "checked", false );
			if ( t.irc == "enabled" )
				$("#chk_alg_irc_enable").attr( "checked", true );
			else
				$("#chk_alg_irc_enable").attr( "checked", false );
			if ( t.netbios == "enabled" )
				$("#chk_alg_netbios_enable").attr( "checked", true );
			else
				$("#chk_alg_netbios_enable").attr( "checked", false );
			if ( t.snmp == "enabled" )
				$("#chk_alg_snmp_enable").attr( "checked", true );
			else
				$("#chk_alg_snmp_enable").attr( "checked", false );
		}
	}
	/* load alg, end */

	arrInterfaceList.length = 0;
	var count = 0;
	var jsIf;
	var if_name;

	for ( var i = 0; i < jsInterface.pkg_interface.length; i++ ) {
		jsIf = jsInterface.pkg_interface[i];
		if_name = jsIf.sect_name;
		if ( if_name.indexOf("Gigabit") != -1 ||
				( typeof(jsSpec.product) != "undefined" 
					&& jsSpec.product == "ap2401" 
					&& if_name.indexOf("Ethernet0/0") != -1 ) ) {

			arrInterfaceList[count] = if_name + ";";

			if ( typeof(jsIf.linkmode) != "undefined" && jsIf.linkmode == "route" ) {
				arrInterfaceList[count] += "Route";
			} else {
				arrInterfaceList[count] += "Bridge";
			}
			count++;
		}
	}

	var page = getQueryString("page");
	if ( typeof(firstRun) != "undefined" &&  page != null )
		tg.pageview_init(arrInterfaceList, 10, 'tbl_interfaces', page);
	else
		tg.pageview_init(arrInterfaceList, 10, 'tbl_interfaces');
}

function init() {
	setNavigationBar("网络设置>高级设置");

	/*接口列表*/
	tg.pageview_add('名称', 0, '47%', MG_SORT_SELF, null, null, interface_sort_asc, interface_sort_dsc);
	tg.pageview_add('模式', 1, '46%', MG_SORT_ASCII);
	tg.pageview_set_OPwidth("7%");

	tg.pageview_add_btn("编辑", editInterface);

	/* AP2000 don't support switch linkmode */
	var nat = jsSpec.spec.nat;
	if ( typeof(nat) == "undefined" ) {
		$(".part_switch_link_mode").css("display", "none");	
	}

	load( true );
}

function onSearch() {
	var keyWords = $("#text_keywords").val();
	tg.pageview_search( $("#search_item").val(), keyWords );
}
