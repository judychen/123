function myhelp() {
	popHelp("dhcpd_addDynamic");
}

function goBack(){
	var url = "dhcpd.asp?UID="+parent.uid+"&tabMenu=dynamic";
	pageJump(url);
}

function isInputValid_dns() {
	var first_dns = $("#text_dns").val();
	var second_dns = $("#text_dns2").val();

	if ( first_dns != "" ) {
		if ( !checkIP( first_dns ) ) {
			myAlert("DNS服务器IP格式不正确!", "text_dns");
			return false;
		}

		if ( is_ip_loopback_address( $("#text_dns").val() ) ) {
			myAlert("DNS服务器IP不能为回环地址!", "text_dns");
			return false;
		}

		if ( is_ip_multicast_address( $("#text_dns").val() ) ) {
			myAlert("DNS服务器IP不能为组播地址!", "text_dns");
			return false;
		}
		
		if ( is_ip_reserved( $("#text_dns").val() ) ) {
			myAlert("DNS服务器IP地址非法!", "text_dns");
			return false;
		}
	}

	if ( second_dns != "" ) {
		if ( !checkIP( second_dns ) ) {
			myAlert("备份DNS服务器IP格式不正确!", "text_dns2");
			return false;
		}

		if ( is_ip_loopback_address( $("#text_dns2").val() ) ) {
			myAlert("备份DNS服务器IP不能为回环地址!", "text_dns2");
			return false;
		}

		if ( is_ip_multicast_address( $("#text_dns2").val() ) ) {
			myAlert("备份DNS服务器IP不能为组播地址!", "text_dns2");
			return false;
		}
		
		if ( is_ip_reserved($("#text_dns2").val() ) ) {
			myAlert("备份DNS服务器IP地址非法!", "text_dns2");
			return false;
		}
	}

	if ( first_dns != "" && first_dns == second_dns ) {
		myAlert("两个DNS服务器IP不能相同！", "text_dns2");
		return false;
	}

	return true;
}

