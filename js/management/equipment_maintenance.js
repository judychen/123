
function reboot(){
	myAlertSelect("确定要重启设备吗？", select_reboot);

}



$(function(){
	var temp = jsDataDevice.device[0];
	/*???*/
	$("#reboot_btn").click(reboot);
	selectOk();
	$(".box_setwid").click(showSelect(false));
	$("#selectReboot_cancelBtn").click(showSelect(false));

	/*软件升级*/
/*	var arrJqObj = $()*/

});