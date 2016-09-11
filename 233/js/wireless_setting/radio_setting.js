var indexRadio; //the number which tabmenu was choosed
//var elem_channel_165 = null;

function myhelp() {
	popHelp("radioSettings_"+indexRadio);
}

function generate_radio_mode() {
	var radio = jsSpec.spec.radios[indexRadio];
	var str = "";
	for ( var i = 0; i < radio.radio_mode.length; i++ ) {
		var mode = radio.radio_mode[i];
		//var arrTemp = mode.split("/");
		str += "<option value=\"" + radio.radio_mode[i].slice(4) + "\">" + radio.radio_mode[i] + "</option>";
		//str += "<option value=\"" + arrTemp[0].slice(4) + "\">" + radio.radio_mode[i] + "</option>";
	}
	$("#sel_channelMode").html( str );
}

function tabmenu_jump(page) {
	indexRadio = page.slice( 6 ); //the index of radio
	var radios = jsSpec.spec.radios;
	setNavigationBar("无线设置>射频参数>Radio" + indexRadio );

	generate_power_channel();
	generate_radio_mode();
	load();
	$("#chk_shortGI").attr("checked", true);
	$("#chk_A_MPDU").attr("checked", true);

	if ( radios[indexRadio].name == "2.4G" ) {
		$(".part_2_4G").css('display','table-row');
		$(".part_5_8G").css('display','none');
	} else {
		//5G
		$(".part_2_4G").css('display','none');
		$(".part_5_8G").css('display','table-row');
	}

	chgChannelMode();
}

function load() {
	var radios = jsSpec.spec.radios;
	var temp = jsData.pkg_wlan_radio[indexRadio];

	if ( !temp )
		return;

	if ( temp.enabled == "enabled" )
		$("#chk_status").attr("checked", true);
	else 
		$("#chk_status").attr("checked", false);

	if ( radios[indexRadio].name == "2.4G" ) {
		if ( temp.mode == "gn" ) {
			if ( temp.dot11nonly == "disabled" ) {
				$("#sel_channelMode").val("11" + temp.mode+"/" + temp.bandwidth + "M");
			} else {
				$("#sel_channelMode").val("11nonly" + "/" + temp.bandwidth + "M");
			}
		} else
			$("#sel_channelMode").val( temp.mode );

		$("#sel_preamble").val(temp.preamble); // only in radio 2.4G
	} else {
		/* 5G */
		if ( temp.mode == "an" ) {
			if ( temp.dot11nonly == "disabled" ){
				$("#sel_channelMode").val("11" + temp.mode + "/" + temp.bandwidth + "M");
			} else {
				$("#sel_channelMode").val("11nonly" + "/" + temp.bandwidth + "M" );
			}
		} else if ( temp.mode== "11ac") {
			if ( temp.dot11aconly == "disabled" ){
				$("#sel_channelMode").val( temp.mode + "/" + temp.bandwidth + "M");
			} else {
				$("#sel_channelMode").val( temp.mode + "only/" + temp.bandwidth + "M" );
			}
		} else
			$("#sel_channelMode").val(temp.mode);
	}
		
	$("#sel_channel").val( temp.channel );
		
	$("#text_beacon").val(temp["beacon-interval"]);
	$("#sel_maxPower").val(temp["max-power"]);
	$("#text_dtim").val(temp.dtim);
	$("#text_fragThreshold").val(temp["fragment-threshold"]);
	$("#text_fragRetry").val(temp.fragRetry);
	$("#sel_protection_mode").val(temp["protection-mode"]);
		
	$("#text_rts_cts").val(temp["rts-threshold"]);
	$("#text_distance").val(temp.distance);


	if ( temp.mode != "a" && temp.mode != "g" ) {
		if (temp["a-mpdu"] == "enabled" )
			$("#chk_A_MPDU").attr("checked", true);
		else
			$("#chk_A_MPDU").attr("checked", false);

		if (temp["short-gi"] == "enabled" )
			$("#chk_shortGI").attr("checked", true);
		else
			$("#chk_shortGI").attr("checked", false);
	}

	if (temp["atf"] == "enabled" )
		$("#chk_ATF").attr("checked", true);
	else
		$("#chk_ATF").attr("checked", false);

	/* rssi access settings */
	if (temp["rssi-access"] == "enabled" ) {
		$("#chk_rssi_enable").attr("checked", true);
		$(".part_rssi_enable").css("display", "table-row");
	} else {
		$("#chk_rssi_enable").attr("checked", false);
		$(".part_rssi_enable").css("display", "none");
	}

	if ( typeof(temp["rssi-access-threshold"]) != "undefined" ) 
		$("#text_rssi_threshold").val( temp["rssi-access-threshold"] );
	/* rssi access settings, end */

	/* broadcast ratelimit */
	if (temp["bcast-ratelimit"] == "enabled" ) {
		$("#chk_wbl_enable").attr("checked", true);
		$(".wbl_cir").css("display", "table-row");
		$(".wbl_cbs").css("display", "table-row");
	}
	else {
		$("#chk_wbl_enable").attr("checked", false);
		$(".wbl_cir").css("display", "none");
		$(".wbl_cbs").css("display", "none");
	}
	if ( typeof(temp["bcast-ratelimit-cir"]) != "undefined" ) 
		$("#text_wbl_cir").val( temp["bcast-ratelimit-cir"] );
	if ( typeof(temp["bcast-ratelimit-cbs"]) != "undefined" ) 
		$("#text_wbl_cbs").val( temp["bcast-ratelimit-cbs"] );

}

