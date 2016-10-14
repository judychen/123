
function loadSummaryData(){
	if ( arrIS.link_mode == "nat") {
		$(".wizard_sum_nat").show();
		$(".wizard_sum_bridge").hide();

		$("#wizard_sum_mode").html("NAT模式");

		if ( arrIS.wan_ip_mode == "dhcp" ) {
			$("#wizard_sum_wan").html("DHCP分配");

		}else if(arrIS.wan_ip_mode == "pppoe"){
			$("#wizard_sum_wan").html("PPPoE");

		}else{
			$("#wizard_sum_wan").html( arrIS.static_ip + " / " + arrIS.static_netmask );
		}

		$("#wizard_sum_lanip").html(arrIS.ip + " / " + arrIS.netmask);

		if(arrIS.dhcpd_enable == "enable"){
			$("#wizard_sum_landhcp").html("启用" + arrIS.ippool_start + "-" + arrIS.ippool_end);
		}else{
			$("#wizard_sum_landhcp").html("禁用");
		}

	} else {
		$(".wizard_sum_bridge").show();
		$(".wizard_sum_nat").hide();

		$("#wizard_sum_mode").html("桥接模式");

		if ( arrIS.ip_mode == "dhcp" ) {
			$("#wizard_sum_ip").html("DHCP分配");


		}else if(arrIS.ip_mode == "pppoe"){
			$("#wizard_sum_ip").html("PPPoE");

		}else{
			$("#wizard_sum_ip").html( arrIS.static_ip + " / " + arrIS.static_netmask );
			console.log("static");
		}
	}

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


