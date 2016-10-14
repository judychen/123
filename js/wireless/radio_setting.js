var radio0S;
var radio1S;
/*
* status
* mode
* channel
* maxpower
* beacon
* dtim
* fragThreshold
* rtsThreshold
* rssi
* ratelimit
*/

function checkValidRadio0(){





	return true;

}


function validRadio0(){

	if(checkValidRadio0()){
		radio0S.status = $("#wizard_password").val();
		radio0S.mode = $("#wizard_password").val();
		radio0S.channel = $("#wizard_password").val();
		radio0S.maxpower = $("#wizard_password").val();
		radio0S.beacon = $("#wizard_password").val();
		radio0S.dtim = $("#wizard_password").val();
		radio0S.fragThreshold = $("#wizard_password").val();
		radio0S.rtsThreshold = $("#wizard_password").val();
		radio0S.rssi = $("#wizard_password").val();
		radio0S.ratelimit = $("#wizard_password").val();
	}

	


}





$(function(){
	$("#radio_setting0_ok").click();
	$("#radio_setting0_cancel").click();

	$("#radio_setting1_ok").click();
	$("#radio_setting1_cancel").click();
});