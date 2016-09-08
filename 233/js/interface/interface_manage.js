var g_vlan1_dialer;
var g_vlan1_ip;
var g_vlan1_netmask;
var g_vlan1_nat;

var g_flag_warn_dialer_changed = 0;
var g_flag_warn_gateway_ip = 0;
var g_flag_warn_nat = 0;
//var g_flag_warn_interface_disabled = 0;
var g_flag_warn_ip_changed = 0;


function myhelp() {
	popHelp("interfaceManage");
}

function isInputValid_ip_netmask() {
	if ( !checkIP( $("#text_static_ip").val() ) ) {
		myAlert("IP地址格式不正确!", "text_static_ip");
		return false;
	}

	if ( $("#text_static_netmask").val() == "" ) {
		myAlert("子网掩码不能为空!", "text_static_netmask");
		return false;
	}

	if ( !checkMask( $("#text_static_netmask").val() ) ) {
		myAlert("子网掩码格式不正确!", "text_static_netmask");
		return false;
	} else {
		if ( is_ip_loopback_address( $("#text_static_ip").val() ) ) {
			myAlert("IP地址不能为回环地址!", "text_static_ip");
			return false;
		}
		if ( is_ip_multicast_address( $("#text_static_ip").val()) ) {
			myAlert("IP地址不能为组播地址!", "text_static_ip");
			return false;
		}
		if ( !is_ip_unicast_address( $("#text_static_ip").val(), $("#text_static_netmask").val() ) ) {
			myAlert("网络主机号不能全为0或全为1!", "text_static_ip");
			return false;
		}

		if ( is_ip_reserved( $("#text_static_ip").val() ) ) {
			myAlert("IP地址非法!", "text_static_ip");
			return false;
		}

		var tmpIP = $("#text_static_ip").val();
		var arrIP = tmpIP.split(".");
		var arrMask = new Array(0, 128, 192, 224, 240, 248, 252, 254);
		var tmpMask = $("#text_static_netmask").val();
		for (var i = parseInt(tmpMask / 8) ; i < 4; i++) {
			arrIndex = tmpMask - i * 8;
			if( arrIndex < 0 )
				arrIndex = 0;
			if ( (arrIP[i] & arrMask[arrIndex]) != arrIP[i] ){
				myAlert("掩码格式不正确！", "text_static_netmask");
				return false;
			}
		}
	}
	return true;
}

function isInputValid_gateway() {
	if ( $("#text_static_gateway").val() != "" ) {
		if ( !checkIP( $("#text_static_gateway").val() ) ) {
			myAlert("网关地址格式不正确!", "text_static_gateway");
			return false;
		}

		if ( is_ip_loopback_address( $("#text_static_gateway").val() ) ) {
			myAlert("网关地址不能为回环地址!", "text_static_gateway");
			return false;
		}

		if ( is_ip_multicast_address( $("#text_static_gateway").val() ) ) {
			myAlert("网关地址不能为组播地址!", "text_static_gateway");
			return false;
		}

		if ( is_ip_reserved( $("#text_static_gateway").val() ) ) {
			myAlert("网关地址非法!", "text_static_gateway");
			return false;
		}

	}

	return true;
}

function isInputValid_dns() {
	var first_dns = $("#text_first_dns_server").val();
	var second_dns = $("#text_second_dns_server").val();

	if ( first_dns != "" ) {
		if ( !checkIP( first_dns ) ) {
			myAlert("DNS服务器IP格式不正确!", "text_first_dns_server");
			return false;
		}

		if ( is_ip_loopback_address( first_dns ) ) {
			myAlert("DNS服务器IP不能为回环地址!", "text_first_dns_server");
			return false;
		}

		if ( is_ip_multicast_address( first_dns ) ) {
			myAlert("DNS服务器IP不能为组播地址!", "text_first_dns_server");
			return false;
		}

		if ( is_ip_reserved( first_dns ) ) {
			myAlert("DNS服务器IP地址非法!", "text_first_dns_server");
			return false;
		}
	}

	if ( second_dns != "" ) {
		if ( !checkIP( second_dns ) ) {
			myAlert("备份DNS服务器IP格式不正确!", "text_second_dns_server");
			return false;
		}

		if ( is_ip_loopback_address( second_dns ) ) {
			myAlert("备份DNS服务器IP不能为回环地址!", "text_second_dns_server");
			return false;
		}

		if ( is_ip_multicast_address( second_dns ) ) {
			myAlert("备份DNS服务器IP不能为组播地址!", "text_second_dns_server");
			return false;
		}

		if ( is_ip_reserved( second_dns ) ) {
			myAlert("备份DNS服务器IP地址非法!", "text_second_dns_server");
			return false;
		}
	}

	if ( first_dns != "" && first_dns == second_dns ) {
		myAlert("两个DNS服务器IP不能相同！", "text_second_dns_server");
		return false;
	}

	return true;
}

