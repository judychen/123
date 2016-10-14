
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

function checkValidWizardLan(){
	var ip = $("#wizard_lan_ip").val();
	var netmask = $("#wizard_lan_net").val();
	var ip_pool_start = $("#wizard_lan_start").val();
	var ip_pool_end = $("#wizard_lan_end").val();

	if ( ip == "" ) {
		showError(true, "输入的IP地址格式不正确!");
		myAlert("IP地址不能为空!", "text_nat_vlan1_ip");
		return false;
	}

	if ( !checkIP( ip ) ) {
		showError(true, "输入的IP地址格式不正确!");
		myAlert("IP地址格式不正确!", "text_nat_vlan1_ip");
		return false;
	}
	
	if ( netmask == "" ) {
		showError(true, "输入的IP地址格式不正确!");
		myAlert("子网掩码不能为空！", "text_nat_vlan1_netmask");	
		return false;
	}
	if ( !checkMask( netmask ) ) {
		showError(true, "输入的IP地址格式不正确!");
		myAlert("子网掩码格式不正确!", "text_nat_vlan1_netmask");
		return false;
	}
	
	if ( $("#wizard_lan_sel").val() == "enable" ) {
		if ( ip_pool_start == "" ) {
			showError(true, "输入的IP地址格式不正确!");
			myAlert("地址池起始IP地址不能为空！", "text_nat_vlan1_ippool_start");
			return false;
		}
		if ( !checkIP( ip_pool_start ) ) {
			showError(true, "输入的IP地址格式不正确!");
			myAlert("地址池起始IP地址格式不正确!", "text_nat_vlan1_ippool_start");
			return false;
		}
		
		if ( ip_pool_end == "" ) {
			showError(true, "输入的IP地址格式不正确!");
			myAlert("地址池结束IP地址不能为空！", "text_nat_vlan1_ippool_end");
			return false;
		}
		if ( !checkIP( ip_pool_end ) ) {
			showError(true, "输入的IP地址格式不正确!");
			myAlert("地址池结束IP地址格式不正确!", "text_nat_vlan1_ippool_end");
			return false;
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
			showError(true, "输入的IP地址格式不正确!");
			myAlert("地址池结束IP地址不能小于地址池开始IP地址！", "text_nat_vlan1_ippool_end");
			return false;
		}
		
	}

	

	return true;

}

function validWizardLan(){
	if(!checkValidWizardLan()){
		return false;
	}

	arrIS.ip = $("#wizard_lan_ip").val();
	arrIS.netmask = $("#wizard_lan_net").val();
	arrIS.dhcpd_enable = $("#wizard_lan_sel").val();
	
	if(arrIS.dhcpd_enable){
		arrIS.ippool_start = $("#wizard_lan_start").val();
		arrIS.ippool_end = $("#wizard_lan_end").val();
	}
	
	return true;
}


$(function () {
	
	
	/*if ( typeof(arrIS.ip) != "undefined" ) {
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
	}*/


	$("#wizard_lan_sel").change( lan_dhcpd_enable_changed );
});
