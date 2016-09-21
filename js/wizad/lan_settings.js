var arrIS;
/****** struct of arrIS ******
* ip 
* netmask 
* dhcpd_enable 
* ippool_start
* ippool_end
*****************************/
function ok() {
    /*todo*/
}

function isInputValid() {
    /*todo*/
}

function lan_dhcpd_enable_changed() {
    if ( $("#wizard_lan_sel").val() == "enable" )
		$(".wizard_lan_ippoool").show();
	else
		$(".wizard_lan_ippoool").hide();
}

$(function () {
	arrIS = loadWizardProgress("wizard_lan_settings");

	setNavigationBar("配置向导>LAN设置");

	if ( typeof(arrIS.ip) != "undefined" ) {
		$("#wizard_lan_ip").val( arrIS.ip );
		$("#wizard_lan_net").val( arrIS.netmask );
	}
	if ( typeof(arrIS.dhcpd_enable) != "undefined" ) {
		if ( arrIS.dhcpd_enable == "enable" ) {
			$("#wizard_lan_sel").val("enable");
			$("#wizard_lan_start").val( arrIS.ippool_start );
			$("#wizard_lan_end").val( arrIS.ippool_end );
		} else {
			$("#wizard_lan_sel").val("disable");
		}
	}


	$("#wizard_lan_sel").change( lan_dhcpd_enable_changed );
});
