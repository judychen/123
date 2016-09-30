
function reboot(){
	
	myAlertSelect("确定要重启设备吗？", select_reboot);

}

function restdefault(){
	myAlertSelect("恢复出厂设置后设备将重启，确定要恢复吗？", select_reboot);//使用的重启的函数，待改
}

function changeMethod(){
    $this = $(this);
    if($this.next().html() == "Local"){
        $(".local_tr").show();
        $(".ftp_tr").hide();
        $(".tftp_tr").hide();
       
    }else if ($this.next().html() == "FTP") {
        $(".ftp_tr").show();
        $(".local_tr").hide();
        $(".tftp_tr").hide();
        
    }else{
        $(".tftp_tr").show();
        $(".local_tr").hide();
        $(".ftp_tr").hide();   
    }
}

function upgrade(){
	var arrJqObj = $(".radio_method");
	for(var i = 0; i < arrJqObj.length; i++){
		var tmp = arrJqObj[i];
		if(tmp.checked){
			if($this.next().html() == "Local"){
				if ( $("#upgrade_file").val() == "" ) {
					myAlert("请选择升级文件！");
					return;
				}else{
					myAlertSelect("设备升级完成后将自动重启,确定要升级吗？", select_reboot);//用的是reboot的要改
				/*数据传输暂放*/
				}
				
	    	}else if ($this.next().html() == "FTP") {
	    	     /*填写检查先放放*/

	    		myAlertSelect("设备升级完成后将自动重启,确定要升级吗？", select_reboot);
	    		/*数据传输暂放*/
	        
	        
	    	}else{
	    		/*填写检查先放放*/
	    		myAlertSelect("设备升级完成后将自动重启,确定要升级吗？", select_reboot);
	    		/*数据传输暂放*/
	        
    		}

		}
	}
}



$(function(){
	/*软件重启*/
	var temp = jsDataDevice.device[0];
	/*???*/
	$("#reboot_btn").click(reboot);
	/*保存当前配置未做,实际的数据恢复未做*/

	$("#restore_btn").click(restdefault);

	/*软件升级*/
	var temp = jsDataDevice.device[0];
	$("#current_softversion").html(temp.softversion);
	$("#current_hardversion").html(temp.hardversion);
	$(".radio_method").click(changeMethod);
	$("#upgradebtn").click(upgrade);
	/*输入框未判断，升级操作实际未执行*/
	

});