function cancel() {
	load();
	chgChannelMode();
}

function chgRegion() {
}

function chgChannelMode() {
	jsRadios = jsSpec.spec.radios;
	$("#chk_A_MPDU").removeAttr("disabled");
	if ( jsRadios[indexRadio].name == "2.4G" ) {
		if ($("#sel_channelMode").val() == "11nonly/20M" || $("#sel_channelMode").val()=="11nonly/40M" || 
					$("#sel_channelMode").val() == "11gn/20M" || $("#sel_channelMode").val()=="11gn/40M") {
			$(".part_shortGI").css('display','table-row');
			$(".part_ampdu").css('display','table-row');
		} else {
			$(".part_shortGI").css('display','none');
			$(".part_ampdu").css('display','none');
		}

	} else {
		/* 5G */
		if ($("#sel_channelMode").val() == "11nonly/20M" || $("#sel_channelMode").val()=="11nonly/40M" || 
				$("#sel_channelMode").val() == "11an/20M" || $("#sel_channelMode").val()=="11an/40M" 
				|| $("#sel_channelMode").val().indexOf("11ac") != -1  ) {
			if ( $("#sel_channelMode").val().indexOf("11ac") != -1 ) {
				$("#chk_A_MPDU").attr("disabled", "disabled");
				$("#chk_A_MPDU").attr("checked", true);
			}
			$(".part_shortGI").css('display','table-row');
			$(".part_ampdu").css('display','table-row');
		} else {
			$(".part_shortGI").css('display','none');
			$(".part_ampdu").css('display','none');
		}

	}
	
}

function changeBroadcastRatelimitEnable() {
	if ( $("#chk_wbl_enable").attr("checked") == "checked" ) {
		$(".wbl_cir").css("display", "table-row");
		$(".wbl_cbs").css("display", "table-row");
	} else {
		$(".wbl_cir").css("display", "none");
		$(".wbl_cbs").css("display", "none");
	}
}

function changeRssiEnable() {
	if ( $("#chk_rssi_enable").attr("checked") == "checked" ) {
		$(".part_rssi_enable").css("display", "table-row");
	} else {
		$(".part_rssi_enable").css("display", "none");
	}
}

$("document").ready( function() {
	generateTabMenu();
	tabMenu_init();
	$("#chk_rssi_enable").change( changeRssiEnable )
	$("#chk_wbl_enable").change( changeBroadcastRatelimitEnable )
});

function generate_power_channel() {
	/*radio spcific control.*/
	var radio_spec = jsSpec_2.radio_specific[indexRadio];
	
	/* generate maxPower*/
	$("#sel_maxPower").empty();
	$("#sel_maxPower").append("<option value='auto'>auto</option>");  
	var maxpower = radio_spec["max-power"];
	for ( var i = 3; i <= maxpower; i++ ) {
		$("#sel_maxPower").append("<option value='" + i + "'>" + i + "</option>");  
	}
	
	/* generate channel */
	$("#sel_channel").empty();
	$("#sel_channel").append("<option value='auto'>auto</option>");  
	var arrChannel = radio_spec.channel;
	for ( var i = 0; i < arrChannel.length; i++ ) {
		$("#sel_channel").append("<option value='" + arrChannel[i] + "'>" + arrChannel[i] + "</option>");  
	}
}

function init() {
	tabmenu_jump("Radio 0");
	$("#chk_shortGI").attr("checked", true);
	$("#chk_A_MPDU").attr("checked", true);
	load();
}

function setRadioSuccess(data) {
	jsData = eval("("+data+")");
	load();
}

