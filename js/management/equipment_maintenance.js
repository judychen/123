
function reboot(){
	myAlertSelect("确定要重启设备吗？", select_reboot);

}



$(function(){
	/*软件重启*/
	var temp = jsDataDevice.device[0];
	/*???*/
	$("#reboot_btn").click(reboot);
	/*保存当前配置未做*/

	/*软件升级*/
	var temp = jsDataDevice.device[0];
	$("#current_softversion").html(temp.softversion);
	$("#current_hardversion").html(temp.hardversion);
	$(".radio_method").click(changeMethod);
	
	

});