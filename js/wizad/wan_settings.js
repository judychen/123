var arrIS;
/****** struct of arrIS ******
* wan_ip_mode
* wan_static_ip
* wan_static_netmask
* wan_static_gateway
* wan_dns_mode
* wan_dns_first
* wan_dns_second
*****************************/

function changeWanIpMode(){
	if ( $("#wan_sel_ipmode").val() == "dhcp" ) {
		
		$(".wan_static").hide();
		$(".wan_pppoe").hide();

		$("#wan_sel_dnsMode").val("auto");
		$(".wan_dns_static").hide();
	} else if ( $("#wan_sel_ipmode").val() == "static") {
		
		$(".wan_static").show();
		$(".wan_pppoe").hide();
		$("#wan_sel_dnsMode").attr("disabled", "disabled");
		$("#wan_sel_dnsMode").val("static");
		console.log($("#wan_sel_dnsMode").val());
		$(".wan_dns_static").show();

	}else if( $("#wan_sel_ipmode").val() == "pppoe"){
		
		$(".wan_static").hide();
		$(".wan_pppoe").show();

		$("#wan_sel_dnsMode").attr("disabled", "disabled");
		$("#wan_sel_dnsMode").val("auto");
		$(".wan_dns_static").hide();

	}
}

function changeWanDnsMode(){
	if ( $("#wan_sel_dnsmode").val() == "auto") {
		$(".wan_dns_static").hide();
	} else {
		$(".wan_dns_static").show();
	}
}

//未
function checkValidWizardWan(){
		
	if($("#wan_sel_ipmode").val() == "static"){
		if(!checkIP($("#wan_static_ip").val())){
			showError(true, "输入的IP地址格式不正确!");
			return false;
		}
		if(!checkMask($("#wan_static_netmask").val())){
			showError(true, "输入的子网掩码格式不正确!");
			return false;
		}

		if( $("#wan_static_gateway").val() != ""  ) {
			if ( !checkIP( $("#wan_static_gateway").val() ) ) {
				showError(true, "输入的默认路由地址格式不正确!");
				return false;
			}
		}
	}else if($("#wan_sel_ipmode").val() == "pppoe"){
		if($("#wan_pppoe_account").val() == "")
		{
			showError(true, "用户名不能为空!");
			return false;
		}
		if($("#wan_pppoe_password").val() == "")
		{
			showError(true, "用户密码不能为空!");
			return false;
		}
		if ( isHasChinese( $("#wan_pppoe_account").val() ) ) {
			showError(true, "字符串不能包含中文！");
			return false;
		}
		if ( isHasChinese( $("#wan_pppoe_password").val() ) ) {
			showError(true, "字符串不能包含中文！");
			return false;
		}
		if ( isHasChinese( $("#wan_pppoe_name").val() ) ) {
			showError(true, "字符串不能包含中文！");
			return false;
		}
		if ( isHasChinese( $("#wan_pppoe_server").val() ) ) {
			showError(true, "字符串不能包含中文！");
			return false;
		}
		if (!checkNumberRang($("#wan_pppoe_mtu").val(), 128, 1492)){
			showError(true, "非法的MTU值！");
			return false;
		}
		if(checkUserOrPwd($("#wan_pppoe_password").val())==false)
		{
			showError(true, "非法的初始密码！");
			return false;
		}
		if(checkUserOrPwd($("#wan_pppoe_account").val())==false)
		{
			showError(true, "非法的用户名！");
			return false;
		}
		if(checkUserOrPwd($("#wan_pppoe_server").val())==false)
		{
			if(!$("#wan_pppoe_server").val() == "")
			{
				showError(true, "非法的服务名！");
				return false;
			}
		}
		if(checkUserOrPwd($("#wan_pppoe_name").val())==false)
		{
			if(!$("#wan_pppoe_name").val() == "")
			{
				showError(true, "非法的服务器名！");
				return false;
			}
		}

	}
	
	var first_dns = $("#wan_dns_static1").val();
	var second_dns = $("#wan_dns_static2").val();

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
	if(!checkValidWizardWan()){
		return false;
	}

	arrIS.wan_ip_mode = $("#wan_sel_ipmode").val();
	arrIS.wan_static_ip = $("#wan_static_ip").val();
	arrIS.wan_static_netmask = $("#wan_static_netmask").val();
	arrIS.wan_static_gateway = $("#wan_static_gateway").val();
	arrIS.wan_pppoe_account = $("#wan_pppoe_account").val();
	arrIS.wan_pppoe_password = $("#wan_pppoe_password").val();
	arrIS.wan_pppoe_mtu = $("#wan_pppoe_mtu").val();
	arrIS.wan_pppoe_servicesname = $("#wan_pppoe_name").val();
	arrIS.wan_pppoe_acname = $("#wan_pppoe_server").val();

	arrIS.wan_dns_mode = $("#wan_sel_dnsmode").val();
	arrIS.wan_dns_first = $("#wan_dns_static1").val();
	arrIS.wan_dns_second = $("#wan_dns_static2").val();

	return true;
	
}

$(function () {

	/*监听下拉框，有变化时，变化显示*/
	$("#wan_sel_ipmode").change( changeWanIpMode );
	$("#wan_sel_dnsmode").change( changeWanDnsMode );

	/*子网掩码判断，先不做*/
	
});
