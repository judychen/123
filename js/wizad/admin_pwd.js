
/*
* pwd
* pwd_check
*/
function checkValidWizardpwd(){
	if($("#wizard_password").val() == ""){
		showError(true, "密码不能为空");
		return false;
	}else{
		if(checkUserOrPwd($("#wizard_password").val())==false)
		{
			
			showError(true, "密码格式不正确！");
			return false;
		}

		if($("#wizard_password").val() != $("#wizard_password_check").val()){
			showError(true, "密码不一致！");
			return false;
		}
	}

	return true;	
}

function validWizardAdpwd(){
	if(!checkValidWizardpwd()){
		return false;
	}

	arrIS.pwd = $("#wizard_password").val();

	return true;
}
