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
    /*todo*/
}

function changeDNSMode() {
    /*todo*/
}

function init() {
    /*todo*/
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

function change_ip_mode() {
    /*todo*/
}

$(function () {
	arrIS = loadWizardProgress("wizard_ip_settings");
	setNavigationBar("配置向导>IP地址");
	if ( typeof(arrIS.ip_mode) != "undefined" ){
		$("#sel_ip_mode").val( arrIS.ip_mode );
		if(arrIS.ip_mode == "dhcp"){

		}else if ( arrIS.ip_mode == "static" ){

		}else if ( arrIS.ip_mode == "pppoe" ){
			
		}
	}else{

	}
});




