function isInputValid() {
	if ( !($("#sel_channelMode").val() && $("#sel_channel").val() && $("#sel_maxPower").val() &&
			$("#sel_protection_mode").val() && $("#sel_preamble").val())) {
		myAlert("未知错误！");
		return false;
	}

	if ( $("#sel_channel").val() == 165
			&& ( $("#sel_channelMode").val().indexOf("40") != -1 
				|| $("#sel_channelMode").val().indexOf("80") != -1 ) 
	) {
		if ( $("#sel_channelMode").val().indexOf("ac") != -1 )
			myAlert("802.11AC模式在40M或80M频宽下无法选择165信道！", "sel_channel");
		else
			myAlert("802.11n模式在40M频宽下无法选择165信道！", "sel_channel");
		return false;
	}

	if (!checkNumberRang($("#text_beacon").val(), 40, 3500 )){
		myAlert("非法的Beacon帧间隔！", "text_beacon");
		return false;
	}

	if (!checkNumberRang($("#text_dtim").val(), 1, 31 )){
		myAlert("非法的DTIM间隔！", "text_dtim");
		return false;
	}
			
	if (!checkNumberRang($("#text_fragThreshold").val(), 256, 2346 )) {
		myAlert("非法的分片阈值！", "text_fragThreshold");
		return false;
	}
			
	if ( !checkNumberRang($("#text_rts_cts").val(), 0, 2346 ) ) {
		myAlert("非法的RTS-CTS阈值！", "text_rts_cts");
		return false;
	}
			
	if ( !checkNumberRang($("#text_distance").val(), 1, 40 ) ) {
		myAlert("非法的发射距离！", "text_distance");
		return false;
	}

	if ( $("#chk_rssi_enable").attr("checked") == "checked"
			&& !checkNumberRang($("#text_rssi_threshold").val(), -127, -32 )) {
		myAlert("非法的RSSI阈值！", "text_rssi_threshold");
		return false;
	}
	if ( $("#chk_wbl_enable").attr("checked") == "checked" ) {
		if (!checkNumberRang($("#text_wbl_cir").val(), 1, 10000)) {
			myAlert("非法的CIR值！", "text_wbl_cir");
			return false;
		}
		if (!checkNumberRang($("#text_wbl_cbs").val(), 1, 10000)) {
			myAlert("非法的CBS值！", "text_wbl_cbs");
			return false;
		}
		if (parseInt($("#text_wbl_cir").val()) > parseInt($("#text_wbl_cbs").val()) ) {
			myAlert("CBS值必须大于或等于CIR值！", "text_wbl_cir");
			return false;
		}
	}
			
	return true;
}

function ok() {
	if ( !isInputValid() )	
		return;

	var f = new myForm();
	var url = "setform/form_radio_set?UID=" + parent.uid;
	f.add( "radio", indexRadio );
	//f.add( "reginon", nIndex );
	if ( $("#chk_status").attr("checked") )
		f.add( "status", "1" ); //radio enabled or disabled
	else
		f.add( "status", "0" ); //radio enabled or disabled

	f.add( "mode", $("#sel_channelMode").val() );
	f.add( "channel", $("#sel_channel").val() );
	//f.add( "A_MSDU", $("#chk_A_MSDU").val() );
	f.add( "beacon", $("#text_beacon").val() );
	f.add( "maxpower", $("#sel_maxPower").val() );
	f.add( "dtim", $("#text_dtim").val() );
	f.add( "fragThreshold", $("#text_fragThreshold").val() );
	f.add( "protect_mode", $("#sel_protection_mode").val() );
	f.add( "rtsThreshold", $("#text_rts_cts").val() );
	f.add( "distance", $("#text_distance").val() );


	if ( $("#chk_shortGI").attr("checked") && $("#sel_channelMode").val() != "11a" && $("#sel_channelMode").val() != "11g" )
		f.add( "shortGI", "1" );
	else
		f.add( "shortGI", "0" );

	if ( $("#chk_ATF").attr("checked") )
		f.add ( "atf", "1" );
	else
		f.add ( "atf", "0" );

	if ( $("#chk_A_MPDU").attr("checked") && $("#sel_channelMode").val() != "11a" && $("#sel_channelMode").val() != "11g" )
		f.add( "A_MPDU", "1" );
	else
		f.add( "A_MPDU", "0" );

	/* rssi access */
	if ( $("#chk_rssi_enable").attr("checked") == "checked" ) {
		f.add( "rssi_enabled", 1 );
		f.add( "rssi_threshold", $("#text_rssi_threshold").val() );
	} else
		f.add( "rssi_enabled", 0 );
	/* rssi access, end */

	/* broadcast ratelimit */
	if ( $("#chk_wbl_enable").attr("checked") == "checked" ) {
		f.add( "bcast-ratelimit", 1 );
		f.add( "bcast-ratelimit-cir", $("#text_wbl_cir").val() );
		f.add( "bcast-ratelimit-cbs", $("#text_wbl_cbs").val() );
	} else
		f.add( "bcast-ratelimit-cir", 0 );

	//5G 不含前导码
	if ( jsSpec.spec.radios[indexRadio].name == "2.4G" )
		f.add( "preamble", $("#sel_preamble").val() );

	f.submit( url, setRadioSuccess );
}

function generateTabMenu() {
	var jsRadios = jsSpec.spec.radios;
	var str = "";
	for ( var i = 0; i < jsRadios.length; i++ ) {
		str += "<td style=\"width:1px;\">&nbsp;</td>";	
		if ( i == 0 )
			str += "<td class=\"tabSelected\"><a href=\"#\">Radio " + i + "</a></td>";
		else
			str += "<td class=\"tabUnselected\"><a href=\"#\">Radio " + i + "</a></td>";
	}
	str += "<td>&nbsp;</td>";

	$("#tr_tabmenu").html( str );
}