function isInputValid() {
	if ( $("#sel_ifStatus").val() == "disabled" ) {
		return true;
	}

	if ( $("#sel_ip_mode").val() == "dhcp" ) {
		// check dns
		if ( $("#sel_dnsMode").val() == "manual" ) {
			if ( !isInputValid_dns() ) {
				return false;
			}
		}

		if ( $("#text_dynamic_ip").val() != "" ) {
			if(!checkIP( $("#text_dynamic_ip").val())){
				myAlert("默认IP地址格式不正确!", "text_dynamic_ip");
				return false;
			}

			if ( is_ip_loopback_address( $("#text_dynamic_ip").val() ) ) {
				myAlert("默认IP地址不能为回环地址!", "text_dynamic_ip");
				return false;
			}
			if ( is_ip_multicast_address( $("#text_dynamic_ip").val()) ) {
				myAlert("默认IP地址不能为组播地址!", "text_dynamic_ip");
				return false;
			}

			if ( is_ip_reserved( $("#text_dynamic_ip").val() ) ) {
				myAlert("默认IP地址非法!", "text_dynamic_ip");
				return false;
			}

			if ( !is_ip_unicast_address( $("#text_dynamic_ip").val(), $("#text_dynamic_netmask").val() ) ) {
				myAlert("网络主机号不能全为0或全为1!", "text_dynamic_ip");
				return false;
			}

			if ($("#text_dynamic_netmask").val() == ""){
				myAlert("请输入默认子网掩码!", "text_dynamic_netmask");
				return false;
			}

			if(!checkIP( $("#text_dynamic_netmask").val())){
				myAlert("默认子网掩码格式不正确!", "text_dynamic_netmask");
				return false;
			}

			var tmpIP = $("#text_dynamic_ip").val();
			var arrIP = tmpIP.split(".");
			var arrMask = new Array(0, 128, 192, 224, 240, 248, 252, 254);
			var tmpMask = $("#text_dynamic_netmask").val();
			for (var i = parseInt(tmpMask / 8) ; i < 4; i++) {
				arrIndex = tmpMask - i * 8;
				if( arrIndex < 0 )
					arrIndex = 0;
				if ( (arrIP[i] & arrMask[arrIndex]) != arrIP[i] ){
					myAlert("掩码格式不正确！", "text_dynamic_netmask");
					return false;
				}
			}
		}

		if ($("#text_dynamic_netmask").val() != "" && $("#text_dynamic_ip").val() == "") {
			myAlert("请输入默认IP地址!", "text_dynamic_ip");
			return false;
		}


	} else if ( $("#sel_ip_mode").val() == "static" ) {
		if ( !isInputValid_ip_netmask() ) {
			return false;
		}

		if ( !isInputValid_gateway() ) {
			return false;
		}

		if ( !isInputValid_dns() ) {
			return false;
		}

	} else {
		if($("#text_pppoe_account").val() == "")
		{
			myAlert("用户名不能为空!", "text_pppoe_account");
			return false;
		}
		if($("#text_pppoe_password").val() == "")
		{
			myAlert("用户密码不能为空!", "text_pppoe_password");
			return false;
		}
		if ( isHasChinese( $("#text_pppoe_account").val() ) ) {
			myAlert("字符串不能包含中文！", "text_pppoe_account");
		return false;
		}
		if ( isHasChinese( $("#text_pppoe_password").val() ) ) {
			myAlert("字符串不能包含中文！", "text_pppoe_password");
			return false;
		}
		if ( isHasChinese( $("#text_pppoe_acname").val() ) ) {
			myAlert("字符串不能包含中文！", "text_pppoe_acname");
			return false;
		}
		if ( isHasChinese( $("#text_pppoe_servicesname").val() ) ) {
			myAlert("字符串不能包含中文！", "text_pppoe_servicesname");
			return false;
		}
		if (!checkNumberRang($("#text_pppoe_mtu").val(), 128, 1492)){
			myAlert("非法的MTU值！", "text_pppoe_mtu");
			return false;
		}
		if(checkPPPoEUserOrPwd($("#text_pppoe_password").val())==false)
		{
			myAlert("非法的初始密码！", "text_pppoe_password");
			return false;
		}
		if(checkPPPoEUserOrPwd($("#text_pppoe_account").val())==false)
		{
			myAlert("非法的用户名！", "text_pppoe_account");
			return false;
		}
		
		if(checkPPPoEUserOrPwd($("#text_pppoe_servicesname").val())==false)
		{
			if(!$("#text_pppoe_servicesname").val() == "")
			{
				myAlert("非法的服务名！", "text_pppoe_servicesname");
				return false;
			}
		}
		if(checkPPPoEUserOrPwd($("#text_pppoe_acname").val())==false)
		{
			if(!$("#text_pppoe_acname").val() == "")
			{
				myAlert("非法的服务器名！", "text_pppoe_acname");
				return false;
			}
		}
		//TODO PPPoE
	}

	if ( !checkInputText() )
		return false;

	return true;
}

