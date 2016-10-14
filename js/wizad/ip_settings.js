
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

		$("#ip_sel_dnsmode").val("auto");
		$("#ip_sel_dnsmode").removeAttr("disabled");
		$(".ip_dns_static").hide();
	} else if ( $("#ip_sel_ipmode").val() == "static") {
		
		$(".ip_static").show();
		$(".ip_pppoe").hide();
		
		$("#ip_sel_dnsmode").val("static");
		$("#ip_sel_dnsmode").attr("disabled", "disabled");
		$(".ip_dns_static").show();

	}else if( $("#ip_sel_ipmode").val() == "pppoe"){
		
		$(".ip_static").hide();
		$(".ip_pppoe").show();

		$("#ip_sel_dnsmode").val("auto");
		$("#ip_sel_dnsmode").removeAttr("disabled");
		$(".ip_dns_static").hide();

	}
}

function changeDnsMode(){
	if ( $("#ip_sel_dnsmode").val() == "auto") {
		$(".ip_dns_static").hide();
	} else {
		$(".ip_dns_static").show();
	}
}

function checkValidWizardIp(){
	
	
	if($("#ip_sel_ipmode").val() == "static"){
		if(!checkIP($("#ip_static_ip").val())){
			showError(true, "输入的IP地址格式不正确!");
			return false;
		}
		if(!checkMask($("#ip_static_netmask").val())){
			showError(true, "输入的子网掩码格式不正确!");
			return false;
		}

		if( $("#ip_static_gateway").val() != ""  ) {
			if ( !checkIP( $("#ip_static_gateway").val() ) ) {
				showError(true, "输入的默认路由地址格式不正确!");
				return false;
			}
		}
	}else if($("#ip_sel_ipmode").val() == "pppoe"){
		if($("#ip_pppoe_account").val() == "")
		{
			showError(true, "用户名不能为空!");
			return false;
		}
		if($("#ip_pppoe_password").val() == "")
		{
			showError(true, "用户密码不能为空!");
			return false;
		}
		if ( isHasChinese( $("#ip_pppoe_account").val() ) ) {
			showError(true, "字符串不能包含中文！");
			return false;
		}
		if ( isHasChinese( $("#ip_pppoe_password").val() ) ) {
			showError(true, "字符串不能包含中文！");
			return false;
		}
		if ( isHasChinese( $("#ip_pppoe_name").val() ) ) {
			showError(true, "字符串不能包含中文！");
			return false;
		}
		if ( isHasChinese( $("#ip_pppoe_server").val() ) ) {
			showError(true, "字符串不能包含中文！");
			return false;
		}
		if (!checkNumberRang($("#ip_pppoe_mtu").val(), 128, 1492)){
			showError(true, "非法的MTU值！");
			return false;
		}
		if(checkUserOrPwd($("#ip_pppoe_password").val())==false)
		{
			showError(true, "非法的初始密码！");
			return false;
		}
		if(checkUserOrPwd($("#ip_pppoe_account").val())==false)
		{
			showError(true, "非法的用户名！");
			return false;
		}
		if(checkUserOrPwd($("#ip_pppoe_server").val())==false)
		{
			if(!$("#ip_pppoe_server").val() == "")
			{
				showError(true, "非法的服务名！");
				return false;
			}
		}
		if(checkUserOrPwd($("#ip_pppoe_name").val())==false)
		{
			if(!$("#ip_pppoe_name").val() == "")
			{
				showError(true, "非法的服务器名！");
				return false;
			}
		}

	}
	
	var first_dns = $("#ip_dns_static1").val();
	var second_dns = $("#ip_dns_static2").val();

	//shoud add static and dhcp check
	if ( first_dns != "" && !checkIP( first_dns ) ) {
			showError(true, "输入的DNS服务器IP格式不正确!");
			return false;
		}
		if ( second_dns != "" && !checkIP( second_dns ) ) {
			showError(true, "输入的备份DNS服务器IP格式不正确!");
			return false;
		}

		if ( first_dns != "" && first_dns == second_dns ) {
			showError(true, "两个DNS服务器IP不能相同！");
			return false;
		}

	return true;

}

function validWizardIp(){
	if(!checkValidWizardIp()){
		return false;
	}

	arrIS.ip_mode = $("#ip_sel_ipmode").val();
	arrIS.static_ip = $("#ip_static_ip").val();
	arrIS.static_netmask = $("#ip_static_netmask").val();
	arrIS.static_gateway = $("#ip_static_gateway").val();
	arrIS.pppoe_account = $("#ip_pppoe_account").val();
	arrIS.pppoe_password = $("#ip_pppoe_password").val();
	arrIS.pppoe_mtu = $("#ip_pppoe_mtu").val();
	arrIS.pppoe_servicesname = $("#ip_pppoe_name").val();
	arrIS.pppoe_acname = $("#ip_pppoe_server").val();

	arrIS.dns_mode = $("#ip_sel_dnsmode").val();
	arrIS.dns_first = $("#ip_dns_static1").val();
	arrIS.dns_second = $("#ip_dns_static2").val();

	return true;
	
}

$(function () {

	/*监听下拉框，有变化时，变化显示*/
	$("#ip_sel_ipmode").change( changeIpMode );
	$("#ip_sel_dnsmode").change( changeDnsMode );

	/*子网掩码判断，先不做*/
	
});






















