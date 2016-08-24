var arrAP; //admin password
/*
* pwd
* pwd_check
*/

function myhelp() {
	popHelp("wizardSettings_admin_pwd");
}

$(document).ready( function() {
	$("#text_fake_password").focus( function(){
		$(".tr_fake_password").css("display", "none");
		$(".tr_real_password").css("display", "table-row");
		$("#text_password").focus().select();
	});
	$("#text_fake_password_check").focus( function(){
		$(".tr_fake_password").css("display", "none");
		$(".tr_real_password").css("display", "table-row");
		$("#text_password_check").focus().select();
	});

	$("#text_password").blur( function(){
		if ( $("#text_password").val() == ""
				&& $("#text_password_check").val() == "") {
			$(".tr_fake_password").css("display", "table-row");
			$(".tr_real_password").css("display", "none");
		}
	});

	$("#text_password_check").blur( function(){
		if ( $("#text_password").val() == ""
				&& $("#text_password_check").val() == "") {
			$(".tr_fake_password").css("display", "table-row");
			$(".tr_real_password").css("display", "none");
		}
	});

	arrAP = loadWizardProgress("wizard_admin_pwd");

	init();
});

function init() {
	setNavigationBar("配置向导>设备密码");

	if ( typeof(arrAP.status) == "undefined" ) {
		$(".tr_fake_password").css("display", "table-row");
		$(".tr_real_password").css("display", "none");
	} else {
		var pwd = arrAP.pwd;
		var pwd_check = arrAP.pwd_check;
		
		if ( pwd == "" && pwd_check == "" ) {
			$(".tr_fake_password").css("display", "table-row");
			$(".tr_real_password").css("display", "none");
		} else {
			$(".tr_fake_password").css("display", "none");
			$(".tr_real_password").css("display", "table-row");
			$("#text_password").val( pwd );
			$("#text_password_check").val( pwd_check );
		}
	}
}

function isInputValid() {
	if ( $("#text_password").val() == "" && $("#text_password_check").val() == "" )
		return true;

	if ( $("#text_password").val() == "" && $("#text_password_check").val() == "" ) {
		myAlert( "用户密码不能为空！", "text_password" );		
		return false;
	}

	if ( checkPassword( $("#text_password").val()) == false ) {
		myAlert("输入的密码格式不正确！", "text_password");
		return false;
	}

	if ( $("#text_password").val() != $("#text_password_check").val() ) {
		myAlert( "两次输入的用户密码不一致！", "text_password_check" );		
		return false;
	}

	return true;
}

function ok() {
	arrAP.pwd = $("#text_password").val();
	arrAP.pwd_check = $("#text_password_check").val();
}