function edit_interface_success( data ) {
	var jsData = eval("("+data+")");
	jsVlan_interface.pkg_vlan_interface = jsData.pkg_vlan_interface;
	jsInterface.pkg_interface = jsData.pkg_interface;
	jsDialer.pkg_dialer = jsData.pkg_dialer;
	jsDns.pkg_dns = jsData.pkg_dns;
	jsRoute.pkg_route = jsData.pkg_route;
	jsDhcpd.pkg_dhcpd = jsData.pkg_dhcpd;
	jsNat.pkg_nat = jsData.pkg_nat;
	load();
}

function changeIfStatus() {
	if ( $("#sel_ifStatus").val() == "enabled" ) {
		$(".part_if_enable").css("display", "table-row");
		changeIpMode();
	} else {
		$(".part_if_enable").css("display", "none");
	}
}

function cancel(){
	load();
}

function _form_vlan_interface_edit_static() {
	var f = new myForm();
	var url = "";
	url = "setform/form_vlan_interface_edit?UID="+parent.uid;

	f.add( "vid", "1" );
	f.add( "enable", $("#sel_ifStatus").val() );

	f.add("ip_mode", "static");
	f.add("ip", $("#text_static_ip").val());
	f.add("netmask", $("#text_static_netmask").val());
	f.add("gateway", $("#text_static_gateway").val());
	f.add("dhcpd_enable", $("#sel_static_dhcpd_enable").val() );

	if ( $("#sel_dnsMode").val() == "auto" ) {
		f.add("dns_mode", "auto");
	} else if ( $("#sel_dnsMode").val() == "manual" ) {
		f.add("dns_mode", "manual");
		f.add("first_dns_server", $("#text_first_dns_server").val() );
		f.add("second_dns_server", $("#text_second_dns_server").val() );
	}

	f.add("nat_enable", $("#sel_nat_enable").val() );
	f.submit( url, edit_interface_success );
}

