/*var wireless = new Object{

}*/

function changeAuth(){
    if($(".sel_auth").val() == "wep"){
        $(".wep_tr").show();
        $(".wpa_tr").hide();
       
    }else if ($(".sel_auth").val() == "wpa") {
        $(".wep_tr").hide();
        $(".wpa_tr").show();
        
    }else{
        $(".wep_tr").hide();
        $(".wpa_tr").hide(); 
    }
}

function checkVilidWireless(){
	if ($("#wl_add_ssid").val() == ""){
		showError(true, "SSID名称不能为空！");
		return false;
	}

	if (!checkSSID($("#wl_add_ssid").val())){
		showError(true, "非法的SSID");
		return false;
	}

	if (!checkNumberRang($("#wl_add_maxclient").val(), 1, 127 )){
		showError(true, "最大客户端接入数量不正确！");
		return false;
	}

	if($("#wl_add_sel_auth").val() == "wep"){
		console.log("wep");
		if($("#wl_add_wepkey").val().length != "5"){
			showError(true, "密码长度不正确！");
			return false;
		}else if(!checkUserOrPwd($("#wl_add_wepkey").val())){
			showError(true, "密码不正确！");
			return false;
		}
	}else if($("#wl_add_sel_auth").val() == "wpa"){
		console.log("wpa");
		if(!checkStringLen($("#wl_add_wpakey").val(),8,63)){
			showError(true, "密码长度不正确！");
			return false;
		}else if(!checkUserOrPwd($("#wl_add_wpakey").val())){
			showError(true, "密码不正确！");
			return false;
		}
	}

	return true;
}

function vilidWireless(){

	if(!checkVilidWireless()){
		return false;
	}



	return true;

}

$(function(){
	//btn:add,ok,cancel
	$("#wireless_add_btn").click(function(){
		$("#wireless_add").show();
		$("#wireless_add").siblings().hide();
	});

	$("#wireless_add_ok").click(function(){
		vilidWireless();
		if(vilidWireless()){
			$("#wl_add_ssid").val("");
			$("#wl_add_radio_2.4").val("checked","checked");
			$("#wl_add_radio_5").attr("checked","checked");
			$("#wl_add_enable").attr("checked","checked");
			$("#wl_add_enable").attr("checked","checked");
			$("#wl_add_enableSSID").attr("checked","checked");
			$("#wl_add_maxclient").val("127");
			$("#wl_add_up").val("disable");
			$("#wl_add_down").val("disable");
			$("#wl_add_acl").removeAttr("checked");
			$("#wl_add_time").removeAttr("checked");
			$("#wl_add_sel_auth").val("none");
			$("#wl_wl_add_wepkey").val("");
			/*$("#wl_add_wepmode").val("open");*/ //单选没处理好，先不管
			$("#wl_add_wpakey").val("");
			/*$("#wl_add_wpamode").val("wpa2");
			$("#wl_add_wpacipher").val("ccmp");*/

			$(".wep_tr").hide();
        	$(".wpa_tr").hide(); 

			$("#wireless_add").hide();
			$("#wireless_add").siblings().show();
		}
	});

	$("#wireless_add_cancel").click(function(){
		//与上同，初始化设置

		$("#wl_add_ssid").val("");
		$("#wl_add_radio_2.4").val("checked","checked");
		$("#wl_add_radio_5").attr("checked","checked");
		$("#wl_add_enable").attr("checked","checked");
		$("#wl_add_enable").attr("checked","checked");
		$("#wl_add_enableSSID").attr("checked","checked");
		$("#wl_add_maxclient").val("127");
		$("#wl_add_up").val("disable");
		$("#wl_add_down").val("disable");
		$("#wl_add_acl").removeAttr("checked");
		$("#wl_add_time").removeAttr("checked");
		$("#wl_add_sel_auth").val("none");
		$("#wl_wl_add_wepkey").val("");
		/*$("#wl_add_wepmode").val("open");*/ //单选没处理好，先不管
		$("#wl_add_wpakey").val("");
		/*$("#wl_add_wpamode").val("wpa2");
		$("#wl_add_wpacipher").val("ccmp");*/

		$(".wep_tr").hide();
       	$(".wpa_tr").hide(); 




		$("#wireless_add").hide();
		$("#wireless_add").siblings().show();
	});
	
	$(".sel_auth").change(changeAuth);

	//add






});