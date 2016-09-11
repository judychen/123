var arrIS;
/****** struct of arrIS ******
* ip_mode
* static_ip
* static_netmask
* static_gateway
* dns_mode
* dns_first
* dns_second
*****************************/
function myhelp() {
	popHelp("wizardSettings_ip");
}

function changeDNSMode() {
	if ($("#sel_dnsMode").val() == "manual") {
		$(".DNS_MANUAL").css('display','table-row');
	} else {
		$(".DNS_MANUAL").css('display','none');
	}
}

function init() {
	setNavigationBar("配置向导>IP地址");

	if ( typeof(arrIS.ip_mode) != "undefined" ) {
		$("#sel_ip_mode").val( arrIS.ip_mode );
		if ( arrIS.ip_mode == "dhcp" ) {
			$(".part_static_ip").css('display','none');
			$(".part_pppoe_ip").css('display','none');
			$("#sel_dnsMode").attr("disabled", false);
			if ( arrIS.dns_mode == "auto" ) {
				$("#sel_dnsMode").val("auto");
				$(".DNS_MANUAL").css("display", "none");
			} else  {
				$("#sel_dnsMode").val("manual");
				$(".DNS_MANUAL").css("display", "table-row");
				$("#text_first_dns_server").val( arrIS.dns_first);
				$("#text_second_dns_server").val( arrIS.dns_second);
			}

		} else if ( arrIS.ip_mode == "static" ) {
			$(".part_static_ip").css('display','table-row');
			$(".part_pppoe_ip").css('display','none');
			$("#text_static_ip").val( arrIS.static_ip );
			$("#text_static_netmask").val( arrIS.static_netmask );
			$("#text_static_gateway").val( arrIS.static_gateway );

			$("#sel_dnsMode").attr("disabled", true );
			$("#sel_dnsMode").val("manual");

			$(".DNS_MANUAL").css("display", "table-row");
			$("#text_first_dns_server").val( arrIS.dns_first);
			$("#text_second_dns_server").val( arrIS.dns_second);
		}else if ( arrIS.ip_mode == "pppoe" )
		{
			$(".part_static_ip").css('display','none');
			$(".part_pppoe_ip").css('display','table-row');
			$("#sel_dnsMode").attr("disabled", false);
			$("#sel_dnsMode").val("auto");
			$(".DNS_MANUAL").css("display", "none");
			$("#text_pppoe_account").val( arrIS.pppoe_account );
			$("#text_pppoe_password").val( arrIS.pppoe_password );
			$("#text_pppoe_mtu").val( arrIS.pppoe_mtu );
			$("#text_pppoe_servicesname").val( arrIS.pppoe_servicesname );
			$("#text_pppoe_acname").val( arrIS.pppoe_acname );
		}
	} else {
		//the page was accessed first
		$("#sel_ip_mode").val("dhcp");
		change_ip_mode();
		$("#sel_dnsMode").val("auto");
		changeDNSMode();
	}
}

function isInputValid_ip() {
	if ( !checkIP( $("#text_static_ip").val() ) ) {
		myAlert("输入的IP地址格式不正确!", "text_static_ip");
		return false;
	}
	if ( !checkMask( $("#text_static_netmask").val() ) ) {
		myAlert("输入的子网掩码格式不正确!", "text_static_netmask");
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
		
		var tmpIP = $("#text_static_ip").val();
		var arrIP = tmpIP.split(".");
		var arrMask = new Array(0, 128, 192, 224, 240, 248, 252, 254);
		var tmpMask = $("#text_static_netmask").val();
		for (var i = parseInt(tmpMask / 8) ; i < 4; i++) {
			arrIndex = tmpMask - i * 8;
			if( arrIndex < 0 )
				arrIndex = 0;
			if ( (arrIP[i] & arrMask[arrIndex]) != arrIP[i] ){
				myAlert("输入的掩码格式不正确！", "text_static_netmask");
				return false;
			}
		}
	}

	if ( $("#text_static_gateway").val() != ""  ) {
		if ( !checkIP( $("#text_static_gateway").val() ) ) {
			myAlert("输入的默认路由地址格式不正确!", "text_static_gateway");
			return false;
		}
		
		
	
	}

	return true;
}

