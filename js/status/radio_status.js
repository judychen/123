var arrRadio = new Array("1;启用; 802.11a;149;19;ap","2;禁用;802.11g;auto;20;-");


/*匹配模式*/
function getRadioMode(index){
	var temp = jsRadio2.pkg_wlan_radio[index];
	if(typeof(temp) != "undefined"){
		if ( temp.mode == "gn" ) {
			if ( temp.dot11nonly == "disabled") {
				return "802.11gn/" + temp.bandwidth + "M";
			} else {
				return "802.11nonly/" + temp.bandwidth + "M";
			}
		} else if ( temp.mode == "an" ) {
			if ( temp.dot11nonly == "disabled") {
				return "802.11an/" + temp.bandwidth + "M";
			} else {
				return "802.11nonly/" + temp.bandwidth + "M";
			}
		} else if ( temp.mode == "11ac" ) {
			if ( temp.dot11nonly == "disabled") {
				return "802.11ac/" + temp.bandwidth + "M";
			} else {
				return "802.11aconly/" + temp.bandwidth + "M";
			}
		} else if ( temp.mode == "g" ) {
			return "802.11g";
		} else if ( temp.mode == "a" ) {
			return "802.11a";
		} else 
			return temp.mode;
	}
}

function formatRadioEnabled( arrRow, index  ) {
	if ( arrRow[index] == "1" || arrRow[index] == 1 ) {
		return "启用";
	} else
		return "禁用";
}

function formatRadio( arrRow, index  ) {
	return 'Radio ' + arrRow[index];
}

var rs = new myGrid('rs');

$(function(){
	setNavigationBar("系统状态>射频信息>射频列表");

	rs.pageview_add('射频单元', 0, '12%', MG_SORT_NUM, null, formatRadio);
	rs.pageview_add('模式', 1, '9%', MG_SORT_ASCII);
	rs.pageview_add('信道', 2, '9%', MG_SORT_NUM);
	rs.pageview_add('功率(dBm)', 3, '12%', MG_SORT_NUM);
	rs.pageview_add('RTS-CTS阈值', 4, '15%', MG_SORT_NUM);
	rs.pageview_add('分片阈值', 5, '12%', MG_SORT_NUM);
	rs.pageview_add('BSS端口数量', 6, '14%', MG_SORT_NUM);
	rs.pageview_add('状态', 7, '9%', MG_SORT_NUM, null, formatRadioEnabled );

	arrRadio.length = 0;
	for ( var i = 0; i < jsRadio.data.length; i++ ) {
		var radio = jsRadio.data[i];
		arrRadio[i] = radio.id + ";";
		arrRadio[i] += getRadioMode(i) + ";";
		arrRadio[i] += radio.channel + ";";
		arrRadio[i] += radio.txPower + ";";
		arrRadio[i] += radio.rts_threshold + ";";
		arrRadio[i] += radio.frag_threshold + ";";
		arrRadio[i] += radio.bss_count + ";";
		arrRadio[i] += radio.enabled;
	}
	

	rs.pageview_init( arrRadio, 10, 'list_radio_status');


});



