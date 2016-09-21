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
function changeIpMode(){
	if ( $("#ip_sel_ipmode").val() == "dhcp" ) {
		$(".ip_static").hide();
		$(".ip_pppoe").hide();

		$("#ip_sel_dnsMode").val("auto");
		$(".ip_dns_manual").hide();


	} else if ( $("#ip_sel_ipmode").val() == "static") {
		$(".ip_static").show();
		$(".ip_pppoe").hide();
		$("#ip_sel_dnsMode").attr("disabled", "disabled");
		$("#ip_sel_dnsMode").val("static");
		$(".ip_dns_static").show();

	}else if( $("#ip_sel_ipmode").val() == "pppoe")
	{
		$(".ip_static").hide();
		$(".ip_pppoe").show();

		$("#ip_sel_dnsMode").attr("disabled", "disabled");
		$("#ip_sel_dnsMode").val("auto");
		$(".ip_dns_static").hide();

	}
}

function changeDnsMode(){
	if ( $("#ip_sel_dnsmode").val() == "auto") {
		$(".ip_dns_static").hide();
	} else {
		$(".ip_dns_static").show();
		console.log("static");
	}
}

function isInputValid_ip() {
    /*todo*/
}

function isInputValid_dns() {
    /*todo*/
}

function needConfirm() {
    /*todo*/
}

function isInputValid() {
    /*todo*/
}

function ok() {
    /*todo*/
}

$(function () {
	arrIS = loadWizardProgress("wizard_ip_settings");
	setNavigationBar("配置向导>IP地址");
	/*这边是配置初始值？？*/
	if ( typeof(arrIS.ip_mode) != "undefined" ){
		$("#sel_ip_mode").val( arrIS.ip_mode );
		if(arrIS.ip_mode == "dhcp"){
			$(".ip_static").hide();
			$(".ip_pppoe").hide();
			if(arrIS.dns_mode == "auto"){
				$("#ip_sel_dnsMode").val("auto");
				$(".ip_dns_manual").hide();
			}else{
				$("#ip_sel_dnsMode").val("static");
				$(".ip_dns_static").show();
				$("#ip_dns_static1").val( arrIS.dns_first);
				$("#ip_dns_static2").val( arrIS.dns_second);
			}
		}else if ( arrIS.ip_mode == "static" ){
			$(".ip_static").show();
			$(".ip_pppoe").hide();
			$("#ip_static_ip").val( arrIS.static_ip );
			$("#ip_static_netmask").val( arrIS.static_netmask );
			$("#ip_static_gateway").val( arrIS.static_gateway );

			$("#ip_sel_dnsMode").attr("disabled", "disabled");
			$("#ip_sel_dnsMode").val("static");

			$(".ip_dns_static").show();
			$("#ip_dns_static1").val( arrIS.dns_first);
			$("#ip_dns_static2").val( arrIS.dns_second);
		}else if ( arrIS.ip_mode == "pppoe" ){
			$(".ip_static").hide();
			$(".ip_pppoe").show();

			$("#ip_sel_dnsMode").attr("disabled", "disabled");
			$("#ip_sel_dnsMode").val("auto");
			$(".ip_dns_static").hide();

			$("#ip_pppoe_account").val( arrIS.pppoe_account );
			$("#ip_pppoe_password").val( arrIS.pppoe_password );
			$("#ip_pppoe_mtu").val( arrIS.pppoe_mtu );
			$("#ip_pppoe_name").val( arrIS.pppoe_name );//改
			$("#ip_pppoe_server").val( arrIS.pppoe_server );//改
		}
	}else{
		$("#ip_sel_ipmode").val("dhcp");
		changeIpMode();
		$("#ip_sel_dnsmode").val("auto");
		changeDnsMode();
	}

	/*监听下拉框，有变化时，变化显示*/
	$("#ip_sel_ipmode").change( changeIpMode );
	$("#ip_sel_dnsmode").change( changeDnsMode );

	/*子网掩码判断，先不做*/

});






