function form_vlan_interface_edit_static() {
	var gateway = $("#text_static_gateway").val();
	if ( gateway != "" && !is_ip_and_gateway_same_subnet( $("#text_static_ip").val()
			, $("#text_static_netmask").val(), gateway ) 
	) {
		g_flag_warn_gateway_ip = 1;
	}

	if ( ( get_interface_nat_enable( "Vlan-interface1" ) != "enabled" 
			|| get_interface_dhcpd_enable( "Vlan-interface1" ) != "enabled" )
			&& $("#sel_nat_enable").val() == "enabled"
			&& $("#sel_static_dhcpd_enable").val() == "enabled" 
	) {
		g_flag_warn_nat = 1;
	}

	if ( g_vlan1_ip != $("#text_static_ip").val() ) {
		g_flag_warn_ip_changed = 1;
	}

	var msg = "该接口";
	var first = 1;
	if ( g_flag_warn_nat == 1 ) {
		if ( first == 0 )
			msg += ";<br/>";
		else
			first = 0;
		msg += "启用NAT，接口下的客户端将无法动态获取地址";
	}

	if ( g_flag_warn_dialer_changed == 1 || g_flag_warn_ip_changed == 1 ) {
		if ( first == 0 )
			msg += ";<br/>";
		else
			first = 0;
		msg += "IP地址变更可能导致web不可登录";
	}

	if ( g_flag_warn_gateway_ip && g_flag_warn_nat == 0 ) {
		if ( first == 0 )
			msg += ";<br/>";
		else
			first = 0;
		msg += "网关不在由IP地址和子网掩码定义的同一网络段（子网）上";
	}

	msg += "，是否继续配置？"

	if ( g_flag_warn_nat == 0 
			&& g_flag_warn_dialer_changed == 0
			&& g_flag_warn_ip_changed == 0 
			&& g_flag_warn_gateway_ip == 0 
	)
		_form_vlan_interface_edit_static();
	else
		myConfirm(msg, false, _form_vlan_interface_edit_static);
}

function form_vlan_interface_edit_dhcp() {
	var f = new myForm();
	var url = "";
	url = "setform/form_vlan_interface_edit?UID="+parent.uid;

	f.add( "vid", "1" );
	f.add( "enable", $("#sel_ifStatus").val() );

	f.add("dhcp_default_ip", $("#text_dynamic_ip").val() );
	f.add("dhcp_default_netmask", $("#text_dynamic_netmask").val() );
	f.add("ip_mode", "dhcp");

	if ( $("#sel_dnsMode").val() == "auto" ) {
		f.add("dns_mode", "auto");
	} else if ( $("#sel_dnsMode").val() == "manual" ) {
		f.add("dns_mode", "manual");
		f.add("first_dns_server", $("#text_first_dns_server").val() );
		f.add("second_dns_server", $("#text_second_dns_server").val() );
	}

	f.add("nat_enable", $("#sel_nat_enable").val() );
	f.submit( url, edit_interface_success );
}

function form_vlan_interface_edit_pppoe() {
	var f = new myForm();
	var url = "";
	url = "setform/form_vlan_interface_edit?UID="+parent.uid;

	f.add( "vid", "1" );
	f.add( "enable", $("#sel_ifStatus").val() );

	f.add("ip_mode", "pppoe");
	f.add("pppoe_account", $("#text_pppoe_account").val());
	f.add("pppoe_password", $("#text_pppoe_password").val());
	f.add("pppoe_servicesname", $("#text_pppoe_servicesname").val());
	f.add("pppoe_mtu", $("#text_pppoe_mtu").val());
	f.add("pppoe_acname", $("#text_pppoe_acname").val());

	if ( $("#sel_dnsMode").val() == "auto" ) {
		f.add("dns_mode", "auto");
	} else if ( $("#sel_dnsMode").val() == "manual" ) {
		f.add("dns_mode", "manual");
		f.add("first_dns_server", $("#text_first_dns_server").val() );
		f.add("second_dns_server", $("#text_second_dns_server").val() );
	}

	f.add("nat_enable", $("#sel_nat_enable").val() );
	f.submit( url, edit_interface_success );
}

function form_vlan_interface_edit_disable() {
	var f = new myForm();
	var url = "";
	url = "setform/form_vlan_interface_edit?UID="+parent.uid;
	var vid = 1;
	f.add( "vid", vid );
	f.add( "enable", $("#sel_ifStatus").val() );
	f.submit( url, edit_interface_success );

	return;
}

