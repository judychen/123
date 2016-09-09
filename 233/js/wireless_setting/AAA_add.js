function myhelp() {
	popHelp("aaaAddScheme");
}

function isInputValid() {
	if (!$("#text_radius_scheme").val()) {
		myAlert("方案名称不能为空！", "text_radius_scheme");
		return false;
	}

	if ( !checkLetterAndNumberAndUnderline( $("#text_radius_scheme").val() ) ) {
		myAlert("方案名称只能包含数字、字母、下划线！", "text_radius_scheme");
		return false;
	}

	if ( isHasChinese( $("#text_radius_scheme").val() ) ) {
		myAlert("方案名称不能包含中文！", "text_radius_scheme");
		return false;
	}

	if ($("#text_pri_auth_server").val() || $("#text_pri_auth_secret").val()){
		if ( checkIP($("#text_pri_auth_server").val()) == false ){
			myAlert("服务器IP地址格式不正确！", "text_pri_auth_server");
			return false;
		}
		
		if ( is_ip_loopback_address( $("#text_pri_auth_server").val() ) ) {
			myAlert("服务器IP地址不能为回环地址!", "text_pri_auth_server");
			return false;
		}
		if ( is_ip_multicast_address( $("#text_pri_auth_server").val()) ) {
			myAlert("服务器IP地址不能为组播地址!", "text_pri_auth_server");
			return false;
		}
		
		if ( is_ip_reserved($("#text_pri_auth_server").val()) ) {
			myAlert("服务器IP地址非法!", "text_pri_auth_server");
			return false;
		}
		
		if (!checkNumberRang($("#text_pri_auth_port").val(), 1, 65535)){
			myAlert("服务器端口不正确！", "text_pri_auth_port");
			return false;
		}
		if (!$("#text_pri_auth_secret").val()) {
			myAlert("请输入服务器密码！", "text_pri_auth_secret");
			return false;
		} else {
			var temp = $("#text_pri_auth_secret").val();
			if ( !checkStringLen(temp, 1, 64) || !checkPassword(temp) ) {
				myAlert("服务器密码格式不正确！", "text_pri_auth_secret");
				return false;
			}
		}
	}
	if ($("#text_pri_acct_server").val()  || $("#text_pri_acct_secret").val()){
		if ( checkIP($("#text_pri_acct_server").val()) == false ){
			myAlert("服务器IP地址格式不正确！", "text_pri_acct_server");
			return false;
		}
		
		if ( is_ip_loopback_address( $("#text_pri_acct_server").val() ) ) {
			myAlert("服务器IP地址不能为回环地址!", "text_pri_acct_server");
			return false;
		}
		if ( is_ip_multicast_address( $("#text_pri_acct_server").val()) ) {
			myAlert("服务器IP地址不能为组播地址!", "text_pri_acct_server");
			return false;
		}
		
		if ( is_ip_reserved($("#text_pri_acct_server").val()) ) {
			myAlert("服务器IP地址非法!", "text_pri_acct_server");
			return false;
		}
		
		if (!checkNumberRang($("#text_pri_acct_port").val(), 1, 65535)){
			myAlert("服务器端口不正确！", "text_pri_acct_port");
			return false;
		}
		if ( !$("#text_pri_acct_secret").val()) {
			myAlert("请输入服务器密码！", "text_pri_acct_secret");
			return false;
		} else {
			var temp = $("#text_pri_acct_secret").val();
			if ( !checkStringLen(temp, 1, 64) || !checkPassword(temp) ) {
				myAlert("服务器密码格式不正确！", "text_pri_acct_secret");
				return false;
			}
		}
	}
	if ($("#text_sec_auth_server").val() || $("#text_sec_auth_secret").val()){
		if ( checkIP($("#text_sec_auth_server").val()) == false ){
			myAlert("服务器IP地址格式不正确！", "text_sec_auth_server");
			return false;
		}
		
		if ( is_ip_loopback_address( $("#text_sec_auth_server").val() ) ) {
			myAlert("服务器IP地址不能为回环地址!", "text_sec_auth_server");
			return false;
		}
		if ( is_ip_multicast_address( $("#text_sec_auth_server").val()) ) {
			myAlert("服务器IP地址不能为组播地址!", "text_sec_auth_server");
			return false;
		}
		
		if ( is_ip_reserved($("#text_sec_auth_server").val()) ) {
			myAlert("服务器IP地址非法!", "text_sec_auth_server");
			return false;
		}
		
		if (!checkNumberRang($("#text_sec_auth_port").val(), 1, 65535)){
			myAlert("服务器端口不正确！", "text_sec_auth_port");
			return false;
		}
		if (!$("#text_sec_auth_secret").val()) {
			myAlert("请输入服务器密码！", "text_sec_auth_secret");
			return false;
		} else {
			var temp = $("#text_sec_auth_secret").val();
			if ( !checkStringLen(temp, 1, 64) || !checkPassword(temp) ) {
				myAlert("服务器密码格式不正确！", "text_sec_auth_secret");
				return false;
			}
		}
	}
	
	if ($("#text_sec_acct_server").val() || $("#text_sec_acct_secret").val()){
		if ( checkIP($("#text_sec_acct_server").val()) == false ){
			myAlert("服务器IP地址格式不正确！", "text_sec_acct_server");
			return false;
		}
		
		if ( is_ip_loopback_address( $("#text_sec_acct_server").val() ) ) {
			myAlert("服务器IP地址不能为回环地址!", "text_sec_acct_server");
			return false;
		}
		if ( is_ip_multicast_address( $("#text_sec_acct_server").val()) ) {
			myAlert("服务器IP地址不能为组播地址!", "text_sec_acct_server");
			return false;
		}
		
		if ( is_ip_reserved($("#text_sec_acct_server").val()) ) {
			myAlert("服务器IP地址非法!", "text_sec_acct_server");
			return false;
		}
		
		if (!checkNumberRang($("#text_sec_acct_port").val(), 1, 65535)){
			myAlert("服务器端口不正确！", "text_sec_acct_port");
			return false;
		}
		if (!$("#text_sec_acct_secret").val()) {
			myAlert("请输入服务器密码！", "text_sec_acct_secret");
			return false;
		} else {
			var temp = $("#text_sec_acct_secret").val();
			if ( !checkStringLen(temp, 1, 64) || !checkPassword(temp) ) {
				myAlert("服务器密码格式不正确！", "text_sec_acct_secret");
				return false;
			}
		}
	}
	if ($("#text_pri_auth_server").val() && ($("#text_pri_auth_server").val()==$("#text_sec_auth_server").val()) &&
			  $("#text_pri_auth_port").val() && ($("#text_pri_auth_port").val()==$("#text_sec_auth_port").val())){
		myAlert("主从认证服务器的IP地址与端口不能完全一致！", "text_sec_auth_port");
		return false;
	}
	if ($("#text_pri_acct_server").val() && ($("#text_pri_acct_server").val()==$("#text_sec_acct_server").val()) &&
			  $("#text_sec_auth_server").val() && ($("#text_pri_acct_port").val()==$("#text_sec_acct_port").val())){
		myAlert("主从计费服务器的IP地址与端口不能完全一致！", "text_sec_acct_port");
		return false;
	}
	
	if (!(($("#text_pri_auth_server").val() && $("#text_pri_auth_port").val() && $("#text_pri_auth_secret").val()) ||
			  ($("#text_sec_auth_server").val() && $("#text_sec_auth_port").val() && $("#text_sec_auth_secret").val()))){
		myAlert("至少配置一个完全的主认证服务器（或从认证服务器）！", "text_pri_auth_server");
		return false;
	}
	
	return true;
}

