function myhelp() {
	popHelp("interfaceAdd");
}

function changeIfStatus() {
	if ( $("#sel_ifStatus").val() == "enabled" ) {
		$(".part_if_enable").css("display", "table-row");
		changeIpMode();
	} else {
		$(".part_if_enable").css("display", "none");
	}
}

function todo() {
}

function changeDNSMode(){
	if ( $("#sel_dnsMode").val() == "auto" ) {
		$(".DNS_MANUAL").css("display", "none");
	} else {
		$(".DNS_MANUAL").css("display", "table-row");
	}
}

function changeIpMode(){
	if ($("#sel_ip_mode").val() == "dhcp") {
		$(".IP_static").css('display','none');
		$(".IP_PPPoE").css('display','none');
		$(".IP_dynamic").css('display','table-row');
		$(".tr_dns").css("display", "table-row");
		$("#sel_dnsMode").val("auto");
		$("#sel_dnsMode").attr("disabled", false);
	}
	else if ($("#sel_ip_mode").val() == "pppoe") {
		$(".IP_static").css('display','none');
		$(".IP_PPPoE").css('display','table-row');
		$(".IP_dynamic").css('display','none');
		$(".tr_dns").css("display", "table-row");
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

function chooseVLANID(){
}

function goBack(){
	pageJump("interface_manage.asp?UID="+parent.uid);
}

function addVlanInterfaceSuccess(){
	goBack();
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

		if ( is_ip_reserved($("#text_static_ip").val()) ) {
			myAlert("IP地址非法!", "text_static_ip");
			return false;
		}

		if ( !is_ip_unicast_address( $("#text_static_ip").val(), $("#text_static_netmask").val() ) ) {
			myAlert("网络主机号不能全为0或全为1!", "text_static_ip");
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

		if ( is_ip_reserved($("#text_static_gateway").val() ) ) {
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

		if ( is_ip_loopback_address( $("#text_first_dns_server").val() ) ) {
			myAlert("DNS服务器IP不能为回环地址!", "text_first_dns_server");
			return false;
		}

		if ( is_ip_multicast_address( $("#text_first_dns_server").val() ) ) {
			myAlert("DNS服务器IP不能为组播地址!", "text_first_dns_server");
			return false;
		}

		if ( is_ip_reserved( $("#text_first_dns_server").val() ) ) {
			myAlert("DNS服务器IP地址非法!", "text_first_dns_server");
			return false;
		}
	}

	if ( second_dns != "" ) {
		if ( !checkIP( second_dns ) ) {
			myAlert("备份DNS服务器IP格式不正确!", "text_second_dns_server");
			return false;
		}

		if ( is_ip_loopback_address( $("#text_second_dns_server").val() ) ) {
			myAlert("备份DNS服务器IP不能为回环地址!", "text_second_dns_server");
			return false;
		}

		if ( is_ip_multicast_address( $("#text_second_dns_server").val() ) ) {
			myAlert("备份DNS服务器IP不能为组播地址!", "text_second_dns_server");
			return false;
		}

		if ( is_ip_reserved($("#text_second_dns_server").val() ) ) {
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
	if ( $("#sel_vlan_id").val() == "" ) {
		myAlert("请选择VLAN ID", "sel_vlan_id");
		return false;
	}

	var desc = $("#text_desc").val();
	if ( isHasChinese( desc ) ) {
		myAlert("字符串不能包含中文！", "text_desc");
		return false;
	}

	if ( $("#sel_ifStatus").val() == "disabled" ) {
		if (desc != "") {
			if ( !check_vlan_name_desc(desc) ){
				myAlert("描述含有非法字符！", "text_desc");
				return false;
			}
		}

		return true;
	}

	if ( $("#sel_ip_mode").val() == "dhcp" ) {
		if ( $("#sel_dnsMode").val() == "manual" ) {
			if ( !isInputValid_dns() ) {
				return false;
			}
		}

		if ( $("#text_dynamic_ip").val() != "" ) {
			if (!checkIP( $("#text_dynamic_ip").val())) {
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

			if ( is_ip_reserved($("#text_dynamic_ip").val() ) ) {
				myAlert("默认IP地址非法!", "text_dynamic_ip");
				return false;
			}

			if($("#text_dynamic_netmask").val() == ""){
				myAlert("请输入默认子网掩码!", "text_dynamic_netmask");
				return false;
			}

			if(!checkIP( $("#text_dynamic_netmask").val())){
				myAlert("默认子网掩码格式不正确!", "text_dynamic_netmask");
				return false;
			}

			if ( !is_ip_unicast_address( $("#text_dynamic_ip").val(), $("#text_dynamic_netmask").val() ) ) {
				myAlert("网络主机号不能全为0或全为1!", "text_dynamic_ip");
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
					myAlert("默认掩码格式不正确！", "text_dynamic_netmask");
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

	if(desc != ""){
		if ( !check_vlan_name_desc(desc) ){
			myAlert("描述含有非法字符！", "text_desc");
			return false;
		}
	}

	return true;
}

function _form_vlan_interface_add_static() {
	var f = new myForm();
	var url = "";
	url = "setform/form_vlan_interface_add?UID="+parent.uid;
	f.add( "vid", $("#sel_vlan_id").val() );
	f.add( "desc", $("#text_desc").val() );
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
	f.submit( url, addVlanInterfaceSuccess );
}

function check_nat_and_dhcpd() {
	if ( $("#sel_nat_enable").val() == "enabled"
			&& $("#sel_static_dhcpd_enable").val() == "enabled" 
	) {
		myConfirm("该接口启用NAT，接口下的客户端将无法动态获取地址，是否继续配置？"
			, false, _form_vlan_interface_add_static);
	} else {
		_form_vlan_interface_add_static();
	}
}

function form_vlan_interface_add_static() {
	var gateway = $("#text_static_gateway").val();
	if ( gateway != "" && !is_ip_and_gateway_same_subnet( $("#text_static_ip").val()
				, $("#text_static_netmask").val(), gateway ) ) {
		 myConfirm("网关不在由IP地址和子网掩码定义的同一网络段（子网）上，是否继续配置？"
				, false, check_nat_and_dhcpd );
	} else {
		check_nat_and_dhcpd();
	}
}

function form_vlan_interface_add_dhcp() {
	var f = new myForm();
	var url = "";
	url = "setform/form_vlan_interface_add?UID="+parent.uid;
	f.add( "vid", $("#sel_vlan_id").val() );
	f.add( "desc", $("#text_desc").val() );
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
	f.submit( url, addVlanInterfaceSuccess );
}

function form_vlan_interface_add_pppoe() {
	var f = new myForm();
	var url = "";
	url = "setform/form_vlan_interface_add?UID="+parent.uid;
	f.add( "vid", $("#sel_vlan_id").val() );
	f.add( "desc", $("#text_desc").val() );
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
	f.submit( url, addVlanInterfaceSuccess);
}

function Ok() {
	if ( !isInputValid() )
		return;

	if ( $("#sel_ifStatus").val() == "disabled" ) {
		var f = new myForm();
		var url = "";
		url = "setform/form_vlan_interface_add?UID="+parent.uid;
		f.add( "vid", $("#sel_vlan_id").val() );
		f.add( "desc", $("#text_desc").val() );
		f.add( "enable", $("#sel_ifStatus").val() );
		f.submit( url, addVlanInterfaceSuccess );
		return;
	}

	if ( $("#sel_ip_mode").val() == "dhcp" ) {
		form_vlan_interface_add_dhcp();
	} else if ( $("#sel_ip_mode").val() == "static" ) {
		form_vlan_interface_add_static();
	} else if($("#sel_ip_mode").val() == "pppoe") {
		form_vlan_interface_add_pppoe();
	} else {
		myAlert("todo");
		return;
	}
}

function tabmenu_jump(page) {
	switch (page){
	case "VLAN":
		break;
	case "端口":
		break;
	default:
		alert("Unkown tab clicked!");
		break;
	}
}

function isVlanInterfaceExist( vid ) {
	var temp;
	var ifName;
	//var vid;
	for ( var i = 0; i < jsInterface.pkg_interface.length; i++ ) {
		tmp = jsInterface.pkg_interface[i];
		ifName = tmp.sect_name;
		if ( ifName.charAt(0) == 'V' && ifName.slice(14) == vid )
			return true;
	}
	return false;
}
function load() {
	for (var i = 0; i < jsVlan.pkg_vlan.length; i++ ) {
		var tmp = jsVlan.pkg_vlan[i];
		var vid = tmp.sect_name.slice(4);
		if ( !isVlanInterfaceExist( vid ) )
			$("#sel_vlan_id").append("<option value=\""+vid+"\">" + vid + "</option>");
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

function init() {
	setNavigationBar("网络设置>接口管理>新增三层接口");

	load();

	$("#sel_ip_mode").val("dhcp");
	changeIpMode();
}