function ok() {
	if ( !isInputValid() )
		return;

	g_flag_warn_dialer_changed = 0;
	g_flag_warn_gateway_ip = 0;
	g_flag_warn_nat = 0;
	g_flag_warn_ip_changed = 0;

	/* fixed bug for 1649 */
	if ( $("#sel_ifStatus").val() == "disabled" ) {
		myConfirm("Vlan-interface1禁用可能导致web不可登录，确定要禁用吗？", false, form_vlan_interface_edit_disable);
		return;
	}

	if ( g_vlan1_dialer != $("#sel_ip_mode").val() )
		g_flag_warn_dialer_changed = 1;

	if ( $("#sel_ip_mode").val() == "dhcp" ) {
		if ( g_flag_warn_dialer_changed == 1 )
			myConfirm("该接口IP地址变更可能导致web不可登录，确定要修改吗？", false, form_vlan_interface_edit_dhcp);
		else
			form_vlan_interface_edit_dhcp();
	} else if ( $("#sel_ip_mode").val() == "static" ) {
			form_vlan_interface_edit_static();
	} else if($("#sel_ip_mode").val() == "pppoe") {
		if ( g_flag_warn_dialer_changed == 1 )
			myConfirm("该接口IP地址变更可能导致web不可登录，确定要修改吗？", false, form_vlan_interface_edit_pppoe);
		else
			form_vlan_interface_edit_pppoe();
	} else {
		myAlert("todo");
		return;
	}
}

function changeIpMode( isClicked ){
	if ($("#sel_ip_mode").val() == "dhcp") {
		$(".IP_static").css('display','none');
		$(".IP_PPPoE").css('display','none');
		$(".IP_dynamic").css('display','table-row');
		$(".tr_dns").css("display", "table-row");

		if ( typeof(isClicked)!= "undefined" && isClicked )
			$("#sel_dnsMode").val("auto");
		$("#sel_dnsMode").attr("disabled", false);
	}
	else if ($("#sel_ip_mode").val() == "pppoe") {
		$(".IP_static").css('display','none');
		$(".IP_PPPoE").css('display','table-row');
		$(".IP_dynamic").css('display','none');
		$(".tr_dns").css("display", "table-row");

		if ( typeof(isClicked)!= "undefined" && isClicked )
			$("#sel_dnsMode").val("auto");
		$("#sel_dnsMode").attr("disabled", false);
	}
	else {
		$(".IP_static").css('display','table-row');
		$(".IP_PPPoE").css('display','none');
		$(".IP_dynamic").css('display','none');
		$(".tr_dns").css("display", "none");
		$("#sel_dnsMode").val("manual");
		$("#sel_dnsMode").attr("disabled", true);
	}
	changeDNSMode();

}

function changeDNSMode(){
	if ($("#sel_dnsMode").val() == "manual") {
		$(".DNS_MANUAL").css('display','table-row');
	}
	else {
		$(".DNS_MANUAL").css('display','none');
	}
}

function delVLanInterfaceSuccess( data ) {
	//alert( "del vlan if success !");
	var jsData = eval("("+data+")");
	jsVlan_interface.pkg_vlan_interface = jsData.pkg_vlan_interface;
	jsVlan_interface.pkg_interface = jsData.pkg_interface;
	jsVlan_interface.pkg_dialer = jsData.pkg_dialer;
	jsVlan_interface.pkg_dns = jsData.pkg_dns;
	jsVlan_interface.pkg_route= jsData.pkg_route;
	load();
}

function delVlanInterface( arrRow, indexRow ){
	//var arrDatas = arrVlanIfList[index].split(";");
	var arrDatas = arrRow;
	var vlanIf = arrDatas[0];

	var f = new myForm();
	var url = "";
	$("#myForm").html("");
	url = "setform/form_vlan_interface_del?UID="+parent.uid;

	var vid = vlanIf.slice(14);
	f.add( "vid", vid );

	f.submit( url, delVLanInterfaceSuccess );
}

