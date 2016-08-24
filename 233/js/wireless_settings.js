var arrData;
/****** struct of arrIS ******
* ssid_1	//2.4g
* ssid_2	//5g
* encrypt
* psk
*****************************/

function myhelp() {
	popHelp("wizardSettings_wireless_settings");
}

function changeEncrypt() {
	var encrypt = $("#sel_encrypt").val();

	if ( encrypt == "wpa_mix" ) {
		$(".part_tr_wpa").css("display", "table-row");
	} else {
		$(".part_tr_wpa").css("display", "none");
	}
}

$(document).ready( function() {
	arrData = loadWizardProgress("wizard_wireless_settings");

	init();
});

function generate_ssid_input() {
	var str = "";
	var radios = jsSpec.spec.radios;
	for ( var i = 0 ; i < radios.length; i++ ) {
		str += "<tr>";
		str += "<td class=\"col1\">" + radios[i].name + " SSID：</td>";
		str += "<td class=\"col2\"><input type=\"text\" id=\"text_ssid_" + i + "\" size=\"20\" maxlength=\"32\" />（1-32个字符，不包含 ? \" ; \\）</td>";
		str += "</tr>";
	}
	$("#tbl_ssid").html( str );
}

function init() {
	setNavigationBar("配置向导>无线设置");

	generate_ssid_input();
	var jsRadios = jsSpec.spec.radios;

	if ( typeof(arrData.ssid_0) != "undefined" ) {

		for ( var i = 0; i < jsRadios.length; i++ ) {
			eval("$(\"#text_ssid_" + i + "\").val( arrData.ssid_" + i + ")");
			//$("#text_ssid_" + i ).val( jsRadios[i].default_value );
		}
		//$("#text_ssid_2").val( arrData.ssid_2);
	} else {
		for ( var i = 0; i < jsRadios.length; i++ ) {
			$("#text_ssid_" + i ).val( jsRadios[i].default_ssid );
		}
	}

	if ( typeof(arrData.encrypt) != "undefined" ) {
		$("#sel_encrypt").val( arrData.encrypt );

		if ( typeof(arrData.psk) != "undefined" ) {
			$("#text_psk").val( arrData.psk );
		}
	} else {
		$("#sel_encrypt").val( "none" );
	}
	changeEncrypt();
}

function isInputValid() {
	var jsRadios = jsSpec.spec.radios;
	for ( var i = 0; i < jsRadios.length; i++ ) {
		/* check ssid */
		var ssid = $("#text_ssid_" + i ).val();
		var arrRet = checkSSID( ssid );
		if ( !arrRet[0] ) {
			myAlert(arrRet[1], "text_ssid_" + i );
			return false;
		}
		/* check ssid, end */
	}

	if ( $("#sel_encrypt").val() == "wpa_mix" ) {
		if ( !isInputValid_wpa_psk() )
			return false;
	}

	return true;
}

function ok() {
	if ( !isInputValid() )
		arrData.status = "error";
	else
		arrData.status = "ok";

	var jsRadios = jsSpec.spec.radios;
	for ( var i = 0; i < jsRadios.length; i++ ) {
		eval("arrData.ssid_" + i + "= $(\"#text_ssid_" + i + "\").val()");
	}	

	arrData.encrypt = $("#sel_encrypt").val();
	if ( arrData.encrypt == "wpa_mix" ) {
		arrData.psk= $("#text_psk").val();
	}
}

//TODO
function isInputValid_wpa_psk() {
		var key = $("#text_psk").val();

		if ( key.length < 64  ){
			if ( checkStringLen( key, 8, 63 ) == false ) {
				myAlert("共享密钥长度不正确，应为8-63个字符！", "text_psk");
				return false;
			}
			if ( !check_psk_ascii(key) ) {
				myAlert("共享密钥不能包含? \" ' ;和空格！", "text_wpa_psk");
				return false;
			}

		} else {
			if ( isHexString( key ) == false ) {
				myAlert("共享密钥格式不正确，应为十六进制字符！", "text_psk");
				return false;
			}

		}

		return true;
	}
