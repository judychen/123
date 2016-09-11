var arrIS;
/****** struct of arrIS ******
* ip 
* netmask 
* dhcpd_enable 
* ippool_start
* ippool_end
*****************************/
function myhelp() {
	popHelp("wizardSettings_lan_settings");
}

function init() {
	setNavigationBar("配置向导>LAN设置");

	if ( typeof(arrIS.ip) != "undefined" ) {
		$("#text_nat_vlan1_ip").val( arrIS.ip );
		$("#text_nat_vlan1_netmask").val( arrIS.netmask );
	}
	if ( typeof(arrIS.dhcpd_enable) != "undefined" ) {
		if ( arrIS.dhcpd_enable == "enable" ) {
			$("#sel_nat_vlan1_dhcpd_enable").val("enable");
			$("#text_nat_vlan1_ippool_start").val( arrIS.ippool_start );
			$("#text_nat_vlan1_ippool_end").val( arrIS.ippool_end );
		} else {
			$("#sel_nat_vlan1_dhcpd_enable").val("disable");
		}
	}
	lan_dhcpd_enable_changed();
}

function ok() {
	arrIS.ip = $("#text_nat_vlan1_ip").val();
	arrIS.netmask = $("#text_nat_vlan1_netmask").val();
	arrIS.dhcpd_enable = $("#sel_nat_vlan1_dhcpd_enable").val();
	if ( arrIS.dhcpd_enable ) {
		arrIS.ippool_start = $("#text_nat_vlan1_ippool_start").val();
		arrIS.ippool_end = $("#text_nat_vlan1_ippool_end").val();
	}
}

function isInputValid() {
	var ip = $("#text_nat_vlan1_ip").val();
	var netmask = $("#text_nat_vlan1_netmask").val();
	var ip_pool_start = $("#text_nat_vlan1_ippool_start").val();
	var ip_pool_end = $("#text_nat_vlan1_ippool_end").val();

	if ( ip == "" ) {
		myAlert("IP地址不能为空!", "text_nat_vlan1_ip");
		return false;
	}

	if ( !checkIP( ip ) ) {
		myAlert("IP地址格式不正确!", "text_nat_vlan1_ip");
		return false;
	}
	if ( is_ip_loopback_address( ip ) ) {
		myAlert("IP地址不能为回环地址!", "text_nat_vlan1_ip");
		return false;
	}
	if ( is_ip_multicast_address( ip ) ) {
		myAlert("IP地址不能为组播地址!", "text_nat_vlan1_ip");
		return false;
	}

	if ( netmask == "" ) {
		myAlert("子网掩码不能为空！", "text_nat_vlan1_netmask");	
		return false;
	}
	if ( !checkMask( netmask ) ) {
		myAlert("子网掩码格式不正确!", "text_nat_vlan1_netmask");
		return false;
	}
	if ( !is_ip_unicast_address( ip, netmask ) ) {
		myAlert("IP地址的网络主机号不能全为0或全为1!", "text_nat_vlan1_ip");
		return false;
	}

	if ( $("#sel_nat_vlan1_dhcpd_enable").val() == "enable" ) {
		if ( ip_pool_start == "" ) {
			myAlert("地址池起始IP地址不能为空！", "text_nat_vlan1_ippool_start");
			return false;
		}
		if ( !checkIP( ip_pool_start ) ) {
			myAlert("地址池起始IP地址格式不正确!", "text_nat_vlan1_ippool_start");
			return false;
		}
		if ( is_ip_loopback_address( ip_pool_start ) ) {
			myAlert("地址池起始IP地址不能为回环地址!", "text_nat_vlan1_ippool_start");
			return false;
		}
		if ( is_ip_multicast_address( ip_pool_start ) ) {
			myAlert("地址池起始IP地址不能为组播地址!", "text_nat_vlan1_ippool_start");
			return false;
		}
		if ( is_ip_reserved( ip_pool_start ) ) {
			myAlert("地址池起始IP地址非法!", "text_nat_vlan1_ippool_start");
			return false;
		}
		if ( !is_ip_unicast_address( ip_pool_start, netmask ) ) {
			myAlert("地址池起始IP地址的网络主机号不能全为0或全为1!", "text_nat_vlan1_ippool_start");
			return false;
		}
		if ( !is_equal_network_number(ip, ip_pool_start, netmask ) ) {
			myAlert("地址池起始IP地址和IP地址不在同一网段内！", "text_nat_vlan1_ippool_start");
			return false;
		}

		if ( ip_pool_end == "" ) {
			myAlert("地址池结束IP地址不能为空！", "text_nat_vlan1_ippool_end");
			return false;
		}
		if ( !checkIP( ip_pool_end ) ) {
			myAlert("地址池结束IP地址格式不正确!", "text_nat_vlan1_ippool_end");
			return false;
		}
		if ( is_ip_loopback_address( ip_pool_end ) ) {
			myAlert("地址池结束IP地址不能为回环地址!", "text_nat_vlan1_ippool_end");
			return false;
		}
		if ( is_ip_multicast_address( ip_pool_end ) ) {
			myAlert("地址池结束IP地址不能为组播地址!", "text_nat_vlan1_ippool_end");
			return false;
		}
		if ( is_ip_reserved( ip_pool_end ) ) {
			myAlert("地址池结束IP地址非法!", "text_nat_vlan1_ippool_end");
			return false;
		}
		if ( !is_ip_unicast_address( ip_pool_end, netmask ) ) {
			myAlert("地址池结束IP地址的网络主机号不能全为0或全为1!", "text_nat_vlan1_ippool_end");
			return false;
		}
		if ( !is_equal_network_number(ip, ip_pool_end, netmask ) ) {
			myAlert("地址池结束IP地址和IP地址不在同一网段内！", "text_nat_vlan1_ippool_end");
			return false;
		}
	}

	var arrIPstart = ip_pool_start.split(".");
	var nIPstart = parseInt(arrIPstart[0]) * 16581375
					+ parseInt(arrIPstart[1]) * 65025
					+ parseInt(arrIPstart[2]) * 255
					+ parseInt(arrIPstart[3]);
	var arrIPend = ip_pool_end.split(".");
	var nIPend = parseInt(arrIPend[0]) * 16581375
					+ parseInt(arrIPend[1]) * 65025
					+ parseInt(arrIPend[2]) * 255
					+ parseInt(arrIPend[3]);

	if ( nIPstart > nIPend ) {
		myAlert("地址池结束IP地址不能小于地址池开始IP地址！", "text_nat_vlan1_ippool_end");
		return false;
	}

	//var max_num_leases = 128;
	var max_num_leases = g_max_num_leases;
	if ( nIPend - nIPstart > max_num_leases - 1 ) {
		myAlert("地址池起始地址与结束地址数量超过上限" + max_num_leases + "！", "text_nat_vlan1_ippool_end");
		return false;
	}
		
	return true;
}

function lan_dhcpd_enable_changed() {
	if ( $("#sel_nat_vlan1_dhcpd_enable").val() == "enable" )
		$(".part_nat_vlan1_dhcpd_enable").css("display", "table-row");
	else
		$(".part_nat_vlan1_dhcpd_enable").css("display", "none");
}

$(document).ready( function() {
	arrIS = loadWizardProgress("wizard_lan_settings");
	$("#sel_nat_vlan1_dhcpd_enable").change( lan_dhcpd_enable_changed );
	init();
});