function formatFunc(arrayRow, index){
	if (typeof(arrayRow[index]) == "undefined") {
		return "--";
	}
	else
		return arrayRow[index];
}
function addInterface(){
	pageJump("interface_add.asp?UID=" + parent.uid);
}

function formatDesc(arrRow, index){
	//alert( arrRow[index] );
	if ( arrRow[index] == "undefined" ) {
		return "";
	} else
		return arrRow[index];
}

function formatStatus(arrRow, index){
	if ( arrRow[index] == "enabled" ) {
		return "启用";
	}
	else {
		return "禁用";
	}
}

function formatIP(arrRow, index){
	if ( arrRow[index] == "dhcp" ) {
		return "DHCP分配";
	} else {
		return arrRow[index];
	}
}

//interface: vlan interface name(L3)
/*
function getDns( interface_name ) {
	var arrDns = new Array();
	for (var i = 0; i < jsDns.pkg_dns.length; i++){
		var t_dns= jsDns.pkg_dns[i];
		if ( t_dns.sect_name == interface_name ) {
			for
			arrDns[i] = t_dns
		}
	}
}*/

function get_dialer_type( if_name ) {
	var ip_type = "";
	for (var j = 0; j < jsDialer.pkg_dialer.length; j++){
		var t_dialer = jsDialer.pkg_dialer[j];
		if ( t_dialer.sect_name == if_name ) {
			if ( t_dialer.type == "static" ) {
				ip_type = t_dialer.static_ipv4_address + "/" + t_dialer.static_ipv4_netmask;
			} else if ( t_dialer.type == "dhcp" ) {
				ip_type = "dhcp";
			}else if (t_dialer.type == "pppoe" ) {
				ip_type = "PPPoE";
			}
		}
	}
	return ip_type;
}

function get_interface_enable( if_name ) {
	for (var j = 0; j < jsInterface.pkg_interface.length; j++){
		var t_if = jsInterface.pkg_interface[j];
		if ( t_if.sect_name == if_name ) {
			//arrVlanIfList[count] += ";"+t_if.enabled;
			return t_if.enabled;
		}
	}
}

function get_interface_nat_enable( if_name ) {
	for (var j = 0; j < jsNat.pkg_nat.length; j++){
		var t = jsNat.pkg_nat[j];
		if ( t.sect_name == if_name ) {
			return t.enabled;
		}
	}
	return "disabled";
}

function get_interface_dhcpd_enable( if_name ) {
	var jsDhcpdInterfaces = null;
	for ( var i = 0; i < jsDhcpd.pkg_dhcpd.length; i++ ) {
		if ( jsDhcpd.pkg_dhcpd[i].sect_name == "interfaces" ) {
			jsDhcpdInterfaces = jsDhcpd.pkg_dhcpd[i];
			break;
		}
	}

	if ( jsDhcpdInterfaces && typeof(jsDhcpdInterfaces.interfaces) != "undefined") {
		for (var i = 0; i < jsDhcpdInterfaces.interfaces.length; i++ ) {
			var n = jsDhcpdInterfaces.interfaces[i].interfaces.slice(14);
			/* check if vlan-interface 1 is enable dhcpd */
			if ( n == 1 ) {
				return "enabled";
			}
		}
	}
	return "disabled";
}