function isInputIpAndNetMaskValid() {
	var ip = $("#text_ip").val();
	var netmask = $("#text_netmask").val();
	var range_start = $("#text_range_low").val();
	var range_end = $("#text_range_high").val();
	var gateway = $("#text_gateway").val(); 

	if ( ip == "" ) {
		myAlert("IP地址不能为空！", "text_ip");
		return false;
	}

	if ( !checkIP(ip) ){
		myAlert("IP地址格式不正确！", "text_ip");
		return false;
	}

	if ( is_ip_loopback_address( ip ) ) {
		myAlert("IP地址不能为环回地址!", "text_ip");
		return false;
	}

	if ( is_ip_multicast_address( ip ) ) {
		myAlert("IP地址不能为组播地址!", "text_ip");
		return false;
	}

	if ( ip != "0.0.0.0" && is_ip_reserved( ip ) ) {
		myAlert("目的IP地址非法!", "text_ip");
		return false;
	}

	if ( netmask == "" ) {
		myAlert("子网掩码不能为空！", "text_netmask");
		return false;
	}

	if ( !checkMask( netmask ) ) {
		myAlert("子网掩码格式不正确！", "text_netmask");
		return false;
	}

	if ( !is_ip_network(ip, netmask) ) {
		myAlert("IP网段格式不正确！", "text_ip");
		return false;
	}

	if ( range_start == "" ) {
		myAlert("地址池起始IP地址不能为空！", "text_range_low");
		return false;
	}

	if ( !checkIP( range_start ) ) {
		myAlert("地址池起始IP地址格式不正确！", "text_range_low");
		return false;
	}

	if ( is_ip_loopback_address( range_start ) ) {
		myAlert("地址池起始IP地址不能为回环地址!", "text_range_low");
		return false;
	}

	if ( is_ip_multicast_address( range_start ) ) {
		myAlert("地址池起始IP地址不能为组播地址!", "text_range_low");
		return false;
	}

	if ( is_ip_reserved( range_start ) ) {
		myAlert("地址池起始IP地址非法!", "text_range_low");
		return false;
	}

	if ( !is_ip_unicast_address( range_start, netmask ) ) {
		myAlert("地址池起始地址的网络主机号不能全为0或全为1!", "text_range_low");
		return false;
	}

	if ( !is_ip_and_gateway_same_subnet( ip, netmask, range_start ) ) {
		myAlert("地址池起始地址和IP不在同一网段上!", "text_range_low");
		return false;
	}

	if ( range_end == "" ) {
		myAlert("地址池结束IP地址不能为空！", "text_range_high");
		return false;
	}

	if ( !checkIP( range_end ) ) {
		myAlert("地址池结束IP地址格式不正确！", "text_range_high");
		return false;
	}

	if ( is_ip_loopback_address( range_end ) ) {
		myAlert("地址池结束IP地址不能为回环地址!", "text_range_high");
		return false;
	}

	if ( is_ip_multicast_address( range_end ) ) {
		myAlert("地址池结束IP地址不能为组播地址!", "text_range_high");
		return false;
	}

	if ( is_ip_reserved( range_end ) ) {
		myAlert("地址池结束IP地址非法!", "text_range_high");
		return false;
	}

	if ( !is_ip_unicast_address( range_end, netmask ) ) {
		myAlert("地址池结束地址的网络主机号不能全为0或全为1!", "text_range_high");
		return false;
	}

	if ( !is_ip_and_gateway_same_subnet( ip, netmask, range_end ) ) {
		myAlert("地址池结束地址和IP不在同一网段上!", "text_range_high");
		return false;
	}

	if ( gateway != "" ) {
		if ( !checkIP( gateway ) ){
			myAlert("网关地址格式不正确！", "text_gateway");
			return false;
		}

		if ( is_ip_loopback_address( gateway ) ) {
			myAlert("网关地址不能为环回地址!", "text_gateway");
			return false;
		}

		if ( is_ip_multicast_address( gateway ) ) {
			myAlert("网关地址不能为组播地址!", "text_gateway");
			return false;
		}

		if ( gateway != "0.0.0.0" && is_ip_reserved( gateway ) ) {
			myAlert("网关地址非法!", "text_gateway");
			return false;
		}

		if ( !is_ip_unicast_address( gateway, netmask ) ) {
			myAlert("网关地址的网络主机号不能全为0或全为1!", "text_gateway");
			return false;
		}

		if ( !is_ip_and_gateway_same_subnet( ip, netmask, gateway ) ) {
			myAlert("网关地址和IP不在同一网段上!", "text_gateway");
			return false;
		}
	}


	return true;
}

function isInputValid(){
	if (!$("#text_name").val()) {
		myAlert("地址池名称不能为空！", "text_name");
		return false;
	}

	if ( !checkLetterAndNumberAndUnderline( $("#text_name").val() ) ) {
		myAlert("地址池名称只能包含数字、字母、下划线！", "text_name");
		return false;
	}

	if ( isHasChinese( $("#text_name").val() ) ) {
		myAlert("地址池名称不能包含中文！", "text_name");
		return false;
	}

	if ( !isInputIpAndNetMaskValid() ) {
		return false;
	}

	if ( !isInputValid_dns() )
		return false;

	var expired = $("#text_expired").val();
	if ( expired == "" ) {
		myAlert("组约时间不能为空！", "text_expired");
		return false;
	}
	if ( !checkNumberRang( expired, 10, 1440 ) ) {
		myAlert("非法的租约时间！", "text_expired");
		return false;
	}

	return true;
}

function addAclSuccess(data) {
	goBack();
	return;
}
function ok(){
	if ( !isInputValid() )	
		return;
	var url="setform/form_dhcpd_add?UID="+parent.uid;
	var f = new myForm();
	
	f.add("name", $("#text_name").val());
	f.add("ip", $("#text_ip").val());
	f.add("netmask", $("#text_netmask").val());
	f.add("range_low", $("#text_range_low").val());
	f.add("range_high", $("#text_range_high").val());
	f.add("domain_name", $("#text_domain_name").val());

	f.add("gateway", $("#text_gateway").val());
	f.add("dns", $("#text_dns").val());
	f.add("dns2", $("#text_dns2").val());

	f.add("expired", $("#text_expired").val());

	f.submit( url, addAclSuccess );
}

function init() {
	setNavigationBar("网络设置>DHCP>新增动态地址池");
}
