var arrWS;

function isInputValid() {
    /*todo*/
}

function _finish() {
    /*todo*/
}

function finish() {
    /*todo*/
}

function gohome() {
    /*todo*/
}

function ajaxDone() {
    /*todo*/
}

function generate_tr_ssid() {
    /*todo*/
}

function validWizardSummary(){
	
}

$(function () {
   /* arrWS = loadWizardProgress("wizard_summary");



    var temp;
	var nat = jsSpec.spec.nat;*/

	/*if ( typeof(nat) != "undefined" ) {
		
		if(temp.link_mode == "nat"){
			$("#wizard_sum_mode").html("NAT模式");
		}else{
			$("#wizard_sum_mode").html("桥接模式");
		}
		step = 1;

	}else{

		step = 0;

	}

	if ( temp.ip_mode == "dhcp" ) {
		$("#wizard_sum_wan").html("DHCP分配");

	}else if(temp.ip_mode == "pppoe"){
		$("#wizard_sum_wan").html("PPPoE");

	}else{
		$("#wizard_sum_wan").html( temp.static_ip + " / " + temp.static_netmask );
	}*/
	/*dns*/

/*	if ( temp.dns_mode == "static" ){
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
	}*/

	/*$("#wizard_sum_ip").html( temp.ip + " / " + temp.netmask );

	if (temp.dhcpd_enable == "enable") {
		$("#wizard_sum_landhcp").html( "启用&nbsp;&nbsp;&nbsp;" + temp.ippool_start + " - " + temp.ippool_end );
	} else
		$("#wizard_sum_landhcp").html( "禁用" );

	if ( temp.pwd != "" ) {
		$("#wizard_sum_ap").html( "已更改" );
	}else{
		$("#wizard_sum_ap").html( "未更改" );
	}

	var jsRadios = jsSpec.spec.radios;
	for ( var i = 0; i < jsRadios.length; i++ ) {
		eval( "$(\"#wizard_sum_ssid" + i + "\").html( temp.ssid_" + i + " )" );
	}

	if ( temp.encrypt == "none" ){
		$("#wizard_sum_cipher").html( "None" );
	}else{
		$("#wizard_sum_cipher").html( "WPA/WPA2" );
	}*/


});

