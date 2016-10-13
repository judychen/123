
function loadSummaryData(){
	if ( arrIS.link_mode == "nat") {
		$(".wizard_sum_nat").show();
		$(".wizard_sum_bridge").hide();
	} else {
		$(".wizard_sum_bridge").show();
		$(".wizard_sum_nat").hide();
	}


	if(arrIS.link_mode == "nat"){
		$("#wizard_sum_mode").html("NAT模式");
	}else{
		$("#wizard_sum_mode").html("桥接模式");
	}

	if ( arrIS.ip_mode == "dhcp" ) {
		$("#wizard_sum_ip").html("DHCP分配");

	}else if(arrIS.ip_mode == "pppoe"){
		$("#wizard_sum_ip").html("PPPoE");

	}else{
		$("#wizard_sum_ip").html( arrIS.static_ip + " / " + arrIS.static_netmask );
	}

	/*nat方式未配置*/
		
	/*if ( arrIS.ip_mode == "dhcp" ) {
		$("#wizard_sum_wan").html("DHCP分配");

	}else if(temp.ip_mode == "pppoe"){
		$("#wizard_sum_wan").html("PPPoE");

	}else{
		$("#wizard_sum_wan").html( temp.static_ip + " / " + temp.static_netmask );
	}*/
	/*dns*/

	/*if ( temp.dns_mode == "static" ){
		$("#span_dns_mode").html("自动");
	}else{
		var str = "";
		if ( temp.dns_first != "" )
			str += temp.dns_first;
		else if ( temp.dns_second != "" ) {
			if ( str != "" )
				str += " ";
			str += temp.dns_first;
		}
		$("#span_dns_mode").html( str );
	}

	$("#wizard_sum_ip").html( temp.ip + " / " + temp.netmask );

	if (temp.dhcpd_enable == "enable") {
		$("#wizard_sum_landhcp").html( "启用&nbsp;&nbsp;&nbsp;" + temp.ippool_start + " - " + temp.ippool_end );
	} else
		$("#wizard_sum_landhcp").html( "禁用" );*/

	if ( arrIS.pwd != "" ) {
		$("#wizard_sum_ap").html( "已更改" );
	}else{
		$("#wizard_sum_ap").html( "未更改" );
	}

	$("#wizard_sum_ssid0").html(arrIS.ssid_0);
	$("#wizard_sum_ssid1").html(arrIS.ssid_1);

	if ( arrIS.encrypt == "none" ){
		$("#wizard_sum_cipher").html( "None" );
	}else{
		$("#wizard_sum_cipher").html( "WPA/WPA2" );
	}

}