function isInputValid_dns() {
	var first_dns = $("#text_first_dns_server").val();
	var second_dns = $("#text_second_dns_server").val();
	if ( first_dns != "" && !checkIP( first_dns ) ) {
		myAlert("输入的DNS服务器IP格式不正确!", "text_first_dns_server");
		return false;
	}
	if ( second_dns != "" && !checkIP( second_dns ) ) {
		myAlert("输入的备份DNS服务器IP格式不正确!", "text_second_dns_server");
		return false;
	}

	if ( first_dns != "" && first_dns == second_dns ) {
		myAlert("两个DNS服务器IP不能相同！", "text_second_dns_server");
		return false;
	}

	return true;
}

function needConfirm( funcOk ) {
	var gateway = $("#text_static_gateway").val();
	if ( $("#sel_ip_mode").val() == "static" && gateway != "" ) {
		//判断子网与网关是否同一网段
		var dst_ip = $("#text_static_ip").val();
		var netmask = $("#text_static_netmask").val();
		if ( !is_ip_and_gateway_same_subnet( dst_ip, netmask, gateway ) ) {
			myConfirm("网关不在由IP地址和子网掩码定义的同一网络段（子网）上，是否继续配置？", false, funcOk);
		} else {
			if ( typeof(funcOk) == "function" )
				funcOk();
		}
	} else {
		if ( typeof(funcOk) == "function" )
			funcOk();
	}
}

function isInputValid() {
	if ( $("#sel_ip_mode").val() == "static" ) {
		if ( !isInputValid_ip() )
			return false;
	}

	if ( $("#sel_dnsMode").val() == "manual" ) {
		if ( !isInputValid_dns() )
			return false;
	}
	if ( $("#sel_ip_mode").val() == "pppoe" ) {
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
	}
	
	return true;
}

function ok() {
	arrIS.ip_mode = $("#sel_ip_mode").val();
	arrIS.static_ip = $("#text_static_ip").val();
	arrIS.static_netmask = $("#text_static_netmask").val();
	arrIS.static_gateway = $("#text_static_gateway").val();
	arrIS.dns_mode = $("#sel_dnsMode").val();
	arrIS.dns_first = $("#text_first_dns_server").val();
	arrIS.dns_second = $("#text_second_dns_server").val();
	arrIS.pppoe_account =$("#text_pppoe_account").val();
	arrIS.pppoe_password=$("#text_pppoe_password").val();
	arrIS.pppoe_mtu=$("#text_pppoe_mtu").val();
	arrIS.pppoe_servicesname=$("#text_pppoe_servicesname").val();
	arrIS.pppoe_acname=$("#text_pppoe_acname").val();
/*
	if ( arrIS.ip_mode == "dhcp" ) {
		;
	} else {
		//static
		arrIS.static_ip = $("#text_static_ip").val();
		arrIS.static_netmask = $("#text_static_netmask").val();
		arrIS.static_gateway = $("#text_static_gateway").val();
	}

	arrIS.dns_mode = $("#sel_dnsMode").val();
	if ( arrIS.dns_mode == "auto" ) {
		;
	} else {
		//manual
		arrIS.dns_first = $("#text_first_dns_server").val();
		arrIS.dns_second = $("#text_second_dns_server").val();
	}
*/
}

function change_ip_mode() {
	if ( $("#sel_ip_mode").val() == "dhcp" ) {
		$(".part_static_ip").css('display','none');
		$(".part_pppoe_ip").css('display','none');
		$("#sel_dnsMode").attr("disabled", false);
		$("#sel_dnsMode").val("auto");
		$(".DNS_MANUAL").css("display", "none");
	} else if ($("#sel_ip_mode").val() == "static")
	{
		//dialer: static
		$(".part_static_ip").css('display','table-row');
		$(".part_pppoe_ip").css('display','none');
		$("#sel_dnsMode").attr("disabled", true);
		$("#sel_dnsMode").val("manual");
		$(".DNS_MANUAL").css("display", "table-row");
	}else if($("#sel_ip_mode").val() == "pppoe")
	{
		$(".part_static_ip").css('display','none');
		$(".part_pppoe_ip").css('display','table-row');
		$("#sel_dnsMode").attr("disabled", false);
		$("#sel_dnsMode").val("auto");
		$(".DNS_MANUAL").css("display", "none");
		
	}
}

$(document).ready( function() {
	arrIS = loadWizardProgress("wizard_ip_settings");

	init();

	$("#sel_ip_mode").change( change_ip_mode );
	$("#sel_dnsMode").change( changeDNSMode );
	/*
	$("#wizard_div a").click( function(){
		//alert( $(this).find("div").attr("id") );
		//alert("123");
	});*/

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

});