function addApServiceSuccess(data) {
	goBack();
	return;
}

function ok() {
	if ( !isInputValid() )	
		return;
	var url="setform/form_AAA_add?UID="+parent.uid;
	var f = new myForm();
	
	f.add("radius_scheme", $("#text_radius_scheme").val());
	if ($("#text_pri_auth_server").val()){
		f.add("pri_auth_server", $("#text_pri_auth_server").val());
		f.add("pri_auth_port", $("#text_pri_auth_port").val());
		
		f.add("pri_auth_secret", $("#text_pri_auth_secret").val());
	}
	if ($("#text_pri_acct_server").val()){
		f.add("pri_acct_server", $("#text_pri_acct_server").val());
		f.add("pri_acct_port", $("#text_pri_acct_port").val());
		f.add("pri_acct_secret", $("#text_pri_acct_secret").val());
	}
	if ($("#text_sec_auth_server").val()){
		f.add("sec_auth_server", $("#text_sec_auth_server").val());
		f.add("sec_auth_port", $("#text_sec_auth_port").val());
		f.add("sec_auth_secret", $("#text_sec_auth_secret").val());
	}
	
	if ($("#text_sec_acct_server").val()){
		f.add("sec_acct_server", $("#text_sec_acct_server").val());
		f.add("sec_acct_port", $("#text_sec_acct_port").val());
		f.add("sec_acct_secret", $("#text_sec_acct_secret").val());
	}

	f.submit( url, addApServiceSuccess );
}

function cancel() {
	$("#text_radius_scheme").val("");
	$("#text_pri_acct_server").val("");
	$("#text_pri_acct_port").val("1813");
	$("#text_pri_acct_secret").val("");
	$("#text_sec_acct_server").val("");
	$("#text_sec_acct_port").val("1813");
	$("#text_sec_acct_secret").val("");
	$("#text_pri_auth_server").val("");
	$("#text_pri_auth_port").val("1812");
	$("#text_pri_auth_secret").val("");
	$("#text_sec_auth_server").val("");
	$("#text_sec_auth_port").val("1812");
	$("#text_sec_auth_secret").val("");
}

function init() {
	setNavigationBar("无线设置>AAA认证>新增认证方案");
}
