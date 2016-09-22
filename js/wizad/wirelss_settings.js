var arrData;
/****** struct of arrIS ******
* ssid_1	//2.4g
* ssid_2	//5g
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

$(function () {
    arrData = loadWizardProgress("wizard_wireless_settings");


    generate_ssid_input();

	var jsRadios = jsSpec.spec.radios;
    /*判断？？？*/

    for ( var i = 0; i < jsRadios.length; i++ ) {
		$("#wizard_ssid_" + i ).val( jsRadios[i].default_ssid );
	}

	if ( typeof(arrData.encrypt) != "undefined" ) {
		$("#wizard_sel_encrypt").val( arrData.encrypt );

		if ( typeof(arrData.psk) != "undefined" ) {
			$("#wizard_wpa_sec").val( arrData.psk );
		}
	}

	$(".wizard_wpa").hide();//暂时做个初始值
	$("#wizard_sel_encrypt").change(changeEncrypt);

});

//根据radio个数生成SSID个数
function generate_ssid_input() {
    var str = "";
	var radios = jsSpec.spec.radios;
	for ( var i = 0 ; i < radios.length; i++ ) {
		str += "<tr>";
		str += "<td class=\"col1\">" + radios[i].name + " SSID：</td>";
		str += "<td class=\"col2\"><input type=\"text\" id=\"wizard_ssid_" + i + "\" maxlength=\"32\" />（1-32个字符，不包含 ? \" ; \\）</td>";
		str += "</tr>";
	}
	$("#wizard_ssid").html( str );
}

function isInputValid() {
    /*todo*/
}

function ok() {
    /*todo*/
}

function isInputValid_wpa_psk() {
    /*todo*/
}