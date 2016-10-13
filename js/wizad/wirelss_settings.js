
/****** struct of arrIS ******
* ssid_0	//2.4g
* ssid_1	//5g
* encrypt
* psk
*****************************/

function changeEncrypt() {
    var encrypt = $("#wizard_sel_encrypt").val();

    if(encrypt == "none"){
    	$(".wizard_wpa").hide();
    }else{
    	$(".wizard_wpa").show();
    }

}

function checkValidWizardWireless(){
	if($("#wizard_ssid_0").val() == "" || $("#wizard_ssid_1").val() == ""){
		showError(true, "SSID不能为空");
		return false;
	}else{
		if(checkUserOrPwd($("#wizard_ssid_0").val())==false || checkUserOrPwd($("#wizard_ssid_1").val())==false)
		{
			
			showError(true, "SSID格式不正确！");
			return false;
		}	
	}

	if($("#wizard_sel_encrypt").val() == "wap2"){
		if($("#wizard_wpa_sec").val() == ""){
			showError(true, "共享密钥不能为空");
			return false;
		}else{

			if ( checkStringLen( $("#wizard_wpa_sec").val(), 8, 63 ) == false ) {
				showError(true, "共享密钥长度不正确，应为8-63个字符！");
				return false;
			}

			if(checkUserOrPwd($("#wizard_wpa_sec").val())==false){
				
				showError(true, "共享密钥格式不正确！");
				return false;
			}	


		}
	}

	return true;
}

function validWizardWireless(){
	if(!checkValidWizardWireless()){
		return false;
	}

	arrIS.ssid_0 = $("#wizard_ssid_0").val();
	arrIS.ssid_1 = $("#wizard_ssid_1").val();
	arrIS.encrypt = $("#wizard_sel_encrypt").val();
	arrIS.psk = $("#wizard_wpa_sec").val();

	return true;
}

$(function () {
    
	$("#wizard_sel_encrypt").change(changeEncrypt);

});
