
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

	}else if( $("#ip_sel_ipmode").val() == "pppoe"){
		
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

	/*监听下拉框，有变化时，变化显示*/
	$("#ip_sel_ipmode").change( changeIpMode );
	$("#ip_sel_dnsmode").change( changeDnsMode );

	/*子网掩码判断，先不做*/

});






















