var wireless = {
	"ssid": "",
	"radio": "",
	"enable": "",
	"enableSSID": "",
	"maxclient":"",
	"auth":"",
	"wepkey":"",
	"wpakey":""
}

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
		if($("#wl_add_wepkey").val() == ""){
			showError(true, "密码不能为空！");
			return false;
		}else if($("#wl_add_wepkey").val().length != "5"){
			showError(true, "密码长度不正确！");
			return false;
		}else if(!checkUserOrPwd($("#wl_add_wepkey").val())){
			showError(true, "密码不正确！");
			return false;
		}
	}else if($("#wl_add_sel_auth").val() == "wpa"){
		
		if($("#wl_add_wpakey").val() == ""){
			showError(true, "密码不能为空！");
			return false;
		}else if(!checkStringLen($("#wl_add_wpakey").val(),8,63)){
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

	wireless.ssid = $("#wl_add_ssid").val();
	if($("#wl_add_radio_2.4").attr("checked") == "" || $("#wl_add_radio_5").attr("checked") == ""){
		wireless.radio = 0;
	}else if($("#wl_add_radio_2.4").attr("checked") == "checked" && $("#wl_add_radio_5").attr("checked") == "checked"){
		wireless.radio = 3;
	}else if($("#wl_add_radio_2.4").attr("checked") == "checked"){
		wireless.radio = 1;
	}else{
		wireless.radio = 2;
	}

	wireless.enable = $("#wl_add_enable").attr("checked");
	wireless.enableSSID = $("#wl_add_enableSSID").attr("checked");
	wireless.maxclient = $("#wl_add_maxclient").val();
	wireless.auth = $("#wl_add_sel_auth").val();
	if(wireless.auth == "wep"){
		wireless.wepkey = $("#wl_add_wepkey").val();
	}else if(wireless.auth == "wpa"){
		wireless.wpakey = $("#wl_add_wpakey").val();
	}

	return true;

}

function editApService(){

}

function delApService(){

}

var wl = new myGrid("wl");

$(function(){

		wl.pageview_add('SSID', 0, '20%', MG_SORT_ASCII);
		wl.pageview_add('使能状态', 1, '10%', MG_SORT_ASCII);

		for ( var i = 0; i < jsSpec.spec.radios.length; i++ ) {
			var radio = jsSpec.spec.radios[i];
			wl.pageview_add("射频" + radio.name, 1+i, "10%", 
				MG_SORT_SELF, null, null, interface_sort_asc, interface_sort_dsc);
		}
		wl.pageview_add('最大连接数', 5, '20%', MG_SORT_NUM);
		wl.pageview_add('认证方式', 6, '20%', MG_SORT_ASCII);
		
		wl.pageview_add_btn("编辑",editApService);
		wl.pageview_add_btn("删除",delApService);

	
var count = 0;
		for ( var i = 0; i < jsServTpl.pkg_wlan_service_template.length; i++ ) {
			//get service template ssid
			var servTpl = jsServTpl.pkg_wlan_service_template[i];	
			//client_max, ssid,authentication,service-template
			if ( typeof(servTpl.ssid) == "undefined" ) {
				servTpl.ssid = "";
			}

			if ( typeof(servTpl.client_max) == "undefined" ) {
				servTpl.client_max = "";
			}

			arrServTplList[count] = "";
			arrServTplList[count] += servTpl.ssid;
			arrServTplList[count] += ";";
			arrServTplList[count] += servTpl.client_max;
			arrServTplList[count] += ";";
			arrServTplList[count] += get_cipher( servTpl.authentication, servTpl.cipher );
			arrServTplList[count] += ";";

			var servTplIndex = servTpl.sect_name.slice(15);
			var arrBss = getBss(servTplIndex);	//每个raido下是否有BSS对应该服务模板

			arrServTplList[count] += servTplIndex;
			arrServTplList[count] += ";";
			if ( servTpl["service-template"] == "enabled" ) {
				arrServTplList[count] += "开启;";
				for ( k = 0; k < arrBss.length; k++ ) {
					if ( arrBss[k] != null ){
						if ( isBssEnable( arrBss[k] ) ){ //service template enable && WLAN-BSS enable
							arrServTplList[count] += "WLAN-BSS"+arrBss[k]+";";
						}
						else
							arrServTplList[count] += ";";
							
					} else
						arrServTplList[count] += ";";
				}

			} else {
				arrServTplList[count] += "关闭;";
				for ( k=0; k < arrBss.length; k++ ){
					if ( arrBss[k] != null ){
						arrServTplList[count] += "WLAN-BSS"+arrBss[k]+";";
					} else
						arrServTplList[count] += ";";
				}
			}
			

			count++;
		}

			wl.pageview_init(arrServTplList, 10, 'list_table' );










	}



	//btn:add,ok,cancel
	$("#wireless_add_btn").click(function(){
		$("#wl_add_ssid").val("");
		$("#wl_add_radio_2.4").val("checked","checked");
		$("#wl_add_radio_5").attr("checked","checked");
		$("#wl_add_enable").attr("checked","checked");
		$("#wl_add_enableSSID").attr("checked","checked");
		$("#wl_add_maxclient").val("127");
		$("#wl_add_sel_auth").val("none");
		$("#wl_add_wepkey").val("");
		/*$("#wl_add_wepmode").val("open");*/ //单选没处理好，先不管
		$("#wl_add_wpakey").val("");
		/*$("#wl_add_wpamode").val("wpa2");
		$("#wl_add_wpacipher").val("ccmp");*/

		$(".wep_tr").hide();
        $(".wpa_tr").hide(); 

		$("#wireless_add").show();
		$("#wireless_add").siblings().hide();
	});

	$("#wireless_add_ok").click(function(){
		vilidWireless();
		if(vilidWireless()){			
			$("#wireless_add").hide();
			$("#wireless_add").siblings().show();
		}
	});

	$("#wireless_add_cancel").click(function(){

		$("#wireless_add").hide();
		$("#wireless_add").siblings().show();
	});
	
	$(".sel_auth").change(changeAuth);






















});