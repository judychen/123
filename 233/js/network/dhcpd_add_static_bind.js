function myhelp() {
	popHelp("dhcpd_addStatic");
}

function goBack(){
	var url = "dhcpd.asp?UID="+parent.uid+"&tabMenu=static";
	pageJump(url);
}

function isInputValid(){
	if (!$("#text_mac").val()) {
		myAlert("MAC地址不能为空！", "text_mac");
		return false;
	}

	var exp = /^[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}$/;
	var mac = $("#text_mac").val();
	if ( !exp.test(mac)  ) {
		myAlert("MAC地址格式不正确！", "text_mac");
		return false;
	}

	if (!$("#text_ip").val()) {
		myAlert("IP地址不能为空！", "text_ip");
		return false;
	}

	var ip = $("#text_ip").val();
	if ( !checkIP(ip) ){
		myAlert("IP地址格式不正确！", "text_ip");
		return false;
	}

	if ( is_ip_loopback_address( ip ) ) {
		myAlert("IP地址不能为环回地址!", "text_ip");
		return false;
	}

	if ( is_ip_multicast_address( ip ) ) {
		myAlert("IP地址不能为组播地址!", "text_ip");
		return false;
	}
	
	return true;
}

function addAclSuccess(data) {
	goBack();
	return;
}
function ok() {
	if ( !isInputValid() )	
		return;
	var url="setform/form_dhcpd_add_static_bind?UID="+parent.uid;
	var f = new myForm();
	f.add("mac", $("#text_mac").val());
	f.add("ip", $("#text_ip").val());
	f.submit( url, addAclSuccess );
}

function init() {
	setNavigationBar("网络设置>DHCP>新增静态地址绑定");
}
