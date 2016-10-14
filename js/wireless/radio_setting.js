var radioS;
/*
* status
* mode
* channel
* maxpower
* beacon
* dtim
* fragThreshold
* rtsThreshold
* lowRssi
* ratelimit
* atf
*/

function checkValidRadio0(){

	if(!checkValidWizardpwd()){
		return false;
	}

	arrIS.pwd = $("#wizard_password").val();

	return true;

}





$(function(){
	$("#radio_setting0_ok").click();
	$("#radio_setting0_cancel").click();

	$("#radio_setting1_ok").click();
	$("#radio_setting1_cancel").click();
});