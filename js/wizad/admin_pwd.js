var arrAP;
/*
* pwd
* pwd_check
*/

$(function () {
    arrAP = loadWizardProgress("wizard_admin_pwd");
	setNavigationBar("配置向导>设备密码");
	
	var pwd = arrAP.pwd;
	var pwd_check = arrAP.pwd_check;
		
	$("#wizard_password").val( pwd );
	$("#wizard_password_check").val( pwd_check );
		
});

function isInputValid() {
    /*todo*/
}

function ok() {
    /*todo*/
}