function load( firstRun ) {
	var count = 0;
	var jsIf;
	var if_name;
	arrVlanIfList.length = 0;

	for ( var i = 0; i < jsInterface.pkg_interface.length; i++ ) {
		jsIf = jsInterface.pkg_interface[i];
		if_name = jsIf.sect_name;
		if ( if_name.indexOf("Ethernet") != -1 ) {
			if ( typeof(jsIf.linkmode) != "undefined" && jsIf.linkmode == "route" ) {
				arrVlanIfList[count] = if_name;
				arrVlanIfList[count] += ";" + get_dialer_type( if_name );
				arrVlanIfList[count] += ";" + jsIf.enabled;
				if ( typeof(jsIf.description) != "undefined" )
					arrVlanIfList[count] += ";" + jsIf.description;
				else
					arrVlanIfList[count] += ";" + "";
				count++;
			}
		}
	}

	for (var i = 0; i < jsVlan_interface.pkg_vlan_interface.length; i++){
		var temp = jsVlan_interface.pkg_vlan_interface[i];

		if (temp.sect_name == "Vlan-interface1") {
			for (var j = 0; j < jsInterface.pkg_interface.length; j++) {
				var t_if = jsInterface.pkg_interface[j];
				if ( t_if.sect_name == temp.sect_name ) {
					$("#sel_ifStatus").val( t_if.enabled);
					break;
				}
			}

			for (var j = 0; j < jsDialer.pkg_dialer.length; j++){
				var t_dialer = jsDialer.pkg_dialer[j];
				if ( t_dialer.sect_name == temp.sect_name ) {
					$("#sel_ip_mode").val( t_dialer.type );
					g_vlan1_dialer = t_dialer.type;
					changeIpMode();
					//if ( t_dialer.type == "static" ) {
						g_vlan1_ip = t_dialer.static_ipv4_address;
						g_vlan1_netmask = t_dialer.static_ipv4_netmask;
						$("#text_static_ip").val( t_dialer.static_ipv4_address );
						$("#text_static_netmask").val( t_dialer.static_ipv4_netmask );
						//arrVlanIfList[count] += ";"+t_dialer.static_ipv4_address;
						//arrVlanIfList[count] += ";"+t_dialer.static_ipv4_netmask;
					//} else {
						$("#text_dynamic_ip").val( t_dialer.dhcp_default_ip );
						$("#text_dynamic_netmask").val( t_dialer.dhcp_default_netmask );
						$("#text_pppoe_account").val(t_dialer.pppoe_user_name);
						$("#text_pppoe_password").val(t_dialer.pppoe_user_pass);
						$("#text_pppoe_servicesname").val(t_dialer.pppoe_servicesname);
						$("#text_pppoe_mtu").val(t_dialer.pppoe_mtu);
						$("#text_pppoe_acname").val(t_dialer.pppoe_acname);
						if (!checkNumberRang($("#text_pppoe_mtu").val(), 128, 1492)){
							$("#text_pppoe_mtu").val("1492");
						}
					//}
					break;
				}
			}
			$("#text_static_gateway").val("");
			for (var j = 0; j < jsRoute.pkg_route.length; j++) {
				var t_route = jsRoute.pkg_route[j];
				if ( t_route.interface == temp.sect_name && t_route.ip == "0.0.0.0"
								&& t_route.netmask == "0" ) {
					$("#text_static_gateway").val( t_route.nexthop );
					break;
				}
			}

			$("#sel_dnsMode").val("auto");
			$("#text_first_dns_server").val("");
			$("#text_second_dns_server").val("");
			for (var j = 0; j < jsDns.pkg_dns.length; j++){
				var t_dns = jsDns.pkg_dns[j];
				if ( t_dns.sect_name == temp.sect_name ) {
					if ( t_dns.dns.length == 0 ) {
						//dns mode: auto
						$("#sel_dnsMode").val("auto");
					} else {
						//dns mode: manual
						$("#sel_dnsMode").val("manual");
					}

					if ( t_dns.dns.length == 1 ) {
						$("#text_first_dns_server").val( t_dns.dns[0].dns );
					} else if ( t_dns.dns.length == 2 ) {
						$("#text_first_dns_server").val( t_dns.dns[0].dns );
						$("#text_second_dns_server").val( t_dns.dns[1].dns );
					} else if ( t_dns.dns.length == 3 ) {
						$("#text_first_dns_server").val( t_dns.dns[0].dns );
						$("#text_second_dns_server").val( t_dns.dns[1].dns );
					}
				}
			}

			/* nat settings */
			g_vlan1_nat = get_interface_nat_enable( temp.sect_name );
			if ( get_interface_nat_enable( temp.sect_name ) == "enabled" )
				$("#sel_nat_enable").val("enabled");
			else
				$("#sel_nat_enable").val("disabled");
			/* nat settings, end */

			changeIfStatus();
			continue;
		}

		arrVlanIfList[count] = temp.sect_name;
		arrVlanIfList[count] += ";" + get_dialer_type( temp.sect_name );
		arrVlanIfList[count] += ";" + get_interface_enable( temp.sect_name );
		arrVlanIfList[count] += ";" + temp.description;
		//alert( arrVlanIfList[count]);
		count++;
	}

	/* dhcpd settings */
	$("#sel_static_dhcpd_enable").val( get_interface_dhcpd_enable( "Vlan-interface1" ) );
	/* dhcpd settings, end */

	var page = getQueryString("page");
	if ( typeof(firstRun) != "undefined" &&  page != null )
		tg.pageview_init(arrVlanIfList, 10, 'tbl_vlanInterface', page);
	else
		tg.pageview_init(arrVlanIfList, 10, 'tbl_vlanInterface');
}

function onSearchLog() {
	var keyWords = $("#text_keywords").val();
	tg.pageview_search( $("#search_item").val(), keyWords );
}

//return: -1 means Unknown, 1 means A, 2 means B, 3 means C, 4 means D
function get_class_of_address( ip ) {
	var arrIP = ip.split(".");
	if ( !checkNumberRang(arrIP[0], 0, 255 ) ) {
		return -1;
	}
	var n = parseInt( arrIP[0] );

	if ( n >= 0 && n <= 127 ) {
		return 1;
	} else if ( n >= 128 && n <= 191 ) {
		return 2;
	} else if ( n >= 192 && n <= 223 ) {
		return 3;
	} else {
		return 4;
	}
}

$("document").ready( function(){
	$("#text_static_netmask").focus( function() {
		if ( $("#text_static_netmask").val() != "" )
			return;

		var ip_class = get_class_of_address( $("#text_static_ip").val() );
		if ( ip_class == 1 )
			$(this).val("255.0.0.0");
		else if ( ip_class == 2 )
			$(this).val("255.255.0.0");
		else if ( ip_class == 3 )
			$(this).val("255.255.255.0");
		else if ( ip_class == 4 )
			$(this).val("255.255.255.255");
	});

	$("#text_dynamic_netmask").focus( function() {
		if ( $("#text_dynamic_netmask").val() != "" )
			return;

		var ip_class = get_class_of_address( $("#text_dynamic_ip").val() );
		if ( ip_class == 1 )
			$(this).val("255.0.0.0");
		else if ( ip_class == 2 )
			$(this).val("255.255.0.0");
		else if ( ip_class == 3 )
			$(this).val("255.255.255.0");
		else if ( ip_class == 4 )
			$(this).val("255.255.255.255");
	});

});

//index为第几列按钮,第1列按钮的index为0
function btn_formatFunc(arrayRow, index) {
	if( arrayRow[0].indexOf("Ethernet") == "-1" )
		return true;
	else
		return false;
}

var tg = new myGrid('tg');
function init() {
	setNavigationBar("网络设置>接口管理>三层接口设置");

	changeIpMode();
	$("#sel_ifStatus").val("disabled");
	$(".part_if_enable").css("display", "none");
	/*接口列表*/
	/* total width: 817px */
	tg.pageview_add('名称', 0, '130px', MG_SORT_SELF, null, null, interface_sort_asc, interface_sort_dsc);
	tg.pageview_add('描述', 3, '210px', MG_SORT_ASCII, null, formatDesc );
	tg.pageview_add('IP地址/子网掩码', 1, '260px', MG_SORT_ASCII, null, formatIP);
	tg.pageview_add('状态', 2, '80px', MG_SORT_ASCII, null, formatStatus);
	tg.pageview_set_OPwidth("90px");

	tg.pageview_add_btn("编辑", editPort);
	tg.pageview_add_btn("删除", delVlanInterface, null, null, btn_formatFunc );

	load( true );
}

function editPort( arrRow, indexRow ) {
	var vs = arrRow;
	var vid = vs[0].slice(14);
	pageJump( "interface_edit.asp?UID="+parent.uid+"&vid="+vid+"&page="+tg.getCurrentPage() + "&if_name=" + vs[0] );
}
